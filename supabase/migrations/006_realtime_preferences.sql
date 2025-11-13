-- Migration: 006_realtime_preferences.sql
-- Description: Enable Supabase Realtime for preferences table (optional)
-- Author: Issue #2 - Phase 1
-- Created: 2025-01-XX
-- Dependencies: 004_preferences_audit_logs.sql
--
-- Note: This is optional. Preferences typically don't need real-time updates
-- unless you want to sync preferences across multiple devices/tabs.
-- Uncomment if you need real-time preference synchronization.

-- Enable realtime for preferences table (optional)
-- ALTER PUBLICATION supabase_realtime ADD TABLE preferences;

-- Note: We do NOT enable realtime for audit_logs as they are write-only
-- and should not be broadcast to clients for security/privacy reasons.



