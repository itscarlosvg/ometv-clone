import { Sidebar } from "@/components/sidebar/sidebar";
import { AppShell } from "@/components/layout";

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

      <AppShell>{children}</AppShell>
    </div>
  );
}
