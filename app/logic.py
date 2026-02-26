import hashlib
import uuid
import datetime
from typing import Optional

from app.models import NotificationEvent, DecisionResult, UserPreferences

# Mock Redis and DB clients for explanation
# redis_client = get_redis()
# db_client = get_db()

def is_duplicate(event: NotificationEvent) -> bool:
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

    # Mock Redis `GET`
    # return redis_client.exists(key)
    return False

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

def check_alert_fatigue(user_id: str) -> bool:
    """
    Checks Redis token bucket/sliding window for user rate limits.
    """
    # count = redis_client.get(f"rate_limit:{user_id}")
    count = 2 # mock value
    return count >= 10 # Let's say max 10 per day is the global cap

async def process_notification(event: NotificationEvent) -> DecisionResult:
    audit_id = str(uuid.uuid4())

    # Step 1: Dedup Check
    if is_duplicate(event):
        return DecisionResult(decision="Never", reason="Duplicate detected", audit_id=audit_id)

    # Step 2: Extract User Prefs (Normally fetched from cache or DB)
    # user_prefs = await fetch_user_prefs(event.user_id)
    mock_prefs = UserPreferences(user_id=event.user_id, opt_out_types=["newsletter"], dnd_start_time="22:00", dnd_end_time="08:00")

    # Step 3: Hard Suppression
    if event.event_type in mock_prefs.opt_out_types:
        return DecisionResult(decision="Never", reason="User opted out of this event type", audit_id=audit_id)

    # Step 4: Priority Overrides
    if event.priority_hint == "urgent":
        return DecisionResult(decision="Now", reason="Urgent priority overrides standard caps", audit_id=audit_id)

    # Step 5: DND & Expiration Check
    if check_dnd(mock_prefs, event.timestamp):
        if event.expires_at and event.expires_at < event.timestamp + datetime.timedelta(hours=8): # e.g., expires before DND ends
            return DecisionResult(decision="Never", reason="Deferred until after DND, but event will expire by then", audit_id=audit_id)
        
        return DecisionResult(
            decision="Later", 
            reason="User is in Do Not Disturb period", 
            scheduled_for=event.timestamp + datetime.timedelta(hours=8), # Schedule 8h later roughly
            audit_id=audit_id
        )

    # Step 6: Alert Fatigue
    if check_alert_fatigue(event.user_id):
        return DecisionResult(
            decision="Later", 
            reason="User reached daily notification cap", 
            scheduled_for=event.timestamp + datetime.timedelta(hours=24), # Defer to next day
            audit_id=audit_id
        )

    # Step 7: Final Catch-All / Contextual Rules
    # If promotional and user is offline, defer. (Requires session state in Redis)

    # If it passes all rules:
    return DecisionResult(decision="Now", reason="Passed all rules and gates", audit_id=audit_id)

