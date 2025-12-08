import React, { useState } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import SocialMenu from './SocialMenu';

interface MobileLayoutProps {
  children: React.ReactNode;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  currentView,
  setCurrentView,
}) => {
  const [showSocialMenu, setShowSocialMenu] = useState(false);

  const handleNavigation = (view: string) => {
    setCurrentView(view);
    console.log(`Navigating to: ${view}`);
  };

  const handleSocialClick = () => {
    setShowSocialMenu((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header onNavigate={handleNavigation} notificationCount={3} />

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-20 px-4">
        {children}
      </main>

      {/* Bottom navigation */}
      <BottomNavigation
        currentView={currentView}
        setCurrentView={handleNavigation}
        onSocialClick={handleSocialClick}
      />

      {/* Social menu modal */}
      <SocialMenu
        isOpen={showSocialMenu}
        onClose={() => setShowSocialMenu(false)}
        onNavigate={(view) => {
          setCurrentView(view);
          setShowSocialMenu(false);
        }}
      />
    </div>
  );
};

export default MobileLayout;
