// In-memory data store — simulates a database for demo purposes
// All data persists per server process restart. In production, replace with PostgreSQL.

export function generateId(prefix: string = 'id_'): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return prefix + crypto.randomUUID();
  }
  return prefix + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

// ─── TYPES ───────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'student' | 'college' | 'company' | 'mentor';
  avatar?: string;
  is_demo?: boolean;
  created_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  college_id?: string;
  department?: string;
  year_of_study?: number;
  graduation_year?: number;
  gpa?: number;
  location?: string;
  bio?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  resume_url?: string;
  career_goal?: string;
  target_role?: string;
  placement_readiness: number;
  talent_iq: number;
  nexa_points: number;
  streak_days: number;
  last_activity_date?: string;
  is_premium: boolean;
  is_public: boolean;
  created_at: string;
}

export interface CollegeProfile {
  id: string;
  user_id: string;
  college_name: string;
  location?: string;
  website?: string;
  total_students: number;
  established?: number;
  logo_url?: string;
  created_at: string;
}

export interface CompanyProfile {
  id: string;
  user_id: string;
  company_name: string;
  industry?: string;
  size?: string;
  location?: string;
  website?: string;
  description?: string;
  logo_url?: string;
  is_verified: boolean;
  created_at: string;
}

export interface MentorProfile {
  id: string;
  user_id: string;
  company?: string;
  designation?: string;
  expertise?: string;
  experience_yrs?: number;
  bio?: string;
  linkedin_url?: string;
  is_available: boolean;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
  industry_demand: number;
  related_skills?: string;
  careers?: string;
}

export interface StudentSkill {
  id: string;
  student_id: string;
  skill_id: string;
  level: number;
  verification_status: 'self_declared' | 'assessed' | 'industry_verified';
  verified_by?: string;
  verified_at?: string;
}

export interface Internship {
  id: string;
  company_id: string;
  title: string;
  description?: string;
  required_skills: string;
  duration: string;
  stipend: string;
  location: string;
  work_mode: 'remote' | 'hybrid' | 'onsite';
  deadline?: string;
  is_active: boolean;
  created_at: string;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  description?: string;
  required_skills: string;
  salary_range: string;
  location: string;
  work_mode: string;
  is_active: boolean;
  created_at: string;
}

export interface IndustryProject {
  id: string;
  company_id: string;
  title: string;
  description?: string;
  required_skills: string;
  difficulty: string;
  duration: string;
  team_size: number;
  prize?: string;
  deadline?: string;
  applicants: number;
  is_active: boolean;
  created_at: string;
}

export interface Application {
  id: string;
  student_id: string;
  posting_id: string;
  posting_type: 'internship' | 'job' | 'project';
  status: 'applied' | 'viewed' | 'shortlisted' | 'interview' | 'rejected' | 'selected';
  cover_letter?: string;
  match_score?: number;
  applied_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface UserBadge {
  id: string;
  student_id: string;
  badge_id: string;
  earned_at: string;
}

export interface PointsTransaction {
  id: string;
  student_id: string;
  points: number;
  action: string;
  description: string;
  created_at: string;
}

export interface Streak {
  id: string;
  student_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity?: string;
  freeze_count: number;
  total_days: number;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message?: string;
  is_read: boolean;
  link?: string;
  created_at: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description?: string;
  avg_salary?: string;
  demand_level?: string;
  required_skills: string;
  roadmap_steps?: string;
}

export interface LearningRoadmap {
  id: string;
  student_id: string;
  career_goal: string;
  steps: string; // JSON
  generated_at: string;
}

export interface CollegeDepartment {
  id: string;
  college_id: string;
  name: string;
  code: string;
}

// ─── IN-MEMORY STORE ─────────────────────────────────────────────────────────
export const db = {
  users: [] as User[],
  student_profiles: [] as StudentProfile[],
  college_profiles: [] as CollegeProfile[],
  company_profiles: [] as CompanyProfile[],
  mentor_profiles: [] as MentorProfile[],
  skills: [] as Skill[],
  student_skills: [] as StudentSkill[],
  internships: [] as Internship[],
  jobs: [] as Job[],
  industry_projects: [] as IndustryProject[],
  applications: [] as Application[],
  badges: [] as Badge[],
  user_badges: [] as UserBadge[],
  points_transactions: [] as PointsTransaction[],
  streaks: [] as Streak[],
  notifications: [] as Notification[],
  career_paths: [] as CareerPath[],
  learning_roadmaps: [] as LearningRoadmap[],
  college_departments: [] as CollegeDepartment[],
  seeded: false,
};

// ─── QUERY HELPERS ────────────────────────────────────────────────────────────
export const query = {
  findUserByEmail: (email: string) => db.users.find(u => u.email === email),
  findUserById: (id: string) => db.users.find(u => u.id === id),
  findStudentByUserId: (userId: string) => db.student_profiles.find(s => s.user_id === userId),
  findStudentById: (id: string) => db.student_profiles.find(s => s.id === id),
  findCollegeByUserId: (userId: string) => db.college_profiles.find(c => c.user_id === userId),
  findCompanyByUserId: (userId: string) => db.company_profiles.find(c => c.user_id === userId),
  findMentorByUserId: (userId: string) => db.mentor_profiles.find(m => m.user_id === userId),
  findSkillById: (id: string) => db.skills.find(s => s.id === id),
  findSkillByName: (name: string) => db.skills.find(s => s.name.toLowerCase() === name.toLowerCase()),
  getStudentSkills: (studentId: string) => db.student_skills.filter(ss => ss.student_id === studentId),
  getStudentApplications: (studentId: string) => db.applications.filter(a => a.student_id === studentId),
  getStudentBadges: (studentId: string) => {
    const ubs = db.user_badges.filter(ub => ub.student_id === studentId);
    return ubs.map(ub => ({ ...ub, badge: db.badges.find(b => b.id === ub.badge_id) }));
  },
  getStudentTransactions: (studentId: string) => db.points_transactions.filter(t => t.student_id === studentId).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
  getStudentStreak: (studentId: string) => db.streaks.find(s => s.student_id === studentId),
  getUserNotifications: (userId: string) => db.notifications.filter(n => n.user_id === userId).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
  getCompanyById: (id: string) => db.company_profiles.find(c => c.id === id),
  getActiveInternships: () => db.internships.filter(i => i.is_active),
  getActiveJobs: () => db.jobs.filter(j => j.is_active),
  getActiveProjects: () => db.industry_projects.filter(p => p.is_active),
  getStudentRoadmap: (studentId: string) => db.learning_roadmaps.find(r => r.student_id === studentId),
  getCollegeDepartments: (collegeId: string) => db.college_departments.filter(d => d.college_id === collegeId),
  getAllStudents: () => db.student_profiles,
};
