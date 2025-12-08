import React, { useState } from 'react';
import { useApp } from '../contexts/LanguageContext';
import { apiService } from '../services/api';
import { Input } from '../components/ui/input';
import { UdemButton } from '../components/ui/udem-button';
import {
  UdemCard,
  UdemCardHeader,
  UdemCardContent,
} from '../components/ui/udem-card';
import type { StudentProfile } from '../types';

interface LoginPageProps {
  onLoginSuccess: (student: StudentProfile) => void;
  onCreateProfile: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onCreateProfile,
}) => {
  const { language } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmed = identifier.trim();
    if (!trimmed) return;

    setIsLoading(true);
    try {
      // Backend now accepts username OR full name
      const response = await apiService.getStudent(trimmed);
      onLoginSuccess(response.data.student || response.data);
    } catch (err) {
      console.error('Login error', err);
      setError(
        language === 'fr'
          ? "Aucun profil trouvé pour cet identifiant. Créez un nouveau profil."
          : 'No profile found with this username or name. Create a new profile.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <UdemCard variant="elevated" className="shadow-xl">
        <UdemCardHeader className="pt-6 pb-4 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0055A4] to-[#ED2939] text-white text-2xl font-bold">
            UC
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            UdeM Campus Connect
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {language === 'fr'
              ? 'Connecte-toi pour retrouver ton profil et tes matchs.'
              : 'Sign in to continue with your profile and matches.'}
          </p>
        </UdemCardHeader>
        <UdemCardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                {language === 'fr'
                  ? "Nom d'utilisateur ou nom complet"
                  : 'Username or full name'}
              </label>
              <Input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  language === 'fr'
                    ? "ex. toto123 ou Toto Gus"
                    : 'e.g. toto123 or Toto Gus'
                }
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <UdemButton
              type="submit"
              fullWidth
              disabled={isLoading || !identifier.trim()}
            >
              {isLoading
                ? language === 'fr'
                  ? 'Connexion...'
                  : 'Signing in...'
                : language === 'fr'
                ? 'Se connecter'
                : 'Sign in'}
            </UdemButton>
          </form>

          <div className="pt-2 text-center text-sm text-gray-600">
            {language === 'fr' ? (
              <>
                Nouveau ici ?{' '}
                <button
                  type="button"
                  onClick={onCreateProfile}
                  className="font-medium text-[#0055A4] hover:underline"
                >
                  Créer un nouveau profil
                </button>
              </>
            ) : (
              <>
                New here?{' '}
                <button
                  type="button"
                  onClick={onCreateProfile}
                  className="font-medium text-[#0055A4] hover:underline"
                >
                  Create a new profile
                </button>
              </>
            )}
          </div>
        </UdemCardContent>
      </UdemCard>
    </div>
  );
};

export default LoginPage;
