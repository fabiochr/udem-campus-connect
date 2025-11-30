import React from 'react';

interface BottomNavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentView, 
  setCurrentView 
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'social', label: 'Social', icon: '➕' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-50 safe-area-bottom">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all min-h-[44px] ${
              currentView === item.id 
                ? 'text-[#0055A4] bg-blue-50 font-semibold' 
                : 'text-gray-600 hover:text-[#0055A4]'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;