# Input Sanitization Tasks

This document breaks down the input sanitization implementation plan into separate, manageable tasks.

## Foundation Tasks (Complete First)

### Task 1: Add sanitizeTextInput() function
**File:** `src/utils/validation.js`
- Create function for general text fields (project names, display names, bios)
- Remove/nullify control characters
- Limit length appropriately
- Trim whitespace
- Preserve allowed characters

### Task 2: Move and enhance sanitizeFileName()
**Files:** `src/supabase/authService.js` → `src/utils/validation.js`
- Move `sanitizeFileName()` from authService.js to validation.js
- Enhance for path traversal protection (`../`, `..\\`)
- Remove special characters except allowed ones
- Limit length (max 255 chars)
- Normalize separators

### Task 3: Add sanitizeSearchQuery() function
**File:** `src/utils/validation.js`
- Remove HTML tags
- Limit length (max 200 chars)
- Escape special regex characters if used in search
- Trim whitespace

### Task 4: Add sanitizeUrlParam() function
**File:** `src/utils/validation.js`
- Validate format (UUID, enum values, etc.)
- Remove dangerous characters
- Limit length

## Authentication Components

### Task 5: Sanitize username in DesktopRegister
**File:** `src/components/DesktopRegister.jsx`
- Sanitize username before validation and saving
- Trim whitespace
- Validate pattern (alphanumeric + underscore only, 3-30 chars)

### Task 6: Verify email sanitization in DesktopLogin
**File:** `src/components/DesktopLogin.jsx`
- Verify email is trimmed and lowercased
- Ensure sanitization is applied before validation

### Task 7: Sanitize username in MobileAuth
**File:** `src/components/MobileAuth.jsx`
- Sanitize username before validation and saving
- Trim whitespace
- Validate pattern (alphanumeric + underscore only, 3-30 chars)

## Onboarding Components

### Task 8: Sanitize displayName and bio in OnboardingStep1
**File:** `src/components/OnboardingStep1.jsx`
- Sanitize `displayName` (max 100 chars, remove HTML, trim)
- Sanitize `bio` (max 500 chars, allow newlines but escape HTML)
- Apply sanitization in onChange handlers or before API calls

### Task 9: Apply sanitization in saveOnboardingData
**File:** `src/supabase/authService.js`
- Apply sanitization in `saveOnboardingData()` function
- Ensure displayName and bio are sanitized before database save

## Project Management

### Task 10: Sanitize project names in TopBar
**File:** `src/components/VideoEditor/TopBar.jsx`
- Sanitize project names before saving
- Max 100 chars, remove HTML, trim
- Allow spaces and common punctuation

### Task 11: Sanitize search queries in Dashboard
**File:** `src/components/Dashboard.jsx`
- Sanitize search queries before filtering
- Use `sanitizeSearchQuery()` function

### Task 12: Apply sanitization in saveProject()
**File:** `src/services/projectService.js`
- Apply sanitization in `saveProject()` function
- Sanitize project names before database operations

### Task 13: Sanitize project names from localStorage
**File:** `src/components/VideoEditor/VideoEditor.jsx`
- Sanitize project names when loaded from localStorage
- Ensure safety before display

## File Upload Services

### Task 14: Update projectService to use sanitizeFileName()
**File:** `src/services/projectService.js`
- Update `uploadProjectMedia()` to use `sanitizeFileName()` from utils
- Update `generateUniqueFilename()` to use `sanitizeFileName()` from utils
- Ensure path traversal protection in storage paths

### Task 15: Update authService to use sanitizeFileName() from utils
**File:** `src/supabase/authService.js`
- Update `uploadAvatar()` to use `sanitizeFileName()` from utils
- Remove local `sanitizeFileName()` function (moved to utils)
- Ensure consistent filename sanitization

## Security & Validation

### Task 16: Validate URL parameters in ResetPassword
**File:** `src/components/ResetPassword.jsx`
- Validate and sanitize `access_token` parameter (should be UUID/JWT format)
- Validate `type` parameter (should be enum: "recovery")
- Add validation before using URL parameters

### Task 17: Review display safety
**Files:** All components that display user-provided data
- Review all components for `dangerouslySetInnerHTML` usage
- Ensure data is sanitized before using `dangerouslySetInnerHTML`
- Verify React's default escaping is used (React escapes by default in JSX)
- Verify project names, usernames, bios are displayed safely

## Sanitization Rules Reference

1. **Username**: Alphanumeric + underscore only, 3-30 chars (already validated)
2. **Email**: Trim, lowercase, validate format (already done)
3. **Display Name**: Max 100 chars, remove HTML, trim
4. **Bio**: Max 500 chars, allow newlines, escape HTML
5. **Project Name**: Max 100 chars, remove HTML, trim, allow spaces and common punctuation
6. **Search Query**: Max 200 chars, remove HTML, trim
7. **File Names**: Alphanumeric, dots, hyphens, underscores only, max 255 chars, no path traversal
8. **URL Parameters**: Validate format based on expected type (UUID, enum, etc.)

## Security Considerations

- **Never sanitize passwords** - only validate
- **Sanitize on input** - at the component level before state updates
- **Sanitize before storage** - in service functions before database operations
- **Sanitize before display** - React does this by default, but verify
- **Use parameterized queries** - Supabase client handles this, but ensure we're not building raw SQL

## Testing Checklist

- [ ] Test XSS attempts in all text fields
- [ ] Test path traversal in file names
- [ ] Test SQL injection (though Supabase parameterizes)
- [ ] Test very long inputs (DoS protection)
- [ ] Test special characters in all fields
- [ ] Verify sanitization doesn't break legitimate inputs
- [ ] Test URL parameter manipulation
