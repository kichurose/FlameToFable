# Polaroid line carousel integration

This repository uses Angular 20 and TypeScript. The supplied React component has been adapted as a standalone Angular component so it works with the existing routes and candle catalogue.

Reusable UI components live in `src/components/ui/`. Keeping them here separates presentation components from routed pages and makes them easy to import and reuse. The carousel template and scoped SCSS live beside its TypeScript file; global styles are in `src/styles.scss`.

The homepage imports `PolaroidLineCarouselComponent`. Its `slides` array uses existing candle photographs from `public/`. It supports pointer dragging, click-to-select, arrow keys, Home/End, spring settling, swing, autoplay, pause, and reduced motion. Observers, timers, and animation frames are cleaned up when leaving the page.

## React/shadcn alternative

shadcn's React components do not run directly in an Angular template. No React or Tailwind dependencies are needed by this Angular implementation. If a separate React implementation is desired, create a React TypeScript project with `npm create vite@latest polaroid-react -- --template react-ts`, follow the official Tailwind Vite setup, then run `npx shadcn@latest init`. Configure the `@/` alias to `src/` and place the supplied `.tsx` in `src/components/ui/`. That directory provides a consistent import path for reusable shadcn components; it is not an Angular requirement.

## Run

Use Node.js 20.19+ or 22.12+ and run `npm start`. The development site is at http://localhost:4200/.
