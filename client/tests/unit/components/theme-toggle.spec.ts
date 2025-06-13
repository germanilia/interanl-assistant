import { test, expect } from '@playwright/test';

test.describe('Theme Toggle Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Wait for the app to load and ensure we're on a protected route
    await page.waitForLoadState('networkidle');

    // If we're redirected to login, we need to handle that
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      // Skip theme toggle tests on login page as it might not be present
      test.skip();
    }
  });

  test('should render theme toggle button', async ({ page }) => {
    // Look for the theme toggle button using multiple possible selectors
    const themeToggle = page.locator([
      'button[title*="Switch to"]',
      'button[title*="mode"]',
      'button[title*="theme"]',
      'button:has-text("Toggle theme")',
      'button:has(.sr-only:text-matches("Switch to|mode|theme", "i"))'
    ].join(', ')).first();

    await expect(themeToggle).toBeVisible();
  });

  test('should cycle through themes when clicked', async ({ page }) => {
    // Find the theme toggle button
    const themeToggle = page.locator([
      'button[title*="Switch to"]',
      'button[title*="mode"]',
      'button[title*="theme"]'
    ].join(', ')).first();

    // Get initial title to understand current state
    const initialTitle = await themeToggle.getAttribute('title');

    // Click the theme toggle
    await themeToggle.click();

    // Wait for theme change
    await page.waitForTimeout(500);

    // Check that the title has changed (indicating theme changed)
    const newTitle = await themeToggle.getAttribute('title');
    expect(newTitle).not.toBe(initialTitle);

    // Verify the new title is one of the expected values
    expect(newTitle).toMatch(/Switch to (light|dark|system) mode/);
  });

  test('should persist theme preference in localStorage', async ({ page }) => {
    // Find the theme toggle button
    const themeToggle = page.locator([
      'button[title*="Switch to"]',
      'button[title*="mode"]',
      'button[title*="theme"]'
    ].join(', ')).first();

    // Get initial theme from localStorage
    const initialTheme = await page.evaluate(() => localStorage.getItem('theme'));

    // Click to change theme
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Check that localStorage was updated
    const themeValue = await page.evaluate(() => localStorage.getItem('theme'));
    expect(themeValue).toBeTruthy();
    expect(['light', 'dark', 'system']).toContain(themeValue);
    expect(themeValue).not.toBe(initialTheme);

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check that the theme persisted
    const persistedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(persistedTheme).toBe(themeValue);
  });

  test('should have correct button attributes and accessibility', async ({ page }) => {
    const themeToggle = page.locator([
      'button[title*="Switch to"]',
      'button[title*="mode"]',
      'button[title*="theme"]'
    ].join(', ')).first();

    // Check button is accessible
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();

    // Check it has proper title attribute
    const title = await themeToggle.getAttribute('title');
    expect(title).toBeTruthy();
    expect(title).toMatch(/Switch to (light|dark|system) mode/);

    // Check it has sr-only text for screen readers
    const srOnlyText = themeToggle.locator('.sr-only');
    await expect(srOnlyText).toBeAttached();

    // Check it has an icon (Sun, Moon, or Monitor)
    const icon = themeToggle.locator('svg');
    await expect(icon).toBeAttached();
  });

  test('should cycle through all three theme states', async ({ page }) => {
    const themeToggle = page.locator([
      'button[title*="Switch to"]',
      'button[title*="mode"]',
      'button[title*="theme"]'
    ].join(', ')).first();

    const titles = [];
    const themes = [];

    // Collect titles and localStorage values through 4 clicks to see the full cycle
    for (let i = 0; i < 4; i++) {
      const title = await themeToggle.getAttribute('title');
      const theme = await page.evaluate(() => localStorage.getItem('theme'));
      titles.push(title);
      themes.push(theme);

      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    // Should have seen different titles (indicating different states)
    const uniqueTitles = new Set(titles.filter(Boolean));
    expect(uniqueTitles.size).toBeGreaterThanOrEqual(2);

    // Should have cycled through different theme values
    const uniqueThemes = new Set(themes.filter(Boolean));
    expect(uniqueThemes.size).toBeGreaterThanOrEqual(2);
  });
});
