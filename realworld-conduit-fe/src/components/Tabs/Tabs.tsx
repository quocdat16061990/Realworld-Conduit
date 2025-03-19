import { useEffect, useState } from "react";
import { TabsProps } from "./Tabs.type";

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    if (activeTab >= tabs.length) {
      setActiveTab(tabs.length - 1);
    }
  }, [tabs, activeTab]);

  return (
    <div className="max-w-4xl mx-auto font-sans">
      {/* Render Header Tabs */}
      <div className="flex border-b-2 border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-5 py-3 text-gray-600 transition duration-300 ${
              activeTab === index
                ? "text-green-500 border-b-2 border-green-500 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Render Content Tab */}
      <div className="p-5 bg-white shadow-md">
        {tabs.length > 0 ? (
          tabs[activeTab]?.content
        ) : (
          <p>No content available</p>
        )}
      </div>
    </div>
  );
};

export default Tabs;
