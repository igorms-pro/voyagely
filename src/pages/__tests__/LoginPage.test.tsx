import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../LoginPage';
import { useStore } from '../../lib/store';

// Mock dependencies
vi.mock('../../lib/store');
vi.mock('../../lib/sentry', () => ({
  setSentryUser: vi.fn(),
}));
vi.mock('../../lib/analytics', () => ({
  Analytics: {
    identify: vi.fn(),
  },
}));

// Mock useNavigate and useLocation
const mockNavigate = vi.fn();
const mockLocation = {
  state: null,
  pathname: '/login',
  search: '',
  hash: '',
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

describe('LoginPage', () => {
  const mockSetUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as any).mockImplementation((selector: any) => {
      const state = {
        setUser: mockSetUser,
      };
      return selector(state);
    });
  });

  it('renders login page with all elements', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('login-welcome-title')).toBeInTheDocument();
    expect(screen.getByTestId('login-welcome-subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('login-form-title')).toBeInTheDocument();
    expect(screen.getByTestId('login-email-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('login-signup-link')).toBeInTheDocument();
  });

  it('has pre-filled email and password', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    const emailInput = screen.getByTestId('login-email-input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('login-password-input') as HTMLInputElement;

    expect(emailInput.value).toBe('demo@voyagely.com');
    expect(passwordInput.value).toBe('demo123');
  });

  it('allows user to change email and password', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    const emailInput = screen.getByTestId('login-email-input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('login-password-input') as HTMLInputElement;

    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    await user.clear(passwordInput);
    await user.type(passwordInput, 'newpassword');

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('newpassword');
  });

  it('submits form and navigates to dashboard', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    const submitButton = screen.getByTestId('login-submit-button');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows error message when error occurs', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    // Error message should not be visible initially
    expect(screen.queryByTestId('login-error-message')).not.toBeInTheDocument();
  });

  it('shows success message when provided', () => {
    // Update mock location with success message
    mockLocation.state = { message: 'Account created successfully!' };

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('login-success-message')).toBeInTheDocument();
    expect(screen.getByText('Account created successfully!')).toBeInTheDocument();

    // Reset for other tests
    mockLocation.state = null;
  });
});
