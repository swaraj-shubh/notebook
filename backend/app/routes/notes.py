# app/routes/notes.py
from fastapi import APIRouter, HTTPException, status
from ..models import NoteCreate, NoteUpdate
from ..crud import add_note, update_note, delete_note, get_notebook

router = APIRouter(prefix="/api/notebooks/{nb_id}/notes", tags=["notes"])

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_note(nb_id: str, payload: NoteCreate):
    nb = await get_notebook(nb_id)
    if not nb:
        raise HTTPException(status_code=404, detail="Notebook not found")
    note = await add_note(nb_id, payload)
    if not note:
        raise HTTPException(status_code=400, detail="Could not add note")
    return note

@router.patch("/{note_id}", status_code=200)
async def patch_note(nb_id: str, note_id: str, payload: NoteUpdate):
    modified = await update_note(nb_id, note_id, payload)
    if not modified:
        raise HTTPException(status_code=404, detail="Note or notebook not found")
    return {"updated": True}

@router.delete("/{note_id}", status_code=204)
async def remove_note(nb_id: str, note_id: str):
    modified = await delete_note(nb_id, note_id)
    if not modified:
        raise HTTPException(status_code=404, detail="Note or notebook not found")
    return None
