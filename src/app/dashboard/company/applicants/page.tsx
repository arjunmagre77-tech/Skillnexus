import { redirect } from "next/navigation";

export default function ApplicantsPage() {
  redirect("/dashboard/company?tab=applicants-pipeline");
}
