import { auth } from "@/auth";
import Products from "./productsAction/page";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/signin");
  }

  return (
    <Products />
  )
}
