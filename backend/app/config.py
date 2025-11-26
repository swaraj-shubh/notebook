# app/config.py
class Settings:
    MONGO_URI = "mongodb+srv://username:password@cluster0.mongodb.net/notebook?retryWrites=true&w=majority"
    MONGO_DB = "notebook"
    
    # 🔥 ONLY allow your frontend domains
    ORIGINS = [
        "https://notebook.shubhh.xyz",
        "https://notebook-two-psi.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

settings = Settings()
