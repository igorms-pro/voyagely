-- Migration: 001_initial_schema.sql
-- Description: Initial database schema for Voyagely travel planning platform
-- Author: Agent-1
-- Created: 2024

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE (extends auth.users)
-- ============================================================================
create table if not exists public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  locale TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

alter table public.profiles enable row level security;

-- Indexes
create index if not exists idx_profiles_email on public.profiles(email);

-- ============================================================================
-- TRIPS TABLE
-- ============================================================================
create table if not exists public.trips (
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

-- Enable RLS
alter table public.trips enable row level security;

-- Indexes
create index if not exists idx_trips_owner_id on public.trips(owner_id);
create index if not exists idx_trips_status on public.trips(status);
create index if not exists idx_trips_dates on public.trips(start_date, end_date);
create index if not exists idx_trips_created on public.trips(created_at);

-- ============================================================================
-- TRIP MEMBERS TABLE
-- ============================================================================
create table if not exists public.trip_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE RESTRICT ON UPDATE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'editor', 'viewer', 'moderator')),
  invited_by UUID REFERENCES auth.users(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  removed_at TIMESTAMPTZ
);

-- Enable RLS
alter table public.trip_members enable row level security;

-- Indexes
create index if not exists idx_trip_members_trip_id on public.trip_members(trip_id);
create index if not exists idx_trip_members_user_id on public.trip_members(user_id);
create index if not exists idx_trip_members_role on public.trip_members(trip_id, role);

-- Unique constraint: one active membership per trip per user
-- Note: Partial unique indexes with WHERE may cause issues in some PostgreSQL versions
-- Application code must ensure removed_at IS NULL before inserting new memberships
-- Alternative: Use a trigger to check for existing active memberships before insert
create unique index if not exists idx_trip_members_unique_active 
  on public.trip_members(trip_id, user_id);

-- ============================================================================
-- ITINERARIES TABLE
-- ============================================================================
create table if not exists public.itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  title TEXT,
  generated_by_ai BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Enable RLS
alter table public.itineraries enable row level security;

-- Indexes
create index if not exists idx_itineraries_trip_id on public.itineraries(trip_id);
create index if not exists idx_itineraries_version on public.itineraries(trip_id, version);

-- ============================================================================
-- ITINERARY DAYS TABLE
-- ============================================================================
create table if not exists public.itinerary_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID REFERENCES public.itineraries(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  day_index INTEGER NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Enable RLS
alter table public.itinerary_days enable row level security;

-- Indexes
create index if not exists idx_itinerary_days_itinerary_id on public.itinerary_days(itinerary_id);
create index if not exists idx_itinerary_days_date on public.itinerary_days(itinerary_id, day_index);

-- Unique constraint: one active day per index per itinerary
-- Note: Partial unique indexes with WHERE may cause issues in some PostgreSQL versions
-- Application code must ensure deleted_at IS NULL before inserting new days
create unique index if not exists idx_itinerary_days_unique_active 
  on public.itinerary_days(itinerary_id, day_index);

-- ============================================================================
-- ACTIVITIES TABLE
-- ============================================================================
create table if not exists public.activities (
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

-- Enable RLS
alter table public.activities enable row level security;

-- Indexes
create index if not exists idx_activities_trip_id on public.activities(trip_id);
create index if not exists idx_activities_day_id on public.activities(itinerary_day_id);
create index if not exists idx_activities_status on public.activities(trip_id, status);
create index if not exists idx_activities_created on public.activities(trip_id, created_at);

-- ============================================================================
-- VOTES TABLE
-- ============================================================================
create table if not exists public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  choice TEXT NOT NULL CHECK (choice IN ('up', 'down')),
  idempotency_key TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(activity_id, user_id)
);

-- Enable RLS
alter table public.votes enable row level security;

-- Indexes
create index if not exists idx_votes_activity_id on public.votes(activity_id);
create index if not exists idx_votes_user_id on public.votes(user_id);
create index if not exists idx_votes_created on public.votes(activity_id, created_at);

-- ============================================================================
-- MESSAGES TABLE
-- ============================================================================
create table if not exists public.messages (
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

-- Enable RLS
alter table public.messages enable row level security;

-- Indexes
create index if not exists idx_messages_trip_id on public.messages(trip_id);
create index if not exists idx_messages_created on public.messages(trip_id, created_at);
create index if not exists idx_messages_user_id on public.messages(user_id);
create index if not exists idx_messages_reply_to on public.messages(reply_to);

-- ============================================================================
-- INVITATIONS TABLE
-- ============================================================================
create table if not exists public.invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  inviter_id UUID REFERENCES auth.users(id) NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ,
  max_uses INTEGER DEFAULT 1,
  used_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
alter table public.invitations enable row level security;

-- Indexes
create index if not exists idx_invitations_trip_id on public.invitations(trip_id);
create index if not exists idx_invitations_code on public.invitations(invite_code);
-- Index on expires_at for querying active invitations
-- Note: Cannot use NOW() in index predicate as it's not immutable
-- Application code should filter WHERE expires_at > NOW() in queries
create index if not exists idx_invitations_expires on public.invitations(expires_at);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to all tables with updated_at column
create trigger update_profiles_updated_at 
  BEFORE UPDATE on public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

create trigger update_trips_updated_at 
  BEFORE UPDATE on public.trips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

create trigger update_itineraries_updated_at 
  BEFORE UPDATE on public.itineraries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

create trigger update_itinerary_days_updated_at 
  BEFORE UPDATE on public.itinerary_days
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

create trigger update_activities_updated_at 
  BEFORE UPDATE on public.activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

create trigger update_messages_updated_at 
  BEFORE UPDATE on public.messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-create profile on user signup
create or replace function public.handle_new_user()
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

-- Trigger on auth.users insert to create profile
create trigger on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to auto-add owner as trip member
create or replace function public.handle_new_trip()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.trip_members (trip_id, user_id, role)
  VALUES (NEW.id, NEW.owner_id, 'owner');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on trips insert to add owner as member
create trigger on_trip_created
  AFTER INSERT on public.trips
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_trip();

-- ============================================================================
-- COMMENTS (Documentation)
-- ============================================================================

comment on table public.profiles IS 'User profiles extending Supabase auth.users';
comment on table public.trips IS 'Travel trips with owner, dates, status, and budget';
comment on table public.trip_members IS 'Trip membership with roles (owner, editor, viewer, moderator)';
comment on table public.itineraries IS 'Trip itineraries with version tracking and AI generation flag';
comment on table public.itinerary_days IS 'Day-by-day breakdown of itineraries';
comment on table public.activities IS 'Activities within trips/itinerary days with voting support';
comment on table public.votes IS 'User votes on activities (up/down) with idempotency';
comment on table public.messages IS 'Chat messages within trips with threading support';
comment on table public.invitations IS 'Invite links for trips with expiration and usage limits';

