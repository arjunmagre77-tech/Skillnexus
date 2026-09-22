"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  BookOpen, Sparkles, CheckCircle2, Play, Clock, 
  Award, ArrowRight, ChevronRight, Check, Code, FileCode, Target, Layers
} from "lucide-react";

type LearningPathId = "ai_ml" | "data_science" | "gen_ai" | "full_stack" | "computer_vision" | "devops";

interface PathDefinition {
  id: LearningPathId;
  title: string;
  category: string;
  icon: string;
  estDays: string;
  requiredSkills: string[];
  steps: {
    step: number;
    title: string;
    category: string;
    duration: string;
    coins: string;
    desc: string;
    modules: string[];
    completed: boolean;
  }[];
}

export default function LearningRoadmapPage() {
  const [activePathId, setActivePathId] = useState<LearningPathId>("ai_ml");
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({
    ai_ml: [1],
    data_science: [],
    gen_ai: [],
    full_stack: [1, 2],
    computer_vision: [],
    devops: [],
  });

  const learningPaths: PathDefinition[] = [
    {
      id: "ai_ml",
      title: "AI / ML Engineer",
      category: "Artificial Intelligence",
      icon: "🤖",
      estDays: "14 Days",
      requiredSkills: ["Python", "Math & Stats", "Data Analysis", "Machine Learning", "Deep Learning", "AI Projects"],
      steps: [
        {
          step: 1,
          title: "Python Foundations & Mathematical Optimization",
          category: "Foundations",
          duration: "3 Hours",
          coins: "+100 Coins",
          desc: "Master NumPy vectorization, linear algebra matrices, multivariable gradient descent, and pandas data cleaning.",
          modules: ["NumPy Array Vectorization", "Gradient Descent from Scratch", "Pandas Data Pipeline Optimization"],
          completed: true,
        },
        {
          step: 2,
          title: "Supervised & Unsupervised Machine Learning",
          category: "Core ML",
          duration: "5 Hours",
          coins: "+200 Coins",
          desc: "Train Scikit-Learn decision trees, random forests, SVMs, and K-Means clustering with cross-validation.",
          modules: ["Feature Engineering & Encoding", "Model Tuning with Optuna", "Cross-Validation & ROC-AUC Metrics"],
          completed: false,
        },
        {
          step: 3,
          title: "Deep Learning with PyTorch & Neural Networks",
          category: "Deep Learning",
          duration: "6 Hours",
          coins: "+300 Coins",
          desc: "Build multi-layer perceptrons, convolutional neural networks (CNNs), and attention mechanisms in PyTorch.",
          modules: ["PyTorch Autograd & Tensors", "CNN Architecture for Image Recognition", "Transfer Learning with ResNet"],
          completed: false,
        },
        {
          step: 4,
          title: "Production LLM Deployment & Vector DBs (Qdrant)",
          category: "AI Infrastructure",
          duration: "6 Hours",
          coins: "+400 Coins",
          desc: "Index 100k document chunks in Qdrant, build RAG semantic search pipelines, and deploy fast inferencing endpoints.",
          modules: ["Qdrant HNSW Vector Indexing", "RAG Pipeline with LangChain & LlamaIndex", "Quantization & ONNX Export"],
          completed: false,
        },
      ]
    },
    {
      id: "gen_ai",
      title: "Generative AI Engineer",
      category: "GenAI & LLMs",
      icon: "✨",
      estDays: "10 Days",
      requiredSkills: ["Python", "Transformer Architecture", "Prompt Engineering", "RAG Systems", "Fine-Tuning", "Agent Frameworks"],
      steps: [
        {
          step: 1,
          title: "Transformer Architectures & Self-Attention Mechanisms",
          category: "Core GenAI",
          duration: "4 Hours",
          coins: "+150 Coins",
          desc: "Understand positional encodings, multi-head self-attention, and tokenization algorithms.",
          modules: ["Attention Is All You Need Paper Breakdown", "Building Self-Attention in PyTorch", "BPE & SentencePiece Tokenizers"],
          completed: false,
        },
        {
          step: 2,
          title: "Advanced Retrieval-Augmented Generation (RAG)",
          category: "RAG Systems",
          duration: "5 Hours",
          coins: "+250 Coins",
          desc: "Implement HyDE (Hypothetical Document Embeddings), parent-child chunking, and Cohere re-ranking.",
          modules: ["Parent-Child PDF Chunking", "Cross-Encoder Re-Ranking", "Semantic Router & Fallbacks"],
          completed: false,
        },
        {
          step: 3,
          title: "Fine-Tuning Open Source Models (LoRA & QLoRA)",
          category: "Model Fine-Tuning",
          duration: "6 Hours",
          coins: "+350 Coins",
          desc: "Fine-tune Llama 3 / Mistral models on domain datasets using Unsloth and HuggingFace TRL.",
          modules: ["PEFT & LoRA Parameter Efficient Tuning", "Dataset Curation & Formatting", "Evaluating Perplexity & BLEU Scores"],
          completed: false,
        },
      ]
    },
    {
      id: "data_science",
      title: "Data Scientist",
      category: "Analytics & AI",
      icon: "📊",
      estDays: "12 Days",
      requiredSkills: ["Python", "Advanced SQL", "Statistics", "Exploratory Data Analysis", "ML Analytics", "A/B Testing"],
      steps: [
        {
          step: 1,
          title: "Advanced SQL & Data Warehouse Analytics",
          category: "Data Engineering",
          duration: "4 Hours",
          coins: "+120 Coins",
          desc: "Write complex window functions, CTEs, and query optimizations in PostgreSQL and Snowflake.",
          modules: ["Window Functions (RANK, DENSE_RANK, LEAD, LAG)", "Query Plan Optimization & Indexes", "Cohort Retention Analysis"],
          completed: false,
        },
        {
          step: 2,
          title: "Exploratory Data Analysis & Statistical Testing",
          category: "Statistics",
          duration: "5 Hours",
          coins: "+220 Coins",
          desc: "Conduct hypothesis testing, p-value calculations, ANOVA, and Matplotlib/Seaborn visualization.",
          modules: ["Hypothesis Testing (t-test, Chi-Square)", "A/B Testing Power Analysis", "Seaborn Visual Analytics"],
          completed: false,
        },
      ]
    },
    {
      id: "full_stack",
      title: "Full Stack Developer",
      category: "Web Engineering",
      icon: "⚡",
      estDays: "16 Days",
      requiredSkills: ["HTML/CSS", "JavaScript/TypeScript", "React/Next.js", "Node.js/Express", "PostgreSQL", "Docker"],
      steps: [
        {
          step: 1,
          title: "Modern Modern Web & React Fundamentals",
          category: "Frontend",
          duration: "4 Hours",
          coins: "+100 Coins",
          desc: "Master React Hooks, state management, component lifecycles, and Tailwind CSS styling.",
          modules: ["React 19 State & Effects", "Tailwind CSS Layout Mastery", "Form Handling & Validation"],
          completed: true,
        },
        {
          step: 2,
          title: "Next.js 15 App Router & Server Actions",
          category: "Full Stack Framework",
          duration: "5 Hours",
          coins: "+200 Coins",
          desc: "Build server-rendered web applications with Next.js App Router, Server Components, and NextAuth.js.",
          modules: ["Server Components & Hydration", "Server Actions & Mutations", "Authentication with NextAuth.js"],
          completed: true,
        },
      ]
    },
    {
      id: "computer_vision",
      title: "Computer Vision Specialist",
      category: "AI & Vision",
      icon: "👁️",
      estDays: "14 Days",
      requiredSkills: ["Python", "OpenCV", "Convolutional Neural Networks", "YOLOv8", "Segmentation", "Edge AI"],
      steps: [
        {
          step: 1,
          title: "Image Processing & OpenCV Foundations",
          category: "Vision Core",
          duration: "4 Hours",
          coins: "+150 Coins",
          desc: "Perform image filtering, edge detection, color spaces transformation, and feature matching.",
          modules: ["Canny Edge Detection & Contours", "Keypoint Extraction with ORB", "Real-Time Webcam Video Streams"],
          completed: false,
        },
      ]
    },
    {
      id: "devops",
      title: "Cloud & DevOps Engineer",
      category: "Infrastructure",
      icon: "☁️",
      estDays: "14 Days",
      requiredSkills: ["Linux", "Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
      steps: [
        {
          step: 1,
          title: "Docker Containerization & Multi-Stage Builds",
          category: "Containers",
          duration: "4 Hours",
          coins: "+150 Coins",
          desc: "Containerize web services, optimize image layers, and orchestrate with Docker Compose.",
          modules: ["Multi-Stage Dockerfiles", "Docker Compose Local Stack", "Container Networking & Volumes"],
          completed: false,
        },
      ]
    }
  ];

  const currentPath = learningPaths.find(p => p.id === activePathId) || learningPaths[0];
  const currentPathCompletedSteps = completedSteps[activePathId] || [];

  const toggleStep = (stepId: number) => {
    const list = completedSteps[activePathId] || [];
    const updated = list.includes(stepId) 
      ? list.filter(s => s !== stepId) 
      : [...list, stepId];
    
    setCompletedSteps({
      ...completedSteps,
      [activePathId]: updated
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Personalized AI Learning Paths & Roadmaps" 
          subtitle="Select a career learning path to view stage-by-stage node roadmaps, required skills, and resources."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Path Selector Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" /> Select Career Learning Path:
              </h2>
              <span className="text-xs text-slate-400">Connected with Skill Gap Analyzer</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {learningPaths.map((path) => {
                const isActive = activePathId === path.id;
                return (
                  <button
                    key={path.id}
                    onClick={() => setActivePathId(path.id)}
                    className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between space-y-2 cursor-pointer ${
                      isActive
                        ? "bg-blue-600/30 border-cyan-400 text-white shadow-lg shadow-cyan-500/10"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{path.icon}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs leading-snug">{path.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{path.estDays}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Top Target Summary */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  Target Path: {currentPath.title}
                </span>
                <span className="text-xs text-slate-400">Est. Duration: {currentPath.estDays}</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {currentPath.steps.length}-Stage Adaptive Learning Path
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl">
                This roadmap adapts automatically as you complete interactive coding challenges and pass verified skill tests.
              </p>

              {/* Skills required pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentPath.requiredSkills.map(sk => (
                  <span key={sk} className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
              <div>
                <div className="text-xs text-slate-400">Path Completion</div>
                <div className="text-2xl font-black text-white">
                  {Math.round((currentPathCompletedSteps.length / currentPath.steps.length) * 100)}%
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-slate-950 border-4 border-cyan-500 flex items-center justify-center font-bold text-cyan-400 text-sm">
                {currentPathCompletedSteps.length}/{currentPath.steps.length}
              </div>
            </div>
          </div>

          {/* Interactive Steps List */}
          <div className="space-y-6">
            {currentPath.steps.map((item) => {
              const isDone = currentPathCompletedSteps.includes(item.step);

              return (
                <div 
                  key={item.step} 
                  className={`p-6 rounded-2xl border transition-all duration-300 bg-slate-900/90 backdrop-blur-xl ${
                    isDone 
                      ? "border-emerald-500/40 bg-slate-900/50" 
                      : "border-slate-800 hover:border-cyan-500/50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleStep(item.step)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition cursor-pointer ${
                          isDone 
                            ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20" 
                            : "bg-slate-800 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-400"
                        }`}
                      >
                        {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : item.step}
                      </button>
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> {item.duration}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        🪙 {item.coins}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <p className="text-xs text-slate-300">{item.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.modules.map(mod => (
                        <div key={mod} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium">
                          <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-800/60">
                      <Link
                        href="/dashboard/student/skills"
                        className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1"
                      >
                        Take Skill Verification Test →
                      </Link>

                      {isDone ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Stage Completed & Skill Coins Claimed
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            toggleStep(item.step);
                            alert(`Completed ${item.title}! ${item.coins} added to your profile balance.`);
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-slate-950" />
                          <span>Start Stage Module</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
