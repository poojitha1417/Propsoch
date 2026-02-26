import os
import asyncpg
from contextlib import asynccontextmanager

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://notification_user:notification_password@localhost:5432/notification_engine")

async def init_db(pool):
    """
    Initializes the database schema if it doesn't exist.
    """
    async with pool.acquire() as conn:
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS user_preferences (
                user_id VARCHAR PRIMARY KEY,
                dnd_start_time VARCHAR,
                dnd_end_time VARCHAR,
                opt_out_types VARCHAR[],
                daily_global_cap INTEGER DEFAULT 10
            );
        """)
        
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS audit_logs (
                audit_id VARCHAR PRIMARY KEY,
                user_id VARCHAR,
                event_type VARCHAR,
                decision VARCHAR,
                reason VARCHAR,
                scheduled_for TIMESTAMP,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)

async def get_db_pool():
    return await asyncpg.create_pool(DATABASE_URL)
