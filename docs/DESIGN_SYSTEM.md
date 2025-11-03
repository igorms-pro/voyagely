# Wanderly Design System

> Mobile-first design system for the Wanderly travel planning platform

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

### Light Mode Palette

```css
/* Primary Colors */
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-500: #3b82f6; /* Main brand blue */
--color-primary-600: #2563eb; /* Hover states */
--color-primary-700: #1d4ed8; /* Active states */
--color-primary-900: #1e3a8a;

/* Neutral Colors */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;

/* Semantic Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

### Dark Mode Palette

```css
/* Primary Colors (same as light, adjusted for contrast) */
--color-primary-400: #60a5fa;
--color-primary-500: #3b82f6;
--color-primary-600: #2563eb;

/* Background Colors */
--color-bg-main: #0f172a; /* Primary background */
--color-bg-secondary: #1e293b; /* Card backgrounds */
--color-bg-tertiary: #334155; /* Elevated surfaces */

/* Text Colors */
--color-text-primary: #f1f5f9;
--color-text-secondary: #cbd5e1;
--color-text-tertiary: #94a3b8;
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

#### Primary Button

```tsx
// Large
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
  Primary Action
</button>

// Medium (default)
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
  Action
</button>

// Small
<button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">
  Small
</button>
```

#### Secondary Button

```tsx
<button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
  Secondary
</button>
```

#### Ghost Button

```tsx
<button className="px-4 py-2 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition">
  Ghost
</button>
```

### Cards

```tsx
// Default Card
<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-gray-600">Card content...</p>
</div>

// Interactive Card
<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer">
  {/* Hoverable card */}
</div>

// Elevated Card
<div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
  {/* Modal-like card */}
</div>
```

### Forms

#### Input Fields

```tsx
// Default Input
<input
  type="text"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  placeholder="Enter text..."
/>

// Input with Label
<label className="block text-sm font-medium text-gray-700 mb-1">
  Label
</label>
<input
  type="text"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
/>

// Error State
<input
  type="text"
  className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
  aria-invalid="true"
/>
<span className="mt-1 text-sm text-red-600">Error message</span>
```

### Badges

```tsx
// Status Badge
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
  Accepted
</span>

// Count Badge
<span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-800">
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

// Spinner
<div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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

### Activity Card

```tsx
<div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition">
  <div className="flex items-start justify-between">
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 mb-1">Activity Title</h4>
      <p className="text-sm text-gray-600 mb-2">Activity description...</p>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">9:00 AM</span>
        <span className="text-xs text-gray-500">•</span>
        <span className="text-xs text-gray-500">$25</span>
      </div>
    </div>
    <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg">{/* Vote buttons */}</button>
  </div>
</div>
```

### Chat Message

```tsx
<div className="flex items-start gap-3 mb-4">
  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
    JD
  </div>
  <div className="flex-1">
    <div className="flex items-baseline gap-2 mb-1">
      <span className="font-semibold text-gray-900">John Doe</span>
      <span className="text-xs text-gray-500">2:30 PM</span>
    </div>
    <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-900">Message content here...</div>
  </div>
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
