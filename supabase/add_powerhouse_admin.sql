-- Add Power House admin
-- Email: shopmaster73@gmail.com
-- Password: 1980

INSERT INTO public.phl_admins (email, pin_hash, role, created_at)
VALUES (
  'shopmaster73@gmail.com',
  extensions.crypt('1980', extensions.gen_salt('bf')),
  'commissioner',
  timezone('utc'::text, now())
)
ON CONFLICT (email) DO UPDATE
SET 
  pin_hash = EXCLUDED.pin_hash,
  role = EXCLUDED.role;

