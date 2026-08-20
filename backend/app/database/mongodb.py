"""
Lightweight MongoDB connection helper.

The app must work even when MONGODB_URI is not configured (Demo Mode).
In that case, get_db() returns None and every route falls back to
in-memory / stateless behavior instead of persistence.
"""
import os
import logging

logger = logging.getLogger("prasad-ai.mongodb")

_client = None
_db = None


def is_configured() -> bool:
    return bool(os.getenv("MONGODB_URI"))


async def connect():
    global _client, _db
    uri = os.getenv("MONGODB_URI")
    if not uri:
        logger.info("MONGODB_URI not set — running without persistence (Demo Mode).")
        return None
    try:
        from motor.motor_asyncio import AsyncIOMotorClient

        _client = AsyncIOMotorClient(uri, serverSelectionTimeoutMS=4000)
        _db = _client.get_default_database(default="prasad_ai")
        # Verify the connection early so failures surface at startup, not mid-request.
        await _client.admin.command("ping")
        logger.info("Connected to MongoDB.")
        return _db
    except Exception as exc:  # noqa: BLE001 - we want to degrade gracefully on any failure
        logger.warning("MongoDB connection failed (%s) — falling back to Demo Mode.", exc)
        _client = None
        _db = None
        return None


async def disconnect():
    global _client
    if _client:
        _client.close()


def get_db():
    return _db
