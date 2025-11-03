# app/config.py
from pydantic import AnyUrl
from pydantic_settings import BaseSettings
from pydantic import ConfigDict
from typing import List

class Settings(BaseSettings):
    # Remove hardcoded credentials, use environment variables
    MONGO_URI: AnyUrl = "mongodb://localhost:27017"  # Default fallback
    MONGO_DB: str = "notebook"
    ORIGINS: list[str] = [
        "*",
        # "http://localhost:5173",
        # "http://127.0.0.1:5173"
    ]    
    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False  # Optional: makes env vars case insensitive
    )

settings = Settings()