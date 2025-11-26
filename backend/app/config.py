# app/config.py
from pydantic import AnyUrl
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: AnyUrl = "mongodb://localhost:27017"
    MONGO_DB: str = "notebook"
    ORIGINS: str = "*"   # Accept string from .env, not list

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

settings = Settings()
