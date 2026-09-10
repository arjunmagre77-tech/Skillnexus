"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { 
  BookOpen, Sparkles, CheckCircle2, Play, Clock, 
  Award, ArrowRight, ChevronRight, Check, Code, FileCode
} from "lucide-react";

export default function LearningRoadmapPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [activeStep, setActiveStep] = useState<number>(2);

  const roadmapData = [
    {
      step: 1,
      title: "Foundations of LLMs & Embedding Vectors",
      category: "AI Core",
      duration: "2 Hours",
      xp: "+150 XP",
      desc: "Learn how vector embeddings work using OpenAI & HuggingFace models. Understand cosine similarity and dense representations.",
      modules: [
        "What are Dense Vectors & High-Dimensional Space",
        "Generating Embeddings with Python & OpenAI API",
        "Hands-On: Build a Simple Vector Search Script"
      ],
      completed: true,
    },
    {
      step: 2,
      title: "Production Vector Databases (Qdrant & Pinecone)",
      category: "AI Infrastructure",
      duration: "4 Hours",
      xp: "+300 XP",
      desc: "Deploy Qdrant in Docker, index 100,000 document chunks, build HNSW indexes, and benchmark retrieval latency.",
      modules: [
        "Setting up Qdrant Cloud & Local Docker Container",
        "Building a RAG Document Ingestion Pipeline",
        "Hybrid Search: Combining BM25 with Vector Similarity",
        "Challenge: Build a 500ms Semantic Search API"
      ],
      completed: false,
    },
    {
      step: 3,
      title: "Advanced RAG & Query Optimization",
      category: "AI Architecture",
      duration: "5 Hours",
      xp: "+350 XP",
      desc: "Master parent-child chunking, hypothetical document embeddings (HyDE), and re-ranking using Cohere.",
      modules: [
        "Chunking Strategies for Complex PDFs",
        "Re-ranking with Cross-Encoders",
        "Multi-Query Expansion & Context Trimming"
      ],
      completed: false,
    },
    {
      step: 4,
      title: "Microservices Architecture & System Design",
      category: "Backend Systems",
      duration: "6 Hours",
      xp: "+400 XP",
      desc: "Design scalable fault-tolerant backend architectures for 10M active users using Redis, Kafka, and gRPC.",
      modules: [
        "Distributed Caching with Redis Cluster",
        "Event-Driven Microservices with Apache Kafka",
        "Rate Limiting & API Gateway Design"
      ],
      completed: false,
    }
  ];

  const toggleStep = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <DashboardSidebar role="STUDENT" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Personalized AI Learning Roadmap" 
          subtitle="Adaptive curriculum generated dynamically based on your target role gaps."
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Top Target Summary */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  Target Role: AI Systems Engineer
                </span>
                <span className="text-xs text-slate-400">Est. completion: 12 days</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                6-Phase Customized Gap Bridge Path
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl">
                This roadmap adapts automatically as you complete interactive coding challenges and pass verified skill tests.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
              <div>
                <div className="text-xs text-slate-400">Total Progress</div>
                <div className="text-2xl font-black text-white">
                  {Math.round((completedSteps.length / roadmapData.length) * 100)}%
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-slate-950 border-4 border-cyan-500 flex items-center justify-center font-bold text-cyan-400 text-sm">
                {completedSteps.length}/{roadmapData.length}
              </div>
            </div>
          </div>

          {/* Interactive Steps List */}
          <div className="space-y-6">
            {roadmapData.map((item) => {
              const isDone = completedSteps.includes(item.step);
              const isActive = activeStep === item.step;

              return (
                <div 
                  key={item.step} 
                  className={`p-6 rounded-3xl border transition-all duration-300 bg-slate-900/90 backdrop-blur-xl ${
                    isDone 
                      ? "border-emerald-500/40 bg-slate-900/50" 
                      : isActive 
                      ? "border-cyan-500 shadow-xl shadow-cyan-500/10" 
                      : "border-slate-800"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleStep(item.step)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition ${
                          isDone 
                            ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20" 
                            : "bg-slate-800 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-400"
                        }`}
                      >
                        {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : item.step}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{item.title}</h3>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> {item.duration}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {item.xp}
                      </span>
                    </div>
                  </div>

                  {/* Sub Modules List */}
                  <div className="pt-4 space-y-3">
                    <div className="text-xs font-semibold text-slate-400">Included Skill Modules:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.modules.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-xl bg-slate-950/70 border border-slate-800/80">
                          <Code className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 flex justify-end gap-3 border-t border-slate-800/60">
                    {isDone ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 py-1">
                        <CheckCircle2 className="w-4 h-4" /> Completed & XP Claimed
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          toggleStep(item.step);
                          alert(`Completed ${item.title}! +${item.xp} added to your profile.`);
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:opacity-90 transition flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                      >
                        <Play className="w-3 h-3 fill-slate-950" />
                        <span>Start Module & Launch Lab</span>
                      </button>
                    )}
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
