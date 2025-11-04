-- Migration: 002_rls_policies.sql
-- Description: Row Level Security (RLS) policies for all database tables
-- Author: Agent-3
-- Created: 2024
-- Dependencies: 001_initial_schema.sql

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to check if user is a member of a trip
CREATE OR REPLACE FUNCTION public.is_trip_member(trip_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.trip_members
    WHERE trip_id = trip_uuid
      AND user_id = user_uuid
      AND removed_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's role in a trip
CREATE OR REPLACE FUNCTION public.get_trip_role(trip_uuid UUID, user_uuid UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role FROM public.trip_members
    WHERE trip_id = trip_uuid
      AND user_id = user_uuid
      AND removed_at IS NULL
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can write to trip
CREATE OR REPLACE FUNCTION public.can_write_trip(trip_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  trip_owner UUID;
  user_role TEXT;
BEGIN
  -- Check if user is owner
  SELECT owner_id INTO trip_owner FROM public.trips WHERE id = trip_uuid;
  IF trip_owner = user_uuid THEN
    RETURN TRUE;
  END IF;
  
  -- Check if user has editor or moderator role
  SELECT role INTO user_role FROM public.trip_members
  WHERE trip_id = trip_uuid
    AND user_id = user_uuid
    AND removed_at IS NULL;
  
  -- Return FALSE if user_role is NULL (user not a member) or if role is not editor/moderator
  RETURN COALESCE(user_role IN ('editor', 'moderator'), FALSE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- PROFILES TABLE POLICIES
-- ============================================================================

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (handled by trigger, but allow)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- TRIPS TABLE POLICIES
-- ============================================================================

-- Users can view trips they are members of
CREATE POLICY "Trip members can view trips"
  ON public.trips FOR SELECT
  USING (
    auth.uid() = owner_id 
    OR public.is_trip_member(id, auth.uid())
  );

-- Owners and editors/moderators can update trips
CREATE POLICY "Owners and editors can update trips"
  ON public.trips FOR UPDATE
  USING (public.can_write_trip(id, auth.uid()))
  WITH CHECK (public.can_write_trip(id, auth.uid()));

-- Owners can delete trips (soft delete via deleted_at)
-- Note: This policy allows owners to set deleted_at, but regular updates are handled by "Owners and editors can update trips" policy
CREATE POLICY "Owners can delete trips"
  ON public.trips FOR UPDATE
  USING (auth.uid() = owner_id AND deleted_at IS NULL)
  WITH CHECK (deleted_at IS NOT NULL);

-- Anyone authenticated can create trips (will be owner)
CREATE POLICY "Authenticated users can create trips"
  ON public.trips FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- ============================================================================
-- TRIP MEMBERS TABLE POLICIES
-- ============================================================================

-- Users can view members of trips they belong to
CREATE POLICY "Members can view trip members"
  ON public.trip_members FOR SELECT
  USING (
    auth.uid() = user_id 
    OR public.is_trip_member(trip_id, auth.uid())
  );

-- Owners and moderators can insert members
CREATE POLICY "Owners and moderators can add members"
  ON public.trip_members FOR INSERT
  WITH CHECK (
    auth.uid() = (
      SELECT owner_id FROM public.trips WHERE id = trip_id
    )
    OR public.get_trip_role(trip_id, auth.uid()) = 'moderator'
  );

-- Owners and moderators can update roles
CREATE POLICY "Owners and moderators can update roles"
  ON public.trip_members FOR UPDATE
  USING (
    auth.uid() = (
      SELECT owner_id FROM public.trips WHERE id = trip_id
    )
    OR public.get_trip_role(trip_id, auth.uid()) = 'moderator'
  )
  WITH CHECK (
    auth.uid() = (
      SELECT owner_id FROM public.trips WHERE id = trip_id
    )
    OR public.get_trip_role(trip_id, auth.uid()) = 'moderator'
  );

-- Owners and moderators can remove members (soft delete via removed_at)
CREATE POLICY "Owners and moderators can remove members"
  ON public.trip_members FOR UPDATE
  USING (
    auth.uid() = (
      SELECT owner_id FROM public.trips WHERE id = trip_id
    )
    OR public.get_trip_role(trip_id, auth.uid()) = 'moderator'
  )
  WITH CHECK (
    (auth.uid() = (
      SELECT owner_id FROM public.trips WHERE id = trip_id
    )
    OR public.get_trip_role(trip_id, auth.uid()) = 'moderator')
    AND removed_at IS NOT NULL
  );

-- ============================================================================
-- ITINERARIES TABLE POLICIES
-- ============================================================================

-- Trip members can view itineraries
CREATE POLICY "Trip members can view itineraries"
  ON public.itineraries FOR SELECT
  USING (public.is_trip_member(trip_id, auth.uid()));

-- Editors, moderators, and owners can create itineraries
CREATE POLICY "Writers can create itineraries"
  ON public.itineraries FOR INSERT
  WITH CHECK (
    public.can_write_trip(trip_id, auth.uid())
  );

-- Editors, moderators, and owners can update itineraries
CREATE POLICY "Writers can update itineraries"
  ON public.itineraries FOR UPDATE
  USING (public.can_write_trip(trip_id, auth.uid()))
  WITH CHECK (public.can_write_trip(trip_id, auth.uid()));

-- Editors, moderators, and owners can delete itineraries (soft delete)
CREATE POLICY "Writers can delete itineraries"
  ON public.itineraries FOR UPDATE
  USING (public.can_write_trip(trip_id, auth.uid()))
  WITH CHECK (
    public.can_write_trip(trip_id, auth.uid())
    AND deleted_at IS NOT NULL
  );

-- ============================================================================
-- ITINERARY DAYS TABLE POLICIES
-- ============================================================================

-- Trip members can view itinerary days
CREATE POLICY "Trip members can view itinerary days"
  ON public.itinerary_days FOR SELECT
  USING (
    public.is_trip_member(
      (SELECT trip_id FROM public.itineraries WHERE id = itinerary_id),
      auth.uid()
    )
  );

-- Writers can create itinerary days
CREATE POLICY "Writers can create itinerary days"
  ON public.itinerary_days FOR INSERT
  WITH CHECK (
    public.can_write_trip(
      (SELECT trip_id FROM public.itineraries WHERE id = itinerary_id),
      auth.uid()
    )
  );

-- Writers can update itinerary days
CREATE POLICY "Writers can update itinerary days"
  ON public.itinerary_days FOR UPDATE
  USING (
    public.can_write_trip(
      (SELECT trip_id FROM public.itineraries WHERE id = itinerary_id),
      auth.uid()
    )
  )
  WITH CHECK (
    public.can_write_trip(
      (SELECT trip_id FROM public.itineraries WHERE id = itinerary_id),
      auth.uid()
    )
  );

-- Writers can delete itinerary days (soft delete)
CREATE POLICY "Writers can delete itinerary days"
  ON public.itinerary_days FOR UPDATE
  USING (
    public.can_write_trip(
      (SELECT trip_id FROM public.itineraries WHERE id = itinerary_id),
      auth.uid()
    )
  )
  WITH CHECK (
    public.can_write_trip(
      (SELECT trip_id FROM public.itineraries WHERE id = itinerary_id),
      auth.uid()
    )
    AND deleted_at IS NOT NULL
  );

-- ============================================================================
-- ACTIVITIES TABLE POLICIES
-- ============================================================================

-- Trip members can view activities
CREATE POLICY "Trip members can view activities"
  ON public.activities FOR SELECT
  USING (public.is_trip_member(trip_id, auth.uid()));

-- Editors, moderators, and owners can insert activities
CREATE POLICY "Writers can create activities"
  ON public.activities FOR INSERT
  WITH CHECK (
    public.can_write_trip(trip_id, auth.uid())
  );

-- Editors, moderators, and owners can update activities
CREATE POLICY "Writers can update activities"
  ON public.activities FOR UPDATE
  USING (public.can_write_trip(trip_id, auth.uid()))
  WITH CHECK (public.can_write_trip(trip_id, auth.uid()));

-- Editors, moderators, and owners can delete activities (soft delete)
CREATE POLICY "Writers can delete activities"
  ON public.activities FOR UPDATE
  USING (public.can_write_trip(trip_id, auth.uid()))
  WITH CHECK (
    public.can_write_trip(trip_id, auth.uid())
    AND deleted_at IS NOT NULL
  );

-- ============================================================================
-- VOTES TABLE POLICIES
-- ============================================================================

-- Trip members can view votes
CREATE POLICY "Trip members can view votes"
  ON public.votes FOR SELECT
  USING (
    public.is_trip_member(
      (SELECT trip_id FROM public.activities WHERE id = activity_id),
      auth.uid()
    )
  );

-- Trip members can create their own votes
CREATE POLICY "Members can vote"
  ON public.votes FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND public.is_trip_member(
      (SELECT trip_id FROM public.activities WHERE id = activity_id),
      auth.uid()
    )
  );

-- Users can update their own votes
CREATE POLICY "Users can update own votes"
  ON public.votes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Moderators and owners can delete votes
CREATE POLICY "Moderators can delete votes"
  ON public.votes FOR DELETE
  USING (
    auth.uid() = (
      SELECT owner_id FROM public.trips 
      WHERE id = (
        SELECT trip_id FROM public.activities 
        WHERE id = activity_id
      )
    )
    OR public.get_trip_role(
      (SELECT trip_id FROM public.activities WHERE id = activity_id),
      auth.uid()
    ) = 'moderator'
  );

-- ============================================================================
-- MESSAGES TABLE POLICIES
-- ============================================================================

-- Trip members can view messages
CREATE POLICY "Trip members can view messages"
  ON public.messages FOR SELECT
  USING (public.is_trip_member(trip_id, auth.uid()));

-- Trip members can create messages
CREATE POLICY "Members can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND public.is_trip_member(trip_id, auth.uid())
  );

-- Users can update their own messages
CREATE POLICY "Users can update own messages"
  ON public.messages FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Moderators and owners can delete any messages (soft delete)
CREATE POLICY "Moderators can delete messages"
  ON public.messages FOR UPDATE
  USING (
    auth.uid() = (SELECT owner_id FROM public.trips WHERE id = trip_id)
    OR public.get_trip_role(trip_id, auth.uid()) = 'moderator'
  )
  WITH CHECK (
    deleted_at IS NOT NULL
  );

-- ============================================================================
-- INVITATIONS TABLE POLICIES
-- ============================================================================

-- Owners and moderators can view invitations
CREATE POLICY "Owners and moderators can view invitations"
  ON public.invitations FOR SELECT
  USING (
    auth.uid() = (SELECT owner_id FROM public.trips WHERE id = trip_id)
    OR public.get_trip_role(trip_id, auth.uid()) = 'moderator'
  );

-- Owners and moderators can create invitations
CREATE POLICY "Owners and moderators can create invitations"
  ON public.invitations FOR INSERT
  WITH CHECK (
    auth.uid() = inviter_id
    AND (
      auth.uid() = (SELECT owner_id FROM public.trips WHERE id = trip_id)
      OR public.get_trip_role(trip_id, auth.uid()) = 'moderator'
    )
  );

-- Owners and moderators can update invitations
CREATE POLICY "Owners and moderators can update invitations"
  ON public.invitations FOR UPDATE
  USING (
    auth.uid() = (SELECT owner_id FROM public.trips WHERE id = trip_id)
    OR public.get_trip_role(trip_id, auth.uid()) = 'moderator'
  )
  WITH CHECK (
    auth.uid() = (SELECT owner_id FROM public.trips WHERE id = trip_id)
    OR public.get_trip_role(trip_id, auth.uid()) = 'moderator'
  );

-- ============================================================================
-- COMMENTS (Documentation)
-- ============================================================================

COMMENT ON FUNCTION public.is_trip_member IS 'Checks if a user is an active member of a trip';
COMMENT ON FUNCTION public.get_trip_role IS 'Gets the role of a user in a trip';
COMMENT ON FUNCTION public.can_write_trip IS 'Checks if a user can write/modify a trip (owner, editor, or moderator)';

