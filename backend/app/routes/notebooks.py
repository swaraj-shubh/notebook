# app/routes/notebooks.py
from fastapi import APIRouter, HTTPException, status
from typing import List
from ..models import NotebookCreate, NotebookInDB
from ..crud import create_notebook, list_notebooks, get_notebook, delete_notebook

router = APIRouter(prefix="/api/notebooks", tags=["notebooks"])

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_nb(payload: NotebookCreate):
    nb = await create_notebook(payload)
    return nb

@router.get("/", response_model=List[NotebookInDB])
async def get_nbs(limit: int = 50):
    nbs = await list_notebooks(limit)
    return nbs

@router.get("/{nb_id}", response_model=NotebookInDB)
async def get_nb(nb_id: str):
    nb = await get_notebook(nb_id)
    if not nb:
        raise HTTPException(status_code=404, detail="Notebook not found")
    return nb

@router.delete("/{nb_id}", status_code=204)
async def del_nb(nb_id: str):
    deleted = await delete_notebook(nb_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Notebook not found")
    return None
