# 🏈 Soldier Picks Web App – Product Requirements Document (PRD)

## Overview

**Project Name:** Soldier Picks  
**Owner:** RGG Studio (Raymond Goode Jr.)  
**Version:** 1.0  
**URL:** [https://rggstudio.com/soldier](https://rggstudio.com/soldier)

**Summary:**  
Soldier Picks is a lightweight web application for managing the *Game of the Week (GOTW)* pick system in the **Soldier Madden League**.  
Players log in using a 4-digit team PIN to make weekly picks, track their scores, and view history.  
Commissioners can create and lock games, award points, and view all team selections.

---

## Goals & Objectives

| Goal | Description |
|------|--------------|
| 🧩 Simplify pick submissions | Remove the need for manual DMs to admins by providing a player portal. |
| 🔒 Controlled fairness | Allow commissioner to manually lock or unlock each GOTW. |
| 📊 Automated scoring | Automatically reward points to teams with correct picks. |
| 🕹️ Admin transparency | Give commissioners clear tools to manage and review GOTWs. |
| 💾 Persistent history | Store all picks and scores for the full 18-week season. |

---

## Users & Roles

### Player (Team Owner)
- Logs in via Team Name + 4-digit PIN.
- Views weekly GOTWs and makes picks.
- Can change pick until that game is **locked**.
- Sees current total points and full pick history.

### Commissioner / Admin
- Logs in with Supabase Auth (magic link).
- Creates and manages GOTWs.
- Locks or unlocks each game.
- Enters results and awards points automatically.
- Adjusts team points manually if needed.
- Views all team picks and results by week.

---

## Key Features & Requirements

### 1. Player Portal
- Team login using Team Name + PIN.
- Dashboard sections:
  - **Total Points** display.
  - **Current GOTWs** with pick buttons.
  - **Past Picks** list with outcomes.
- Players can modify picks while unlocked.
- Locked games show “Locked by Commissioner”.

### 2. Admin Console
- Supabase Auth required.
- Panels include:
  - **Games Management:** Create GOTWs, toggle lock, set results, award points.
  - **Teams:** Add/edit teams, regenerate PINs, adjust points.
  - **History:** Filter by week, view all picks, export CSV.
  - *(Optional)* Audit Log of admin actions.

### 3. Authentication & Sessions
| Role | Method | Notes |
|------|---------|-------|
| Player | Team Name + 4-digit PIN | Secure cookie storing `team_id`. |
| Admin | Supabase Auth (email/magic link) | Access to `/soldier/admin` routes. |

### 4. Database Schema (Summary)
| Table | Description |
|--------|--------------|
| `teams` | Stores team data (id, name, short_code). |
| `team_codes` | Stores hashed 4-digit PINs. |
| `weeks` | NFL week labels (1-18). |
| `games` | GOTW data: home/away, locked flag, result. |
| `picks` | Team choices for each GOTW. |
| `points_ledger` | Ledger of awarded or manual points. |
| `admins` | Supabase user IDs with role. |
| `team_points` | View: total points per team. |

### 5. Game Locking Logic
- No time-based lock.
- Commissioner manually toggles `is_pick_locked` per game.
- Once locked, players cannot edit their picks.

### 6. Points System
| Event | Points | Description |
|--------|---------|-------------|
| Correct GOTW pick | +3 | Automatic award via RPC. |
| Admin adjustment | ±X | Manual edit in points ledger. |

### 7. History Tracking
- Player view: past GOTWs, selection, correct result, ✔ / ✖, and earned points.
- Admin view: all teams’ picks for any week.
- CSV export available for weekly results.

---

## Technical Requirements

### Tech Stack
- **Frontend:** Next.js 14+, TypeScript, Tailwind, shadcn/ui  
- **Backend:** Supabase (PostgreSQL + Auth + RPC)  
- **Auth:**  
  - Team PIN login (custom cookie session)  
  - Supabase Auth for admins  
- **Hosting:**  
  - Vercel (web)  
  - Supabase (database + backend)

### Integration Notes
- Supabase RPC functions handle:
  - `award_points_for_game`
  - `set_game_lock`
- API routes enforce auth and input validation.
- Sensitive writes use `SERVICE_ROLE` key (server only).

---

## Business Logic

1. **Team Login**
   - Validate team name + hashed PIN.
   - Set signed cookie `{ team_id }`.

2. **Pick Submission**
   - Allowed only if game `is_pick_locked = false`.
   - Upsert `(team_id, game_id, selection)`.

3. **Game Locking**
   - Commissioner toggles lock state per game.

4. **Scoring**
   - Commissioner sets `games.result`.
   - Calls RPC `award_points_for_game` to grant +3 to correct pickers.
   - Idempotent — no duplicate rewards.

5. **History**
   - Display picks + correctness per week.
   - Aggregate totals via `team_points` view.

---

## UI Overview

### Player Dashboard
| Section | Description |
|----------|--------------|
| Header | Displays team name & total points. |
| Current GOTWs | Shows matchups, lock status, pick buttons. |
| History | Table: week, opponent, pick, result, ✔/✖, points earned. |

### Admin Dashboard
| Section | Description |
|----------|--------------|
| Games | Create, lock/unlock, set result, award points. |
| Teams | Manage roster, regenerate PINs, adjust points. |
| History | Filter by week, export CSV. |

---

## Non-Functional Requirements

| Category | Requirement |
|-----------|-------------|
| **Security** | Hash PINs with bcrypt, secure cookies, enforce Supabase RLS. |
| **Performance** | Load times < 1s for main dashboard. |
| **Reliability** | Automatic backups via Supabase. |
| **Scalability** | Up to 64 teams per season. |
| **UX** | Responsive and mobile-friendly UI. |

---

## Milestones

| Phase | Deliverables | Est. Duration |
|--------|---------------|---------------|
| **Phase 1** | Supabase setup & schema migration | 1 day |
| **Phase 2** | Player login & dashboard | 2 days |
| **Phase 3** | Admin console & CRUD | 3 days |
| **Phase 4** | Scoring RPCs & testing | 1 day |
| **Phase 5** | UI polish & deploy to Vercel | 2 days |
| **Total Estimate:** | ~8–10 dev days |  |

---

## Future Enhancements

- Discord bot integration for GOTW announcements  
- Season tracking (`season_id`)  
- Leaderboard & stats widgets  
- Email notifications (game locked / results posted)  
- Confidence pick multiplier system  

---

## Acceptance Criteria

- [x] Players can log in via PIN and see dashboard  
- [x] Commissioner can create & lock games  
- [x] Commissioner can award points automatically  
- [x] Players can view history & totals  
- [x] PINs hashed, cookies secured  
- [x] Admin console protected by Supabase Auth  
- [ ] CSV export available for results  
- [ ] Responsive mobile UI  

---

## Glossary

| Term | Definition |
|------|-------------|
| **GOTW** | Game of the Week matchup for predictions |
| **PIN** | 4-digit access code for each team |
| **Lock** | State where a game stops accepting picks |
| **Ledger** | Record of all point transactions (wins, adjustments) |

---

## Deliverables

- `/soldier` Next.js app  
- Supabase SQL schema + RPC functions  
- `.env.local` template  
- Admin & player dashboards  
- Setup and deployment documentation  

---

## Repository Structure

/docs/PRD.md
/app
/soldier
page.tsx # Team login
/dashboard/page.tsx # Player dashboard
/admin/page.tsx # Admin console
/api/soldier # All API route handlers
/lib
supabaseServer.ts
auth.ts
db.ts
/components
GameCard.tsx
HistoryTable.tsx
AdminTable.tsx
PickButtons.tsx
PointsBadge.tsx



---

**Author:** Raymond Goode Jr.  
**Date:** October 2025  
**Maintainer:** RGG Studio  
**License:** Proprietary (internal league app)
