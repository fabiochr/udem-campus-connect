import { Event, LanguagePartner, StudyChallenge } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Cherry Blossom Festival',
    description: 'Join us for a celebration of spring and Japanese culture',
    category: 'cultural',
    date: '2025-12-01',
    time: '14:00',
    location: 'Jardin Botanique',
    imageUrl: 'https://images.unsplash.com/photo-1761124739933-009df5603fbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGZlc3RpdmFsJTIwZGl2ZXJzaXR5fGVufDF8fHx8MTc2NDA5MDczOHww&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 234,
    maxCapacity: 300
  },
  {
    id: '2',
    title: 'International Food Fair',
    description: 'Taste cuisines from around the world',
    category: 'cultural',
    date: '2025-12-05',
    time: '18:00',
    location: 'Campus Cafeteria',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    participants: 156,
    maxCapacity: 200
  },
  {
    id: '3',
    title: 'Math Study Session',
    description: 'Collaborative calculus problem solving',
    category: 'study',
    date: '2025-11-28',
    time: '16:00',
    location: 'Library Room 301',
    imageUrl: 'https://images.unsplash.com/photo-1704748082614-8163a88e56b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NjQwMTE1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 12,
    maxCapacity: 15
  },
  {
    id: '4',
    title: 'Computer Science Workshop',
    description: 'Learn React and modern web development',
    category: 'study',
    date: '2025-11-29',
    time: '13:00',
    location: 'Computer Lab',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
    participants: 24,
    maxCapacity: 30
  },
  {
    id: '5',
    title: 'French Conversation Circle',
    description: 'Practice French in a relaxed setting',
    category: 'language',
    date: '2025-11-27',
    time: '17:30',
    location: 'Café Étudiant',
    imageUrl: 'https://images.unsplash.com/photo-1758270704787-615782711641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMGxlYXJuaW5nJTIwY29udmVyc2F0aW9ufGVufDF8fHx8MTc2Mzk4MDcyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 18,
    maxCapacity: 20
  },
  {
    id: '6',
    title: 'Spanish Language Exchange',
    description: 'Connect with Spanish speakers and learners',
    category: 'language',
    date: '2025-11-30',
    time: '15:00',
    location: 'Student Lounge',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400',
    participants: 14
  }
];

export const mockPartners: LanguagePartner[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    nativeLanguage: 'French',
    learningLanguage: 'English',
    matchScore: 95,
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    bio: 'Psychology student interested in cognitive science'
  },
  {
    id: '2',
    name: 'Carlos Rodriguez',
    nativeLanguage: 'Spanish',
    learningLanguage: 'French',
    matchScore: 88,
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    bio: 'Engineering student who loves soccer and music'
  },
  {
    id: '3',
    name: 'Yuki Tanaka',
    nativeLanguage: 'Japanese',
    learningLanguage: 'English',
    matchScore: 82,
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    bio: 'Computer science student passionate about game design'
  }
];

export const mockChallenges: StudyChallenge[] = [
  {
    id: '1',
    title: '30-Day French Streak',
    description: 'Practice French every day for 30 days',
    participants: 45,
    startDate: '2025-11-01',
    endDate: '2025-11-30',
    category: 'language',
    points: 300
  },
  {
    id: '2',
    title: 'Study Group Challenge',
    description: 'Attend 10 study sessions this month',
    participants: 67,
    startDate: '2025-11-01',
    endDate: '2025-11-30',
    category: 'academic',
    points: 200
  },
  {
    id: '3',
    title: 'Cultural Explorer',
    description: 'Attend 5 different cultural events',
    participants: 89,
    startDate: '2025-11-01',
    endDate: '2025-12-31',
    category: 'social',
    points: 250
  }
];
