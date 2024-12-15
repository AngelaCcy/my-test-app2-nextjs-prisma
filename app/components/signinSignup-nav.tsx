"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const LoginSignupNav = () => {
  // const pathName = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "absolute top-full left-0 w-full border bg-gray-100 dark:bg-gray-900",
        "border-none static flex space-x-6",
      )}
    >
      <Button
        className="bg-red-400 hover:bg-red-300"
        onClick={() => router.push("/signin")}
      >
        SignIn
      </Button>
    </div>
  );
};

export default LoginSignupNav;
