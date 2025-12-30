import { useState } from "react";
import type { ContentItem } from "../App";

interface TabContentProps {
  item: ContentItem | undefined;
}
function TabContent({ item }: TabContentProps) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  console.log("🚀 RENDERS!");

  function handleInc() {
    setLikes((likes) => likes + 1);
  }

  if (!item) {
    return null;
  }

  const handleUndo = () => {
    setShowDetails(true);
    setLikes(0);
    console.log("state updated is async", likes);
  };

  function handleTripleInc() {
    //setLikes(likes + 1);
    //setLikes(likes + 1);
    //setLikes(likes + 1);

    // handleInc();
    // handleInc();
    // handleInc();

    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);

    console.log("state updated is async", likes);
  }

  const handleUndoLater = () => {
    setTimeout(handleUndo, 2000);
  };

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>{showDetails ? "Hide" : "Show"} details</button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

export default TabContent;
