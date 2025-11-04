-- Migration: 003_enable_realtime.sql
-- Description: Enable Supabase Realtime for tables that need live updates
-- Author: Agent-7
-- Created: 2024
--
-- This migration enables realtime publication for tables that need to
-- broadcast changes to connected clients:
-- - trips: For trip updates (title, status, dates, etc.)
-- - messages: For real-time chat
-- - activities: For activity proposals and updates
-- - votes: For voting on activities

-- Enable realtime for trips table
ALTER PUBLICATION supabase_realtime ADD TABLE trips;

-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Enable realtime for activities table
ALTER PUBLICATION supabase_realtime ADD TABLE activities;

-- Enable realtime for votes table
ALTER PUBLICATION supabase_realtime ADD TABLE votes;

