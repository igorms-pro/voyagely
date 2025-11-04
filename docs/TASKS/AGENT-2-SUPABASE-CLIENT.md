# Task Assignment: Agent-2 - Supabase Client Setup

## 🎯 Objective

Replace mock Supabase implementation with real Supabase client. Set up client initialization, TypeScript types, and basic configuration.

## 📋 Task Details

### 1. Install Supabase Dependencies

- [ ] Add to `package.json` dependencies:
  ```json
  "@supabase/supabase-js": "^2.39.0"
  ```
- [ ] Run `pnpm install`

### 2. Create Supabase Client

**Create:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
```

### 3. Create TypeScript Types

**Create:** `src/lib/types/database.types.ts`

Generate types from Supabase or create manually based on schema:

```typescript
// Database types matching the schema
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          locale: string | null;
          timezone: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          locale?: string | null;
          timezone?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          locale?: string | null;
          timezone?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      trips: {
        Row: {
          id: string;
          owner_id: string;
          title: string;
          destination_text: string;
          start_date: string;
          end_date: string;
          status: 'planned' | 'locked' | 'archived';
          budget_cents: number | null;
          currency: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          owner_id: string;
          title: string;
          destination_text: string;
          start_date: string;
          end_date: string;
          status?: 'planned' | 'locked' | 'archived';
          budget_cents?: number | null;
          currency?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          owner_id?: string;
          title?: string;
          destination_text?: string;
          start_date?: string;
          end_date?: string;
          status?: 'planned' | 'locked' | 'archived';
          budget_cents?: number | null;
          currency?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      // Add all other tables (trip_members, activities, votes, messages, etc.)
      // See mock-supabase.ts for complete structure
    };
  };
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
```

**Reference:** Match types to interfaces in `src/lib/mock-supabase.ts`:

- `User` → `profiles` table
- `Trip` → `trips` table
- `TripMember` → `trip_members` table
- `Activity` → `activities` table
- `Vote` → `votes` table
- `Message` → `messages` table

### 4. Update Supabase Client with Types

**Update:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
```

### 5. Create Supabase Service Helper (Optional but Recommended)

**Create:** `src/lib/supabase-service.ts`

```typescript
import { supabase } from './supabase';
import type { Tables, TablesInsert, TablesUpdate } from './types/database.types';

// Type helpers
export type Profile = Tables<'profiles'>;
export type Trip = Tables<'trips'>;
export type TripMember = Tables<'trip_members'>;
export type Activity = Tables<'activities'>;
export type Vote = Tables<'votes'>;
export type Message = Tables<'messages'>;

// Export supabase client
export { supabase };

// Helper function to handle errors
export function handleSupabaseError(error: any): never {
  if (error?.message) {
    throw new Error(error.message);
  }
  throw new Error('An unexpected error occurred');
}
```

### 6. Update Type Exports

**Create/Update:** `src/lib/types/index.ts`

```typescript
export * from './database.types';
export * from '../supabase-service';
```

## 📁 Files to Create/Modify

**Create:**

- `src/lib/supabase.ts` - Supabase client initialization
- `src/lib/types/database.types.ts` - TypeScript database types
- `src/lib/supabase-service.ts` - Service helpers and type exports (optional)
- `src/lib/types/index.ts` - Type exports

**Modify:**

- `package.json` - Add `@supabase/supabase-js` dependency

**DO NOT modify yet (will be done by other agents):**

- `src/lib/mock-supabase.ts` - Keep for reference
- `src/pages/LoginPage.tsx` - Agent-4 will update
- `src/pages/SignupPage.tsx` - Agent-4 will update
- `src/lib/store.ts` - Agent-5 will update

## ✅ Deliverables Checklist

- [ ] `@supabase/supabase-js` installed
- [ ] `src/lib/supabase.ts` created with proper initialization
- [ ] `src/lib/types/database.types.ts` created with all table types
- [ ] Types match schema from Agent-1
- [ ] Environment variables properly configured
- [ ] TypeScript compilation passes (`pnpm type-check`)
- [ ] Client exports working correctly

## 🔗 Reference Files

- **Mock Implementation:** `src/lib/mock-supabase.ts` - See interfaces and structure
- **Schema:** Agent-1's migration file (once created)
- **Environment:** `.env.example` - For variable names

## 📝 Notes

- Use `import.meta.env.VITE_*` for environment variables (Vite convention)
- Types should match exactly with the database schema from Agent-1
- Keep client initialization simple - authentication will be added by Agent-4
- Do NOT implement any CRUD methods yet - just client setup and types

## 🧪 Testing

Before submitting:

- [ ] Run `pnpm type-check` - must pass
- [ ] Run `pnpm lint` - must pass
- [ ] Verify types are exported correctly
- [ ] Check that environment variables are loaded (console.log in dev mode only)

## 🚨 Important

- **Wait for Agent-1** to provide Supabase project URL and anon key
- Use the credentials from Agent-1's `.env` file
- If Agent-1 hasn't finished, use placeholder values and note this in your commit

---

**Branch:** `agent-2/supabase-client`  
**Dependencies:** Agent-1 (needs Supabase project credentials)  
**Blocking:** Agent-4, Agent-5 (need client to implement auth)
