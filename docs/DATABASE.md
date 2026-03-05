# Database Setup

ClipCut uses **Supabase** (PostgreSQL) for authentication, data storage, and file storage.

## Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project (free tier is sufficient)
3. Note your **Project URL** and **anon key** from Settings > API

### 2. Run Migrations

Run each SQL migration in your Supabase SQL Editor in numerical order:

```
supabase/migrations/001_profiles.sql
supabase/migrations/002_projects.sql
supabase/migrations/003_templates.sql
supabase/migrations/004_template_ratings.sql
supabase/migrations/005_storage_buckets.sql
supabase/migrations/006_login_attempts.sql
supabase/migrations/007_performance_and_fixes.sql
```

### 3. Enable Google OAuth (Optional)

1. Go to Supabase dashboard > Authentication > Providers
2. Enable Google and add your OAuth credentials
3. Set the redirect URL to `https://your-domain.com/onboarding/1`

## Schema

### profiles

Extends Supabase Auth users with application-specific data. Automatically created on user signup via trigger.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID (PK) | — | References `auth.users`, cascades on delete |
| `username` | TEXT (UNIQUE) | — | User's display name |
| `email` | TEXT | — | User's email |
| `display_name` | TEXT | — | Full display name |
| `avatar_url` | TEXT | — | URL to avatar image in storage |
| `bio` | TEXT | — | User bio |
| `skill_level` | TEXT | — | `beginner`, `intermediate`, `advanced`, or `professional` |
| `purposes` | TEXT[] | — | Array of use cases |
| `default_resolution` | TEXT | `1080p` | `480p`, `720p`, or `1080p` |
| `onboarding_complete` | BOOLEAN | `false` | Whether user completed onboarding |
| `created_at` | TIMESTAMPTZ | `NOW()` | |
| `updated_at` | TIMESTAMPTZ | `NOW()` | Auto-updated via trigger |

**RLS Policies:**
- Anyone can read profiles (public)
- Users can only insert/update/delete their own profile

**Triggers:**
- `handle_new_user()` — auto-creates a profile row when a user signs up. Handles username collisions by appending a random 4-character suffix.
- `update_updated_at_column()` — updates `updated_at` on every row update.

### projects

User's video editing projects with timeline data stored as JSONB.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID (PK) | `gen_random_uuid()` | |
| `user_id` | UUID (FK) | — | References `profiles.id`, cascades on delete |
| `name` | TEXT | `Untitled Project` | Project name |
| `description` | TEXT | — | Optional description |
| `thumbnail_url` | TEXT | — | URL to project thumbnail |
| `project_data` | JSONB | `{}` | Timeline, clips, effects (serialized) |
| `duration_seconds` | INTEGER | `0` | Total project duration |
| `resolution` | TEXT | `1080p` | `480p`, `720p`, or `1080p` |
| `format` | TEXT | `mp4` | `mp4` or `webm` |
| `is_template` | BOOLEAN | `false` | Whether project is a template |
| `is_public` | BOOLEAN | `false` | Whether project is publicly visible |
| `created_at` | TIMESTAMPTZ | `NOW()` | |
| `updated_at` | TIMESTAMPTZ | `NOW()` | Auto-updated via trigger |

**Indexes:**
- `(user_id, updated_at DESC)` — for listing user's projects sorted by recent
- `(id, user_id)` — for single-project lookups by owner
- Partial index on `is_template` and `is_public`

**RLS Policies:**
- Users can read their own projects
- Public projects (`is_public = TRUE`) are readable by anyone
- Users can only create/update/delete their own projects

### templates

Community-shared video editing templates.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID (PK) | `gen_random_uuid()` | |
| `creator_id` | UUID (FK) | — | References `profiles.id`, set NULL on delete |
| `name` | TEXT | — | Template name |
| `description` | TEXT | — | Template description |
| `category` | TEXT | — | `trending`, `cinematic`, `business`, `social`, `education`, `personal`, `other` |
| `thumbnail_url` | TEXT | — | |
| `preview_url` | TEXT | — | |
| `template_data` | JSONB | `{}` | Template timeline data |
| `duration_seconds` | INTEGER | `0` | |
| `resolution` | TEXT | `1080p` | |
| `tags` | TEXT[] | `{}` | Searchable tags |
| `downloads` | INTEGER | `0` | Download counter |
| `is_featured` | BOOLEAN | `false` | Featured on homepage |
| `is_approved` | BOOLEAN | `false` | Moderation status |
| `created_at` | TIMESTAMPTZ | `NOW()` | |
| `updated_at` | TIMESTAMPTZ | `NOW()` | |

**Indexes:**
- `creator_id`, `category`, `downloads DESC`
- Partial indexes for `is_featured` and `is_approved`
- GIN trigram index on `name` for fuzzy search (requires `pg_trgm` extension)
- GIN index on `tags`

**Functions:**
- `increment_template_downloads(template_id UUID)` — atomically increments the download counter

### template_ratings

Star ratings (1-5) for templates, one per user per template.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID (PK) | `gen_random_uuid()` | |
| `template_id` | UUID (FK) | — | References `templates.id`, cascades on delete |
| `user_id` | UUID (FK) | — | References `profiles.id`, cascades on delete |
| `rating` | INTEGER | — | 1 to 5 |
| `review` | TEXT | — | Optional review text |
| `created_at` | TIMESTAMPTZ | `NOW()` | |
| `updated_at` | TIMESTAMPTZ | `NOW()` | |

**Constraints:** `UNIQUE(template_id, user_id)` — one rating per user per template.

**View:** `template_rating_stats` — aggregates count, average, and star distribution per template.

### login_attempts

Tracks failed login attempts for account lockout (5 failures = 30 minute lockout).

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID (PK) | `gen_random_uuid()` | |
| `user_id` | UUID (FK) | — | References `auth.users.id` |
| `email` | TEXT (UNIQUE) | — | Email address |
| `failed_attempts` | INTEGER | `0` | Consecutive failures |
| `locked_until` | TIMESTAMPTZ | — | Lockout expiry time |
| `last_attempt` | TIMESTAMPTZ | `NOW()` | |
| `created_at` | TIMESTAMPTZ | `NOW()` | |
| `updated_at` | TIMESTAMPTZ | `NOW()` | |

**Database Functions (callable by authenticated/anon roles):**
- `record_failed_login_attempt(email TEXT)` — increments counter; locks account after 5 failures for 30 minutes
- `clear_failed_login_attempts(email TEXT)` — resets counter (only for own email)
- `check_account_lockout(email TEXT)` — returns `{ locked, locked_until, attempts_remaining }`

## Storage Buckets

Created in migration 007. Storage paths follow the pattern `{userId}/...` enforced by RLS.

| Bucket | Access | Max Size | Allowed Types |
|--------|--------|----------|---------------|
| `avatars` | Public read, own write | 5 MB | `image/*` |
| `projects` | Private (own user only) | 500 MB | `video/*`, `audio/*`, `image/*` |
| `templates` | Public read, own write | 100 MB | `video/*`, `image/*` |
| `exports` | Private (own user only) | 2 GB | `video/mp4`, `video/webm` |

## Entity Relationship Diagram

```
auth.users (Supabase managed)
    │
    ├── 1:1 ── profiles
    │              │
    │              ├── 1:N ── projects
    │              │
    │              ├── 1:N ── templates
    │              │              │
    │              │              └── 1:N ── template_ratings
    │              │
    │              └── 1:N ── template_ratings
    │
    └── 1:N ── login_attempts
```
