import React from 'react';
import StudentOnboarding from '../components/forms/StudentOnboarding';

// ADD THIS: Props interface
interface OnboardingPageProps {
  onComplete?: (userData: any) => void;
}

// UPDATE: Add props to component
const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-udem-blue to-udem-red py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to MontrealCampus Connect
            </h1>
            <p className="text-xl text-white opacity-90">
              Join our community of students exploring Montreal together
            </p>
          </div>
          
          {/* Onboarding Form - PASS THE PROP DOWN */}
          <StudentOnboarding onComplete={onComplete} />
          
          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-white">
              <div className="text-2xl mb-3">🤝</div>
              <h3 className="font-semibold mb-2">Find Friends</h3>
              <p className="text-sm opacity-90">
                Connect with students who share your interests and goals
              </p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-white">
              <div className="text-2xl mb-3">🏆</div>
              <h3 className="font-semibold mb-2">Complete Challenges</h3>
              <p className="text-sm opacity-90">
                Explore Montreal through fun, gamified activities
              </p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-white">
              <div className="text-2xl mb-3">🗣️</div>
              <h3 className="font-semibold mb-2">Practice French</h3>
              <p className="text-sm opacity-90">
                Improve your language skills with local students
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;