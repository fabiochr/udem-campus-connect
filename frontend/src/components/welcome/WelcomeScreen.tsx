import React from 'react';
import { UdemButton } from '../ui/udem-button';
import { UdemCard, UdemCardContent, UdemCardHeader } from '../ui/udem-card';
import { UdemBadge } from '../ui/udem-badge';

interface WelcomeScreenProps {
  onGetStarted?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  // Temporary handlers - will connect to navigation later
  const handleBrowsePartners = () => {
    console.log('Navigate to partners');
    // Will connect to navigation context
  };

  const handleViewEvents = () => {
    console.log('Navigate to events');
  };

  const handleJoinChallenges = () => {
    console.log('Navigate to challenges');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <UdemCard variant="glass" className="mb-8 text-center">
          <UdemCardHeader>
            <h1 className="text-4xl font-bold text-white mb-4">
              🌍 MontrealCampus Connect
            </h1>
            <p className="text-lg text-blue-100 mb-4">
              Connect with language partners across Montreal universities
            </p>
          </UdemCardHeader>
          <UdemCardContent>
            <div className="flex flex-wrap gap-4 justify-center">
              <UdemBadge variant="outline">Language Exchange</UdemBadge>
              <UdemBadge variant="outline">Cultural Events</UdemBadge>
              <UdemBadge variant="outline">Study Groups</UdemBadge>
            </div>
          </UdemCardContent>
        </UdemCard>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Get Started Card */}
          <UdemCard variant="glass">
            <UdemCardHeader>
              <h2 className="text-2xl font-semibold text-white mb-2">🚀 Get Started</h2>
            </UdemCardHeader>
            <UdemCardContent className="space-y-4">
              <p className="text-blue-100">
                Create your profile and start matching with language partners in Montreal.
              </p>
              <UdemButton 
                variant="primary" 
                className="w-full" 
                onClick={onGetStarted} // This now works!
              >
                Create Profile
              </UdemButton>
            </UdemCardContent>
          </UdemCard>

          {/* Features Card */}
          <UdemCard variant="glass">
            <UdemCardHeader>
              <h2 className="text-2xl font-semibold text-white mb-2">💫 Features</h2>
            </UdemCardHeader>
            <UdemCardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                <span className="text-blue-100">Smart AI language partner matching</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                <span className="text-blue-100">Cultural events and meetups</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span className="text-blue-100">Study challenges and groups</span>
              </div>
            </UdemCardContent>
          </UdemCard>
        </div>

        {/* Quick Actions */}
        <UdemCard variant="glass" className="mt-8">
          <UdemCardHeader>
            <h2 className="text-2xl font-semibold text-white mb-4">⚡ Quick Actions</h2>
          </UdemCardHeader>
          <UdemCardContent>
            <div className="flex flex-wrap gap-4 justify-center">
              <UdemButton 
                variant="outline" 
                className="bg-white/5 border-white/20 text-white"
                onClick={handleBrowsePartners}
              >
                Browse Partners
              </UdemButton>
              <UdemButton 
                variant="outline" 
                className="bg-white/5 border-white/20 text-white"
                onClick={handleViewEvents}
              >
                View Events
              </UdemButton>
              <UdemButton 
                variant="outline" 
                className="bg-white/5 border-white/20 text-white"
                onClick={handleJoinChallenges}
              >
                Join Challenges
              </UdemButton>
            </div>
          </UdemCardContent>
        </UdemCard>
      </div>
    </div>
  );
};

export default WelcomeScreen;