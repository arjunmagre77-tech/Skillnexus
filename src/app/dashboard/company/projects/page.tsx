"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import IndustryProjectsView from "@/components/dashboard/company/IndustryProjectsView";
import SponsorChallengeModal from "@/components/dashboard/company/SponsorChallengeModal";
import { INITIAL_CHALLENGES, IndustryChallenge } from "@/components/dashboard/company/data";
import { CheckCircle2 } from "lucide-react";

export default function ProjectsPage() {
  const [challenges, setChallenges] = useState<IndustryChallenge[]>(INITIAL_CHALLENGES);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddChallenge = (newChal: IndustryChallenge) => {
    setChallenges((prev) => [newChal, ...prev]);
    showToast(`Successfully sponsored challenge: ${newChal.title}`);
  };

  return (
    <div className="min-h-screen bg-[#040a14] text-slate-100 flex">
      <DashboardSidebar role="COMPANY" activeTab="industry-projects" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 p-6 overflow-y-auto bg-[#040a14]">
          <div className="max-w-7xl mx-auto space-y-6">
            <IndustryProjectsView
              challenges={challenges}
              onOpenSponsorModal={() => setIsSponsorModalOpen(true)}
            />
          </div>
        </main>
      </div>

      <SponsorChallengeModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        onAddChallenge={handleAddChallenge}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#091526] border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-2xl animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
