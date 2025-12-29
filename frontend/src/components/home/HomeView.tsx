import React from "react";

type HomeViewProps = {
  language: "en" | "fr";
  studentName?: string;
};

const HomeView: React.FC<HomeViewProps> = ({ language, studentName }) => {
  const t = {
    greeting: language === "en" ? "Welcome back" : "Bon retour",
    subtitle:
      language === "en"
        ? "Here’s what’s happening on campus."
        : "Voici ce qui se passe sur le campus.",
    quickActions: language === "en" ? "Quick actions" : "Actions rapides",
    highlights: language === "en" ? "Highlights" : "À la une",
    upcoming: language === "en" ? "Upcoming" : "À venir",
    empty: language === "en" ? "Coming soon." : "À venir.",
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header / Greeting */}
      <div className="bg-white rounded-2xl border shadow-sm p-4">
        <div className="text-sm text-gray-600">{t.greeting}{studentName ? `, ${studentName}` : ""} 👋</div>
        <div className="text-xl font-bold text-gray-900 mt-1">UdeM Campus Connect</div>
        <div className="text-sm text-gray-600 mt-1">{t.subtitle}</div>
      </div>

      {/* Quick Actions (will be styled to match home.jpg later) */}
      <div className="bg-white rounded-2xl border shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-gray-900">{t.quickActions}</div>
          <div className="text-xs text-gray-500">{t.empty}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 rounded-xl border bg-gray-50 text-left hover:bg-gray-100 transition">
            <div className="text-lg">🗺️</div>
            <div className="font-semibold text-gray-900 mt-1">
              {language === "en" ? "Explore campus" : "Explorer le campus"}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {language === "en" ? "Maps & spots" : "Cartes & endroits"}
            </div>
          </button>

          <button className="p-4 rounded-xl border bg-gray-50 text-left hover:bg-gray-100 transition">
            <div className="text-lg">🎯</div>
            <div className="font-semibold text-gray-900 mt-1">
              {language === "en" ? "Join a challenge" : "Rejoindre un défi"}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {language === "en" ? "Study & fun" : "Étude & fun"}
            </div>
          </button>

          <button className="p-4 rounded-xl border bg-gray-50 text-left hover:bg-gray-100 transition">
            <div className="text-lg">🤝</div>
            <div className="font-semibold text-gray-900 mt-1">
              {language === "en" ? "Find matches" : "Trouver des matchs"}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {language === "en" ? "Meet students" : "Rencontrer des étudiants"}
            </div>
          </button>

          <button className="p-4 rounded-xl border bg-gray-50 text-left hover:bg-gray-100 transition">
            <div className="text-lg">💬</div>
            <div className="font-semibold text-gray-900 mt-1">
              {language === "en" ? "Join forum" : "Rejoindre le forum"}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {language === "en" ? "Ask & share" : "Demander & partager"}
            </div>
          </button>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white rounded-2xl border shadow-sm p-4">
        <div className="font-semibold text-gray-900 mb-3">{t.highlights}</div>
        <div className="space-y-3">
          <div className="p-4 rounded-xl border bg-white">
            <div className="text-sm font-semibold text-gray-900">
              {language === "en" ? "Welcome Week" : "Semaine d’accueil"}
            </div>
            <div className="text-xs text-gray-600 mt-1">{t.empty}</div>
          </div>

          <div className="p-4 rounded-xl border bg-white">
            <div className="text-sm font-semibold text-gray-900">
              {language === "en" ? "Campus tips" : "Astuces campus"}
            </div>
            <div className="text-xs text-gray-600 mt-1">{t.empty}</div>
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <div className="bg-white rounded-2xl border shadow-sm p-4">
        <div className="font-semibold text-gray-900 mb-3">{t.upcoming}</div>
        <div className="p-4 rounded-xl border bg-gray-50 text-sm text-gray-700">
          {t.empty}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
