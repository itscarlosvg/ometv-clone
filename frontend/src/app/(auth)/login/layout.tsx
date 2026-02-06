import { BgDetails } from "@/components/layout";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative min-h-screen overflow-hidden">
            <BgDetails />
            
            <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
                {children}
            </div>
        </main>
    );
}