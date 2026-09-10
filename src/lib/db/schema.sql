-- SkillNexus Database Schema

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- ─── USERS ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL CHECK(role IN ('student','college','company','mentor')),
  avatar      TEXT,
  is_demo     INTEGER DEFAULT 0,
  created_at  TEXT DEFAULT (datetime('now')),
  updated_at  TEXT DEFAULT (datetime('now'))
);

-- ─── STUDENT PROFILES ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_profiles (
  id                  TEXT PRIMARY KEY,
  user_id             TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  college_id          TEXT REFERENCES college_profiles(id),
  department          TEXT,
  year_of_study       INTEGER,
  graduation_year     INTEGER,
  gpa                 REAL,
  location            TEXT,
  bio                 TEXT,
  linkedin_url        TEXT,
  github_url          TEXT,
  portfolio_url       TEXT,
  resume_url          TEXT,
  career_goal         TEXT,
  target_role         TEXT,
  placement_readiness INTEGER DEFAULT 0,
  talent_iq           INTEGER DEFAULT 0,
  nexa_points         INTEGER DEFAULT 0,
  streak_days         INTEGER DEFAULT 0,
  last_activity_date  TEXT,
  is_premium          INTEGER DEFAULT 0,
  is_public           INTEGER DEFAULT 1,
  created_at          TEXT DEFAULT (datetime('now'))
);

-- ─── COLLEGE PROFILES ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS college_profiles (
  id              TEXT PRIMARY KEY,
  user_id         TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  college_name    TEXT NOT NULL,
  location        TEXT,
  website         TEXT,
  accreditation   TEXT,
  total_students  INTEGER DEFAULT 0,
  established     INTEGER,
  logo_url        TEXT,
  created_at      TEXT DEFAULT (datetime('now'))
);

-- ─── COMPANY PROFILES ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS company_profiles (
  id            TEXT PRIMARY KEY,
  user_id       TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name  TEXT NOT NULL,
  industry      TEXT,
  size          TEXT,
  location      TEXT,
  website       TEXT,
  description   TEXT,
  logo_url      TEXT,
  is_verified   INTEGER DEFAULT 0,
  created_at    TEXT DEFAULT (datetime('now'))
);

-- ─── MENTOR PROFILES ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mentor_profiles (
  id              TEXT PRIMARY KEY,
  user_id         TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company         TEXT,
  designation     TEXT,
  expertise       TEXT,
  experience_yrs  INTEGER,
  bio             TEXT,
  linkedin_url    TEXT,
  hourly_rate     REAL,
  is_available    INTEGER DEFAULT 1,
  created_at      TEXT DEFAULT (datetime('now'))
);

-- ─── DEPARTMENTS ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS college_departments (
  id          TEXT PRIMARY KEY,
  college_id  TEXT NOT NULL REFERENCES college_profiles(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  code        TEXT,
  hod_name    TEXT,
  created_at  TEXT DEFAULT (datetime('now'))
);

-- ─── SKILLS ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
  id              TEXT PRIMARY KEY,
  name            TEXT UNIQUE NOT NULL,
  category        TEXT NOT NULL,
  description     TEXT,
  industry_demand INTEGER DEFAULT 70,
  related_skills  TEXT,
  careers         TEXT,
  created_at      TEXT DEFAULT (datetime('now'))
);

-- ─── STUDENT SKILLS ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_skills (
  id                TEXT PRIMARY KEY,
  student_id        TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  skill_id          TEXT NOT NULL REFERENCES skills(id),
  level             INTEGER NOT NULL CHECK(level BETWEEN 1 AND 10),
  verification_status TEXT DEFAULT 'self_declared' CHECK(verification_status IN ('self_declared','assessed','industry_verified')),
  verified_by       TEXT,
  verified_at       TEXT,
  created_at        TEXT DEFAULT (datetime('now')),
  UNIQUE(student_id, skill_id)
);

-- ─── CAREER PATHS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS career_paths (
  id              TEXT PRIMARY KEY,
  title           TEXT UNIQUE NOT NULL,
  description     TEXT,
  avg_salary      TEXT,
  demand_level    TEXT,
  required_skills TEXT,
  roadmap_steps   TEXT,
  created_at      TEXT DEFAULT (datetime('now'))
);

-- ─── LEARNING ROADMAPS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS learning_roadmaps (
  id              TEXT PRIMARY KEY,
  student_id      TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  career_goal     TEXT NOT NULL,
  steps           TEXT NOT NULL,
  generated_at    TEXT DEFAULT (datetime('now')),
  updated_at      TEXT DEFAULT (datetime('now'))
);

-- ─── LEARNING PROGRESS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS learning_progress (
  id            TEXT PRIMARY KEY,
  student_id    TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  roadmap_id    TEXT REFERENCES learning_roadmaps(id),
  skill_id      TEXT REFERENCES skills(id),
  step_index    INTEGER,
  status        TEXT DEFAULT 'not_started' CHECK(status IN ('not_started','in_progress','completed')),
  completed_at  TEXT,
  created_at    TEXT DEFAULT (datetime('now'))
);

-- ─── ASSESSMENTS ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skill_assessments (
  id          TEXT PRIMARY KEY,
  skill_id    TEXT NOT NULL REFERENCES skills(id),
  title       TEXT NOT NULL,
  difficulty  TEXT DEFAULT 'intermediate' CHECK(difficulty IN ('beginner','intermediate','advanced')),
  duration    INTEGER DEFAULT 30,
  questions   TEXT NOT NULL,
  created_at  TEXT DEFAULT (datetime('now'))
);

-- ─── ASSESSMENT RESULTS ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS assessment_results (
  id            TEXT PRIMARY KEY,
  student_id    TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  assessment_id TEXT NOT NULL REFERENCES skill_assessments(id),
  score         INTEGER,
  max_score     INTEGER,
  passed        INTEGER DEFAULT 0,
  time_taken    INTEGER,
  answers       TEXT,
  completed_at  TEXT DEFAULT (datetime('now'))
);

-- ─── INDUSTRY SKILL REQUIREMENTS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS industry_skill_requirements (
  id            TEXT PRIMARY KEY,
  company_id    TEXT NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
  posting_id    TEXT,
  posting_type  TEXT CHECK(posting_type IN ('internship','job','project')),
  skill_id      TEXT NOT NULL REFERENCES skills(id),
  required_level INTEGER NOT NULL CHECK(required_level BETWEEN 1 AND 10),
  is_mandatory  INTEGER DEFAULT 1,
  created_at    TEXT DEFAULT (datetime('now'))
);

-- ─── INTERNSHIPS ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS internships (
  id            TEXT PRIMARY KEY,
  company_id    TEXT NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  required_skills TEXT,
  duration      TEXT,
  stipend       TEXT,
  location      TEXT,
  work_mode     TEXT DEFAULT 'hybrid' CHECK(work_mode IN ('remote','hybrid','onsite')),
  eligibility   TEXT,
  openings      INTEGER DEFAULT 1,
  deadline      TEXT,
  is_active     INTEGER DEFAULT 1,
  created_at    TEXT DEFAULT (datetime('now'))
);

-- ─── JOBS ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
  id            TEXT PRIMARY KEY,
  company_id    TEXT NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  required_skills TEXT,
  salary_range  TEXT,
  location      TEXT,
  work_mode     TEXT DEFAULT 'hybrid',
  experience    TEXT,
  eligibility   TEXT,
  is_active     INTEGER DEFAULT 1,
  created_at    TEXT DEFAULT (datetime('now'))
);

-- ─── INDUSTRY PROJECTS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS industry_projects (
  id              TEXT PRIMARY KEY,
  company_id      TEXT NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  required_skills TEXT,
  difficulty      TEXT DEFAULT 'intermediate',
  duration        TEXT,
  team_size       INTEGER DEFAULT 1,
  prize           TEXT,
  deadline        TEXT,
  applicants      INTEGER DEFAULT 0,
  is_active       INTEGER DEFAULT 1,
  created_at      TEXT DEFAULT (datetime('now'))
);

-- ─── APPLICATIONS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
  id            TEXT PRIMARY KEY,
  student_id    TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  posting_id    TEXT NOT NULL,
  posting_type  TEXT NOT NULL CHECK(posting_type IN ('internship','job','project')),
  status        TEXT DEFAULT 'applied' CHECK(status IN ('applied','viewed','shortlisted','interview','rejected','selected')),
  cover_letter  TEXT,
  match_score   INTEGER,
  applied_at    TEXT DEFAULT (datetime('now')),
  updated_at    TEXT DEFAULT (datetime('now'))
);

-- ─── PROJECTS ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          TEXT PRIMARY KEY,
  student_id  TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  tech_stack  TEXT,
  github_url  TEXT,
  live_url    TEXT,
  image_url   TEXT,
  created_at  TEXT DEFAULT (datetime('now'))
);

-- ─── CERTIFICATIONS ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certifications (
  id            TEXT PRIMARY KEY,
  student_id    TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  issuer        TEXT,
  issued_date   TEXT,
  expiry_date   TEXT,
  credential_id TEXT,
  url           TEXT,
  created_at    TEXT DEFAULT (datetime('now'))
);

-- ─── STREAKS ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS streaks (
  id              TEXT PRIMARY KEY,
  student_id      TEXT UNIQUE NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  current_streak  INTEGER DEFAULT 0,
  longest_streak  INTEGER DEFAULT 0,
  last_activity   TEXT,
  freeze_count    INTEGER DEFAULT 2,
  total_days      INTEGER DEFAULT 0,
  updated_at      TEXT DEFAULT (datetime('now'))
);

-- ─── POINTS TRANSACTIONS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS points_transactions (
  id          TEXT PRIMARY KEY,
  student_id  TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  points      INTEGER NOT NULL,
  action      TEXT NOT NULL,
  description TEXT,
  created_at  TEXT DEFAULT (datetime('now'))
);

-- ─── BADGES ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS badges (
  id          TEXT PRIMARY KEY,
  name        TEXT UNIQUE NOT NULL,
  description TEXT,
  icon        TEXT,
  color       TEXT,
  criteria    TEXT,
  created_at  TEXT DEFAULT (datetime('now'))
);

-- ─── USER BADGES ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_badges (
  id          TEXT PRIMARY KEY,
  student_id  TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  badge_id    TEXT NOT NULL REFERENCES badges(id),
  earned_at   TEXT DEFAULT (datetime('now')),
  UNIQUE(student_id, badge_id)
);

-- ─── PREMIUM SUBSCRIPTIONS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS premium_subscriptions (
  id              TEXT PRIMARY KEY,
  student_id      TEXT UNIQUE NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  plan            TEXT DEFAULT 'free' CHECK(plan IN ('free','premium')),
  started_at      TEXT,
  expires_at      TEXT,
  points_redeemed INTEGER DEFAULT 0,
  amount_paid     REAL DEFAULT 0,
  created_at      TEXT DEFAULT (datetime('now'))
);

-- ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type        TEXT NOT NULL,
  title       TEXT NOT NULL,
  message     TEXT,
  is_read     INTEGER DEFAULT 0,
  link        TEXT,
  created_at  TEXT DEFAULT (datetime('now'))
);

-- ─── MENTORSHIP SESSIONS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mentorship_sessions (
  id          TEXT PRIMARY KEY,
  mentor_id   TEXT NOT NULL REFERENCES mentor_profiles(id) ON DELETE CASCADE,
  student_id  TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  title       TEXT,
  scheduled_at TEXT,
  duration    INTEGER DEFAULT 60,
  status      TEXT DEFAULT 'scheduled' CHECK(status IN ('scheduled','completed','cancelled')),
  notes       TEXT,
  rating      INTEGER,
  created_at  TEXT DEFAULT (datetime('now'))
);

-- ─── INDUSTRY PARTNERS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS industry_partners (
  id            TEXT PRIMARY KEY,
  college_id    TEXT NOT NULL REFERENCES college_profiles(id) ON DELETE CASCADE,
  company_id    TEXT NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
  partnership_type TEXT,
  status        TEXT DEFAULT 'active',
  started_at    TEXT DEFAULT (datetime('now')),
  UNIQUE(college_id, company_id)
);
