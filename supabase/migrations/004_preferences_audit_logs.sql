-- Migration: 004_preferences_audit_logs.sql
-- Description: Add preferences and audit_logs tables for user preferences and audit trail
-- Author: Issue #2 - Phase 1
-- Created: 2025-01-XX
-- Dependencies: 001_initial_schema.sql

-- ============================================================================
-- PREFERENCES TABLE
-- ============================================================================
-- Store user preferences (theme, language, notifications, etc.)
-- Using JSONB for flexibility to add new preferences without schema changes
create table if not exists public.preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- One preference per user per key
  UNIQUE(user_id, key)
);

-- Enable RLS
alter table public.preferences enable row level security;

-- Indexes
create index if not exists idx_preferences_user_id on public.preferences(user_id);
create index if not exists idx_preferences_key on public.preferences(user_id, key);
create index if not exists idx_preferences_created on public.preferences(user_id, created_at);

-- ============================================================================
-- AUDIT LOGS TABLE
-- ============================================================================
-- Track important user actions for debugging, compliance, and analytics
create table if not exists public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  action_type TEXT NOT NULL, -- e.g., 'trip_created', 'activity_voted', 'profile_updated'
  resource_type TEXT, -- e.g., 'trip', 'activity', 'profile'
  resource_id UUID, -- ID of the affected resource
  metadata JSONB, -- Additional context (IP address, user agent, etc.)
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
alter table public.audit_logs enable row level security;

-- Indexes for common queries
create index if not exists idx_audit_logs_user_id on public.audit_logs(user_id);
create index if not exists idx_audit_logs_action_type on public.audit_logs(action_type);
create index if not exists idx_audit_logs_resource on public.audit_logs(resource_type, resource_id);
create index if not exists idx_audit_logs_created on public.audit_logs(created_at DESC);
-- Composite index for user activity queries
create index if not exists idx_audit_logs_user_created on public.audit_logs(user_id, created_at DESC);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Apply updated_at trigger to preferences
create trigger update_preferences_updated_at 
  BEFORE UPDATE on public.preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- COMMENTS (Documentation)
-- ============================================================================

comment on table public.preferences IS 'User preferences stored as key-value pairs with JSONB values for flexibility';
comment on table public.audit_logs IS 'Audit trail of user actions for debugging, compliance, and analytics';
comment on column public.preferences.key IS 'Preference key (e.g., "theme", "language", "notifications")';
comment on column public.preferences.value IS 'Preference value as JSONB (can be string, number, boolean, object, array)';
comment on column public.audit_logs.action_type IS 'Type of action performed (e.g., "trip_created", "activity_voted")';
comment on column public.audit_logs.resource_type IS 'Type of resource affected (e.g., "trip", "activity", "profile")';
comment on column public.audit_logs.resource_id IS 'UUID of the affected resource';
comment on column public.audit_logs.metadata IS 'Additional context as JSONB (IP, user agent, request details, etc.)';



