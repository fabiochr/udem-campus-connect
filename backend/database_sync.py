import os
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from datetime import datetime
import json

# Load environment variables
load_dotenv()

class MongoDB:
    def __init__(self):
        self.client = None
        self.db = None
        self.is_connected = False
        
    def connect(self):
        """Connect to MongoDB Atlas synchronously"""
        try:
            connection_string = os.getenv("MONGODB_URI")
            if not connection_string:
                print("❌ MONGODB_URI not found in environment variables")
                return False
                
            print("🔗 Connecting to MongoDB Atlas...")
            
            # Use your exact connection string
            self.client = MongoClient(
                connection_string,
                server_api=ServerApi('1'),
                serverSelectionTimeoutMS=30000,
                connectTimeoutMS=30000
            )
            self.db = self.client.montreal_campus
            
            # Test connection
            self.client.admin.command('ping')
            self.is_connected = True
            print("✅ Successfully connected to MongoDB Atlas!")
            print("📊 Database: montreal_campus")
            return True
            
        except Exception as e:
            print(f"❌ MongoDB connection failed: {e}")
            self.is_connected = False
            return False
    
    def close(self):
        """Close MongoDB connection"""
        if self.client:
            self.client.close()
            self.is_connected = False
            print("🔌 MongoDB connection closed")

# Global database instance
database = MongoDB()

# Collection references
def get_students_collection():
    return database.db.students if database.is_connected else None

def get_matches_collection():
    return database.db.matches if database.is_connected else None

def get_challenges_collection():
    return database.db.challenges if database.is_connected else None

def get_forum_collection():
    return database.db.forum_posts if database.is_connected else None

def get_marketplace_collection():
    return database.db.marketplace_items if database.is_connected else None

# Replace the test_connection function with this fixed version:
def test_connection():
    """Test the MongoDB connection"""
    print("🧪 Testing MongoDB connection...")
    
    if database.connect():
        print("🎉 Connection test successful!")
        
        # Test insert - FIXED: Check if collection is not None
        students_db = get_students_collection()
        if students_db is not None:  # FIX: Use "is not None" instead of truthy check
            test_student = {
                "name": "Sync Test Student",
                "interests": ["testing", "development"],
                "languages": ["en", "fr"],
                "french_level": "B1",
                "looking_for": ["coffee", "study_partners"],
                "bio": "Test account for database verification",
                "created_at": datetime.utcnow()
            }
            result = students_db.insert_one(test_student)
            print(f"📝 Test document inserted with ID: {result.inserted_id}")
            
            # Clean up
            students_db.delete_one({"_id": result.inserted_id})
            print("🧹 Test document cleaned up")
        else:
            print("❌ Students collection not available")
        
        database.close()
        return True
    else:
        print("💥 Connection test failed!")
        return False
if __name__ == "__main__":
    test_connection()