import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

// Bilingual content
const translations = {
  en: {
    'welcome.title': 'MontrealCampus Connect',
    'welcome.subtitle': 'Your student community in Montreal',
    'navigation.matches': 'Matches',
    'navigation.challenges': 'Challenges', 
    'navigation.map': 'Campus Map',
    'navigation.forum': 'Forum',
    'navigation.marketplace': 'Marketplace',
    'profile.create': 'Create Profile',
    'profile.interests': 'Your Interests',
    'matches.title': 'Your Matches',
    'matches.noMatches': 'No matches yet. Register to find connections!',
    'challenges.title': 'Montreal Challenges',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.success': 'Success!',
  },
  fr: {
    'welcome.title': 'MontrealCampus Connect',
    'welcome.subtitle': 'Votre communauté étudiante à Montréal',
    'navigation.matches': 'Jumelages',
    'navigation.challenges': 'Défis',
    'navigation.map': 'Carte du Campus',
    'navigation.forum': 'Forum',
    'navigation.marketplace': 'Marché',
    'profile.create': 'Créer un Profil',
    'profile.interests': 'Vos Intérêts',
    'matches.title': 'Vos Jumelages',
    'matches.noMatches': 'Aucun jumelage pour le moment. Inscrivez-vous pour trouver des connexions !',
    'challenges.title': 'Défis Montréal',
    'common.loading': 'Chargement...',
    'common.error': 'Quelque chose s\'est mal passé',
    'common.success': 'Succès !',
  },
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <AppContext.Provider value={{ 
      language, 
      setLanguage, 
      currentStudent, 
      setCurrentStudent,
      t 
    } as any}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};