export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  email: string;
  college: string;
  year: string;
  department: string;
  matchScore: number;
  targetRole: string;
  talentIQ: number;
  skills: string[];
  appliedOpportunity?: string;
  appliedDate?: string;
  assessmentScore?: number;
  recruitmentStage?: "Under Review" | "In Assessment" | "Interviewing" | "Offer Extended" | "Hired" | "Rejected";
  status?: string;
}

export interface OpportunityListing {
  id: string;
  role: string;
  type: "Internship" | "Full-Time Job";
  status: "Active" | "Paused" | "Closed";
  location: string;
  salary: string;
  postedDate: string;
  skills: string[];
  candidatesCount: number;
  highMatchCount: number;
  topMatchScore: string;
  iconType: "building" | "laptop" | "shield" | "chip";
}

export interface IndustryChallenge {
  id: string;
  title: string;
  company: "Cognizant" | "Microsoft" | "Google" | string;
  companyLogoType: "cognizant" | "microsoft" | "google";
  deadline: string;
  skills: string[];
  description: string;
  rewardAmount: string;
  rewardType: "Grant" | "Prize Pool";
  submissions: number;
  maxSubmissions: number;
  status: "Active" | "Judging" | "Completed";
  iconType: "code" | "chip" | "cloud";
}

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "cand_1",
    name: "Aarav Sharma",
    avatar: "/images/avatars/aarav.jpg",
    email: "aarav.sharma@iitb.ac.in",
    college: "IIT Bombay",
    year: "3rd Year",
    department: "Computer Science & Engineering",
    matchScore: 96,
    targetRole: "AI Systems Engineering Intern",
    talentIQ: 780,
    skills: ["Python", "PyTorch", "Next.js", "Vector DBs", "TypeScript"],
    appliedOpportunity: "AI Systems Engineering Intern",
    appliedDate: "Sep 12, 2026",
    assessmentScore: 94,
    recruitmentStage: "Interviewing",
    status: "Verified Top Candidate",
  },
  {
    id: "cand_2",
    name: "Ananya Patel",
    avatar: "/images/avatars/ananya.jpg",
    email: "ananya.patel@bits.ac.in",
    college: "BITS Pilani",
    year: "4th Year",
    department: "AI & Data Science",
    matchScore: 94,
    targetRole: "Full Stack ML Engineer",
    talentIQ: 810,
    skills: ["Python", "Vector DBs", "Docker", "System Design", "React"],
    appliedOpportunity: "AI Systems Engineering Intern",
    appliedDate: "Sep 11, 2026",
    assessmentScore: 92,
    recruitmentStage: "Offer Extended",
    status: "Verified Top Candidate",
  },
  {
    id: "cand_3",
    name: "Karthik Varma",
    avatar: "/images/avatars/karthik.jpg",
    email: "karthik.v@iit.ac.in",
    college: "IIT Hyderabad",
    year: "4th Year",
    department: "Computer Science",
    matchScore: 98,
    targetRole: "LLM & GPU Systems Engineer",
    talentIQ: 845,
    skills: ["C++", "PyTorch", "CUDA", "System Design", "Python"],
    appliedOpportunity: "Full Stack Engineer (New Grad 2026)",
    appliedDate: "Sep 10, 2026",
    assessmentScore: 98,
    recruitmentStage: "Offer Extended",
    status: "Verified Top Candidate",
  },
  {
    id: "cand_4",
    name: "Sneha Reddy",
    avatar: "/images/avatars/sneha.jpg",
    email: "sneha.reddy@nitt.edu",
    college: "NIT Trichy",
    year: "3rd Year",
    department: "Information Technology",
    matchScore: 88,
    targetRole: "Frontend Platform Engineer",
    talentIQ: 730,
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS"],
    appliedOpportunity: "Full Stack Engineer (New Grad 2026)",
    appliedDate: "Sep 09, 2026",
    assessmentScore: 86,
    recruitmentStage: "In Assessment",
    status: "Active Candidate",
  },
  {
    id: "cand_5",
    name: "Rohan Kapoor",
    avatar: "/images/avatars/rohan.jpg",
    email: "rohan.k@dtu.ac.in",
    college: "DTU Delhi",
    year: "4th Year",
    department: "Software Engineering",
    matchScore: 91,
    targetRole: "Backend Distributed Systems Engineer",
    talentIQ: 795,
    skills: ["Go", "Kubernetes", "PostgreSQL", "System Design", "Docker"],
    appliedOpportunity: "AI Systems Engineering Intern",
    appliedDate: "Sep 08, 2026",
    assessmentScore: 90,
    recruitmentStage: "Under Review",
    status: "Under Review",
  },
  {
    id: "cand_6",
    name: "Priya Sundaram",
    avatar: "/images/avatars/priya.jpg",
    email: "priya.s@iitm.ac.in",
    college: "IIT Madras",
    year: "3rd Year",
    department: "Computer Science",
    matchScore: 95,
    targetRole: "AI Alignment & Safety Researcher",
    talentIQ: 825,
    skills: ["Python", "PyTorch", "Transformers", "Math", "RAG"],
    appliedOpportunity: "AI Systems Engineering Intern",
    appliedDate: "Sep 07, 2026",
    assessmentScore: 96,
    recruitmentStage: "Interviewing",
    status: "Verified Top Candidate",
  },
];

export const INITIAL_OPPORTUNITIES: OpportunityListing[] = [
  {
    id: "opp_1",
    role: "AI Systems Engineering Intern",
    type: "Internship",
    status: "Active",
    location: "San Francisco, CA (Hybrid)",
    salary: "$4,500 / month",
    postedDate: "Posted Sep 10, 2026",
    skills: ["Python", "PyTorch", "Next.js", "Vector DBs"],
    candidatesCount: 142,
    highMatchCount: 28,
    topMatchScore: "94%",
    iconType: "building",
  },
  {
    id: "opp_2",
    role: "Full Stack Platform Engineer (New Grad 2026)",
    type: "Full-Time Job",
    status: "Active",
    location: "Remote",
    salary: "$140,000 / year",
    postedDate: "Posted Sep 04, 2026",
    skills: ["TypeScript", "Next.js", "System Design", "PostgreSQL"],
    candidatesCount: 42,
    highMatchCount: 14,
    topMatchScore: "96%",
    iconType: "laptop",
  },
  {
    id: "opp_3",
    role: "LLM Safety & Alignment Research Fellow",
    type: "Internship",
    status: "Active",
    location: "Remote",
    salary: "$5,000 / month",
    postedDate: "Posted Aug 28, 2026",
    skills: ["Python", "PyTorch", "Transformers", "RLHF"],
    candidatesCount: 89,
    highMatchCount: 19,
    topMatchScore: "95%",
    iconType: "shield",
  },
  {
    id: "opp_4",
    role: "GPU Kernel Optimization Engineer",
    type: "Full-Time Job",
    status: "Paused",
    location: "San Francisco, CA",
    salary: "$165,000 / year",
    postedDate: "Posted Aug 15, 2026",
    skills: ["C++", "CUDA", "PyTorch Internal", "Triton"],
    candidatesCount: 18,
    highMatchCount: 5,
    topMatchScore: "92%",
    iconType: "chip",
  },
];

export const INITIAL_CHALLENGES: IndustryChallenge[] = [
  {
    id: "chal_1",
    title: "Distributed Vector Database Indexing Challenge",
    company: "Cognizant",
    companyLogoType: "cognizant",
    deadline: "Oct 15, 2026",
    skills: ["C++", "CUDA", "Vector Search", "HNSW"],
    description: "Build a scalable and efficient vector database indexing system to handle large-scale data and improve search performance.",
    rewardAmount: "$10,000",
    rewardType: "Grant",
    submissions: 98,
    maxSubmissions: 100,
    status: "Active",
    iconType: "code",
  },
  {
    id: "chal_2",
    title: "Real-Time Agentic Code Refactoring CLI Tool",
    company: "Microsoft",
    companyLogoType: "microsoft",
    deadline: "Oct 01, 2026",
    skills: ["TypeScript", "Node.js", "LLM APIs", "AST Parsing"],
    description: "Develop a CLI tool that uses agentic AI to analyze and refactor code in real-time, with smart suggestions and fixes.",
    rewardAmount: "$7,500",
    rewardType: "Prize Pool",
    submissions: 94,
    maxSubmissions: 100,
    status: "Active",
    iconType: "chip",
  },
  {
    id: "chal_3",
    title: "Zero-Knowledge Proof Verification for Skill Badges",
    company: "Google",
    companyLogoType: "google",
    deadline: "Sep 01, 2026",
    skills: ["Rust", "ZK-Snarks", "Smart Contracts"],
    description: "Design and implement a zero-knowledge proof system to verify digital skill badges securely and privately.",
    rewardAmount: "$5,000",
    rewardType: "Grant",
    submissions: 92,
    maxSubmissions: 100,
    status: "Judging",
    iconType: "cloud",
  },
];
