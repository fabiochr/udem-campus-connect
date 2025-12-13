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
  /** Called when the user reaches too many failed attempts (>= 4) */
  onTooManyAttempts?: () => void;
}

type SocialProvider = 'facebook' | 'google' | 'apple';

const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onCreateProfile,
  onTooManyAttempts,
}) => {
  const { language } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmed = identifier.trim();
    if (!trimmed) return;

    setIsLoading(true);
    try {
      // Backend accepts username OR full name
      const response = await apiService.getStudent(trimmed);
      onLoginSuccess(response.data.student || response.data);
      setAttempts(0); // reset attempts on success
    } catch (err) {
      console.error('Login error', err);

      const message =
        language === 'fr'
          ? "Aucun profil trouvé pour cet identifiant. Créez un nouveau profil."
          : 'No profile found with this username or name. Create a new profile.';

      setError(message);

      setAttempts((prev) => {
        const next = prev + 1;
        if (next >= 4 && onTooManyAttempts) {
          onTooManyAttempts();
        }
        return next;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    // TODO: connect to your real FastAPI OAuth endpoints, e.g.:
    // window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/${provider}`;
    console.log(`Social login with ${provider} clicked`);
    // For now this is just a visual / UX placeholder.
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
          {/* Identifier form (username / name) */}
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
                    ? "ex. toto123"
                    : 'e.g. toto123'
                }
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}{' '}
                {attempts > 0 && `(${attempts}/4 ${language === 'fr' ? 'essais' : 'attempts'})`}
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

          {/* Divider */}
          <div className="flex items-center py-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-xs text-gray-400">
              {language === 'fr' ? 'OU' : 'OR'}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social login buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              className="w-full border border-gray-300 rounded-lg py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <span>Continue with Facebook</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="w-full border border-gray-300 rounded-lg py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('apple')}
              className="w-full border border-gray-300 rounded-lg py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <span>Continue with Apple</span>
            </button>
          </div>

          {/* Create profile link */}
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
