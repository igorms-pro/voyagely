# Voyagely: Product & Development Roadmap (V2)

**Last Updated:** January 2025  
**Status:** Active Development – Early Product Phase (Free)

---

## Product Vision

**"The Group Decision & Planning Platform for Travel."**

Voyagely helps groups design, decide, and coordinate their trips through constraint-based planning, democratic decision-making, real-time collaboration, and AI that understands group dynamics.

---

## Product Principles

1. **Group-First:** Every feature must serve group collaboration
2. **Constraints-First:** Budget, children, preferences, pace, and logistics are not options—they're the foundation
3. **Decision-Focused:** The goal isn't just to plan, but to decide together (scenarios, votes)
4. **Real-Time & Offline-Friendly:** Smooth collaboration, even with poor networks, thanks to real-time and offline PWA capabilities
5. **Financially Integrated:** Group expenses (Tricount-like) are part of the trip, not a separate tool

---

## Current Status

### ✅ Completed (Infrastructure Phase)

**Technical Foundation:**

- [x] Vite + React + TypeScript project template
- [x] i18n (21 languages), dark/light theme
- [x] Testing infrastructure (Vitest + Playwright)
- [x] Monitoring & analytics (Sentry + PostHog)
- [x] CI/CD pipeline
- [x] Supabase project setup
- [x] Database schema and RLS policies
- [x] Real-time infrastructure (Supabase Realtime)

**Product Foundation:**

- [x] Create trips
- [x] View basic trip dashboard
- [x] Authentication and user profiles

### 🔴 In Progress

- [ ] Trip CRUD operations (edit/delete, settings)
- [ ] Constraint engine (budget, children, preferences, pace, must-dos)
- [ ] Activities CRUD
- [ ] Voting system (activities + scenarios Day 1 vs Day 2)
- [ ] Real-time chat (messages, presence)
- [ ] Group expense tracking (moved to Phase 2)
- [ ] First AI itinerary generation pass (constraints-aware)

---

## Phase 1: MVP Core – "Plan & Decide Together" (Months 1–3)

**Goal:** Launch a 100% free beta where a group can define constraints, generate AI scenarios, and vote to decide their trip plan.

### Month 1: Trip & Constraints Foundation

**Product Features:**

- [ ] Edit/delete trips
- [ ] Trip settings (dates, destination, total budget + per person, group size, presence of children)
- [ ] Constraint engine v1 (optional but strongly recommended):
  - Budget (total / per person) - optional
  - Children / seniors flags - optional
  - Preferences (nature, culture, nightlife, chill, must-dos) - optional
  - Pace (chill / normal / intense) - optional
- [ ] User profiles with basic preferences
- [ ] UI prompts to encourage constraint input (better AI results)

**Technical Implementation:**

- [ ] Complete trip CRUD
- [ ] Constraint data model (trip + members)
- [ ] Client and server-side constraint validation
- [ ] Updated trip dashboard to show constraints summary

### Month 2: Activities, Scenarios & Voting

**Product Features:**

- [ ] **Human-created activities**: Anyone can add activities manually
  - Example: "I want to see whales on Thursday at 6pm"
  - Add activity with: title, description, day, time, location, cost
  - **During planning phase**: Anyone can edit/delete their own activities
  - **After itinerary is finalized**: Only admins (owner, editor, moderator) can add/remove/edit activities
- [ ] **Human-created scenarios**: Anyone can create a complete day-by-day plan
  - Build a scenario manually (Day 1: activity A, B, C / Day 2: activity D, E)
  - Save as a scenario option for the group to vote on
- [ ] **AI-generated activities & scenarios**: AI can also propose (see Month 3)
- [ ] Day-by-day timeline view (Day 1, Day 2, etc.)
- [ ] Activity status: proposed → confirmed / rejected
- [ ] "Must-have" / "no-go" markers on each activity
- [ ] **Voting system**: Real people vote on:
  - Individual activities (human-created OR AI-generated)
  - Complete day-by-day scenarios (human-created OR AI-generated)
  - **Everyone can vote** (owner, editor, viewer, moderator)
- [ ] Simple "decision view" to see what's validated / rejected
- [ ] Real-time vote updates (see votes as they happen)
- [ ] **Itinerary management after decision**:
  - Once itinerary is finalized (after voting), **admins (owner, editor, moderator) can**:
    - Add new activities
    - Remove activities
    - Edit activities
    - Reorganize the itinerary
  - **Everyone can still vote** on changes

**Technical Implementation:**

- [ ] Activities & votes data models
- [ ] Real-time updates for votes and activities (Supabase Realtime)
- [ ] Activity & scenario voting UI
- [ ] Real-time chat (messages, presence) to discuss options
- [ ] **Role-based permissions**:
  - Owner, Editor, Moderator: can add/remove/edit activities in finalized itinerary
  - Viewer: can only view and vote
  - Everyone: can vote on all activities/scenarios

### Month 3: AI & Context-Aware Planning

**Product Features:**

- [ ] **AI itinerary generation**: AI can generate 2–3 day-by-day scenarios per trip (optional)
  - Uses constraints if provided (budget, pace, children, must-dos) for better results
  - Works without constraints but with less precision
  - Each scenario is a complete day-by-day plan
  - **AI scenarios are added alongside human-created scenarios** - group votes on all options
- [ ] **AI activity suggestions**: AI can suggest individual activities based on destination/constraints
  - These appear as proposals alongside human-created activities
  - Group votes on all activities (human + AI)
- [ ] Context-aware suggestions v1 (approximate travel time, simple opening hours, basic fatigue logic)
- [ ] Simple itinerary editing (drag/drop, add/remove activities)
  - **Admin permissions**: Only owner, editor, moderator can modify finalized itinerary
  - **Everyone can vote** on itinerary changes
- [ ] Basic weather integration (forecast display)
- [ ] Places/POI data integration (for activity suggestions)
- [ ] **Workflow**: Humans create activities/scenarios + AI proposes → Group votes on everything → Decision made

**Technical Implementation:**

- [ ] AI integration (OpenAI or equivalent) with constraints-aware prompts + schema validation
- [ ] Basic Places / route time estimation (Google / other)
- [ ] Weather API integration (OpenWeatherMap or similar)
- [ ] Places API integration (Google Places or similar)
- [ ] Mobile responsiveness
- [ ] Beta testing with travel communities

**MVP Success Criteria:**

- At least 50 complete groups that:
  - Create a trip (with or without constraints - constraints optional but recommended)
  - **Humans create activities/scenarios** (e.g., "whales on Thursday at 6pm")
  - **AI can also generate scenarios** (optional, 2-3 day-by-day options)
  - **Real people vote** on all options (human-created + AI-generated scenarios/activities)
  - Make decisions together through democratic voting
- > 70% of members participate in at least one vote or action
- > 50% of groups make decisions through voting (human or AI proposals)
- Core value validated: groups can plan and decide together without chaos
- **Speed validation**: MVP delivered quickly to test core value proposition

---

## Phase 2: Experience & Reliability – "Use It On The Road" (Months 4–6)

**Goal:** Make Voyagely usable during the trip itself, with offline, solid PWA, and complete expenses.

### Month 4: Expenses & Logistics

**Product Features:**

- [ ] Group expense tracking MVP (Tricount-like):
  - Add an expense (paid by / for whom)
  - Calculate "who owes whom"
  - View balances per person
  - Simple expense exports (CSV/PDF)
- [ ] Expense categories and notes
- [ ] Aggregated view by day or by category (accommodation, transport, food, activities)
- [ ] Automatic currency conversion (FX API)
- [ ] Simple route optimization (order activities to minimize travel time)

**Technical Implementation:**

- [ ] Expense data model & simple splitting algorithm (Tricount-like baseline)
- [ ] "Settle up" algorithm (minimize number of reimbursements)
- [ ] Currency conversion API integration
- [ ] Basic routing API integration (travel durations)
- [ ] UI/UX for expenses and routes integrated into itinerary

### Month 5: PWA, Offline & Mobile UX

**Product Features:**

- [ ] Fully featured PWA: add to home screen, splash screen, etc.
- [ ] Offline access to trips, itineraries, expenses, votes (read-only)
- [ ] Offline action queue (add expense / vote / message offline → sync on reconnection)
- [ ] Typing indicators, message reactions, @mentions in chat
- [ ] Notification preferences (emails / push later)

**Technical Implementation:**

- [ ] Service worker + strategic caching (layout + critical data)
- [ ] Offline queue (IndexedDB) + background sync to send actions when network returns
- [ ] Mobile performance tuning (First Load, list virtualization)
- [ ] Possibly native app shell (Capacitor/Expo) if deeper device access needed

### Month 6: Templates & Sharing

**Product Features:**

- [ ] Trip templates (e.g., "3 days in Lisbon with friends", "7-day family road trip")
- [ ] Duplicate an existing trip as a base
- [ ] Trip sharing links (read-only / participation mode)
- [ ] Complete timezone support for international groups
- [ ] Global budget tracking (forecast vs actual)

**Technical Implementation:**

- [ ] Template system (store, clone)
- [ ] Secure sharing links with scopes (view vs edit)
- [ ] Timezone handling (store in UTC + local display)
- [ ] Budget views (forecast vs actual expenses)

**Phase 2 Success Criteria:**

- 1,000+ active users, 500+ trips/month
- At least 30–40% of trips use expense tracking (when available)
- Qualitative feedback showing Voyagely is used **during** the trip, not just before
- PWA and offline features enable real on-the-road usage

---

## Phase 3: Intelligence & Teams – "Trips That Everyone Loves" (Months 7–12)

**Goal:** Strengthen AI, introduce light team / B2B features, and prepare for a future paid model.

### Months 7–9: Advanced Group Intelligence

**Product Features:**

- [ ] AI learning over time: system learns preferences of recurring groups (family, team)
- [ ] Conflict-resolution suggestions ("scenario B sacrifices X but allows Y")
- [ ] Destination / activity recommendations based on group history
- [ ] Smart reminders (deadlines, undecided decisions)
- [ ] Stable calendar export (Google Calendar, iCal)
- [ ] Clean PDF exports (itinerary + expenses)

**Technical Implementation:**

- [ ] Internal models to store preferences and outcomes (what was accepted)
- [ ] Calendar API integrations
- [ ] Solid PDF generation (investor-friendly docs or simple sharing)
- [ ] Event / analytics pipeline to feed AI with implicit feedback

### Months 10–12: Teams & Pre-monetization

**Product Features:**

- [ ] Team spaces (families, recurring friend groups, teams)
- [ ] Roles (admin / editor / viewer)
- [ ] Basic admin controls for offsites (max budget, validation)
- [ ] Simple trip analytics (participation, expenses, budget adherence)
- [ ] Early "Pro" switch **disabled by default** (to experiment on a small segment later)

**Technical Implementation:**

- [ ] Models for organizations / teams
- [ ] Granular permissions
- [ ] Basic analytics dashboard (per trip, per team)
- [ ] Safeguards to enable a future paid plan without breaking existing features

**Phase 3 Success Criteria:**

- 10,000+ active users, 5,000+ trips/month
- Strong retention on recurring groups (families, teams)
- Sufficient data to define a realistic paid model (features actually used / perceived as "premium")

---

## Technical Priorities (V2)

### Must-Have for MVP (Phase 1)

1. Constraint engine (budget, children, preferences, pace, must-dos) - **optional but strongly recommended** (better AI results)
2. Real-time collaboration (chat, presence, votes, activities)
3. Voting system: **real people vote** on scenarios (Day 1/2) + individual activities
4. AI itinerary generation: **AI proposes** 2-3 scenarios, **humans vote** to decide
5. Basic context awareness (travel time, weather, opening hours)
6. Simple itinerary editing and management

### Should-Have (Phase 2+)

1. Group expense tracking (Tricount-like) - **moved from MVP to Phase 2**
2. PWA + reliable offline
3. Optimized mobile experience
4. Advanced expenses + smart "settle up"
5. Templates and trip sharing

### Nice-to-Have (Phase 3+)

1. Advanced AI learning & conflict suggestions
2. Team / B2B features
3. Booking deep links (affiliates) without becoming a booking platform
4. Advanced analytics and public API

---

## Feature Backlog (Future Considerations)

### Under Evaluation

- [ ] Multi-language trip planning
- [ ] AR/VR destination previews
- [ ] Voice assistant integration
- [ ] Blockchain for trip verification
- [ ] NFT trip memories

**Note:** These are ideas, not commitments. Will be evaluated based on user demand and strategic fit.

---

## Feature Deprioritization

### Explicitly NOT Building (For Now)

**Booking Platform**

- Full flight/hotel booking integration
- Payment processing
- Inventory management
- **Reason:** We're a planning tool, not a booking platform

**Solo Travel Features**

- Individual trip planning
- Personal recommendations
- **Reason:** We're group-focused

**Social Network**

- User profiles beyond trip context
- Follow/friend system
- **Reason:** We're a tool, not a social platform

**Content Platform**

- Travel blogs
- User-generated guides
- **Reason:** We plan, we don't create content

---

## Risk Mitigation

### Technical Risks

- **AI Quality:** Schema validation, human review workflows, fallback to manual planning
- **Real-Time Reliability:** Supabase enterprise infrastructure, connection retry logic
- **API Dependencies:** Multiple fallback providers, aggressive caching, circuit breakers
- **Cost Management:** Monitor AI API costs, implement rate limiting and caching
- **Offline Sync:** Robust conflict resolution, clear user feedback on sync status

### Business Risks

- **Market Adoption:** Beta testing, user research, iterate based on feedback
- **Competition:** First-mover advantage, focus on group collaboration and constraints
- **Monetization:** Start 100% free, validate usage, then introduce paid features based on real demand and usage patterns

---

## User Value Progression

### MVP Value (Phase 1)

**"Groups can plan and decide together without chaos"**

- Constraint-aware planning (budget, children, preferences, pace)
- Democratic decision-making (voting on day-by-day scenarios and individual activities)
- Real-time coordination (chat, presence)
- AI assistance with group dynamics
- Integrated expense tracking from the start

### Phase 2 Value

**"Groups can use Voyagely on the road"**

- Offline-first PWA experience
- Enhanced collaboration (typing, reactions, mentions)
- Complete expense management with settle-up
- Mobile-optimized for use during trips

### Phase 3 Value

**"Groups can plan trips that everyone loves"**

- Advanced AI learning from group history
- Team features for recurring groups
- Analytics and insights
- Comprehensive integrations

---

**See Also:**

- [API Integration Roadmap](./api-integration-roadmap.md) - Detailed API strategy
- [Go-to-Market Roadmap](./gtm-roadmap.md) - Growth strategy
- [Executive Summary](../EXECUTIVE_SUMMARY.md) - Product vision and business overview
- [Issues Tracker](../issues/ISSUES.md) - Detailed task breakdown
