import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/LanguageContext';
import { apiService } from '../../services/api';
import { MatchResult } from '../../types';
import { Loader, Users, AlertCircle, RefreshCw, MessageCircle, Heart } from 'lucide-react';
import { UdemCard } from '../ui/udem-card';
import { UdemButton } from '../ui/udem-button';
import { UdemBadge } from '../ui/udem-badge';
import { useConnections } from '../../contexts/ConnectionContext';

const MatchList: React.FC = () => {
  const { t, currentStudent, language } = useApp();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { addConnection, saveForLater, connections } = useConnections();

  useEffect(() => {
    if (currentStudent) {
      fetchMatches();
    }
  }, [currentStudent, language]);

  const fetchMatches = async () => {
    if (!currentStudent) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getMatches(currentStudent.name, language);
      // Transform API data to ensure all required fields exist
      const transformedMatches = response.data.matches.map((match: any, index: number) => ({
        id: match.id || `match-${index}`,
        name: match.name || 'Potential Match',
        avatar_url: match.avatar_url || '/api/placeholder/64/64',
        native_language: match.native_language || 'Unknown',
        target_language: match.target_language || 'Unknown',
        bio: match.bio || '',
        match_score: match.match_score || 0,
        explanation: match.explanation || 'Great match based on shared interests!',
        common_interests: match.common_interests || [],
        suggested_activity: match.suggested_activity || 'Language exchange session'
      }));
      setMatches(transformedMatches);
    } catch (err) {
      setError('Failed to load matches');
      console.error('Error fetching matches:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (matchId: string) => {
    setActionLoading(`connect-${matchId}`);
    try {
      // Use the connection context (frontend only for now)
      addConnection(matchId);
      
      // Optional: Also call backend if you want persistence
      if (currentStudent?.id) {
        await apiService.connectWithStudent(currentStudent.id, matchId);
      }
      
     
      setMatches(prev => prev.filter(match => match.id !== matchId));
      
      console.log(`Connected with student ${matchId}`);
      
    } catch (error) {
      console.error('Error connecting:', error);
    } finally {
      setActionLoading(null);
    }
  };
    const handleMaybeLater = async (matchId: string) => {
      setActionLoading(`later-${matchId}`);
      try {
        // 1) Save to the "later" list in your ConnectionContext
        saveForLater(matchId);

        // 2) Remove from the current matches list
        setMatches(prev => prev.filter(match => match.id !== matchId));

        console.log('Saved for later:', matchId);
      } catch (error) {
        console.error('Error saving for later:', error);
      } finally {
        setActionLoading(null);
      }
    };


  const handleMessage = (matchId: string) => {
    console.log('Messaging:', matchId);
    // TODO: Implement chat navigation
  };

  if (!currentStudent) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('matches.noMatches')}
        </h3>
        <p className="text-gray-600">
          Create your profile to start finding connections!
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="animate-spin text-udem-blue" size={32} />
        <span className="ml-3 text-gray-600">{t('common.loading')}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('common.error')}
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <UdemButton
          onClick={fetchMatches}
          className="bg-udem-blue text-white px-6 py-2 rounded-lg hover:bg-udem-red transition-colors"
        >
          Try Again
        </UdemButton>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('matches.title')}
        </h2>
        <UdemButton
          variant="outline"
          onClick={fetchMatches}
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </UdemButton>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <Users className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No matches found yet
          </h3>
          <p className="text-gray-600">
            Check back later or update your profile to get better matches.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {matches.map((match) => (
            <UdemCard key={match.id} hover className="p-4">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <img
                  src={match.avatar_url}
                  alt={match.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-udem-blue"
                />
                
                <div className="flex-1 min-w-0">
                  {/* Header with Name and Match Score */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {match.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {match.native_language} → {match.target_language}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[#ED2939] shrink-0">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{match.match_score}%</span>
                    </div>
                  </div>

                  {/* Common Interests */}
                  {match.common_interests && match.common_interests.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {match.common_interests.slice(0, 3).map((interest, idx) => (
                          <UdemBadge 
                            key={idx} 
                            variant="secondary" 
                            className="text-xs capitalize bg-udem-blue text-white"
                          >
                            {interest}
                          </UdemBadge>
                        ))}
                        {match.common_interests.length > 3 && (
                          <UdemBadge variant="outline" className="text-xs">
                            +{match.common_interests.length - 3}
                          </UdemBadge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bio Preview */}
                  {match.bio && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {match.bio}
                    </p>
                  )}

                  {/* Suggested Activity */}
                  {match.suggested_activity && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <div className="w-4 h-4 bg-udem-blue rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">📍</span>
                      </div>
                      <span className="text-gray-800 truncate">{match.suggested_activity}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <UdemButton
                      size="sm"
                      className="flex-1"
                      onClick={() => handleConnect(match.id)}
                      disabled={actionLoading !== null}
                    >
                      {actionLoading === `connect-${match.id}` ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        'Connect'
                      )}
                    </UdemButton>
                    
                    <UdemButton
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleMaybeLater(match.id)}
                      disabled={actionLoading !== null}
                    >
                      {actionLoading === `later-${match.id}` ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        'Maybe Later'
                      )}
                    </UdemButton>
                    
                    <UdemButton
                      size="sm"
                      variant="ghost"
                      onClick={() => handleMessage(match.id)}
                      className="px-3"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </UdemButton>
                  </div>
                </div>
              </div>
            </UdemCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchList;