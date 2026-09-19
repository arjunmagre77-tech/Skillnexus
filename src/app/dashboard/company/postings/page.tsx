import { redirect } from "next/navigation";

export default function PostingsPage() {
  redirect("/dashboard/company?tab=post-opportunity");
}
