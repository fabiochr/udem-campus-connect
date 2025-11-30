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
  setCurrentView 
}) => {
  const [showSocialMenu, setShowSocialMenu] = useState(false);

  const handleNavigation = (view: string) => {
    setCurrentView(view);
    console.log(`Navigating to: ${view}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with Profile Menu */}
      <Header onNavigate={setCurrentView} notificationCount={3} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20 px-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentView={currentView} 
        setCurrentView={handleNavigation} 
      />

      {/* Social Menu Modal */}
      <SocialMenu 
        isOpen={showSocialMenu}
        onClose={() => setShowSocialMenu(false)}
        onNavigate={setCurrentView}
      />
    </div>
  );
};

export default MobileLayout;