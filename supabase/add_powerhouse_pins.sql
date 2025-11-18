-- Add PINs to Power House teams
-- This script hashes the PINs using bcrypt and inserts them into phl_team_codes

INSERT INTO public.phl_team_codes (team_id, pin_hash, updated_at)
SELECT 
  t.id as team_id,
  extensions.crypt(pin_data.pin, extensions.gen_salt('bf')) as pin_hash,
  timezone('utc'::text, now()) as updated_at
FROM public.phl_teams t
CROSS JOIN (VALUES
  ('Arizona Cardinals', '6421'),
  ('Atlanta Falcons', '9184'),
  ('Baltimore Ravens', '3759'),
  ('Buffalo Bills', '4826'),
  ('Carolina Panthers', '7093'),
  ('Chicago Bears', '2548'),
  ('Cincinnati Bengals', '8361'),
  ('Cleveland Browns', '5917'),
  ('Dallas Cowboys', '4672'),
  ('Denver Broncos', '1205'),
  ('Detroit Lions', '9832'),
  ('Green Bay Packers', '7460'),
  ('Houston Texans', '3197'),
  ('Indianapolis Colts', '8645'),
  ('Jacksonville Jaguars', '5309'),
  ('Kansas City Chiefs', '2716'),
  ('Las Vegas Raiders', '9053'),
  ('Los Angeles Chargers', '6824'),
  ('Los Angeles Rams', '4138'),
  ('Miami Dolphins', '5574'),
  ('Minnesota Vikings', '7920'),
  ('New England Patriots', '1456'),
  ('New Orleans Saints', '6389'),
  ('New York Giants', '8742'),
  ('New York Jets', '3601'),
  ('Philadelphia Eagles', '5294'),
  ('Pittsburgh Steelers', '7806'),
  ('San Francisco 49ers', '2017'),
  ('Seattle Seahawks', '9541'),
  ('Tampa Bay Buccaneers', '4863'),
  ('Tennessee Titans', '7325'),
  ('Washington Commanders', '6158')
) AS pin_data(team_name, pin)
WHERE lower(t.name) = lower(pin_data.team_name)
ON CONFLICT (team_id) DO UPDATE
SET 
  pin_hash = EXCLUDED.pin_hash,
  updated_at = EXCLUDED.updated_at;

