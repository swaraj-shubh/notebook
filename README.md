# Notebook Web Application

A full-stack notebook management web application built with FastAPI backend and React frontend. Organize your notes in notebooks with a clean, intuitive interface.

## 🚀 Features

### Backend (FastAPI)
- **RESTful API** with proper HTTP methods and status codes
- **MongoDB** integration with Motor for async operations
- **CORS** enabled for frontend communication
- **Pydantic** models for data validation
- **Environment variables** configuration
- Automatic API documentation with Swagger UI

### Frontend (React)
- **Modern UI** with Tailwind CSS and Radix UI components
- **Responsive design** that works on all devices
- **Real-time operations** for creating, reading, updating, and deleting
- **Modal-based editing** for seamless user experience
- **Tag system** for organizing notes
- **Clean navigation** between notebooks and notes

## 🛠 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Axios** - HTTP client
- **React Router** - Navigation

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
│   │   ├── db.py                # MongoDB connection
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── notebooks.py     # Notebook endpoints
│   │       └── notes.py         # Note endpoints
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ui/              # Radix UI components
    │   ├── pages/
    │   │   ├── Home.jsx         # Notebooks list
    │   │   └── Notebook.jsx     # Single notebook view
    │   ├── api/
    │   │   └── notebooks.js     # API service functions
    │   ├── lib/
    │   │   └── utils.js         # Utility functions
    │   ├── App.jsx
    │   └── main.jsx
    ├── tailwind.config.js
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB (local or cloud)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017
   MONGO_DB=notebook
   ORIGINS=["http://localhost:5173","http://127.0.0.1:5173"]
   ```

5. **Start the backend server**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

The backend will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## 📚 API Endpoints

### Notebooks
- `GET /api/notebooks/` - List all notebooks
- `POST /api/notebooks/` - Create a new notebook
- `GET /api/notebooks/{id}` - Get specific notebook
- `DELETE /api/notebooks/{id}` - Delete notebook

### Notes
- `POST /api/notebooks/{nb_id}/notes/` - Add note to notebook
- `PATCH /api/notebooks/{nb_id}/notes/{note_id}` - Update note
- `DELETE /api/notebooks/{nb_id}/notes/{note_id}` - Delete note

## 🎯 Usage

### Managing Notebooks
1. **Create Notebook**: Click "Create Notebook" button on home page
2. **View Notebooks**: All notebooks are displayed in a grid layout
3. **Delete Notebook**: Use the delete button on notebook cards

### Managing Notes
1. **Add Notes**: Click "Add New Note" inside a notebook
2. **View Notes**: Click on any note to view details in full-page modal
3. **Edit Notes**: Use the edit button in note view
4. **Tag Notes**: Add comma-separated tags when creating/editing notes
5. **Delete Notes**: Use delete button in note view

## 🔧 Configuration

### Backend Configuration
The application uses environment variables for configuration:
- `MONGO_URI`: MongoDB connection string
- `MONGO_DB`: Database name
- `ORIGINS`: Allowed CORS origins

### Frontend Configuration
- API base URL is configured in `src/api/notebooks.js`
- Tailwind CSS is configured in `tailwind.config.js`
- Vite aliases are set up for `@/` imports

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS origins include your frontend URL
   - Check that both servers are running

2. **MongoDB Connection Issues**
   - Verify MongoDB is running
   - Check connection string in `.env` file

3. **API Connection Errors**
   - Verify backend is running on port 8000
   - Check network connectivity

4. **Frontend Build Issues**
   - Clear node_modules and reinstall dependencies
   - Check Node.js version compatibility

## 📝 Development

### Adding New Features
1. Backend: Add routes in appropriate router files
2. Backend: Update CRUD operations as needed
3. Frontend: Create new components in `src/components/`
4. Frontend: Add API service functions in `src/api/`

### Styling
- Use Tailwind CSS utility classes
- Follow existing component patterns
- Maintain responsive design principles

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use production ASGI server (e.g., Gunicorn with Uvicorn workers)
3. Configure reverse proxy (Nginx) if needed

### Frontend Deployment
1. Build the application: `npm run build`
2. Serve static files from build directory
3. Configure API URL for production environment

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Check the API documentation at `http://127.0.0.1:8000/docs`
- Review the browser console for frontend errors
- Check backend logs for server-side issues

---

**Happy Note-Taking!** 📒✨