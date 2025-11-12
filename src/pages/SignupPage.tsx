import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { useStore } from '../lib/store';
import { Plane, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const refreshUser = useStore((state) => state.refreshUser);
  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const validatePassword = (password: string): { valid: boolean; message: string } => {
    if (password.length < 6) {
      return { valid: false, message: t('auth.passwordMinLength') };
    }
    if (password.length > 72) {
      return { valid: false, message: t('auth.passwordMaxLength') };
    }
    return { valid: true, message: '' };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);
    setLoadingStep('');

    // Validate display name
    if (!displayName.trim()) {
      setError(t('auth.displayNameRequired'));
      setLoading(false);
      return;
    }

    if (displayName.trim().length < 2) {
      setError(t('auth.displayNameMinLength'));
      setLoading(false);
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setError(t('auth.emailRequired'));
      setLoading(false);
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message);
      setLoading(false);
      return;
    }

    try {
      setLoadingStep(t('auth.creatingYourAccount'));

      // Sign up with Supabase (profile will be created by trigger)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            display_name: displayName.trim(),
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (authError) {
        // Handle specific Supabase errors
        if (authError.message.includes('already registered')) {
          throw new Error(t('auth.accountExists'));
        }
        if (authError.message.includes('Invalid email')) {
          throw new Error(t('auth.invalidEmail'));
        }
        if (authError.message.includes('Password')) {
          throw new Error(t('auth.passwordRequirements'));
        }
        throw authError;
      }

      if (!authData.user) {
        throw new Error(t('auth.noUserReturned'));
      }

      // Check if email confirmation is required
      if (authData.user && !authData.session) {
        // Email confirmation is required
        setSuccess(true);
        setLoadingStep(t('auth.checkEmail'));
        setLoading(false);

        // Show success message and redirect to login after a delay
        setTimeout(() => {
          navigate('/login', {
            state: {
              message: t('auth.accountCreatedMessage'),
            },
          });
        }, 3000);
        return;
      }

      // If we have a session, proceed with profile creation check
      setLoadingStep(t('auth.settingUpProfile'));

      // Get profile from profiles table (created by trigger)
      // The trigger should execute immediately, but we'll retry with exponential backoff
      let profile = null;
      let retries = 0;
      const maxRetries = 10;
      const baseDelay = 100; // Start with 100ms

      while (!profile && retries < maxRetries) {
        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (!profileError && data) {
          profile = data;
          break;
        }

        // Log profile error for debugging (but don't fail immediately)
        if (profileError && retries === 0) {
          console.warn('Profile not immediately available, retrying...', profileError);
        }

        // Exponential backoff: 100ms, 200ms, 400ms, 800ms, etc.
        const delay = baseDelay * Math.pow(2, retries);
        await new Promise((resolve) => setTimeout(resolve, delay));
        retries++;
      }

      if (!profile) {
        // Profile creation failed - this should not happen if trigger is working
        console.error('Profile not created after retries');

        // Try to refresh user from store (which will check profile)
        setLoadingStep(t('auth.finalizingSetup'));
        await refreshUser();

        // Check if user is now set
        const { user } = useStore.getState();
        if (!user) {
          throw new Error(t('auth.profileCreationDelayed'));
        }

        // User is set, proceed to dashboard
        setSuccess(true);
        setLoadingStep(t('auth.welcomeRedirecting'));
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
        return;
      }

      // Profile exists, refresh user from store to ensure consistency
      setLoadingStep(t('auth.finalizingSetup'));
      await refreshUser();

      // Verify user is set
      const { user } = useStore.getState();
      if (!user) {
        throw new Error(t('auth.failedToLoadProfile'));
      }

      setSuccess(true);
      setLoadingStep(t('auth.welcomeRedirecting'));

      // Navigate to dashboard after a brief delay to show success
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err: any) {
      console.error('Signup error:', err);

      // Provide user-friendly error messages
      let errorMessage = t('errors.failedToCreateAccount');

      if (err.message) {
        errorMessage = err.message;
      } else if (err.error_description) {
        errorMessage = err.error_description;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      setError(errorMessage);
      setLoadingStep('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.joinTitle')}</h1>
          <p className="text-gray-600">{t('auth.joinSubtitle')}</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('auth.createAccount')}</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{loadingStep || 'Account created successfully!'}</span>
            </div>
          )}

          {loading && loadingStep && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm flex items-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin flex-shrink-0" />
              <span>{loadingStep}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.displayName')}
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setError(''); // Clear error when user types
                }}
                required
                disabled={loading || success}
                minLength={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:bg-gray-50"
                placeholder={t('auth.displayNamePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(''); // Clear error when user types
                }}
                required
                disabled={loading || success}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:bg-gray-50"
                placeholder={t('auth.emailPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(''); // Clear error when user types
                }}
                required
                disabled={loading || success}
                minLength={6}
                maxLength={72}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:bg-gray-50"
                placeholder={t('auth.passwordMinLength')}
              />
              {password && (
                <p className="mt-1 text-xs text-gray-500">
                  {password.length < 6
                    ? t('auth.passwordMoreChars', { count: 6 - password.length })
                    : password.length > 72
                      ? t('auth.passwordTooLong')
                      : t('auth.passwordLooksGood')}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('auth.creatingAccount')}
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  {t('auth.accountCreated')}
                </>
              ) : (
                t('auth.createAccount')
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('auth.alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                {t('auth.signIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
