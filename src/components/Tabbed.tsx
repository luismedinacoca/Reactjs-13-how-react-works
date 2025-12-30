import { useState } from "react";
import DifferentContent from "./DifferentContent";
import Tab from "./Tab";
import TabContent from "./TabContent";
import type { ContentItem } from "../App";

interface TabbedProps {
  content: ContentItem[];
}

function Tabbed({ content }: TabbedProps) {
  const [activeTab, setActiveTab] = useState(0);

  const currentItem = activeTab <= 2 ? content.at(activeTab) : undefined;

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        currentItem ? (
          <TabContent item={currentItem} key={currentItem.summary} />
        ) : null
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}
export default Tabbed;
