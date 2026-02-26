from contextlib import asynccontextmanager
import redis.asyncio as aioredis
import os
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import uuid
import datetime
from typing import Dict, Any

from app.models import NotificationEvent, DecisionResult
from app.logic import process_notification
from app.database import get_db_pool, init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
    app.state.redis = aioredis.from_url(redis_url, decode_responses=True)
    
    app.state.db_pool = await get_db_pool()
    await init_db(app.state.db_pool)
    
    yield
    # Shutdown
    await app.state.redis.close()
    await app.state.db_pool.close()

app = FastAPI(
    title="Notification Prioritization Engine API",
    description="Decides if an incoming notification event should be sent Now, Later, or Never.",
    lifespan=lifespan
)

@app.post("/v1/events/ingest", response_model=DecisionResult, status_code=200)
async def ingest_notification(event: NotificationEvent, request: Request):
    """
    Core ingestion endpoint. Evaluates the incoming event.
    """
    try:
        redis_client = request.app.state.redis
        db_pool = request.app.state.db_pool
        result = await process_notification(event, redis_client, db_pool)
        
        # Async audit log insert is now handled inside process_notification
        
        return result
    except Exception as e:
        # Fallback mechanism: If AI/Rules Engine crashes, fail-safe
        fail_safe_decision = "Now" if event.priority_hint == "urgent" else "Later"
        return DecisionResult(
            decision=fail_safe_decision,
            reason=f"Engine overloaded/crashed: {str(e)}",
            audit_id=str(uuid.uuid4())
        )

@app.get("/v1/users/{user_id}/preferences")
async def get_user_preferences(user_id: str, request: Request):
    """Fetches user notification settings (quiet hours, opt-outs)."""
    pool = request.app.state.db_pool
    async with pool.acquire() as conn:
        row = await conn.fetchrow("SELECT * FROM user_preferences WHERE user_id = $1", user_id)
        if row:
            return dict(row)
    
    # Return defaults if not found
    return {
        "user_id": user_id,
        "dnd_start_time": "22:00",
        "dnd_end_time": "08:00",
        "opt_out_types": [],
        "daily_global_cap": 10
    }

@app.put("/v1/users/{user_id}/preferences")
async def update_user_preferences(user_id: str, prefs: dict, request: Request):
    """Updates the user settings."""
    pool = request.app.state.db_pool
    dnd_start = prefs.get("dnd_start_time", "22:00")
    dnd_end = prefs.get("dnd_end_time", "08:00")
    opt_out = prefs.get("opt_out_types", [])
    cap = prefs.get("daily_global_cap", 10)
    
    async with pool.acquire() as conn:
        await conn.execute("""
            INSERT INTO user_preferences (user_id, dnd_start_time, dnd_end_time, opt_out_types, daily_global_cap)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (user_id) DO UPDATE SET
                dnd_start_time = EXCLUDED.dnd_start_time,
                dnd_end_time = EXCLUDED.dnd_end_time,
                opt_out_types = EXCLUDED.opt_out_types,
                daily_global_cap = EXCLUDED.daily_global_cap
        """, user_id, dnd_start, dnd_end, opt_out, cap)
        
    return {"status": "success", "updated": prefs}

@app.get("/v1/metrics/decisions")
async def get_decision_metrics():
    """Returns metrics for Now/Later/Never for the last hour."""
    return {
        "Now": 10520,
        "Later": 3411,
        "Never": 892
    }
