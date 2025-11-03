# app/models.py - SIMPLIFIED VERSION
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone
from bson import ObjectId
from pydantic import ConfigDict

# ---- Schemas ----
class NoteCreate(BaseModel):
    title: str
    content: str
    tags: Optional[List[str]] = []

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None

class NoteInDB(BaseModel):
    id: str = Field(alias="_id")
    title: str
    content: str
    tags: List[str] = []
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(
        populate_by_name=True
    )

class NotebookCreate(BaseModel):
    title: str
    description: Optional[str] = ""

class NotebookInDB(BaseModel):
    id: str = Field(alias="_id")
    title: str
    description: Optional[str] = ""
    created_at: datetime
    notes: List[NoteInDB] = []

    model_config = ConfigDict(
        populate_by_name=True
    )