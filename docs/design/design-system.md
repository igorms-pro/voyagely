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

---

## Color System

### Design Philosophy

Voyagely uses **warm, inviting colors** that evoke adventure, sunset horizons, and the excitement of travel. We avoid cold blues and grays in favor of coral, amber, and warm earth tones.

### Primary Colors - Warm Coral/Orange

**Main Brand Color:** `#f97316` (Sunset Orange)

Light to dark scale:

- 50: `#fff7ed` - Lightest peachy cream
- 100: `#ffedd5` - Soft peach
- 200: `#fed7aa` - Light coral
- 300: `#fdba74` - Warm coral
- 400: `#fb923c` - Vibrant coral
- 500: `#f97316` - **Main brand** (sunset orange)
- 600: `#ea580c` - Hover states (deeper orange)
- 700: `#c2410c` - Active states (burnt orange)
- 800: `#9a3412` - Dark orange
- 900: `#7c2d12` - Deepest orange

### Secondary Colors - Warm Amber/Gold

**Main Secondary:** `#f59e0b` (Warm Amber)

Light to dark scale:

- 50: `#fffbeb`
- 100: `#fef3c7`
- 200: `#fde68a`
- 300: `#fcd34d`
- 400: `#fbbf24`
- 500: `#f59e0b` - **Main amber**
- 600: `#d97706`
- 700: `#b45309`
- 800: `#92400e`
- 900: `#78350f`

### Accent Colors - Warm Rose/Pink

**Main Accent:** `#f43f5e` (Warm Rose)

Light to dark scale:

- 50: `#fff1f2`
- 100: `#ffe4e6`
- 200: `#fecdd3`
- 300: `#fda4af`
- 400: `#fb7185`
- 500: `#f43f5e` - **Main rose**
- 600: `#e11d48`
- 700: `#be123c`
- 800: `#9f1239`
- 900: `#881337`

### Neutral Colors - Warm Grays

Light to dark scale:

- 50: `#fafaf9` - Warm off-white
- 100: `#f5f5f4` - Soft cream
- 200: `#e7e5e4` - Light warm gray
- 300: `#d6d3d1` - Warm gray
- 400: `#a8a29e` - Mid warm gray
- 500: `#78716c` - Neutral warm gray
- 600: `#57534e` - Dark warm gray
- 700: `#44403c` - Darker warm gray
- 800: `#292524` - Deep warm gray
- 900: `#1c1917` - Almost black with warmth

### Semantic Colors

- **Success:** `#22c55e` (Fresh green)
- **Success Light:** `#86efac`
- **Warning:** `#f59e0b` (Warm amber)
- **Warning Light:** `#fcd34d`
- **Error:** `#ef4444` (Warm red)
- **Error Light:** `#fca5a5`
- **Info:** `#f97316` (Warm orange - brand color)
- **Info Light:** `#fdba74`

### Dark Mode Palette

**Primary Colors (adjusted for dark backgrounds)**

- 300: `#fdba74` - Lighter for dark bg
- 400: `#fb923c` - Main in dark mode
- 500: `#f97316` - Hover states
- 600: `#ea580c` - Active states

**Background Colors**

- Main: `#1c1917` - Deep warm charcoal
- Secondary: `#292524` - Card backgrounds (warm gray)
- Tertiary: `#44403c` - Elevated surfaces (lighter warm gray)
- Elevated: `#57534e` - Modals, dropdowns

**Text Colors**

- Primary: `#fafaf9` - Warm white
- Secondary: `#e7e5e4` - Soft warm gray
- Tertiary: `#d6d3d1` - Muted warm gray
- Disabled: `#a8a29e` - Disabled text

**Border Colors**

- Light: `#44403c` - Subtle borders
- Medium: `#57534e` - Default borders
- Heavy: `#78716c` - Emphasized borders

### Color Usage Guidelines

#### Primary (Warm Orange/Coral)

- **Use for:** Main CTAs, primary buttons, links, active states, brand elements
- **Pairs with:** Neutral backgrounds, white text
- **Emotion:** Energy, adventure, excitement, sunset

#### Secondary (Warm Amber/Gold)

- **Use for:** Secondary buttons, highlights, badges, accents
- **Pairs with:** Primary colors, neutral backgrounds
- **Emotion:** Warmth, optimism, value

#### Accent (Warm Rose/Pink)

- **Use for:** Special highlights, favorites, love/like actions, featured content
- **Pairs with:** Primary and neutral colors
- **Emotion:** Passion, connection, joy

#### Neutral (Warm Grays)

- **Use for:** Text, backgrounds, borders, shadows
- **Pairs with:** All colors
- **Emotion:** Calm, sophisticated, grounded

### Gradients

**Hero Gradients:**

- Sunset: Orange → Coral → Amber
- Warm: Rose → Orange → Amber
- Adventure: Deep Orange → Orange → Coral

**Card Gradients (Subtle):**

- Light: Peachy cream → White
- Dark: Deep warm gray → Warm charcoal

**Overlay Gradients:**

- Transparent → Dark warm gray (80% opacity)

---

## Typography

### Font Families

- **Primary:** System font stack (Apple, Windows, Android native fonts)
- **Monospace:** SF Mono, Monaco, Cascadia Code, Roboto Mono

### Type Scale

| Size       | Font Size | Line Height | Use Case            |
| ---------- | --------- | ----------- | ------------------- |
| Display    | 64px      | 1.2         | Hero headlines      |
| H1         | 48px      | 1.25        | Page titles         |
| H2         | 36px      | 1.3         | Section headers     |
| H3         | 30px      | 1.35        | Subsection headers  |
| H4         | 24px      | 1.4         | Card titles         |
| H5         | 20px      | 1.5         | Small headers       |
| Body Large | 18px      | 1.6         | Important body text |
| Body       | 16px      | 1.6         | Default body text   |
| Body Small | 14px      | 1.5         | Secondary text      |
| Caption    | 12px      | 1.4         | Labels, metadata    |

### Font Weights

- **Light:** 300
- **Regular:** 400 (default)
- **Medium:** 500
- **Semibold:** 600
- **Bold:** 700

---

## Spacing System

Based on 4px base unit.

| Token | Value | Use Case             |
| ----- | ----- | -------------------- |
| xs    | 4px   | Tight spacing, icons |
| sm    | 8px   | Related elements     |
| md    | 16px  | Default spacing      |
| lg    | 24px  | Section spacing      |
| xl    | 32px  | Major sections       |
| 2xl   | 48px  | Page sections        |
| 3xl   | 64px  | Hero spacing         |

---

## Border Radius

| Size | Value  | Use Case                 |
| ---- | ------ | ------------------------ |
| none | 0      | No rounding              |
| sm   | 4px    | Small elements           |
| md   | 8px    | Default (buttons, cards) |
| lg   | 12px   | Large cards              |
| xl   | 16px   | Modals, sheets           |
| full | 9999px | Pills, avatars           |

---

## Shadows

| Elevation | Use Case          |
| --------- | ----------------- |
| none      | Flat surfaces     |
| sm        | Subtle depth      |
| md        | Cards, buttons    |
| lg        | Elevated cards    |
| xl        | Modals, dropdowns |

---

## Breakpoints

| Name    | Size       | Use Case                          |
| ------- | ---------- | --------------------------------- |
| mobile  | ≤480px     | Single column, bottom nav         |
| phablet | 481-768px  | Single column with expanded cards |
| tablet  | 769-1024px | Two-column layout                 |
| desktop | ≥1025px    | Multi-panel layout                |

---

## Component Library

### Buttons

#### Primary Button (Warm Orange)

- Background: Orange-500 (#f97316)
- Text: White
- Hover: Orange-600 (#ea580c)
- Active: Orange-700 (#c2410c)
- Shadow: Medium, increases on hover
- Variants: Large, Medium (default), Small
- Hero variant: Gradient from orange to amber

#### Secondary Button (Warm Amber)

- Background: Amber-100 with Amber-300 border
- Text: Amber-900
- Hover: Amber-200
- Outlined variant: Transparent with Orange-500 border

#### Ghost Button

- Background: Transparent
- Text: Orange-600
- Hover: Orange-50 background

#### Accent Button (Warm Rose)

- Background: Rose-500
- Text: White
- Hover: Rose-600
- Used for special actions

### Cards

#### Default Card (Warm)

- Background: White
- Border: Stone-200
- Shadow: Medium
- Padding: 24px

#### Interactive Card

- All default card properties
- Hover: Shadow increases, border becomes Orange-300
- Cursor: Pointer

#### Elevated Card (Warm Gradient)

- Background: Gradient from Orange-50 to White
- Border: Orange-200
- Shadow: Large
- Used for featured content

#### Trip Card (Hero Style)

- Header: Warm gradient (Orange → Amber → Rose)
- Rounded corners: Extra large
- Overflow: Hidden
- Member avatars with gradient backgrounds

### Form Elements

#### Input Fields

- Border: Stone-300
- Focus ring: Orange-500 (2px)
- Focus border: Orange-500
- Background: White
- Text: Stone-900
- Placeholder: Stone-400
- Error state: Red background tint with red border/ring
- Success state: Green background tint with green border/ring

### Badges

#### Status Badges (Warm Tones)

- **Confirmed:** Green-100 background, Green-800 text
- **Planned:** Orange-100 background, Orange-800 text
- **Pending:** Amber-100 background, Amber-800 text
- **Rejected:** Rose-100 background, Rose-800 text
- **Archived:** Stone-100 background, Stone-800 text

#### Source Badges

- **AI:** Gradient Orange-100 to Amber-100, Orange-900 text, robot emoji
- **Human:** Stone-100 background, Stone-800 text, person emoji

#### Count Badge

- Orange-100 background, Orange-800 text
- Rounded corners

### Modals & Sheets

#### Standard Modal

- Backdrop: Black with 50% opacity
- Centered on screen
- Background: White
- Rounded: Extra large
- Shadow: Extra large
- Close on backdrop click (optional)
- Trap focus within modal

#### Full-Screen Modal (Mobile)

- Takes entire screen
- Header with close and action buttons
- Scrollable content
- No backdrop

#### Bottom Sheet (Mobile)

- Slides from bottom
- Drag handle at top
- Swipe down to dismiss
- Semi-transparent backdrop
- Used for quick actions/filters

### Loading States

#### Skeleton Loaders

- Animated pulse effect
- Used for trip cards, activity cards, messages, weather, places
- Background: Neutral-200 with animation

#### Spinner

- Circular spinner with warm orange color
- Size matches context
- Optional gradient variant (orange to amber)

#### Progress Bar

- Horizontal bar with warm orange fill
- Percentage indicator
- Step labels (optional)
- Used for AI generation, uploads, multi-step processes

---

## Navigation Patterns

### Mobile Navigation

- **Bottom Tab Bar:** Primary navigation (Trips, Explore, Chat, Profile)
- **Floating Action Button:** Quick actions (Create Trip) - Warm orange with shadow
- **Drawer Menu:** Secondary navigation (Settings, Help)

### Desktop Navigation

- **Sidebar:** Persistent left navigation
- **Top Bar:** Context actions and user menu
- **Breadcrumbs:** For nested views

---

## Iconography

- **Library:** Lucide React
- **Size:** 16px, 20px, 24px standard
- **Stroke Width:** 2px default
- **Style:** Outlined icons for consistency
- **Color:** Matches text color or warm orange for primary actions

---

## Animation Guidelines

### Transitions

- **Duration:** 150ms (micro), 200ms (default), 300ms (macro)
- **Easing:** ease-in-out for most, ease-out for entrances
- **Properties:** Transform and opacity for performance

### Motion Preferences

- Respect `prefers-reduced-motion` system preference
- Disable animations when user prefers reduced motion

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

- **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators:** Visible focus rings on all interactive elements
- **Keyboard Navigation:** All features accessible via keyboard
- **Screen Readers:** Proper ARIA labels and semantic HTML
- **Touch Targets:** Minimum 44x44px for mobile

### Semantic HTML

Use proper HTML elements:

- Navigation: `<nav>`
- Headers: `<header>`
- Main content: `<main>`
- Articles: `<article>`
- Sections: `<section>`
- Buttons: `<button>` (not `<div>` with click handlers)
- Links: `<a>`
- Forms: `<form>`, `<label>`, `<input>`

---

## Responsive Design Patterns

### Mobile-First Approach

1. Start with mobile layout (≤480px)
2. Enhance for tablet (481-768px)
3. Expand for desktop (≥1025px)

### Progressive Enhancement

- Single column on mobile
- Multi-column on larger screens
- Touch targets on mobile, hover states on desktop
- Bottom navigation on mobile, top navigation on desktop

---

## Dark Mode Implementation

### Theme Toggle

Uses `next-themes` for theme management:

- System preference detection
- Manual toggle
- Persistent storage
- Smooth transitions

### Color Adaptation

- Backgrounds: Light cream → Dark warm charcoal
- Text: Dark warm gray → Warm white
- Borders: Light warm gray → Dark warm gray
- Maintains warm tone in both modes
- All contrast ratios maintained

---

## Component Examples

### Activity Card (Warm Design)

- White background with stone border
- Hover: Shadow increases, border becomes orange
- Header: Title + source badge (AI/Human)
- Content: Description text
- Footer: Time, cost, distance icons
- Right side: Vote buttons (upvote/downvote) with counts

### Trip Card (Hero Style)

- Warm gradient header (Orange → Amber → Rose)
- Title overlaid on gradient
- Status badge (Planned, Locked, etc.)
- Dates and destination with icons
- Member avatars with warm gradient backgrounds
- Hover: Shadow increases

### Chat Message

**Other user:**

- Left-aligned
- Avatar: Warm gradient background (Orange → Amber)
- Name and timestamp
- Message bubble: Stone-100 background
- Rounded except top-left corner

**Current user:**

- Right-aligned
- Avatar: Warm gradient (Orange → Rose)
- Message bubble: Gradient Orange → Amber, white text
- Rounded except top-right corner

### Vote Buttons

**Active (upvoted):**

- Orange-100 background
- Orange-700 text
- Thumb up icon + count
- Shadow

**Inactive:**

- Stone-100 background
- Stone-600 text
- Hover: Stone-200 background

---

## Guidelines Summary

1. **Consistency:** Use design tokens, not arbitrary values
2. **Accessibility:** Test with keyboard and screen readers
3. **Performance:** Use CSS transforms for animations
4. **Mobile-First:** Design for small screens first
5. **Clarity:** Clear hierarchy and obvious actions
6. **Responsive:** Test across all breakpoints
7. **Dark Mode:** Ensure proper contrast in both themes
8. **Warm Colors:** Always prefer warm tones over cold blues/grays

---

**Version:** 2.0 (Warm Colors Update)  
**Last Updated:** January 2025  
**Maintained By:** Design & Engineering Team
