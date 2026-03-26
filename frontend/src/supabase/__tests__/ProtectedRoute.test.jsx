import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { render } from '@testing-library/react'
import { ProtectedRoute, PublicRoute } from '../ProtectedRoute.jsx'

// Mock the useAuth hook so we control auth state per test
vi.mock('../AuthContext.jsx', () => ({
  useAuth: vi.fn(),
}))

import { useAuth } from '../AuthContext.jsx'

const baseAuth = {
  user: null,
  session: null,
  loading: false,
  signOut: vi.fn(),
  refreshSession: vi.fn(),
  isSessionValid: false,
}

const loggedInAuth = {
  ...baseAuth,
  user: { id: 'user-1', email: 'test@example.com' },
  session: { access_token: 'tok' },
  isSessionValid: true,
}

function wrap(ui, initialPath = '/') {
  return render(<MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>)
}

// ── ProtectedRoute ──────────────────────────────────────────────────────────

describe('ProtectedRoute', () => {
  it('renders a loading spinner when auth is loading', () => {
    useAuth.mockReturnValue({ ...baseAuth, loading: true })
    wrap(<ProtectedRoute><div>Protected Content</div></ProtectedRoute>)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('redirects to /login when user is not authenticated', () => {
    useAuth.mockReturnValue(baseAuth)
    wrap(
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute><div>Protected Content</div></ProtectedRoute>}
        />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    )
    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('renders children when user is authenticated', () => {
    useAuth.mockReturnValue(loggedInAuth)
    wrap(<ProtectedRoute><div>Protected Content</div></ProtectedRoute>)
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('does not redirect authenticated user to /login', () => {
    useAuth.mockReturnValue(loggedInAuth)
    wrap(
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute><div>Protected Content</div></ProtectedRoute>}
        />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    )
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })
})

// ── PublicRoute ─────────────────────────────────────────────────────────────

describe('PublicRoute', () => {
  it('renders children when user is NOT authenticated', () => {
    useAuth.mockReturnValue(baseAuth)
    wrap(<PublicRoute><div>Public Content</div></PublicRoute>)
    expect(screen.getByText('Public Content')).toBeInTheDocument()
  })

  it('redirects authenticated users to /dashboard', () => {
    useAuth.mockReturnValue(loggedInAuth)
    wrap(
      <Routes>
        <Route
          path="/"
          element={<PublicRoute><div>Public Content</div></PublicRoute>}
        />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      </Routes>
    )
    expect(screen.getByText('Dashboard Page')).toBeInTheDocument()
    expect(screen.queryByText('Public Content')).not.toBeInTheDocument()
  })

  it('renders nothing while loading', () => {
    useAuth.mockReturnValue({ ...baseAuth, loading: true })
    wrap(<PublicRoute><div>Public Content</div></PublicRoute>)
    expect(screen.queryByText('Public Content')).not.toBeInTheDocument()
  })

  it('does not redirect unauthenticated user away from public route', () => {
    useAuth.mockReturnValue(baseAuth)
    wrap(
      <Routes>
        <Route
          path="/"
          element={<PublicRoute><div>Public Content</div></PublicRoute>}
        />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      </Routes>
    )
    expect(screen.getByText('Public Content')).toBeInTheDocument()
    expect(screen.queryByText('Dashboard Page')).not.toBeInTheDocument()
  })
})
