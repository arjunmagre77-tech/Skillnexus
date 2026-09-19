"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import PostOpportunityView from "@/components/dashboard/company/PostOpportunityView";
import PostOpportunityModal from "@/components/dashboard/company/PostOpportunityModal";
import { INITIAL_OPPORTUNITIES, OpportunityListing } from "@/components/dashboard/company/data";
import { CheckCircle2 } from "lucide-react";

export default function PostingsPage() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<OpportunityListing[]>(INITIAL_OPPORTUNITIES);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddOpportunity = (newOpp: OpportunityListing) => {
    setOpportunities((prev) => [newOpp, ...prev]);
    showToast(`Successfully published opportunity: ${newOpp.role}`);
  };

  const handleDeleteOpportunity = (id: string) => {
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
    showToast("Opportunity removed");
  };

  const handleNavigateTab = (tab: string, filter?: string) => {
    router.push(`/dashboard/company?tab=${tab}${filter ? `&filter=${encodeURIComponent(filter)}` : ""}`);
  };

  return (
    <div className="min-h-screen bg-[#040a14] text-slate-100 flex">
      <DashboardSidebar role="COMPANY" activeTab="post-opportunity" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 p-6 overflow-y-auto bg-[#040a14]">
          <div className="max-w-7xl mx-auto space-y-6">
            <PostOpportunityView
              opportunities={opportunities}
              onOpenPostModal={() => setIsPostModalOpen(true)}
              onNavigateTab={handleNavigateTab}
              onDeleteOpportunity={handleDeleteOpportunity}
            />
          </div>
        </main>
      </div>

      <PostOpportunityModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onAddOpportunity={handleAddOpportunity}
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
