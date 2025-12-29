import { test, expect } from '@playwright/test';

test('landing page renders Voyagely brand and CTA', async ({ page }) => {
  // Listen for console errors and page errors to debug
  const errors: string[] = [];
  const warnings: string[] = [];

  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error') {
      errors.push(`Console Error: ${text}`);
    } else if (msg.type() === 'warning') {
      warnings.push(`Console Warning: ${text}`);
    }
  });

  page.on('pageerror', (error) => {
    errors.push(`Page Error: ${error.message}${error.stack ? '\n' + error.stack : ''}`);
  });

  // Go to the page
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Wait for React root element
  await page.waitForSelector('#root', { state: 'attached', timeout: 20000 });

  // Wait for Voyagely brand using test ID - this ensures React has rendered
  const brandText = page.getByTestId('voyagely-brand');
  await expect(brandText).toBeVisible({ timeout: 30000 });

  // Check for at least one CTA link (hero, nav, or footer)
  const heroCta = page.getByTestId('hero-cta-link');
  const navCta = page.getByTestId('nav-cta-link');
  const footerCta = page.getByTestId('footer-cta-link');

  // Check which CTA is visible
  const [heroVisible, navVisible, footerVisible] = await Promise.all([
    heroCta.isVisible().catch(() => false),
    navCta.isVisible().catch(() => false),
    footerCta.isVisible().catch(() => false),
  ]);

  if (!heroVisible && !navVisible && !footerVisible) {
    await page.screenshot({ path: 'test-results/debug-no-cta.png' });
    throw new Error(
      `No CTA link found. Hero visible: ${heroVisible}, Nav visible: ${navVisible}, Footer visible: ${footerVisible}. ` +
        `Errors: ${errors.join('; ')}`,
    );
  }
});
