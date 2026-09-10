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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-cyan-200 fill-current" viewBox="0 0 24 24">
              <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.96 9.17 8.15C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12.02c0 2.98 2.42 5.4 5.4 5.4 1.44 0 2.8-.56 3.77-1.53L12 13.08l2.83 2.81c.97.97 2.33 1.53 3.77 1.53 2.98 0 5.4-2.42 5.4-5.4 0-2.98-2.42-5.4-5.4-5.4zm-13.2 9c-1.98 0-3.6-1.62-3.6-3.6 0-1.98 1.62-3.6 3.6-3.6 1.01 0 1.97.41 2.65 1.09l1.83 1.83-1.83 1.83C7.37 15.21 6.41 15.62 5.4 15.62zm13.2 0c-1.01 0-1.97-.41-2.65-1.09L14.12 12.7l1.83-1.83c.68-.68 1.64-1.09 2.65-1.09 1.98 0 3.6 1.62 3.6 3.6 0 1.98-1.62 3.6-3.6 3.6z"/>
            </svg>
          </div>
          <div>
            <div className="font-extrabold text-lg text-white tracking-tight leading-none flex items-center gap-1.5">
              SkillNexus
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
              Build Your Future with <span className="text-cyan-400">SkillNexus</span>
            </h4>
            <p className="text-[10px] text-slate-300 font-medium">Learn • Build • Grow</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
