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
const WELCOME_KEY = 'udemCampusHasSeenWelcome';

type Screen = 'LOADING' | 'WELCOME' | 'LOGIN' | 'ONBOARDING' | 'APP';

const AppContent: React.FC = () => {
  const { setCurrentStudent, currentStudent } = useApp();
  const [currentView, setCurrentView] = useState<string>('home');
  const [screen, setScreen] = useState<Screen>('LOADING');

  // Initial load: decide which screen to show
  useEffect(() => {
    const initialize = () => {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEY);

        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setCurrentStudent(userData);
          setScreen('APP');
          return;
        }

        // No saved user: decide between Welcome and Login
        const hasSeenWelcome = localStorage.getItem(WELCOME_KEY) === 'true';
        setScreen(hasSeenWelcome ? 'LOGIN' : 'WELCOME');
      } catch (error) {
        console.error('Error checking user session:', error);
        setScreen('LOGIN');
      }
    };

    initialize();
  }, [setCurrentStudent]);

  const persistUserAndEnterApp = (userData: StudentProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setCurrentStudent(userData);
    setScreen('APP');
  };

  const handleOnboardingComplete = (userData: StudentProfile) => {
    persistUserAndEnterApp(userData);
  };

  const handleLoginSuccess = (userData: StudentProfile) => {
    persistUserAndEnterApp(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStudent(null);
    setCurrentView('home');
    // user has already seen the welcome screen by now,
    // so we go straight to Login
    localStorage.setItem(WELCOME_KEY, 'true');
    setScreen('LOGIN');
  };

  // In case something weird happens: if screen says APP but no user, push to LOGIN
  useEffect(() => {
    if (screen === 'APP' && !currentStudent) {
      setScreen('LOGIN');
    }
  }, [screen, currentStudent]);

  // React to "logout" view from bottom navigation (if you keep that)
  useEffect(() => {
    if (currentView === 'logout') {
      handleLogout();
    }
  }, [currentView]);

  // LOADING
  if (screen === 'LOADING') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0055A4] mx-auto mb-4" />
          <p className="text-gray-600">Loading UdeM Campus Connect...</p>
        </div>
      </div>
    );
  }

  // FIRST-TIME SPLASH / BRAND SCREEN
  if (screen === 'WELCOME') {
    return (
      <WelcomeScreen
        onGetStarted={() => {
          // mark that we've already shown the welcome screen
          localStorage.setItem(WELCOME_KEY, 'true');
          setScreen('ONBOARDING');
        }}
        onLogin={() => {
          localStorage.setItem(WELCOME_KEY, 'true');
          setScreen('LOGIN');
        }}
      />
    );
  }

  // LOGIN SCREEN (for returning users without session, or from Welcome)
  if (screen === 'LOGIN') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E6F0F9] to-[#FCE8EB] flex items-center justify-center">
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onCreateProfile={() => {
            setScreen('ONBOARDING');
          }}
        />
      </div>
    );
  }

  // CREATE ACCOUNT / ONBOARDING
  if (screen === 'ONBOARDING') {
    return <OnboardingPage onComplete={handleOnboardingComplete} />;
  }

  // MAIN APP (user is authenticated)
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
