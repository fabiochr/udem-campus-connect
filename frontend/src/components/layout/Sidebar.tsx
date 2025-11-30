import React from 'react';
import { useApp } from '../../contexts/LanguageContext';
import { Users, Trophy, Map, MessageSquare, ShoppingCart, User } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, setCurrentView }) => {
  const { t, currentStudent } = useApp();

  const menuItems = [
    { id: 'matches', icon: Users, label: t('navigation.matches') },
    { id: 'challenges', icon: Trophy, label: t('navigation.challenges') },
    { id: 'map', icon: Map, label: t('navigation.map') },
    { id: 'forum', icon: MessageSquare, label: t('navigation.forum') },
    { id: 'marketplace', icon: ShoppingCart, label: t('navigation.marketplace') },
  ];

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static lg:inset-0
    `}>
      {/* Profile Section */}
      <div className="p-6 border-b border-gray-200">
        {currentStudent ? (
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-udem-blue rounded-full flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{currentStudent.name}</h3>
              <p className="text-sm text-gray-600">
                {currentStudent.french_level} • {currentStudent.languages.join(', ')}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-3">{t('profile.create')}</p>
            <button 
              onClick={() => setCurrentView('onboarding')}
              className="bg-udem-blue text-white px-4 py-2 rounded-lg hover:bg-udem-red transition-colors"
            >
              {t('profile.create')}
            </button>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentView(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                    ${currentView === item.id 
                      ? 'bg-udem-blue text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;