# Notebook Management System

A full-stack web application for managing notebooks and notes with a modern React frontend and FastAPI backend.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Backend Features
- **RESTful API** with FastAPI
- **MongoDB** database with Motor async driver
- **CORS** enabled for frontend communication
- **Pydantic** models for data validation
- **Environment-based** configuration
- **Automatic API documentation** with Swagger UI

### Frontend Features
- **Modern React** with hooks and functional components
- **Responsive design** with Tailwind CSS
- **Radix UI** components for accessibility
- **React Router** for navigation
- **Real-time CRUD operations**
- **Modal-based** note editing
- **Tag management** for notes
- **Clean, intuitive UI**

## 🛠 Tech Stack

### Backend
- **Python 3.8+**
- **FastAPI** - Modern, fast web framework
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **Axios** - HTTP client
- **React Router** - Client-side routing

### Database
- **MongoDB** - NoSQL database
- **BSON ObjectId** for document identifiers

## 📁 Project Structure

```
notebook-app/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── config.py            # Configuration and settings
│   │   ├── db.py               # Database connection setup
│   │   ├── models.py           # Pydantic models
│   │   ├── crud.py             # Database operations
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── notebooks.py     # Notebook endpoints
│   │       └── notes.py         # Note endpoints
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/              # Radix UI components
    │   │   │   ├── accordion.jsx
    │   │   │   ├── alert-dialog.jsx
    │   │   │   ├── avatar.jsx
    │   │   │   ├── button.jsx
    │   │   │   ├── card.jsx
    │   │   │   ├── dialog.jsx
    │   │   │   ├── dropdown-menu.jsx
    │   │   │   ├── form.jsx
    │   │   │   ├── input.jsx
    │   │   │   ├── label.jsx
    │   │   │   ├── navigation-menu.jsx
    │   │   │   ├── table.jsx
    │   │   │   ├── tabs.jsx
    │   │   │   └── textarea.jsx
    │   ├── pages/
    │   │   ├── Home.jsx         # Notebooks listing page
    │   │   └── Notebook.jsx     # Single notebook view
    │   ├── api/
    │   │   └── notebooks.js     # API service functions
    │   ├── lib/
    │   │   └── utils.js         # Utility functions
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── eslint.config.js
```

## 🚀 Installation

### Prerequisites

- **Python 3.8+**
- **Node.js 16+**
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your MongoDB connection string and other settings.

5. **Run the backend server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment configuration:**
   Create `.env` file:
   ```env
   VITE_BACKEND_API=http://localhost:8000/api
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB=notebook
ORIGINS=["http://localhost:5173","http://127.0.0.1:5173"]
```

### Frontend Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_BACKEND_API=http://localhost:8000/api
```

## 📚 API Documentation

### Base URL
```
http://localhost:8000
```

### Interactive Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Endpoints

#### Notebooks
- `GET /api/notebooks/` - List all notebooks
- `GET /api/notebooks/{id}` - Get specific notebook
- `POST /api/notebooks/` - Create new notebook
- `DELETE /api/notebooks/{id}` - Delete notebook

#### Notes
- `POST /api/notebooks/{nb_id}/notes/` - Add note to notebook
- `PATCH /api/notebooks/{nb_id}/notes/{note_id}` - Update note
- `DELETE /api/notebooks/{nb_id}/notes/{note_id}` - Delete note

### Example Requests

**Create Notebook:**
```bash
curl -X POST "http://localhost:8000/api/notebooks/" \
  -H "Content-Type: application/json" \
  -d '{"title": "My Notebook", "description": "Personal notes"}'
```

**Add Note:**
```bash
curl -X POST "http://localhost:8000/api/notebooks/{notebook_id}/notes/" \
  -H "Content-Type: application/json" \
  -d '{"title": "Meeting Notes", "content": "Discussed project timeline", "tags": ["work", "meeting"]}'
```

## 🛠 Development

### Backend Development

1. **Code Structure:**
   - `app/main.py` - FastAPI app initialization and middleware
   - `app/config.py` - Configuration management with Pydantic
   - `app/db.py` - MongoDB connection setup
   - `app/models.py` - Pydantic models for request/response
   - `app/crud.py` - Database operations
   - `app/routes/` - API route handlers

2. **Adding New Features:**
   - Define models in `models.py`
   - Add CRUD operations in `crud.py`
   - Create routes in appropriate router files
   - Update API documentation with docstrings

### Frontend Development

1. **Component Architecture:**
   - **Pages**: Top-level route components
   - **UI Components**: Reusable Radix UI components
   - **API Layer**: Axios-based service functions

2. **State Management:**
   - React hooks for local state
   - API calls for data persistence
   - Route parameters for navigation state

3. **Styling:**
   - Tailwind CSS for utility-first styling
   - Custom components built on Radix UI primitives
   - Responsive design patterns

## 🚀 Deployment

### Backend Deployment

1. **Production Server:**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

2. **Environment Setup:**
   - Set production MongoDB URI
   - Configure CORS origins for production domain
   - Use production-grade ASGI server (e.g., Gunicorn with Uvicorn workers)

### Frontend Deployment

1. **Build for Production:**
   ```bash
   npm run build
   ```

2. **Serve Static Files:**
   - Use Nginx, Apache, or CDN
   - Configure reverse proxy for API calls
   - Set environment variables for production API URL

### Docker Deployment (Optional)

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - MONGO_URI=mongodb://mongo:27017
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_BACKEND_API=http://localhost:8000/api

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint and Prettier for JavaScript/React
- Write meaningful commit messages
- Update documentation for new features
- Add tests for new functionality

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Check `ORIGINS` in backend configuration
   - Ensure frontend URL is included in allowed origins

2. **MongoDB Connection:**
   - Verify MongoDB is running
   - Check connection string in environment variables
   - Ensure database permissions are correct

3. **Frontend API Calls:**
   - Verify `VITE_BACKEND_API` environment variable
   - Check browser console for CORS or network errors
   - Ensure backend server is running

### Getting Help

- Check the API documentation at `/docs`
- Review browser console for frontend errors
- Check backend logs for server errors
- Open an issue with detailed description of the problem

## 🙏 Acknowledgments

- **FastAPI** team for the excellent web framework
- **React** team for the frontend library
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the database solution

---

**Note**: This is a development version. For production deployment, ensure proper security measures, environment configuration, and monitoring are in place.






**if do not work, re-install**

'''
rm -rf notebook_venv
python3 -m venv notebook_venv
source notebook_venv/bin/activate
which python
which pip
'''

'''
pip install fastapi uvicorn motor pymongo python-dotenv --break-system-packages
'''

'''
uvicorn app.main:app --reload --port 8000
'''