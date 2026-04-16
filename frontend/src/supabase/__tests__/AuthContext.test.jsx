import { describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { render } from '@testing-library/react'
import { AuthProvider, useAuth } from '../AuthContext.jsx'

const mockGetSession = vi.fn()
const mockOnAuthStateChange = vi.fn()

vi.mock('../supabaseClient', () => ({
  isSupabaseConfigured: vi.fn(() => true),
  supabase: {
    auth: {
      getSession: (...args) => mockGetSession(...args),
      onAuthStateChange: (...args) => mockOnAuthStateChange(...args),
      refreshSession: vi.fn(),
      signOut: vi.fn(),
    },
  },
}))

function AuthStateProbe() {
  const { loading, user, isSessionValid } = useAuth()

  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="user">{user ? 'present' : 'missing'}</span>
      <span data-testid="session-valid">{String(isSessionValid)}</span>
    </div>
  )
}

describe('AuthProvider', () => {
  it('stops loading when initial session lookup fails', async () => {
    mockGetSession.mockRejectedValueOnce(new Error('network down'))
    mockOnAuthStateChange.mockReturnValue({
      data: {
        subscription: {
          unsubscribe: vi.fn(),
        },
      },
    })

    render(
      <AuthProvider>
        <AuthStateProbe />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    })

    expect(screen.getByTestId('user')).toHaveTextContent('missing')
    expect(screen.getByTestId('session-valid')).toHaveTextContent('false')
  })
})
