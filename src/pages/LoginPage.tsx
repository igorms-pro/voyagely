import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../lib/store';
import { Plane, CheckCircle2 } from 'lucide-react';
import { setSentryUser } from '../lib/sentry';
import { Analytics } from '../lib/analytics';

export default function LoginPage() {
  const { t } = useTranslation();
  // Default fake credentials
  const [email, setEmail] = useState('demo@wanderly.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const location = useLocation();
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  // Check for success message from signup redirect
  useEffect(() => {
    if (location.state && (location.state as any).message) {
      setSuccessMessage((location.state as any).message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // Fake authentication - no API calls
      // Create a fake user object
      const fakeUserId = 'demo-user-' + Date.now();
      const user = {
        id: fakeUserId,
        email: email,
        display_name: email.split('@')[0],
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        created_at: new Date().toISOString(),
      };

      setUser(user);

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

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || t('auth.failedToSignIn'));
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.welcomeTitle')}</h1>
          <p className="text-gray-600">{t('auth.welcomeSubtitle')}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('auth.signIn')}</h2>

          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder={t('auth.passwordPlaceholder')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('auth.signingIn') : t('auth.signInButton')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('auth.dontHaveAccount')}{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                {t('auth.signUp')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
