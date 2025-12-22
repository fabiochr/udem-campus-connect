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
    localStorage.setItem(WELCOME_KEY, 'true');
    setScreen('LOGIN');
  };

  // Safety net: if screen says APP but there is no user, go to LOGIN
  useEffect(() => {
    if (screen === 'APP' && !currentStudent) {
      setScreen('LOGIN');
    }
  }, [screen, currentStudent]);

  // If bottom nav uses "logout" virtual view
  useEffect(() => {
    if (currentView === 'logout') {
      handleLogout();
    }
  }, [currentView]);

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

  if (screen === 'WELCOME') {
    return (
      <WelcomeScreen
        onGetStarted={() => {
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

  if (screen === 'LOGIN') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E6F0F9] to-[#FCE8EB] flex items-center justify-center">
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onCreateProfile={() => {
            setScreen('ONBOARDING');
          }}
          onTooManyAttempts={() => {
            // after 4 failed logins → send user back to Welcome
            localStorage.removeItem(WELCOME_KEY); // so welcome appears again
            setScreen('WELCOME');
          }}
        />
      </div>
    );
  }

  if (screen === 'ONBOARDING') {
    return <OnboardingPage onComplete={handleOnboardingComplete} />;
  }

  return (
    <MobileLayout currentView={currentView} setCurrentView={setCurrentView}>
      <DashboardPage currentView={currentView} 
       setCurrentView={setCurrentView}
       onLogout={handleLogout} />
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
