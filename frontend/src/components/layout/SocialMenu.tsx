import React from 'react';

interface SocialMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

const SocialMenu: React.FC<SocialMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const socialItems = [
    { id: 'matches', label: 'Find Matches', icon: '🎯', description: 'Connect with language partners' },
    { id: 'challenges', label: 'Study Challenges', icon: '🏆', description: 'Join academic challenges' },
    { id: 'campus-map', label: 'Campus Map', icon: '🗺️', description: 'Explore Montreal campuses' },
    { id: 'forum', label: 'Student Forum', icon: '💬', description: 'Discuss with peers' },
    { id: 'marketplace', label: 'Marketplace', icon: '🛒', description: 'Buy/sell student items' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Social Menu */}
      <div className="fixed bottom-20 left-4 right-4 bg-white rounded-xl shadow-2xl z-50 p-4">
        <h3 className="text-lg font-semibold text-[#0055A4] mb-4 text-center">
          Social Features
        </h3>
        <div className="space-y-2">
          {socialItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-[#E6F0F9] transition-colors text-left"
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialMenu;