import React from 'react';
import { UdemButton } from '../ui/udem-button';
import { UdemCard, UdemCardContent, UdemCardHeader } from '../ui/udem-card';
import { UdemBadge } from '../ui/udem-badge';
import { useApp } from '../../contexts/LanguageContext';

interface WelcomeScreenProps {
  onGetStarted?: () => void;
  onLogin?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted, onLogin }) => {
  // Temporary handlers - will connect to navigation later
  const { language, setLanguage } = useApp();
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
    <div className="min-h-screen bg-gradient-to-b from-[#002855] via-[#0055A4] to-[#E6F0F9] p-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <UdemCard variant="glass" className="mb-8 text-center">
          <UdemCardHeader>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
              UdeM Campus Connect
            </h1>
            <p className="text-[#E6F0F9] text-center mb-6">
              {language === 'fr'
                ? 'Connecte-toi avec des partenaires de langue à Montréal'
                : 'Connect with language partners across Montreal universities'}
            </p>
            {/* Language toggle */}
            <p className="absolute top-0 right-0 flex gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs rounded-full border ${
                    language === 'en'
                      ? 'bg-white text-[#0055A4] border-white shadow-sm'
                      : 'bg-transparent text-white/80 border-white/40'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1 text-xs rounded-full border ${
                    language === 'fr'
                      ? 'bg-white text-[#0055A4] border-white shadow-sm'
                      : 'bg-transparent text-white/80 border-white/40'
                  }`}
                >
                  FR
                </button>
              </p>
          </UdemCardHeader>
          <UdemCardContent>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="...">
                {language === 'fr' ? 'Échanges linguistiques' : 'Language Exchange'}
              </span>
              <span className="...">
                {language === 'fr' ? 'Événements culturels' : 'Cultural Events'}
              </span>
              <span className="...">
                {language === 'fr' ? "Groupes d'étude" : 'Study Groups'}
              </span>
            </div>
          </UdemCardContent>
        </UdemCard>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Get Started Card */}
          <UdemCard variant="glass">
            <UdemCardHeader>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {language === 'fr' ? '🚀 Commencer' : '🚀 Get Started'}
              </h2>
            </UdemCardHeader>
            <UdemCardContent className="space-y-4">
              <p className="text-[#E6F0F9]">
                {language === 'fr'
                  ? 'Crée ton profil et commence à rencontrer des partenaires de langue à Montréal.'
                  : 'Create your profile and start matching with language partners in Montreal.'}
              </p>
              <UdemButton 
                variant="primary" 
                className="w-full" 
                onClick={onGetStarted} 
              >
                {language === 'fr' ? 'Créer un profil' : 'Create Profile'}
              </UdemButton>              
            <div className="pt-2 text-sm text-[#E6F0F9]/90 text-center">
              { language === 'fr'
                ? 'Vous avez déjà un profil ?'
                : 'Already have a profile?'}
            </div>
            <UdemButton
              variant="outline"
              className="w-full bg-white/5 border-white/40 text-white hover:bg-white/15"
              onClick={onLogin}
            >
              {language === 'fr' ? 'Se connecter' : 'Log in'}
            </UdemButton>

            </UdemCardContent>
          </UdemCard>

          {/* Features Card */}
          <UdemCard variant="glass">
            <UdemCardHeader>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {language === 'fr' ? '💫Fonctionnalités' : '💫 Features'}
              </h2>
            </UdemCardHeader>
            <UdemCardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                <span className="text-[#E6F0F9]">{language === 'fr'
                    ? 'Matching intelligent avec des partenaires de langue'
                    : 'Smart AI language partner matching'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-udem-blue rounded-full flex-shrink-0"></div>
                <span className="text-[#E6F0F9]">  {language === 'fr'
                    ? 'Événements et rencontres culturelles'
                    : 'Cultural events and meetups'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span className="text-[#E6F0F9]"> {language === 'fr'
                    ? "Défis d'étude et groupes"
                    : 'Study challenges and groups'}</span>
              </div>
            </UdemCardContent>
          </UdemCard>
        </div>

        {/* Quick Actions */}
        <UdemCard variant="glass" className="mt-8">
          <UdemCardHeader>
            <h2 className="text-2xl font-semibold text-white mb-4">
                {language === 'fr' ? '⚡Actions rapides' : '⚡ Quick Actions'}</h2>
          </UdemCardHeader>
          <UdemCardContent>
            <div className="flex flex-wrap gap-4 justify-center">
              <UdemButton 
                variant="outline" 
                className="bg-white/5 border-white/20 text-white"
                onClick={handleBrowsePartners}
              >
                {language === 'fr' ? 'Voir les partenaires' : 'Browse Partners'}
              </UdemButton>
              <UdemButton 
                variant="outline" 
                className="bg-white/5 border-white/20 text-white"
                onClick={handleViewEvents}
              >
                {language === 'fr' ? 'Voir les événements' : 'View Events'}
              </UdemButton>
              <UdemButton 
                variant="outline" 
                className="bg-white/5 border-white/20 text-white"
                onClick={handleJoinChallenges}
              >
                {language === 'fr' ? 'Rejoindre les défis' : 'Join Challenges'}
              </UdemButton>
            </div>
          </UdemCardContent>
        </UdemCard>
      </div>
    </div>
  );
};

export default WelcomeScreen;