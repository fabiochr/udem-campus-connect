import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/LanguageContext';
import { apiService } from '../../services/api';
import { Trophy, MapPin, Clock, CheckCircle } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'social' | 'cultural' | 'linguistic';
  location?: string;
  points: number;
  completed: boolean;
}

const ChallengeList: React.FC = () => {
  const { t, currentStudent, language } = useApp();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentStudent) {
      fetchChallenges();
    } else {
      setIsLoading(false);
    }
  }, [currentStudent, language]);

  const fetchChallenges = async () => {
    if (!currentStudent) return;
    
    setIsLoading(true);
    try {
      const response = await apiService.suggestChallenges(currentStudent.name, language);
      // Transform API response to our challenge format
      const apiChallenges = response.data.personalized_challenges || [];
      const formattedChallenges: Challenge[] = apiChallenges.map((challenge: string, index: number) => ({
        id: `challenge-${index}`,
        title: challenge,
        description: getChallengeDescription(challenge),
        type: getChallengeType(challenge),
        location: getChallengeLocation(challenge),
        points: Math.floor(Math.random() * 100) + 50, // Random points for demo
        completed: Math.random() > 0.7 // Random completion for demo
      }));
      setChallenges(formattedChallenges);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      // Fallback challenges
      setChallenges(getFallbackChallenges());
    } finally {
      setIsLoading(false);
    }
  };

  const getChallengeType = (challenge: string): 'social' | 'cultural' | 'linguistic' => {
    if (challenge.toLowerCase().includes('french') || challenge.toLowerCase().includes('français')) {
      return 'linguistic';
    } else if (challenge.toLowerCase().includes('museum') || challenge.toLowerCase().includes('musée')) {
      return 'cultural';
    }
    return 'social';
  };

  const getChallengeDescription = (challenge: string): string => {
    const type = getChallengeType(challenge);
    const descriptions = {
      social: 'Connect with other students and build your network',
      cultural: 'Explore Montreal\'s rich culture and heritage',
      linguistic: 'Practice your French and improve your language skills'
    };
    return descriptions[type];
  };

  const getChallengeLocation = (challenge: string): string => {
    if (challenge.includes('Old Montreal') || challenge.includes('Vieux-Montréal')) {
      return 'Old Montreal';
    } else if (challenge.includes('Mount Royal') || challenge.includes('Mont-Royal')) {
      return 'Mount Royal Park';
    } else if (challenge.includes('café') || challenge.includes('coffee')) {
      return 'Local Café';
    } else if (challenge.includes('museum') || challenge.includes('musée')) {
      return 'Museum District';
    }
    return 'Campus Area';
  };

  const getFallbackChallenges = (): Challenge[] => [
    {
      id: '1',
      title: 'Order coffee in French at a local café',
      description: 'Practice your French and enjoy a local coffee',
      type: 'linguistic',
      location: 'Local Café',
      points: 75,
      completed: false
    },
    {
      id: '2',
      title: 'Visit the Montreal Museum of Fine Arts',
      description: 'Explore world-class art exhibitions',
      type: 'cultural',
      location: 'Museum District',
      points: 100,
      completed: true
    },
    {
      id: '3',
      title: 'Join a student club meeting',
      description: 'Meet students with similar interests',
      type: 'social',
      location: 'Campus',
      points: 60,
      completed: false
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'social': return 'bg-[#E6F0F9] text-[#0055A4]';   // UdeM light + blue
      case 'cultural': return 'bg-purple-100 text-purple-800';
      case 'linguistic': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  if (!currentStudent) {
    return (
      <div className="text-center py-12">
        <Trophy className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Complete your profile to see challenges!
        </h3>
        <p className="text-gray-600">
          Create your profile to unlock personalized Montreal challenges.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-udem-blue"></div>
        <span className="ml-3 text-gray-600">{t('common.loading')}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('challenges.title')}
        </h2>
        <div className="flex items-center space-x-2 bg-udem-blue text-white px-4 py-2 rounded-lg">
          <Trophy size={20} />
          <span className="font-medium">
            {challenges.filter(c => c.completed).length}/{challenges.length} Completed
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`bg-white rounded-xl shadow-lg border-2 p-6 transition-all ${
              challenge.completed 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:shadow-xl'
            }`}
          >
            {/* Challenge Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {challenge.title}
                </h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(challenge.type)}`}>
                  {challenge.type}
                </span>
              </div>
              {challenge.completed && (
                <CheckCircle className="text-green-500 flex-shrink-0 ml-2" size={24} />
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">
              {challenge.description}
            </p>

            {/* Location and Points */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              {challenge.location && (
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{challenge.location}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Trophy size={16} />
                <span className="font-medium">{challenge.points} pts</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                challenge.completed
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-udem-blue text-white hover:bg-udem-red'
              }`}
            >
              {challenge.completed ? 'Completed ✓' : 'Start Challenge'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeList;