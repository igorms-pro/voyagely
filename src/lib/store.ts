// Global state management using Zustand
import { create } from 'zustand';
import { User, Trip, Activity, Message } from './mock-supabase';
import { supabase } from './supabase';
import { Profile } from './types/database.types';
import { setSentryUser, clearSentryUser } from './sentry';
import { Analytics } from './analytics';

// Helper function to map Profile to User format
function profileToUser(profile: Profile): User {
  return {
    id: profile.id,
    email: profile.email,
    display_name: profile.display_name || profile.email.split('@')[0],
    avatar_url:
      profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.email}`,
    created_at: profile.created_at,
  };
}

interface AppState {
  // Auth state
  user: User | null;
  setUser: (user: User | null) => void;

  // Auth functions
  initializeAuth: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;

  // Trips state
  trips: Trip[];
  currentTrip: Trip | null;
  setTrips: (trips: Trip[]) => void;
  setCurrentTrip: (trip: Trip | null) => void;
  addTrip: (trip: Trip) => void;
  updateTripInState: (tripId: string, updates: Partial<Trip>) => void;

  // Trip CRUD operations
  loadTrips: () => Promise<void>;
  createTrip: (tripData: {
    title: string;
    destination_text: string;
    start_date: string;
    end_date: string;
    status?: 'planned' | 'locked' | 'archived';
    budget_cents?: number;
    currency?: string;
  }) => Promise<Trip>;
  updateTrip: (tripId: string, updates: Partial<Trip>) => Promise<void>;
  deleteTrip: (tripId: string) => Promise<void>;

  // Activities state
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  addActivity: (activity: Activity) => void;
  updateActivityInState: (activityId: string, updates: Partial<Activity>) => void;

  // Messages state
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;

  // UI state
  isGeneratingItinerary: boolean;
  setIsGeneratingItinerary: (isGenerating: boolean) => void;

  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Modal state
  showCreateTripModal: boolean;
  setShowCreateTripModal: (show: boolean) => void;

  showAddActivityModal: boolean;
  setShowAddActivityModal: (show: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Auth state
  user: null,
  setUser: (user) => set({ user }),

  // Auth functions
  initializeAuth: async () => {
    try {
      // Skip if Supabase is not configured (e.g., in CI/test environments)
      const hasSupabaseConfig =
        import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (!hasSupabaseConfig) {
        set({ user: null });
        return;
      }

      // Check for existing session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error getting session:', sessionError);
        return;
      }

      if (!session?.user) {
        // No session, clear user state
        set({ user: null });
        clearSentryUser();
        return;
      }

      // Get profile from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        set({ user: null });
        clearSentryUser();
        return;
      }

      if (!profile) {
        set({ user: null });
        clearSentryUser();
        return;
      }

      // Map profile to User format and update state
      const user = profileToUser(profile);
      set({ user });

      // Set user context for Sentry and PostHog
      setSentryUser({
        id: user.id,
        email: user.email,
        username: user.display_name,
      });

      Analytics.identify(user.id, {
        email: user.email,
        displayName: user.display_name,
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null });
      clearSentryUser();
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }

      // Clear user state
      set({ user: null });

      // Clear analytics tracking
      clearSentryUser();

      // Clear trips, activities, messages state
      set({
        trips: [],
        currentTrip: null,
        activities: [],
        messages: [],
      });
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  },

  refreshUser: async () => {
    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        // No authenticated user, clear state
        set({ user: null });
        clearSentryUser();
        return;
      }

      // Get profile from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        set({ user: null });
        clearSentryUser();
        return;
      }

      if (!profile) {
        set({ user: null });
        clearSentryUser();
        return;
      }

      // Map profile to User format and update state
      const user = profileToUser(profile);
      set({ user });

      // Update user context for Sentry and PostHog
      setSentryUser({
        id: user.id,
        email: user.email,
        username: user.display_name,
      });

      Analytics.identify(user.id, {
        email: user.email,
        displayName: user.display_name,
      });
    } catch (error) {
      console.error('Error refreshing user:', error);
      set({ user: null });
      clearSentryUser();
    }
  },

  // Trips state
  trips: [],
  currentTrip: null,
  setTrips: (trips) => set({ trips }),
  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
  updateTripInState: (tripId, updates) =>
    set((state) => ({
      trips: state.trips.map((t) => (t.id === tripId ? { ...t, ...updates } : t)),
      currentTrip:
        state.currentTrip?.id === tripId ? { ...state.currentTrip, ...updates } : state.currentTrip,
    })),

  // Trip CRUD operations
  loadTrips: async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        set({ trips: [] });
        return;
      }

      // Get trips where user is a member (via trip_members table)
      const { data: memberships, error: membershipsError } = await supabase
        .from('trip_members')
        .select('trip_id')
        .eq('user_id', user.id)
        .is('removed_at', null);

      if (membershipsError) {
        console.error('Error loading trip memberships:', membershipsError);
        throw membershipsError;
      }

      if (!memberships || memberships.length === 0) {
        set({ trips: [] });
        return;
      }

      const tripIds = memberships.map((m) => m.trip_id);

      // Fetch trips that are not deleted
      const { data: trips, error: tripsError } = await supabase
        .from('trips')
        .select('*')
        .in('id', tripIds)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (tripsError) {
        console.error('Error loading trips:', tripsError);
        throw tripsError;
      }

      // Map database Trip to mock Trip format
      const mappedTrips: Trip[] = (trips || []).map((trip) => ({
        id: trip.id,
        owner_id: trip.owner_id,
        title: trip.title,
        destination_text: trip.destination_text,
        start_date: trip.start_date,
        end_date: trip.end_date,
        status: trip.status,
        budget_cents: trip.budget_cents ?? undefined,
        currency: trip.currency ?? undefined,
        created_at: trip.created_at,
        updated_at: trip.updated_at,
      }));

      set({ trips: mappedTrips });
    } catch (error) {
      console.error('Error loading trips:', error);
      throw error;
    }
  },

  createTrip: async (tripData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: trip, error } = await supabase
        .from('trips')
        .insert({
          owner_id: user.id,
          title: tripData.title,
          destination_text: tripData.destination_text,
          start_date: tripData.start_date,
          end_date: tripData.end_date,
          status: tripData.status || 'planned',
          budget_cents: tripData.budget_cents ?? null,
          currency: tripData.currency ?? null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating trip:', error);
        throw error;
      }

      if (!trip) {
        throw new Error('Failed to create trip');
      }

      // Map database Trip to mock Trip format
      const mappedTrip: Trip = {
        id: trip.id,
        owner_id: trip.owner_id,
        title: trip.title,
        destination_text: trip.destination_text,
        start_date: trip.start_date,
        end_date: trip.end_date,
        status: trip.status,
        budget_cents: trip.budget_cents ?? undefined,
        currency: trip.currency ?? undefined,
        created_at: trip.created_at,
        updated_at: trip.updated_at,
      };

      // Add to state (owner is automatically added as member via trigger)
      set((state) => ({ trips: [mappedTrip, ...state.trips] }));

      return mappedTrip;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  },

  updateTrip: async (tripId, updates) => {
    try {
      const updateData: any = {};
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.destination_text !== undefined)
        updateData.destination_text = updates.destination_text;
      if (updates.start_date !== undefined) updateData.start_date = updates.start_date;
      if (updates.end_date !== undefined) updateData.end_date = updates.end_date;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.budget_cents !== undefined)
        updateData.budget_cents = updates.budget_cents ?? null;
      if (updates.currency !== undefined) updateData.currency = updates.currency ?? null;

      const { data: trip, error } = await supabase
        .from('trips')
        .update(updateData)
        .eq('id', tripId)
        .select()
        .single();

      if (error) {
        console.error('Error updating trip:', error);
        throw error;
      }

      if (!trip) {
        throw new Error('Trip not found');
      }

      // Map database Trip to mock Trip format
      const mappedTrip: Trip = {
        id: trip.id,
        owner_id: trip.owner_id,
        title: trip.title,
        destination_text: trip.destination_text,
        start_date: trip.start_date,
        end_date: trip.end_date,
        status: trip.status,
        budget_cents: trip.budget_cents ?? undefined,
        currency: trip.currency ?? undefined,
        created_at: trip.created_at,
        updated_at: trip.updated_at,
      };

      // Update state
      get().updateTripInState(tripId, mappedTrip);
    } catch (error) {
      console.error('Error updating trip:', error);
      throw error;
    }
  },

  deleteTrip: async (tripId) => {
    try {
      // Soft delete by setting deleted_at
      const { error } = await supabase
        .from('trips')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', tripId);

      if (error) {
        console.error('Error deleting trip:', error);
        throw error;
      }

      // Remove from state
      set((state) => ({
        trips: state.trips.filter((t) => t.id !== tripId),
        currentTrip: state.currentTrip?.id === tripId ? null : state.currentTrip,
      }));
    } catch (error) {
      console.error('Error deleting trip:', error);
      throw error;
    }
  },

  // Activities state
  activities: [],
  setActivities: (activities) => set({ activities }),
  addActivity: (activity) => set((state) => ({ activities: [...state.activities, activity] })),
  updateActivityInState: (activityId, updates) =>
    set((state) => ({
      activities: state.activities.map((a) => (a.id === activityId ? { ...a, ...updates } : a)),
    })),

  // Messages state
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

  // UI state
  isGeneratingItinerary: false,
  setIsGeneratingItinerary: (isGenerating) => set({ isGeneratingItinerary: isGenerating }),

  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Modal state
  showCreateTripModal: false,
  setShowCreateTripModal: (show) => set({ showCreateTripModal: show }),

  showAddActivityModal: false,
  setShowAddActivityModal: (show) => set({ showAddActivityModal: show }),
}));
