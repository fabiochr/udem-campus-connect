// App.tsx - REPLACE THE ENTIRE FILE
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './contexts/LanguageContext';
import MobileLayout from './components/layout/MobileLayout';
import DashboardPage from './pages/DashboardPage';
import OnboardingPage from './pages/OnboardingPage';
import WelcomeScreen from './components/welcome/WelcomeScreen';
import { apiService } from './services/api';
import { ConnectionProvider } from './contexts/ConnectionContext';

const AppContent: React.FC = () => {
  const { currentStudent, setCurrentStudent, language } = useApp();
  const [currentView, setCurrentView] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isTeaser, setIsTeaser] = useState(false);

const STORAGE_KEY = 'udemCampusUser';

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  if (mode === 'teaser') {
    setIsTeaser(true);
    setShowWelcome(false);
    setShowOnboarding(false);
    setIsLoading(false);
    return;
  }
  const checkUserSession = () => {
    try {
      // Try new key first
      const savedUser = localStorage.getItem(STORAGE_KEY)
        ?? localStorage.getItem('montrealCampusUser'); // legacy key

      if (savedUser) {
        const userData = JSON.parse(savedUser);

        // If we loaded from the old key, re-save under the new one
        localStorage.setItem(STORAGE_KEY, savedUser);
        localStorage.removeItem('montrealCampusUser');

        setCurrentStudent(userData);
        setShowWelcome(false);
      }
    } catch (error) {
      console.error('Error checking user session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  checkUserSession();
}, [setCurrentStudent]);

  // Get Started goes to Onboarding
  const handleGetStarted = () => {
    setShowWelcome(false);
    setShowOnboarding(true);
  };

  // Onboarding completion - SAVE TO LOCALSTORAGE
  const handleOnboardingComplete = (userData: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setCurrentStudent(userData);
    setShowOnboarding(false);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('montrealCampusUser');
    setCurrentStudent(null);
    setShowWelcome(true);
    setShowOnboarding(false);
    setCurrentView('home');
  };

  // Show Welcome Screen first
  if (showWelcome) {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  // Show Onboarding Page with completion callback
  if (showOnboarding) {
    return <OnboardingPage onComplete={handleOnboardingComplete} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading UdeM Campus Connect...</p>
        </div>
      </div>
    );
  }

  // Show main app with logout capability
  return (
    <MobileLayout currentView={currentView} setCurrentView={setCurrentView}>
      <DashboardPage 
        currentView={currentView} 
        onLogout={handleLogout}
      />
    </MobileLayout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <ConnectionProvider>  
        <div className="App">
          <AppContent />
        </div>
      </ConnectionProvider> 
    </AppProvider>
  );
};

export default App;