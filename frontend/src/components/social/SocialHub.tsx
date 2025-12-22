import React from "react";

type SocialHubProps = {
  onNavigate: (view: string) => void;
};

const tiles = [
  { id: "matches", title: "Find Matches", subtitle: "Connect with language partners", icon: "🤝" },
  { id: "challenges", title: "Study Challenges", subtitle: "Join academic challenges", icon: "🎯" },
  { id: "campus-map", title: "Campus Map", subtitle: "Explore Montreal campuses", icon: "🗺️" },
  { id: "forum", title: "Student Forum", subtitle: "Discuss with peers", icon: "💬" },
  { id: "marketplace", title: "Marketplace", subtitle: "Buy/sell student items", icon: "🛍️" },
];

const SocialHub: React.FC<SocialHubProps> = ({ onNavigate }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Social</h2>
      <p className="text-sm text-gray-600 mb-4">Choose a feature to explore.</p>

      <div className="grid grid-cols-1 gap-3">
        {tiles.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onNavigate(t.id)}
            className="w-full text-left bg-white border rounded-2xl p-4 shadow-sm hover:bg-gray-50 transition"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{t.icon}</div>
              <div>
                <div className="font-semibold text-gray-900">{t.title}</div>
                <div className="text-sm text-gray-600">{t.subtitle}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialHub;
