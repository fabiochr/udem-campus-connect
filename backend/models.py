from datetime import datetime
from typing import List, Optional, Literal
from pydantic import BaseModel, EmailStr, Field


# =========================
# Student models
# =========================

class StudentBase(BaseModel):
    name: str
    email: EmailStr
    interests: List[str]
    languages: List[str]
    french_level: str
    looking_for: List[str]
    bio: str
    avatar_url: Optional[str] = None
    role: Optional[Literal["udem_student", "guest"]] = "guest"


class StudentCreate(StudentBase):
    """
    Data we expect from the frontend when registering.
    The frontend already sends an 'id' and created_at, but
    we keep them optional so the backend can also generate them.
    """
    id: Optional[str] = None
    created_at: Optional[datetime] = None


class StudentInDB(StudentBase):
    """
    Representation stored in MongoDB.
    We use 'id' as a stable string ID used by the frontend.
    Mongo's native _id will still exist, but we won't rely on it.
    """
    id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    is_active: bool = True


class StudentPublic(StudentInDB):
    """
    What we return to the frontend.
    Same as StudentInDB for now, but easy to hide fields later.
    """
    pass


# =========================
# Event models
# =========================

class EventBase(BaseModel):
    title: str
    description: str
    category: str
    date: str       # keep simple for now to match TS type
    time: str
    location: str
    imageUrl: Optional[str] = None
    maxCapacity: Optional[int] = None
    duration: Optional[str] = None


class EventCreate(EventBase):
    id: Optional[str] = None


class EventInDB(EventBase):
    id: str
    participants: int = 0


class EventPublic(EventInDB):
    pass


# =========================
# Connection models
# =========================

class ConnectionBase(BaseModel):
    student_id: str
    partner_id: str
    status: Literal["pending", "accepted"] = "pending"


class ConnectionCreate(ConnectionBase):
    pass


class ConnectionInDB(ConnectionBase):
    id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_message_at: Optional[datetime] = None
    notes: Optional[str] = None


class ConnectionPublic(ConnectionInDB):
    pass


# =========================
# Challenge response model
# =========================

class ChallengeSuggestionResponse(BaseModel):
    student: str
    language: str
    personalized_challenges: List[str]
