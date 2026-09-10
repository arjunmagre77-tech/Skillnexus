import bcrypt from 'bcryptjs';
import { db, generateId } from './index';

export async function seedDatabase() {
  if (db.seeded) return;
  db.seeded = true;

  console.log('🌱 Seeding SkillNexus...');

  const hash = await bcrypt.hash('demo123', 10);
  const now = new Date().toISOString();

  // ─── SKILLS ────────────────────────────────────────────────────────────────
  db.skills.push(
    { id: 'sk1',  name: 'Python',           category: 'Programming',  industry_demand: 89, related_skills: 'Django,FastAPI,ML',          careers: 'Data Scientist,AI Engineer,Backend Dev' },
    { id: 'sk2',  name: 'JavaScript',       category: 'Programming',  industry_demand: 92, related_skills: 'TypeScript,Node.js,React',    careers: 'Full Stack Dev,Frontend Dev' },
    { id: 'sk3',  name: 'React',            category: 'Frontend',     industry_demand: 91, related_skills: 'Next.js,TypeScript,Redux',    careers: 'Frontend Dev,Full Stack Dev' },
    { id: 'sk4',  name: 'Node.js',          category: 'Backend',      industry_demand: 85, related_skills: 'Express,NestJS,MongoDB',      careers: 'Backend Dev,Full Stack Dev' },
    { id: 'sk5',  name: 'SQL',              category: 'Database',     industry_demand: 84, related_skills: 'PostgreSQL,MySQL,NoSQL',      careers: 'Data Analyst,Backend Dev,DBA' },
    { id: 'sk6',  name: 'Machine Learning', category: 'AI/ML',        industry_demand: 87, related_skills: 'Python,TensorFlow,Pandas',    careers: 'ML Engineer,Data Scientist' },
    { id: 'sk7',  name: 'Docker',           category: 'DevOps',       industry_demand: 82, related_skills: 'Kubernetes,CI/CD,Linux',      careers: 'DevOps Engineer,Cloud Engineer' },
    { id: 'sk8',  name: 'TypeScript',       category: 'Programming',  industry_demand: 88, related_skills: 'JavaScript,React,Angular',    careers: 'Frontend Dev,Full Stack Dev' },
    { id: 'sk9',  name: 'Git',              category: 'Tools',        industry_demand: 95, related_skills: 'GitHub,GitLab,CI/CD',         careers: 'All Software Roles' },
    { id: 'sk10', name: 'AWS',              category: 'Cloud',        industry_demand: 83, related_skills: 'Azure,GCP,Docker',            careers: 'Cloud Engineer,DevOps Engineer' },
    { id: 'sk11', name: 'Data Analysis',    category: 'Data',         industry_demand: 81, related_skills: 'Python,SQL,Tableau',          careers: 'Data Analyst,Business Analyst' },
    { id: 'sk12', name: 'System Design',    category: 'Architecture', industry_demand: 78, related_skills: 'Microservices,API Design',    careers: 'Software Architect,Senior Dev' },
    { id: 'sk13', name: 'REST APIs',        category: 'Backend',      industry_demand: 86, related_skills: 'Node.js,FastAPI,Postman',     careers: 'Backend Dev,Full Stack Dev' },
    { id: 'sk14', name: 'React Native',     category: 'Mobile',       industry_demand: 74, related_skills: 'React,JavaScript,Expo',       careers: 'Mobile Dev,Full Stack Dev' },
    { id: 'sk15', name: 'Next.js',          category: 'Frontend',     industry_demand: 79, related_skills: 'React,TypeScript,Vercel',     careers: 'Frontend Dev,Full Stack Dev' },
    { id: 'sk16', name: 'TensorFlow',       category: 'AI/ML',        industry_demand: 76, related_skills: 'Python,Keras,ML',             careers: 'ML Engineer,AI Engineer' },
    { id: 'sk17', name: 'Cybersecurity',    category: 'Security',     industry_demand: 76, related_skills: 'Network Security,Hacking',    careers: 'Cybersecurity Analyst' },
    { id: 'sk18', name: 'UI/UX Design',     category: 'Design',       industry_demand: 72, related_skills: 'Figma,CSS,Prototyping',       careers: 'UI/UX Designer,Product Designer' },
    { id: 'sk19', name: 'MongoDB',          category: 'Database',     industry_demand: 78, related_skills: 'NoSQL,Node.js,Mongoose',      careers: 'Full Stack Dev,Backend Dev' },
    { id: 'sk20', name: 'Kubernetes',       category: 'DevOps',       industry_demand: 75, related_skills: 'Docker,AWS,CI/CD',            careers: 'DevOps Engineer,Cloud Engineer' },
    { id: 'sk21', name: 'Pandas',           category: 'Data',         industry_demand: 80, related_skills: 'Python,NumPy,Data Analysis',  careers: 'Data Scientist,Data Analyst' },
    { id: 'sk22', name: 'Figma',            category: 'Design',       industry_demand: 70, related_skills: 'UI/UX Design,Prototyping',    careers: 'UI/UX Designer' },
    { id: 'sk23', name: 'Communication',    category: 'Soft Skills',  industry_demand: 95, related_skills: 'Presentation,Leadership',     careers: 'All Roles' },
    { id: 'sk24', name: 'Problem Solving',  category: 'Soft Skills',  industry_demand: 93, related_skills: 'Critical Thinking,Algorithms',careers: 'All Roles' },
    { id: 'sk25', name: 'Django',           category: 'Backend',      industry_demand: 72, related_skills: 'Python,REST APIs,PostgreSQL', careers: 'Backend Dev,Full Stack Dev' },
  );

  // ─── BADGES ────────────────────────────────────────────────────────────────
  db.badges.push(
    { id: 'b1',  name: 'First Assessment',   description: 'Completed first skill assessment',      icon: '🏆', color: '#F59E0B' },
    { id: 'b2',  name: '7 Day Streak',        description: 'Maintained a 7-day learning streak',   icon: '🔥', color: '#EF4444' },
    { id: 'b3',  name: '30 Day Streak',       description: 'Maintained a 30-day learning streak',  icon: '🔥', color: '#DC2626' },
    { id: 'b4',  name: 'First Project',       description: 'Added your first project',              icon: '💻', color: '#3B82F6' },
    { id: 'b5',  name: 'Placement Ready',     description: 'Reached 80+ placement readiness',      icon: '🎯', color: '#10B981' },
    { id: 'b6',  name: 'Internship Ready',    description: 'Applied for your first internship',     icon: '🚀', color: '#8B5CF6' },
    { id: 'b7',  name: '5 Verified Skills',   description: 'Got 5 skills industry-verified',        icon: '⭐', color: '#F59E0B' },
    { id: 'b8',  name: 'Industry Connected',  description: 'Connected with an industry partner',    icon: '🏢', color: '#0EA5E9' },
    { id: 'b9',  name: 'Skill Master',        description: 'Reached advanced level in 3 skills',   icon: '🧠', color: '#6366F1' },
    { id: 'b10', name: 'Industry Champion',   description: 'Completed an industry project',         icon: '🏆', color: '#D97706' },
    { id: 'b11', name: '100 Day Streak',      description: 'Maintained a 100-day learning streak',  icon: '🔥', color: '#B91C1C' },
    { id: 'b12', name: 'Top Performer',       description: 'Ranked top 10 on leaderboard',          icon: '👑', color: '#FBBF24' },
  );

  // ─── CAREER PATHS ──────────────────────────────────────────────────────────
  db.career_paths.push(
    { id: 'cp1', title: 'Full Stack Developer',  required_skills: 'JavaScript,React,Node.js,SQL,Git,REST APIs,TypeScript', avg_salary: '₹8-18 LPA',  demand_level: 'Very High' },
    { id: 'cp2', title: 'AI/ML Engineer',         required_skills: 'Python,Machine Learning,TensorFlow,SQL,Mathematics',    avg_salary: '₹12-25 LPA', demand_level: 'High' },
    { id: 'cp3', title: 'Data Scientist',         required_skills: 'Python,SQL,Pandas,Machine Learning,Statistics',          avg_salary: '₹10-20 LPA', demand_level: 'High' },
    { id: 'cp4', title: 'DevOps Engineer',        required_skills: 'Docker,Kubernetes,AWS,Linux,CI/CD,Git',                   avg_salary: '₹10-22 LPA', demand_level: 'High' },
    { id: 'cp5', title: 'Frontend Developer',     required_skills: 'React,TypeScript,JavaScript,CSS,Next.js,UI/UX Design',    avg_salary: '₹6-15 LPA',  demand_level: 'Very High' },
    { id: 'cp6', title: 'Cybersecurity Analyst',  required_skills: 'Cybersecurity,Linux,Network Security,Python',             avg_salary: '₹8-18 LPA',  demand_level: 'Medium' },
    { id: 'cp7', title: 'Cloud Engineer',         required_skills: 'AWS,Docker,Kubernetes,Linux,Terraform',                   avg_salary: '₹10-22 LPA', demand_level: 'High' },
    { id: 'cp8', title: 'UI/UX Designer',         required_skills: 'Figma,UI/UX Design,CSS,Prototyping,User Research',        avg_salary: '₹5-12 LPA',  demand_level: 'Medium' },
    { id: 'cp9', title: 'Data Analyst',           required_skills: 'SQL,Python,Data Analysis,Excel,Tableau',                  avg_salary: '₹5-12 LPA',  demand_level: 'High' },
  );

  // ─── COLLEGE ───────────────────────────────────────────────────────────────
  const collegeUserId = generateId();
  const collegeProfileId = 'college-nitk';
  db.users.push({ id: collegeUserId, email: 'college@demo.com', password: hash, name: 'NITK Surathkal', role: 'college', is_demo: true, created_at: now });
  db.college_profiles.push({ id: collegeProfileId, user_id: collegeUserId, college_name: 'NITK Surathkal', location: 'Karnataka', total_students: 6500, established: 1960, created_at: now });

  const deptNames = [
    { name: 'Computer Science & Engineering', code: 'CSE' },
    { name: 'Information Technology', code: 'IT' },
    { name: 'AI & Data Science', code: 'AIDS' },
    { name: 'Electronics & Communication', code: 'ECE' },
    { name: 'Mechanical Engineering', code: 'ME' },
  ];
  for (const d of deptNames) {
    db.college_departments.push({ id: generateId(), college_id: collegeProfileId, name: d.name, code: d.code });
  }

  // ─── MENTOR ────────────────────────────────────────────────────────────────
  const mentorUserId = generateId();
  db.users.push({ id: mentorUserId, email: 'mentor@demo.com', password: hash, name: 'Rajesh Kumar', role: 'mentor', is_demo: true, created_at: now });
  db.mentor_profiles.push({ id: generateId(), user_id: mentorUserId, company: 'TechCorp India', designation: 'Senior Software Engineer', expertise: 'React,Node.js,System Design,Career Guidance', experience_yrs: 8, is_available: true, created_at: now });

  // ─── COMPANIES ─────────────────────────────────────────────────────────────
  const companies = [
    { name: 'TechCorp India',         industry: 'Software',         email: 'hr@techcorp.com',     loc: 'Bangalore', size: '1000-5000' },
    { name: 'CloudSystems Ltd',       industry: 'Cloud Computing',  email: 'hr@cloud.com',         loc: 'Hyderabad', size: '500-1000' },
    { name: 'DataWorks Analytics',    industry: 'Data & Analytics', email: 'hr@dataworks.com',     loc: 'Mumbai',    size: '200-500' },
    { name: 'NexaStart Technologies', industry: 'FinTech',          email: 'hr@nexastart.com',     loc: 'Pune',      size: '50-200' },
    { name: 'AI Vision Labs',         industry: 'AI',               email: 'hr@aivision.com',      loc: 'Chennai',   size: '50-200' },
  ];

  const companyIds: string[] = [];
  for (const c of companies) {
    const uid = generateId();
    const pid = generateId();
    companyIds.push(pid);
    db.users.push({ id: uid, email: c.email, password: hash, name: c.name, role: 'company', is_demo: true, created_at: now });
    db.company_profiles.push({ id: pid, user_id: uid, company_name: c.name, industry: c.industry, size: c.size, location: c.loc, is_verified: true, created_at: now });
  }

  // Primary demo company user
  const demoCompanyUserId = generateId();
  db.users.push({ id: demoCompanyUserId, email: 'company@demo.com', password: hash, name: 'TechCorp India', role: 'company', is_demo: true, created_at: now });
  db.company_profiles.push({ id: generateId(), user_id: demoCompanyUserId, company_name: 'TechCorp India', industry: 'Software', size: '1000-5000', location: 'Bangalore', is_verified: true, created_at: now });

  // ─── INTERNSHIPS ───────────────────────────────────────────────────────────
  const internships = [
    { cid: companyIds[0], title: 'Frontend Developer Intern',    desc: 'Work on our React-based dashboard products with the core UI team.',         skills: 'React,JavaScript,TypeScript,CSS,Git',          dur: '6 months', stipend: '₹25,000/month', loc: 'Bangalore', mode: 'hybrid'  as const, dl: '2025-03-15' },
    { cid: companyIds[0], title: 'Backend Developer Intern',     desc: 'Build scalable Node.js microservices and REST APIs.',                        skills: 'Node.js,REST APIs,SQL,Git,Docker',             dur: '6 months', stipend: '₹25,000/month', loc: 'Bangalore', mode: 'hybrid'  as const, dl: '2025-03-15' },
    { cid: companyIds[1], title: 'Cloud Engineering Intern',     desc: 'Assist in migrating enterprise clients to AWS cloud infrastructure.',        skills: 'AWS,Docker,Linux,Python,Git',                  dur: '4 months', stipend: '₹30,000/month', loc: 'Hyderabad', mode: 'onsite'  as const, dl: '2025-02-28' },
    { cid: companyIds[1], title: 'DevOps Intern',                desc: 'Work with CI/CD pipelines and Kubernetes clusters.',                         skills: 'Docker,Kubernetes,Git,Linux,AWS',              dur: '6 months', stipend: '₹28,000/month', loc: 'Hyderabad', mode: 'onsite'  as const, dl: '2025-03-30' },
    { cid: companyIds[2], title: 'Data Analytics Intern',        desc: 'Analyze large datasets and create business intelligence dashboards.',        skills: 'Python,SQL,Pandas,Data Analysis,Tableau',     dur: '3 months', stipend: '₹20,000/month', loc: 'Mumbai',    mode: 'hybrid'  as const, dl: '2025-02-20' },
    { cid: companyIds[2], title: 'ML Engineer Intern',           desc: 'Build and deploy machine learning models for client analytics.',            skills: 'Python,Machine Learning,TensorFlow,SQL,Git',  dur: '6 months', stipend: '₹35,000/month', loc: 'Mumbai',    mode: 'remote'  as const, dl: '2025-03-20' },
    { cid: companyIds[3], title: 'Full Stack Developer Intern',  desc: 'Work on our FinTech product end-to-end using React and Node.js.',           skills: 'React,Node.js,JavaScript,SQL,REST APIs',      dur: '6 months', stipend: '₹22,000/month', loc: 'Pune',      mode: 'hybrid'  as const, dl: '2025-03-10' },
    { cid: companyIds[3], title: 'Mobile App Developer Intern',  desc: 'Build cross-platform mobile app features using React Native.',               skills: 'React Native,JavaScript,REST APIs,Git',       dur: '4 months', stipend: '₹20,000/month', loc: 'Pune',      mode: 'remote'  as const, dl: '2025-04-01' },
    { cid: companyIds[4], title: 'AI Research Intern',           desc: 'Contribute to cutting-edge NLP and computer vision research projects.',     skills: 'Python,Machine Learning,TensorFlow,Git',     dur: '6 months', stipend: '₹40,000/month', loc: 'Chennai',   mode: 'onsite'  as const, dl: '2025-02-15' },
    { cid: companyIds[4], title: 'Computer Vision Intern',       desc: 'Build image classification and object detection models.',                    skills: 'Python,TensorFlow,Machine Learning,Git',      dur: '4 months', stipend: '₹35,000/month', loc: 'Chennai',   mode: 'onsite'  as const, dl: '2025-03-01' },
  ];

  for (const i of internships) {
    db.internships.push({ id: generateId(), company_id: i.cid, title: i.title, description: i.desc, required_skills: i.skills, duration: i.dur, stipend: i.stipend, location: i.loc, work_mode: i.mode, deadline: i.dl, is_active: true, created_at: now });
  }

  // ─── JOBS ──────────────────────────────────────────────────────────────────
  const jobs = [
    { cid: companyIds[0], title: 'Full Stack Developer',        skills: 'React,Node.js,TypeScript,SQL,Docker',          salary: '₹12-18 LPA', loc: 'Bangalore', mode: 'hybrid' },
    { cid: companyIds[1], title: 'Cloud Solutions Architect',   skills: 'AWS,Kubernetes,Docker,System Design',           salary: '₹18-25 LPA', loc: 'Hyderabad', mode: 'hybrid' },
    { cid: companyIds[2], title: 'Data Scientist',              skills: 'Python,Machine Learning,SQL,TensorFlow,Pandas', salary: '₹15-22 LPA', loc: 'Mumbai',    mode: 'remote' },
    { cid: companyIds[3], title: 'Frontend Engineer',           skills: 'React,TypeScript,Next.js,CSS,Git',              salary: '₹10-15 LPA', loc: 'Pune',      mode: 'hybrid' },
    { cid: companyIds[4], title: 'ML Engineer',                 skills: 'Python,TensorFlow,Machine Learning,Docker,REST APIs', salary: '₹20-30 LPA', loc: 'Chennai', mode: 'onsite' },
  ];
  for (const j of jobs) {
    db.jobs.push({ id: generateId(), company_id: j.cid, title: j.title, required_skills: j.skills, salary_range: j.salary, location: j.loc, work_mode: j.mode, is_active: true, created_at: now });
  }

  // ─── INDUSTRY PROJECTS ─────────────────────────────────────────────────────
  const projects = [
    { cid: companyIds[4], title: 'AI-Powered Customer Support Analytics', desc: 'Build an NLP pipeline to analyze customer support tickets and extract insights.', skills: 'Python,Machine Learning,REST APIs,React,SQL', diff: 'advanced',      dur: '3 months', team: 3, prize: '₹50,000 + Pre-Placement Interview', apps: 24 },
    { cid: companyIds[0], title: 'Real-Time Collaboration Platform',       desc: 'Design and build a real-time collaborative document editing tool.',              skills: 'React,Node.js,WebSockets,MongoDB,TypeScript',       diff: 'advanced',      dur: '3 months', team: 4, prize: '₹40,000 + Internship Offer',        apps: 31 },
    { cid: companyIds[1], title: 'Cloud Cost Optimization Dashboard',      desc: 'Create a tool that analyzes AWS resource usage and cost optimization.',          skills: 'AWS,Python,React,Data Analysis,REST APIs',          diff: 'intermediate', dur: '2 months', team: 2, prize: '₹25,000',                            apps: 18 },
    { cid: companyIds[2], title: 'Predictive Sales Analytics Engine',      desc: 'Build an ML model to predict sales trends with a visualization dashboard.',     skills: 'Python,Machine Learning,SQL,Pandas,React',          diff: 'intermediate', dur: '2 months', team: 3, prize: '₹30,000 + Certificate',             apps: 22 },
    { cid: companyIds[3], title: 'FinTech Fraud Detection System',         desc: 'Develop a real-time transaction monitoring system with ML-based fraud detection.', skills: 'Python,Machine Learning,SQL,REST APIs,Docker',     diff: 'advanced',      dur: '4 months', team: 4, prize: '₹60,000 + PPO',                      apps: 15 },
  ];
  for (const p of projects) {
    db.industry_projects.push({ id: generateId(), company_id: p.cid, title: p.title, description: p.desc, required_skills: p.skills, difficulty: p.diff, duration: p.dur, team_size: p.team, prize: p.prize, applicants: p.apps, is_active: true, created_at: now });
  }

  // ─── DEMO STUDENT ──────────────────────────────────────────────────────────
  const demoStudentUserId = generateId();
  const demoStudentProfileId = 'student-arjun';
  db.users.push({ id: demoStudentUserId, email: 'student@demo.com', password: hash, name: 'Arjun Sharma', role: 'student', is_demo: true, created_at: now });
  db.student_profiles.push({
    id: demoStudentProfileId, user_id: demoStudentUserId, college_id: collegeProfileId,
    department: 'Computer Science & Engineering', year_of_study: 3, graduation_year: 2026, gpa: 8.7,
    location: 'Karnataka', bio: 'Aspiring Full Stack Developer passionate about building impactful products.',
    linkedin_url: 'https://linkedin.com/in/arjunsharma', github_url: 'https://github.com/arjunsharma',
    career_goal: 'Full Stack Developer', target_role: 'Full Stack Developer',
    placement_readiness: 82, talent_iq: 84, nexa_points: 2450, streak_days: 12,
    last_activity_date: new Date().toISOString().split('T')[0],
    is_premium: false, is_public: true, created_at: now,
  });

  // Demo student skills
  const demoSkills = [
    { sid: 'sk2', level: 7, v: 'assessed'          as const },
    { sid: 'sk3', level: 5, v: 'assessed'          as const },
    { sid: 'sk1', level: 8, v: 'industry_verified' as const },
    { sid: 'sk5', level: 6, v: 'assessed'          as const },
    { sid: 'sk9', level: 8, v: 'industry_verified' as const },
    { sid: 'sk13',level: 6, v: 'self_declared'     as const },
    { sid: 'sk8', level: 4, v: 'self_declared'     as const },
    { sid: 'sk7', level: 2, v: 'self_declared'     as const },
  ];
  for (const s of demoSkills) {
    db.student_skills.push({ id: generateId(), student_id: demoStudentProfileId, skill_id: s.sid, level: s.level, verification_status: s.v });
  }

  // Streak
  db.streaks.push({ id: generateId(), student_id: demoStudentProfileId, current_streak: 12, longest_streak: 30, last_activity: new Date().toISOString().split('T')[0], freeze_count: 2, total_days: 78 });

  // Points transactions
  const txs = [
    { pts: 250, action: 'industry_verification', desc: '⭐ Industry Skill Verification — Python' },
    { pts: 100, action: 'streak_7_day',           desc: '🔥 7 Day Streak Bonus' },
    { pts: 50,  action: 'assessment_complete',    desc: '✅ React Assessment Completed' },
    { pts: 100, action: 'project_milestone',      desc: '💻 Project Milestone — Portfolio Site' },
    { pts: 500, action: 'streak_30_day',          desc: '🔥 30 Day Streak Bonus' },
    { pts: 250, action: 'industry_verification',  desc: '⭐ Industry Skill Verification — Git' },
    { pts: 50,  action: 'assessment_complete',    desc: '✅ JavaScript Assessment Completed' },
    { pts: 10,  action: 'daily_learning',         desc: '📚 Daily Learning Activity' },
    { pts: 10,  action: 'daily_learning',         desc: '📚 Daily Learning Activity' },
    { pts: 500, action: 'industry_project',       desc: '🏢 Industry Project Completed' },
  ];
  const baseDate = new Date();
  for (let i = 0; i < txs.length; i++) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - i * 3);
    db.points_transactions.push({ id: generateId(), student_id: demoStudentProfileId, points: txs[i].pts, action: txs[i].action, description: txs[i].desc, created_at: d.toISOString() });
  }

  // Badges
  for (const bid of ['b1','b2','b3','b4','b5','b6']) {
    db.user_badges.push({ id: generateId(), student_id: demoStudentProfileId, badge_id: bid, earned_at: now });
  }

  // Notifications
  db.notifications.push(
    { id: generateId(), user_id: demoStudentUserId, type: 'streak',      title: '🔥 Streak Active!',        message: 'Your 12-day learning streak is active. Keep it up!',                is_read: false, link: '/student/rewards',      created_at: now },
    { id: generateId(), user_id: demoStudentUserId, type: 'match',       title: '📣 New Internship Match!', message: '3 new internships match 90%+ of your skills.',                      is_read: false, link: '/student/internships',  created_at: now },
    { id: generateId(), user_id: demoStudentUserId, type: 'gap',         title: '⚠️ Skill Gap Alert',       message: 'Your Docker skill gap is still high. Start learning now!',           is_read: false, link: '/student/skill-gap',    created_at: now },
    { id: generateId(), user_id: demoStudentUserId, type: 'application', title: '✅ Application Update',    message: 'TechCorp India moved your application to Shortlisted!',              is_read: true,  link: '/student/applications', created_at: now },
  );

  // Roadmap
  const roadmapSteps = JSON.stringify([
    { step: 1,  skill: 'JavaScript Advanced',    status: 'completed',   duration: '3 weeks',  resources: ['MDN Web Docs', 'JavaScript.info'] },
    { step: 2,  skill: 'React Mastery',           status: 'in_progress', duration: '4 weeks',  resources: ['React Docs', 'Scrimba React'] },
    { step: 3,  skill: 'Node.js & Express',       status: 'not_started', duration: '3 weeks',  resources: ['NodeJS.org', 'The Odin Project'] },
    { step: 4,  skill: 'REST API Design',          status: 'not_started', duration: '2 weeks',  resources: ['REST API Tutorial'] },
    { step: 5,  skill: 'SQL & Databases',          status: 'not_started', duration: '3 weeks',  resources: ['SQLZoo', 'PostgreSQL Tutorial'] },
    { step: 6,  skill: 'TypeScript',               status: 'not_started', duration: '2 weeks',  resources: ['TypeScript Handbook'] },
    { step: 7,  skill: 'Docker',                   status: 'not_started', duration: '2 weeks',  resources: ['Docker Docs', 'TechWorld YouTube'] },
    { step: 8,  skill: 'System Design',            status: 'not_started', duration: '4 weeks',  resources: ['System Design Primer'] },
    { step: 9,  skill: 'Build Industry Project',   status: 'not_started', duration: '4 weeks',  resources: [] },
    { step: 10, skill: 'Apply for Internships',    status: 'not_started', duration: '2 weeks',  resources: [] },
  ]);
  db.learning_roadmaps.push({ id: generateId(), student_id: demoStudentProfileId, career_goal: 'Full Stack Developer', steps: roadmapSteps, generated_at: now });

  // Applications for demo student
  const int1 = db.internships[0];
  const int2 = db.internships[1];
  if (int1) db.applications.push({ id: generateId(), student_id: demoStudentProfileId, posting_id: int1.id, posting_type: 'internship', status: 'shortlisted', match_score: 92, applied_at: now });
  if (int2) db.applications.push({ id: generateId(), student_id: demoStudentProfileId, posting_id: int2.id, posting_type: 'internship', status: 'applied', match_score: 85, applied_at: now });

  // ─── OTHER STUDENTS ────────────────────────────────────────────────────────
  const otherStudents = [
    { name: 'Priya Nair',     email: 'priya@student.com',   dept: 'AI & Data Science',            yr: 3, grad: 2026, gpa: 9.1, goal: 'Data Scientist',      readiness: 88, iq: 91, pts: 3200, streak: 24,
      skills: [{ sid: 'sk1', l: 9, v: 'industry_verified' as const }, { sid: 'sk6', l: 7, v: 'assessed' as const }, { sid: 'sk5', l: 8, v: 'assessed' as const }, { sid: 'sk21', l: 8, v: 'assessed' as const }] },
    { name: 'Rahul Mehta',    email: 'rahul@student.com',   dept: 'Information Technology',        yr: 4, grad: 2025, gpa: 7.9, goal: 'DevOps Engineer',     readiness: 71, iq: 74, pts: 1680, streak: 5,
      skills: [{ sid: 'sk9', l: 8, v: 'assessed' as const }, { sid: 'sk7', l: 6, v: 'assessed' as const }, { sid: 'sk10', l: 4, v: 'self_declared' as const }] },
    { name: 'Sneha Patel',    email: 'sneha@student.com',   dept: 'Computer Science & Engineering', yr: 2, grad: 2027, gpa: 8.3, goal: 'Frontend Developer', readiness: 61, iq: 65, pts: 920,  streak: 8,
      skills: [{ sid: 'sk2', l: 6, v: 'assessed' as const }, { sid: 'sk3', l: 5, v: 'self_declared' as const }] },
    { name: 'Karthik Reddy',  email: 'karthik@student.com', dept: 'AI & Data Science',            yr: 4, grad: 2025, gpa: 8.9, goal: 'AI/ML Engineer',      readiness: 91, iq: 93, pts: 4100, streak: 45,
      skills: [{ sid: 'sk1', l: 9, v: 'industry_verified' as const }, { sid: 'sk6', l: 8, v: 'industry_verified' as const }, { sid: 'sk16', l: 7, v: 'assessed' as const }] },
    { name: 'Anjali Singh',   email: 'anjali@student.com',  dept: 'Electronics & Communication',   yr: 3, grad: 2026, gpa: 7.5, goal: 'Full Stack Developer',readiness: 55, iq: 59, pts: 740,  streak: 3,
      skills: [{ sid: 'sk2', l: 5, v: 'self_declared' as const }, { sid: 'sk9', l: 6, v: 'self_declared' as const }] },
    { name: 'Vikram Gupta',   email: 'vikram@student.com',  dept: 'Computer Science & Engineering', yr: 3, grad: 2026, gpa: 8.1, goal: 'Cloud Engineer',     readiness: 68, iq: 72, pts: 1450, streak: 9,
      skills: [{ sid: 'sk10', l: 6, v: 'assessed' as const }, { sid: 'sk7', l: 7, v: 'assessed' as const }, { sid: 'sk9', l: 8, v: 'assessed' as const }] },
    { name: 'Meera Krishnan', email: 'meera@student.com',   dept: 'Information Technology',        yr: 2, grad: 2027, gpa: 9.3, goal: 'Data Analyst',        readiness: 62, iq: 68, pts: 1100, streak: 15,
      skills: [{ sid: 'sk5', l: 7, v: 'assessed' as const }, { sid: 'sk11', l: 6, v: 'assessed' as const }] },
    { name: 'Dev Kapoor',     email: 'dev@student.com',     dept: 'Computer Science & Engineering', yr: 4, grad: 2025, gpa: 7.8, goal: 'Full Stack Developer',readiness: 76, iq: 79, pts: 2080, streak: 18,
      skills: [{ sid: 'sk4', l: 7, v: 'assessed' as const }, { sid: 'sk5', l: 7, v: 'assessed' as const }, { sid: 'sk13', l: 8, v: 'assessed' as const }, { sid: 'sk9', l: 9, v: 'industry_verified' as const }] },
    { name: 'Riya Desai',     email: 'riya@student.com',    dept: 'Mechanical Engineering',         yr: 3, grad: 2026, gpa: 7.2, goal: 'Data Analyst',        readiness: 45, iq: 50, pts: 380,  streak: 1,
      skills: [{ sid: 'sk1', l: 3, v: 'self_declared' as const }, { sid: 'sk5', l: 3, v: 'self_declared' as const }] },
  ];

  for (const s of otherStudents) {
    const uid = generateId();
    const pid = generateId();
    db.users.push({ id: uid, email: s.email, password: hash, name: s.name, role: 'student', is_demo: true, created_at: now });
    db.student_profiles.push({
      id: pid, user_id: uid, college_id: collegeProfileId, department: s.dept,
      year_of_study: s.yr, graduation_year: s.grad, gpa: s.gpa,
      career_goal: s.goal, target_role: s.goal, placement_readiness: s.readiness,
      talent_iq: s.iq, nexa_points: s.pts, streak_days: s.streak,
      is_premium: false, is_public: true, created_at: now,
    });
    for (const sk of s.skills) {
      db.student_skills.push({ id: generateId(), student_id: pid, skill_id: sk.sid, level: sk.l, verification_status: sk.v });
    }
    db.streaks.push({ id: generateId(), student_id: pid, current_streak: s.streak, longest_streak: s.streak * 2, freeze_count: 2, total_days: s.streak * 3 });
  }

  console.log('✅ SkillNexus seeded!');
}
