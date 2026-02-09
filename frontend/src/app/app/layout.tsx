import { PageTopbar } from "@/components/layout";
import { Sidebar } from "@/components/sidebar/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar
                items={[
                    { label: "Inicio", href: "/app", icon: "home" },
                    { label: "Calendario", href: "/app/calendar", icon: "calendar" },
                    { label: "Ajustes", href: "/app/settings", icon: "settings" },
                ]}
                user={{
                    name: "Carlos Martínez",
                    email: "carlos@email.com",
                    avatarUrl: "/demo/avatar.jpg",
                }}
            />
            <div className="flex-1">
                <PageTopbar />
                <main className="p-2">{children}</main>
            </div>
        </div>
    );
}