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
