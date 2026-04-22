# bliu8923.github.io

Personal portfolio site: **React 18**, **Vite 6**, **Tailwind CSS v4**, **React Router 7**, and **Motion**. Built output is deployed to **GitHub Pages** (custom domain: `brliu.com` via `public/CNAME`).

## Prerequisites

- **Node.js 20+** (matches CI)
- **npm** 10+ (this repo uses `package-lock.json` and `npm ci` in GitHub Actions)

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Start Vite dev server with HMR                   |
| `npm run build`    | Production build to `dist/`                      |
| `npm run preview`  | Serve `dist/` locally                            |
| `npm test`         | Run **Vitest** tests once                        |
| `npm run test:watch` | Vitest watch mode                            |
| `npm run typecheck`| `tsc --noEmit` (no build artifact)               |

## Tests

Smoke tests live under `src/app/*.test.tsx` and use **Vitest** + **Testing Library** + **jsdom**.

`motion` uses `IntersectionObserver` in the browser; tests stub it in [`src/test/setup.ts`](src/test/setup.ts).

## Production build

```bash
npm run build
```

Artifacts go to `dist/`, including:

- `index.html` — Vite entry (includes a small script to support the GitHub Pages SPA redirect)
- `404.html` — GitHub Pages **SPA fallback** (see below)
- `CNAME` — custom domain for Pages

## GitHub Pages deployment

This repo uses **GitHub Actions** to build and publish the `dist/` folder (not the raw source).

1. In the GitHub repo: **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to `main`; the workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs `npm ci`, `npm test`, `npm run build`, then uploads `dist/` with **actions/upload-pages-artifact** and **actions/deploy-pages**.

### SPA routing on GitHub Pages

Client-side routes like `/about` need a **404 fallback**: `public/404.html` redirects to `/?/…` and `index.html` restores the path (pattern from [spa-github-pages](https://github.com/rafgraph/spa-github-pages)). Do not remove those scripts if you keep `createBrowserRouter` and deep links.

### Custom domain

[`public/CNAME`](public/CNAME) must contain your apex or subdomain (e.g. `brliu.com`). Keep the same DNS/GitHub **Pages custom domain** settings you already use.

## Updating content

| What to change | Where |
| -------------- | ----- |
| Home hero, carousel images, stats | [`src/app/components/Home.tsx`](src/app/components/Home.tsx) |
| About copy & photo | [`src/app/components/About.tsx`](src/app/components/About.tsx) |
| Project list, links, scroll UX | [`src/app/components/Projects.tsx`](src/app/components/Projects.tsx) |
| Contact email, mailto form | [`src/app/components/Contact.tsx`](src/app/components/Contact.tsx) |
| Resume PDF viewer & summary | [`src/app/components/Resume.tsx`](src/app/components/Resume.tsx) + replace PDF at [`src/imports/brandon-resume.pdf`](src/imports/brandon-resume.pdf) |
| Nav / footer links | [`src/app/components/Root.tsx`](src/app/components/Root.tsx) |
| Routes | [`src/app/routes.tsx`](src/app/routes.tsx) |

### Images

Shared photos live in [`src/assets/`](src/assets/) (imported in components so Vite hashes them in production). Replace files there and update imports if you add new filenames.

### Styling / theme

Global CSS entry: [`src/styles/index.css`](src/styles/index.css) (Tailwind + theme tokens in [`src/styles/theme.css`](src/styles/theme.css)).

## Project layout (high level)

```
index.html              # Vite HTML shell + SPA path-restore script
public/
  404.html              # GitHub Pages SPA redirect
  CNAME                 # Custom domain
src/
  main.tsx              # React mount
  app/                  # App shell, routes, pages
  assets/               # Images imported by pages
  imports/              # Resume PDF (and legacy export artifacts)
  styles/               # Tailwind + theme
  test/setup.ts         # Vitest + jest-dom + test globals
```

## Legacy note

The original static HTML/CSS site was replaced by this app. Old multi-page paths are now handled by React Router on a single SPA.
