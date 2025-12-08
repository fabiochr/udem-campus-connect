from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import File, UploadFile
from uuid import uuid4
import os
from database_sync import database, get_students_collection
from ai_matcher import BilingualAIMatcher, StudentProfile, MatchResult
from typing import List
import json
from datetime import datetime
from pymongo import ReturnDocument
from pydantic import BaseModel

app = FastAPI(
    title="UdeM Campus Connect API",
    description="Bilingual student connection platform for Université de Montréal",
    version="2.0.0"
)
os.makedirs("static/avatars", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize our AI components
matcher = BilingualAIMatcher()

# Connect to MongoDB on startup
@app.on_event("startup")
def startup_event():
    print("🚀 Starting UdeM Campus Connect API...")
    database.connect()

@app.on_event("shutdown")
def shutdown_event():
    print("👋 Shutting down UdeM Campus Connect API...")
    database.close()

@app.get("/")
async def root():
    return {
        "message": "🎓 UdeM Campus Connect API is running!",
        "version": "2.0.0",
        "database": "MongoDB Atlas (Sync)",
        "status": "Connected" if database.is_connected else "Disconnected",
        "ai_engine": "Real OpenAI" if matcher.use_real_ai else "Mock AI",
        "endpoints": {
            "register": "POST /api/students/register",
            "get_matches": "GET /api/students/matches/{student_name}",
            "all_students": "GET /api/students",
            "health": "GET /api/health"
        }
    }

@app.post("/api/students/register")
async def register_student(student: StudentProfile):
    """Register a new student profile with MongoDB"""
    try:
        students_db = get_students_collection()
        if students_db is None:
            raise HTTPException(status_code=503, detail="Database not available")
        
        # Check if a student already exists with same username or email
        query = {
            "$or": [
                {"username": student.username} if student.username else {},
                {"email": student.email}
            ]
        }
        # Clean out any empty dict from the $or
        query["$or"] = [cond for cond in query["$or"] if cond]

        if query["$or"]:
            existing_student = students_db.find_one(query)
            if existing_student:
                raise HTTPException(
                    status_code=400,
                    detail="A student with this username or email already exists"
                )

        # Convert to dict and insert
        student_data = student.dict()
        if not student_data.get("created_at"):
            from datetime import datetime
            student_data["created_at"] = datetime.utcnow()

        result = students_db.insert_one(student_data)
        student_data["_id"] = str(result.inserted_id)

        return {
            "message": "✅ Student registered successfully!",
            "student_id": str(result.inserted_id),
            "student": student_data,
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in register_student: {str(e)}")
        raise HTTPException(status_code=500, detail="Error registering student")

@app.post("/api/upload-avatar")
async def upload_avatar(file: UploadFile = File(...)):
    """Upload a profile avatar image and return its path."""
    try:
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")

        ext = os.path.splitext(file.filename)[1] or ".jpg"
        filename = f"{uuid4().hex}{ext}"
        avatar_dir = os.path.join("static", "avatars")
        os.makedirs(avatar_dir, exist_ok=True)
        file_path = os.path.join(avatar_dir, filename)

        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Return a relative path; frontend will build full URL
        return {"path": f"/static/avatars/{filename}"}
    except HTTPException:
        raise
    except Exception as e:
        print("Error uploading avatar:", e)
        raise HTTPException(status_code=500, detail="Error uploading avatar")

@app.get("/api/students/matches/{student_name}")
async def get_matches(student_name: str, language: str = "en"):
    """Get AI-curated matches for a student from MongoDB"""
    try:
        students_db = get_students_collection()
        if students_db is None:
            raise HTTPException(status_code=503, detail="Database not available")
            
        student = students_db.find_one({
            "$or": [
                {"username": student_name},
                {"name": student_name}
            ]
        })
        if not student:
            raise HTTPException(status_code=404, detail="❌ Student not found")
        
        # Get other students as candidates
        candidates = list(students_db.find({"name": {"$ne": student_name}}))
        
        if not candidates:
            return {
                "matches": [], 
                "message": "👋 No other students registered yet. Be the first! 🎉"
            }
        
        # Convert MongoDB documents to StudentProfile objects
        candidate_profiles = []
        for candidate in candidates:
            candidate_profiles.append(StudentProfile(
                name=candidate["name"],
                email=candidate.get("email", "unknown@umontreal.ca"),
                interests=candidate["interests"],
                languages=candidate["languages"],
                french_level=candidate["french_level"],
                looking_for=candidate["looking_for"],
                bio=candidate["bio"]
            ))
        
        current_student_profile = StudentProfile(
            name=student["name"],
            email=student.get("email", "unknown@umontreal.ca"),
            interests=student["interests"],
            languages=student["languages"],
            french_level=student["french_level"],
            looking_for=student["looking_for"],
            bio=student["bio"]
        )
        
        matches = matcher.find_best_matches(current_student_profile, candidate_profiles, language)
        
        return {
            "student": student_name,
            "language": language,
            "total_candidates": len(candidates),
            "matches_found": len(matches),
            "matches": matches
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get matches: {str(e)}")

@app.get("/api/students")
async def get_all_students():
    """Get all registered students from MongoDB"""
    try:
        students_db = get_students_collection()
        if students_db is None:
            raise HTTPException(status_code=503, detail="Database not available")
            
        students = list(students_db.find())
        
        # Convert ObjectId to string for JSON serialization
        for student in students:
            student["_id"] = str(student["_id"])
            
        return {
            "total_students": len(students),
            "students": students
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch students: {str(e)}")

@app.get("/api/students/{value}")
async def get_student(value: str):
    """Get a specific student's profile by username OR name"""
    try:
        students_db = get_students_collection()
        if students_db is None:
            raise HTTPException(status_code=503, detail="Database not available")
            
        student = students_db.find_one({
            "$or": [
                {"username": value},
                {"name": value}
            ]
        })
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

        
        student["_id"] = str(student["_id"])
        return student
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch student: {str(e)}")

@app.delete("/api/students/{student_name}")
async def delete_student(student_name: str):
    """Delete a student profile"""
    try:
        students_db = get_students_collection()
        if students_db is None:
            raise HTTPException(status_code=503, detail="Database not available")
            
        result = students_db.delete_one({"name": student_name})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Student not found")
            
        return {"message": f"Student {student_name} deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete student: {str(e)}")

@app.get("/api/challenges/suggest/{student_name}")
async def suggest_challenges(student_name: str, language: str = "en"):
    """Suggest personalized challenges for a student"""
    try:
        students_db = get_students_collection()
        if students_db is None:
            raise HTTPException(status_code=503, detail="Database not available")
            
        student = students_db.find_one({"name": student_name})
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")
        
        # Mock challenge suggestions based on student interests
        challenges_en = [
            f"Visit a museum related to {student['interests'][0] if student['interests'] else 'art'}",
            f"Order coffee in French at a local café",
            f"Join a {student['interests'][1] if len(student['interests']) > 1 else 'student'} club on campus",
            "Explore Old Montreal and take photos",
            "Attend a free campus workshop or event"
        ]
        
        challenges_fr = [
            f"Visiter un musée lié à {student['interests'][0] if student['interests'] else 'art'}",
            "Commander un café en français dans un café local",
            f"Rejoindre un club de {student['interests'][1] if len(student['interests']) > 1 else 'étudiant'} sur le campus",
            "Explorer le Vieux-Montréal et prendre des photos",
            "Assister à un atelier ou événement universitaire gratuit"
        ]
        
        challenges = challenges_fr if language == "fr" else challenges_en
        
        return {
            "student": student_name,
            "language": language,
            "personalized_challenges": challenges[:3]
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to suggest challenges: {str(e)}")
class ConnectionRequest(BaseModel):
    student_id: str
    partner_id: str
@app.post("/api/connections/connect")
async def connect_students(request: ConnectionRequest):  # FIXED
    """Connect two students"""
    try:
        connections_db = database.db.connections
        connection = {
            "student_id": request.student_id,  # FIXED
            "partner_id": request.partner_id,   # FIXED
            "status": "connected",
            "connected_at": datetime.utcnow()
        }
        result = connections_db.insert_one(connection)
        return {"message": "Connected successfully", "connection_id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Connection failed: {str(e)}")

@app.get("/api/connections/{student_id}")
async def get_connections(student_id: str):
    """Get all connections for a student"""
    try:
        connections_db = database.db.connections
        connections = list(connections_db.find({"student_id": student_id}))
        
        # Convert ObjectId to string
        for conn in connections:
            conn["_id"] = str(conn["_id"])
            
        return {"connections": connections}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get connections: {str(e)}")
    
@app.get("/api/events")
async def get_events():
    """Get Montreal campus events"""
    events = [
        {
            "id": "1",
            "title": "International Food Fair",
            "description": "Taste foods from around the world with fellow students",
            "category": "cultural",
            "date": "2024-12-15",
            "time": "18:00",
            "location": "University Center",
            "imageUrl": "/images/food-fair.jpg",
            "participants": 156,
            "maxCapacity": 200
        },
        {
            "id": "2", 
            "title": "French Conversation Cafe",
            "description": "Practice French in a relaxed cafe setting",
            "category": "language",
            "date": "2024-12-12",
            "time": "16:00", 
            "location": "Campus Cafe",
            "imageUrl": "/images/french-cafe.jpg",
            "participants": 42,
            "maxCapacity": 50
        }
    ]
    return {"events": events}
    
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    students_db = get_students_collection()
    student_count = 0
    if students_db is not None:
        student_count = students_db.count_documents({})
    
    return {
        "status": "✅ healthy",
        "service": "MontrealCampus Connect API",
        "database": "Connected" if database.is_connected else "Disconnected",
        "ai_engine": "Real OpenAI" if matcher.use_real_ai else "Mock AI",
        "students_registered": student_count,
        "features": ["student_matching", "bilingual_support", "mongodb_storage", "real_ai_matching"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)