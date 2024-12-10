"use client"

import { useForm } from "react-hook-form"
// 在最新版本的 react-dom 中，使用 useFormStatus 來管理表單狀態。
import { useFormStatus } from 'react-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
// Import sign in validation schema
import { userSignInValidation } from "@/lib/validations/auth"
import Link from "next/link"

import { Button } from "@/components/ui/button"
// Import shadcn Form related UI components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthButton } from "./SubmitButtons"
import { GoogleSignin } from "@/app/utils/authActions"
import { GithubSignin } from "@/app/utils/authActions"

interface SignInFormProps {
    callbackUrl: string
}

const SignInForm = ({
    callbackUrl
}: SignInFormProps) => {
    const { pending } = useFormStatus()
// 使用z.infer<typeof ZodSchema>來傳回Typescript的type, 做為useForm的Form型別
    const form = useForm<z.infer<typeof userSignInValidation>>({
        resolver: zodResolver(userSignInValidation),
        defaultValues: {
        email: "",
        password: ""
        }
    })

    async function onSubmit(values: z.infer<typeof userSignInValidation>) {
        console.log(values)
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input placeholder="mail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input
                        type="password"
                        placeholder="your password"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>
            <Button
            className="w-full mt-6"
            type="submit"
            disabled={pending}
            >
            {pending ? "Submitting..." : "Sign In"}
            </Button>
        </form>
        {/* 這是畫出 ------------ or ---------------- */}
        <div className="flex items-center justify-center my-4">
            <div className="border-b border-gray-400 w-full"></div>
            <span className="px-2 text-gray-400">or</span>
            <div className="border-b border-gray-400 w-full"></div>
        </div>
        <form action={GoogleSignin} className="w-full pb-3">
            <AuthButton provider="Google" />
        </form>
        <form action={GithubSignin} className="w-full">
            <AuthButton provider="GitHub" />
        </form>
        <p className="text-center text-sm text-gray-600 mt-2">
            Don&apos;t have an account?&nbsp;
            <Link className="text-blue-600 hover:underline" href="/signup">
            Sign Up
            </Link>
        </p>
        </Form>
    )
}

export default SignInForm
