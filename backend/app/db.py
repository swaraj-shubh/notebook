# app/db.py
from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

client: AsyncIOMotorClient | None = None

def get_client() -> AsyncIOMotorClient:
    global client
    if client is None:
        client = AsyncIOMotorClient(str(settings.MONGO_URI))
    return client

def get_database():
    return get_client()[settings.MONGO_DB]
