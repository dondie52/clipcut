import { test, expect } from '@playwright/test'

/**
 * E2E Tests: Authentication Flow
 *
 * Tests the complete login and registration flows end-to-end.
 * Requires the dev server to be running (handled by webServer in playwright.config.js).
 *
 * NOTE: These tests use real navigation but mock Supabase via test environment variables
 * or by checking UI state only (no real DB calls asserted here).
 */

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page (assuming splash is skipped or auto-redirects)
    await page.goto('/login')
    // Wait for the form to be visible
    await page.waitForSelector('input[type="email"]', { timeout: 10000 })
  })

  test('renders email and password fields', async ({ page }) => {
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
  })

  test('renders the Sign In button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('renders Forgot password link', async ({ page }) => {
    await expect(page.getByRole('button', { name: /forgot password/i })).toBeVisible()
  })

  test('shows validation error for empty form submission', async ({ page }) => {
    await page.getByRole('button', { name: /sign in/i }).click()
    // At least one validation error should appear
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 3000 })
  })

  test('shows validation error for invalid email', async ({ page }) => {
    await page.getByLabel(/email/i).fill('notanemail')
    await page.getByLabel(/password/i).fill('somepassword')
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page.getByText(/valid email/i)).toBeVisible({ timeout: 3000 })
  })

  test('shows validation error when password is empty', async ({ page }) => {
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 3000 })
  })

  test('toggles password visibility', async ({ page }) => {
    const passwordInput = page.getByLabel(/^password$/i)
    await expect(passwordInput).toHaveAttribute('type', 'password')
    await page.getByRole('button', { name: /show password/i }).click()
    await expect(passwordInput).toHaveAttribute('type', 'text')
    await page.getByRole('button', { name: /hide password/i }).click()
    await expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('shows loading state while sign-in is processing', async ({ page }) => {
    // Fill valid-format credentials (will fail auth but we check loading state)
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/password/i).fill('StrongP@ss1')
    await page.getByRole('button', { name: /sign in/i }).click()
    // The button should briefly show "Signing in..."
    await expect(page.getByText(/signing in/i)).toBeVisible({ timeout: 3000 })
  })

  test('forgot password shows success message for valid email', async ({ page }) => {
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByRole('button', { name: /forgot password/i }).click()
    // Should show success regardless of whether the email exists (anti-enumeration)
    await expect(page.getByText(/password reset link/i)).toBeVisible({ timeout: 5000 })
  })

  test('forgot password shows email validation error for invalid email', async ({ page }) => {
    await page.getByLabel(/email/i).fill('bademail')
    await page.getByRole('button', { name: /forgot password/i }).click()
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 3000 })
  })
})

test.describe('Registration Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register')
    await page.waitForSelector('input[type="text"]', { timeout: 10000 })
  })

  test('renders all registration form fields', async ({ page }) => {
    await expect(page.getByLabel(/username/i)).toBeVisible()
    await expect(page.getByLabel(/email address/i)).toBeVisible()
    await expect(page.getByLabel(/^password$/i)).toBeVisible()
    await expect(page.getByLabel(/confirm password/i)).toBeVisible()
  })

  test('renders Create Account and Google buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /google/i })).toBeVisible()
  })

  test('shows validation errors on empty form submit', async ({ page }) => {
    await page.getByRole('button', { name: /create account/i }).click()
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 3000 })
  })

  test('shows error for short username', async ({ page }) => {
    await page.getByLabel(/username/i).fill('ab')
    await page.getByRole('button', { name: /create account/i }).click()
    await expect(page.getByText(/at least 3/i)).toBeVisible({ timeout: 3000 })
  })

  test('shows error for mismatched passwords', async ({ page }) => {
    await page.getByLabel(/username/i).fill('validuser')
    await page.getByLabel(/email address/i).fill('test@example.com')
    await page.getByLabel(/^password$/i).fill('StrongP@ss1')
    await page.getByLabel(/confirm password/i).fill('DifferentP@ss1')
    await page.getByRole('button', { name: /create account/i }).click()
    await expect(page.getByText(/passwords don't match/i)).toBeVisible({ timeout: 3000 })
  })

  test('password strength indicator appears when typing', async ({ page }) => {
    await page.getByLabel(/^password$/i).fill('StrongP@ss1')
    await expect(page.getByText(/strong/i)).toBeVisible({ timeout: 3000 })
  })

  test('username field only allows alphanumeric and underscore', async ({ page }) => {
    const usernameInput = page.getByLabel(/username/i)
    await usernameInput.fill('user@name!')
    const value = await usernameInput.inputValue()
    expect(value).toMatch(/^[a-zA-Z0-9_]*$/)
  })
})

test.describe('Navigation between Login and Register', () => {
  test('clicking Sign up on login page navigates to register', async ({ page }) => {
    await page.goto('/login')
    await page.waitForSelector('[href="#"], button', { timeout: 10000 })
    // Click the "Sign up" link
    await page.getByText('Sign up').click()
    // Should now show the Create Account form
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible({ timeout: 5000 })
  })

  test('clicking Sign in on register page navigates to login', async ({ page }) => {
    await page.goto('/register')
    await page.waitForSelector('[href="#"], button', { timeout: 10000 })
    await page.getByText('Sign in').click()
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible({ timeout: 5000 })
  })
})
