import { PostHogProvider as PHProvider } from 'posthog-js/react';
import posthog from '../lib/posthog';
import { ReactNode } from 'react';

interface PostHogProviderProps {
  children: ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  // In CI/test environments without PostHog key, just return children
  const posthogKey = import.meta.env.VITE_POSTHOG_KEY;

  if (!posthogKey) {
    return <>{children}</>;
  }

  // Only wrap with PostHogProvider if PostHog is configured
  try {
    return <PHProvider client={posthog}>{children}</PHProvider>;
  } catch (error) {
    // Silently fail if PostHog can't initialize (e.g., in tests)
    console.warn('PostHog provider failed:', error);
    return <>{children}</>;
  }
}
