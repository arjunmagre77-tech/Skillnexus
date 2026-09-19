"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import RecruiterHubView from "@/components/dashboard/company/RecruiterHubView";
import TalentDiscoveryView from "@/components/dashboard/company/TalentDiscoveryView";
import PostOpportunityView from "@/components/dashboard/company/PostOpportunityView";
import ApplicantsPipelineView from "@/components/dashboard/company/ApplicantsPipelineView";
import IndustryProjectsView from "@/components/dashboard/company/IndustryProjectsView";
import CandidateBreakdownModal from "@/components/dashboard/company/CandidateBreakdownModal";
import PostOpportunityModal from "@/components/dashboard/company/PostOpportunityModal";
import SponsorChallengeModal from "@/components/dashboard/company/SponsorChallengeModal";
import { 
  INITIAL_CANDIDATES, 
  INITIAL_OPPORTUNITIES, 
  INITIAL_CHALLENGES, 
  Candidate, 
  OpportunityListing, 
  IndustryChallenge 
} from "@/components/dashboard/company/data";
import { CheckCircle2 } from "lucide-react";

function CompanyDashboardContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const filterParam = searchParams.get("filter") || "ALL";

  const [activeTab, setActiveTab] = useState<string>("recruiter-hub");
  const [pipelineRoleFilter, setPipelineRoleFilter] = useState<string>("ALL");

  // Main state
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [opportunities, setOpportunities] = useState<OpportunityListing[]>(INITIAL_OPPORTUNITIES);
  const [challenges, setChallenges] = useState<IndustryChallenge[]>(INITIAL_CHALLENGES);

  // Modals & toast
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
    if (filterParam && filterParam !== "ALL") {
      setPipelineRoleFilter(filterParam);
    }
  }, [tabParam, filterParam]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleNavigateTab = (tab: string, filter?: string) => {
    setActiveTab(tab);
    if (filter) {
      setPipelineRoleFilter(filter);
    } else {
      setPipelineRoleFilter("ALL");
    }
    window.history.pushState(null, "", `/dashboard/company?tab=${tab}${filter ? `&filter=${encodeURIComponent(filter)}` : ""}`);
  };

  const handleUpdateCandidateStage = (candidateId: string, newStage: Candidate["recruitmentStage"]) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, recruitmentStage: newStage } : c))
    );
    showToast(`Updated candidate recruitment stage to "${newStage}"`);
  };

  const handleAddOpportunity = (newOpp: OpportunityListing) => {
    setOpportunities((prev) => [newOpp, ...prev]);
    showToast(`Successfully published opportunity: ${newOpp.role}`);
  };

  const handleDeleteOpportunity = (id: string) => {
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
    showToast("Opportunity removed");
  };

  const handleAddChallenge = (newChal: IndustryChallenge) => {
    setChallenges((prev) => [newChal, ...prev]);
    showToast(`Successfully sponsored challenge: ${newChal.title}`);
  };

  const handleInviteCandidate = (name: string) => {
    showToast(`Invitation sent to ${name} for interview screening!`);
  };

  return (
    <div className="min-h-screen bg-[#040a14] text-slate-100 flex">
      {/* Sidebar with exact 5 links and activeTab state */}
      <DashboardSidebar
        role="COMPANY"
        activeTab={activeTab}
        onSelectTab={(tabId) => handleNavigateTab(tabId)}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <DashboardHeader />

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#040a14]">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === "recruiter-hub" && (
              <RecruiterHubView
                candidates={candidates}
                opportunities={opportunities}
                onNavigateTab={handleNavigateTab}
                onOpenPostModal={() => setIsPostModalOpen(true)}
                onSelectCandidate={(c) => setSelectedCandidate(c)}
              />
            )}

            {activeTab === "talent-discovery" && (
              <TalentDiscoveryView
                candidates={candidates}
                onSelectCandidate={(c) => setSelectedCandidate(c)}
                onInvite={handleInviteCandidate}
              />
            )}

            {activeTab === "post-opportunity" && (
              <PostOpportunityView
                opportunities={opportunities}
                onOpenPostModal={() => setIsPostModalOpen(true)}
                onNavigateTab={handleNavigateTab}
                onDeleteOpportunity={handleDeleteOpportunity}
              />
            )}

            {activeTab === "applicants-pipeline" && (
              <ApplicantsPipelineView
                candidates={candidates}
                initialRoleFilter={pipelineRoleFilter}
                onSelectCandidate={(c) => setSelectedCandidate(c)}
                onUpdateStage={handleUpdateCandidateStage}
              />
            )}

            {activeTab === "industry-projects" && (
              <IndustryProjectsView
                challenges={challenges}
                onOpenSponsorModal={() => setIsSponsorModalOpen(true)}
              />
            )}
          </div>
        </main>
      </div>

      {/* Candidate Breakdown Modal */}
      <CandidateBreakdownModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onInvite={handleInviteCandidate}
      />

      {/* Post Opportunity Modal */}
      <PostOpportunityModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onAddOpportunity={handleAddOpportunity}
      />

      {/* Sponsor Challenge Modal */}
      <SponsorChallengeModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        onAddChallenge={handleAddChallenge}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#091526] border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-2xl shadow-cyan-950/50 animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function CompanyDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#040a14] text-white flex items-center justify-center">Loading SkillLink Recruiter Hub...</div>}>
      <CompanyDashboardContent />
    </Suspense>
  );
}
