"use client";

export const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const navigationTabs = [
    {
      id: "gratitude",
      label: "Gratitude",
      icon: "🙏",
      description: "Practice daily gratitude",
    },
    {
      id: "breathing",
      label: "Breathing Exercise",
      icon: "🌬️",
      description: "Mindful breathing techniques",
    },
    {
      id: "affirmation",
      label: "Affirmation",
      icon: "💭",
      description: "Positive self-affirmations",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {navigationTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-[#0059FF] text-white shadow-lg shadow-blue-500/25"
              : "bg-[#272f3c] text-gray-300 hover:bg-[#313845] hover:text-white"
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          <div className="text-left">
            <div className="font-medium">{tab.label}</div>
            <div className="text-xs opacity-75">{tab.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
};
