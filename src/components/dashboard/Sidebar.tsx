"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Target, BookOpen, Award, Briefcase, 
  FolderKanban, FileText, Bot, User, Building2, Users, 
  BarChart3, LogOut, CheckCircle2, ShieldCheck,
  Calendar, MessageSquare, PlusCircle
} from "lucide-react";

interface SidebarProps {
  role?: "STUDENT" | "COLLEGE" | "COMPANY" | "MENTOR";
  user?: {
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
    streakDays?: number;
    points?: number;
  };
}

interface NavItem {
  label: string;
  href: string;
  icon: any;
  badge?: string;
  count?: number;
}

export default function DashboardSidebar({ role = "STUDENT", user }: SidebarProps) {
  const pathname = usePathname();

  const studentLinks: NavItem[] = [
    { label: "Home", href: "/dashboard/student", icon: LayoutDashboard },
    { label: "Skills & Learning", href: "/dashboard/student/skills", icon: BookOpen },
    { label: "AI Learning Roadmap", href: "/dashboard/student/learning", icon: Target },
    { label: "Assessments & Quizzes", href: "/dashboard/student/assessments", icon: FileText },
    { label: "Internships", href: "/dashboard/student/internships", icon: Briefcase },
    { label: "Projects", href: "/dashboard/student/projects", icon: FolderKanban },
    { label: "Job Matches", href: "/dashboard/student/jobs", icon: Building2 },
    { label: "My Applications", href: "/dashboard/student/applications", icon: CheckCircle2 },
    { label: "Career Tools", href: "/dashboard/student/ai-tools", icon: Bot },
    { label: "Community", href: "/dashboard/student/community", icon: Users },
    { label: "Profile & Badges", href: "/dashboard/student/profile", icon: ShieldCheck },
  ];

  const collegeLinks: NavItem[] = [
    { label: "Institutional Overview", href: "/dashboard/college", icon: LayoutDashboard },
    { label: "Student Roster", href: "/dashboard/college/students", icon: Users },
    { label: "Curriculum Skill Gaps", href: "/dashboard/college/analytics", icon: BarChart3, badge: "Heatmap" },
    { label: "Placement Tracker", href: "/dashboard/college/placements", icon: Briefcase },
    { label: "Industry Partners", href: "/dashboard/college/partners", icon: Building2 },
  ];

  const companyLinks: NavItem[] = [
    { label: "Recruiter Hub", href: "/dashboard/company", icon: LayoutDashboard },
    { label: "Talent Discovery", href: "/dashboard/company/talent-search", icon: Target, badge: "AI Match" },
    { label: "Post Opportunity", href: "/dashboard/company/postings", icon: PlusCircle },
    { label: "Applicants Pipeline", href: "/dashboard/company/applicants", icon: Users, count: 18 },
    { label: "Industry Projects", href: "/dashboard/company/projects", icon: FolderKanban },
  ];

  const mentorLinks: NavItem[] = [
    { label: "Mentor Workspace", href: "/dashboard/mentor", icon: LayoutDashboard },
    { label: "Mentee Sessions", href: "/dashboard/mentor/sessions", icon: Calendar },
    { label: "Project Reviews", href: "/dashboard/mentor/reviews", icon: FolderKanban },
    { label: "Messages", href: "/dashboard/mentor/messages", icon: MessageSquare },
  ];

  const links = role === "COLLEGE" ? collegeLinks 
    : role === "COMPANY" ? companyLinks 
    : role === "MENTOR" ? mentorLinks 
    : studentLinks;

  return (
    <aside className="w-64 bg-[#090d16] border-r border-slate-800/80 h-screen sticky top-0 flex flex-col justify-between p-3.5 z-40 text-slate-300 overflow-y-auto">
      <div>
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 px-2 py-2 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <div>
            <div className="font-extrabold text-lg text-white tracking-tight leading-none flex items-center gap-0.5">
              Skill<span className="text-cyan-400">Link</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Learn • Build • Grow</p>
          </div>
        </Link>

        {/* Links List */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? "bg-blue-600/30 text-white border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                  <span>{link.label}</span>
                </div>
                
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom Banner Card matching screenshot */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 p-4 text-white group shadow-xl">
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('/images/sidebar_promo.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/70 to-transparent" />
          
          <div className="relative z-10 space-y-1">
            <h4 className="text-xs font-extrabold text-white leading-snug drop-shadow-md">
              Build Your Future with <span className="text-cyan-400">SkillLink</span>
            </h4>
            <p className="text-[10px] text-slate-300 font-medium">Learn • Build • Grow</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
