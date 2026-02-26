import hashlib
import uuid
import datetime
from typing import Optional
import redis.asyncio as aioredis
import asyncio

from app.models import NotificationEvent, DecisionResult, UserPreferences

async def is_duplicate(event: NotificationEvent, redis_client: aioredis.Redis) -> bool:
    """
    Checks exact and near-duplicates using Redis keys.
    """
    if event.dedupe_key:
        key = f"dedupe:{event.dedupe_key}"
    else:
        # Generate hash for near-duplicate text
        normalized_msg = event.message.lower().strip()
        hash_val = hashlib.md5(f"{event.user_id}:{event.event_type}:{normalized_msg}".encode()).hexdigest()
        key = f"dedupe_hash:{hash_val}"

    # Use Redis SETNX via the nx=True argument
    # set() returns True if set was successful (key didn't exist), False if it did exist
    is_new = await redis_client.set(key, "1", ex=86400, nx=True)
    return not is_new

def check_dnd(user_prefs: UserPreferences, timestamp: datetime.datetime) -> bool:
    """
    Checks if current time is within user's Do Not Disturb window.
    """
    if not user_prefs.dnd_start_time or not user_prefs.dnd_end_time:
        return False
        
    current_time_str = timestamp.strftime("%H:%M")
    # Simplistic string comparison for "HH:MM"
    if user_prefs.dnd_start_time <= current_time_str or current_time_str < user_prefs.dnd_end_time:
        return True
    return False

async def check_alert_fatigue(user_id: str, redis_client: aioredis.Redis, user_prefs: UserPreferences) -> bool:
    """
    Checks Redis token bucket/sliding window for user rate limits.
    """
    today_str = datetime.datetime.utcnow().strftime("%Y-%m-%d")
    key = f"rate_limit:{user_id}:{today_str}"
    
    count = await redis_client.get(key)
    count = int(count) if count else 0
    return count >= user_prefs.daily_global_cap

async def increment_fatigue_counter(user_id: str, redis_client: aioredis.Redis, expire_seconds: int = 86400):
    """
    Increments the daily rate limit counter for the user.
    """
    today_str = datetime.datetime.utcnow().strftime("%Y-%m-%d")
    key = f"rate_limit:{user_id}:{today_str}"
    
    await redis_client.incr(key)
    # Set expiration if it's a new key
    if await redis_client.ttl(key) == -1:
        await redis_client.expire(key, expire_seconds)

async def fetch_user_prefs(user_id: str, db_pool) -> UserPreferences:
    async with db_pool.acquire() as conn:
        row = await conn.fetchrow("SELECT * FROM user_preferences WHERE user_id = $1", user_id)
        if row:
            return UserPreferences(
                user_id=row['user_id'],
                dnd_start_time=row['dnd_start_time'],
                dnd_end_time=row['dnd_end_time'],
                opt_out_types=row['opt_out_types'],
                daily_global_cap=row['daily_global_cap']
            )
    return UserPreferences(user_id=user_id, opt_out_types=[], dnd_start_time="22:00", dnd_end_time="08:00")

async def insert_audit_log(audit_id: str, user_id: str, event_type: str, decision: str, reason: str, scheduled_for: Optional[datetime.datetime], db_pool):
    async with db_pool.acquire() as conn:
        await conn.execute("""
            INSERT INTO audit_logs (audit_id, user_id, event_type, decision, reason, scheduled_for)
            VALUES ($1, $2, $3, $4, $5, $6)
        """, audit_id, user_id, event_type, decision, reason, scheduled_for)

async def _evaluate_notification(event: NotificationEvent, redis_client: aioredis.Redis, db_pool, audit_id: str) -> DecisionResult:
    # Step 1: Dedup Check
    if await is_duplicate(event, redis_client):
        return DecisionResult(decision="Never", reason="Duplicate detected", audit_id=audit_id)

    # Step 2: Extract User Prefs (Fetched from PostgreSQL)
    user_prefs = await fetch_user_prefs(event.user_id, db_pool)

    # Step 3: Hard Suppression
    if event.event_type in user_prefs.opt_out_types:
        return DecisionResult(decision="Never", reason="User opted out of this event type", audit_id=audit_id)

    # Step 4: Priority Overrides
    if event.priority_hint == "urgent":
        return DecisionResult(decision="Now", reason="Urgent priority overrides standard caps", audit_id=audit_id)

    # Step 5: DND & Expiration Check
    if check_dnd(user_prefs, event.timestamp):
        if event.expires_at and event.expires_at < event.timestamp + datetime.timedelta(hours=8): # e.g., expires before DND ends
            return DecisionResult(decision="Never", reason="Deferred until after DND, but event will expire by then", audit_id=audit_id)
        
        return DecisionResult(
            decision="Later", 
            reason="User is in Do Not Disturb period", 
            scheduled_for=event.timestamp + datetime.timedelta(hours=8), # Schedule 8h later roughly
            audit_id=audit_id
        )

    # Step 6: Alert Fatigue
    if await check_alert_fatigue(event.user_id, redis_client, user_prefs):
        return DecisionResult(
            decision="Later", 
            reason="User reached daily notification cap", 
            scheduled_for=event.timestamp + datetime.timedelta(hours=24), # Defer to next day
            audit_id=audit_id
        )

    # Step 7: Final Catch-All / Contextual Rules
    # If promotional and user is offline, defer. (Requires session state in Redis)

    # If it passes all rules, increment fatigue cap and return Now
    await increment_fatigue_counter(event.user_id, redis_client)
    
    return DecisionResult(decision="Now", reason="Passed all rules and gates", audit_id=audit_id)

async def process_notification(event: NotificationEvent, redis_client: aioredis.Redis, db_pool) -> DecisionResult:
    audit_id = str(uuid.uuid4())
    result = await _evaluate_notification(event, redis_client, db_pool, audit_id)
    
    # Async audit log insert
    asyncio.create_task(insert_audit_log(
        audit_id=result.audit_id,
        user_id=event.user_id,
        event_type=event.event_type,
        decision=result.decision,
        reason=result.reason,
        scheduled_for=result.scheduled_for,
        db_pool=db_pool
    ))
    
    return result
