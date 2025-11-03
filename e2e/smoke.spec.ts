import { test, expect } from '@playwright/test';

test('landing page renders Wanderly brand and CTA', async ({ page }) => {
  await page.goto('/');

  // Wait for page to load completely
  await page.waitForLoadState('networkidle');

  // Wait for React to render - check if root element exists
  await page.waitForSelector('#root', { state: 'attached' });

  // Wait a bit for React to hydrate and i18n to initialize
  await page.waitForTimeout(2000);

  // Use data-testid for reliable element selection
  await expect(page.getByTestId('wanderly-brand')).toBeVisible({ timeout: 10000 });

  // Check for CTA link - try multiple possible texts (use first match to avoid strict mode violation)
  const ctaLink = page.getByRole('link', { name: /Get Started|Sign Up|Start Planning/i }).first();
  await expect(ctaLink).toBeVisible({ timeout: 10000 });
});
