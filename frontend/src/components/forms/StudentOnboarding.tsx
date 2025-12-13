import React, { useState } from 'react';
import { useApp } from '../../contexts/LanguageContext';
import { apiService, API_BASE_URL } from '../../services/api';
import { StudentProfile } from '../../types';
import { Loader } from 'lucide-react';

interface StudentOnboardingProps {
  onComplete?: (userData: any) => void;
}

// TEMPORARY: Extended interface if email is missing from StudentProfile
interface StudentProfileWithEmail extends StudentProfile {
  email: string;
}

const StudentOnboarding: React.FC<StudentOnboardingProps> = ({ onComplete }) => {
  const { t, setCurrentStudent, language, setLanguage } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<StudentProfileWithEmail, 'name' | 'email' | 'id'>>({
    interests: [],
    languages: [],
    french_level: 'A1',
    looking_for: [],
    bio: '',
  });
  const [name, setName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');


  // Only EN and FR languages
  const languageOptions = ['en', 'fr'];
  
  const interestsOptions = [
    'art', 'coffee', 'museums', 'technology', 'sports', 'music', 
    'photography', 'cinema', 'startups', 'reading', 'gaming', 'travel'
  ];

  const frenchLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const lookingForOptions = [
    'coffee', 'french_practice', 'study_partners', 'cultural_exchange',
    'french_help', 'friends', 'hiking', 'food_exploration'
  ];

  const toggleArrayItem = (array: string[], item: string): string[] => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();

    if (!trimmedName || !trimmedEmail || !trimmedUsername) {
      alert('Please fill in name, username and email.');
      return;
    }

    setIsLoading(true);

    try {
      let avatarUrl: string | undefined;

      // 1) Try uploading avatar – but don't block profile creation if it fails
      if (avatarFile) {
        try {
          const uploadRes = await apiService.uploadAvatar(avatarFile);
          const uploadedPath =
            (uploadRes.data && (uploadRes.data.path || uploadRes.data.url)) || '';

          if (uploadedPath) {
            avatarUrl = uploadedPath.startsWith('http')
              ? uploadedPath
              : `${API_BASE_URL}${uploadedPath}`;
          }
        } catch (uploadError: any) {
          console.error('Avatar upload failed:', uploadError);
          alert(
            'Avatar upload failed. Your profile will be created without the photo.'
          );
        }
      }

      // 2) Build the student payload
      const studentData = {
        id: `student-${Date.now()}`,
        name: trimmedName,
        username: trimmedUsername,
        email: trimmedEmail,
        displayName: name,
        interests: formData.interests || [],
        languages: formData.languages || [],
        french_level: formData.french_level || 'A1',
        looking_for: formData.looking_for || [],
        bio: formData.bio || '',
        avatar_url: avatarUrl,
        created_at: new Date(),
      };

      console.log('Sending data:', studentData);

      // 3) Call backend
      const response = await apiService.registerStudent(studentData);
      console.log('Register response:', response.data);
      const saved = (response.data as any).student || studentData;

      // 4) Save to global context + notify parent
      setCurrentStudent(saved);
      onComplete?.(saved);
    } catch (error: any) {
      console.error('Error during onboarding:', error);
      const detail =
        error?.response?.data?.detail ||
        error?.message ||
        'Unknown error. Please try again.';
      alert(`Error creating profile: ${detail}`);
    } finally {
      setIsLoading(false);
    }
  };

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' ? 'Crée ton profil' : 'Create Your Profile'}
          </h2>
          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg border ${
                language === 'en'
                  ? 'bg-[#0055A4] text-white border-[#0055A4]'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              className={`px-2 py-1 rounded-lg border ${
                language === 'fr'
                  ? 'bg-[#0055A4] text-white border-[#0055A4]'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              FR
            </button>
          </div>
        </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udem-blue"
            placeholder="Enter your name"
            required
          />
        </div>
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'fr' ? "Nom d'utilisateur *" : 'Username *'}
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udem-blue"
            placeholder={language === 'fr' ? 'ex. tito123' : 'e.g. tito123'}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {language === 'fr'
              ? 'Utilisé pour la connexion. Facile à retenir.'
              : 'Used for login. Easy to remember.'}
          </p>
        </div>        
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udem-blue"
            placeholder="your.email@umontreal.ca"
            required
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udem-blue"
            placeholder="Tell us about yourself, your studies, and what you're looking for..."
          />
        </div>
        {/* Profile photo URL (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'fr'
              ? "Format recommandé : image carrée (au moins 400x400). L'image sera affichée en cercle."
              : 'Recommended: square image (at least 400x400). The picture will be shown as a circle.'}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setAvatarFile(file);
            }}
            className="w-full text-sm text-gray-700"
          />
          <p className="text-xs text-gray-500 mt-1">
            {language === 'fr'
              ? 'Choisissez une photo depuis votre ordinateur ou téléphone.'
              : 'Choose a photo from your computer or phone.'}
          </p>
        </div>
        {/* French Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            French Level
          </label>
          <select
            value={formData.french_level}
            onChange={(e) => setFormData({...formData, french_level: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udem-blue"
          >
            {frenchLevels.map(level => (
              <option key={level} value={level}>{level} - {getFrenchLevelDescription(level)}</option>
            ))}
          </select>
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Spoken Languages
          </label>
          <div className="grid grid-cols-2 gap-2">
            {languageOptions.map(lang => (
              <button
                key={lang}
                type="button"
                onClick={() => setFormData({
                  ...formData, 
                  languages: toggleArrayItem(formData.languages, lang)
                })}
                className={`
                  px-4 py-3 rounded-lg border transition-colors text-sm font-medium
                  ${formData.languages.includes(lang)
                    ? 'bg-udem-blue text-white border-udem-blue'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-udem-blue'
                  }
                `}
              >
                {lang.toUpperCase()} - {getLanguageName(lang)}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interests
          </label>
          <div className="grid grid-cols-3 gap-2">
            {interestsOptions.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => setFormData({
                  ...formData, 
                  interests: toggleArrayItem(formData.interests, interest)
                })}
                className={`
                  px-3 py-2 rounded-lg border transition-colors capitalize text-sm
                  ${formData.interests.includes(interest)
                    ? 'bg-udem-blue text-white border-udem-blue'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-udem-blue'
                  }
                `}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Looking For */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are you looking for?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {lookingForOptions.map(item => (
              <button
                key={item}
                type="button"
                onClick={() => setFormData({
                  ...formData, 
                  looking_for: toggleArrayItem(formData.looking_for, item)
                })}
                className={`
                  px-3 py-2 rounded-lg border transition-colors capitalize text-sm
                  ${formData.looking_for.includes(item)
                    ? 'bg-udem-red text-white border-udem-red'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-udem-red'
                  }
                `}
              >
                {item.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
            disabled={
              isLoading ||
              !name.trim() ||
              !email.trim() ||
              !username.trim()
            }
          className="w-full bg-udem-blue text-white py-3 rounded-lg hover:bg-udem-red disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-semibold"
        >
          {isLoading ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            'Create Profile & Get Started'
          )}
        </button>
      </form>
    </div>
  );
};

// Helper functions
const getLanguageName = (code: string): string => {
  const languages: { [key: string]: string } = {
    'en': 'English',
    'fr': 'French'
  };
  return languages[code] || code;
};

const getFrenchLevelDescription = (level: string): string => {
  const descriptions: { [key: string]: string } = {
    'A1': 'Beginner',
    'A2': 'Elementary', 
    'B1': 'Intermediate',
    'B2': 'Upper Intermediate',
    'C1': 'Advanced',
    'C2': 'Proficient/Native'
  };
  return descriptions[level] || level;
};

export default StudentOnboarding;