# Task Assignment: Agent-3 - Row Level Security (RLS) Policies

## 🎯 Objective

Design and implement Row Level Security (RLS) policies for all database tables to ensure proper access control based on trip membership and user roles.

## 📋 Task Details

### 1. Review Schema

- [ ] Review Agent-1's migration file: `supabase/migrations/001_initial_schema.sql`
- [ ] Understand all tables and relationships
- [ ] Review RLS policy matrix in `docs/wanderly_architecture_design.md` (lines 85-102)

### 2. Create RLS Policies Migration

**Create:** `supabase/migrations/002_rls_policies.sql`

### 3. Policy Implementation Rules

**Reference:** `docs/wanderly_architecture_design.md` (lines 85-102) - RLS Policy Matrix

#### 3.1 Helper Function: Check Trip Membership

```sql
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

  RETURN user_role IN ('editor', 'moderator');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### 3.2 Profiles Table Policies

```sql
-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (handled by trigger, but allow)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

#### 3.3 Trips Table Policies

```sql
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
  USING (public.can_write_trip(id, auth.uid()));

-- Owners can delete trips (soft delete)
CREATE POLICY "Owners can delete trips"
  ON public.trips FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (deleted_at IS NOT NULL);

-- Anyone authenticated can create trips (will be owner)
CREATE POLICY "Authenticated users can create trips"
  ON public.trips FOR INSERT
  WITH CHECK (auth.uid() = owner_id);
```

#### 3.4 Trip Members Table Policies

```sql
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
  );

-- Owners and moderators can remove members
CREATE POLICY "Owners and moderators can remove members"
  ON public.trip_members FOR UPDATE
  USING (
    auth.uid() = (
      SELECT owner_id FROM public.trips WHERE id = trip_id
    )
    OR public.get_trip_role(trip_id, auth.uid()) = 'moderator'
  )
  WITH CHECK (removed_at IS NOT NULL);
```

#### 3.5 Activities Table Policies

```sql
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
  USING (public.can_write_trip(trip_id, auth.uid()));

-- Editors, moderators, and owners can delete activities
CREATE POLICY "Writers can delete activities"
  ON public.activities FOR UPDATE
  USING (public.can_write_trip(trip_id, auth.uid()))
  WITH CHECK (deleted_at IS NOT NULL);
```

#### 3.6 Votes Table Policies

```sql
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
```

#### 3.7 Messages Table Policies

```sql
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

-- Moderators and owners can delete any messages
CREATE POLICY "Moderators can delete messages"
  ON public.messages FOR UPDATE
  USING (
    auth.uid() = (SELECT owner_id FROM public.trips WHERE id = trip_id)
    OR public.get_trip_role(trip_id, auth.uid()) = 'moderator'
  )
  WITH CHECK (deleted_at IS NOT NULL);
```

#### 3.8 Itineraries Table Policies

```sql
-- Trip members can view itineraries
CREATE POLICY "Trip members can view itineraries"
  ON public.itineraries FOR SELECT
  USING (public.is_trip_member(trip_id, auth.uid()));

-- Editors, moderators, and owners can create/update itineraries
CREATE POLICY "Writers can manage itineraries"
  ON public.itineraries FOR ALL
  USING (public.can_write_trip(trip_id, auth.uid()))
  WITH CHECK (public.can_write_trip(trip_id, auth.uid()));
```

#### 3.9 Itinerary Days Table Policies

```sql
-- Trip members can view itinerary days
CREATE POLICY "Trip members can view itinerary days"
  ON public.itinerary_days FOR SELECT
  USING (
    public.is_trip_member(
      (SELECT trip_id FROM public.itineraries WHERE id = itinerary_id),
      auth.uid()
    )
  );

-- Writers can manage itinerary days
CREATE POLICY "Writers can manage itinerary days"
  ON public.itinerary_days FOR ALL
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
```

#### 3.10 Invitations Table Policies

```sql
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
  );
```

#### 3.11 Audit Logs Table Policies (if created)

```sql
-- Users can view their own audit logs
CREATE POLICY "Users can view own audit logs"
  ON public.audit_logs FOR SELECT
  USING (auth.uid() = actor_id);

-- System can insert audit logs (service role only in practice)
-- Note: Regular users shouldn't insert directly, use functions
```

### 4. Test Policies

- [ ] Create test SQL script to verify policies work
- [ ] Test scenarios:
  - User can only see their own trips
  - User cannot access other users' trips
  - Owner can modify trip
  - Editor can modify but not delete
  - Viewer can only read
  - Moderator can manage members

## 📁 Files to Create

**Create:**

- `supabase/migrations/002_rls_policies.sql` - All RLS policies

**Optional:**

- `supabase/migrations/003_test_rls.sql` - Test queries (if needed)

## ✅ Deliverables Checklist

- [ ] Helper functions created (is_trip_member, get_trip_role, can_write_trip)
- [ ] Policies for all tables created
- [ ] Policies follow the matrix from architecture doc
- [ ] Migration tested in Supabase SQL Editor
- [ ] Policies are secure (no unauthorized access possible)

## 🔗 Reference Files

- **Schema:** `supabase/migrations/001_initial_schema.sql` (from Agent-1)
- **RLS Matrix:** `docs/wanderly_architecture_design.md` (lines 85-102)
- **Policy Patterns:** Follow Supabase RLS best practices

## 📝 Notes

- All policies use `auth.uid()` to get current authenticated user
- Policies are evaluated per-row
- `SECURITY DEFINER` functions run with creator's privileges (use carefully)
- Soft deletes use `deleted_at IS NULL` checks
- Some policies check trip ownership via subqueries

## 🧪 Testing

Before submitting:

- [ ] Run migration in Supabase SQL Editor - must succeed
- [ ] Verify policies are enabled (check Table Editor > Policies)
- [ ] Test with different user roles if possible
- [ ] Ensure no security holes (users can't access others' data)

## 🚨 Important

- **Wait for Agent-1** to complete schema migration first
- This migration depends on tables existing from migration 001
- Test policies thoroughly - security is critical
- Review each policy to ensure it matches requirements

---

**Branch:** `agent-3/rls-policies`  
**Dependencies:** Agent-1 (needs schema)  
**Blocking:** None (can be done in parallel with Agent-2)
