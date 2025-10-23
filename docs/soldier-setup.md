# Soldier Picks MVP Setup

This guide walks through configuring the Soldier Picks MVP that lives under the `/soldier` route.

## 1. Install Dependencies

Install new packages added to the project:

```bash
npm install
```

## 2. Configure Environment Variables

Create `.env.local` (or merge with your existing one) using `.env.soldier.example` as a template:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SOLDIER_SESSION_SECRET=...
```

- `SOLDIER_SESSION_SECRET` should be a long random string (32+ chars).
- Keep the service-role key server-side only; it is used by server route handlers.

## 3. Provision Supabase

1. Enable the `pgcrypto` extension in your Supabase project (required for PIN hashing).
2. Run `supabase/soldier_schema.sql` in the SQL editor to create tables, views, RLS policies, and RPC helpers.
3. Seed `soldier_teams` with league teams and add hashed PINs using `crypt('1234', gen_salt('bf'))` or the Supabase dashboard UI.
4. Insert commissioner Supabase user IDs into `soldier_admins` to grant console access.

## 4. Local Development

```bash
npm run dev
```

- Player portal: [http://localhost:3000/soldier](http://localhost:3000/soldier)
- Admin console: [http://localhost:3000/soldier/admin](http://localhost:3000/soldier/admin)

## 5. Deploy

1. Deploy the Next.js app to Vercel (or your platform of choice) and set the same env vars there.
2. Host Supabase on the managed instance created earlier.
3. Update DNS or add a sub-path redirect (e.g., `/soldier`) in your marketing site if needed.

## 6. Operations Checklist

- Update GOTWs each week through the admin console.
- Use the "Lock picks" button before kickoff to freeze submissions.
- Set the result to trigger automatic scoring; manual adjustments are available per team.
- Export data directly from Supabase if a CSV is required (future in-app export item in PRD).

> Tip: add a Supabase cron or reminder to back up the database weekly during the season.
