import { auth } from "@/auth";
// import HomePage from "@/components/ui/form/homepage";
import { redirect } from "next/navigation";
import FavoriteList from "../components/FavoriteList";
import { getCurrentUser } from "../utils/actions";

export default async function FavoritesPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/signin");
  }

  const user = await getCurrentUser();

  return <FavoriteList user={user} />;
}
