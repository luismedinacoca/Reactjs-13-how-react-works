# ⚙️ Section #11: `How React works behind the scenes`

---

## 📑 Table of Contents

---

## 🔧 01. Lesson 123 — _Project Setup and Walkthrough_

### 🧠 01.1 Context:

**Project Setup and Walkthrough** is the initial lesson that establishes the foundation of the project and provides an overview of its structure and functionality. This lesson is fundamental because:

#### Definition and Purpose

A **walkthrough** is a systematic review process of existing code to understand its architecture, data flow, and component structure. In this context, the project is designed to explore how React works internally, specifically focusing on component lifecycle, state management, and rendering.

#### Project Structure

The project uses a modern architecture based on:
- **Vite**: Ultra-fast build tool and dev server that provides HMR (Hot Module Replacement)
- **React 19.2.0**: The latest version of React with performance improvements and new features
- **TypeScript**: For type safety and better development experience
- **ESLint**: To maintain code quality and detect potential issues

#### Component Architecture

The project implements a tab system that demonstrates key concepts:

1. **App.tsx**: Root component that defines the data structure (`ContentItem[]`) and renders the `Tabbed` component
2. **Tabbed.tsx**: Container component that manages the active tab state (`activeTab`) and decides what content to display
3. **Tab.tsx**: Presentational component that represents an individual tab button
4. **TabContent.tsx**: Component that displays tab content with its own local state (`showDetails`, `likes`)
5. **DifferentContent.tsx**: Alternative component displayed when tab 4 is selected, demonstrating how component changes reset state

#### Data Flow

The data flow follows a top-down pattern:
- `App` passes `content` as a prop to `Tabbed`
- `Tabbed` manages the `activeTab` state and passes it to each `Tab`
- `TabContent` receives the specific `item` based on `activeTab`
- Each component can have its own local state (like `likes` in `TabContent`)

#### When to Use This Pattern

This design pattern is appropriate when:
- You need an interface with multiple views that share a common state
- You want to demonstrate how state is maintained or reset when changing components
- You're exploring component lifecycle and conditional rendering

#### Advantages

- **Separation of concerns**: Each component has a specific function
- **Reusability**: `Tab` can be used multiple times with different props
- **Maintainability**: Organized and easy-to-understand code
- **TypeScript**: Type safety prevents common errors

#### Disadvantages

- **Props drilling**: The `activeTab` state is passed through multiple levels
- **Local state**: State in `TabContent` is lost when switching tabs (intentional behavior for demonstration)
- **Hardcoded tabs**: Tabs are hardcoded instead of being dynamic based on content

#### Alternatives to Consider

- **Context API**: To avoid props drilling if the component tree grows
- **State Management Libraries**: Redux, Zustand, or Jotai for more complex applications
- **Dynamic components**: Generate tabs based on the `content` array instead of hardcoding them
- **Custom Hooks**: Extract state logic into reusable hooks

#### Connection to Main Theme

This setup is crucial because it sets the stage for exploring:
- How React renders components
- How state is maintained or reset between renders
- Component lifecycle and side effects
- Performance optimizations and re-rendering

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

### 🐞 01.3 Issues:

| Issue | Status | Log/Error |
| ----- | ------ | --------- |
| **Non-functional buttons in TabContent** | ⚠️ Identified | `src/components/TabContent.tsx:30,35-36` - The "+++", "Undo", and "Undo in 2s" buttons don't have implemented handlers. This can confuse users and breaks expected functionality. |
| **Missing accessibility in Tab** | ⚠️ Identified | `src/components/Tab.tsx:9` - The tab button lacks ARIA attributes (`aria-label`, `aria-selected`, `role="tab"`), `tabIndex`, and keyboard navigation support (`onKeyDown`). This affects accessibility for screen reader users. |
| **Use of `content.at()` instead of direct access** | ℹ️ Low Priority | `src/components/Tabbed.tsx:23` - `content.at(activeTab)` is less efficient than `content[activeTab]` and can return `undefined` if the index is out of range. Although there's validation in `TabContent`, direct access would be clearer and more efficient. |
| **Hardcoded tabs instead of dynamic** | ⚠️ Identified | `src/components/Tabbed.tsx:17-20` - Tabs are hardcoded (4 fixed tabs) instead of being dynamically generated based on the `content` array plus an additional tab. This makes the code less maintainable and scalable. |
| **Missing props validation in TabContent** | ⚠️ Identified | `src/components/TabContent.tsx:7` - Although there's a `if (!item)` check, there's no validation that `item.summary` and `item.details` exist before rendering them, which could cause errors if the data structure changes. |
| **Missing keyboard event handling** | ⚠️ Identified | `src/components/Tab.tsx:9` - The `Tab` component doesn't handle keyboard events (Enter, Space) to activate the tab, limiting accessibility and UX. |
| **Inconsistency in function names** | ℹ️ Low Priority | `src/components/TabContent.tsx:11` - The `handleInc` function follows the correct pattern, but other handlers use inline functions. It would be better to maintain consistency using named functions with the `handle` prefix. |
| **Missing strict TypeScript in some places** | ℹ️ Low Priority | `src/components/Tabbed.tsx:23` - The use of `content.at()` returns `ContentItem | undefined`, but TypeScript could benefit from more explicit type guards. |

### 🧱 01.4 Pending Fixes (TODO)

- [ ] Implement functionality for the "+++" button in `TabContent.tsx` (line 30) - should increment likes by 3
- [ ] Implement functionality for the "Undo" button in `TabContent.tsx` (line 35) - should revert the last likes change
- [ ] Implement functionality for the "Undo in 2s" button in `TabContent.tsx` (line 36) - should revert changes after 2 seconds using `setTimeout`
- [ ] Add accessibility attributes to `Tab.tsx` (line 9): `aria-label`, `aria-selected`, `role="tab"`, and `tabIndex`
- [ ] Implement `handleKeyDown` in `Tab.tsx` to support keyboard navigation (Enter and Space to activate)
- [ ] Refactor `Tabbed.tsx` to generate tabs dynamically based on `content.length + 1` instead of hardcoding 4 tabs (lines 17-20)
- [ ] Replace `content.at(activeTab)` with `content[activeTab]` in `Tabbed.tsx` (line 23) for better performance and clarity
- [ ] Add more robust props validation in `TabContent.tsx` to verify that `item.summary` and `item.details` exist before rendering
- [ ] Create a custom hook `useTabState` to extract state logic from `Tabbed.tsx` and make it reusable
- [ ] Add unit tests for main components (`Tab`, `TabContent`, `Tabbed`) to ensure correct functionality


## 🔧 02. Lesson 124 — _Components, Instances, and Elements_

### 🧠 02.1 Context:

**Components, Instances, and Elements** is a fundamental lesson that explains the core concepts of React's internal architecture. Understanding these concepts is crucial for developers because they form the foundation of how React works behind the scenes.

#### Definition and Purpose

React operates on four distinct but interconnected concepts:

1. **Component**: A function or class that defines the structure and behavior of a UI piece. It's a blueprint or template.
2. **Instance**: A concrete occurrence of a component with specific props and state, created when React renders the component.
3. **React Element**: A plain JavaScript object that describes what should be rendered. It's the result of JSX compilation.
4. **DOM Element**: The actual HTML node in the browser's DOM tree, created by React's reconciliation process.

#### When These Concepts Occur

- **Component**: Defined once in code (e.g., `function Tab() {}` or `const Tab = () => {}`)
- **Instance**: Created internally by React when a component is rendered with specific props
- **React Element**: Created every time JSX is evaluated (e.g., `<Tab num={0} />` becomes a React Element object)
- **DOM Element**: Created and updated by React when it commits changes to the DOM

#### Examples from the Project

**Component Definition** (`src/components/Tab.tsx`):
```7:13:src/components/Tab.tsx
function Tab({ num, activeTab, onClick }: TabProps) {
  return (
    <button className={activeTab === num ? "tab active" : "tab"} onClick={() => onClick(num)}>
      Tab {num + 1}
    </button>
  );
}
```
This is a **Component** - a reusable function that defines how a tab button should look and behave.

**Component Instances** (`src/components/Tabbed.tsx`):
```17:20:src/components/Tabbed.tsx
<Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
<Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
<Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
<Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
```
Each `<Tab />` JSX expression creates a **React Element**, and when React renders them, it creates separate **Instances** of the `Tab` component, each with its own props (`num={0}`, `num={1}`, etc.).

**React Element Creation** (`src/App.tsx`):
```26:32:src/App.tsx
export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}
```
The JSX `<Tabbed content={content} />` is compiled into a React Element object like:
```javascript
{
  type: Tabbed,
  props: { content: content },
  key: null,
  ref: null
}
```

**DOM Element Creation** (`src/main.tsx`):
```6:9:src/main.tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
React takes the React Elements, creates component instances, and finally creates actual **DOM Elements** (HTML nodes) that are inserted into the `<div id="root">` in `index.html`.

#### Key Differences and Relationships

**Component vs Instance**:
- A Component is the function/class definition (exists once in code)
- An Instance is created each time React renders the component (can exist multiple times)
- In `Tabbed.tsx`, there are 4 instances of the `Tab` component, but only one `Tab` component definition

**React Element vs Component Instance**:
- React Elements are plain objects describing what to render (immutable, created on each render)
- Component Instances are React's internal representation of a component with state and lifecycle (mutable, managed by React)
- When you write `<Tab num={0} />`, you create a React Element; React then creates an Instance internally

**React Element vs DOM Element**:
- React Elements are virtual (JavaScript objects in memory)
- DOM Elements are real (actual HTML nodes in the browser)
- React uses a reconciliation process to convert React Elements into DOM Elements efficiently

#### Advantages

- **Separation of Concerns**: Clear distinction between what you write (Components/JSX), what React manages (Instances), and what the browser displays (DOM Elements)
- **Performance**: React Elements allow React to compare virtual trees and update only what changed
- **Predictability**: Understanding these concepts helps debug rendering issues and optimize performance
- **Reusability**: One Component definition can create multiple Instances with different props

#### Disadvantages

- **Complexity**: The abstraction can be confusing for beginners who don't understand the layers
- **Debugging**: It's harder to inspect React Elements and Instances compared to DOM Elements (requires React DevTools)
- **Learning Curve**: Developers need to understand the mental model to work effectively with React

#### When to Consider Alternatives

- **Direct DOM Manipulation**: Only when React's abstraction doesn't meet specific needs (e.g., third-party libraries that require direct DOM access)
- **Web Components**: When you need framework-agnostic components, though React can work with Web Components
- **Server-Side Rendering**: Understanding these concepts is crucial for SSR frameworks like Next.js

#### Connection to Main Theme

This lesson is foundational because it explains:
- **How React renders**: The journey from Component → React Element → Instance → DOM Element
- **Why state persists**: Instances maintain state across re-renders when the component type and position remain the same
- **Why state resets**: When switching from `<TabContent />` to `<DifferentContent />`, React creates a new Instance because the component type changed
- **Performance optimization**: Understanding React Elements helps optimize re-renders and use React.memo effectively

### ⚙️ 02.2 Updating code according the context:

#### 02.2.1 Component:
![](../img/section11-lecture124-001.png)

#### 02.2.2 Component vs Instance:
![](../img/section11-lecture124-002.png)

#### 02.2.3 Component vs Instance vs React Element:
![](../img/section11-lecture124-003.png)

#### 02.2.4 Component vs Instance vs React Element vs DOM Element (HTML):
![](../img/section11-lecture124-004.png)

#### 02.2.5 Comparative table:

| Concept | What is it? | Example | Key Features |
|---------|-------------|---------|--------------|
| **Component** | Template or function that defines how a part of the UI should look and behave | `function Button(props) { return <button>{props.text}</button>; }` | - Reusable<br>- Defines structure and behavior<br>- Doesn't physically exist until used |
| **Instance Component** | Concrete use of a Component with specific props | `<Button text="Click here" />` in a specific place | - Has concrete props<br>- Occupies memory<br>- Managed internally by React |
| **React Element** | JavaScript object describing what you want to render | `{type: 'button', props: {children: 'Hello'}, key: null, ref: null}` | - Plain object<br>- Describes what to render, doesn't render it<br>- Immutable |
| **DOM Element** | Real node in the browser (HTML) | `<button style="color: blue;">Hello</button>` in the DOM | - Physically exists on the page<br>- Consumes browser resources<br>- Mutable |

### 🐞 02.3 Issues:

| Issue | Status | Log/Error |
| ----- | ------ | --------- |
| **Multiple instances of Tab component without keys** | ⚠️ Identified | `src/components/Tabbed.tsx:17-20` - Four `Tab` component instances are rendered without explicit `key` props. While React can handle this, explicit keys help React identify instances correctly when the list order changes, improving reconciliation performance and preventing potential bugs. |
| **Component instances created conditionally may cause instance confusion** | ⚠️ Identified | `src/components/Tabbed.tsx:22` - The conditional rendering between `<TabContent />` and `<DifferentContent />` switches component types, which causes React to unmount one instance and mount another. This is intentional for demonstration but could be optimized with a single component that handles both cases. |
| **No explicit React Element inspection or debugging utilities** | ℹ️ Low Priority | The project doesn't include examples of inspecting React Elements (e.g., using `console.log` to see the element object structure) or React DevTools setup instructions, which would help developers understand these concepts practically. |
| **Component definitions use function declarations instead of const arrow functions** | ℹ️ Low Priority | `src/components/Tab.tsx:7`, `src/components/Tabbed.tsx:11`, `src/components/TabContent.tsx:7` - Inconsistent use of function declarations vs const arrow functions. While both create components, consistency improves code readability and follows modern React patterns. |
| **Missing React.memo optimization for Tab component** | ⚠️ Identified | `src/components/Tab.tsx:7` - The `Tab` component re-renders even when its props (`num`, `activeTab`, `onClick`) haven't changed. Since multiple `Tab` instances exist, using `React.memo` would prevent unnecessary re-renders of inactive tabs, improving performance. |
| **onClick prop passed directly without memoization** | ⚠️ Identified | `src/components/Tabbed.tsx:17-20` - The `setActiveTab` function is passed directly to each `Tab` instance. While this works, if `Tab` were memoized, a new function reference on each render would cause unnecessary re-renders. Using `useCallback` would optimize this. |
| **No demonstration of React Element structure in code** | ℹ️ Low Priority | The project doesn't include code examples showing what React Elements look like when logged (e.g., `console.log(<Tab num={0} />)`), which would help developers visualize the concept discussed in the lesson. |

### 🧱 02.4 Pending Fixes (TODO)

- [ ] Add explicit `key` props to `Tab` component instances in `Tabbed.tsx` (lines 17-20) - Use `key={num}` to help React identify instances correctly
- [ ] Add `React.memo` to `Tab.tsx` component to prevent unnecessary re-renders when props haven't changed
- [ ] Wrap `setActiveTab` in `useCallback` in `Tabbed.tsx` to maintain stable function reference and optimize memoized `Tab` components
- [ ] Add a code example demonstrating React Element structure - Create a utility function or comment showing what `<Tab num={0} />` compiles to (the React Element object structure)
- [ ] Standardize component definitions - Convert all function declarations to const arrow functions for consistency (`Tab.tsx`, `Tabbed.tsx`, `TabContent.tsx`)
- [ ] Add React DevTools setup instructions in documentation - Include steps for installing and using React DevTools to inspect component instances and React Elements
- [ ] Create a demonstration component that logs React Elements - Add a `DebugElement.tsx` component that shows the structure of React Elements when rendered
- [ ] Document the instance lifecycle - Add comments explaining when React creates/destroys component instances in `Tabbed.tsx` when switching between `TabContent` and `DifferentContent`























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
