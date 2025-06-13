import { test, expect } from '@playwright/test';

test.describe('Login Remember Me Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/login');
    await page.evaluate(() => localStorage.clear());
    await page.waitForLoadState('networkidle');
  });

  test('should display remember me checkbox', async ({ page }) => {
    // Check that the remember me checkbox is visible
    const rememberMeCheckbox = page.locator('#remember-me');
    const rememberMeLabel = page.locator('label[for="remember-me"]');

    await expect(rememberMeCheckbox).toBeVisible();
    await expect(rememberMeLabel).toBeVisible();
    await expect(rememberMeLabel).toHaveText('Remember me');
  });

  test('should handle checkbox interaction correctly', async ({ page }) => {
    const rememberMeCheckbox = page.locator('#remember-me');

    // Initially unchecked
    await expect(rememberMeCheckbox).not.toBeChecked();

    // Check it
    await rememberMeCheckbox.check();
    await expect(rememberMeCheckbox).toBeChecked();

    // Uncheck it
    await rememberMeCheckbox.uncheck();
    await expect(rememberMeCheckbox).not.toBeChecked();
  });

  test('should load saved credentials on page load', async ({ page }) => {
    // Manually set saved credentials in localStorage
    await page.evaluate(() => {
      const credentials = {
        email: btoa('test@example.com'),
        password: btoa('testpassword')
      };
      localStorage.setItem('saved_credentials', JSON.stringify(credentials));
      localStorage.setItem('remember_me', 'true');
    });

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check that form is pre-filled
    await expect(page.locator('#email')).toHaveValue('test@example.com');
    await expect(page.locator('#password')).toHaveValue('testpassword');
    await expect(page.locator('#remember-me')).toBeChecked();
  });

  test('should clear credentials when remember me is unchecked', async ({ page }) => {
    // First, set up saved credentials
    await page.evaluate(() => {
      const credentials = {
        email: btoa('test@example.com'),
        password: btoa('testpassword')
      };
      localStorage.setItem('saved_credentials', JSON.stringify(credentials));
      localStorage.setItem('remember_me', 'true');
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify credentials are loaded
    await expect(page.locator('#remember-me')).toBeChecked();

    // Uncheck remember me
    await page.locator('#remember-me').uncheck();

    // Verify localStorage is cleared
    const isCleared = await page.evaluate(() => {
      return localStorage.getItem('saved_credentials') === null &&
             localStorage.getItem('remember_me') === null;
    });

    expect(isCleared).toBe(true);
  });

  test('should handle form interaction correctly', async ({ page }) => {
    const emailInput = page.locator('#email');
    const passwordInput = page.locator('#password');
    const rememberMeCheckbox = page.locator('#remember-me');
    const submitButton = page.locator('button[type="submit"]');

    // Fill form
    await emailInput.fill('user@example.com');
    await passwordInput.fill('password123');
    await rememberMeCheckbox.check();

    // Verify all fields are filled correctly
    await expect(emailInput).toHaveValue('user@example.com');
    await expect(passwordInput).toHaveValue('password123');
    await expect(rememberMeCheckbox).toBeChecked();

    // Verify submit button is enabled
    await expect(submitButton).toBeEnabled();
    await expect(submitButton).toHaveText('Sign In');
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    const rememberMeCheckbox = page.locator('#remember-me');

    // Initially should be enabled
    await expect(rememberMeCheckbox).toBeEnabled();

    // The checkbox should have proper accessibility attributes
    await expect(rememberMeCheckbox).toHaveAttribute('id', 'remember-me');

    // Label should be properly associated
    const label = page.locator('label[for="remember-me"]');
    await expect(label).toBeVisible();
  });
});
