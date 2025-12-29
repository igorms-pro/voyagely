import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

describe('App', () => {
  it('renders landing page with Voyagely brand', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('voyagely-brand')).toBeInTheDocument();
  });
});
