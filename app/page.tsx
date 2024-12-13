import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HomePage from "@/components/ui/form/homePage";

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/signin");
  }

  return (
    <HomePage />
  )
}
