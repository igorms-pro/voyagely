# Task Assignment: Agent-1 - Database Schema & Supabase Project Setup

## 🎯 Objective

Create Supabase project, design and implement complete database schema matching the Wanderly data model.

## 📋 Task Details

### 1. Supabase Project Setup

- [ ] Go to https://supabase.com and create a new project
- [ ] Project name: `wanderly` (or `wanderly-dev` for development)
- [ ] Choose a region closest to your users
- [ ] Wait for project initialization
- [ ] Get project credentials:
  - Project URL (e.g., `https://xxxxx.supabase.co`)
  - Anon/public key (from Settings > API)
  - Service role key (from Settings > API - keep secret!)

### 2. Update Environment Variables

- [ ] Update `.env.example` with:
  ```bash
  VITE_SUPABASE_URL=your-project-url
  VITE_SUPABASE_ANON_KEY=your-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  ```
- [ ] Create `.env.local` (or `.env`) with actual values (do NOT commit this)

### 3. Database Schema Implementation

**Reference Files:**

- Data model: `src/lib/mock-supabase.ts` (lines 6-68) - See TypeScript interfaces
- Schema design: `docs/wanderly_architecture_design.md` (lines 43-110) - Full schema specification

**Create Migration File:**

- [ ] Create directory: `supabase/migrations/`
- [ ] Create file: `supabase/migrations/001_initial_schema.sql`

### 4. Tables to Create (in order):

#### 4.1 Users/Profiles Table

```sql
-- Note: Supabase Auth handles authentication, but we need a profiles table
-- The auth.users table is provided by Supabase
-- Create profiles table that extends auth.users

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  locale TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_profiles_email ON public.profiles(email) WHERE deleted_at IS NULL;
```

#### 4.2 Trips Table

```sql
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE RESTRICT ON UPDATE CASCADE NOT NULL,
  title TEXT NOT NULL,
  destination_text TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('planned', 'locked', 'archived')),
  budget_cents INTEGER,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,

  CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_trips_owner_id ON public.trips(owner_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_trips_status ON public.trips(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_trips_dates ON public.trips(start_date, end_date) WHERE deleted_at IS NULL;
```

#### 4.3 Trip Members Table

```sql
CREATE TABLE public.trip_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE RESTRICT ON UPDATE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'editor', 'viewer', 'moderator')),
  invited_by UUID REFERENCES auth.users(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  removed_at TIMESTAMPTZ,

  UNIQUE(trip_id, user_id) WHERE removed_at IS NULL
);

ALTER TABLE public.trip_members ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_trip_members_trip_id ON public.trip_members(trip_id) WHERE removed_at IS NULL;
CREATE INDEX idx_trip_members_user_id ON public.trip_members(user_id) WHERE removed_at IS NULL;
CREATE INDEX idx_trip_members_role ON public.trip_members(trip_id, role) WHERE removed_at IS NULL;
```

#### 4.4 Itineraries Table

```sql
CREATE TABLE public.itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  title TEXT,
  generated_by_ai BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_itineraries_trip_id ON public.itineraries(trip_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_itineraries_version ON public.itineraries(trip_id, version) WHERE deleted_at IS NULL;
```

#### 4.5 Itinerary Days Table

```sql
CREATE TABLE public.itinerary_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID REFERENCES public.itineraries(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  day_index INTEGER NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,

  UNIQUE(itinerary_id, day_index) WHERE deleted_at IS NULL
);

ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_itinerary_days_itinerary_id ON public.itinerary_days(itinerary_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_itinerary_days_date ON public.itinerary_days(itinerary_id, day_index) WHERE deleted_at IS NULL;
```

#### 4.6 Activities Table

```sql
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_day_id UUID REFERENCES public.itinerary_days(id) ON DELETE SET NULL ON UPDATE CASCADE,
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  place_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  start_time TIME,
  end_time TIME,
  cost_cents INTEGER,
  currency TEXT DEFAULT 'USD',
  lat DECIMAL(10, 8),
  lon DECIMAL(11, 8),
  status TEXT NOT NULL CHECK (status IN ('proposed', 'confirmed', 'rejected')) DEFAULT 'proposed',
  source TEXT NOT NULL CHECK (source IN ('manual', 'ai', 'import')) DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,

  CONSTRAINT valid_time_range CHECK (end_time IS NULL OR start_time IS NULL OR end_time >= start_time)
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_activities_trip_id ON public.activities(trip_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_activities_day_id ON public.activities(itinerary_day_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_activities_status ON public.activities(trip_id, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_activities_created ON public.activities(trip_id, created_at) WHERE deleted_at IS NULL;
```

#### 4.7 Votes Table

```sql
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  choice TEXT NOT NULL CHECK (choice IN ('up', 'down')),
  idempotency_key TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(activity_id, user_id)
);

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_votes_activity_id ON public.votes(activity_id);
CREATE INDEX idx_votes_user_id ON public.votes(user_id);
CREATE INDEX idx_votes_created ON public.votes(activity_id, created_at);
```

#### 4.8 Messages Table

```sql
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('text', 'system', 'attachment')) DEFAULT 'text',
  client_msg_id TEXT,
  reply_to UUID REFERENCES public.messages(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_messages_trip_id ON public.messages(trip_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_messages_created ON public.messages(trip_id, created_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_messages_user_id ON public.messages(user_id) WHERE deleted_at IS NULL;
```

#### 4.9 Invitations Table

```sql
CREATE TABLE public.invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  inviter_id UUID REFERENCES auth.users(id) NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ,
  max_uses INTEGER DEFAULT 1,
  used_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_invitations_trip_id ON public.invitations(trip_id);
CREATE INDEX idx_invitations_code ON public.invitations(invite_code);
CREATE INDEX idx_invitations_expires ON public.invitations(expires_at) WHERE expires_at > NOW();
```

#### 4.10 Audit Logs Table (Optional but recommended)

```sql
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users(id),
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  action TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_audit_logs_actor ON public.audit_logs(actor_id);
CREATE INDEX idx_audit_logs_target ON public.audit_logs(target_type, target_id);
CREATE INDEX idx_audit_logs_created ON public.audit_logs(created_at);
```

### 5. Functions and Triggers

#### 5.1 Updated At Trigger

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_itineraries_updated_at BEFORE UPDATE ON public.itineraries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_itinerary_days_updated_at BEFORE UPDATE ON public.itinerary_days
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON public.messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### 5.2 Auto-create Profile on User Signup

```sql
-- Function to create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

#### 5.3 Auto-add Owner as Trip Member

```sql
-- Function to add owner as trip member
CREATE OR REPLACE FUNCTION public.handle_new_trip()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.trip_members (trip_id, user_id, role)
  VALUES (NEW.id, NEW.owner_id, 'owner');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on trips insert
CREATE TRIGGER on_trip_created
  AFTER INSERT ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_trip();
```

### 6. Testing the Migration

- [ ] Run migration in Supabase SQL Editor:
  - Go to SQL Editor in Supabase dashboard
  - Paste the entire migration
  - Execute
  - Verify all tables created
  - Verify indexes created
  - Verify triggers created

### 7. Documentation

- [ ] Update `README.md` with Supabase setup instructions
- [ ] Document the schema in `docs/DATABASE_SCHEMA.md` (create if needed)

## 📁 Files to Create/Modify

**Create:**

- `supabase/migrations/001_initial_schema.sql` - Complete schema migration

**Modify:**

- `.env.example` - Add Supabase variables
- `README.md` - Add Supabase setup section (optional)

## ✅ Deliverables Checklist

- [ ] Supabase project created and credentials obtained
- [ ] Migration file created with all tables
- [ ] All indexes created
- [ ] All triggers and functions created
- [ ] Migration tested in Supabase SQL Editor
- [ ] `.env.example` updated
- [ ] Credentials shared with Lead Agent (for Agent-2)

## 🔗 Reference Files

- **Data Model:** `src/lib/mock-supabase.ts` (TypeScript interfaces)
- **Schema Design:** `docs/wanderly_architecture_design.md` (lines 43-110)
- **TypeScript Types:** See interfaces in `mock-supabase.ts`:
  - `User` (lines 6-12)
  - `Trip` (lines 14-26)
  - `TripMember` (lines 28-34)
  - `Activity` (lines 36-51)
  - `Vote` (lines 53-59)
  - `Message` (lines 61-68)

## 📝 Notes

- Supabase Auth provides `auth.users` table automatically
- We extend it with `public.profiles` for additional user data
- All tables use UUID primary keys with `gen_random_uuid()`
- Soft deletes use `deleted_at` timestamp (NULL = not deleted)
- Foreign keys use appropriate CASCADE/RESTRICT rules per architecture doc
- RLS policies will be added by Agent-3 (this task is schema only)

## 🧪 Testing

Before submitting:

- [ ] Run migration in Supabase SQL Editor - must succeed
- [ ] Verify all tables visible in Table Editor
- [ ] Check that indexes are created
- [ ] Verify triggers work (create a test trip, check owner auto-added)

---

**Branch:** `agent-1/database-schema`  
**Dependencies:** None  
**Blocking:** Agent-2 (needs Supabase project), Agent-3 (needs schema)
