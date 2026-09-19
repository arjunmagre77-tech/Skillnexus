import { redirect } from "next/navigation";

export default function ProjectsPage() {
  redirect("/dashboard/company?tab=industry-projects");
}
