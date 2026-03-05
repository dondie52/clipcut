import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../test-utils/index.jsx'
import DesktopRegister from '../DesktopRegister.jsx'

vi.mock('../../supabase/authService.js', () => ({
  signUp: vi.fn(),
  signInWithGoogle: vi.fn(),
}))

vi.mock('../../utils/analytics.js', () => ({
  trackEvent: vi.fn(),
  analyticsEvents: {
    registerAttempt: 'register_attempt',
    registerSuccess: 'register_success',
    registerFailure: 'register_failure',
    googleSignInAttempt: 'google_sign_in_attempt',
  },
}))

vi.mock('../../utils/errorTracking.js', () => ({
  captureError: vi.fn(),
  addBreadcrumb: vi.fn(),
}))

// Mock rate limiter so it never blocks form submissions in tests
vi.mock('../../utils/rateLimiter.js', () => ({
  createRateLimiter: () => ({
    canAttempt: vi.fn().mockReturnValue(true),
    recordAttempt: vi.fn(),
    getTimeUntilReset: vi.fn().mockReturnValue(0),
  }),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

import { signUp, signInWithGoogle } from '../../supabase/authService.js'

const VALID_FORM = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'StrongP@ss1',
  confirmPassword: 'StrongP@ss1',
}

describe('DesktopRegister', () => {
  const onNavigateToLogin = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  function renderRegister() {
    return renderWithRouter(<DesktopRegister onNavigateToLogin={onNavigateToLogin} />)
  }

  async function fillForm(user, overrides = {}) {
    const data = { ...VALID_FORM, ...overrides }
    await user.type(screen.getByLabelText(/username/i), data.username)
    await user.type(screen.getByLabelText(/email address/i), data.email)
    await user.type(screen.getByLabelText(/^password$/i), data.password)
    await user.type(screen.getByLabelText(/confirm password/i), data.confirmPassword)
  }

  it('renders all form fields', () => {
    renderRegister()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
  })

  it('renders Create Account button', () => {
    renderRegister()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('renders Continue with Google button', () => {
    renderRegister()
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument()
  })

  it('calls onNavigateToLogin when Sign in link is clicked', async () => {
    const user = userEvent.setup()
    renderRegister()
    await user.click(screen.getByText('Sign in'))
    expect(onNavigateToLogin).toHaveBeenCalledOnce()
  })

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup()
    renderRegister()
    await user.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
    })
  })

  it('shows error for short username', async () => {
    const user = userEvent.setup()
    renderRegister()
    await fillForm(user, { username: 'ab' })
    await user.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => {
      expect(screen.getByText(/at least 3/i)).toBeInTheDocument()
    })
  })

  it('shows error for invalid email', async () => {
    const user = userEvent.setup()
    renderRegister()
    await fillForm(user, { email: 'bademail' })
    await user.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    })
  })

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup()
    renderRegister()
    await fillForm(user, { confirmPassword: 'Different1!' })
    await user.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument()
    })
  })

  it('calls signUp with correct data on valid submit', async () => {
    const user = userEvent.setup()
    signUp.mockResolvedValueOnce({ user: {}, session: {} })
    renderRegister()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        email: VALID_FORM.email,
        password: VALID_FORM.password,
        username: VALID_FORM.username,
      })
    })
  })

  it('navigates to /onboarding/1 on successful registration', async () => {
    const user = userEvent.setup()
    signUp.mockResolvedValueOnce({ user: {}, session: {} })
    renderRegister()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/onboarding/1')
    })
  })

  it('shows error on signUp failure', async () => {
    const user = userEvent.setup()
    signUp.mockRejectedValueOnce(new Error('User already registered'))
    renderRegister()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('shows loading state while creating account', async () => {
    const user = userEvent.setup()
    signUp.mockReturnValueOnce(new Promise(() => {}))
    renderRegister()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => {
      expect(screen.getByText(/creating account/i)).toBeInTheDocument()
    })
  })

  it('sanitizes username to remove special characters', async () => {
    const user = userEvent.setup()
    signUp.mockResolvedValueOnce({ user: {}, session: {} })
    renderRegister()
    // Type username with special chars — the component sanitizes onChange
    const usernameInput = screen.getByLabelText(/username/i)
    await user.type(usernameInput, 'user@name!')
    // The sanitized value should only contain alphanumeric + underscore
    expect(usernameInput.value).toMatch(/^[a-zA-Z0-9_]*$/)
  })

  it('shows password strength indicator when typing', async () => {
    const user = userEvent.setup()
    renderRegister()
    await user.type(screen.getByLabelText(/^password$/i), 'StrongP@ss1')
    await waitFor(() => {
      // Strength label text (Strong or Very Strong) should be visible
      expect(screen.getByText(/strong/i)).toBeInTheDocument()
    })
  })

  it('calls signInWithGoogle when Google button is clicked', async () => {
    const user = userEvent.setup()
    signInWithGoogle.mockResolvedValueOnce({})
    renderRegister()
    await user.click(screen.getByRole('button', { name: /google/i }))
    expect(signInWithGoogle).toHaveBeenCalledOnce()
  })
})
