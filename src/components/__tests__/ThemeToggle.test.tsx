import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';

// Mock next-themes
const mockSetTheme = vi.fn();
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
    resolvedTheme: 'light',
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders theme toggle button', () => {
    render(<ThemeToggle />);
    const button = screen.getByLabelText(/switch to (dark|light) mode/i);
    expect(button).toBeInTheDocument();
  });

  it('shows moon icon in light mode', () => {
    render(<ThemeToggle />);
    // Moon icon should be visible in light mode (to switch to dark)
    expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument();
  });

  it('calls setTheme when clicked', () => {
    render(<ThemeToggle />);
    const button = screen.getByLabelText(/switch to dark mode/i);

    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
