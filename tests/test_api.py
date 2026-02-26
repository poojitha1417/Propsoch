import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch
from app.api import app

# Create mock clients
mock_redis = AsyncMock()
mock_db_pool = AsyncMock()

@pytest.fixture(autouse=True)
def patch_dependencies():
    with patch('app.api.aioredis.from_url', return_value=mock_redis), \
         patch('app.api.get_db_pool', return_value=mock_db_pool), \
         patch('app.api.init_db', new_callable=AsyncMock):
        # We also patch init_db to avoid it trying to execute actual SQL
        yield

import contextlib

@pytest.fixture(autouse=True)
def reset_mocks():
    mock_redis.reset_mock()
    mock_db_pool.reset_mock()
    
    # default fetchrow setup
    mock_conn = AsyncMock()
    mock_conn.fetchrow.return_value = None # Use defaults
    
    @contextlib.asynccontextmanager
    async def mock_acquire():
        yield mock_conn
        
    mock_db_pool.acquire = mock_acquire

def test_ingest_urgent():
    """Test that an urgent notification bypasses fatigue caps and goes through."""
    # Setup mocks
    mock_redis.set.return_value = True # Not a duplicate
    
    with TestClient(app) as client:
        response = client.post("/v1/events/ingest", json={
            "user_id": "u1",
            "event_type": "alert",
            "message": "system down!",
            "source": "monitor",
            "priority_hint": "urgent",
            "channel": "push"
        })
    
        assert response.status_code == 200
        assert response.json()["decision"] == "Now"
        assert "override" in response.json()["reason"].lower()

def test_ingest_duplicate():
    """Test that a duplicate dedupe_key correctly gets rejected."""
    # Setup mocks
    mock_redis.set.return_value = False # Duplicate!
    
    with TestClient(app) as client:
        response = client.post("/v1/events/ingest", json={
            "user_id": "u1",
            "event_type": "alert",
            "message": "system down!",
            "source": "monitor",
            "channel": "push",
            "dedupe_key": "abc-123"
        })
    
        assert response.status_code == 200
        assert response.json()["decision"] == "Never"
        assert "duplicate" in response.json()["reason"].lower()

def test_ingest_fatigue():
    """Test that hitting the rate limit returns Later."""
    # Setup mocks
    mock_redis.set.return_value = True # Not a duplicate
    mock_redis.get.return_value = b'10' # Reached fatigue cap (default 10)
    
    with TestClient(app) as client:
        response = client.post("/v1/events/ingest", json={
            "user_id": "u1",
            "event_type": "alert",
            "message": "normal message",
            "source": "monitor",
            "channel": "push"
        })
        
        assert response.status_code == 200
        assert response.json()["decision"] == "Later"
        assert "cap" in response.json()["reason"].lower()
