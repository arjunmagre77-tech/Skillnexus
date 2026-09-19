# SkillNexus (SkillLink) — Complete SIH Implementation Plan

> **Project:** Smart India Hackathon 2026 — Software Edition  
> **Team:** SkillNexus  
> **Platform Name:** SkillLink  
> **Problem Domain:** Education & Skill Development

---

## 🎯 Problem Statement

India produces **1.5 million engineers per year**, yet:

| Statistic | Data |
|-----------|------|
| Graduates who feel unprepared | **72%** |
| Companies reporting skill-gap in fresh hires | **68%** |
| Average months to land first job after graduation | **8 months** |
| Engineering graduates who are "readily employable" | **< 20%** (NASSCOM 2024) |

**Root Cause:** There is no structured, data-driven bridge between what colleges teach, what students actually know, and what companies actually need.

---

## 💡 Our Solution — SkillLink

SkillLink is an **AI-Powered Academia–Industry Collaboration Platform** that:

1. **Maps** every student's skill profile from resume, projects, certifications
2. **Identifies** exact skill gaps vs real industry job requirements
3. **Builds** a personalized learning roadmap with curated resources
4. **Matches** students to internships/jobs using AI match scores
5. **Tracks** placement readiness with a live composite score
6. **Rewards** meaningful learning through a gamification engine

### Target Users (3 Personas)
```
Students ──────────────────────────────────────────────────────────── PRIMARY
  ↓ uses dashboards, roadmaps, assessments, internship marketplace

Colleges / Universities ──────────────────────────────────────────── SECONDARY
  ↓ track cohort skill gaps, generate placement reports, connect to industry

Companies / Recruiters ──────────────────────────────────────────── TERTIARY
  ↓ post internships, search verified talent, run campus assessments
```

---

## 🏗️ Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 15 (App Router) | SSR/SSG, file-based routing |
| **Styling** | Tailwind CSS + custom CSS variables | Rapid premium design |
| **UI Icons** | Lucide React | Consistent icon set |
| **Charts** | Custom SVG + Recharts | Lightweight, beautiful |
| **Auth** | JWT / NextAuth.js | Role-based access |
| **Database** | PostgreSQL + Prisma ORM | Relational, type-safe |
| **AI Engine** | Google Gemini API (via proxy) | Resume parsing, roadmap, chat |
| **File Storage** | Vercel Blob / Cloudinary | Resume uploads |
| **Deployment** | Vercel | CI/CD, Edge Functions |
| **Language** | TypeScript | Type safety |

---

## 🗄️ Database Schema (Core Entities)

```
User {
  id, name, email, passwordHash, role (STUDENT|COLLEGE|COMPANY|MENTOR)
  createdAt, updatedAt
}

StudentProfile {
  userId, institution, department, year, resumeUrl
  placementScore, nexaPoints, streak, totalBadges
  targetRole, bio, linkedinUrl, githubUrl, portfolioUrl
}

Skill {
  id, name, category, iconUrl
}

StudentSkill {
  studentId, skillId, level (1-10), verified (SELF|ASSESSED|INDUSTRY)
  endorsedBy (mentorId), assessedAt
}

SkillGap {
  studentId, targetRole, skillId, currentLevel, requiredLevel, priority
  generatedAt
}

CareerRoadmap {
  studentId, targetRole, status, totalSteps, completedSteps
  aiGeneratedPlan (JSON), createdAt
}

Assessment {
  id, title, skill, difficulty, totalQuestions, duration
  createdBy (company/platform)
}

AssessmentAttempt {
  studentId, assessmentId, score, passed, completedAt
}

Internship {
  id, companyId, title, location, skills[], stipend, deadline
  isActive, postedAt
}

InternshipApplication {
  studentId, internshipId, matchScore, status, appliedAt
}

Project {
  id, studentId, title, description, skills[], repoUrl, liveUrl
  industryVerified, verifiedBy (companyId), completedAt
}

Badge {
  id, name, description, iconUrl, condition
}

StudentBadge {
  studentId, badgeId, earnedAt
}

CollegeProfile {
  userId, institutionName, location, studentsCount
  tier (IIT|NIT|STATE|PRIVATE)
}

CompanyProfile {
  userId, companyName, industry, website, logoUrl, verifiedAt
}

MentorProfile {
  userId, expertise[], yearsExp, company, linkedinUrl, hourlyRate
  isVerified, totalSessionsHeld
}

MentorSession {
  mentorId, studentId, scheduledAt, duration, type (MOCK|REVIEW|CAREER)
  feedbackScore, notes
}
```

---

## 🗂️ Complete Page & Feature Inventory

### ✅ Already Built

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Landing Page | `/` | ✅ Complete | Hero, Stats, Features, How-It-Works, Stakeholders, Gamification, Testimonials, Pricing, FAQ, Footer |
| Register Page | `/register` | ✅ Complete | 2-step form, 4 role types, animated UI |
| Student Dashboard (main) | `/dashboard/student` | ✅ Built | Core metrics, streak, roadmap progress |
| Student Skills Page | `/dashboard/student/skills` | ✅ Built | Skill radar chart, gap analysis |
| College Dashboard | `/dashboard/college` | ✅ Built | Basic version |
| Company Dashboard | `/dashboard/company` | ✅ Built | Basic version |
| Mentor Dashboard | `/dashboard/mentor` | ✅ Built | Basic version |
| Shared Components | `components/dashboard/` | ✅ Built | Sidebar, Header, RadarChart |
| Auth API Route | `/api/auth/register` | ✅ Built | Registration endpoint |
| AI Proxy | `src/proxy.ts` | ✅ Built | Gemini API proxy |

---

### 🔴 Must Build (SIH Demo Critical)

#### 1. Login Page `/login`
- Email + password form
- Demo login buttons (Student / College / Company / Mentor quick-login)
- Forgot password link
- Dark themed, glassmorphism card
- JWT token handling → redirect to role dashboard

#### 2. Student — AI Skill Intelligence Page `/dashboard/student/skills` *(enhance)*
- **Resume Upload & Parse** — drag-and-drop PDF, AI extracts skills instantly
- **Skill Tree Visualization** — interactive radar + bar chart
- **3-Level Skill Verification Badges** — Self → Assessed → Industry Verified
- **Skill Endorsement** — mentors can endorse specific skills
- **Add Skills Manually** — searchable skill database, 500+ skills

#### 3. Student — Skill Gap Analysis `/dashboard/student/skills/gap`
- Select **Target Role** from dropdown (Frontend Dev, Data Scientist, DevOps, etc.)
- AI fetches real job market requirements for role
- **Gap Report Table** — current level vs required level for each skill
- Color-coded priority (Critical / Important / Nice-to-have)
- **Actionable Next Steps** — "Learn Docker (2 weeks → Udemy course)"
- Export as PDF for placement officer

#### 4. Student — Career Roadmap `/dashboard/student/learning` *(enhance)*
- **CareerPilot** — AI-generated 6-month personalized roadmap
- **SkillPilot** — weekly learning targets
- Timeline view (weeks/months) with milestones
- Resource cards (Udemy, YouTube, GitHub repos, official docs)
- Progress bar per phase
- Mark milestones as complete → earn NexaPoints

#### 5. Student — Assessments `/dashboard/student/assessments`
- Browse by skill/category/difficulty
- Timed MCQ engine with 20-30 questions
- AI-generated explanations for wrong answers
- **Pass threshold** → skill level upgrades from Self → Assessed
- Score history and improvement tracking
- Leaderboard per assessment

#### 6. Student — Internship Marketplace `/dashboard/student/internships`
- Card grid of all active internships
- **AI Match Score** displayed prominently (e.g. "87% Match")
- Skill-by-skill match breakdown popup
- Filter: Role, Location, Stipend, Skills, Deadline
- **Apply with 1 click** — pre-fills from profile
- Application status tracker (Applied → Shortlisted → Interview → Offered)

#### 7. Student — Projects Hub `/dashboard/student/projects`
- Add projects (title, desc, tech stack, repo URL, live URL, screenshots)
- **Industry Verification** — companies can verify projects they assigned
- Skills auto-tagged from project tech stack
- Industry-assigned projects (from company dashboard)
- Project showcase on public profile

#### 8. Student — AI Tools `/dashboard/student/ai-tools`
- **NexaBot** — AI career assistant chatbot (Gemini powered)
  - "What skills should I learn for SDE-2 at Google?"
  - "Review my resume and suggest improvements"
  - "Give me a 3-month roadmap for Data Science"
- **Resume Analyzer** — upload PDF, get 100-point score + specific suggestions
- **Mock Interview Simulator** — role-specific questions, AI evaluates answers
- **Cover Letter Generator** — role + JD → personalized cover letter
- **LinkedIn Headline/Summary Generator**

#### 9. Student — Profile (Public) `/dashboard/student/profile`
- Profile picture, bio, socials
- **Placement Readiness Score** — large 100-point circular gauge
- Verified Skills grid with level indicators
- Badges shelf
- Projects portfolio
- Experience & education timeline
- **Share Profile** — public URL like `skilllink.in/u/arjun-sharma`

#### 10. Student — Leaderboard & Gamification `/dashboard/student/leaderboard`
- College-wide leaderboard by NexaPoints
- Department-wise filter
- Streak hall-of-fame
- Badge showcase
- Weekly challenge board

#### 11. College Dashboard — Analytics `/dashboard/college` *(enhance)*
- **Department-wise Skill Heatmap** — color-coded matrix (skill × department)
- **Placement Readiness Distribution** — histogram of student scores
- **Cohort Progress** — students by skill level over time
- **Top Skill Gaps** — most common missing skills across college
- Industry connection panel — partner companies, placement stats
- Export reports (PDF/Excel) for AICTE/NAAC compliance

#### 12. College Dashboard — Students List `/dashboard/college/students`
- Searchable/filterable student table
- Sortable by Placement Score, NexaPoints, Skill Count
- View individual student profile from placement officer POV
- Bulk invite students via email / college ID

#### 13. Company Dashboard — Talent Search `/dashboard/company/talent`
- Search bar: filter by skills, location, availability, college tier
- **Skill-verified candidate cards** with match scores
- Contact/shortlist candidates
- Bulk download resumes

#### 14. Company Dashboard — Internship Management `/dashboard/company/internships`
- Post new internship (title, JD, skills, location, stipend, deadline)
- View applicants with AI-ranked shortlist
- Shortlist → Interview → Offer workflow
- Assign industry projects to interns

#### 15. Mentor Dashboard — Sessions `/dashboard/mentor` *(enhance)*
- Available session slots calendar
- Upcoming sessions list
- Student profiles reviewing (mock interview feedback, skill endorsements)
- Session notes and ratings

#### 16. Placement Readiness Score Engine
A composite 100-point score calculated as:

| Dimension | Weight | Source |
|-----------|--------|--------|
| Technical Skills | 30% | Assessed + Verified skills |
| Projects | 20% | Platform + GitHub projects |
| Internships/Experience | 15% | Past internships |
| Problem Solving | 15% | Assessment scores |
| Communication | 10% | Mock interview scores |
| Resume Quality | 5% | AI resume analyzer |
| Learning Streak | 5% | Activity consistency |

#### 17. Gamification Engine
- **NexaPoints** earned by:
  - Completing an assessment: +50 pts
  - Passing an assessment (80%+): +100 pts
  - Adding a verified project: +75 pts
  - Industry-verified project: +200 pts
  - Maintaining 7-day streak: +30 pts
  - Mentor session completed: +50 pts
  - Getting skill endorsed: +40 pts
  - Applying to internship: +10 pts
  
- **Badges** (examples):
  - 🔥 "First Flame" — 7-day streak
  - 🏆 "Assessment Ace" — 10 assessments passed
  - 🚀 "Launched" — First internship application
  - 💎 "Diamond Coder" — 5 industry-verified projects
  - 👑 "Campus King" — Top 3 in college leaderboard
  - 🎯 "Placement Ready" — Score ≥ 85/100

- **Streak System:** Must complete ≥1 meaningful task per day (not just login)
- **NexaPoints → Premium:** 2000 pts = 1 month Premium free

#### 18. API Routes (Backend)

```
POST   /api/auth/register          ← Already built
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout

GET    /api/student/profile
PUT    /api/student/profile
POST   /api/student/resume/upload  ← AI parsing
GET    /api/student/skills
POST   /api/student/skills
DELETE /api/student/skills/:id
GET    /api/student/gap-analysis   ← AI powered
GET    /api/student/roadmap        ← AI generated
POST   /api/student/roadmap/generate

GET    /api/assessments
GET    /api/assessments/:id
POST   /api/assessments/:id/start
POST   /api/assessments/:id/submit
GET    /api/assessments/history

GET    /api/internships
GET    /api/internships/:id
POST   /api/internships/:id/apply
GET    /api/internships/my-applications

GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id

POST   /api/ai/chat                ← NexaBot
POST   /api/ai/resume-analyze
POST   /api/ai/mock-interview
POST   /api/ai/cover-letter

GET    /api/college/dashboard
GET    /api/college/students
GET    /api/college/skill-heatmap
GET    /api/college/reports/export

POST   /api/company/internships
GET    /api/company/internships
GET    /api/company/applicants
PUT    /api/company/applicants/:id/status
GET    /api/company/talent-search

GET    /api/gamification/score
GET    /api/gamification/badges
GET    /api/gamification/leaderboard
POST   /api/gamification/award-points

GET    /api/mentor/profile
GET    /api/mentor/sessions
POST   /api/mentor/sessions/book
PUT    /api/mentor/sessions/:id/complete
POST   /api/mentor/endorse-skill
```

---

## 🤖 AI Features Detail (Gemini API)

### 1. Resume Parser
- Input: PDF resume (Base64)
- Output: `{name, email, skills[], projects[], education[], experience[], suggestedRole}`
- Prompt engineering to extract structured JSON

### 2. Skill Gap Analyzer
- Input: `{studentSkills[], targetRole}`
- Output: `{gaps[], priorities[], estimatedTimeToClose, suggestedResources[]}`
- Uses real job market data patterns

### 3. Career Roadmap Generator (CareerPilot)
- Input: `{currentSkills[], targetRole, availableHoursPerWeek, timeline}`
- Output: `{phases[], weeklyTargets[], milestones[], resources[]}`

### 4. NexaBot Career Assistant
- Streaming chat responses
- Context-aware (knows student's skill profile)
- Can answer: career advice, resource recommendations, roadmap questions

### 5. Mock Interview Simulator
- Generates role-specific behavioral + technical questions
- Evaluates free-text answers on: relevance, depth, communication
- Gives scores + improvement tips

### 6. Resume Analyzer (100-point score)
- Scores: formatting, keywords, project descriptions, action verbs, ATS compatibility
- Gives line-by-line suggestions

---

## 🎨 Design System

```css
/* Color Palette */
--primary:     #0A1628   (deep navy background)
--surface-1:   #0D1F3C   (cards)
--surface-2:   #152340   (hover states)
--accent:      #00D4FF   (cyan — primary accent)
--accent-2:    #8B5CF6   (purple — secondary)
--success:     #10B981   (green)
--warning:     #F59E0B   (amber)
--danger:      #EF4444   (red)

/* Typography */
--font-heading: 'Space Grotesk', sans-serif
--font-body:    'Inter', sans-serif

/* Animations */
- Fade-in on scroll (IntersectionObserver)
- Counter animation (CountUp)
- Glassmorphism cards (backdrop-filter: blur)
- Gradient text (WebkitBackgroundClip)
- Flame emoji animation (keyframes)
```

---

## 💰 Business Model

| Tier | Target | Price | Features |
|------|--------|-------|---------|
| **Free** | All students | ₹0 | Basic skill map, 5 assessments/mo, internship browse, basic roadmap |
| **Premium** | Active job seekers | ₹199/mo | Unlimited AI, mock interviews, advanced analytics, career pilot |
| **College** | Institutions | Free | Full college dashboard, heatmaps, placement tracking |
| **Enterprise** | Large colleges | Custom | API access, white-label, custom assessments, dedicated support |
| **Company** | Recruiters | ₹999/mo | Talent search, AI shortlisting, unlimited postings |

**NexaPoints Redemption:** 2000 points = 1 month Premium (incentivizes engagement)

---

## 🗺️ Implementation Phases

### Phase 1 — Foundation ✅ (Complete)
- [x] Landing page with all sections
- [x] Registration flow (4 role types)
- [x] Student dashboard (main overview)
- [x] Basic college / company / mentor dashboards
- [x] Shared sidebar + header components
- [x] Design system (globals.css)
- [x] AI proxy setup

### Phase 2 — Core Student Features 🔴 (Build Now for SIH Demo)
- [ ] Login page with demo login
- [ ] Skills page enhancement (resume upload + AI parsing)
- [ ] Skill Gap Analysis page (full AI-powered)
- [ ] Career Roadmap (CareerPilot) — AI generated
- [ ] Assessments engine (MCQ + scoring)
- [ ] Internship Marketplace (listings + match score + apply)
- [ ] Student Profile (public shareable)

### Phase 3 — AI Tools & Gamification 🟡 (Complete for SIH)
- [ ] NexaBot chatbot
- [ ] Resume Analyzer
- [ ] Mock Interview Simulator
- [ ] Placement Readiness Score engine
- [ ] Badges system
- [ ] Leaderboard page
- [ ] NexaPoints tracking

### Phase 4 — Institution & Company Features 🟠 (Polish for SIH)
- [ ] College dashboard: skill heatmap
- [ ] College dashboard: student list
- [ ] Company: talent search
- [ ] Company: internship management
- [ ] Mentor session booking

### Phase 5 — Backend & Database 🔵 (Post SIH or parallel)
- [ ] Prisma schema setup (PostgreSQL)
- [ ] All API routes implementation
- [ ] Authentication (NextAuth / JWT)
- [ ] File upload (resume PDFs)
- [ ] Real Gemini API integration
- [ ] Deployment to Vercel

---

## 📊 SIH Demo Flow (What to Show)

> This is the recommended demo sequence for the PPT / live demo:

1. **Landing Page** → Show the problem, features, stakeholders, pricing
2. **Register** → Show 4-role registration flow, animated UI
3. **Student Dashboard** → Show streak, NexaPoints, placement score gauge
4. **Upload Resume** → AI parses PDF → skills auto-populated instantly
5. **Skill Gap Analysis** → Select "Frontend Developer" → AI shows gap report
6. **CareerPilot Roadmap** → AI generates 6-month personalized plan
7. **Internship Marketplace** → Browse with AI match scores (87%, 62%, etc.)
8. **NexaBot Chat** → Ask "What should I learn for SDE at Google?" → AI responds
9. **Mock Interview** → AI asks questions, evaluates, gives score
10. **College Dashboard** → Show skill heatmap, cohort analytics
11. **Company Dashboard** → Talent search, applicant management

---

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Next.js)                       │
│  Landing  Register  Login  Student  College  Company      │
│  Dashboard  Assessments  Marketplace  AI Tools            │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTP / API Routes
┌─────────────────────────▼───────────────────────────────┐
│                 NEXT.JS API ROUTES                        │
│  /api/auth  /api/student  /api/company  /api/ai           │
│  /api/college  /api/assessments  /api/gamification        │
└──────────┬──────────────────────────┬───────────────────┘
           │                          │
┌──────────▼─────────┐  ┌────────────▼───────────────────┐
│    PostgreSQL DB    │  │     Google Gemini API           │
│    (via Prisma)     │  │  Resume Parse · Gap Analysis    │
│                     │  │  Roadmap · Chat · Interview     │
│  Users · Skills     │  └────────────────────────────────┘
│  Assessments        │
│  Internships        │
│  Gamification       │
└─────────────────────┘
```

---

## ✅ SIH Judging Criteria Alignment

| Criterion | How SkillLink Addresses It |
|-----------|---------------------------|
| **Innovation** | AI skill gap analysis + AI match scoring — unique in Indian EdTech |
| **Feasibility** | Next.js + PostgreSQL + Gemini API — all production-ready tech |
| **Impact** | Addresses 1.5M+ engineers annually, targets AICTE mandate |
| **Scalability** | Vercel edge, serverless APIs, modular architecture |
| **Sustainability** | Freemium SaaS model, B2B college + company revenue |
| **User Experience** | Premium dark UI, animated, mobile-responsive |
| **Social Relevance** | India's skill gap crisis, Make in India alignment |

---

## 🚀 Pages Still To Build (Priority Order)

1. **`/login`** — Critical, needed for demo
2. **`/dashboard/student/skills/gap`** — Core AI feature, most impressive
3. **`/dashboard/student/ai-tools`** — NexaBot + Mock Interview
4. **`/dashboard/student/internships`** — Marketplace with match scores
5. **`/dashboard/student/assessments`** — MCQ engine
6. **`/dashboard/student/profile`** — Public shareable profile
7. **`/dashboard/student/leaderboard`** — Gamification showcase
8. **`/dashboard/college`** (enhance) — Heatmap + student list
9. **`/dashboard/company`** (enhance) — Talent search + internship mgmt
10. **`/dashboard/mentor`** (enhance) — Sessions + endorsements
