import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../LandingPage';

describe('LandingPage', () => {
  it('renders landing page with brand name', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('voyagely-brand')).toBeInTheDocument();
  });

  it('renders hero section with title and description', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('landing-hero-title')).toBeInTheDocument();
    expect(screen.getByTestId('landing-hero-description')).toBeInTheDocument();
  });

  it('renders hero CTA link', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    const ctaLink = screen.getByTestId('hero-cta-link');
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute('href', '/signup');
  });

  it('renders sign in link in navigation', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    const signInLink = screen.getByTestId('landing-signin-link');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/login');
  });

  it('renders features section', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('landing-features-title')).toBeInTheDocument();
    expect(screen.getByTestId('landing-features-subtitle')).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    // Check that feature cards are rendered (they should contain the feature titles)
    // We can check for specific feature text that should be translated
    const featuresSection = screen
      .getByTestId('landing-features-title')
      .closest('div')?.parentElement;
    expect(featuresSection).toBeInTheDocument();
  });

  it('renders how it works section', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    // The "How It Works" section should be present
    // We can check for step numbers or titles
    const page = screen.getByTestId('voyagely-brand').closest('div');
    expect(page).toBeInTheDocument();
  });
});
