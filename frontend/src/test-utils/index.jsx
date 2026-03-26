import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

/**
 * Mock auth context value for testing
 */
export const mockAuthContext = {
  user: null,
  session: null,
  loading: false,
  signOut: vi.fn(),
  refreshSession: vi.fn(),
  isSessionValid: false,
}

/**
 * Mock authenticated user
 */
export const mockUser = {
  id: '00000000-0000-4000-8000-000000000001',
  email: 'test@example.com',
  user_metadata: { username: 'testuser' },
  email_confirmed_at: '2024-01-01T00:00:00Z',
}

/**
 * Custom render with MemoryRouter (for components using React Router hooks)
 */
export function renderWithRouter(ui, { initialEntries = ['/'], ...options } = {}) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {ui}
    </MemoryRouter>,
    options
  )
}

// Re-export everything from testing-library for convenience
export * from '@testing-library/react'
export { renderWithRouter as render }
