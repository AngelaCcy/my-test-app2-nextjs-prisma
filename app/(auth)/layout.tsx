interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({
    children
}: AuthLayoutProps) {
    return (
        <section className="border border-gray-200 p-8 rounded-md w-2/5 mt-24">
            {children}
        </section>
    )
}
