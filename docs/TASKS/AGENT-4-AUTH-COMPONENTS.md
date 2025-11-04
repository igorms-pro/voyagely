# Task Assignment: Agent-4 - Authentication UI Components

## 🎯 Objective

Replace mock authentication with real Supabase Auth in LoginPage and SignupPage components. Implement proper error handling, loading states, and user experience.

## 📋 Task Details

### 1. Review Current Implementation

- [ ] Review `src/pages/LoginPage.tsx` - Current mock implementation
- [ ] Review `src/pages/SignupPage.tsx` - Current mock implementation
- [ ] Review `src/lib/mock-supabase.ts` - Understand current auth flow
- [ ] Review `src/lib/supabase.ts` - Supabase client (from Agent-2)

### 2. Update LoginPage

**File:** `src/pages/LoginPage.tsx`

**Changes needed:**

- [ ] Replace `mockSupabase` import with `supabase` from `../lib/supabase`
- [ ] Update `handleSubmit` to use Supabase Auth:
  ```typescript
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  ```
- [ ] Handle Supabase Auth session and user
- [ ] Get user profile from `profiles` table after sign in
- [ ] Update user state management (use store's setUser)
- [ ] Handle errors properly (show user-friendly messages)
- [ ] Maintain existing UI/UX (keep same design)

**Reference implementation:**

```typescript
// Example auth flow
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (error) {
  setError(error.message);
  return;
}

if (data.user) {
  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profile) {
    const user = {
      id: profile.id,
      email: profile.email,
      display_name: profile.display_name || profile.email.split('@')[0],
      avatar_url:
        profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.email}`,
      created_at: profile.created_at,
    };
    setUser(user);
    navigate('/dashboard');
  }
}
```

### 3. Update SignupPage

**File:** `src/pages/SignupPage.tsx`

**Changes needed:**

- [ ] Replace `mockSupabase` import with `supabase` from `../lib/supabase`
- [ ] Update `handleSubmit` to use Supabase Auth signup
- [ ] Include user metadata (display_name) in signup
- [ ] Handle email confirmation (if enabled)
- [ ] After signup, get profile (created by trigger)
- [ ] Update user state
- [ ] Handle errors properly
- [ ] Maintain existing UI/UX

**Reference implementation:**

```typescript
// Example signup flow
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      display_name: displayName,
    },
  },
});

if (error) {
  setError(error.message);
  return;
}

if (data.user) {
  // Profile is created automatically by trigger
  // Wait a moment for trigger to complete
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profile) {
    const user = {
      id: profile.id,
      email: profile.email,
      display_name: profile.display_name || displayName,
      avatar_url:
        profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.email}`,
      created_at: profile.created_at,
    };
    setUser(user);
    navigate('/dashboard');
  }
}
```

### 4. Handle Auth State Changes

**Create:** `src/lib/auth-listener.ts` (optional helper)

```typescript
import { supabase } from './supabase';
import { useStore } from './store';
import type { User } from './mock-supabase';

export function setupAuthListener() {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      // Get profile and update store
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        const user: User = {
          id: profile.id,
          email: profile.email,
          display_name: profile.display_name || profile.email.split('@')[0],
          avatar_url:
            profile.avatar_url ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.email}`,
          created_at: profile.created_at,
        };
        useStore.getState().setUser(user);
      }
    } else if (event === 'SIGNED_OUT') {
      useStore.getState().setUser(null);
    }
  });
}
```

**Update:** `src/main.tsx` or `src/App.tsx` to initialize auth listener

### 5. Update App Initialization

**Update:** `src/App.tsx`

- [ ] Check for existing session on mount
- [ ] Load user profile if session exists
- [ ] Use auth listener to handle state changes
- [ ] Remove mock user creation logic

**Example:**

```typescript
useEffect(() => {
  // Check for existing session
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      // Load profile and set user
      loadUserProfile(session.user.id);
    }
  });

  // Set up auth state listener
  setupAuthListener();
}, []);
```

### 6. Error Handling

- [ ] Map Supabase errors to user-friendly messages:
  - "Invalid login credentials" → "Invalid email or password"
  - "Email not confirmed" → "Please check your email to confirm your account"
  - "User already registered" → "An account with this email already exists"
  - Generic errors → "Something went wrong. Please try again."

### 7. Password Reset (Optional for MVP)

- [ ] Add "Forgot password?" link to LoginPage
- [ ] Implement password reset flow using Supabase
- [ ] Create password reset page (optional)

## 📁 Files to Create/Modify

**Modify:**

- `src/pages/LoginPage.tsx` - Replace mock auth with Supabase
- `src/pages/SignupPage.tsx` - Replace mock auth with Supabase
- `src/App.tsx` - Add auth session check and listener

**Create (optional):**

- `src/lib/auth-listener.ts` - Auth state change handler
- `src/lib/auth-helpers.ts` - Helper functions for auth

**DO NOT modify:**

- `src/lib/store.ts` - Agent-5 will update this
- `src/lib/supabase.ts` - Already created by Agent-2

## ✅ Deliverables Checklist

- [ ] LoginPage uses Supabase Auth
- [ ] SignupPage uses Supabase Auth
- [ ] Error handling works correctly
- [ ] Loading states maintained
- [ ] User profile loaded after auth
- [ ] Session persistence works
- [ ] Auth state listener set up
- [ ] TypeScript compilation passes
- [ ] Manual testing: Can sign up, sign in, sign out

## 🔗 Reference Files

- **Current Login:** `src/pages/LoginPage.tsx`
- **Current Signup:** `src/pages/SignupPage.tsx`
- **Supabase Client:** `src/lib/supabase.ts` (from Agent-2)
- **User Store:** `src/lib/store.ts` - Use `setUser` function
- **Mock Auth:** `src/lib/mock-supabase.ts` - Reference for User type

## 📝 Notes

- Supabase Auth handles password hashing automatically
- Sessions are managed by Supabase (stored in localStorage)
- Profile is created by database trigger (from Agent-1)
- Use `supabase.auth.signInWithPassword()` for login
- Use `supabase.auth.signUp()` for registration
- Check `supabase.auth.getSession()` for existing sessions
- Use `supabase.auth.signOut()` for logout

## 🧪 Testing

Before submitting:

- [ ] Run `pnpm type-check` - must pass
- [ ] Run `pnpm lint` - must pass
- [ ] Manual test: Sign up new user → should work
- [ ] Manual test: Sign in existing user → should work
- [ ] Manual test: Sign out → should work
- [ ] Manual test: Refresh page → should maintain session
- [ ] Test error cases: wrong password, invalid email, etc.

## 🚨 Important

- **Wait for Agent-2** to complete Supabase client setup
- **Wait for Agent-1** to complete database schema (profile trigger)
- Keep existing UI/UX - only change the auth logic
- Handle loading states properly
- Test with real Supabase project (from Agent-1)

---

**Branch:** `agent-4/auth-components`  
**Dependencies:** Agent-1 (needs schema), Agent-2 (needs client)  
**Blocking:** None
