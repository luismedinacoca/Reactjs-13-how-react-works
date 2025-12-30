# 13-how-react-works

A small **React + TypeScript** sandbox (built with **Vite**) used to explore how React behaves “behind the scenes”: re-renders, state updates, batching, reconciliation, and how switching component trees affects local state.

This repository centers around a simple **tab UI** where each tab can render different content and demonstrate when component state is preserved or reset.

## Features / Capabilities

- **Tabbed UI with local state**: switch between tabs and observe re-render behavior.
- **State update patterns**: single increment, triple increment using functional updates, and undo patterns.
- **Async state demonstration**: log statements show how state updates are scheduled and applied.
- **Remount & state reset scenarios**:
  - `key` changes force React to treat the component as a new instance.
  - Rendering a different component tree (Tab 4) demonstrates state reset via remount.
- **TypeScript-first**: strict TS config for safer refactors.

## Key Concepts / Architecture

- **Top-down data flow**:
  - `App` defines the `content` model and passes it down.
  - `Tabbed` holds the currently selected tab index (`activeTab`).
  - `Tab` is a presentational button that updates the active tab.
  - `TabContent` owns local UI state (`showDetails`, `likes`).
- **Reconciliation & remounting**:
  - `Tabbed` renders `TabContent` with a `key` derived from the current item summary; switching tabs changes the key and triggers a remount (local state resets).
  - Selecting the 4th tab renders `DifferentContent`, changing the component type and resetting state.
- **No external state library**: the project intentionally stays minimal to highlight core React behavior.

If you want a more detailed learning narrative, see `docs/LECTURE_STEPS.md`.

## Tech Stack

- **React** (v19)
- **TypeScript**
- **Vite**
- **ESLint** (React Hooks + React Refresh configs)

## Installation

### Prerequisites

- **Node.js**: 18+ (recommended)
- **npm**: comes with Node

### Steps

```bash
npm install
```

## Usage

### Run the dev server

```bash
npm run dev
```

Then open the URL printed in your terminal by Vite.

### Build and preview production output

```bash
npm run build
npm run preview
```

### What to try in the UI

- Click **Tab 1–3** and observe how `TabContent` state resets when switching (remount via `key`).
- Use **+** vs **+++** to see why functional updates matter for multiple updates in one event.
- Click **Undo** and **Undo in 2s** to see immediate vs delayed state updates.
- Click **Tab 4** to render `DifferentContent` and observe the remount/state reset behavior.

## Project Structure

```text
.
├── docs/
│   └── LECTURE_STEPS.md
├── src/
│   ├── components/
│   │   ├── DifferentContent.tsx
│   │   ├── Tab.tsx
│   │   ├── Tabbed.tsx
│   │   └── TabContent.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── vite.config.ts
├── eslint.config.js
└── package.json
```

## Configuration

- **Environment variables**: none required.
- **Vite config**: `vite.config.ts` uses the standard React plugin with default settings.

## Scripts / Commands

- **dev**: start Vite dev server

```bash
npm run dev
```

- **build**: typecheck + build production assets into `dist/`

```bash
npm run build
```

- **preview**: locally preview the production build

```bash
npm run preview
```

- **lint**: run ESLint across the project

```bash
npm run lint
```

## Testing & Quality

- **Automated tests**: none configured in this repository.
- **Linting**: ESLint (see `eslint.config.js`).
- **Type safety**: strict TypeScript configuration (see `tsconfig.app.json`).

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feat/my-change
```

3. Install dependencies and validate:

```bash
npm install
npm run lint
```

4. Open a pull request with a clear description of the change and why it’s useful.

## Roadmap / Future Improvements (Optional)

- Generate tabs dynamically from the `content` array (remove hardcoded tabs).
- Improve keyboard accessibility and focus management for tabs (ARIA tab pattern).
- Add a small test suite (e.g., Vitest + React Testing Library) for state/reset behaviors.
- Add React Profiler notes/examples for measuring re-render impacts.

## License

No license specified. If you plan to publish or reuse this code, add a `LICENSE` file and update this section.

## Acknowledgments / Credits

- Course inspiration: Jonas Schmedtmann’s React curriculum (Section “How React works behind the scenes”).
- References: [React docs](https://react.dev/) and [Vite docs](https://vite.dev/).
