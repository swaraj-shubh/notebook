# Notebook API Documentation

A FastAPI-based backend for managing notebooks and notes with MongoDB storage.

## Base URL
```
http://127.0.0.1:8000
```

## API Endpoints

### Notebook Routes

#### 1. Create Notebook
- **URL**: `POST /api/notebooks/`
- **Description**: Create a new notebook
- **Request Body**:
```json
{
  "title": "Work Notes",
  "description": "Important work-related notes"
}
```
- **Response**: `201 Created`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Work Notes",
  "description": "Important work-related notes",
  "created_at": "2024-01-15T10:30:00Z",
  "notes": []
}
```

#### 2. List All Notebooks
- **URL**: `GET /api/notebooks/`
- **Description**: Get all notebooks with optional limit
- **Query Parameters**:
  - `limit` (optional): Number of notebooks to return (default: 50)
- **Response**: `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Work Notes",
    "description": "Important work-related notes",
    "created_at": "2024-01-15T10:30:00Z",
    "notes": []
  }
]
```

#### 3. Get Specific Notebook
- **URL**: `GET /api/notebooks/{nb_id}`
- **Description**: Get a specific notebook by ID
- **Path Parameters**:
  - `nb_id`: Notebook ID
- **Response**: `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Work Notes",
  "description": "Important work-related notes",
  "created_at": "2024-01-15T10:30:00Z",
  "notes": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Meeting Notes",
      "content": "Meeting content...",
      "tags": ["work", "meeting"],
      "created_at": "2024-01-15T11:00:00Z",
      "updated_at": null
    }
  ]
}
```

#### 4. Delete Notebook
- **URL**: `DELETE /api/notebooks/{nb_id}`
- **Description**: Delete a notebook by ID
- **Path Parameters**:
  - `nb_id`: Notebook ID
- **Response**: `204 No Content`

---

### Note Routes

#### 1. Create Note
- **URL**: `POST /api/notebooks/{nb_id}/notes/`
- **Description**: Create a new note in a specific notebook
- **Path Parameters**:
  - `nb_id`: Notebook ID
- **Request Body**:
```json
{
  "title": "Meeting Notes",
  "content": "Discussed project timeline and deliverables.",
  "tags": ["work", "meeting", "project"]
}
```
- **Response**: `201 Created`
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Meeting Notes",
  "content": "Discussed project timeline and deliverables.",
  "tags": ["work", "meeting", "project"],
  "created_at": "2024-01-15T11:00:00Z",
  "updated_at": null
}
```

#### 2. Update Note
- **URL**: `PATCH /api/notebooks/{nb_id}/notes/{note_id}`
- **Description**: Update specific fields of a note
- **Path Parameters**:
  - `nb_id`: Notebook ID
  - `note_id`: Note ID
- **Request Body** (update any combination of fields):
```json
{
  "title": "Updated Meeting Notes",
  "content": "Updated content with action items.",
  "tags": ["work", "urgent", "action-items"]
}
```
- **Response**: `200 OK`
```json
{
  "updated": true
}
```

#### 3. Delete Note
- **URL**: `DELETE /api/notebooks/{nb_id}/notes/{note_id}`
- **Description**: Delete a note from a notebook
- **Path Parameters**:
  - `nb_id`: Notebook ID
  - `note_id`: Note ID
- **Response**: `204 No Content`

---

## Example Workflow

### 1. Create a Notebook
```bash
curl -X POST "http://127.0.0.1:8000/api/notebooks/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Personal Journal",
    "description": "Daily thoughts and ideas"
  }'
```

### 2. Create a Note in the Notebook
```bash
curl -X POST "http://127.0.0.1:8000/api/notebooks/NOTEBOOK_ID/notes/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Today's Thoughts",
    "content": "Had a productive day working on the project.",
    "tags": ["personal", "reflection"]
  }'
```

### 3. Update the Note
```bash
curl -X PATCH "http://127.0.0.1:8000/api/notebooks/NOTEBOOK_ID/notes/NOTE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated: Today's Thoughts",
    "tags": ["personal", "reflection", "updated"]
  }'
```

### 4. Get All Notebooks
```bash
curl -X GET "http://127.0.0.1:8000/api/notebooks/"
```

### 5. Delete the Note
```bash
curl -X DELETE "http://127.0.0.1:8000/api/notebooks/NOTEBOOK_ID/notes/NOTE_ID"
```

### 6. Delete the Notebook
```bash
curl -X DELETE "http://127.0.0.1:8000/api/notebooks/NOTEBOOK_ID"
```

---

## Error Responses

### 404 Not Found
```json
{
  "detail": "Notebook not found"
}
```

```json
{
  "detail": "Note or notebook not found"
}
```

### 400 Bad Request
```json
{
  "detail": "Could not add note"
}
```

---

## Additional Endpoints

### Root Endpoint
- **URL**: `GET /`
- **Description**: Welcome message and API information
- **Response**: `200 OK`
```json
{
  "message": "Welcome to Notebook API Backend!",
  "docs": "Visit /docs for API documentation",
  "endpoints": {
    "notebooks": "/api/notebooks",
    "notes": "/api/notebooks/{id}/notes"
  }
}
```

### API Documentation
- **Swagger UI**: `GET /docs`
- **ReDoc**: `GET /redoc`

---

## Data Models

### Notebook
```typescript
interface Notebook {
  _id: string;
  title: string;
  description: string;
  created_at: string; // ISO datetime
  notes: Note[];
}
```

### Note
```typescript
interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string; // ISO datetime
  updated_at: string | null; // ISO datetime
}
```

---

## Setup and Running

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn app.main:app --reload --port 8000
```

3. Access the API at `http://127.0.0.1:8000`

---

## Technologies Used

- **Backend**: FastAPI
- **Database**: MongoDB with Motor (async)
- **ODM**: Pydantic for data validation
- **Documentation**: Auto-generated Swagger/OpenAPI