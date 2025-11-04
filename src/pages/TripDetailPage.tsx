import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { supabase } from '../lib/supabase';
import { Activity, Vote, Trip, Message } from '../lib/mock-supabase';
import { TripMember, Message as DBMessage } from '../lib/types/database.types';
import {
  subscribeToTrip,
  subscribeToMessages,
  subscribeToActivities,
  RealtimePayload,
  unsubscribeFromChannel,
} from '../lib/realtime-service';
import { RealtimeChannel } from '@supabase/supabase-js';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  MessageSquare,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Clock,
  DollarSign,
  Sparkles,
  Cloud,
  Navigation as NavigationIcon,
  Edit,
  Trash2,
  Save,
  X,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import TripChat from '../components/TripChat';
import WeatherWidget from '../components/WeatherWidget';
import NearbyPlaces from '../components/NearbyPlaces';

export default function TripDetailPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'chat' | 'weather' | 'explore'>(
    'itinerary',
  );
  const [votes, setVotes] = useState<Record<string, Vote[]>>({});
  const [tripMembers, setTripMembers] = useState<TripMember[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    destination_text: '',
    start_date: '',
    end_date: '',
    status: 'planned' as 'planned' | 'locked' | 'archived',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Realtime subscriptions refs
  const tripSubscriptionRef = useRef<RealtimeChannel | null>(null);
  const messagesSubscriptionRef = useRef<RealtimeChannel | null>(null);
  const activitiesSubscriptionRef = useRef<RealtimeChannel | null>(null);

  const user = useStore((state) => state.user);
  const currentTrip = useStore((state) => state.currentTrip);
  const setCurrentTrip = useStore((state) => state.setCurrentTrip);
  const updateTrip = useStore((state) => state.updateTrip);
  const deleteTrip = useStore((state) => state.deleteTrip);
  const activities = useStore((state) => state.activities);
  const setActivities = useStore((state) => state.setActivities);

  const loadTripData = useCallback(async () => {
    if (!tripId || !user) return;

    setLoading(true);
    setError(null);

    try {
      // Load trip from Supabase
      const { data: trip, error: tripError } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .is('deleted_at', null)
        .single();

      if (tripError) {
        console.error('Error loading trip:', tripError);
        throw tripError;
      }

      if (!trip) {
        navigate('/dashboard');
        return;
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

      setCurrentTrip(mappedTrip);
      setEditForm({
        title: mappedTrip.title,
        destination_text: mappedTrip.destination_text,
        start_date: mappedTrip.start_date,
        end_date: mappedTrip.end_date,
        status: mappedTrip.status,
      });

      // Load trip members
      const { data: members, error: membersError } = await supabase
        .from('trip_members')
        .select('*')
        .eq('trip_id', tripId)
        .is('removed_at', null);

      if (membersError) {
        console.error('Error loading trip members:', membersError);
      } else {
        setTripMembers(members || []);
      }

      // Note: Activities and votes will be loaded by future agents
      // For now, keep existing mock data loading for activities
      setActivities([]);
      setVotes({});
    } catch (err: any) {
      console.error('Error loading trip:', err);
      setError(err.message || 'Failed to load trip. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [tripId, user, navigate, setCurrentTrip, setActivities]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!tripId) {
      navigate('/dashboard');
      return;
    }

    loadTripData();
  }, [tripId, user, navigate, loadTripData]);

  // Set up realtime subscriptions
  useEffect(() => {
    if (!tripId || !user) return;

    // Subscribe to trip updates
    tripSubscriptionRef.current = subscribeToTrip(tripId, (payload: RealtimePayload) => {
      if (payload.eventType === 'UPDATE' && payload.new) {
        // Update trip in state
        const updatedTrip: Trip = {
          id: payload.new.id,
          owner_id: payload.new.owner_id,
          title: payload.new.title,
          destination_text: payload.new.destination_text,
          start_date: payload.new.start_date,
          end_date: payload.new.end_date,
          status: payload.new.status,
          budget_cents: payload.new.budget_cents ?? undefined,
          currency: payload.new.currency ?? undefined,
          created_at: payload.new.created_at,
          updated_at: payload.new.updated_at,
        };
        setCurrentTrip(updatedTrip);
        updateTrip(tripId, updatedTrip);
      } else if (payload.eventType === 'DELETE') {
        // Trip was deleted, navigate away
        navigate('/dashboard');
      }
    });

    // Subscribe to messages
    messagesSubscriptionRef.current = subscribeToMessages(tripId, (payload: RealtimePayload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        const message = payload.new as DBMessage;
        // Map to Message format
        const mappedMessage: Message = {
          id: message.id,
          trip_id: message.trip_id,
          user_id: message.user_id || '',
          content: message.content,
          message_type: message.message_type === 'attachment' ? 'text' : message.message_type,
          created_at: message.created_at,
        };
        // Add message to store
        // Note: This will be handled by TripChat component, but we can also update store here
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        // Message was updated
        const message = payload.new as DBMessage;
        // Update message in store if needed
      } else if (payload.eventType === 'DELETE') {
        // Message was deleted
        // Remove from store if needed
      }
    });

    // Subscribe to activities
    activitiesSubscriptionRef.current = subscribeToActivities(
      tripId,
      (payload: RealtimePayload) => {
        if (payload.eventType === 'INSERT' && payload.new) {
          const activity = payload.new as any;
          // Map to Activity format
          const mappedActivity: Activity = {
            id: activity.id,
            trip_id: activity.trip_id,
            itinerary_day_id: activity.itinerary_day_id || undefined,
            title: activity.title,
            description: activity.description || '',
            category: activity.category || '',
            start_time: activity.start_time || undefined,
            end_time: activity.end_time || undefined,
            cost_cents: activity.cost_cents || undefined,
            lat: activity.lat || undefined,
            lon: activity.lon || undefined,
            status: activity.status,
            source: activity.source,
            created_at: activity.created_at,
          };
          const { activities: currentActivities } = useStore.getState();
          setActivities([...currentActivities, mappedActivity]);
        } else if (payload.eventType === 'UPDATE' && payload.new) {
          const activity = payload.new as any;
          const mappedActivity: Activity = {
            id: activity.id,
            trip_id: activity.trip_id,
            itinerary_day_id: activity.itinerary_day_id || undefined,
            title: activity.title,
            description: activity.description || '',
            category: activity.category || '',
            start_time: activity.start_time || undefined,
            end_time: activity.end_time || undefined,
            cost_cents: activity.cost_cents || undefined,
            lat: activity.lat || undefined,
            lon: activity.lon || undefined,
            status: activity.status,
            source: activity.source,
            created_at: activity.created_at,
          };
          const { activities: currentActivities } = useStore.getState();
          setActivities(currentActivities.map((a) => (a.id === activity.id ? mappedActivity : a)));
        } else if (payload.eventType === 'DELETE' && payload.old) {
          // Remove activity from state
          const { activities: currentActivities } = useStore.getState();
          setActivities(currentActivities.filter((a) => a.id !== payload.old?.id));
        }
      },
    );

    // Cleanup subscriptions on unmount
    return () => {
      if (tripSubscriptionRef.current) {
        unsubscribeFromChannel(tripSubscriptionRef.current);
        tripSubscriptionRef.current = null;
      }
      if (messagesSubscriptionRef.current) {
        unsubscribeFromChannel(messagesSubscriptionRef.current);
        messagesSubscriptionRef.current = null;
      }
      if (activitiesSubscriptionRef.current) {
        unsubscribeFromChannel(activitiesSubscriptionRef.current);
        activitiesSubscriptionRef.current = null;
      }
    };
  }, [tripId, user, navigate, setCurrentTrip, updateTrip, setActivities]);

  const handleUpdateTrip = async () => {
    if (!tripId || !currentTrip) return;

    try {
      await updateTrip(tripId, {
        title: editForm.title,
        destination_text: editForm.destination_text,
        start_date: editForm.start_date,
        end_date: editForm.end_date,
        status: editForm.status,
      });
      setIsEditing(false);
      // Reload trip data to get updated trip
      await loadTripData();
    } catch (err: any) {
      console.error('Error updating trip:', err);
      alert(err.message || 'Failed to update trip. Please try again.');
    }
  };

  const handleDeleteTrip = async () => {
    if (!tripId || !currentTrip) return;

    if (!confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTrip(tripId);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Error deleting trip:', err);
      alert(err.message || 'Failed to delete trip. Please try again.');
      setIsDeleting(false);
    }
  };

  const getUserRole = (): 'owner' | 'editor' | 'viewer' | 'moderator' | null => {
    if (!user) return null;
    const member = tripMembers.find((m) => m.user_id === user.id);
    return member?.role || null;
  };

  const canEdit = (): boolean => {
    if (!user || !currentTrip) return false;
    const role = getUserRole();
    return role === 'owner' || role === 'editor' || user.id === currentTrip.owner_id;
  };

  const canDelete = (): boolean => {
    if (!user || !currentTrip) return false;
    return user.id === currentTrip.owner_id;
  };

  const handleVote = async (activityId: string, choice: 'up' | 'down') => {
    if (!user) return;

    // Note: Voting will be implemented by a future agent
    // For now, this is a placeholder
    console.log('Vote functionality will be implemented by future agent');
  };

  const getVoteCounts = (activityId: string) => {
    const activityVotes = votes[activityId] || [];
    const upvotes = activityVotes.filter((v) => v.choice === 'up').length;
    const downvotes = activityVotes.filter((v) => v.choice === 'down').length;
    return { upvotes, downvotes };
  };

  const getUserVote = (activityId: string): 'up' | 'down' | null => {
    if (!user) return null;
    const activityVotes = votes[activityId] || [];
    const userVote = activityVotes.find((v) => v.user_id === user.id);
    return userVote ? userVote.choice : null;
  };

  // Group activities by date
  const activitiesByDate = activities.reduce(
    (acc, activity) => {
      if (!activity.start_time) return acc;
      const date = activity.start_time.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    },
    {} as Record<string, Activity[]>,
  );

  const sortedDates = Object.keys(activitiesByDate).sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading trip...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Trip</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex space-x-3 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Back to Dashboard
            </button>
            <button
              onClick={loadTripData}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentTrip) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Trip Hero */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Trip title"
                  />
                  <input
                    type="text"
                    value={editForm.destination_text}
                    onChange={(e) => setEditForm({ ...editForm, destination_text: e.target.value })}
                    className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Destination"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={editForm.start_date}
                      onChange={(e) => setEditForm({ ...editForm, start_date: e.target.value })}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <input
                      type="date"
                      value={editForm.end_date}
                      onChange={(e) => setEditForm({ ...editForm, end_date: e.target.value })}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleUpdateTrip}
                      className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm({
                          title: currentTrip.title,
                          destination_text: currentTrip.destination_text,
                          start_date: currentTrip.start_date,
                          end_date: currentTrip.end_date,
                          status: currentTrip.status,
                        });
                      }}
                      className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-bold mb-4">{currentTrip.title}</h1>
                  <div className="flex flex-wrap gap-4 text-white/90">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      {currentTrip.destination_text}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      {format(new Date(currentTrip.start_date), 'MMM d')} -{' '}
                      {format(new Date(currentTrip.end_date), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      {tripMembers.length} member{tripMembers.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </>
              )}
            </div>
            {!isEditing && (
              <div className="flex space-x-2">
                {canEdit() && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition flex items-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                )}
                {canDelete() && (
                  <button
                    onClick={handleDeleteTrip}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-red-500/80 backdrop-blur-sm border border-red-400/30 rounded-lg text-white hover:bg-red-600/80 transition flex items-center disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`py-4 px-2 border-b-2 font-medium transition whitespace-nowrap ${
                activeTab === 'itinerary'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Itinerary
            </button>
            <button
              onClick={() => setActiveTab('weather')}
              className={`py-4 px-2 border-b-2 font-medium transition whitespace-nowrap ${
                activeTab === 'weather'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Cloud className="w-4 h-4 inline mr-2" />
              Weather
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`py-4 px-2 border-b-2 font-medium transition whitespace-nowrap ${
                activeTab === 'explore'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <NavigationIcon className="w-4 h-4 inline mr-2" />
              Explore
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-2 border-b-2 font-medium transition whitespace-nowrap ${
                activeTab === 'chat'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'weather' ? (
          <WeatherWidget
            destination={currentTrip.destination_text}
            startDate={currentTrip.start_date}
            endDate={currentTrip.end_date}
          />
        ) : activeTab === 'explore' ? (
          <NearbyPlaces destination={currentTrip.destination_text} />
        ) : activeTab === 'itinerary' ? (
          <div className="space-y-8">
            {sortedDates.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <p className="text-gray-600">No activities in this itinerary yet.</p>
              </div>
            ) : (
              sortedDates.map((date) => (
                <div key={date} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {/* Day Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">
                      {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {activitiesByDate[date].length} activities
                    </p>
                  </div>

                  {/* Activities */}
                  <div className="divide-y divide-gray-100">
                    {activitiesByDate[date]
                      .sort((a, b) => (a.start_time || '').localeCompare(b.start_time || ''))
                      .map((activity) => {
                        const { upvotes, downvotes } = getVoteCounts(activity.id);
                        const userVote = getUserVote(activity.id);

                        return (
                          <div key={activity.id} className="p-6 hover:bg-gray-50 transition">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                      {activity.title}
                                    </h4>
                                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                      {activity.category}
                                    </span>
                                  </div>
                                </div>

                                <p className="text-gray-600 mb-3">{activity.description}</p>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                  {activity.start_time && activity.end_time && (
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {format(new Date(activity.start_time), 'h:mm a')} -{' '}
                                      {format(new Date(activity.end_time), 'h:mm a')}
                                    </div>
                                  )}
                                  {activity.cost_cents !== undefined && (
                                    <div className="flex items-center">
                                      <DollarSign className="w-4 h-4 mr-1" />$
                                      {(activity.cost_cents / 100).toFixed(2)} per person
                                    </div>
                                  )}
                                  {activity.source === 'ai' && (
                                    <div className="flex items-center text-purple-600">
                                      <Sparkles className="w-4 h-4 mr-1" />
                                      AI Suggested
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Voting */}
                              <div className="ml-6 flex flex-col items-center space-y-2">
                                <button
                                  onClick={() => handleVote(activity.id, 'up')}
                                  className={`p-2 rounded-lg transition ${
                                    userVote === 'up'
                                      ? 'bg-green-100 text-green-600'
                                      : 'text-gray-400 hover:bg-gray-100 hover:text-green-600'
                                  }`}
                                >
                                  <ThumbsUp className="w-5 h-5" />
                                </button>
                                <span className="text-sm font-medium text-gray-700">
                                  {upvotes - downvotes}
                                </span>
                                <button
                                  onClick={() => handleVote(activity.id, 'down')}
                                  className={`p-2 rounded-lg transition ${
                                    userVote === 'down'
                                      ? 'bg-red-100 text-red-600'
                                      : 'text-gray-400 hover:bg-gray-100 hover:text-red-600'
                                  }`}
                                >
                                  <ThumbsDown className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <TripChat tripId={tripId!} userRole={getUserRole()} />
        )}
      </main>
    </div>
  );
}
