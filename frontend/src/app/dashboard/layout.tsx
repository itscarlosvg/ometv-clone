import { PageTopbar } from "@/components/layout";
import { Sidebar } from "@/components/sidebar/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar
                items={[
                    { label: "Inicio", href: "/dashboard", icon: "home" },
                    { label: "Calendario", href: "/dashboard/calendar", icon: "calendar" },
                    { label: "Ajustes", href: "/dashboard/settings", icon: "settings" },
                ]}
                user={{
                    name: "Carlos Martínez",
                    email: "carlos@email.com",
                    avatarUrl: "/demo/avatar.jpg",
                }}
            />
            <div className="flex-1">
                <main className="p-2">{children}</main>
            </div>
        </div>
    );
}