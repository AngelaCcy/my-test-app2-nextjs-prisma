"use server";

import { signIn, signOut } from "@/auth";

export async function GoogleSignin() {
    await signIn("google", { redirectTo: "/" });
}

export async function GithubSignin() {
    await signIn("github", { redirectTo: "/" });
}

export async function SignOut() {
    await signOut({ redirectTo: "/" });
}

export async function MagicSignin(email: string) {
    await signIn("nodemailer", { email, redirectTo:"/" });
}