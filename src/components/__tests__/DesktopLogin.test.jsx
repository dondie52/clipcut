import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../test-utils/index.jsx'
import DesktopLogin from '../DesktopLogin.jsx'

// Mock Supabase auth service
vi.mock('../../supabase/authService.js', () => ({
  signIn: vi.fn(),
  resetPassword: vi.fn(),
}))

vi.mock('../../utils/analytics.js', () => ({
  trackEvent: vi.fn(),
  analyticsEvents: {
    loginAttempt: 'login_attempt',
    loginSuccess: 'login_success',
    loginFailure: 'login_failure',
    passwordResetRequested: 'password_reset_requested',
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

import { signIn, resetPassword } from '../../supabase/authService.js'

// Helper selectors — use exact label text to avoid matching aria-labels like "Show password"
const getEmail = () => screen.getByLabelText('Email')
const getPassword = () => screen.getByLabelText('Password')

describe('DesktopLogin', () => {
  const onNavigateToRegister = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  function renderLogin() {
    return renderWithRouter(<DesktopLogin onNavigateToRegister={onNavigateToRegister} />)
  }

  it('renders email and password fields', () => {
    renderLogin()
    expect(getEmail()).toBeInTheDocument()
    expect(getPassword()).toBeInTheDocument()
  })

  it('renders Sign In button', () => {
    renderLogin()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders Forgot password link', () => {
    renderLogin()
    expect(screen.getByRole('button', { name: /forgot password/i })).toBeInTheDocument()
  })

  it('renders sign up navigation link', () => {
    renderLogin()
    expect(screen.getByText(/sign up/i)).toBeInTheDocument()
  })

  it('calls onNavigateToRegister when Sign up is clicked', async () => {
    const user = userEvent.setup()
    renderLogin()
    await user.click(screen.getByText('Sign up'))
    expect(onNavigateToRegister).toHaveBeenCalledOnce()
  })

  it('shows validation errors when form is submitted empty', async () => {
    const user = userEvent.setup()
    renderLogin()
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
    })
  })

  it('shows email validation error for invalid email', async () => {
    const user = userEvent.setup()
    renderLogin()
    await user.type(getEmail(), 'notanemail')
    await user.type(getPassword(), 'somepass')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    })
  })

  it('calls signIn with sanitized credentials on valid submit', async () => {
    const user = userEvent.setup()
    signIn.mockResolvedValueOnce({ user: {}, session: {} })
    renderLogin()
    await user.type(getEmail(), ' Test@Example.COM ')
    await user.type(getPassword(), 'StrongP@ss1')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'StrongP@ss1',
      })
    })
  })

  it('navigates to /dashboard on successful login', async () => {
    const user = userEvent.setup()
    signIn.mockResolvedValueOnce({ user: {}, session: {} })
    renderLogin()
    await user.type(getEmail(), 'test@example.com')
    await user.type(getPassword(), 'StrongP@ss1')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('shows error alert on signIn failure', async () => {
    const user = userEvent.setup()
    signIn.mockRejectedValueOnce(new Error('Invalid login credentials'))
    renderLogin()
    await user.type(getEmail(), 'test@example.com')
    await user.type(getPassword(), 'StrongP@ss1')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('shows loading state while signing in', async () => {
    const user = userEvent.setup()
    signIn.mockReturnValueOnce(new Promise(() => {}))
    renderLogin()
    await user.type(getEmail(), 'test@example.com')
    await user.type(getPassword(), 'StrongP@ss1')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(screen.getByText(/signing in/i)).toBeInTheDocument()
    })
  })

  it('toggles password visibility when eye button is clicked', async () => {
    const user = userEvent.setup()
    renderLogin()
    const passwordInput = getPassword()
    expect(passwordInput).toHaveAttribute('type', 'password')
    await user.click(screen.getByRole('button', { name: /show password/i }))
    expect(passwordInput).toHaveAttribute('type', 'text')
    await user.click(screen.getByRole('button', { name: /hide password/i }))
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('shows success message after password reset request', async () => {
    const user = userEvent.setup()
    resetPassword.mockResolvedValueOnce({})
    renderLogin()
    await user.type(getEmail(), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /forgot password/i }))
    await waitFor(() => {
      expect(screen.getByText(/password reset link/i)).toBeInTheDocument()
    })
  })

  it('shows success message on reset even if resetPassword throws (anti-enumeration)', async () => {
    const user = userEvent.setup()
    resetPassword.mockRejectedValueOnce(new Error('user not found'))
    renderLogin()
    await user.type(getEmail(), 'unknown@example.com')
    await user.click(screen.getByRole('button', { name: /forgot password/i }))
    await waitFor(() => {
      expect(screen.getByText(/password reset link/i)).toBeInTheDocument()
    })
  })
})
