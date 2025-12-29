# Voyagely

AI-powered collaborative travel planning platform built with React, TypeScript, and Vite.

> **🎨 This is a complete SaaS template** with i18n, dark/light theme, testing infrastructure, monitoring, and all developer tooling pre-configured. Clone and start building immediately!

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Edit .env with your API keys
# Required: VITE_OPENAI_API_KEY, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
```

### Development

```bash
# Start dev server
pnpm dev

# Run in different modes
pnpm dev -- --port 3000
```

### Building

```bash
# Production build
pnpm build

# Production build with env flag
pnpm build:prod
```

## 📜 Available Scripts

| Script              | Description                       |
| ------------------- | --------------------------------- |
| `pnpm dev`          | Start development server          |
| `pnpm build`        | Build for production              |
| `pnpm preview`      | Preview production build          |
| `pnpm lint`         | Run ESLint                        |
| `pnpm format`       | Format code with Prettier         |
| `pnpm format:check` | Check code formatting             |
| `pnpm type-check`   | Run TypeScript type check         |
| `pnpm test`         | Run tests in watch mode           |
| `pnpm test:run`     | Run tests once                    |
| `pnpm coverage`     | Generate test coverage            |
| `pnpm e2e`          | Run Playwright E2E tests          |
| `pnpm e2e:headed`   | Run E2E tests in headed mode      |
| `pnpm check`        | Run lint + type-check + tests     |
| `pnpm prepush`      | Run coverage + E2E (for pre-push) |

## 🧪 Testing

### Unit Tests (Vitest)

```bash
# Watch mode
pnpm test

# Run once
pnpm test:run

# With coverage
pnpm coverage
```

### E2E Tests (Playwright)

```bash
# Run headless
pnpm e2e

# Run with browser
pnpm e2e:headed

# View report
pnpm e2e:report
```

## 🌍 Internationalization (i18n)

Voyagely supports multiple languages using `i18next` and `react-i18next`:

- English (en) - Default
- French (fr)
- Spanish (es)
- Portuguese (pt, pt-BR)
- Japanese (ja)
- Chinese (zh)
- German (de)
- Italian (it)
- Russian (ru)

### Usage in Components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('common.welcome')}</h1>;
}
```

### Adding Translations

1. Add translations to `src/lib/locales/[lang].json`
2. Import in `src/lib/i18n.ts`
3. Add to `supportedLngs` array

### Expo Compatibility

✅ **Fully compatible with Expo for web**. For React Native, you'd need:

- `i18next-react-native` (instead of browser detector)
- AsyncStorage for language persistence
- Native language detection

Current setup uses browser-based detection perfect for Vite React web apps.

## 🏗️ Project Structure

```
voyagely/
├── src/
│   ├── components/       # React components
│   ├── contexts/         # React contexts (PostHog, etc.)
│   ├── hooks/            # Custom hooks (usePostHog, useErrorTracking, etc.)
│   ├── lib/              # Utilities & services
│   │   ├── locales/      # i18n translation files
│   │   ├── i18n.ts       # i18n configuration
│   │   ├── analytics.ts  # PostHog analytics utilities
│   │   ├── errorHandling.ts # Sentry error handling
│   │   ├── sentry.ts     # Sentry initialization
│   │   └── posthog.ts    # PostHog initialization
│   ├── pages/            # Route pages
│   ├── test/             # Test setup
│   └── main.tsx          # App entry
├── e2e/                  # Playwright E2E tests
├── docs/                 # Documentation
└── .github/workflows/    # CI/CD workflows
```

## 📊 Monitoring & Analytics

### Sentry (Error Tracking)

Sentry automatically captures:

- JavaScript errors and exceptions
- Unhandled promise rejections
- Network status changes (offline/online)
- React component errors (via ErrorBoundary)

**Usage:**

```tsx
import { useErrorTracking } from './hooks/useErrorTracking';

function MyComponent() {
  const { captureException, captureTripError } = useErrorTracking();

  const handleError = (error: Error) => {
    captureException(error, { component: 'MyComponent' });
  };
}
```

### PostHog (Analytics & Feature Flags)

PostHog tracks:

- User actions and navigation
- Trip and itinerary events
- Feature usage
- Custom events

**Usage:**

```tsx
import { usePostHog } from './hooks/usePostHog';

function MyComponent() {
  const { trackTripCreated, isFeatureEnabled } = usePostHog();

  const handleTripCreate = () => {
    trackTripCreated(tripId, destination);
  };

  const showBetaFeature = isFeatureEnabled('beta-feature');
}
```

## 🔧 Code Quality

### Pre-commit Hooks (Husky)

- Runs ESLint with auto-fix
- Formats code with Prettier
- Runs related unit tests

### Pre-push Hooks

- TypeScript type checking
- Full test suite

### CI/CD (GitHub Actions)

- ✅ Lint & Type Check
- ✅ Unit Tests (with coverage)
- ✅ E2E Tests (Playwright)
- ✅ Build Verification

## 📦 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **State**: Zustand + React Query
- **Routing**: React Router v6
- **i18n**: i18next + react-i18next
- **Monitoring**: Sentry (error tracking) + PostHog (analytics & feature flags)
- **Testing**: Vitest + Testing Library + Playwright
- **Code Quality**: ESLint + Prettier + Husky

## 🔐 Environment Variables

See `.env.example` for all required variables. Key ones:

- `VITE_OPENAI_API_KEY` - Required for AI itinerary generation
- `VITE_SUPABASE_URL` - Required for backend/auth
- `VITE_SUPABASE_ANON_KEY` - Required for backend/auth
- `VITE_SENTRY_DSN` - Optional: Sentry error tracking DSN
- `VITE_POSTHOG_KEY` - Optional: PostHog analytics API key
- `VITE_POSTHOG_HOST` - Optional: PostHog host (defaults to US)

## 📚 Documentation

- [Engineering Playbook](./docs/ENGINEERING.md) - CTO-level guidelines
- [Architecture Design](./docs/architecture_design.md) - System architecture
- [Executive Summary](./docs/EXECUTIVE_SUMMARY.md) - Product vision and business overview
- [Design System](./docs/design/design-system.md) - UI/UX guidelines and component library

## 🤝 Contributing

1. Follow the pre-commit hooks (they'll auto-run)
2. Ensure `pnpm check` passes before pushing
3. Write tests for new features
4. Update translations if adding new UI strings

## 📄 License

Private - All rights reserved

---

Built with ❤️ for travelers everywhere

---

## 🎨 Complete SaaS Template Features

### 🌍 Internationalization (i18n) - Ready to Use

✅ **Fully configured** with 10 languages out of the box:

- English (en), French (fr), Spanish (es), Portuguese (pt, pt-BR)
- Japanese (ja), Chinese (zh), German (de), Italian (it), Russian (ru)

✅ **Features:**

- Auto-detection from browser/OS
- Language persistence in localStorage
- `useLanguage` hook for easy management
- Language switcher component ready to integrate
- All translation files structured and ready

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('common.welcome')}</h1>;
}
```

### 🎨 Dark/Light Theme - Fully Integrated

✅ **next-themes** configured and ready:

- Toggle between dark and light modes
- System preference detection
- Theme persistence
- Smooth transitions

```tsx
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle</button>;
}
```

### 🧪 Testing Infrastructure - Complete Setup

✅ **Unit Tests (Vitest)**

- jsdom environment configured
- Testing Library for React components
- Coverage thresholds (70% required)
- Example tests included

✅ **E2E Tests (Playwright)**

- Multi-browser support (Chrome, Firefox, Safari)
- Automatic dev server startup
- Example smoke tests
- HTML reports and artifacts

✅ **Test Scripts:**

```bash
pnpm test          # Watch mode
pnpm test:run      # Run once
pnpm coverage      # Coverage report
pnpm e2e           # E2E tests
```

### 📊 Monitoring & Analytics - Production Ready

✅ **Sentry Error Tracking:**

- Session replay (10% sample, 100% on errors)
- Browser tracing for performance
- React ErrorBoundary integration
- Custom error tracking hooks
- User context and breadcrumbs

✅ **PostHog Analytics:**

- Event tracking utilities
- Feature flags support
- User identification
- Custom hooks for easy usage

### 🔧 Developer Experience - Fully Configured

✅ **Code Quality:**

- ESLint with React rules
- Prettier with auto-formatting
- TypeScript strict mode
- Pre-commit hooks (lint, format, related tests)
- Pre-push hooks (type-check, full test suite)

✅ **CI/CD Pipeline:**

- GitHub Actions workflow
- Automated linting & type checking
- Automated unit tests with coverage
- Automated E2E tests
- Build verification

✅ **Git Hooks (Husky):**

- Pre-commit: ESLint + Prettier + related tests
- Pre-push: TypeScript check + full test suite
- lint-staged for optimized runs

### 🛠️ Development Stack

✅ **Core:**

- Vite 6 (fast HMR)
- React 18
- TypeScript (strict mode)
- Tailwind CSS
- React Router v6

✅ **State Management:**

- Zustand (global state)
- React Query (server state)

✅ **UI Components:**

- Radix UI primitives
- shadcn/ui compatible
- Tailwind-based design system

### 🚀 Ready to Clone & Use

This template includes **everything** configured:

- ✅ i18n with 10 languages
- ✅ Dark/light theme
- ✅ Complete testing (unit + E2E)
- ✅ Error tracking (Sentry)
- ✅ Analytics (PostHog)
- ✅ CI/CD pipeline
- ✅ Code quality tools
- ✅ Git hooks

**No configuration needed - just clone and start building features!**

See [ISSUES.md](./ISSUES.md) for complete roadmap.
