"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function GoogleSignin(formData: FormData) {
    await signIn("google", { redirectTo: "/" });
}

export async function GithubSignin(formData: FormData) {
    await signIn("github", { redirectTo: "/" });
}

export async function SignOut() {
    await signOut({ redirectTo: "/" });
}