import { auth } from "@/auth";
import HomePage from "@/components/ui/form/homepage";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/signin");
  }

  return (
    <HomePage />
  )
}
