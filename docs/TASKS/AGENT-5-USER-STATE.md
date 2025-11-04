# Task Assignment: Agent-5 - User State Management with Supabase

## 🎯 Objective

Update Zustand store to use real Supabase authentication state instead of mock. Implement session persistence and auth state synchronization.

## 📋 Task Details

### 1. Review Current Implementation

- [ ] Review `src/lib/store.ts` - Current Zustand store
- [ ] Review `src/lib/mock-supabase.ts` - Understand User type
- [ ] Review `src/lib/supabase.ts` - Supabase client (from Agent-2)
- [ ] Review `src/App.tsx` - See how store is used

### 2. Update Store Types

**File:** `src/lib/store.ts`

**Changes needed:**

- [ ] Keep User type from mock-supabase (or import from types)
- [ ] Add auth state management functions
- [ ] Add session management
- [ ] Keep all existing state (trips, activities, messages, UI state)

### 3. Add Auth Functions to Store

**Add to store:**

```typescript
interface AppState {
  // ... existing state ...

  // Auth functions
  initializeAuth: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
```

### 4. Implement Auth Initialization

**Add `initializeAuth` function:**

```typescript
initializeAuth: async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    // Load user profile
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
        avatar_url: profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.email}`,
        created_at: profile.created_at,
      };
      set({ user });
    }
  } else {
    set({ user: null });
  }
},
```

### 5. Implement Sign Out

**Add `signOut` function:**

```typescript
signOut: async () => {
  await supabase.auth.signOut();
  set({
    user: null,
    trips: [],
    currentTrip: null,
    activities: [],
    messages: [],
  });
},
```

### 6. Implement Refresh User

**Add `refreshUser` function:**

```typescript
refreshUser: async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    set({ user: null });
    return;
  }

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
      avatar_url: profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.email}`,
      created_at: profile.created_at,
    };
    set({ user });
  }
},
```

### 7. Update App.tsx to Use Store Auth

**Update:** `src/App.tsx`

- [ ] Remove mock user creation logic
- [ ] Call `initializeAuth()` on mount
- [ ] Set up auth state listener to call `refreshUser()`

**Example:**

```typescript
useEffect(() => {
  // Initialize auth state
  const initAuth = async () => {
    await useStore.getState().initializeAuth();
  };
  initAuth();

  // Listen to auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      useStore.getState().refreshUser();
    } else if (event === 'SIGNED_OUT') {
      useStore.getState().signOut();
    }
  });
}, []);
```

### 8. Update Components Using Auth

**Check these files use store correctly:**

- [ ] `src/pages/LoginPage.tsx` - Should use `setUser` from store
- [ ] `src/pages/SignupPage.tsx` - Should use `setUser` from store
- [ ] `src/pages/DashboardPage.tsx` - Check user access
- [ ] `src/App.tsx` - Remove mock user setup

### 9. Session Persistence

- [ ] Verify Supabase handles session persistence automatically
- [ ] Session stored in localStorage by Supabase
- [ ] Store syncs with Supabase session on app load

## 📁 Files to Create/Modify

**Modify:**

- `src/lib/store.ts` - Add auth functions, update imports
- `src/App.tsx` - Use store auth initialization

**DO NOT modify:**

- `src/pages/LoginPage.tsx` - Agent-4 handles this
- `src/pages/SignupPage.tsx` - Agent-4 handles this

## ✅ Deliverables Checklist

- [ ] Store has `initializeAuth()` function
- [ ] Store has `signOut()` function
- [ ] Store has `refreshUser()` function
- [ ] Auth state syncs with Supabase session
- [ ] App initializes auth on mount
- [ ] Auth state listener updates store
- [ ] All existing store state preserved
- [ ] TypeScript compilation passes
- [ ] Manual testing: Session persists on refresh

## 🔗 Reference Files

- **Current Store:** `src/lib/store.ts`
- **User Type:** `src/lib/mock-supabase.ts` (User interface)
- **Supabase Client:** `src/lib/supabase.ts` (from Agent-2)
- **App Component:** `src/App.tsx`

## 📝 Notes

- Supabase manages session storage automatically
- Use `supabase.auth.getSession()` to check existing session
- Use `supabase.auth.onAuthStateChange()` to listen to changes
- Store should reflect Supabase auth state, not manage it directly
- Keep all existing store functionality (trips, activities, messages, UI state)

## 🧪 Testing

Before submitting:

- [ ] Run `pnpm type-check` - must pass
- [ ] Run `pnpm lint` - must pass
- [ ] Manual test: Sign in → store updates
- [ ] Manual test: Sign out → store clears
- [ ] Manual test: Refresh page → session persists, store initialized
- [ ] Test auth state changes update store correctly

## 🚨 Important

- **Wait for Agent-2** to complete Supabase client
- **Wait for Agent-4** to update auth components (or coordinate)
- Keep backward compatibility with existing components
- Don't break existing state management
- Test thoroughly - auth state is critical

---

**Branch:** `agent-5/user-state`  
**Dependencies:** Agent-2 (needs client), Agent-4 (coordinate on auth flow)  
**Blocking:** None
