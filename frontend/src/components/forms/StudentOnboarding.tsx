import React, { useState } from 'react';
import { useApp } from '../../contexts/LanguageContext';
import { apiService } from '../../services/api';
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
  const { t, setCurrentStudent, language } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<StudentProfileWithEmail, 'name' | 'email' | 'id'>>({
    interests: [],
    languages: [],
    french_level: 'A1',
    looking_for: [],
    bio: '',
  });
  const [name, setName] = useState('');
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
    if (!name.trim() || !email.trim()) return;

    setIsLoading(true);
    try {
      // Create student data with email AND id
      const studentData = {
        id: `student-${Date.now()}`, // ADD THIS TEMPORARY ID
        name: name.trim(),
        email: email.trim(),
        interests: formData.interests,
        languages: formData.languages,
        french_level: formData.french_level,
        looking_for: formData.looking_for,
        bio: formData.bio,
        avatar_url: undefined,
        created_at: new Date()
      };
      
      console.log('Sending data:', studentData);
      
      // Register with backend - use type assertion if needed
      const response = await apiService.registerStudent(studentData as any);
      console.log('Registration successful:', response.data);
      
      // Set current student in context
      setCurrentStudent(studentData as any);
      
      // CALL THE COMPLETION CALLBACK
      if (onComplete) {
        onComplete(studentData);
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      console.error('Error details:', error.response?.data);
      alert(`Registration failed: ${error.response?.data?.detail || 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Create Your Profile
      </h2>

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
          disabled={isLoading || !name.trim() || !email.trim()}
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