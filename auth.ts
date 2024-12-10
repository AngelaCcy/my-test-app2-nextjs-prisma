import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
})
