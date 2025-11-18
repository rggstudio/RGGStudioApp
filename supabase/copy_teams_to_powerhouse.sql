-- Copy teams from Soldier League to Power House League
-- Option 1: Copy with same IDs (useful if you also want to copy team_codes later)
INSERT INTO public.phl_teams (id, name, short_code, created_at)
SELECT id, name, short_code, created_at
FROM public.sl_teams
ON CONFLICT (id) DO NOTHING;  -- Skip if team already exists

-- Option 2: Copy with new IDs (uncomment below and comment out Option 1 if you prefer fresh IDs)
-- INSERT INTO public.phl_teams (name, short_code, created_at)
-- SELECT name, short_code, created_at
-- FROM public.sl_teams
-- ON CONFLICT (name) DO NOTHING;  -- Skip if team name already exists

-- If you also want to copy team codes (PINs), run this AFTER copying teams:
-- Note: This only works if you used Option 1 (same IDs)
-- INSERT INTO public.phl_team_codes (team_id, pin_hash, updated_at)
-- SELECT team_id, pin_hash, updated_at
-- FROM public.sl_team_codes
-- ON CONFLICT (team_id) DO NOTHING;

