# Supabase Setup Guide

## 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a new project.

## 2. Run the schema

1. Open your project's **SQL Editor** (left sidebar).
2. Paste and run the contents of `supabase/schema.sql`.
3. This creates three tables (`dashboard_stats`, `dashboard_projects`, `dashboard_activities`) with Row Level Security — public read, admin-only write.

## 3. Create the admin user

1. Go to **Authentication → Users** in your Supabase dashboard.
2. Click **Invite user** (or **Add user** → **Create new user**).
3. Enter email: `lisgraphix17@gmail.com` and set a strong password.

## 4. Configure environment variables

1. Copy `client/.env.example` to `client/.env`:
   ```
   cp client/.env.example client/.env
   ```
2. Fill in your values from **Project Settings → API**:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   VITE_ADMIN_EMAIL=lisgraphix17@gmail.com
   ```

## 5. Restart the dev server

```bash
cd client
npm run dev
```

## 6. Sign in and manage the dashboard

- Visit `/admin/login` — sign in with `lisgraphix17@gmail.com` and your password.
- After sign-in you are redirected to `/admin` — the admin panel.
- **Stats tab** — update the KPI numbers and growth labels.
- **Projects tab** — add, edit, or delete project cards.
- **Activities tab** — add, edit, or delete activity feed entries.

Changes appear on the public `/dashboard` page immediately.

## Notes

- The `dashboard_stats` table holds a single row (`id = 1`). It is pre-inserted by the schema.
- The public dashboard (`/dashboard`) falls back to hardcoded defaults if Supabase is unconfigured or the tables are empty, so it always renders correctly.
- Only the user with email `lisgraphix17@gmail.com` can write to the tables (enforced by both RLS policies and the `ProtectedRoute` component).
