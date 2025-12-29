# Voyagely Design System

> Mobile-first design system for the Voyagely travel planning platform

## Design Principles

### 1. Mobile-First

- Design for mobile constraints first, enhance for larger screens
- Touch-friendly targets (minimum 44x44px)
- Progressive disclosure to avoid overwhelming users
- Single-column layouts on mobile, multi-panel on desktop

### 2. Clarity & Simplicity

- Clear visual hierarchy
- Minimal cognitive load
- Intuitive navigation patterns
- Fast, obvious actions

### 3. Accessibility First

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Respect user preferences (reduced motion, high contrast)

### 4. Performance

- Optimistic UI updates
- Skeleton loading states
- Lazy loading for images
- Virtualized lists for performance

## Color System

### Design Philosophy

Voyagely uses **warm, inviting colors** that evoke adventure, sunset horizons, and the excitement of travel. We avoid cold blues and grays in favor of coral, amber, and warm earth tones.

### Light Mode Palette

```css
/* Primary Colors - Warm Coral/Orange */
--color-primary-50: #fff7ed; /* Lightest peachy cream */
--color-primary-100: #ffedd5; /* Soft peach */
--color-primary-200: #fed7aa; /* Light coral */
--color-primary-300: #fdba74; /* Warm coral */
--color-primary-400: #fb923c; /* Vibrant coral */
--color-primary-500: #f97316; /* Main brand orange - sunset */
--color-primary-600: #ea580c; /* Hover states - deeper orange */
--color-primary-700: #c2410c; /* Active states - burnt orange */
--color-primary-800: #9a3412; /* Dark orange */
--color-primary-900: #7c2d12; /* Deepest orange */

/* Secondary Colors - Warm Amber/Gold */
--color-secondary-50: #fffbeb;
--color-secondary-100: #fef3c7;
--color-secondary-200: #fde68a;
--color-secondary-300: #fcd34d;
--color-secondary-400: #fbbf24;
--color-secondary-500: #f59e0b; /* Warm amber */
--color-secondary-600: #d97706;
--color-secondary-700: #b45309;
--color-secondary-800: #92400e;
--color-secondary-900: #78350f;

/* Accent Colors - Warm Rose/Pink */
--color-accent-50: #fff1f2;
--color-accent-100: #ffe4e6;
--color-accent-200: #fecdd3;
--color-accent-300: #fda4af;
--color-accent-400: #fb7185;
--color-accent-500: #f43f5e; /* Warm rose */
--color-accent-600: #e11d48;
--color-accent-700: #be123c;
--color-accent-800: #9f1239;
--color-accent-900: #881337;

/* Neutral Colors - Warm Grays */
--color-neutral-50: #fafaf9; /* Warm off-white */
--color-neutral-100: #f5f5f4; /* Soft cream */
--color-neutral-200: #e7e5e4; /* Light warm gray */
--color-neutral-300: #d6d3d1; /* Warm gray */
--color-neutral-400: #a8a29e; /* Mid warm gray */
--color-neutral-500: #78716c; /* Neutral warm gray */
--color-neutral-600: #57534e; /* Dark warm gray */
--color-neutral-700: #44403c; /* Darker warm gray */
--color-neutral-800: #292524; /* Deep warm gray */
--color-neutral-900: #1c1917; /* Almost black with warmth */

/* Semantic Colors - Warm Tones */
--color-success: #22c55e; /* Fresh green (kept vibrant) */
--color-success-light: #86efac;
--color-warning: #f59e0b; /* Warm amber */
--color-warning-light: #fcd34d;
--color-error: #ef4444; /* Warm red */
--color-error-light: #fca5a5;
--color-info: #f97316; /* Warm orange (brand color) */
--color-info-light: #fdba74;
```

### Dark Mode Palette

```css
/* Primary Colors - Glowing Warm Tones */
--color-primary-300: #fdba74; /* Lighter for dark bg */
--color-primary-400: #fb923c; /* Main in dark mode */
--color-primary-500: #f97316; /* Hover states */
--color-primary-600: #ea580c; /* Active states */

/* Background Colors - Warm Dark Tones */
--color-bg-main: #1c1917; /* Deep warm charcoal */
--color-bg-secondary: #292524; /* Card backgrounds - warm gray */
--color-bg-tertiary: #44403c; /* Elevated surfaces - lighter warm gray */
--color-bg-elevated: #57534e; /* Modals, dropdowns */

/* Text Colors - Warm Whites */
--color-text-primary: #fafaf9; /* Warm white */
--color-text-secondary: #e7e5e4; /* Soft warm gray */
--color-text-tertiary: #d6d3d1; /* Muted warm gray */
--color-text-disabled: #a8a29e; /* Disabled text */

/* Border Colors */
--color-border-light: #44403c; /* Subtle borders */
--color-border-medium: #57534e; /* Default borders */
--color-border-heavy: #78716c; /* Emphasized borders */
```

### Color Usage Guidelines

#### Primary (Warm Orange/Coral)

- **Use for**: Main CTAs, primary buttons, links, active states, brand elements
- **Pairs with**: Neutral backgrounds, white text
- **Emotion**: Energy, adventure, excitement, sunset

#### Secondary (Warm Amber/Gold)

- **Use for**: Secondary buttons, highlights, badges, accents
- **Pairs with**: Primary colors, neutral backgrounds
- **Emotion**: Warmth, optimism, value

#### Accent (Warm Rose/Pink)

- **Use for**: Special highlights, favorites, love/like actions, featured content
- **Pairs with**: Primary and neutral colors
- **Emotion**: Passion, connection, joy

#### Neutral (Warm Grays)

- **Use for**: Text, backgrounds, borders, shadows
- **Pairs with**: All colors
- **Emotion**: Calm, sophisticated, grounded

### Color Combinations

```css
/* Hero Gradients */
--gradient-sunset: linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%);
--gradient-warm: linear-gradient(135deg, #f43f5e 0%, #f97316 50%, #fbbf24 100%);
--gradient-adventure: linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%);

/* Card Gradients (Subtle) */
--gradient-card-light: linear-gradient(180deg, #fff7ed 0%, #ffffff 100%);
--gradient-card-dark: linear-gradient(180deg, #292524 0%, #1c1917 100%);

/* Overlay Gradients */
--gradient-overlay: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(28, 25, 23, 0.8) 100%);
```

## Typography

### Font Families

- **Primary**: System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- **Monospace**: `"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace`

### Type Scale

| Size       | Font Size       | Line Height | Use Case            |
| ---------- | --------------- | ----------- | ------------------- |
| Display    | 4rem (64px)     | 1.2         | Hero headlines      |
| H1         | 3rem (48px)     | 1.25        | Page titles         |
| H2         | 2.25rem (36px)  | 1.3         | Section headers     |
| H3         | 1.875rem (30px) | 1.35        | Subsection headers  |
| H4         | 1.5rem (24px)   | 1.4         | Card titles         |
| H5         | 1.25rem (20px)  | 1.5         | Small headers       |
| Body Large | 1.125rem (18px) | 1.6         | Important body text |
| Body       | 1rem (16px)     | 1.6         | Default body text   |
| Body Small | 0.875rem (14px) | 1.5         | Secondary text      |
| Caption    | 0.75rem (12px)  | 1.4         | Labels, metadata    |

### Font Weights

- **Light**: 300
- **Regular**: 400 (default)
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

## Spacing System

Based on 4px base unit (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128)

| Token | Value | Use Case             |
| ----- | ----- | -------------------- |
| xs    | 4px   | Tight spacing, icons |
| sm    | 8px   | Related elements     |
| md    | 16px  | Default spacing      |
| lg    | 24px  | Section spacing      |
| xl    | 32px  | Major sections       |
| 2xl   | 48px  | Page sections        |
| 3xl   | 64px  | Hero spacing         |

## Border Radius

| Size | Value  | Use Case                 |
| ---- | ------ | ------------------------ |
| none | 0      | No rounding              |
| sm   | 4px    | Small elements           |
| md   | 8px    | Default (buttons, cards) |
| lg   | 12px   | Large cards              |
| xl   | 16px   | Modals, sheets           |
| full | 9999px | Pills, avatars           |

## Shadows

| Elevation | Shadow                       | Use Case          |
| --------- | ---------------------------- | ----------------- |
| none      | none                         | Flat surfaces     |
| sm        | 0 1px 2px rgba(0,0,0,0.05)   | Subtle depth      |
| md        | 0 4px 6px rgba(0,0,0,0.1)    | Cards, buttons    |
| lg        | 0 10px 15px rgba(0,0,0,0.1)  | Elevated cards    |
| xl        | 0 20px 25px rgba(0,0,0,0.15) | Modals, dropdowns |

## Breakpoints

| Name    | Size       | Use Case                          |
| ------- | ---------- | --------------------------------- |
| mobile  | ≤480px     | Single column, bottom nav         |
| phablet | 481-768px  | Single column with expanded cards |
| tablet  | 769-1024px | Two-column layout                 |
| desktop | ≥1025px    | Multi-panel layout                |

## Component Library

### Buttons

#### Primary Button (Warm Orange)

```tsx
// Large
<button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 active:bg-orange-700 transition shadow-md hover:shadow-lg">
  Primary Action
</button>

// Medium (default)
<button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">
  Action
</button>

// Small
<button className="px-3 py-1.5 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600 transition">
  Small
</button>

// With gradient (hero CTAs)
<button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition shadow-lg">
  Get Started
</button>
```

#### Secondary Button (Warm Amber)

```tsx
<button className="px-4 py-2 bg-amber-100 border border-amber-300 text-amber-900 rounded-lg font-medium hover:bg-amber-200 transition">
  Secondary
</button>

// Outlined variant
<button className="px-4 py-2 bg-transparent border-2 border-orange-500 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition">
  Outlined
</button>
```

#### Ghost Button

```tsx
<button className="px-4 py-2 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition">
  Ghost
</button>
```

#### Accent Button (Warm Rose)

```tsx
<button className="px-4 py-2 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition">
  Special Action
</button>
```

### Cards

```tsx
// Default Card (Warm)
<div className="bg-white rounded-lg shadow-md p-6 border border-stone-200">
  <h3 className="text-lg font-semibold text-stone-900 mb-2">Card Title</h3>
  <p className="text-stone-600">Card content...</p>
</div>

// Interactive Card (Warm Hover)
<div className="bg-white rounded-lg shadow-md p-6 border border-stone-200 hover:shadow-lg hover:border-orange-300 transition cursor-pointer">
  {/* Hoverable card with warm accent */}
</div>

// Elevated Card (Warm Gradient)
<div className="bg-gradient-to-br from-orange-50 to-white rounded-lg shadow-lg p-6 border border-orange-200">
  {/* Featured card with warm gradient */}
</div>

// Trip Card (Hero Style)
<div className="bg-white rounded-xl shadow-md overflow-hidden border border-stone-200 hover:shadow-xl transition">
  <div className="h-32 bg-gradient-to-r from-orange-400 to-amber-400"></div>
  <div className="p-4">
    <h3 className="font-semibold text-stone-900">Trip Title</h3>
    <p className="text-stone-600 text-sm">Details...</p>
  </div>
</div>
```

### Forms

#### Input Fields

```tsx
// Default Input (Warm Focus)
<input
  type="text"
  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-stone-900 placeholder-stone-400"
  placeholder="Enter text..."
/>

// Input with Label
<label className="block text-sm font-medium text-stone-700 mb-1">
  Label
</label>
<input
  type="text"
  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
/>

// Error State (Warm Red)
<input
  type="text"
  className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-red-50"
  aria-invalid="true"
/>
<span className="mt-1 text-sm text-red-600">Error message</span>

// Success State (Fresh Green)
<input
  type="text"
  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-green-50"
/>
<span className="mt-1 text-sm text-green-600">Success message</span>
```

### Badges

```tsx
// Status Badges (Warm Tones)
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
  Confirmed
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
  Planned
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
  Pending
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
  Rejected
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-800">
  Archived
</span>

// Source Badges
<span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-900">
  🤖 AI
</span>

<span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-800">
  👤 Human
</span>

// Count Badge
<span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-orange-100 text-orange-800">
  3
</span>
```

### Modals & Sheets

```tsx
// Modal Overlay
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
    {/* Modal content */}
  </div>
</div>

// Bottom Sheet (Mobile)
<div className="fixed inset-x-0 bottom-0 bg-white rounded-t-xl shadow-xl z-50">
  {/* Sheet content */}
</div>
```

### Loading States

```tsx
// Skeleton
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>

// Spinner (Warm Orange)
<div className="inline-block w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

// Spinner with gradient (optional)
<div className="inline-block w-6 h-6 border-2 border-transparent border-t-orange-500 border-r-amber-500 rounded-full animate-spin"></div>
```

## Navigation Patterns

### Mobile Navigation

- **Bottom Tab Bar**: Primary navigation (Trips, Explore, Chat, Profile)
- **Floating Action Button**: Quick actions (Create Trip)
- **Drawer Menu**: Secondary navigation (Settings, Help)

### Desktop Navigation

- **Sidebar**: Persistent left navigation
- **Top Bar**: Context actions and user menu
- **Breadcrumbs**: For nested views

## Iconography

- **Library**: Lucide React
- **Size**: Standard 16px, 20px, 24px
- **Stroke Width**: 2px default
- **Style**: Outlined icons for consistency

## Animation Guidelines

### Transitions

- **Duration**: 150ms (micro), 200ms (default), 300ms (macro)
- **Easing**: `ease-in-out` for most, `ease-out` for entrances
- **Properties**: Transform and opacity for performance

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Accessibility Standards

### WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Keyboard Navigation**: All features accessible via keyboard
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Touch Targets**: Minimum 44x44px for mobile

### Semantic HTML

```tsx
// Use proper HTML elements
<nav>, <header>, <main>, <article>, <section>, <aside>, <footer>
<button>, <a>, <input>, <label>, <form>
```

## Responsive Design Patterns

### Mobile-First Approach

1. Start with mobile layout (≤480px)
2. Enhance for tablet (481-768px)
3. Expand for desktop (≥1025px)

### Progressive Enhancement

```tsx
// Mobile: Single column
<div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

## Design Tokens (Implementation)

### Tailwind Configuration

All design tokens are configured in `tailwind.config.js`:

- Colors
- Spacing scale
- Typography
- Border radius
- Shadows
- Breakpoints

### CSS Variables (for theming)

```css
:root {
  --color-primary: #3b82f6;
  --spacing-unit: 4px;
  /* ... */
}
```

## Component Examples

### Activity Card (Warm Design)

```tsx
<div className="bg-white rounded-lg shadow-md p-4 border border-stone-200 hover:shadow-lg hover:border-orange-200 transition">
  <div className="flex items-start justify-between">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="font-semibold text-stone-900">Belém Tower Visit</h4>
        <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-900">
          🤖 AI
        </span>
      </div>
      <p className="text-sm text-stone-600 mb-3">Explore the iconic 16th-century fortress...</p>
      <div className="flex items-center gap-3 text-xs text-stone-500">
        <span className="flex items-center gap-1">🕐 9:00 AM</span>
        <span>•</span>
        <span className="flex items-center gap-1">💰 $25</span>
        <span>•</span>
        <span className="flex items-center gap-1">📍 2.3 km</span>
      </div>
    </div>
    <div className="ml-4 flex flex-col gap-1">
      <button className="p-2 hover:bg-orange-50 rounded-lg text-orange-600 transition">
        👍 <span className="text-xs font-semibold">5</span>
      </button>
      <button className="p-2 hover:bg-stone-100 rounded-lg text-stone-600 transition">
        👎 <span className="text-xs font-semibold">1</span>
      </button>
    </div>
  </div>
</div>
```

### Trip Card (Hero Style)

```tsx
<div className="bg-white rounded-xl shadow-md overflow-hidden border border-stone-200 hover:shadow-xl transition cursor-pointer">
  {/* Warm gradient header */}
  <div className="h-32 bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 relative">
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    <div className="absolute bottom-2 left-4 text-white">
      <h3 className="font-bold text-lg">Lisbon Adventure</h3>
    </div>
  </div>

  {/* Content */}
  <div className="p-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
        Planned
      </span>
      <span className="text-xs text-stone-500">Mar 15-20, 2025</span>
    </div>

    <p className="text-sm text-stone-600 mb-3">📍 Lisbon, Portugal</p>

    {/* Member avatars */}
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 border-2 border-white"></div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 border-2 border-white"></div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 border-2 border-white"></div>
      </div>
      <span className="text-xs text-stone-500">+2 more</span>
    </div>
  </div>
</div>
```

### Chat Message (Warm Design)

```tsx
{
  /* Other user's message */
}
<div className="flex items-start gap-3 mb-4">
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
    JD
  </div>
  <div className="flex-1">
    <div className="flex items-baseline gap-2 mb-1">
      <span className="font-semibold text-stone-900">John Doe</span>
      <span className="text-xs text-stone-500">2:30 PM</span>
    </div>
    <div className="bg-stone-100 rounded-lg rounded-tl-none px-4 py-2 text-stone-900">
      What about visiting the museum tomorrow?
    </div>
  </div>
</div>;

{
  /* Current user's message */
}
<div className="flex items-start gap-3 mb-4 flex-row-reverse">
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
    ME
  </div>
  <div className="flex-1 flex flex-col items-end">
    <div className="flex items-baseline gap-2 mb-1 flex-row-reverse">
      <span className="font-semibold text-stone-900">You</span>
      <span className="text-xs text-stone-500">2:31 PM</span>
    </div>
    <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-lg rounded-tr-none px-4 py-2 shadow-sm">
      Great idea! Let's vote on it 👍
    </div>
  </div>
</div>;
```

### Vote Buttons (Warm Interactive)

```tsx
<div className="flex items-center gap-2">
  {/* Upvote - Active */}
  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 transition shadow-sm">
    <span>👍</span>
    <span className="text-sm font-semibold">12</span>
  </button>

  {/* Downvote - Inactive */}
  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 transition">
    <span>👎</span>
    <span className="text-sm font-semibold">3</span>
  </button>
</div>
```

## Dark Mode Implementation

### Theme Toggle

Uses `next-themes` for theme management:

- System preference detection
- Manual toggle
- Persistent storage
- Smooth transitions

### Color Adaptation

- Backgrounds: Light gray → Dark slate
- Text: Dark gray → Light gray
- Borders: Light gray → Dark gray
- Maintains contrast ratios

## Guidelines Summary

1. **Consistency**: Use design tokens, not arbitrary values
2. **Accessibility**: Test with keyboard and screen readers
3. **Performance**: Use CSS transforms for animations
4. **Mobile-First**: Design for small screens first
5. **Clarity**: Clear hierarchy and obvious actions
6. **Responsive**: Test across all breakpoints
7. **Dark Mode**: Ensure proper contrast in both themes

---

**Version**: 1.0  
**Last Updated**: 2025-01-XX  
**Maintained By**: Design & Engineering Team
