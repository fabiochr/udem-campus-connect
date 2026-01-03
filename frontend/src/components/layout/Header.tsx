import React, { useState } from 'react';
import { useApp } from '../../contexts/LanguageContext';

console.log('[Header] Rendered');
interface HeaderProps {
  onNavigate?: (view: string) => void;
  onLogout?: () => void;
  notificationCount?: number;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  count?: number; // Make count optional
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onLogout, notificationCount = 0 }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { language, setLanguage } = useApp();

  const profileItems: MenuItem[] = [
    { id: 'notifications', label: 'Notifications (soon)', icon: '🔔', count: notificationCount },
    { id: 'account', label: 'Account Settings (soon)', icon: '⚙️' },
    { id: 'language', label: 'Language / Langue', icon: '🌐' },
    { id: 'help', label: 'Help & Support (soon)', icon: '❓' },
    { id: 'logout', label: 'Logout', icon: '🚪' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
      <div className="flex justify-between items-center">
        {/* Logo with UdeM Colors */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#0055A4] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">UdM</span>
          </div>
          <h1 className="text-xl font-bold text-[#0055A4]">
            UdeM Montreal Campus
          </h1>
        </div>

        {/* Profile Menu with Bell Notification */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px]"
            aria-label="Profile menu"
          >
            {/* Notification Bell */}
            <div className="relative">
              <span className="text-xl">🔔</span>
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {notificationCount}
                </div>
              )}
            </div>
            {/* Profile Icon */}
            <span className="text-xl">👤</span>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-56 z-50">
              {profileItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    // DEBUG: confirm click + whether handler exists
                    if (item.id === 'logout') {
                      console.log('[Header] Logout clicked. hasOnLogout=', !!onLogout);
                      onLogout?.();
                      setShowProfileMenu(false);
                      return;
                    }

                    if (item.id === 'language') {
                      setLanguage(language === 'en' ? 'fr' : 'en');
                      setShowProfileMenu(false);
                      return;
                    }

                    // Phase B items (optional)
                    alert('Coming soon');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  {/* FIX: Only show count if it exists and is greater than 0 */}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;