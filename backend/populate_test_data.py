import os
import sys
from datetime import datetime
from database_sync import database, get_students_collection
from dotenv import load_dotenv

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

def create_test_students():
    """Populate MongoDB with realistic test student data"""
    
    test_students = [
        {
            "name": "Marie Tremblay",
            "email": "marie.tremblay@umontreal.ca",
            "interests": ["art", "coffee", "museums", "photography", "cinema"],
            "languages": ["fr", "en"],
            "french_level": "C2",
            "looking_for": ["coffee", "french_help", "cultural_exchange", "photography_walks"],
            "bio": "Local Montreal student passionate about art and photography. Love showing international students around the city and helping with French practice!",
            "avatar_url": None,
            "created_at": datetime.utcnow()
        },
        {
            "name": "John Chen",
            "email": "john.chen@umontreal.ca", 
            "interests": ["technology", "startups", "coffee", "hiking", "board_games"],
            "languages": ["en", "zh", "fr"],
            "french_level": "A2",
            "looking_for": ["french_practice", "study_partners", "tech_enthusiasts", "hiking_buddies"],
            "bio": "International student from China studying Computer Science. Excited to explore Montreal's tech scene and improve my French!",
            "avatar_url": None,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Sophie Martin",
            "email": "sophie.martin@umontreal.ca",
            "interests": ["music", "dance", "coffee", "literature", "yoga"],
            "languages": ["fr", "en", "es"],
            "french_level": "C1", 
            "looking_for": ["language_exchange", "dance_partners", "book_club", "yoga_buddies"],
            "bio": "Music student who loves meeting people from different cultures. Always up for coffee and conversation in multiple languages!",
            "avatar_url": None,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Carlos Rodriguez",
            "email": "carlos.rodriguez@umontreal.ca",
            "interests": ["sports", "cooking", "travel", "music", "startups"],
            "languages": ["es", "en", "fr"],
            "french_level": "B1",
            "looking_for": ["french_practice", "sports_partners", "food_exploration", "cultural_exchange"],
            "bio": "Exchange student from Mexico studying Business. Love trying new foods and exploring Montreal's diverse neighborhoods!",
            "avatar_url": None,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Léa Dubois",
            "email": "lea.dubois@umontreal.ca",
            "interests": ["art", "volunteering", "environment", "reading", "coffee"],
            "languages": ["fr", "en"],
            "french_level": "C2",
            "looking_for": ["french_help", "volunteering_partners", "book_club", "eco_projects"],
            "bio": "Environmental science student passionate about sustainability. Happy to help international students practice French while making new friends!",
            "avatar_url": None,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Ahmed Hassan",
            "email": "ahmed.hassan@umontreal.ca",
            "interests": ["technology", "sports", "gaming", "startups", "coding"],
            "languages": ["ar", "en", "fr"],
            "french_level": "A1",
            "looking_for": ["french_practice", "study_groups", "gaming_buddies", "tech_projects"],
            "bio": "Master's student in AI from Egypt. New to Montreal and looking to connect with fellow tech enthusiasts while learning French!",
            "avatar_url": None,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Isabelle Moreau",
            "email": "isabelle.moreau@umontreal.ca",
            "interests": ["theater", "writing", "coffee", "history", "photography"],
            "languages": ["fr", "en", "it"],
            "french_level": "C2",
            "looking_for": ["cultural_exchange", "writing_partners", "theater_enthusiasts", "city_exploration"],
            "bio": "Literature student and aspiring writer. Love discussing books, theater, and helping international students discover Montreal's cultural scene!",
            "avatar_url": None,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Wei Zhang",
            "email": "wei.zhang@umontreal.ca",
            "interests": ["mathematics", "chess", "technology", "reading", "badminton"],
            "languages": ["zh", "en", "fr"],
            "french_level": "B2",
            "looking_for": ["french_conversation", "chess_partners", "study_groups", "badminton_players"],
            "bio": "PhD student in Mathematics from China. Enjoy strategic games and looking for patient French conversation partners!",
            "avatar_url": None,
            "created_at": datetime.utcnow()
        }
    ]
    
    # Connect to database
    print("🔗 Connecting to MongoDB...")
    if not database.connect():
        print("❌ Failed to connect to MongoDB")
        return
    
    students_db = get_students_collection()
    if students_db is None:  # FIXED: Use "is None" instead of truthy check
        print("❌ Could not access students collection")
        database.close()
        return
    
    # Clear existing test data (optional)
    print("🧹 Clearing existing test students...")
    students_db.delete_many({"email": {"$regex": "@umontreal.ca"}})
    
    # Insert test students
    print("📝 Inserting test students...")
    result = students_db.insert_many(test_students)
    
    print(f"✅ Successfully inserted {len(result.inserted_ids)} test students!")
    
    # Display the inserted students
    print("\n🎓 Test Students Created:")
    print("-" * 50)
    for student in test_students:
        print(f"👤 {student['name']}")
        print(f"   📧 {student['email']}")
        print(f"   🎯 Interests: {', '.join(student['interests'][:3])}...")
        print(f"   🗣️  Languages: {', '.join(student['languages'])}")
        print(f"   🇫🇷 French: {student['french_level']}")
        print(f"   🔍 Looking for: {', '.join(student['looking_for'][:2])}...")
        print()
    
    database.close()
    print("🎉 Database population complete!")

if __name__ == "__main__":
    create_test_students()