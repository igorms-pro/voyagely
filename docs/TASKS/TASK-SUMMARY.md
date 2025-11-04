# Issue #1: Supabase Setup & Auth - Task Summary

## 📋 All Tasks Ready for Agents

All task specifications are complete and ready to copy-paste to agents. Each task includes:

- ✅ Complete context and requirements
- ✅ Reference files and code examples
- ✅ Step-by-step instructions
- ✅ Testing checklist
- ✅ Deliverables list

## 🎯 Task Breakdown

### **Agent-1: Database Schema**

📄 **File:** `docs/TASKS/AGENT-1-DATABASE-SCHEMA.md`

**Task:** Create Supabase project, design and implement complete database schema

**Key Responsibilities:**

- Create Supabase project (go to supabase.com)
- Design and create all tables (profiles, trips, members, activities, votes, messages, etc.)
- Create migrations, indexes, triggers
- Share credentials with Lead → Lead gives to Agent-2

**Dependencies:** None  
**Blocks:** Agent-2, Agent-3

---

### **Agent-2: Supabase Client Setup**

📄 **File:** `docs/TASKS/AGENT-2-SUPABASE-CLIENT.md`

**Task:** Replace mock Supabase with real Supabase client, set up TypeScript types

**Key Responsibilities:**

- Install `@supabase/supabase-js`
- Create `src/lib/supabase.ts` with client initialization
- Create TypeScript database types
- Export client for use in components

**Dependencies:** Agent-1 (needs project credentials)  
**Blocks:** Agent-4, Agent-5

---

### **Agent-3: RLS Policies**

📄 **File:** `docs/TASKS/AGENT-3-RLS-POLICIES.md`

**Task:** Design and implement Row Level Security policies for all tables

**Key Responsibilities:**

- Create helper functions (is_trip_member, get_trip_role, can_write_trip)
- Implement RLS policies for all tables
- Follow RLS policy matrix from architecture doc
- Test policies for security

**Dependencies:** Agent-1 (needs schema)  
**Blocks:** None

---

### **Agent-4: Auth UI Components**

📄 **File:** `docs/TASKS/AGENT-4-AUTH-COMPONENTS.md`

**Task:** Replace mock auth with Supabase Auth in LoginPage and SignupPage

**Key Responsibilities:**

- Update LoginPage.tsx to use Supabase Auth
- Update SignupPage.tsx to use Supabase Auth
- Implement error handling
- Set up auth state listener
- Load user profiles after auth

**Dependencies:** Agent-1 (schema), Agent-2 (client)  
**Blocks:** None

---

### **Agent-5: User State Management**

📄 **File:** `docs/TASKS/AGENT-5-USER-STATE.md`

**Task:** Update Zustand store to use real Supabase auth state

**Key Responsibilities:**

- Add auth functions to store (initializeAuth, signOut, refreshUser)
- Sync store with Supabase session
- Handle session persistence
- Update App.tsx to initialize auth

**Dependencies:** Agent-2 (client), Agent-4 (coordinate)  
**Blocks:** None

---

## 🔄 Execution Order

### Can Start Immediately:

- **Agent-1** (Database Schema) - No dependencies
- **Agent-2** (Supabase Client) - Can start with placeholder, needs credentials from Agent-1

### After Agent-1 Completes:

- **Agent-3** (RLS Policies) - Needs schema to exist
- **Agent-2** (if waiting for credentials) - Now has real credentials

### After Agent-2 Completes:

- **Agent-4** (Auth Components) - Needs client
- **Agent-5** (User State) - Needs client

## 📝 Copy-Paste Instructions for Agents

Simply copy the entire content of each task file and send to the agent:

1. **For Agent-1:** Copy `docs/TASKS/AGENT-1-DATABASE-SCHEMA.md` content
2. **For Agent-2:** Copy `docs/TASKS/AGENT-2-SUPABASE-CLIENT.md` content
3. **For Agent-3:** Copy `docs/TASKS/AGENT-3-RLS-POLICIES.md` content
4. **For Agent-4:** Copy `docs/TASKS/AGENT-4-AUTH-COMPONENTS.md` content
5. **For Agent-5:** Copy `docs/TASKS/AGENT-5-USER-STATE.md` content

Each file is self-contained with all context needed.

## ✅ Lead Agent Checklist

After agents complete their tasks:

```bash
# 1. Create feature branch
git checkout -b feature/supabase-auth

# 2. Review each agent's branch
git checkout agent-1/database-schema
pnpm type-check && pnpm lint  # Review code

git checkout agent-2/supabase-client
pnpm install && pnpm type-check && pnpm lint

git checkout agent-3/rls-policies
# Test policies if possible

git checkout agent-4/auth-components
pnpm type-check && pnpm lint && pnpm test:run

git checkout agent-5/user-state
pnpm type-check && pnpm lint && pnpm test:run

# 3. Merge in order
git checkout feature/supabase-auth
git merge agent-1/database-schema --no-ff
git merge agent-2/supabase-client --no-ff
git merge agent-3/rls-policies --no-ff
git merge agent-4/auth-components --no-ff
git merge agent-5/user-state --no-ff

# 4. Resolve any conflicts
# 5. Test everything
pnpm check && pnpm e2e

# 6. Update ISSUES.md
# 7. Create PR
```

---

**All task files are in:** `docs/TASKS/`
**Ready to copy-paste to agents!** ✅
