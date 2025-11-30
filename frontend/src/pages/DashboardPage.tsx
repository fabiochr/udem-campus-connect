import React from 'react';
import { useApp } from '../contexts/LanguageContext';
import MatchList from '../components/matching/MatchList';
import ChallengeList from "../components/challenges/ChallengeList";

interface DashboardPageProps {
  currentView: string;
  onLogout?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ currentView, onLogout }) => {
  const { currentStudent, language } = useApp();

  // Translation dictionary
  const translations = {
    en: {
      welcome: "Welcome back",
      ready: "Ready to explore Montreal and meet new friends today?",
      yourMatches: "Your Matches",
      yourChallenges: "Your Challenges",
      exploreCampus: "Explore Campus",
      joinForum: "Join Forum",
      findPartners: "Find Study Partners"
    },
    fr: {
      welcome: "Bon retour",
      ready: "Prêt à explorer Montréal et rencontrer de nouveaux amis aujourd'hui?",
      yourMatches: "Vos Correspondances",
      yourChallenges: "Vos Défis",
      exploreCampus: "Explorer le Campus",
      joinForum: "Rejoindre le Forum",
      findPartners: "Trouver des Partenaires"
    }
  };

  const t = translations[language];

const renderContent = () => {
  switch (currentView) {
    case 'social':  // ← CHANGE from 'matches' to 'social'
      return <MatchList />;
    case 'home':    // ← ADD home view
      return (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-4xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {language === 'en' ? 'Home Dashboard' : 'Tableau de Bord'}
          </h3>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Welcome to your student community!'
              : 'Bienvenue dans votre communauté étudiante!'
            }
          </p>
        </div>
      );
    case 'search':  // ← ADD search view
      return (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {language === 'en' ? 'Search' : 'Recherche'}
          </h3>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Search functionality coming soon!'
              : 'Fonction de recherche à venir!'
            }
          </p>
        </div>
      );
    case 'messages':  // ← ADD messages view
      return (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {language === 'en' ? 'Messages' : 'Messages'}
          </h3>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Messaging system coming soon!'
              : 'Système de messagerie à venir!'
            }
          </p>
        </div>
      );
// In DashboardPage.tsx - update the profile case
      case 'profile':
        return (
          <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'en' ? 'Your Profile' : 'Votre Profil'}
              </h2>
              {/* Safe logout button - fixed syntax */}
              {onLogout && (
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 bg-udem-red text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  {language === 'en' ? 'Logout' : 'Déconnexion'}
                </button>
              )}
            </div>

            {currentStudent && (
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  {/* Avatar & Basic Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={currentStudent.avatar_url || '/api/placeholder/80/80'}
                        alt={currentStudent.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-udem-blue"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-xl">{currentStudent.name}</h3>
                      <p className="text-gray-600 text-sm">{currentStudent.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-1 bg-udem-blue text-white text-xs rounded-full">
                          🇫🇷 {currentStudent.french_level}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          👥 {currentStudent.interests?.length || 0} interests
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span>📝</span>
                      {language === 'en' ? 'About Me' : 'À Propos de Moi'}
                    </h4>
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-4 text-sm leading-relaxed">
                      {currentStudent.bio || (language === 'en' 
                        ? 'No bio provided yet. Share something about yourself!' 
                        : 'Aucune biographie fournie. Partagez quelque chose sur vous!'
                      )}
                    </p>
                  </div>

                  {/* Languages Section */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span>🌐</span>
                      {language === 'en' ? 'Languages I Speak' : 'Langues que je parle'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStudent.languages?.map((lang, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-2 bg-udem-blue text-white text-sm rounded-lg font-medium flex items-center gap-2"
                        >
                          {lang === 'fr' ? '🇫🇷' : '🇬🇧'} {lang.toUpperCase()}
                        </span>
                      ))}
                      {(!currentStudent.languages || currentStudent.languages.length === 0) && (
                        <span className="text-gray-500 text-sm">
                          {language === 'en' ? 'No languages specified' : 'Aucune langue spécifiée'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Interests Section */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span>🎯</span>
                      {language === 'en' ? 'My Interests' : 'Mes Intérêts'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStudent.interests?.map((interest, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-2 bg-udem-red text-white text-sm rounded-lg capitalize font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                      {(!currentStudent.interests || currentStudent.interests.length === 0) && (
                        <span className="text-gray-500 text-sm">
                          {language === 'en' ? 'No interests specified' : 'Aucun intérêt spécifié'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Looking For Section */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span>🔍</span>
                      {language === 'en' ? "I'm Looking For" : 'Je Recherche'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStudent.looking_for?.map((item, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-2 bg-green-500 text-white text-sm rounded-lg capitalize font-medium"
                        >
                          {item.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {(!currentStudent.looking_for || currentStudent.looking_for.length === 0) && (
                        <span className="text-gray-500 text-sm">
                          {language === 'en' ? 'Nothing specified' : 'Rien de spécifié'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
                    <div className="text-2xl mb-2">🤝</div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Connections' : 'Connexions'}</p>
                    <p className="font-bold text-gray-900">12</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
                    <div className="text-2xl mb-2">🎭</div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Events' : 'Événements'}</p>
                    <p className="font-bold text-gray-900">5</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
                    <div className="text-2xl mb-2">🏆</div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Challenges' : 'Défis'}</p>
                    <p className="font-bold text-gray-900">8</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-udem-blue text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <span>✏️</span>
                    {language === 'en' ? 'Edit Profile' : 'Modifier le Profil'}
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <span>⚙️</span>
                    {language === 'en' ? 'Settings' : 'Paramètres'}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
    default:
      return <MatchList />;
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          UdeM Campus Connect
        </h1>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Your student community in Montreal'
            : 'Votre communauté étudiante à Montréal'
          }
        </p>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-1">
          {t.welcome}, {currentStudent?.name}!
        </h2>
        <p className="text-blue-100 opacity-90">
          {t.ready}
        </p>
        <div className="flex items-center mt-4 space-x-4 text-sm">
          <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
            🇫🇷 French: {currentStudent?.french_level}
          </div>
          <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
            🎯 {currentStudent?.interests.length} interests
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">🗺️</div>
          <span className="text-sm font-medium text-gray-700">{t.exploreCampus}</span>
        </button>
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">💬</div>
          <span className="text-sm font-medium text-gray-700">{t.joinForum}</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="mb-20"> {/* Extra space for bottom navigation */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentView === 'social'
              ? t.yourMatches
              : currentView === 'challenges'
              ? t.yourChallenges
              : currentView === 'profile'
              ? (language === 'en' ? 'Your Profile' : 'Votre Profil')
              : t.exploreCampus}
          </h3>

        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
