import React from "react";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";

interface MobileLayoutProps {
  children: React.ReactNode;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, currentView, setCurrentView }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">{children}</main>

      <BottomNavigation currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default MobileLayout;
