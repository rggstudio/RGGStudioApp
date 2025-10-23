# RGG Studio Developer Portfolio

A developer portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design with space theme
- Interactive UI components
- Project showcase with filtering
- Smooth scrolling navigation
- Contact form with validation
- Optimized images with next/image
- Full TypeScript support
- Tailwind CSS for styling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Lucide React Icons
- ESLint
- PostCSS
- Autoprefixer

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   ├── features/
│   └── shared/
```

## License

MIT 

## Soldier Picks MVP

The `/soldier` route hosts the Soldier Madden League pick’em experience described in `soldier-app.md`.

- **Environment**: copy `.env.soldier.example` to `.env.local` and populate Supabase credentials plus `SOLDIER_SESSION_SECRET`.
- **Database**: run `supabase/soldier_schema.sql` against your Supabase project; it creates tables, RLS policies, and RPC helpers.
- **Packages**: install new dependencies (`@supabase/*`, `bcryptjs`, `jose`, `zod`) with `npm install`.
- **Development**: start the dev server and open `/soldier` for the player portal or `/soldier/admin` for the commissioner console.
- **Admin Auth**: commissioners sign in via Supabase magic link; add their user IDs to `soldier_admins` to grant access.
