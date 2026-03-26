import { test, expect } from '@playwright/test'

async function injectFakeSession(page) {
  await page.addInitScript(() => {
    const fakeSession = {
      access_token: 'fake-token',
      refresh_token: 'fake-refresh',
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      user: {
        id: '00000000-0000-4000-8000-000000000001',
        email: 'test@example.com',
        user_metadata: { username: 'testuser' },
        email_confirmed_at: '2024-01-01T00:00:00Z',
      },
    }
    const storageKey = Object.keys(localStorage).find((k) => k.includes('supabase'))
    const key = storageKey || 'sb-localhost-auth-token'
    localStorage.setItem(key, JSON.stringify({ currentSession: fakeSession, expiresAt: fakeSession.expires_at }))
  })
}

test.describe('Video Editor — Material Symbols font', () => {
  test('computed font on icon spans resolves to Material Symbols (ligatures must not fall back to text)', async ({ page }) => {
    await injectFakeSession(page)
    await page.goto('/editor')
    await page.waitForSelector('.material-symbols-outlined', { timeout: 25000 })
    const { fontFamily, linkCount } = await page.evaluate(() => {
      const el = document.querySelector('.material-symbols-outlined')
      return {
        fontFamily: el ? getComputedStyle(el).fontFamily : '',
        linkCount: document.querySelectorAll('link[href*="Material"]').length,
      }
    })
    // If this fails, icons render as ligature text (play_arrow, add, movie)
    expect(linkCount).toBeGreaterThan(0)
    expect(fontFamily).toMatch(/Material Symbols/i)
  })
})
