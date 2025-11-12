import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageSwitcher } from '../LanguageSwitcher';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: vi.fn().mockResolvedValue(undefined),
      isInitialized: true,
      on: vi.fn(),
      off: vi.fn(),
    },
    ready: true,
  }),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders language switcher button', () => {
    render(<LanguageSwitcher variant="dropdown" size="md" />);
    const button = screen.getByLabelText(/language/i);
    expect(button).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    render(<LanguageSwitcher variant="dropdown" size="md" />);
    const button = screen.getByLabelText(/language/i);

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('EN')).toBeInTheDocument();
    });
  });

  it('renders all available languages in dropdown', async () => {
    render(<LanguageSwitcher variant="dropdown" size="md" />);
    const button = screen.getByLabelText(/language/i);

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('EN')).toBeInTheDocument();
      expect(screen.getByText('FR')).toBeInTheDocument();
      expect(screen.getByText('ES')).toBeInTheDocument();
    });
  });
});
