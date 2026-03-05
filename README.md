# ClipCut

A free, open-source, cross-platform video editor built for content creators in Botswana and Africa.

ClipCut is a Final Year Project at the **University of Botswana**, Department of Computer Science. It provides a free alternative to subscription-based editing tools like CapCut and Adobe Premiere, with first-class Linux support.

## Features

- **Timeline-based editor** — drag-and-drop media import, clip cutting, trimming, splitting, reordering
- **Text overlays** — customizable fonts, sizes, colours, positioning
- **Transition effects** — fade, dissolve, slide, wipe (12 transition types)
- **Audio management** — volume control, background music mixing, audio extraction, normalization
- **Video export** — MP4/WebM at 480p, 720p, 1080p via FFmpeg WASM
- **Video effects** — brightness/contrast, saturation, blur, sharpen, speed change, rotation, flip, crop
- **User authentication** — Supabase auth with email/password, Google OAuth, 2FA (TOTP)
- **Cloud project storage** — save/load projects from Supabase Storage
- **Community templates** — browse and use shared video templates
- **PWA support** — installable as a Progressive Web App with offline capabilities
- **Keyboard shortcuts** — comprehensive shortcuts for efficient editing (see [docs/USER_GUIDE.md](docs/USER_GUIDE.md))

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| Routing | React Router DOM 7 |
| Backend/DB | Supabase (PostgreSQL, Auth, Storage) |
| Video Engine | @ffmpeg/ffmpeg 0.12 (WASM) |
| Error Tracking | Sentry |
| Analytics | Google Analytics 4 + Core Web Vitals |
| PWA | vite-plugin-pwa (Workbox) |
| Testing | Vitest 4 + React Testing Library + Playwright |
| Deployment | Vercel |

## Quick Start

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- A **Supabase** project (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/dondie52/clipcut.git
cd clipcut

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Fill in your Supabase credentials in .env (see docs/ENVIRONMENT.md)

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

For detailed installation instructions, see [docs/INSTALLATION.md](docs/INSTALLATION.md).

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `npm run test:e2e:ui` | Run E2E tests with Playwright UI |
| `npm run analyze` | Build with bundle analysis |

## Project Structure

```
clipcut-main/
├── src/
│   ├── components/          # React components
│   │   ├── VideoEditor/     # Editor (14 files: timeline, player, inspector, etc.)
│   │   ├── Dashboard.jsx    # Project dashboard
│   │   ├── Settings.jsx     # User settings + GDPR compliance
│   │   └── ...              # Auth, onboarding, splash screen
│   ├── hooks/               # Custom React hooks (useFFmpeg, useSessionTimeout, etc.)
│   ├── services/            # Business logic (FFmpeg, video/audio ops, effects, GDPR)
│   ├── supabase/            # Auth, client config, context, route guards
│   ├── utils/               # Validation, analytics, error tracking, file upload
│   └── constants/           # Theme, editor, app constants
├── supabase/migrations/     # 7 database migrations
├── tests/e2e/               # Playwright E2E tests
├── docs/                    # Project documentation
└── public/                  # Static assets
```

For full architecture details, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Documentation

| Document | Description |
|----------|-------------|
| [Installation](docs/INSTALLATION.md) | Detailed setup and troubleshooting |
| [Environment Setup](docs/ENVIRONMENT.md) | Environment variables reference |
| [Database Setup](docs/DATABASE.md) | Supabase schema and migrations |
| [Components](docs/COMPONENTS.md) | React component props reference |
| [Services](docs/SERVICES.md) | Service function API reference |
| [Architecture](docs/ARCHITECTURE.md) | System architecture overview |
| [Deployment](docs/DEPLOYMENT.md) | Deployment process |
| [User Guide](docs/USER_GUIDE.md) | How to use ClipCut |

## Environment Variables

All frontend environment variables must be prefixed with `VITE_`.

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Public Supabase anon key |
| `VITE_GA_MEASUREMENT_ID` | No | Google Analytics 4 measurement ID |
| `VITE_SENTRY_DSN` | No | Sentry DSN for error reporting |

See [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md) for the full list.

## Testing

```bash
# Unit tests (162 tests, Vitest + React Testing Library)
npm test

# With coverage
npm run test:coverage

# E2E tests (Playwright — Chromium + Firefox)
npm run test:e2e
```

## Deployment

The app deploys to **Vercel** automatically on push to `main`. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for details.

## Design System

ClipCut uses the **Botswana flag colours** as its design system:

| Colour | Hex | Usage |
|--------|-----|-------|
| Blue | `#75AADB` | Primary accent, buttons, links |
| Black | `#0a0a0a` | Backgrounds |
| White | `#FFFFFF` | Text, icons |
| Dark Gray | `#1a2332` | Cards, panels |

Fonts: **Spline Sans** (UI), **Outfit** (splash screens).

## License

Open source. See [LICENSE](LICENSE) for details.

## Production Planning

- [PRODUCTION_TASKS.md](PRODUCTION_TASKS.md) — granular task list by category
- [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md) — broader production checklist
