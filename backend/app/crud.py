# app/crud.py
from .db import get_database
from bson import ObjectId
from datetime import datetime, timezone
from typing import List, Optional
from .models import NotebookCreate, NoteCreate, NoteUpdate

def convert_objectid_to_str(doc):
    """Convert all ObjectId instances in a document to strings"""
    if not doc:
        return doc
    
    # Convert main _id
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    
    # Convert note _ids if they exist
    if 'notes' in doc:
        for note in doc['notes']:
            if '_id' in note:
                note['_id'] = str(note['_id'])
    
    return doc

async def create_notebook(data: NotebookCreate):
    db = get_database()
    doc = {
        "title": data.title,
        "description": data.description,
        "created_at": datetime.now(timezone.utc),
        "notes": []
    }
    res = await db.notebooks.insert_one(doc)
    doc["_id"] = str(res.inserted_id)  # Convert to string
    return doc

async def list_notebooks(limit: int = 50):
    db = get_database()
    cursor = db.notebooks.find().sort("created_at", -1).limit(limit)
    notebooks = []
    async for doc in cursor:
        notebooks.append(convert_objectid_to_str(doc))
    return notebooks

async def get_notebook(nb_id: str):
    db = get_database()
    doc = await db.notebooks.find_one({"_id": ObjectId(nb_id)})
    return convert_objectid_to_str(doc)

async def delete_notebook(nb_id: str):
    db = get_database()
    res = await db.notebooks.delete_one({"_id": ObjectId(nb_id)})
    return res.deleted_count

# Notes embedded operations
async def add_note(nb_id: str, note: NoteCreate):
    db = get_database()
    note_doc = {
        "_id": ObjectId(),
        "title": note.title,
        "content": note.content,
        "tags": note.tags or [],
        "created_at": datetime.now(timezone.utc),
        "updated_at": None
    }
    res = await db.notebooks.update_one(
        {"_id": ObjectId(nb_id)},
        {"$push": {"notes": note_doc}}
    )
    if res.modified_count:
        # Convert the note_doc to have string IDs
        note_doc["_id"] = str(note_doc["_id"])
        return note_doc
    return None

async def update_note(nb_id: str, note_id: str, payload: NoteUpdate):
    db = get_database()
    update_fields = {}
    if payload.title is not None:
        update_fields["notes.$.title"] = payload.title
    if payload.content is not None:
        update_fields["notes.$.content"] = payload.content
    if payload.tags is not None:
        update_fields["notes.$.tags"] = payload.tags
    if not update_fields:
        return None
    update_fields["notes.$.updated_at"] = datetime.now(timezone.utc)
    res = await db.notebooks.update_one(
        {"_id": ObjectId(nb_id), "notes._id": ObjectId(note_id)},
        {"$set": update_fields}
    )
    return res.modified_count

async def delete_note(nb_id: str, note_id: str):
    db = get_database()
    res = await db.notebooks.update_one(
        {"_id": ObjectId(nb_id)},
        {"$pull": {"notes": {"_id": ObjectId(note_id)}}}
    )
    return res.modified_count