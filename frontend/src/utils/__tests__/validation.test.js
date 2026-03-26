import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validatePasswordMatch,
  validateRegistration,
  validateLogin,
  sanitizeInput,
  sanitizeTextInput,
  sanitizeFileName,
  sanitizeSearchQuery,
  sanitizeUrlParam,
  sanitizeErrorMessage,
  getPasswordStrengthInfo,
  PASSWORD_REQUIREMENTS,
  USERNAME_REQUIREMENTS,
} from '../validation.js'

// ── validateEmail ──────────────────────────────────────────────────────────

describe('validateEmail', () => {
  it('returns valid for a well-formed email', () => {
    expect(validateEmail('user@example.com')).toMatchObject({ valid: true })
  })

  it('returns valid for email with subdomain', () => {
    expect(validateEmail('user@mail.example.co.bw')).toMatchObject({ valid: true })
  })

  it('rejects empty string', () => {
    expect(validateEmail('')).toMatchObject({ valid: false })
  })

  it('rejects null', () => {
    expect(validateEmail(null)).toMatchObject({ valid: false })
  })

  it('rejects missing @ symbol', () => {
    expect(validateEmail('notanemail.com')).toMatchObject({ valid: false })
  })

  it('rejects missing domain', () => {
    expect(validateEmail('user@')).toMatchObject({ valid: false })
  })

  it('rejects email longer than 254 chars', () => {
    const longEmail = 'a'.repeat(250) + '@b.com'
    expect(validateEmail(longEmail)).toMatchObject({ valid: false })
  })
})

// ── validateUsername ────────────────────────────────────────────────────────

describe('validateUsername', () => {
  it('accepts valid alphanumeric username', () => {
    expect(validateUsername('creator42')).toMatchObject({ valid: true })
  })

  it('accepts username with underscores', () => {
    expect(validateUsername('my_name_99')).toMatchObject({ valid: true })
  })

  it('rejects username shorter than minLength', () => {
    const short = 'ab'
    expect(short.length).toBeLessThan(USERNAME_REQUIREMENTS.minLength)
    expect(validateUsername(short)).toMatchObject({ valid: false })
  })

  it('rejects username longer than maxLength', () => {
    const long = 'a'.repeat(USERNAME_REQUIREMENTS.maxLength + 1)
    expect(validateUsername(long)).toMatchObject({ valid: false })
  })

  it('rejects username with spaces', () => {
    expect(validateUsername('bad username')).toMatchObject({ valid: false })
  })

  it('rejects username with special characters', () => {
    expect(validateUsername('user@name!')).toMatchObject({ valid: false })
  })

  it('rejects empty string', () => {
    expect(validateUsername('')).toMatchObject({ valid: false })
  })
})

// ── validatePassword ────────────────────────────────────────────────────────

describe('validatePassword', () => {
  it('accepts a strong password', () => {
    const result = validatePassword('StrongP@ss1')
    expect(result.valid).toBe(true)
    expect(result.strength).toBeGreaterThanOrEqual(3)
  })

  it('rejects a password shorter than minLength', () => {
    expect(validatePassword('Sh0rt!')).toMatchObject({ valid: false })
  })

  it('rejects password with no uppercase', () => {
    expect(validatePassword('weakpassword1!')).toMatchObject({ valid: false })
  })

  it('rejects password with no lowercase', () => {
    expect(validatePassword('ALLCAPS123!')).toMatchObject({ valid: false })
  })

  it('rejects password with no number', () => {
    expect(validatePassword('NoNumber!')).toMatchObject({ valid: false })
  })

  it('rejects password with no special character', () => {
    expect(validatePassword('NoSpecial1')).toMatchObject({ valid: false })
  })

  it('rejects empty string', () => {
    expect(validatePassword('')).toMatchObject({ valid: false })
  })

  it('returns strength 1 for a very weak password', () => {
    const result = validatePassword('short')
    expect(result.strength).toBe(1)
  })

  it('returns strength 4 for a very strong password', () => {
    const result = validatePassword('V3ry$tr0ngP@ssword!')
    expect(result.strength).toBe(4)
  })
})

// ── validatePasswordMatch ───────────────────────────────────────────────────

describe('validatePasswordMatch', () => {
  it('returns valid when passwords match', () => {
    expect(validatePasswordMatch('MyPass1!', 'MyPass1!')).toMatchObject({ valid: true })
  })

  it('returns invalid when passwords differ', () => {
    expect(validatePasswordMatch('MyPass1!', 'Different1!')).toMatchObject({ valid: false })
  })
})

// ── validateRegistration ────────────────────────────────────────────────────

describe('validateRegistration', () => {
  const valid = {
    email: 'test@example.com',
    password: 'StrongP@ss1',
    confirmPassword: 'StrongP@ss1',
    username: 'testuser',
  }

  it('returns valid for correct input', () => {
    expect(validateRegistration(valid)).toMatchObject({ valid: true })
  })

  it('collects all field errors at once', () => {
    const result = validateRegistration({
      email: 'bad-email',
      password: 'weak',
      confirmPassword: 'mismatch',
      username: 'ab',
    })
    expect(result.valid).toBe(false)
    expect(result.errors.email).toBeDefined()
    expect(result.errors.username).toBeDefined()
    expect(result.errors.password).toBeDefined()
  })

  it('catches mismatched confirm password', () => {
    const result = validateRegistration({ ...valid, confirmPassword: 'Wrong1!' })
    expect(result.valid).toBe(false)
    expect(result.errors.confirmPassword).toBeDefined()
  })
})

// ── validateLogin ───────────────────────────────────────────────────────────

describe('validateLogin', () => {
  it('returns valid for correct email + password', () => {
    expect(validateLogin({ email: 'user@example.com', password: 'anypass' })).toMatchObject({ valid: true })
  })

  it('returns invalid when email is bad', () => {
    expect(validateLogin({ email: 'notanemail', password: 'anypass' })).toMatchObject({ valid: false })
  })

  it('returns invalid when password is empty', () => {
    expect(validateLogin({ email: 'user@example.com', password: '' })).toMatchObject({ valid: false })
  })
})

// ── getPasswordStrengthInfo ─────────────────────────────────────────────────

describe('getPasswordStrengthInfo', () => {
  it('returns correct label for each strength level', () => {
    expect(getPasswordStrengthInfo(1).label).toBe('Weak')
    expect(getPasswordStrengthInfo(2).label).toBe('Fair')
    expect(getPasswordStrengthInfo(3).label).toBe('Strong')
    expect(getPasswordStrengthInfo(4).label).toBe('Very Strong')
  })

  it('returns empty label for strength 0', () => {
    expect(getPasswordStrengthInfo(0).label).toBe('')
  })
})

// ── sanitizeInput ───────────────────────────────────────────────────────────

describe('sanitizeInput', () => {
  it('escapes HTML entities', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).not.toContain('<script>')
  })

  it('returns empty string for null input', () => {
    expect(sanitizeInput(null)).toBe('')
  })

  it('escapes angle brackets', () => {
    const result = sanitizeInput('<b>bold</b>')
    expect(result).toContain('&lt;')
    expect(result).toContain('&gt;')
  })
})

// ── sanitizeTextInput ───────────────────────────────────────────────────────

describe('sanitizeTextInput', () => {
  it('strips HTML tags', () => {
    expect(sanitizeTextInput('<b>Hello</b>')).toBe('Hello')
  })

  it('trims whitespace', () => {
    expect(sanitizeTextInput('  hello  ')).toBe('hello')
  })

  it('respects maxLength option', () => {
    const result = sanitizeTextInput('a'.repeat(200), { maxLength: 50 })
    expect(result.length).toBeLessThanOrEqual(50)
  })

  it('removes control characters', () => {
    expect(sanitizeTextInput('hello\x00world')).toBe('helloworld')
  })

  it('preserves newlines when allowNewlines is true', () => {
    const input = 'line1\nline2'
    expect(sanitizeTextInput(input, { allowNewlines: true, maxLength: 100 })).toContain('\n')
  })

  it('strips newlines when allowNewlines is false', () => {
    const input = 'line1\nline2'
    expect(sanitizeTextInput(input, { allowNewlines: false, maxLength: 100 })).not.toContain('\n')
  })

  it('returns empty string for null', () => {
    expect(sanitizeTextInput(null)).toBe('')
  })
})

// ── sanitizeFileName ────────────────────────────────────────────────────────

describe('sanitizeFileName', () => {
  it('removes path traversal sequences', () => {
    expect(sanitizeFileName('../../etc/passwd')).not.toContain('..')
    expect(sanitizeFileName('../../etc/passwd')).not.toContain('/')
  })

  it('removes special characters', () => {
    const result = sanitizeFileName('my file (1).mp4')
    expect(result).toMatch(/^[a-zA-Z0-9._-]+$/)
  })

  it('returns "file" for empty input', () => {
    expect(sanitizeFileName('')).toBe('file')
    expect(sanitizeFileName(null)).toBe('file')
  })

  it('preserves extension', () => {
    expect(sanitizeFileName('video.mp4')).toContain('.mp4')
  })

  it('truncates very long filenames', () => {
    const long = 'a'.repeat(300) + '.mp4'
    expect(sanitizeFileName(long).length).toBeLessThanOrEqual(255)
  })
})

// ── sanitizeSearchQuery ─────────────────────────────────────────────────────

describe('sanitizeSearchQuery', () => {
  it('strips HTML tags from query', () => {
    expect(sanitizeSearchQuery('<script>xss</script>')).not.toContain('<')
  })

  it('trims whitespace', () => {
    expect(sanitizeSearchQuery('  search term  ')).toBe('search term')
  })

  it('respects maxLength', () => {
    const result = sanitizeSearchQuery('a'.repeat(300), { maxLength: 100 })
    expect(result.length).toBeLessThanOrEqual(100)
  })

  it('escapes regex characters when escapeRegex is true', () => {
    const result = sanitizeSearchQuery('(test)', { escapeRegex: true })
    expect(result).toContain('\\(')
    expect(result).toContain('\\)')
  })

  it('returns empty string for null', () => {
    expect(sanitizeSearchQuery(null)).toBe('')
  })
})

// ── sanitizeUrlParam ────────────────────────────────────────────────────────

describe('sanitizeUrlParam', () => {
  it('validates a correct UUID v4', () => {
    const uuid = '550e8400-e29b-41d4-a716-446655440000'
    expect(sanitizeUrlParam(uuid, { type: 'uuid' })).toMatchObject({ valid: true })
  })

  it('rejects an invalid UUID', () => {
    expect(sanitizeUrlParam('not-a-uuid', { type: 'uuid' })).toMatchObject({ valid: false })
  })

  it('validates enum values', () => {
    const result = sanitizeUrlParam('admin', { type: 'enum', allowedValues: ['admin', 'user'] })
    expect(result).toMatchObject({ valid: true })
  })

  it('rejects values not in enum', () => {
    const result = sanitizeUrlParam('superadmin', { type: 'enum', allowedValues: ['admin', 'user'] })
    expect(result).toMatchObject({ valid: false })
  })

  it('removes dangerous characters from string type', () => {
    const result = sanitizeUrlParam('<danger>', { type: 'string' })
    expect(result.sanitized).not.toContain('<')
  })

  it('rejects path traversal', () => {
    expect(sanitizeUrlParam('../etc/passwd')).toMatchObject({ valid: false })
  })
})

// ── sanitizeErrorMessage ────────────────────────────────────────────────────

describe('sanitizeErrorMessage', () => {
  it('returns user-friendly message for known auth errors', () => {
    const result = sanitizeErrorMessage(new Error('Invalid login credentials'))
    expect(result).toBe('Invalid email or password')
  })

  it('masks database-related errors', () => {
    const result = sanitizeErrorMessage(new Error('database connection failed'))
    expect(result).not.toContain('database')
  })

  it('masks errors containing "token"', () => {
    const result = sanitizeErrorMessage(new Error('invalid token received'))
    expect(result).not.toContain('token')
  })

  it('returns fallback for null input', () => {
    expect(sanitizeErrorMessage(null)).toBeTruthy()
  })

  it('returns short safe messages directly', () => {
    const safe = 'Something went wrong'
    expect(sanitizeErrorMessage(new Error(safe))).toBe(safe)
  })
})
