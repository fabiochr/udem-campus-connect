import { LanguageCode } from '../types';

export const translations = {
  en: {
    'welcome.title': 'Welcome to MontrealCampus Connect',
    'welcome.subtitle': 'Find your perfect language exchange partner',
    'navigation.matches': 'Matches',
    'navigation.challenges': 'Challenges',
    'navigation.map': 'Campus Map',
    'navigation.forum': 'Forum',
    'navigation.marketplace': 'Marketplace',
    'profile.create': 'Create Profile',
    'profile.interests': 'Your Interests',
    'matches.title': 'Your Matches',
    'matches.noMatches': 'No matches found',
    'challenges.title': 'Study Challenges',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!'
  },
  fr: {
    'welcome.title': 'Bienvenue à MontrealCampus Connect',
    'welcome.subtitle': 'Trouvez votre partenaire idéal pour échanger des langues',
    'navigation.matches': 'Correspondances',
    'navigation.challenges': 'Défis',
    'navigation.map': 'Plan du Campus',
    'navigation.forum': 'Forum',
    'navigation.marketplace': 'Marketplace',
    'profile.create': 'Créer un Profil',
    'profile.interests': 'Vos Centres d\'Intérêt',
    'matches.title': 'Vos Correspondances',
    'matches.noMatches': 'Aucune correspondance trouvée',
    'challenges.title': 'Défis d\'Étude',
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur est survenue',
    'common.success': 'Succès!'
  }
};

export function useTranslation(lang: LanguageCode) {
  return translations[lang];
}

export type { TranslationKey } from '../types';