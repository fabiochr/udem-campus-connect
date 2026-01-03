import React from "react";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";

interface MobileLayoutProps {
  children: React.ReactNode;
  currentView: string;
  setCurrentView: (view: string) => void;
  onLogout?: () => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, currentView, setCurrentView, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={setCurrentView} onLogout={onLogout} />
      <main className="flex-1">{children}</main>
      <BottomNavigation currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default MobileLayout;
