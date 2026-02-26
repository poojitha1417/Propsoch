from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import uuid
import datetime
from typing import Dict, Any

from app.models import NotificationEvent, DecisionResult
from app.logic import process_notification

app = FastAPI(
    title="Notification Prioritization Engine API",
    description="Decides if an incoming notification event should be sent Now, Later, or Never."
)

@app.post("/v1/events/ingest", response_model=DecisionResult, status_code=200)
async def ingest_notification(event: NotificationEvent):
    """
    Core ingestion endpoint. Evaluates the incoming event.
    """
    try:
        # In a real system, we'd pass connections to Redis and DB here.
        # We rely on the process logic for classification
        result = await process_notification(event)
        
        # Async audit log insert would happen here or inside process_notification
        
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
async def get_user_preferences(user_id: str):
    """Fetches user notification settings (quiet hours, opt-outs)."""
    # Mock return, normally pulled from PostgreSQL or cached in Redis
    return {
        "user_id": user_id,
        "dnd_start": "22:00",
        "dnd_end": "08:00",
        "opt_out_types": ["promotions"],
        "daily_cap": 5
    }

@app.put("/v1/users/{user_id}/preferences")
async def update_user_preferences(user_id: str, prefs: dict):
    """Updates the user settings."""
    return {"status": "success", "updated": prefs}

@app.get("/v1/metrics/decisions")
async def get_decision_metrics():
    """Returns metrics for Now/Later/Never for the last hour."""
    return {
        "Now": 10520,
        "Later": 3411,
        "Never": 892
    }
