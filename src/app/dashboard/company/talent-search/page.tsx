import { redirect } from "next/navigation";

export default function TalentSearchPage() {
  redirect("/dashboard/company?tab=talent-discovery");
}
