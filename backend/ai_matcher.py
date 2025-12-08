import os
import random
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# DATA MODELS
class StudentProfile(BaseModel):
    name: str
    email: str
    interests: List[str]
    languages: List[str]
    french_level: str
    looking_for: List[str]
    bio: str
    username: Optional[str] = None
    avatar_url: Optional[str] = None
    created_at: datetime = datetime.utcnow()

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    interests: List[str]
    languages: List[str]
    french_level: str
    looking_for: List[str]
    bio: str

class UserLogin(BaseModel):
    email: str
    password: str

class MatchResult(BaseModel):
    match_score: float
    explanation: str
    common_interests: List[str]
    suggested_activity: str

class BilingualAIMatcher:
    def __init__(self):
        # ALWAYS setup mock attributes first (crucial for fallback)
        self._setup_mock_attributes()
        
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.use_real_ai = bool(self.openai_api_key and self.openai_api_key != "sk-proj-.....YbmUA")
        
        if self.use_real_ai:
            try:
                from langchain_openai import ChatOpenAI
                from langchain_core.messages import SystemMessage, HumanMessage
                
                self.llm = ChatOpenAI(
                    model="gpt-3.5-turbo",
                    temperature=0.7,
                    max_tokens=1000,
                    openai_api_key=self.openai_api_key
                )
                self.SystemMessage = SystemMessage
                self.HumanMessage = HumanMessage
                print("🤖 Using REAL OpenAI for matching")
                
            except ImportError as e:
                print(f"❌ langchain-openai import failed: {e}")
                self.use_real_ai = False
                print("🤖 Falling back to MOCK AI")
            except Exception as e:
                print(f"❌ OpenAI setup failed: {e}")
                self.use_real_ai = False
                print("🤖 Falling back to MOCK AI")
        else:
            print("🤖 Using MOCK AI (no valid OpenAI API key found)")
    
    def _setup_mock_attributes(self):
        """ALWAYS setup mock attributes - crucial for fallback"""
        self.activities_en = [
            "Coffee chat at Café Campus",
            "Study session at the library", 
            "Visit Montreal Museum of Fine Arts",
            "Explore Mount Royal Park",
            "French conversation practice at a café",
            "Try poutine at La Banquise",
            "Attend a campus event together",
            "Explore Old Montreal and practice French",
            "Visit Jean-Talon Market for local food",
            "Study together at BANQ library"
        ]
        
        self.activities_fr = [
            "Café discussion au Café Campus",
            "Session d'étude à la bibliothèque",
            "Visite du Musée des Beaux-Arts de Montréal",
            "Exploration du parc du Mont-Royal",
            "Pratique de conversation française dans un café",
            "Déguster une poutine à La Banquise",
            "Assister à un événement universitaire ensemble",
            "Explorer le Vieux-Montréal et pratiquer le français",
            "Visiter le marché Jean-Talon pour la nourriture locale",
            "Étudier ensemble à la bibliothèque BANQ"
        ]
        
        self.explanations_en = [
            "Great match! You both share interests in {interests} and could help each other with language exchange.",
            "Perfect connection! Your shared passion for {interests} makes this a promising friendship.",
            "Excellent match for cultural exchange and practicing French together! You both enjoy {interests}.",
            "You both seem to enjoy similar activities like {interests} and could explore Montreal together.",
            "Strong compatibility! Shared interests in {interests} and complementary language skills.",
            "Ideal match for language practice and cultural exploration. Common interests: {interests}."
        ]
        
        self.explanations_fr = [
            "Excellent jumelage ! Vous partagez des intérêts communs pour {interests} et pourriez vous aider mutuellement avec l'échange linguistique.",
            "Connexion parfaite ! Votre passion commune pour {interests} rend cette amitié prometteuse.",
            "Jumelage idéal pour l'échange culturel et pratiquer le français ensemble ! Vous aimez tous les deux {interests}.",
            "Vous semblez tous deux apprécier des activités similaires comme {interests} et pourriez explorer Montréal ensemble.",
            "Forte compatibilité ! Intérêts communs pour {interests} et compétences linguistiques complémentaires.",
            "Jumelage parfait pour la pratique linguistique et l'exploration culturelle. Intérêts communs : {interests}."
        ]
    
    def find_best_matches(self, student: StudentProfile, candidates: List[StudentProfile], language: str = "en") -> List[MatchResult]:
        """Find the best matches for a student from candidate list"""
        
        if self.use_real_ai:
            try:
                return self._find_matches_real_ai(student, candidates, language)
            except Exception as e:
                print(f"❌ Real AI failed, falling back to mock: {e}")
                # Ensure mock attributes exist before falling back
                self._ensure_mock_attributes()
                return self._find_matches_mock(student, candidates, language)
        else:
            self._ensure_mock_attributes()
            return self._find_matches_mock(student, candidates, language)
    
    def _ensure_mock_attributes(self):
        """Ensure mock attributes exist (safety check)"""
        if not hasattr(self, 'explanations_en'):
            self._setup_mock_attributes()
    
    def _find_matches_real_ai(self, student: StudentProfile, candidates: List[StudentProfile], language: str) -> List[MatchResult]:
        """Use real OpenAI for matching"""
        matches = []
        
        for candidate in candidates:
            if student.name == candidate.name:
                continue
                
            prompt = self._create_match_prompt(student, candidate, language)
            
            try:
                response = self.llm.invoke([
                    self.SystemMessage(content=self._get_system_prompt(language)),
                    self.HumanMessage(content=prompt)
                ])
                
                # Parse the AI response
                match_result = self._parse_ai_response(response.content, student, candidate, language)
                matches.append(match_result)
                
            except Exception as e:
                print(f"❌ OpenAI API error for {candidate.name}: {e}")
                # Fallback to mock matching for this candidate
                mock_match = self._create_mock_match(student, candidate, language)
                matches.append(mock_match)
        
        return sorted(matches, key=lambda x: x.match_score, reverse=True)[:3]
    
    def _find_matches_mock(self, student: StudentProfile, candidates: List[StudentProfile], language: str) -> List[MatchResult]:
        """Use mock AI for matching"""
        matches = []
        
        for candidate in candidates:
            if student.name == candidate.name:
                continue
                
            mock_match = self._create_mock_match(student, candidate, language)
            matches.append(mock_match)
        
        return sorted(matches, key=lambda x: x.match_score, reverse=True)[:3]
    
    def _create_match_prompt(self, student: StudentProfile, candidate: StudentProfile, language: str) -> str:
        return f"""
        Analyze this potential student match for MontrealCampus Connect and provide response in {language}:

        STUDENT SEEKING CONNECTIONS:
        - Name: {student.name}
        - Interests: {', '.join(student.interests)}
        - Languages: {', '.join(student.languages)}
        - French Level: {student.french_level}
        - Looking For: {', '.join(student.looking_for)}
        - Bio: {student.bio}

        POTENTIAL MATCH:
        - Name: {candidate.name}
        - Interests: {', '.join(candidate.interests)}
        - Languages: {', '.join(candidate.languages)}
        - French Level: {candidate.french_level}
        - Looking For: {', '.join(candidate.looking_for)}
        - Bio: {candidate.bio}

        Please provide a comprehensive analysis with:
        1. Match compatibility score (0-100)
        2. Detailed explanation of why they would connect well
        3. List of common interests they share
        4. One specific, realistic activity suggestion for Montreal

        Focus on language exchange potential, shared interests, and cultural compatibility.
        """
    
    def _get_system_prompt(self, language: str) -> str:
        if language == "fr":
            return """
            Vous êtes un assistant expert pour MontrealCampus Connect, une plateforme de connexion étudiante.
            Votre rôle est d'analyser les compatibilités entre étudiants basées sur leurs intérêts, compétences linguistiques et objectifs.
            Fournissez des analyses détaillées et des suggestions d'activités spécifiques à Montréal.
            Soyez encourageant et mettez l'accent sur la construction de communauté.
            """
        else:
            return """
            You are an expert assistant for MontrealCampus Connect, a student connection platform.
            Your role is to analyze student compatibilities based on interests, language skills, and goals.
            Provide detailed analyses and specific activity suggestions for Montreal.
            Be encouraging and focus on community building.
            """
    
    def _parse_ai_response(self, response: str, student: StudentProfile, candidate: StudentProfile, language: str) -> MatchResult:
        """Parse AI response into structured match result"""
        common_interests = list(set(student.interests) & set(candidate.interests))
        
        # Extract score from response (basic implementation)
        score = 75  # Default
        if "score" in response.lower():
            try:
                # Look for numbers in the response
                import re
                numbers = re.findall(r'\b(\d{1,3})\b', response)
                if numbers:
                    score = min(int(numbers[0]), 100)
            except:
                pass
        
        return MatchResult(
            match_score=score,
            explanation=response[:500] + "..." if len(response) > 500 else response,
            common_interests=common_interests,
            suggested_activity=self._get_activity_suggestion(common_interests, language)
        )
    
    def _create_mock_match(self, student: StudentProfile, candidate: StudentProfile, language: str) -> MatchResult:
        """Create a mock match result"""
        common_interests = list(set(student.interests) & set(candidate.interests))
        
        # Calculate match score based on common interests and language compatibility
        base_score = len(common_interests) * 12
        language_bonus = 0
        
        if ("french_practice" in student.looking_for and "fr" in candidate.languages) or \
           ("french_help" in candidate.looking_for and student.french_level in ["B2", "C1", "C2"]):
            language_bonus += 20
        
        looking_for_bonus = len(set(student.looking_for) & set(candidate.looking_for)) * 5
        
        total_score = min(max(base_score + language_bonus + looking_for_bonus, 65), 95)
        
        # Choose explanation and activity based on language
        explanations = self.explanations_fr if language == "fr" else self.explanations_en
        activities = self.activities_fr if language == "fr" else self.activities_en
        
        explanation = random.choice(explanations).format(
            interests=", ".join(common_interests) if common_interests else "various activities"
        )
        
        activity = random.choice(activities)
        
        return MatchResult(
            match_score=total_score,
            explanation=explanation,
            common_interests=common_interests,
            suggested_activity=activity
        )
    
    def _get_activity_suggestion(self, common_interests: List[str], language: str) -> str:
        """Get activity suggestion based on common interests"""
        if not common_interests:
            return "Coffee chat at a campus café" if language == "en" else "Café discussion au Café Campus"
        
        interest = common_interests[0]
        activities = {
            "art": "Visit Montreal Museum of Fine Arts",
            "coffee": "Try a local Montreal café",
            "museums": "Explore Montreal's museum district",
            "technology": "Attend a tech meetup or workshop",
            "sports": "Play sports at Mount Royal Park",
            "music": "Check out local live music venues",
            "photography": "Photo walk through Old Montreal",
            "cinema": "Watch a film at Cinéma du Parc"
        }
        
        fr_activities = {
            "art": "Visiter le Musée des Beaux-Arts de Montréal",
            "coffee": "Essayer un café local montréalais",
            "museums": "Explorer le quartier des musées de Montréal",
            "technology": "Assister à une rencontre technologique ou un atelier",
            "sports": "Faire du sport au parc du Mont-Royal",
            "music": "Découvrir les salles de musique locales",
            "photography": "Promenade photo dans le Vieux-Montréal",
            "cinema": "Regarder un film au Cinéma du Parc"
        }
        
        activity_map = fr_activities if language == "fr" else activities
        return activity_map.get(interest, random.choice(list(activity_map.values())))