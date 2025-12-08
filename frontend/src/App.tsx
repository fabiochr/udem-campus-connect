import React, { useEffect, useState } from 'react';
import './App.css';
import { AppProvider, useApp } from './contexts/LanguageContext';
import { ConnectionProvider } from './contexts/ConnectionContext';
import MobileLayout from './components/layout/MobileLayout';
import DashboardPage from './pages/DashboardPage';
import OnboardingPage from './pages/OnboardingPage';
import WelcomeScreen from './components/welcome/WelcomeScreen';
import LoginPage from './pages/LoginPage';
import type { StudentProfile } from './types';

const STORAGE_KEY = 'udemCampusUser';

const AppContent: React.FC = () => {
  const { setCurrentStudent } = useApp();
  const [currentView, setCurrentView] = useState<string>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Check if a student is already saved locally
  useEffect(() => {
    const checkUserSession = () => {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEY);

        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setCurrentStudent(userData);
          setShowWelcome(false);
          setShowOnboarding(false);
          setShowLogin(false);
        } else {
          // First time: show welcome, not login
          setShowWelcome(true);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        setShowWelcome(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, [setCurrentStudent]);

  const handleOnboardingComplete = (userData: StudentProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setCurrentStudent(userData);
    setShowOnboarding(false);
    setShowWelcome(false);
    setShowLogin(false);
  };

  const handleLoginSuccess = (userData: StudentProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setCurrentStudent(userData);
    setShowLogin(false);
    setShowWelcome(false);
    setShowOnboarding(false);
  };

  // When any part of the UI requests "logout" view, perform logout
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStudent(null);
    setShowWelcome(false);
    setShowOnboarding(false);
    setShowLogin(true); // show login instead of profile creation
    setCurrentView('home');
  };

  useEffect(() => {
    if (currentView === 'logout') {
      handleLogout();
    }
  }, [currentView]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0055A4] mx-auto mb-4" />
          <p className="text-gray-600">Loading UdeM Campus Connect...</p>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN (after logout, or if you later add a "Have an account?" link)
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E6F0F9] to-[#FCE8EB] flex items-center justify-center">
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onCreateProfile={() => {
            setShowLogin(false);
            setShowOnboarding(true);
          }}
        />
      </div>
    );
  }

  // WELCOME (first time, no existing local user)
  if (showWelcome) {
  return (
    <WelcomeScreen
      onGetStarted={() => {
        setShowWelcome(false);
        setShowOnboarding(true);
      }}
      onLogin={() => {
        setShowWelcome(false);
        setShowOnboarding(false);
        setShowLogin(true)
        setCurrentView('login'); // whatever view triggers your existing Login page
      }}
    />
  );
}

  // CREATE PROFILE / ONBOARDING
  if (showOnboarding) {
    return <OnboardingPage onComplete={handleOnboardingComplete} />;
  }

  // MAIN APP
  return (
    <MobileLayout currentView={currentView} setCurrentView={setCurrentView}>
      <DashboardPage currentView={currentView} onLogout={handleLogout} />
    </MobileLayout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <ConnectionProvider>
        <AppContent />
      </ConnectionProvider>
    </AppProvider>
  );
};

export default App;
