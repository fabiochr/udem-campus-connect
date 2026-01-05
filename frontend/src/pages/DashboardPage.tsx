import React, { useState } from 'react';
import { useApp } from '../contexts/LanguageContext';
import MatchList from '../components/matching/MatchList';
import ChallengeList from '../components/challenges/ChallengeList';
import { StudentProfile } from '../types';  
import SocialHub from "../components/social/SocialHub"; 
import HomeView from "../components/home/HomeView";

interface DashboardPageProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onLogout?: () => void;
}

type EditForm = {
  bio: string;
  french_level: string;
  interests: string[];
  looking_for: string[];
  languages: string[];
};

const DashboardPage: React.FC<DashboardPageProps> = ({
  currentView,
  setCurrentView,
  onLogout }) => {
  const { currentStudent, language, setCurrentStudent } = useApp() as any;

  // -----------------------------
  // SMALL TRANSLATION DICTIONARY
  // -----------------------------
  const translations = {
    en: {
      welcome: 'Welcome back',
      ready: 'Ready to explore Montreal and meet new friends today?',
      yourMatches: 'Your Matches',
      yourChallenges: 'Your Challenges',
      exploreCampus: 'Explore Campus',
      joinForum: 'Join Forum',
      findPartners: 'Find Study Partners',
      profileTitle: 'Your Profile',
      editProfile: 'Edit Profile',
      saveChanges: 'Save changes',
      cancel: 'Cancel',
      settings: 'Settings',
      aboutMe: 'About Me',
      aboutMeEmpty: 'No bio provided yet. Share something about yourself!',
      languagesTitle: 'Languages I Speak',
      languagesEmpty: 'No languages specified',
      interestsTitle: 'My Interests',
      interestsEmpty: 'No interests specified',
      lookingForTitle: "I'm Looking For",
      lookingForEmpty: 'Nothing specified',
      connections: 'Connections',
      events: 'Events',
      challenges: 'Challenges',
    },
    fr: {
      welcome: 'Bon retour',
      ready: "Prêt à explorer Montréal et rencontrer de nouveaux amis aujourd’hui ?",
      yourMatches: 'Vos Correspondances',
      yourChallenges: 'Vos Défis',
      exploreCampus: 'Explorer le Campus',
      joinForum: 'Rejoindre le Forum',
      findPartners: 'Trouver des Partenaires',
      profileTitle: 'Votre Profil',
      editProfile: 'Modifier le Profil',
      saveChanges: 'Enregistrer',
      cancel: 'Annuler',
      settings: 'Paramètres',
      aboutMe: 'À Propos de Moi',
      aboutMeEmpty: 'Aucune biographie fournie. Partagez quelque chose sur vous !',
      languagesTitle: 'Langues que je parle',
      languagesEmpty: 'Aucune langue spécifiée',
      interestsTitle: 'Mes Intérêts',
      interestsEmpty: 'Aucun intérêt spécifié',
      lookingForTitle: 'Je Recherche',
      lookingForEmpty: 'Rien de spécifié',
      connections: 'Connexions',
      events: 'Événements',
      challenges: 'Défis',
    },
  };

  const t = translations[language as 'en' | 'fr'];

  // ---------------------------------
  // EDIT STATE (for Profile editing)
  // ---------------------------------
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState<EditForm | null>(null);

  // Options re-using your onboarding logic
  const languageOptions = ['en', 'fr'];
  const interestsOptions = [
    'art',
    'coffee',
    'museums',
    'technology',
    'sports',
    'music',
    'photography',
    'cinema',
    'startups',
    'reading',
    'gaming',
    'travel',
  ];
  const frenchLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const lookingForOptions = [
    'coffee',
    'french_practice',
    'study_partners',
    'cultural_exchange',
    'french_help',
    'friends',
    'hiking',
    'food_exploration',
  ];

  const toggleArrayItem = (array: string[], item: string): string[] =>
    array.includes(item) ? array.filter((i) => i !== item) : [...array, item];

  const startEditProfile = () => {
    if (!currentStudent) return;
    setEditForm({
      bio: currentStudent.bio || '',
      french_level: currentStudent.french_level || 'A1',
      interests: currentStudent.interests || [],
      looking_for: currentStudent.looking_for || [],
      languages: currentStudent.languages || [],
    });
    setIsEditingProfile(true);
  };

  const cancelEditProfile = () => {
    setIsEditingProfile(false);
    setEditForm(null);
  };

  const saveProfileChanges = () => {
    if (!currentStudent || !editForm) return;

    const updated: StudentProfile = {
      ...currentStudent,
      bio: editForm.bio,
      french_level: editForm.french_level,
      interests: editForm.interests,
      looking_for: editForm.looking_for,
      languages: editForm.languages,
    };

    setCurrentStudent(updated);
    // Persist to localStorage so refresh keeps the new info
    localStorage.setItem('udemCampusUser', JSON.stringify(updated));
    setIsEditingProfile(false);
  };

  // --------------------------
  // MAIN CONTENT SWITCHER
  // --------------------------
  const renderContent = () => {
    switch (currentView) {
      case 'social': {
      const socialItems = [
        { id: 'matches', label: language === 'en' ? 'Find Matches' : 'Trouver des matchs', desc: language === 'en' ? 'Connect with language partners' : 'Se connecter avec des partenaires de langue' },
        { id: 'challenges', label: language === 'en' ? 'Study Challenges' : 'Défis d’étude', desc: language === 'en' ? 'Join academic challenges' : 'Rejoindre des défis académiques' },
        { id: 'campus-map', label: language === 'en' ? 'Campus Map' : 'Carte du campus', desc: language === 'en' ? 'Explore campuses' : 'Explorer les campus' },
        { id: 'forum', label: language === 'en' ? 'Student Forum' : 'Forum étudiant', desc: language === 'en' ? 'Discuss with peers' : 'Discuter avec des étudiants' },
        { id: 'marketplace', label: language === 'en' ? 'Marketplace' : 'Marketplace', desc: language === 'en' ? 'Buy/sell student items' : 'Acheter/vendre des items étudiants' },
      ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">
        {language === 'en' ? 'Social Hub' : 'Hub Social'}
      </h3>

      <div className="space-y-2">
        {socialItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrentView(item.id)}
            className="w-full text-left p-4 rounded-xl border bg-white hover:bg-[#E6F0F9] transition-colors"
          >
            <div className="font-semibold text-gray-900">{item.label}</div>
            <div className="text-sm text-gray-600">{item.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
      case 'matches':
        return <MatchList />;

      case 'challenges':
        return <ChallengeList />;

      case 'campus-map':
        return (
          <div>
            <h3 className="text-xl font-bold">{language === 'en' ? 'Campus Map' : 'Carte du campus'}</h3>
            <p className="text-gray-600 mt-2">
              {language === 'en' ? 'Campus map page coming soon.' : 'Page carte du campus à venir.'}
            </p>
          </div>
        );

      case 'forum':
        return (
          <div>
            <h3 className="text-xl font-bold">{language === 'en' ? 'Student Forum' : 'Forum étudiant'}</h3>
            <p className="text-gray-600 mt-2">
              {language === 'en' ? 'Forum page coming soon.' : 'Page forum à venir.'}
            </p>
          </div>
        );

      case 'marketplace':
        return (
          <div>
            <h3 className="text-xl font-bold">{language === 'en' ? 'Marketplace' : 'Marketplace'}</h3>
            <p className="text-gray-600 mt-2">
              {language === 'en' ? 'Marketplace page coming soon.' : 'Page marketplace à venir.'}
            </p>
          </div>
        );

      case "home":
      return <HomeView onNavigate={setCurrentView} />;
        
      case 'search':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {language === 'en' ? 'Search' : 'Recherche'}
            </h3>
            <p className="text-gray-600">
              {language === 'en'
                ? 'Search functionality coming soon!'
                : 'Fonction de recherche à venir !'}
            </p>
          </div>
        );
      case 'messages':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {language === 'en' ? 'Messages' : 'Messages'}
            </h3>
            <p className="text-gray-600">
              {language === 'en'
                ? 'Messaging system coming soon!'
                : 'Système de messagerie à venir !'}
            </p>
          </div>
        );
      // -----------------
      // PROFILE VIEW
      // -----------------
      case 'profile':
        return (
          <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t.profileTitle}</h2>
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
                {/* TOP CARD – avatar + basic info */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={currentStudent.avatar_url || '/api/placeholder/80/80'}
                        alt={currentStudent.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-udem-blue"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-xl">{currentStudent.name}</h3>
                      <p className="text-gray-600 text-sm">{currentStudent.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-1 bg-udem-blue text-white text-xs rounded-full">
                          🇫🇷 {currentStudent.french_level}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          👥 {currentStudent.interests?.length || 0}{' '}
                          {language === 'en' ? 'interests' : 'intérêts'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* EDIT MODE VS READ-ONLY MODE */}
                  {isEditingProfile && editForm ? (
                    <div className="space-y-6">
                      {/* Bio */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <span>📝</span>
                          {t.aboutMe}
                        </h4>
                        <textarea
                          className="w-full border rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-udem-blue"
                          rows={3}
                          value={editForm.bio}
                          onChange={(e) =>
                            setEditForm((prev) =>
                              prev ? { ...prev, bio: e.target.value } : prev,
                            )
                          }
                        />
                      </div>

                      {/* French Level */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <span>🇫🇷</span>
                          {language === 'en' ? 'French Level' : 'Niveau de français'}
                        </h4>
                        <select
                          className="border rounded-xl px-3 py-2 text-sm"
                          value={editForm.french_level}
                          onChange={(e) =>
                            setEditForm((prev) =>
                              prev ? { ...prev, french_level: e.target.value } : prev,
                            )
                          }
                        >
                          {frenchLevels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Languages */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <span>🌐</span>
                          {t.languagesTitle}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {languageOptions.map((langCode) => {
                            const active = editForm.languages.includes(langCode);
                            return (
                              <button
                                key={langCode}
                                type="button"
                                className={
                                  'px-3 py-2 rounded-full text-sm font-medium border ' +
                                  (active
                                    ? 'bg-udem-blue text-white border-udem-blue'
                                    : 'bg-white text-gray-700 border-gray-300')
                                }
                                onClick={() =>
                                  setEditForm((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          languages: toggleArrayItem(
                                            prev.languages,
                                            langCode,
                                          ),
                                        }
                                      : prev,
                                  )
                                }
                              >
                                {langCode === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Interests */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <span>🎯</span>
                          {t.interestsTitle}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {interestsOptions.map((interest) => {
                            const active = editForm.interests.includes(interest);
                            return (
                              <button
                                key={interest}
                                type="button"
                                className={
                                  'px-3 py-2 rounded-full text-xs font-medium border capitalize ' +
                                  (active
                                    ? 'bg-udem-red text-white border-udem-red'
                                    : 'bg-white text-gray-700 border-gray-300')
                                }
                                onClick={() =>
                                  setEditForm((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          interests: toggleArrayItem(
                                            prev.interests,
                                            interest,
                                          ),
                                        }
                                      : prev,
                                  )
                                }
                              >
                                {interest}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Looking For */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <span>🔍</span>
                          {t.lookingForTitle}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {lookingForOptions.map((option) => {
                            const active = editForm.looking_for.includes(option);
                            return (
                              <button
                                key={option}
                                type="button"
                                className={
                                  'px-3 py-2 rounded-full text-xs font-medium border capitalize ' +
                                  (active
                                    ? 'bg-green-500 text-white border-green-500'
                                    : 'bg-white text-gray-700 border-gray-300')
                                }
                                onClick={() =>
                                  setEditForm((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          looking_for: toggleArrayItem(
                                            prev.looking_for,
                                            option,
                                          ),
                                        }
                                      : prev,
                                  )
                                }
                              >
                                {option.replace(/_/g, ' ')}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Save / Cancel buttons */}
                      <div className="flex gap-3 mt-4">
                        <button
                          type="button"
                          onClick={saveProfileChanges}
                          className="flex-1 bg-udem-blue text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                        >
                          {t.saveChanges}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditProfile}
                          className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                        >
                          {t.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* READ-ONLY sections (same as before) */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span>📝</span>
                          {t.aboutMe}
                        </h4>
                        <p className="text-gray-700 bg-gray-50 rounded-lg p-4 text-sm leading-relaxed">
                          {currentStudent.bio || t.aboutMeEmpty}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span>🌐</span>
                          {t.languagesTitle}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentStudent.languages?.length ? (
                            currentStudent.languages.map((langCode: string, index: number) => (
                              <span
                                key={index}
                                className="px-3 py-2 bg-udem-blue text-white text-sm rounded-lg font-medium flex items-center gap-2"
                              >
                                {langCode === 'fr' ? '🇫🇷' : '🇬🇧'}{' '}
                                {langCode.toUpperCase()}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">
                              {t.languagesEmpty}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span>🎯</span>
                          {t.interestsTitle}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentStudent.interests?.length ? (
                            currentStudent.interests.map((interest: string, index: number) => (

                              <span
                                key={index}
                                className="px-3 py-2 bg-udem-red text-white text-sm rounded-lg capitalize font-medium"
                              >
                                {interest}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">
                              {t.interestsEmpty}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span>🔍</span>
                          {t.lookingForTitle}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentStudent.looking_for?.length ? (
                            currentStudent.looking_for.map((item: string, index: number) => (

                              <span
                                key={index}
                                className="px-3 py-2 bg-green-500 text-white text-sm rounded-lg capitalize font-medium"
                              >
                                {item.replace(/_/g, ' ')}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">
                              {t.lookingForEmpty}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Quick stats (still fake for now) */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
                    <div className="text-2xl mb-2">🤝</div>
                    <p className="text-sm text-gray-600">{t.connections}</p>
                    <p className="font-bold text-gray-900">12</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
                    <div className="text-2xl mb-2">🎭</div>
                    <p className="text-sm text-gray-600">{t.events}</p>
                    <p className="font-bold text-gray-900">5</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
                    <div className="text-2xl mb-2">🏆</div>
                    <p className="text-sm text-gray-600">{t.challenges}</p>
                    <p className="font-bold text-gray-900">8</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={startEditProfile}
                    className="bg-udem-blue text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>✏️</span>
                    {t.editProfile}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>⚙️</span>
                    {t.settings}
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

  // --------------------------
  // OUTER SHELL / HEADER, etc.
  // --------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Udem Campus Connect</h1>
        <p className="text-gray-600">
          {language === 'en'
            ? 'Your student community in Montreal'
            : 'Votre communauté étudiante à Montréal'}
        </p>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-[#0055A4] to-[#ED2939] rounded-2xl p-6 text-white mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-1">
          {t.welcome}
          {currentStudent ? `, ${currentStudent.name}!` : '!'}
        </h2>
        <p className="text-blue-100 opacity-90">{t.ready}</p>
        {currentStudent && (
          <div className="flex items-center mt-4 space-x-4 text-sm">
            <div className="bg-white/20 rounded-full px-3 py-1">
              🇫🇷 French: {currentStudent.french_level}
            </div>
            <div className="bg-white/20 rounded-full px-3 py-1">
              🎯 {currentStudent.interests.length} interests
            </div>
          </div>
        )}
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

      <div className="mb-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentView === 'social'
              ? t.yourMatches
              : currentView === 'profile'
              ? t.profileTitle
              : currentView === 'home'
              ? (language === 'en' ? 'Home Dashboard' : 'Tableau de bord')
              : currentView === 'messages'
              ? (language === 'en' ? 'Messages' : 'Messages')
              : t.exploreCampus}
          </h3>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
