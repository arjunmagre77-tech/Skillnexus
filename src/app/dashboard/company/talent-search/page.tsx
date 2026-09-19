"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import TalentDiscoveryView from "@/components/dashboard/company/TalentDiscoveryView";
import CandidateBreakdownModal from "@/components/dashboard/company/CandidateBreakdownModal";
import { INITIAL_CANDIDATES, Candidate } from "@/components/dashboard/company/data";
import { CheckCircle2 } from "lucide-react";

export default function TalentSearchPage() {
  const [candidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#040a14] text-slate-100 flex">
      <DashboardSidebar role="COMPANY" activeTab="talent-discovery" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 p-6 overflow-y-auto bg-[#040a14]">
          <div className="max-w-7xl mx-auto space-y-6">
            <TalentDiscoveryView
              candidates={candidates}
              onSelectCandidate={(c) => setSelectedCandidate(c)}
              onInvite={(name) => showToast(`Invitation sent to ${name} for interview screening!`)}
            />
          </div>
        </main>
      </div>

      <CandidateBreakdownModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onInvite={(name) => showToast(`Invitation sent to ${name}!`)}
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
