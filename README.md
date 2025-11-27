# Notebook App 📒

A modern, full-stack note organization application with embedded document architecture, built with FastAPI and React.

- 🚀 **Deployment:** [notebook.shubhh.xyz](https://notebook.shubhh.xyz/)

## 🌟 Features

### Core Functionality
- **Notebook Management**: Create, view, and delete notebooks
- **Embedded Notes**: Notes are stored within notebooks using MongoDB embedded documents
- **Rich Text Notes**: Support for formatted content and tagging system
- **Real-time Updates**: Instant synchronization between frontend and backend
- **Responsive Design**: Modern UI that works on all devices

### Technical Features
- **FastAPI Backend**: High-performance async Python backend
- **React Frontend**: Modern React with hooks and functional components
- **MongoDB**: NoSQL database with embedded document architecture
- **RESTful API**: Clean API design with proper HTTP methods
- **Type Safety**: Pydantic models for data validation

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server
- **Python 3.8+**

### Frontend
- **React 18** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **Radix UI** - Accessible UI components

### Database
- **MongoDB** - Document database
- **Embedded Documents** - Notes stored within notebooks

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/notebook-app.git
cd notebook-app
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB=notebook
ORIGINS=*
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_BACKEND_API=http://127.0.0.1:8000/api
```

4. **Run the Application**

Start the backend:
```bash
cd backend
uvicorn app.main:app --reload
```

Start the frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## 📁 Project Structure

```
notebook-app/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application
│   │   ├── config.py            # Configuration settings
│   │   ├── models.py            # Pydantic models
│   │   ├── crud.py              # Database operations
│   │   ├── db.py                # Database connection
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── notebooks.py     # Notebook endpoints
│   │       └── notes.py         # Note endpoints
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/              # Reusable UI components
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Notebooks list page
│   │   │   └── Notebook.jsx     # Single notebook page
│   │   ├── api/
│   │   │   └── notebooks.js     # API client
│   │   ├── lib/
│   │   │   └── utils.js         # Utility functions
│   │   └── App.jsx              # Main app component
│   └── package.json
└── README.md
```

## 🔑 API Endpoints

### Notebooks
- `GET /api/notebooks/` - List all notebooks
- `POST /api/notebooks/` - Create a new notebook
- `GET /api/notebooks/{id}` - Get a specific notebook
- `DELETE /api/notebooks/{id}` - Delete a notebook

### Notes
- `POST /api/notebooks/{id}/notes/` - Create a new note in a notebook
- `PATCH /api/notebooks/{id}/notes/{note_id}` - Update a note
- `DELETE /api/notebooks/{id}/notes/{note_id}` - Delete a note

## 🗂️ Data Models

### Notebook
```python
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "created_at": "datetime",
  "notes": [Note]  # Embedded documents
}
```

### Note
```python
{
  "_id": "ObjectId",
  "title": "string",
  "content": "string",
  "tags": ["string"],
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## 🎯 Key Features Explained

### Embedded Document Architecture
- Notes are stored as embedded documents within notebooks
- Provides better performance for read-heavy operations
- Natural data relationship modeling
- Single database query retrieves notebook with all notes

### Async Operations
- Backend uses async/await for non-blocking I/O operations
- Motor provides async MongoDB operations
- FastAPI handles concurrent requests efficiently

### Modern UI/UX
- Clean, intuitive interface for note management
- Full-page modals for focused editing
- Responsive design for mobile and desktop
- Real-time feedback for user actions

## 🚀 Deployment

### Backend Deployment (Example: Heroku)
```bash
# Add Procfile
web: uvicorn app.main:app --host=0.0.0.0 --port=$PORT

# Deploy
git push heroku main
```

### Frontend Deployment (Example: Vercel)
```bash
npm run build
vercel --prod
```

### Environment Variables for Production
```env
# Backend
MONGO_URI=your_mongodb_atlas_connection_string
MONGO_DB=notebook-prod
ORIGINS=https://your-frontend-domain.vercel.app

# Frontend
VITE_BACKEND_API=https://your-backend-domain.herokuapp.com/api
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests or open issues for bugs and feature requests.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Backend: Follow PEP 8 guidelines
- Frontend: Use ESLint and Prettier configuration
- Commit messages: Use conventional commit format

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- FastAPI for the excellent documentation and performance
- MongoDB for flexible document storage
- React community for extensive component ecosystem
- Tailwind CSS for rapid UI development

## 📞 Contact

For questions or support, please contact:
- Email: your-email@example.com
- GitHub: [Notebook App Repository](https://github.com/your-username/notebook-app)

---

**Built with ❤️ by Shubham Verma**