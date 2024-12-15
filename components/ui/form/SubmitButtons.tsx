"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import GoogleLogo from "@/public/img/google.svg";
import GithubLogo from "@/public/img/github.svg";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function AuthButton({ provider }: { provider: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image
            src={provider === "Google" ? GoogleLogo : GithubLogo}
            alt={`${provider}Logo`}
            className="size-4 mr-4"
          />
          Sign in with {provider}
        </Button>
      )}
    </>
  );
}
