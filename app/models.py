from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime

class NotificationEvent(BaseModel):
    user_id: str = Field(..., description="Unique identifier for the user")
    event_type: str = Field(..., description="Category of the event (e.g., 'promotion', 'alert', 'message')")
    message: str = Field(..., description="The content of the notification")
    source: str = Field(..., description="The upstream service sending this event")
    priority_hint: Optional[str] = Field("normal", description="'urgent', 'normal', 'low'")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    channel: str = Field(..., description="Delivery channel: 'push', 'email', 'sms', 'in-app'")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)
    dedupe_key: Optional[str] = Field(None, description="Idempotency key")
    expires_at: Optional[datetime] = Field(None, description="When this notification becomes irrelevant")

class DecisionResult(BaseModel):
    decision: str = Field(..., description="'Now', 'Later', 'Never'")
    reason: str = Field(..., description="Explanation for the decision")
    scheduled_for: Optional[datetime] = Field(None, description="If 'Later', when to send")
    audit_id: str = Field(..., description="Unique ID for tracking this decision log")

class UserPreferences(BaseModel):
    user_id: str
    dnd_start_time: Optional[str] = None # e.g., "22:00"
    dnd_end_time: Optional[str] = None   # e.g., "08:00"
    opt_out_types: list[str] = Field(default_factory=list)
    daily_global_cap: int = 10
