import { test, expect } from '@playwright/test';

test('landing page renders Wanderly brand and CTA', async ({ page }) => {
  await page.goto('/');
  // Use data-testid for reliable element selection
  await expect(page.getByTestId('wanderly-brand')).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Get Started|Sign Up|Start Planning/i }),
  ).toBeVisible();
});
