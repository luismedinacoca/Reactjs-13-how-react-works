# ⚙️ Section #11: `How React works behind the scenes`

---

## 📑 Table of Contents

---

## 🔧 01. Lesson 123 — _Project Setup and Walkthrough_

### 🧠 01.1 Context:

### ⚙️ 01.2 Updating code according the context:

#### 01.2.1 Initial setup:

- `App.tsx`:

  ```tsx
  /* src/App.tsx */
  import Tabbed from "./components/Tabbed";

  export interface ContentItem {
    summary: string;
    details: string;
  }

  const content: ContentItem[] = [
    {
      summary: "React is a library for building UIs",
      details:
        "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      summary: "State management is like giving state a home",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      summary: "We can think of props as the component API",
      details:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];

  export default function App() {
    return (
      <div>
        <Tabbed content={content} />
      </div>
    );
  }
  ```

- `Tabbed.tsx`:

  ```tsx
  /* src/components/Tabbed.tsx */
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
    return (
      <div>
        <div className="tabs">
          <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
          <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
          <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
          <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
        </div>

        {activeTab <= 2 ? (
          <TabContent item={content.at(activeTab)} />
        ) : (
          <DifferentContent />
        )}
      </div>
    );
  }
  export default Tabbed;
  ```

- `Tab.tsx`:

  ```tsx
  /* src/components/Tab.tsx */
  interface TabProps {
    num: number;
    activeTab: number;
    onClick: (num: number) => void;
  }

  function Tab({ num, activeTab, onClick }: TabProps) {
    return (
      <button
        className={activeTab === num ? "tab active" : "tab"}
        onClick={() => onClick(num)}
      >
        Tab {num + 1}
      </button>
    );
  }

  export default Tab;
  ```

- `TabContent.tsx`:

  ```tsx
  /* src/components/TabContent.tsx */
  import { useState } from "react";
  import type { ContentItem } from "../App";

  interface TabContentProps {
    item: ContentItem | undefined;
  }
  function TabContent({ item }: TabContentProps) {
    const [showDetails, setShowDetails] = useState(true);
    const [likes, setLikes] = useState(0);

    function handleInc() {
      setLikes(likes + 1);
    }

    if (!item) {
      return null;
    }

    return (
      <div className="tab-content">
        <h4>{item.summary}</h4>
        {showDetails && <p>{item.details}</p>}

        <div className="tab-actions">
          <button onClick={() => setShowDetails((h) => !h)}>
            {showDetails ? "Hide" : "Show"} details
          </button>

          <div className="hearts-counter">
            <span>{likes} ❤️</span>
            <button onClick={handleInc}>+</button>
            <button>+++</button>
          </div>
        </div>

        <div className="tab-undo">
          <button>Undo</button>
          <button>Undo in 2s</button>
        </div>
      </div>
    );
  }

  export default TabContent;
  ```

- `DifferentContent.tsx`:
  ```tsx
  /* src/components/DifferentContent.tsx */
  function DifferentContent() {
    return (
      <div className="tab-content">
        <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
      </div>
    );
  }
  export default DifferentContent;
  ```

#### 01.2.2 Project tree:

```
13-how-react-works/
│
├── 📄 index.html                 # HTML entry point
├── 📄 vite.config.ts             # Vite configuration
├── 📄 eslint.config.js           # ESLint configuration
├── 📄 package.json               # Project dependencies and scripts
├── 📄 package-lock.json          # Dependency lock file
├── 📄 README.md                  # Project documentation
│
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 tsconfig.app.json          # TypeScript app-specific configuration
├── 📄 tsconfig.node.json         # TypeScript Node.js configuration
│
├── 📁 public/                    # Static public assets
│   └── 📄 vite.svg               # Vite logo SVG
│
├── 📁 docs/                      # Documentation files
│   └── 📄 LECTURE_STEPS.md       # Lecture notes and steps
│
├── 📁 node_modules/              # Dependencies (excluded from version control)
│
└── 📁 src/                       # Source code
    │
    ├── 📄 main.tsx               # Application entry point (React DOM root)
    ├── 📄 App.tsx                # Main App component (root component with tabbed content)
    ├── 📄 index.css              # Global styles
    │
    ├── 📁 assets/                # Additional assets
    │   └── 📄 react.svg          # React logo SVG
    │
    └── 📁 components/            # React components
        ├── 📄 Tabbed.tsx         # Tabbed container component (manages tab state)
        ├── 📄 Tab.tsx            # Individual tab button component
        ├── 📄 TabContent.tsx     # Tab content display component
        └── 📄 DifferentContent.tsx # Alternative content component
```

#### 01.2.3

```tsx
/*  */
```

### 🐞 01.3 Issues:

- **first issue**: something..

| Issue | Status | Log/Error |
| ----- | ------ | --------- |

### 🧱 01.4 Pending Fixes (TODO)

```md
- [ ]
```

---

🔥 🔥 🔥

## 🔧 XX. Lesson YYY — _{{TITLE_NAME}}_

### 🧠 XX.1 Context:

### ⚙️ XX.2 Updating code according the context:

#### XX.2.1

```tsx
/*  */
```

#### XX.2.2

```tsx
/*  */
```

### 🐞 XX.3 Issues:

- **first issue**: something..

| Issue | Status | Log/Error |
| ----- | ------ | --------- |

### 🧱 XX.4 Pending Fixes (TODO)

```md
- [ ]
```
