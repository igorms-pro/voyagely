# Voyagely Issues & Tasks Tracker

> Goal: Build a complete SaaS travel planning platform with AI-powered itineraries, real-time collaboration, and seamless user experience.

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
**Description:** Initialize complete project scaffolding with all foundational tooling, testing, and developer experience setup

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

#### Internationalization (i18n)

- [x] 🟢 i18next + react-i18next setup
- [x] 🟢 Browser language detector
- [x] 🟢 10 languages configured (en, fr, es, pt, pt-BR, ja, zh, de, it, ru)
- [x] 🟢 Translation files for all languages
- [x] 🟢 useLanguage hook
- [x] 🟢 Language switcher component (ready for integration)
- [x] 🟢 Automatic language detection and persistence

#### Dark/Light Theme

- [x] 🟢 next-themes integration
- [x] 🟢 Theme configuration
- [x] 🟢 Dark mode CSS variables setup
- [x] 🟢 Theme persistence

#### Monitoring & Analytics

- [x] 🟢 Sentry error tracking setup
- [x] 🟢 PostHog analytics setup
- [x] 🟢 Error handling utilities
- [x] 🟢 Analytics event tracking utilities
- [x] 🟢 useErrorTracking hook
- [x] 🟢 usePostHog hook
- [x] 🟢 ErrorBoundary with Sentry integration

#### Documentation

- [x] 🟢 Comprehensive README with quick start
- [x] 🟢 Engineering playbook (CTO-level)
- [x] 🟢 Architecture design docs
- [x] 🟢 Executive summary
- [x] 🟢 Design system documentation
- [x] 🟢 Issues tracking template
- [x] 🟢 Environment variables example (.env.example)

#### Project Structure

- [x] 🟢 Organized folder structure (components, hooks, lib, pages, contexts)
- [x] 🟢 Package.json with all scripts
- [x] 🟢 Component configuration (components.json for shadcn/ui)
- [x] 🟢 Git repository initialized and pushed to GitHub

**Notes:**

- Project is now a fully configured template with all foundational tooling
- Ready for feature development (Issue #2: Foundation)
- All developer experience tools in place
- CI/CD pipeline active and ready

---

## 🎯 Issue #1: Activities & Votes CRUD Implementation

**Status:** 🔴 **NOT STARTED**  
**Priority:** HIGH  
**Branch:** `2-activities-votes-crud`  
**Assigned:** TBD  
**Created:** 2025-01-XX

### Description

Implement full CRUD operations for activities and votes, connecting the frontend to Supabase. Currently, activities and votes are not loaded from the database - they're set to empty arrays/objects in `TripDetailPage`. This issue implements the complete data layer for these features.

### Current State

- ✅ Database schema exists (`activities` and `votes` tables)
- ✅ RLS policies configured and tested
- ✅ Real-time subscriptions set up for activities
- ✅ TypeScript types generated (`database.types.ts`)
- ❌ Activities not loaded from Supabase
- ❌ Votes not loaded from Supabase
- ❌ No store functions for activities/votes CRUD
- ❌ No UI for creating activities
- ❌ No UI for voting on activities

### Requirements

See "Next Sprint: Activities & Votes CRUD" section above for detailed task breakdown.

### Acceptance Criteria

- [ ] Activities load from Supabase when trip page loads
- [ ] Users can create new activities via UI
- [ ] Users can update/delete activities
- [ ] Votes load from Supabase for all activities
- [ ] Users can vote (upvote/downvote) on activities
- [ ] Vote counts display correctly on activity cards
- [ ] Real-time updates work for activities and votes
- [ ] All operations handle errors gracefully
- [ ] Unit tests for all CRUD functions
- [ ] E2E tests for key user flows

### Technical Notes

- Activities use soft deletes (`deleted_at` column)
- Votes use UNIQUE constraint on `(activity_id, user_id)` for upsert behavior
- Real-time subscriptions already configured in `realtime-service.ts`
- Store functions should follow the same pattern as `loadTrips`, `createTrip`, etc.
- Need to map database types to app types (similar to Trip mapping in TripDetailPage)

---

## 🎯 Issue #2: Foundation (MVP Core)

### Authentication & User Management

- [x] 🟡 Basic Supabase authentication (partially implemented)
  - [x] Email/password signup (SignupPage uses Supabase Auth)
  - [ ] Email/password login (LoginPage still uses fake auth)
  - [ ] Session persistence check on app load
  - [ ] Auth state listener set up in App.tsx
  - [ ] Magic link authentication
  - [ ] Social OAuth (Google, GitHub)
  - [ ] Password reset flow
  - [ ] Email verification
  - [x] Session management (partial - needs completion)
- [ ] 🔴 User profile management
  - Profile editing (display name, avatar)
  - Preferences storage
  - Account settings page
- [ ] 🔴 Onboarding flow
  - Welcome screen for new users
  - First trip creation wizard
  - Feature tour

### Database & Backend Setup

- [x] 🟢 Set up Supabase project
  - [x] Create production database
  - [x] Configure RLS policies for all tables ✅ Verified in Supabase
  - [x] Set up database migrations
  - [ ] Create audit logging tables
- [x] 🟢 Database schema implementation
  - [x] Profiles table (extends auth.users)
  - [x] Trips table
  - [x] Trip members table
  - [x] Itineraries table
  - [x] Itinerary days table
  - [x] Activities table
  - [x] Votes table
  - [x] Messages table
  - [x] Invitations table
  - [ ] Preferences table
  - [ ] Audit logs table
- [x] 🟢 Database indexes and performance
  - [x] Add composite indexes for common queries
  - [x] Optimize RLS policies ✅ Tested and verified
  - [ ] Set up database backups

### Real-Time Features

- [x] 🟢 Supabase Realtime setup
  - [x] Configure channels per trip
  - [ ] Set up presence tracking
  - [x] Implement channel authorization (via RLS)
- [x] 🟢 Real-time chat implementation
  - [x] Message sending/receiving
  - [x] Message history loading
  - [ ] Typing indicators
  - [ ] Online/offline presence
  - [ ] Message reactions (optional)
- [x] 🟢 Real-time activity updates
  - [x] Activity proposal notifications (subscriptions ready)
  - [ ] Vote count updates (needs votes CRUD)
  - [x] Activity status changes (subscriptions ready)

### Basic Trip Management

- [x] 🟢 Trip creation flow
  - [x] Create trip modal/form
  - [ ] Destination input with autocomplete (basic text input works)
  - [x] Date range selection
  - [x] Group size input
  - [x] Budget input
  - [ ] Invite link generation
- [x] 🟢 Trip dashboard
  - [x] List all user trips
  - [x] Filter by status (planned, locked, archived)
  - [x] Search trips
  - [x] Trip cards with key info
- [x] 🟢 Trip detail page
  - [x] Trip overview
  - [x] Member management (view members)
  - [ ] Invite management
  - [x] Trip settings (edit/delete)

---

## 🤖 Issue #3: AI Itinerary Generation

### AI Integration

- [ ] 🔴 OpenAI service enhancement
  - Structured JSON output with Zod validation
  - Prompt versioning system
  - Retry logic with exponential backoff
  - Token usage tracking
  - Cost monitoring
- [ ] 🔴 Itinerary generation workflow
  - Constraint collection UI
  - Prompt assembly with context
  - Generation progress indicator
  - Response parsing and validation
  - Error handling and fallbacks
- [ ] 🔴 Itinerary display
  - Day-by-day view
  - Activity cards with details
  - Map integration (optional for MVP)
  - Time-based sorting
  - Edit itinerary manually

### Context Enrichment

- [ ] 🔴 Weather integration
  - Fetch weather for trip dates/location
  - Display weather in itinerary
  - Weather-based suggestions
- [ ] 🔴 Places/POI integration
  - Google Places API integration
  - Place search and autocomplete
  - Place details display
  - Nearby places widget
- [ ] 🔴 Cost estimation
  - Activity cost tracking
  - Budget vs actual
  - Currency conversion (if multi-currency)

---

## 👥 Issue #4: Collaboration Features

### Voting System

- [ ] 🔴 Activity voting UI
  - Upvote/downvote buttons
  - Vote count display
  - Vote state management
  - Real-time vote updates
- [ ] 🔴 Voting logic
  - Quorum rules
  - Tie-breaker logic
  - Auto-accept/reject based on votes
  - Vote history
- [ ] 🔴 Activity status management
  - Proposed → Accepted/Rejected flow
  - Status badges
  - Filter by status

### Member Management

- [ ] 🔴 Invite system
  - Generate invite links
  - Share invite via email/link
  - Invite expiration
  - Invite usage tracking
- [ ] 🔴 Role management
  - Assign roles (owner, editor, viewer, moderator)
  - Role-based permissions
  - Role change notifications
  - Remove members

### Chat & Communication

- [ ] 🔴 Enhanced chat features
  - Message editing
  - Message deletion
  - Reply to messages
  - Mention users (@username)
  - Rich text formatting (optional)
- [ ] 🔴 Notifications
  - In-app notifications
  - Email notifications (optional)
  - Push notifications (optional)
  - Notification preferences

---

## 🎨 Issue #5: UX/UI Enhancements

### Design System

- [ ] 🔴 Component library completion
  - Modal/Sheet components
  - Date/Time pickers
  - Form inputs with validation
  - Loading states and skeletons
  - Empty states
  - Toast notifications
- [ ] 🔴 Mobile responsiveness
  - Test on real devices
  - Touch gesture support
  - Mobile navigation patterns
  - Responsive tables/lists
- [ ] 🔴 Dark mode
  - Theme toggle
  - Persist theme preference
  - System theme detection
- [ ] 🔴 Accessibility
  - WCAG 2.1 AA compliance
  - Screen reader testing
  - Keyboard navigation
  - Focus management
  - ARIA labels

### User Experience

- [ ] 🔴 Loading states
  - Skeleton screens
  - Progress indicators
  - Optimistic UI updates
- [ ] 🔴 Error handling
  - User-friendly error messages
  - Retry mechanisms
  - Offline support indicators
- [ ] 🔴 Performance optimization
  - Code splitting
  - Lazy loading routes
  - Image optimization
  - Bundle size optimization
  - Caching strategies

---

## 🔌 Issue #6: Integrations

### External APIs

- [ ] 🔴 Flight booking (if needed)
  - Skyscanner integration (or similar)
  - Flight search
  - Price display
- [ ] 🔴 Hotel booking (if needed)
  - Booking.com/Expedia integration
  - Hotel search
  - Availability checking
- [ ] 🔴 Maps & Routing
  - Google Maps integration
  - Route planning between activities
  - Travel time estimation
  - Map view of itinerary
- [ ] 🔴 Calendar integration
  - Export to Google Calendar
  - Export to iCal
  - Import from calendar (optional)

---

## 📊 Issue #7: Analytics & Monitoring

### Analytics

- [ ] 🔴 PostHog event tracking
  - Track all user actions
  - Funnel analysis setup
  - Conversion tracking
  - User segmentation
- [ ] 🔴 Business metrics
  - User acquisition metrics
  - Engagement metrics
  - Feature usage analytics
  - Revenue metrics (if monetized)

### Error Tracking

- [ ] 🔴 Sentry configuration
  - Production error tracking
  - Performance monitoring
  - Release tracking
  - Alert rules setup

---

## 💰 Issue #8: Monetization (If Applicable)

### Pricing Tiers

- [ ] 🔴 Pricing page
  - Free tier definition
  - Paid tier(s) definition
  - Feature comparison
- [ ] 🔴 Payment integration
  - Stripe integration
  - Subscription management
  - Billing portal
  - Invoice generation
- [ ] 🔴 Usage limits
  - Trip limits per tier
  - AI generation limits
  - Storage limits
  - Feature gating

---

## 🔒 Issue #9: Security & Compliance

### Security

- [ ] 🔴 Security audit
  - Dependency vulnerability scanning
  - Code security review
  - Penetration testing
- [ ] 🔴 Rate limiting
  - API rate limits
  - Brute force protection
  - DDoS protection
- [ ] 🔴 Data encryption
  - Encrypt sensitive data at rest
  - TLS/HTTPS enforcement
  - API key security

### Compliance

- [ ] 🔴 GDPR compliance
  - Privacy policy
  - Terms of service
  - Cookie consent
  - Data export
  - Right to deletion
- [ ] 🔴 Data retention
  - Retention policies
  - Auto-deletion workflows
  - Data archival

---

## 🚀 Issue #10: Production & Deployment

### Infrastructure

- [ ] 🔴 Production environment
  - Production Supabase project
  - Production domain setup
  - SSL certificates
  - CDN configuration
- [ ] 🔴 CI/CD pipeline
  - Automated testing
  - Automated deployment
  - Staging environment
  - Rollback procedures
- [ ] 🔴 Monitoring & Alerts
  - Uptime monitoring
  - Error rate alerts
  - Performance alerts
  - Cost alerts

### Documentation

- [ ] 🔴 User documentation
  - User guides
  - FAQ
  - Video tutorials
  - Help center
- [ ] 🔴 Developer documentation
  - API documentation
  - Architecture diagrams
  - Deployment guides
  - Contributing guide

---

## 🧪 Issue #11: Testing & Quality

### Testing

- [ ] 🔴 Unit test coverage
  - Target 70%+ coverage
  - Critical path tests
  - Service layer tests
- [ ] 🔴 Integration tests
  - API integration tests
  - Database integration tests
  - Third-party service mocks
- [ ] 🔴 E2E tests
  - Critical user journeys
  - Cross-browser testing
  - Mobile device testing
- [ ] 🔴 Performance tests
  - Load testing
  - Stress testing
  - Performance benchmarks

### Quality Assurance

- [ ] 🔴 QA process
  - Test plans
  - Bug tracking workflow
  - Release checklist
  - Regression testing

---

## 📱 Issue #12: Mobile Apps (Future)

### Native Apps (Optional)

- [ ] 🔴 React Native setup
- [ ] 🔴 iOS app
- [ ] 🔴 Android app
- [ ] 🔴 Push notifications
- [ ] 🔴 App store deployment

---

## 🎯 Current Sprint / Active Tasks

### This Week

- [x] 🟢 Set up Supabase project and database schema
- [x] 🟢 Replace mock authentication with Supabase Auth
- [x] 🟢 Implement basic trip CRUD operations
- [x] 🟢 Realtime setup (migration 003)
- [x] 🟢 Realtime service implementation
- [x] 🟢 Fix E2E tests for CI/CD (add data-testid, improve env var handling)

### Completed ✅

- [x] 🟢 Project initialization with all tooling
- [x] 🟢 i18n setup (10 languages)
- [x] 🟢 Dark/light theme setup
- [x] 🟢 E2E & unit test infrastructure
- [x] 🟢 Tailwind + Prettier configuration
- [x] 🟢 CI/CD pipeline
- [x] 🟢 Sentry & PostHog integration
- [x] 🟢 Git hooks (Husky)
- [x] 🟢 Supabase project setup (Agent-1)
- [x] 🟢 Database schema migration (001_initial_schema.sql)
- [x] 🟢 Supabase client setup with TypeScript types (Agent-2)
- [x] 🟢 RLS policies for all tables (Agent-3, 002_rls_policies.sql)
- [x] 🟢 Auth components updated (LoginPage, SignupPage) (Agent-4)
- [x] 🟢 User state management with auth functions (Agent-5)
- [x] 🟢 Trip CRUD operations (load, create, update, delete)
- [x] 🟢 Trip dashboard with filters, search, sorting
- [x] 🟢 Realtime service setup (trips, messages, activities subscriptions)
- [x] 🟢 Real-time chat implementation (messages load/send)
- [x] 🟢 E2E tests fixed and passing (data-testid attributes, CI resilience)

### Next Sprint: Activities & Votes CRUD

**Priority:** HIGH  
**Status:** 🔴 Not Started  
**Branch:** `2-activities-votes-crud`

#### Activities CRUD

- [ ] 🔴 Add `loadActivities(tripId)` function to store
  - Load activities from Supabase for a trip
  - Filter by `deleted_at IS NULL`
  - Map database Activity type to app Activity type
  - Handle errors gracefully
- [ ] 🔴 Add `createActivity(activityData)` function to store
  - Create activity in Supabase
  - Validate required fields (trip_id, title)
  - Set default status to 'proposed'
  - Set default source to 'manual'
  - Update local state optimistically
- [ ] 🔴 Add `updateActivity(activityId, updates)` function to store
  - Update activity in Supabase
  - Handle soft delete (set deleted_at)
  - Update local state
- [ ] 🔴 Update `TripDetailPage` to load activities on mount
  - Call `loadActivities(tripId)` in `loadTripData`
  - Display activities in itinerary view
  - Handle loading and error states
- [ ] 🔴 Add UI for creating activities
  - "Add Activity" button/modal
  - Activity form (title, description, category, time, cost)
  - Submit handler that calls `createActivity`

#### Votes CRUD

- [ ] 🔴 Add `loadVotes(activityIds)` function to store
  - Load votes from Supabase for multiple activities
  - Group votes by activity_id
  - Return Record<activityId, Vote[]>
- [ ] 🔴 Add `createOrUpdateVote(activityId, choice)` function to store
  - Upsert vote in Supabase (use UNIQUE constraint on activity_id + user_id)
  - Generate idempotency_key
  - Handle vote change (up → down or down → up)
  - Update local state optimistically
- [ ] 🔴 Update `TripDetailPage` to load votes on mount
  - Call `loadVotes()` after activities are loaded
  - Pass activity IDs to load votes
  - Display vote counts on activity cards
- [ ] 🔴 Add voting UI
  - Upvote/downvote buttons on activity cards
  - Show current user's vote state (highlighted)
  - Show vote counts (upvotes - downvotes)
  - Handle vote click → call `createOrUpdateVote`

#### Real-time Integration

- [ ] 🔴 Connect real-time subscriptions to store updates
  - Activities real-time subscription already set up, but needs to call store functions
  - Votes real-time subscription (needs to be added to realtime-service.ts)
  - Update store when real-time events occur

#### Testing

- [ ] 🔴 Unit tests for activities CRUD functions
- [ ] 🔴 Unit tests for votes CRUD functions
- [ ] 🔴 E2E test for creating an activity
- [ ] 🔴 E2E test for voting on an activity

### Backlog (Future Sprints)

- [ ] 🔴 UI initialization and testing (manual app review)
- [ ] 🔴 AI itinerary generation MVP
- [ ] 🔴 Member invitations system
- [ ] 🔴 Activity status management (proposed → confirmed/rejected)

---

## 🐛 Known Issues / Bugs

### High Priority

_None yet_

### Medium Priority

_None yet_

### Low Priority

_None yet_

---

## 💡 Feature Requests / Ideas

### Backlog

- [ ] 🌟 AI-powered travel recommendations based on past trips
- [ ] 🌟 Group chat threads for specific activities
- [ ] 🌟 Collaborative expense tracking
- [ ] 🌟 Photo sharing in trips
- [ ] 🌟 Integration with travel booking sites
- [ ] 🌟 Weather alerts and trip adjustments
- [ ] 🌟 Offline mode with sync
- [ ] 🌟 Trip templates
- [ ] 🌟 Public trip sharing
- [ ] 🌟 Trip reviews and ratings

---

## 📝 Notes

### Decisions Made

- Using Supabase for backend, auth, and real-time
- OpenAI for AI itinerary generation
- Vite + React + TypeScript for frontend
- PostHog for analytics
- Sentry for error tracking

### Technical Debt

_Will be tracked here as discovered_

### Dependencies

_External dependencies or blockers will be noted here_

---

**Last Updated:** 2025-01-XX  
**Next Review:** Weekly

---

## 📝 Recent Updates

### 2025-01-XX - E2E Tests Fixed

- ✅ Added `data-testid` attributes to landing page elements
- ✅ Made app resilient to missing environment variables (Supabase, PostHog, Sentry)
- ✅ Simplified E2E test logic to use test IDs
- ✅ All E2E tests now passing in local and CI
- ✅ Improved error handling for missing env vars in CI/test environments

---

## 📊 Progress Tracking

### Overall Progress

- **Project Initialization**: 🟢 100% - ✅ COMPLETE (All tooling, i18n, theme, tests, CI/CD)
- Issue #1 (Activities & Votes CRUD): 🔴 0% - Not started (functions exist but need real-time votes subscription + tests)
- Issue #2 (Foundation): 🟡 70% - Supabase setup complete, auth working, trip CRUD done, realtime ready, E2E tests fixed, needs activities/votes CRUD
- Issue #3 (AI): 🔴 0% - Not started
- Issue #4 (Collaboration): 🔴 0% - Not started
- Issue #5 (UX/UI): 🟡 30% - Basic UI + i18n + theme + monitoring
- Issue #6 (Integrations): 🔴 0% - Not started
- Issue #7 (Analytics): 🟢 100% - Sentry & PostHog integrated
- Issue #8 (Monetization): 🔴 0% - Not started
- Issue #9 (Security): 🟡 20% - RLS policies implemented, needs audit
- Issue #10 (Production): 🟡 50% - CI/CD complete, needs deployment config
- Issue #11 (Testing): 🟢 80% - Full test infrastructure, needs coverage

**Overall SaaS Completion: ~32%** (Infrastructure + Auth + Database + Trip CRUD + Realtime + E2E tests complete, activities/votes CRUD pending)
