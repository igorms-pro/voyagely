# Voyagely Issues & Tasks Tracker

> Goal: Build a complete SaaS travel planning platform with AI-powered itineraries, real-time collaboration, and seamless user experience.

**Last Updated:** January 2025  
**Roadmap Alignment:** [Product & Development Roadmap](../roadmap/product-roadmap.md)

---

## 📋 Status Legend

- 🔴 **Not Started** - Task identified but not begun
- 🟡 **In Progress** - Actively being worked on
- 🟢 **Completed** - Task finished and tested
- ⏸️ **Blocked** - Waiting on dependencies or decisions
- 🔵 **Testing** - In QA or testing phase
- 🟣 **On Hold** - Deferred for later

---

## ✅ Issue #0: Project Initialization & Setup

**Status:** 🟢 **COMPLETED**  
**Priority:** HIGH  
**Phase:** Foundation

### Completed Features

#### Development Environment

- [x] 🟢 Vite + React + TypeScript setup
- [x] 🟢 ESLint configuration with React rules
- [x] 🟢 Prettier configuration with auto-formatting
- [x] 🟢 Tailwind CSS configuration
- [x] 🟢 PostCSS configuration
- [x] 🟢 TypeScript strict mode configuration
- [x] 🟢 Path aliases and module resolution

#### Testing Infrastructure

- [x] 🟢 Vitest setup with jsdom environment
- [x] 🟢 Testing Library for React component tests
- [x] 🟢 Playwright E2E testing setup
- [x] 🟢 Test coverage configuration (70% thresholds)
- [x] 🟢 Example unit tests (utils.test.ts)
- [x] 🟢 Example E2E tests (smoke.spec.ts)
- [x] 🟢 Test setup files and configuration

#### Code Quality & Git Hooks

- [x] 🟢 Husky pre-commit hooks (lint, format, related tests)
- [x] 🟢 Husky pre-push hooks (type-check, full test suite)
- [x] 🟢 lint-staged configuration
- [x] 🟢 Git ignore patterns

#### CI/CD Pipeline

- [x] 🟢 GitHub Actions workflow for CI
- [x] 🟢 Automated linting and type checking
- [x] 🟢 Automated unit tests with coverage
- [x] 🟢 Automated E2E tests with Playwright
- [x] 🟢 Automated build verification
- [x] 🟢 Artifact uploads for coverage and reports

#### Monitoring & Analytics

- [x] 🟢 Sentry error tracking setup
- [x] 🟢 PostHog analytics setup
- [x] 🟢 Error handling utilities
- [x] 🟢 Analytics event tracking utilities
- [x] 🟢 useErrorTracking hook
- [x] 🟢 usePostHog hook
- [x] 🟢 ErrorBoundary with Sentry integration

**Notes:**

- Project is fully configured and ready for MVP development
- All foundational tooling in place
- CI/CD pipeline active

---

## 🎯 PHASE 1: MVP Core – Foundation (Before Screens)

These issues MUST be completed before working on screen-specific features.

---

## 🎯 Issue #1: Database Schema & Backend Setup

**Status:** 🟡 **IN PROGRESS** (needs verification)  
**Priority:** CRITICAL  
**Phase:** Foundation  
**Dependencies:** Issue #0

### Description

Complete database schema, RLS policies, migrations, and all Supabase infrastructure.

### Tasks

#### Database Tables

- [ ] 🟡 **Verify all tables exist and are correct**:
  - [ ] `users` (profiles)
  - [ ] `trips` (with constraints fields: budget, children, preferences, pace)
  - [ ] `trip_members` (with roles: owner, editor, viewer, moderator)
  - [ ] `activities` (with source: human/ai, status, cost, location)
  - [ ] `scenarios` (for day-by-day plans)
  - [ ] `scenario_activities` (link table)
  - [ ] `votes` (for activities and scenarios)
  - [ ] `messages` (chat)
  - [ ] `expenses` (Phase 2, can wait)

#### RLS Policies

- [ ] 🔴 **Review and update ALL RLS policies**:
  - [ ] Users can only see trips they're members of
  - [ ] Trip members policies (CRUD based on role)
  - [ ] Activities policies (anyone can create during planning, admins only after finalized)
  - [ ] Scenarios policies
  - [ ] Votes policies (anyone can vote)
  - [ ] Messages policies (trip members only)
  - [ ] Expenses policies (Phase 2)

#### Migrations

- [ ] 🟡 **Verify all migrations are applied**:
  - [x] 🟢 001_initial_schema.sql
  - [x] 🟢 002_rls_policies.sql
  - [x] 🟢 003_enable_realtime.sql
  - [ ] 🔴 004+ any new migrations for missing fields

#### Real-time Setup

- [x] 🟢 Supabase Realtime enabled
- [ ] 🔴 Verify realtime works for all tables
- [ ] 🔴 Test real-time subscriptions

#### TypeScript Types

- [ ] 🟡 **Regenerate types from database**:
  - [ ] Run `supabase gen types typescript`
  - [ ] Update `src/lib/types/database.types.ts`
  - [ ] Verify all types are correct

### Acceptance Criteria

- [ ] All tables exist with correct schema
- [ ] All RLS policies are correct and tested
- [ ] Real-time works for all tables
- [ ] TypeScript types are up-to-date
- [ ] Can create/read/update/delete all entities with proper permissions

---

## 🎯 Issue #2: Internationalization (i18n) Complete Setup

**Status:** 🟡 **PARTIALLY DONE** (needs completion)  
**Priority:** HIGH  
**Phase:** Foundation  
**Dependencies:** Issue #0

### Description

Ensure ALL text in the application is internationalized. No hardcoded strings.

### Tasks

#### i18n Infrastructure

- [x] 🟢 i18next + react-i18next setup
- [x] 🟢 Browser language detector
- [x] 🟢 21 languages configured
- [x] 🟢 useLanguage hook
- [x] 🟢 Language switcher component

#### Translation Files Audit

- [ ] 🔴 **Audit ALL components for hardcoded text**:
  - [ ] LandingPage - verify all text uses `t()`
  - [ ] LoginPage - verify all text uses `t()`
  - [ ] SignupPage - verify all text uses `t()`
  - [ ] DashboardPage - verify all text uses `t()`
  - [ ] TripDetailPage - verify all text uses `t()`
  - [ ] All modals and components
  - [ ] Error messages
  - [ ] Toast notifications
  - [ ] Form validation messages

#### Translation Keys Organization

- [ ] 🔴 **Organize translation keys by feature**:
  - [ ] `landing.*` - Landing page
  - [ ] `auth.*` - Auth screens (login, signup)
  - [ ] `dashboard.*` - Dashboard screen
  - [ ] `trip.*` - Trip detail screen
  - [ ] `activities.*` - Activities
  - [ ] `scenarios.*` - Scenarios
  - [ ] `voting.*` - Voting system
  - [ ] `chat.*` - Chat
  - [ ] `constraints.*` - Trip constraints
  - [ ] `expenses.*` - Expenses (Phase 2)
  - [ ] `common.*` - Common UI elements
  - [ ] `errors.*` - Error messages
  - [ ] `validation.*` - Form validation

#### Add Missing Translations

- [ ] 🔴 **Add translations for all 21 languages**:
  - [ ] English (en) - complete
  - [ ] French (fr) - complete
  - [ ] Spanish (es) - complete
  - [ ] German (de) - complete
  - [ ] Italian (it) - complete
  - [ ] Portuguese (pt) - complete
  - [ ] Portuguese BR (pt-BR) - complete
  - [ ] Japanese (ja) - complete
  - [ ] Chinese (zh) - complete
  - [ ] Russian (ru) - complete
  - [ ] Arabic (ar) - complete
  - [ ] Korean (ko) - complete
  - [ ] Dutch (nl) - complete
  - [ ] Swedish (sv) - complete
  - [ ] Norwegian (no) - complete
  - [ ] Finnish (fi) - complete
  - [ ] Polish (pl) - complete
  - [ ] Czech (cs) - complete
  - [ ] Hungarian (hu) - complete
  - [ ] Turkish (tr) - complete
  - [ ] Vietnamese (vi) - complete

### Acceptance Criteria

- [ ] No hardcoded text in any component
- [ ] All text uses `t()` function
- [ ] All 21 languages have complete translations
- [ ] Language switching works on all screens
- [ ] RTL support works for Arabic

---

## 🎯 Issue #3: Architecture Documentation Update

**Status:** 🔴 **NOT STARTED**  
**Priority:** MEDIUM  
**Phase:** Foundation  
**Dependencies:** Issue #1

### Description

Update architecture documentation to reflect current MVP (was based on pre-MVP with minimax LLM).

### Tasks

#### Review Current Architecture

- [ ] 🔴 **Read existing `docs/architecture_design.md`**
- [ ] 🔴 **Identify outdated sections** (minimax references, old tech stack)

#### Update Architecture Document

- [ ] 🔴 **Update tech stack**:
  - [ ] Frontend: Vite + React + TypeScript
  - [ ] Backend: Supabase (Postgres + Auth + Realtime)
  - [ ] AI: OpenAI (not minimax)
  - [ ] State: Zustand
  - [ ] Styling: Tailwind CSS
  - [ ] i18n: i18next
  - [ ] Monitoring: Sentry + PostHog

- [ ] 🔴 **Update data models**:
  - [ ] Trips with constraints
  - [ ] Activities (human + AI)
  - [ ] Scenarios (human + AI)
  - [ ] Votes (democratic decision-making)
  - [ ] Messages (real-time chat)

- [ ] 🔴 **Update workflows**:
  - [ ] Trip creation with constraints
  - [ ] Activity/scenario creation (human or AI)
  - [ ] Voting workflow
  - [ ] Itinerary finalization
  - [ ] Post-finalization editing (admin only)

- [ ] 🔴 **Add architecture diagrams**:
  - [ ] System architecture
  - [ ] Data flow
  - [ ] Real-time architecture
  - [ ] Authentication flow
  - [ ] Voting flow

#### Create Screen Architecture

- [ ] 🔴 **Document screen hierarchy**:
  - [ ] Screen navigation flow
  - [ ] Screen state management
  - [ ] Screen-to-screen communication
  - [ ] Shared components per screen

### Acceptance Criteria

- [ ] Architecture document is up-to-date
- [ ] No references to minimax or old tech
- [ ] Diagrams are clear and helpful
- [ ] Screen architecture is documented

---

## 🎯 Issue #4: Design System & Screen System

**Status:** 🔴 **NOT STARTED**  
**Priority:** HIGH  
**Phase:** Foundation  
**Dependencies:** Issue #0

### Description

Complete design system and define screen system for consistent UI/UX.

### Tasks

#### Design System

- [ ] 🔴 **Complete `docs/design/design-system.md`**:
  - [x] 🟢 Color system
  - [x] 🟢 Typography
  - [x] 🟢 Spacing
  - [ ] 🔴 Component library (buttons, inputs, cards, modals)
  - [ ] 🔴 Loading states (skeletons, spinners)
  - [ ] 🔴 Empty states
  - [ ] 🔴 Error states
  - [ ] 🔴 Toast notifications
  - [ ] 🔴 Modal patterns
  - [ ] 🔴 Form patterns

#### Screen System

- [ ] 🔴 **Create `docs/design/screen-system.md`**:
  - [ ] Screen structure (header, content, footer)
  - [ ] Navigation patterns (mobile + desktop)
  - [ ] Tab patterns
  - [ ] Modal patterns
  - [ ] Drawer patterns
  - [ ] Bottom sheet patterns (mobile)
  - [ ] Screen transitions
  - [ ] Loading states per screen
  - [ ] Error states per screen
  - [ ] Empty states per screen

#### Screen Inventory

- [ ] 🔴 **Document all screens**:
  - [ ] Landing Page
  - [ ] Login Page
  - [ ] Signup Page
  - [ ] Dashboard Page (Trip List)
  - [ ] Trip Detail Page
  - [ ] Profile Settings (future)
  - [ ] Team Settings (future)

#### Component Library

- [ ] 🔴 **Create reusable components**:
  - [ ] Button variants
  - [ ] Input variants
  - [ ] Card variants
  - [ ] Modal component
  - [ ] Toast component
  - [ ] Loading spinner
  - [ ] Skeleton loader
  - [ ] Empty state component
  - [ ] Error state component

### Acceptance Criteria

- [ ] Design system is complete
- [ ] Screen system is documented
- [ ] All screens follow design system
- [ ] Component library is consistent

---

## 🎯 PHASE 2: MVP Core – Screens

Work on screens sequentially. Each screen must be complete before moving to the next.

---

## 🎯 Issue #5: Landing Page

**Status:** 🟡 **PARTIALLY DONE**  
**Priority:** HIGH  
**Phase:** Screen 1  
**Dependencies:** Issue #2 (i18n), Issue #4 (design system)

### Description

Complete landing page with proper i18n, design system, and SEO.

### Tasks

#### Content & i18n

- [ ] 🔴 **Verify all text is internationalized**:
  - [ ] Hero section
  - [ ] Features section
  - [ ] CTA buttons
  - [ ] Footer
  - [ ] Navigation

#### Design & UX

- [ ] 🔴 **Apply design system**:
  - [ ] Colors match design system
  - [ ] Typography matches design system
  - [ ] Spacing matches design system
  - [ ] Responsive design (mobile, tablet, desktop)

#### Features

- [ ] 🟡 **Complete features section**:
  - [x] 🟢 Feature cards
  - [ ] 🔴 Feature animations (optional)
  - [ ] 🔴 Screenshots/mockups (optional)

#### SEO & Meta

- [ ] 🔴 **Add SEO meta tags**:
  - [ ] Title
  - [ ] Description
  - [ ] Open Graph tags
  - [ ] Twitter Card tags
  - [ ] Favicon
  - [ ] Structured data (Schema.org)

#### Performance

- [ ] 🔴 **Optimize performance**:
  - [ ] Image optimization
  - [ ] Lazy loading
  - [ ] Code splitting
  - [ ] First Load < 2s

### Acceptance Criteria

- [ ] All text is internationalized
- [ ] Design system is applied
- [ ] SEO meta tags are set
- [ ] Performance is optimized
- [ ] Mobile responsive
- [ ] Tests pass

---

## 🎯 Issue #6: Auth Screens (Login + Signup)

**Status:** 🟡 **PARTIALLY DONE**  
**Priority:** HIGH  
**Phase:** Screen 2  
**Dependencies:** Issue #1 (database), Issue #2 (i18n), Issue #4 (design system)

### Description

Complete login and signup screens with proper validation, error handling, and UX.

### Tasks

#### Login Page

- [ ] 🟡 **Complete login functionality**:
  - [x] 🟢 Email/password login
  - [x] 🟢 Supabase Auth integration
  - [ ] 🔴 Form validation (client + server)
  - [ ] 🔴 Error handling (display errors)
  - [ ] 🔴 Loading states
  - [ ] 🔴 Remember me (optional)
  - [ ] 🔴 Forgot password link (optional for MVP)

- [ ] 🔴 **Apply design system**:
  - [ ] Form inputs match design
  - [ ] Buttons match design
  - [ ] Error messages match design
  - [ ] Loading states match design

- [ ] 🔴 **Social login (optional for MVP)**:
  - [ ] Google login
  - [ ] GitHub login

#### Signup Page

- [ ] 🟡 **Complete signup functionality**:
  - [x] 🟢 Email/password signup
  - [x] 🟢 Supabase Auth integration
  - [ ] 🔴 Form validation (client + server)
  - [ ] 🔴 Password strength indicator
  - [ ] 🔴 Email confirmation flow
  - [ ] 🔴 Error handling (display errors)
  - [ ] 🔴 Loading states
  - [ ] 🔴 Terms of service checkbox

- [ ] 🔴 **Apply design system**:
  - [ ] Form inputs match design
  - [ ] Buttons match design
  - [ ] Error messages match design
  - [ ] Loading states match design

#### i18n

- [ ] 🔴 **Verify all auth text is internationalized**:
  - [ ] Form labels
  - [ ] Buttons
  - [ ] Error messages
  - [ ] Success messages
  - [ ] Validation messages

### Acceptance Criteria

- [ ] Login works with proper validation
- [ ] Signup works with email confirmation
- [ ] All text is internationalized
- [ ] Design system is applied
- [ ] Error handling works
- [ ] Loading states work
- [ ] Tests pass (unit + E2E)

---

## 🎯 Issue #7: Dashboard Screen (Trip List)

**Status:** 🟡 **PARTIALLY DONE**  
**Priority:** HIGH  
**Phase:** Screen 3  
**Dependencies:** Issue #1 (database), Issue #2 (i18n), Issue #4 (design system), Issue #6 (auth)

### Description

Complete dashboard with trip list, filters, search, and create trip flow.

### Tasks

#### Trip List

- [ ] 🟡 **Complete trip list functionality**:
  - [x] 🟢 Load trips from Supabase
  - [x] 🟢 Display trip cards
  - [x] 🟢 Real-time updates
  - [ ] 🔴 Filters (status: planned, locked, archived)
  - [ ] 🔴 Search (by title, destination)
  - [ ] 🔴 Sorting (date, title)
  - [ ] 🔴 Pagination or infinite scroll
  - [ ] 🔴 Empty state (no trips)
  - [ ] 🔴 Loading state (skeleton)
  - [ ] 🔴 Error state

#### Create Trip Flow

- [ ] 🟡 **Complete create trip modal**:
  - [x] 🟢 Basic trip creation
  - [ ] 🔴 Add constraints fields:
    - [ ] Budget (total / per person)
    - [ ] Group size
    - [ ] Children present (yes/no)
    - [ ] Preferences (nature, culture, nightlife, chill, must-dos)
    - [ ] Pace (chill, normal, intense)
  - [ ] 🔴 Form validation
  - [ ] 🔴 Success feedback
  - [ ] 🔴 Error handling

#### Trip Card

- [ ] 🟡 **Enhance trip cards**:
  - [x] 🟢 Display basic info (title, dates, destination)
  - [ ] 🔴 Display constraints summary
  - [ ] 🔴 Display member avatars
  - [ ] 🔴 Display status badge
  - [ ] 🔴 Quick actions (edit, delete)

#### Navigation

- [ ] 🟡 **Complete navigation**:
  - [x] 🟢 Header with user menu
  - [x] 🟢 Logout
  - [ ] 🔴 Profile link (future)
  - [ ] 🔴 Settings link (future)

#### i18n

- [ ] 🔴 **Verify all dashboard text is internationalized**:
  - [ ] Page title
  - [ ] Buttons
  - [ ] Filters
  - [ ] Empty states
  - [ ] Error messages

### Acceptance Criteria

- [ ] Trip list displays correctly
- [ ] Filters and search work
- [ ] Create trip with constraints works
- [ ] Real-time updates work
- [ ] All states (loading, empty, error) work
- [ ] All text is internationalized
- [ ] Design system is applied
- [ ] Tests pass (unit + E2E)

---

## 🎯 Issue #8: Trip Detail Screen - Core & Navigation

**Status:** 🟡 **PARTIALLY DONE**  
**Priority:** HIGH  
**Phase:** Screen 4a  
**Dependencies:** Issue #1 (database), Issue #2 (i18n), Issue #4 (design system), Issue #7 (dashboard)

### Description

Complete trip detail screen core: header, tabs, trip info, edit/delete trip.

### Tasks

#### Trip Header

- [ ] 🟡 **Complete trip header**:
  - [x] 🟢 Display trip title
  - [x] 🟢 Display trip dates
  - [x] 🟢 Display destination
  - [ ] 🔴 Display constraints summary
  - [ ] 🔴 Display member list with roles
  - [ ] 🔴 Role badge (owner, editor, viewer, moderator)
  - [ ] 🔴 Status badge (planned, locked, archived)
  - [ ] 🔴 Edit button (based on role)
  - [ ] 🔴 Delete button (owner only)

#### Edit Trip

- [ ] 🟡 **Complete edit trip functionality**:
  - [x] 🟢 Edit basic info (title, dates, destination)
  - [ ] 🔴 Edit constraints:
    - [ ] Budget
    - [ ] Group size
    - [ ] Children
    - [ ] Preferences
    - [ ] Pace
  - [ ] 🔴 Form validation
  - [ ] 🔴 Success feedback
  - [ ] 🔴 Error handling
  - [ ] 🔴 Real-time updates

#### Delete Trip

- [ ] 🟡 **Complete delete trip functionality**:
  - [ ] 🔴 Confirmation modal
  - [ ] 🔴 Owner-only permission
  - [ ] 🔴 Success feedback
  - [ ] 🔴 Navigate to dashboard after delete

#### Tab Navigation

- [ ] 🟡 **Complete tab navigation**:
  - [x] 🟢 Itinerary tab
  - [x] 🟢 Chat tab
  - [x] 🟢 Weather tab
  - [x] 🟢 Explore tab
  - [ ] 🔴 Tab state persistence
  - [ ] 🔴 Tab animations
  - [ ] 🔴 Mobile bottom navigation

#### Trip Members

- [ ] 🔴 **Add trip members management**:
  - [ ] Invite members (email or link)
  - [ ] Display member list
  - [ ] Change member roles (owner only)
  - [ ] Remove members (owner only)
  - [ ] Member avatars with presence

#### i18n

- [ ] 🔴 **Verify all trip detail text is internationalized**:
  - [ ] Tab labels
  - [ ] Buttons
  - [ ] Modals
  - [ ] Error messages

### Acceptance Criteria

- [ ] Trip header displays correctly with all info
- [ ] Edit trip works with constraints
- [ ] Delete trip works (owner only)
- [ ] Tab navigation works
- [ ] Member management works
- [ ] All text is internationalized
- [ ] Design system is applied
- [ ] Tests pass (unit + E2E)

---

## 🎯 Issue #9: Trip Detail Screen - Activities & Scenarios

**Status:** 🔴 **NOT STARTED**  
**Priority:** HIGH  
**Phase:** Screen 4b  
**Dependencies:** Issue #8 (trip detail core)

### Description

Implement activities and scenarios CRUD in trip detail screen.

### Tasks

#### Activities List

- [ ] 🔴 **Display activities**:
  - [ ] Day-by-day timeline view
  - [ ] Activity cards with all info
  - [ ] Activity status (proposed, confirmed, rejected)
  - [ ] Activity source badge (human, AI)
  - [ ] Activity cost
  - [ ] Activity time
  - [ ] Activity location
  - [ ] "Must-have" / "no-go" markers
  - [ ] Empty state (no activities)
  - [ ] Loading state (skeleton)

#### Create Activity (Human)

- [ ] 🔴 **Human activity creation**:
  - [ ] "Add Activity" button
  - [ ] Activity form modal:
    - [ ] Title
    - [ ] Description
    - [ ] Day (date picker)
    - [ ] Time (time picker)
    - [ ] Location (text input with autocomplete)
    - [ ] Cost (optional)
    - [ ] Must-have checkbox
    - [ ] No-go checkbox
  - [ ] Form validation
  - [ ] Success feedback
  - [ ] Real-time updates
  - [ ] Anyone can create during planning phase

#### Edit Activity

- [ ] 🔴 **Activity editing**:
  - [ ] Edit button on activity card
  - [ ] Edit form (same as create)
  - [ ] **During planning**: Anyone can edit their own activities
  - [ ] **After finalized**: Only admins (owner, editor, moderator) can edit
  - [ ] Form validation
  - [ ] Success feedback
  - [ ] Real-time updates

#### Delete Activity

- [ ] 🔴 **Activity deletion**:
  - [ ] Delete button on activity card
  - [ ] Confirmation modal
  - [ ] **During planning**: Anyone can delete their own activities
  - [ ] **After finalized**: Only admins can delete
  - [ ] Success feedback
  - [ ] Real-time updates

#### Scenarios

- [ ] 🔴 **Scenario creation (human)**:
  - [ ] "Create Scenario" button
  - [ ] Scenario builder:
    - [ ] Scenario name
    - [ ] Day-by-day activity selection
    - [ ] Drag & drop activities to days
    - [ ] Save as scenario
  - [ ] Display scenarios
  - [ ] Edit scenarios
  - [ ] Delete scenarios

#### Drag & Drop

- [ ] 🔴 **Itinerary editing**:
  - [ ] Drag & drop activities to reorder
  - [ ] Move activities between days
  - [ ] Visual feedback during drag
  - [ ] Save changes
  - [ ] Real-time updates

#### Role-Based Permissions

- [ ] 🔴 **Implement permissions**:
  - [ ] Check user role before actions
  - [ ] **Planning phase**: Everyone can CRUD their own activities
  - [ ] **Finalized phase**: Only admins (owner, editor, moderator) can CRUD
  - [ ] Display appropriate UI based on role

#### i18n

- [ ] 🔴 **Verify all activities text is internationalized**:
  - [ ] Form labels
  - [ ] Buttons
  - [ ] Activity statuses
  - [ ] Error messages

### Acceptance Criteria

- [ ] Activities display in day-by-day view
- [ ] Human activity creation works
- [ ] Activity editing works with role permissions
- [ ] Activity deletion works with role permissions
- [ ] Scenarios work
- [ ] Drag & drop works
- [ ] Real-time updates work
- [ ] All text is internationalized
- [ ] Tests pass (unit + E2E)

**BLOCKER**: Must be complete before Issue #10 (Voting)

---

## 🎯 Issue #10: Trip Detail Screen - Voting System

**Status:** 🔴 **NOT STARTED**  
**Priority:** HIGH  
**Phase:** Screen 4c  
**Dependencies:** Issue #9 (activities & scenarios MUST be complete)

### Description

Implement voting system for activities and scenarios. Everyone can vote.

### Tasks

#### Activity Voting UI

- [ ] 🔴 **Add voting buttons to activities**:
  - [ ] Upvote button (ThumbsUp icon)
  - [ ] Downvote button (ThumbsDown icon)
  - [ ] Display vote counts (upvotes - downvotes)
  - [ ] Highlight current user's vote
  - [ ] Real-time vote updates

#### Vote Logic

- [ ] 🔴 **Implement voting logic**:
  - [ ] Create/update vote on click
  - [ ] Toggle vote (click again to remove)
  - [ ] Update vote counts in real-time
  - [ ] **Everyone can vote** (owner, editor, viewer, moderator)
  - [ ] Vote on human-created activities
  - [ ] Vote on AI-generated activities

#### Scenario Voting

- [ ] 🔴 **Implement scenario voting**:
  - [ ] Display scenarios side-by-side
  - [ ] Vote on complete scenarios
  - [ ] Show vote counts per scenario
  - [ ] Highlight winning scenario
  - [ ] Real-time vote updates

#### Decision View

- [ ] 🔴 **Create decision view**:
  - [ ] Filter: Show validated activities (positive votes)
  - [ ] Filter: Show rejected activities (negative votes)
  - [ ] Filter: Show undecided activities (no votes or tie)
  - [ ] Visual indicators (green/red/yellow)

#### Finalize Itinerary

- [ ] 🔴 **Add finalize button**:
  - [ ] "Finalize Itinerary" button (owner only)
  - [ ] Confirmation modal
  - [ ] Change trip status to "locked"
  - [ ] Notify all members
  - [ ] Switch to admin-only editing mode

#### Post-Finalization Voting

- [ ] 🔴 **Voting after finalization**:
  - [ ] Admins can add/edit/delete activities
  - [ ] Everyone can vote on changes
  - [ ] Display "proposed change" badge
  - [ ] Notify when changes are made

#### Real-Time

- [ ] 🔴 **Real-time vote updates**:
  - [ ] Subscribe to vote changes
  - [ ] Update UI when votes change
  - [ ] Optimistic UI updates

#### i18n

- [ ] 🔴 **Verify all voting text is internationalized**:
  - [ ] Vote buttons
  - [ ] Vote counts
  - [ ] Decision view
  - [ ] Finalize modal
  - [ ] Notifications

### Acceptance Criteria

- [ ] Voting works on activities
- [ ] Voting works on scenarios
- [ ] Real-time vote updates work
- [ ] Everyone can vote
- [ ] Decision view works
- [ ] Finalize itinerary works
- [ ] Post-finalization voting works
- [ ] All text is internationalized
- [ ] Tests pass (unit + E2E)

**CRITICAL**: Issue #9 (Activities) MUST be complete before starting this.

---

## 🎯 Issue #11: Trip Detail Screen - Chat & Collaboration

**Status:** 🟡 **PARTIALLY DONE**  
**Priority:** HIGH  
**Phase:** Screen 4d  
**Dependencies:** Issue #8 (trip detail core)

### Description

Complete chat with presence, typing indicators, and collaboration features.

### Tasks

#### Basic Chat

- [x] 🟢 **Chat already implemented**:
  - [x] Message sending/receiving
  - [x] Message history loading
  - [x] Real-time messages
  - [x] User avatars

#### Presence Tracking

- [ ] 🔴 **Add presence tracking**:
  - [ ] Show who's online in trip
  - [ ] Online/offline indicator on avatars
  - [ ] Last seen timestamps
  - [ ] Active users count

#### Typing Indicators

- [ ] 🔴 **Add typing indicators**:
  - [ ] Broadcast typing state
  - [ ] Display "User is typing..."
  - [ ] Debounce typing events

#### Enhanced Chat Features

- [ ] 🔴 **Add chat enhancements**:
  - [ ] Message reactions (👍 👎 ❤️ 😂) - optional
  - [ ] @mentions - optional
  - [ ] Reply to message - optional
  - [ ] Message timestamps
  - [ ] Unread message counter

#### i18n

- [ ] 🔴 **Verify all chat text is internationalized**:
  - [ ] Input placeholder
  - [ ] Send button
  - [ ] Empty state
  - [ ] Presence indicators
  - [ ] Typing indicators

### Acceptance Criteria

- [ ] Chat works fully
- [ ] Presence tracking works
- [ ] Typing indicators work
- [ ] Real-time updates work
- [ ] All text is internationalized
- [ ] Tests pass (unit + E2E)

---

## 🎯 Issue #12: Trip Detail Screen - AI Itinerary Generation

**Status:** 🔴 **NOT STARTED**  
**Priority:** HIGH  
**Phase:** Screen 4e  
**Dependencies:** Issue #1 (constraints), Issue #9 (activities), Issue #10 (voting)

### Description

Implement AI-powered itinerary generation. AI proposes scenarios, humans vote.

### Tasks

#### AI Service

- [ ] 🔴 **Enhance OpenAI service**:
  - [ ] Structured JSON output with Zod validation
  - [ ] Constraint-aware prompts
  - [ ] Prompt versioning system
  - [ ] Retry logic with exponential backoff
  - [ ] Token usage tracking
  - [ ] Cost monitoring
  - [ ] Error handling

#### AI Generation UI

- [ ] 🔴 **Add AI generation button**:
  - [ ] "Generate with AI" button in itinerary tab
  - [ ] Generation progress indicator
  - [ ] Loading state
  - [ ] Success feedback

#### Constraint Collection

- [ ] 🔴 **Use constraints for AI**:
  - [ ] If constraints exist, use them in prompt
  - [ ] If no constraints, ask user to add them
  - [ ] Display "better results with constraints" message

#### AI Scenario Generation

- [ ] 🔴 **Generate scenarios**:
  - [ ] AI generates 2-3 complete scenarios
  - [ ] Each scenario is a day-by-day plan
  - [ ] Mark scenarios as AI-generated
  - [ ] Display AI scenarios alongside human scenarios
  - [ ] Group votes on all scenarios (AI + human)

#### AI Activity Suggestions

- [ ] 🔴 **Generate activity suggestions**:
  - [ ] AI suggests individual activities
  - [ ] Mark activities as AI-generated
  - [ ] Display AI activities alongside human activities
  - [ ] Group votes on all activities (AI + human)

#### AI Workflow

- [ ] 🔴 **Complete AI workflow**:
  - [ ] Humans create activities/scenarios
  - [ ] AI proposes activities/scenarios
  - [ ] Group votes on everything
  - [ ] Decision made based on votes

#### i18n

- [ ] 🔴 **Verify all AI text is internationalized**:
  - [ ] Generate button
  - [ ] Loading messages
  - [ ] Success messages
  - [ ] Error messages
  - [ ] AI badges

### Acceptance Criteria

- [ ] AI generates scenarios based on constraints
- [ ] AI scenarios appear alongside human ones
- [ ] Group can vote on all scenarios
- [ ] Error handling works gracefully
- [ ] All text is internationalized
- [ ] Tests pass (unit + E2E)

---

## 🎯 Issue #13: Trip Detail Screen - Context & Enrichment

**Status:** 🔴 **NOT STARTED**  
**Priority:** MEDIUM  
**Phase:** Screen 4f  
**Dependencies:** Issue #9 (activities)

### Description

Add weather, places, and travel time context to trip detail screen.

### Tasks

#### Weather Widget

- [x] 🟢 **Weather widget exists**:
  - [x] Basic weather display
  - [ ] 🔴 Weather API integration
  - [ ] 🔴 Display forecast for trip dates
  - [ ] 🔴 Weather icons
  - [ ] 🔴 Temperature, precipitation, wind

#### Places Widget

- [x] 🟢 **Nearby places widget exists**:
  - [x] Basic places display
  - [ ] 🔴 Google Places API integration
  - [ ] 🔴 Display nearby POIs
  - [ ] 🔴 Place details (rating, photos, hours)
  - [ ] 🔴 "Add to itinerary" button

#### Travel Time

- [ ] 🔴 **Add travel time between activities**:
  - [ ] Calculate travel time between consecutive activities
  - [ ] Display travel time on timeline
  - [ ] Route visualization (optional)

#### Maps

- [ ] 🔴 **Add maps view** (optional for MVP):
  - [ ] Display activities on map
  - [ ] Activity markers
  - [ ] Route between activities

#### i18n

- [ ] 🔴 **Verify all context text is internationalized**:
  - [ ] Weather labels
  - [ ] Places labels
  - [ ] Travel time labels

### Acceptance Criteria

- [ ] Weather displays correctly
- [ ] Places display correctly
- [ ] Travel time calculates correctly
- [ ] All text is internationalized
- [ ] Tests pass

---

## 🎯 PHASE 3: Post-MVP Enhancements

These can wait until after MVP launch.

---

## 🎯 Issue #14: Group Expense Tracking (Tricount-like)

**Status:** 🔴 **NOT STARTED**  
**Priority:** MEDIUM  
**Phase:** Phase 2 (Month 4)  
**Dependencies:** Phase 1 MVP complete

### Description

Implement group expense tracking. Simple split calculation, no payment processing.

### Tasks

- [ ] 🔴 Expense data model (tables, RLS)
- [ ] 🔴 Expense CRUD
- [ ] 🔴 Expense splitting algorithm
- [ ] 🔴 "Who owes whom" calculation
- [ ] 🔴 Expense UI in trip detail
- [ ] 🔴 Currency conversion
- [ ] 🔴 Export CSV/PDF
- [ ] 🔴 i18n
- [ ] 🔴 Tests

---

## 🎯 Issue #15: PWA & Offline Support

**Status:** 🔴 **NOT STARTED**  
**Priority:** HIGH  
**Phase:** Phase 2 (Month 5)  
**Dependencies:** Phase 1 MVP complete

### Description

Make Voyagely usable during trips with PWA and offline capabilities.

### Tasks

- [ ] 🔴 Service worker + caching
- [ ] 🔴 Offline queue (IndexedDB)
- [ ] 🔴 PWA manifest
- [ ] 🔴 Background sync
- [ ] 🔴 Mobile performance tuning
- [ ] 🔴 Tests

---

## 🎯 Issue #16: Trip Templates & Sharing

**Status:** 🔴 **NOT STARTED**  
**Priority:** MEDIUM  
**Phase:** Phase 2 (Month 6)  
**Dependencies:** Phase 1 MVP complete

### Description

Add trip templates and sharing capabilities.

### Tasks

- [ ] 🔴 Template system
- [ ] 🔴 Duplicate trip
- [ ] 🔴 Sharing links
- [ ] 🔴 Timezone support
- [ ] 🔴 Tests

---

## 🎯 Current Sprint / Active Tasks

### This Week

- [ ] 🟡 **Issue #1**: Database Schema & RLS verification
- [ ] 🟡 **Issue #2**: i18n audit and completion
- [ ] 🔴 **Issue #3**: Architecture documentation update

### Next Week

- [ ] 🔴 **Issue #4**: Design System & Screen System
- [ ] 🔴 **Issue #5**: Landing Page completion

---

## 🐛 Known Issues / Bugs

### High Priority

_None yet_

### Medium Priority

_None yet_

### Low Priority

_None yet_

---

## 💡 Feature Requests / Ideas (Backlog)

- [ ] 🌟 Multi-language trip planning
- [ ] 🌟 AR/VR destination previews
- [ ] 🌟 Voice assistant integration
- [ ] 🌟 Photo sharing in trips
- [ ] 🌟 Integration with travel booking sites
- [ ] 🌟 Weather alerts and trip adjustments

---

## 📝 Notes

### Decisions Made

- Using Supabase for backend, auth, and real-time
- OpenAI for AI itinerary generation (not minimax)
- Vite + React + TypeScript for frontend
- PostHog for analytics
- Sentry for error tracking
- **Focus: Planification first, expenses in Phase 2**
- **MVP: 100% free to validate usage**
- **Humans can create activities/scenarios, AI assists**
- **Screen-by-screen approach: Complete each screen before moving to next**

### Technical Debt

_Will be tracked here as discovered_

---

## 📊 Progress Tracking

### Foundation (Must complete first)

- **Issue #0 (Project Initialization)**: 🟢 100% - ✅ COMPLETE
- **Issue #1 (Database Setup)**: 🟡 60% - In Progress
- **Issue #2 (i18n Complete)**: 🟡 40% - In Progress
- **Issue #3 (Architecture Update)**: 🔴 0% - Not Started
- **Issue #4 (Design System)**: 🔴 30% - Not Started

### Screens (Sequential)

- **Issue #5 (Landing Page)**: 🟡 70% - Partially Done
- **Issue #6 (Auth Screens)**: 🟡 60% - Partially Done
- **Issue #7 (Dashboard)**: 🟡 50% - Partially Done
- **Issue #8 (Trip Detail Core)**: 🟡 40% - Partially Done
- **Issue #9 (Activities & Scenarios)**: 🔴 0% - Not Started
- **Issue #10 (Voting System)**: 🔴 0% - Not Started (BLOCKED by #9)
- **Issue #11 (Chat)**: 🟡 50% - Partially Done
- **Issue #12 (AI Generation)**: 🔴 0% - Not Started
- **Issue #13 (Context)**: 🔴 10% - Not Started

### Phase 2 (Post-MVP)

- **Issue #14 (Expenses)**: 🔴 0% - Phase 2
- **Issue #15 (PWA/Offline)**: 🔴 0% - Phase 2
- **Issue #16 (Templates)**: 🔴 0% - Phase 2

**Overall MVP Completion: ~35%** (Foundation in progress, screens partially done)

---

**Last Updated:** January 2025  
**Next Review:** Weekly

**CRITICAL PATH**:

1. Complete Issue #1 (Database) ✅
2. Complete Issue #2 (i18n) ✅
3. Complete Issue #4 (Design System) ✅
4. Then work on screens sequentially (#5 → #6 → #7 → #8 → #9 → #10 → etc.)

**BLOCKER**: Issue #10 (Voting) CANNOT start until Issue #9 (Activities) is complete.
