import SignInForm from "@/components/ui/form/signin-form"
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Image from "next/image";
import logo from "@/public/img/logo.png";

const SignInPage = async () => {
    const session = await auth();
    if (session?.user) {
        return redirect("/");
    }
    return (
        <div className="w-full flex flex-col items-center">
            <Image src={logo} alt="menu" width={150} height={150}/>
            <h1 className="text-2xl font-bold">Sign In to Your Account</h1>
            <SignInForm />
        </div>
    )
}

export default SignInPage
