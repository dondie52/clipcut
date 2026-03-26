import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the Supabase client before importing the auth service
vi.mock('../supabaseClient.js', () => {
  const mockFrom = vi.fn()
  const mockSupabase = {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signInWithOAuth: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updateUser: vi.fn(),
      getSession: vi.fn(),
      getUser: vi.fn(),
      resend: vi.fn(),
      mfa: {
        enroll: vi.fn(),
        verify: vi.fn(),
        unenroll: vi.fn(),
        listFactors: vi.fn(),
        challenge: vi.fn(),
      },
    },
    from: mockFrom,
    rpc: vi.fn(),
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn(),
        getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/avatar.jpg' } }),
      }),
    },
  }

  // Chain helper: builder pattern for from().select()...
  const chainMock = () => {
    const obj = {
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockResolvedValue({ data: null, error: null }),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    }
    return obj
  }

  mockFrom.mockReturnValue(chainMock())

  return { supabase: mockSupabase }
})

vi.mock('../../utils/validation.js', async (importOriginal) => {
  const actual = await importOriginal()
  return actual
})

import { supabase } from '../supabaseClient.js'
import {
  signUp,
  signIn,
  signOut,
  resetPassword,
  updatePassword,
  getSession,
  getUser,
  resendVerificationEmail,
  isEmailVerified,
  checkAccountLockout,
  enable2FA,
  verify2FA,
  disable2FA,
  get2FAFactors,
} from '../authService.js'

// ── signUp ──────────────────────────────────────────────────────────────────

describe('signUp', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockResolvedValue({ error: null }),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    })
  })

  it('calls supabase.auth.signUp with email, password and username', async () => {
    supabase.auth.signUp.mockResolvedValue({
      data: { user: { id: 'user-1' }, session: null },
      error: null,
    })
    await signUp({ email: 'test@example.com', password: 'StrongP@ss1', username: 'testuser' })
    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'StrongP@ss1',
      options: { data: { username: 'testuser' } },
    })
  })

  it('throws when supabase returns an error', async () => {
    supabase.auth.signUp.mockResolvedValue({
      data: null,
      error: new Error('User already registered'),
    })
    await expect(signUp({ email: 'dup@example.com', password: 'P@ss1word', username: 'dup' }))
      .rejects.toThrow('User already registered')
  })

  it('returns data on success', async () => {
    const mockData = { user: { id: 'user-1' }, session: null }
    supabase.auth.signUp.mockResolvedValue({ data: mockData, error: null })
    const result = await signUp({ email: 'new@example.com', password: 'P@ss1word!', username: 'newuser' })
    expect(result).toEqual(mockData)
  })
})

// ── signIn ──────────────────────────────────────────────────────────────────

describe('signIn', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default: no lockout
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
      upsert: vi.fn().mockResolvedValue({ error: null }),
      delete: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
    })
  })

  it('calls signInWithPassword with credentials', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: { id: 'user-1' }, session: { access_token: 'tok' } },
      error: null,
    })
    await signIn({ email: 'test@example.com', password: 'StrongP@ss1' })
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'StrongP@ss1',
    })
  })

  it('throws when credentials are invalid', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: new Error('Invalid login credentials'),
    })
    await expect(signIn({ email: 'test@example.com', password: 'WrongP@ss1' }))
      .rejects.toThrow()
  })

  it('throws with lockout message when account is locked', async () => {
    const futureTime = new Date(Date.now() + 30 * 60 * 1000).toISOString()
    supabase.rpc.mockResolvedValue({
      data: {
        locked: true,
        locked_until: futureTime,
        attempts_remaining: 0,
      },
      error: null,
    })
    await expect(signIn({ email: 'locked@example.com', password: 'anything' }))
      .rejects.toThrow(/locked/i)
  })
})

// ── signOut ─────────────────────────────────────────────────────────────────

describe('signOut', () => {
  it('calls supabase.auth.signOut', async () => {
    supabase.auth.signOut.mockResolvedValue({ error: null })
    await signOut()
    expect(supabase.auth.signOut).toHaveBeenCalledOnce()
  })

  it('throws when signOut fails', async () => {
    supabase.auth.signOut.mockResolvedValue({ error: new Error('Network error') })
    await expect(signOut()).rejects.toThrow('Network error')
  })
})

// ── resetPassword ────────────────────────────────────────────────────────────

describe('resetPassword', () => {
  it('calls resetPasswordForEmail with the email', async () => {
    supabase.auth.resetPasswordForEmail.mockResolvedValue({ data: {}, error: null })
    await resetPassword('user@example.com')
    expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
      'user@example.com',
      expect.objectContaining({ redirectTo: expect.any(String) })
    )
  })

  it('throws on failure', async () => {
    supabase.auth.resetPasswordForEmail.mockResolvedValue({ data: null, error: new Error('rate limit') })
    await expect(resetPassword('user@example.com')).rejects.toThrow('rate limit')
  })
})

// ── updatePassword ───────────────────────────────────────────────────────────

describe('updatePassword', () => {
  it('calls auth.updateUser with new password', async () => {
    supabase.auth.updateUser.mockResolvedValue({ data: { user: {} }, error: null })
    await updatePassword('NewP@ss1word')
    expect(supabase.auth.updateUser).toHaveBeenCalledWith({ password: 'NewP@ss1word' })
  })

  it('throws on failure', async () => {
    supabase.auth.updateUser.mockResolvedValue({ data: null, error: new Error('weak password') })
    await expect(updatePassword('weak')).rejects.toThrow()
  })
})

// ── getSession ───────────────────────────────────────────────────────────────

describe('getSession', () => {
  it('returns session data when authenticated', async () => {
    const mockSession = { access_token: 'tok', user: { id: 'u1' } }
    supabase.auth.getSession.mockResolvedValue({ data: { session: mockSession }, error: null })
    const session = await getSession()
    expect(session).toEqual(mockSession)
  })

  it('returns null when not authenticated', async () => {
    supabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
    const session = await getSession()
    expect(session).toBeNull()
  })

  it('throws on error', async () => {
    supabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: new Error('error') })
    await expect(getSession()).rejects.toThrow()
  })
})

// ── getUser ──────────────────────────────────────────────────────────────────

describe('getUser', () => {
  it('returns the current user', async () => {
    const mockUser = { id: 'u1', email: 'test@example.com' }
    supabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })
    const user = await getUser()
    expect(user).toEqual(mockUser)
  })

  it('throws on error', async () => {
    supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: new Error('auth error') })
    await expect(getUser()).rejects.toThrow()
  })
})

// ── resendVerificationEmail ───────────────────────────────────────────────────

describe('resendVerificationEmail', () => {
  it('calls auth.resend with signup type and email', async () => {
    supabase.auth.resend.mockResolvedValue({ data: {}, error: null })
    await resendVerificationEmail('user@example.com')
    expect(supabase.auth.resend).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'signup', email: 'user@example.com' })
    )
  })
})

// ── isEmailVerified ───────────────────────────────────────────────────────────

describe('isEmailVerified', () => {
  it('returns true when user has email_confirmed_at', async () => {
    supabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'u1', email_confirmed_at: '2024-01-01T00:00:00Z' } },
      error: null,
    })
    const result = await isEmailVerified('u1')
    expect(result).toBe(true)
  })

  it('returns false when email_confirmed_at is null', async () => {
    supabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'u1', email_confirmed_at: null } },
      error: null,
    })
    const result = await isEmailVerified('u1')
    expect(result).toBe(false)
  })

  it('returns false when getUser throws', async () => {
    supabase.auth.getUser.mockRejectedValue(new Error('network error'))
    const result = await isEmailVerified('u1')
    expect(result).toBe(false)
  })
})

// ── checkAccountLockout ───────────────────────────────────────────────────────

describe('checkAccountLockout', () => {
  it('returns unlocked when no record exists', async () => {
    supabase.rpc.mockResolvedValue({ data: null, error: null })
    const result = await checkAccountLockout('user@example.com')
    expect(result.locked).toBe(false)
  })

  it('returns locked when locked_until is in the future', async () => {
    const futureTime = new Date(Date.now() + 10 * 60 * 1000).toISOString()
    supabase.rpc.mockResolvedValue({
      data: {
        locked: true,
        locked_until: futureTime,
        attempts_remaining: 0,
      },
      error: null,
    })
    const result = await checkAccountLockout('user@example.com')
    expect(result.locked).toBe(true)
    expect(result.attemptsRemaining).toBe(0)
  })

  it('returns unlocked when locked_until is in the past', async () => {
    const pastTime = new Date(Date.now() - 10 * 60 * 1000).toISOString()
    supabase.rpc.mockResolvedValue({
      data: {
        locked: false,
        locked_until: pastTime,
        attempts_remaining: 3,
      },
      error: null,
    })
    const result = await checkAccountLockout('user@example.com')
    expect(result.locked).toBe(false)
  })
})

// ── 2FA functions ─────────────────────────────────────────────────────────────

describe('enable2FA', () => {
  it('calls mfa.enroll with totp factor type', async () => {
    supabase.auth.mfa.enroll.mockResolvedValue({ data: { qr: 'url', secret: 'abc' }, error: null })
    const result = await enable2FA()
    expect(supabase.auth.mfa.enroll).toHaveBeenCalledWith(
      expect.objectContaining({ factorType: 'totp' })
    )
    expect(result).toHaveProperty('qr')
  })

  it('throws on failure', async () => {
    supabase.auth.mfa.enroll.mockResolvedValue({ data: null, error: new Error('mfa error') })
    await expect(enable2FA()).rejects.toThrow()
  })
})

describe('verify2FA', () => {
  it('calls mfa.verify with factorId and code', async () => {
    supabase.auth.mfa.verify.mockResolvedValue({ data: {}, error: null })
    await verify2FA('factor-1', '123456')
    expect(supabase.auth.mfa.verify).toHaveBeenCalledWith({ factorId: 'factor-1', code: '123456' })
  })
})

describe('disable2FA', () => {
  it('calls mfa.unenroll with factorId', async () => {
    supabase.auth.mfa.unenroll.mockResolvedValue({ data: {}, error: null })
    await disable2FA('factor-1')
    expect(supabase.auth.mfa.unenroll).toHaveBeenCalledWith({ factorId: 'factor-1' })
  })
})

describe('get2FAFactors', () => {
  it('returns an array of factors', async () => {
    supabase.auth.mfa.listFactors.mockResolvedValue({
      data: { factors: [{ id: 'f1', type: 'totp' }] },
      error: null,
    })
    const factors = await get2FAFactors()
    expect(Array.isArray(factors)).toBe(true)
    expect(factors[0]).toHaveProperty('id', 'f1')
  })

  it('returns empty array on error', async () => {
    supabase.auth.mfa.listFactors.mockResolvedValue({ data: null, error: new Error('error') })
    const factors = await get2FAFactors()
    expect(factors).toEqual([])
  })
})
