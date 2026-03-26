-- ============================================================
-- RLS Policy Test Scenarios for ClipCut
-- Run these against a test Supabase instance to verify security
--
-- Usage:
--   1. Apply all migrations (001–007)
--   2. Create two test users via Supabase Auth (or use the helper below)
--   3. Run each test block and verify the expected result
--
-- Convention: each test has a comment showing EXPECTED RESULT
-- ============================================================

-- ============================================================
-- SETUP: Create test state
-- Run this once to set up the test environment
-- ============================================================

-- NOTE: In a real Supabase environment, users are created via auth.
-- For testing, insert directly into profiles (assuming auth users exist).
-- Replace these UUIDs with actual auth.users IDs from your test instance.

-- Test User A: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
-- Test User B: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'


-- ============================================================
-- TEST 1: PROFILES — Select visibility
-- ============================================================

-- As User A: can see all profiles (public read policy)
-- EXPECTED: Returns all profiles including User B's
-- SET LOCAL role TO authenticated;
-- SET LOCAL request.jwt.claims TO '{"sub": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}';
-- SELECT * FROM profiles;

-- As anon: can also see all profiles
-- EXPECTED: Returns all profiles
-- SET LOCAL role TO anon;
-- SELECT * FROM profiles;


-- ============================================================
-- TEST 2: PROFILES — Insert/Update/Delete own only
-- ============================================================

-- As User A: can update own profile
-- EXPECTED: Success
-- SET LOCAL role TO authenticated;
-- SET LOCAL request.jwt.claims TO '{"sub": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}';
-- UPDATE profiles SET display_name = 'Test A Updated'
--   WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- As User A: CANNOT update User B's profile
-- EXPECTED: 0 rows updated (RLS blocks it)
-- UPDATE profiles SET display_name = 'Hacked'
--   WHERE id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

-- As User A: CANNOT delete User B's profile
-- EXPECTED: 0 rows deleted
-- DELETE FROM profiles
--   WHERE id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';


-- ============================================================
-- TEST 3: PROJECTS — User isolation
-- ============================================================

-- Setup: User A creates a private project
-- SET LOCAL role TO authenticated;
-- SET LOCAL request.jwt.claims TO '{"sub": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}';
-- INSERT INTO projects (user_id, name) VALUES
--   ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'User A Private Project');

-- Setup: User A creates a public project
-- INSERT INTO projects (user_id, name, is_public) VALUES
--   ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'User A Public Project', true);

-- As User B: can only see public projects from User A
-- EXPECTED: Only "User A Public Project" visible, NOT the private one
-- SET LOCAL request.jwt.claims TO '{"sub": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}';
-- SELECT name, is_public FROM projects WHERE user_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- As User B: CANNOT update User A's project
-- EXPECTED: 0 rows updated
-- UPDATE projects SET name = 'Hacked Project'
--   WHERE user_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- As User B: CANNOT delete User A's project
-- EXPECTED: 0 rows deleted
-- DELETE FROM projects
--   WHERE user_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- As User A: can see own projects (both private and public)
-- EXPECTED: Both projects visible
-- SET LOCAL request.jwt.claims TO '{"sub": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}';
-- SELECT name, is_public FROM projects WHERE user_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';


-- ============================================================
-- TEST 4: TEMPLATES — Approval-based visibility
-- ============================================================

-- Setup: User A creates an approved template
-- SET LOCAL request.jwt.claims TO '{"sub": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}';
-- INSERT INTO templates (creator_id, name, category, is_approved)
--   VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Approved Template', 'trending', true);

-- Setup: User A creates an unapproved template
-- INSERT INTO templates (creator_id, name, category, is_approved)
--   VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Pending Template', 'cinematic', false);

-- As User B: can only see approved templates
-- EXPECTED: Only "Approved Template" visible
-- SET LOCAL request.jwt.claims TO '{"sub": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}';
-- SELECT name, is_approved FROM templates
--   WHERE creator_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- As User A: can see both own templates (including unapproved)
-- EXPECTED: Both templates visible
-- SET LOCAL request.jwt.claims TO '{"sub": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}';
-- SELECT name, is_approved FROM templates
--   WHERE creator_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- As anon: can only see approved templates
-- EXPECTED: Only "Approved Template" visible
-- SET LOCAL role TO anon;
-- SELECT name, is_approved FROM templates;


-- ============================================================
-- TEST 5: TEMPLATE RATINGS — User ownership
-- ============================================================

-- Setup: Get a template ID
-- Let template_id = (SELECT id FROM templates WHERE name = 'Approved Template' LIMIT 1);

-- As User A: can rate a template
-- EXPECTED: Success
-- SET LOCAL role TO authenticated;
-- SET LOCAL request.jwt.claims TO '{"sub": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}';
-- INSERT INTO template_ratings (template_id, user_id, rating)
--   VALUES ('<template_id>', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 5);

-- As User B: can rate the same template (different user)
-- EXPECTED: Success
-- SET LOCAL request.jwt.claims TO '{"sub": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}';
-- INSERT INTO template_ratings (template_id, user_id, rating)
--   VALUES ('<template_id>', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 4);

-- As User A: CANNOT rate same template twice (UNIQUE constraint)
-- EXPECTED: unique_violation error
-- SET LOCAL request.jwt.claims TO '{"sub": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}';
-- INSERT INTO template_ratings (template_id, user_id, rating)
--   VALUES ('<template_id>', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 3);

-- As User B: CANNOT update User A's rating
-- EXPECTED: 0 rows updated
-- SET LOCAL request.jwt.claims TO '{"sub": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}';
-- UPDATE template_ratings SET rating = 1
--   WHERE user_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- Anyone can view all ratings
-- EXPECTED: Both ratings visible
-- SELECT * FROM template_ratings;

-- Rating stats view works
-- EXPECTED: Shows average, counts per star
-- SELECT * FROM template_rating_stats;


-- ============================================================
-- TEST 6: LOGIN ATTEMPTS — Function security
-- ============================================================

-- As anon: can check lockout status (needed before login)
-- EXPECTED: Returns {locked: false, attempts_remaining: 5}
-- SET LOCAL role TO anon;
-- SELECT check_account_lockout('test@example.com');

-- As anon: can record failed attempt
-- EXPECTED: Returns {locked: false, attempts_remaining: 4, attempts: 1}
-- SELECT record_failed_login_attempt('test@example.com');

-- As anon: 5 failed attempts should trigger lockout
-- EXPECTED: After 5 calls, locked=true with locked_until set
-- SELECT record_failed_login_attempt('test@example.com');
-- SELECT record_failed_login_attempt('test@example.com');
-- SELECT record_failed_login_attempt('test@example.com');
-- SELECT record_failed_login_attempt('test@example.com');

-- As User A: CANNOT read other users' login attempts via table
-- EXPECTED: Only own attempts visible (or empty if no attempts)
-- SET LOCAL role TO authenticated;
-- SET LOCAL request.jwt.claims TO '{"sub": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}';
-- SELECT * FROM login_attempts;


-- ============================================================
-- TEST 7: STORAGE — User folder isolation
-- ============================================================

-- NOTE: Storage policy tests are best done via the Supabase client
-- since storage.objects operations go through the Storage API.
--
-- Test scenarios to verify manually or via integration tests:
--
-- 1. User A uploads to avatars/<user_a_id>/photo.jpg → ALLOWED
-- 2. User A uploads to avatars/<user_b_id>/photo.jpg → DENIED
-- 3. Anyone can READ from avatars/ (public bucket) → ALLOWED
-- 4. User A uploads to projects/<user_a_id>/video.mp4 → ALLOWED
-- 5. User A reads projects/<user_b_id>/video.mp4 → DENIED
-- 6. User B reads projects/<user_a_id>/video.mp4 → DENIED
-- 7. User A deletes projects/<user_a_id>/video.mp4 → ALLOWED
-- 8. User A deletes projects/<user_b_id>/video.mp4 → DENIED
-- 9. Anyone can READ from templates/ (public bucket) → ALLOWED
-- 10. User A uploads to exports/<user_a_id>/final.mp4 → ALLOWED
-- 11. User B reads exports/<user_a_id>/final.mp4 → DENIED


-- ============================================================
-- TEST 8: CASCADE BEHAVIOR
-- ============================================================

-- When User A is deleted from auth.users:
--   profiles: CASCADE → User A's profile deleted
--   projects: CASCADE (via profiles FK) → all User A's projects deleted
--   templates: SET NULL → templates survive with creator_id = NULL
--   template_ratings: CASCADE (via profiles FK) → User A's ratings deleted
--   login_attempts: CASCADE (via auth.users FK) → login records deleted
--
-- When a template is deleted:
--   template_ratings: CASCADE → all ratings for that template deleted
--
-- Verify with:
-- DELETE FROM auth.users WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
-- SELECT COUNT(*) FROM profiles WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'; -- 0
-- SELECT COUNT(*) FROM projects WHERE user_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'; -- 0
-- SELECT creator_id FROM templates WHERE creator_id IS NULL; -- templates preserved with NULL creator


-- ============================================================
-- CLEANUP (run after testing)
-- ============================================================
-- DELETE FROM template_ratings WHERE user_id IN ('aaaaaaaa...', 'bbbbbbbb...');
-- DELETE FROM templates WHERE creator_id IN ('aaaaaaaa...', 'bbbbbbbb...');
-- DELETE FROM projects WHERE user_id IN ('aaaaaaaa...', 'bbbbbbbb...');
-- DELETE FROM login_attempts WHERE email = 'test@example.com';
