import React from "react";
import { useApp } from "../../contexts/LanguageContext";

type HomeViewProps = {
  onNavigate: (view: string) => void;
  studentName?: string;
};

const HomeView: React.FC<HomeViewProps> = ({ onNavigate, studentName }) => {
  const { language } = useApp();

  const t = {
    welcome: language === "en" ? "Welcome back" : "Bon retour",
    subtitle:
      language === "en"
        ? "What would you like to explore today?"
        : "Que souhaitez-vous explorer aujourd’hui ?",
    explore: language === "en" ? "Explore Campus" : "Explorer le campus",
    forum: language === "en" ? "Join Forum" : "Forum",
    matches: language === "en" ? "Find Matches" : "Trouver des matchs",
    events: language === "en" ? "Events" : "Événements",
  };

  return (
    <div className="px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Greeting */}
        <section>
          <p className="text-sm text-gray-600">
            {t.welcome}
            {studentName ? `, ${studentName}` : ""} 👋
          </p>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            UdeM Campus Connect
          </h1>
          <p className="text-sm text-gray-600 mt-1">{t.subtitle}</p>
        </section>

        {/* Sections */}
        <HomeSection
          title={t.explore}
          action="20+ spots"
          onAction={() => onNavigate("campus")}
          items={[
            { title: "Libraries", subtitle: "Study & relax" },
            { title: "Cafeterias", subtitle: "Food & coffee" },
          ]}
        />

        <HomeSection
          title={t.forum}
          action="Active"
          onAction={() => onNavigate("forum")}
          items={[
            { title: "Housing tips", subtitle: "Ask & share" },
            { title: "First-year help", subtitle: "Student advice" },
          ]}
        />

        <HomeSection
          title={t.matches}
          action="New"
          onAction={() => onNavigate("matches")}
          items={[
            { title: "Study buddies", subtitle: "Same program" },
            { title: "Language exchange", subtitle: "Practice together" },
          ]}
        />

        <HomeSection
          title={t.events}
          action="Soon"
          onAction={() => onNavigate("events")}
          items={[
            { title: "Cultural events", subtitle: "Campus life" },
            { title: "Workshops", subtitle: "Learn & grow" },
          ]}
        />
      </div>
    </div>
  );
};

export default HomeView;

/* ---------- Reusable Section ---------- */

const HomeSection = ({
  title,
  action,
  onAction,
  items,
}: {
  title: string;
  action: string;
  onAction: () => void;
  items: { title: string; subtitle: string }[];
}) => (
  <section className="space-y-3">
    <div className="flex items-center justify-between">
      <h2 className="font-semibold text-gray-900">{title}</h2>
      <button
        onClick={onAction}
        className="text-sm text-blue-600 hover:underline"
      >
        {action}
      </button>
    </div>

    <div className="flex gap-4 overflow-x-auto pb-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="min-w-[180px] lg:min-w-[240px] rounded-xl border bg-white p-4 shadow-sm"
        >
          <div className="font-semibold text-gray-900 text-sm">
            {item.title}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {item.subtitle}
          </div>
        </div>
      ))}
    </div>
  </section>
);
