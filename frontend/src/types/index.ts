// Core data types matching our backend
export interface StudentProfile {
  id?: string; // ADD THIS
  name: string;
  email: string;
  username?: string;
  interests: string[];
  languages: string[];
  french_level: string;
  looking_for: string[];
  bio: string;
  avatar_url?: string;
  created_at?: Date;
}

export interface MatchResult {
  id: string; // ADD THIS
  name: string; // ADD THIS
  avatar_url?: string; // ADD THIS
  native_language: string; // ADD THIS
  target_language: string; // ADD THIS
  bio?: string; // ADD THIS
  match_score: number;
  explanation: string;
  common_interests: string[];
  suggested_activity: string;
}

export interface AppContextType {
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
  currentStudent: StudentProfile | null;
  setCurrentStudent: (student: StudentProfile | null) => void;
  t: (key: string) => string;
  logout?: () => void; // ADD THIS
}

// Language dictionary type
export type TranslationKey = 
  | 'welcome.title'
  | 'welcome.subtitle'
  | 'navigation.matches'
  | 'navigation.challenges'
  | 'navigation.map'
  | 'navigation.forum'
  | 'navigation.marketplace'
  | 'profile.create'
  | 'profile.interests'
  | 'matches.title'
  | 'matches.noMatches'
  | 'challenges.title'
  | 'common.loading'
  | 'common.error'
  | 'common.success';

// ============================================================================
// LANGUAGE TYPES (FIXED)
// ============================================================================

// For translations - use string literal types
export type LanguageCode = 'en' | 'fr';

// For language data objects
export interface Language {
  id: string;
  name: string;
  code: LanguageCode;  // Use the string literal type
  level?: string;
  flag?: string;
  proficiency?: number;
}

// ============================================================================
// TYPES THAT MATCH YOUR MOCK DATA STRUCTURE
// ============================================================================

export interface LanguagePartner {
  id: string;
  name: string;
  nativeLanguage: string;
  learningLanguage: string;
  matchScore: number;
  avatarUrl?: string;
  bio?: string;
  email?: string;
  avatar?: string;
  languages?: any[];
  interests?: string[];
  matchPercentage?: number;
  university?: string;
  faculty?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  participants: number;
  maxCapacity?: number;
  image?: string;
  duration?: string;
}

export interface StudyChallenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  startDate: string;
  endDate: string;
  category: string;
  points?: number;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  rewards?: string[];
}