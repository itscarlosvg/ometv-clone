import { SidebarClient } from "@/components/sidebar/sidebar-client";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarClient
        items={[
          { label: "Inicio", href: "/dashboard", icon: "home" },
          { label: "Calendario", href: "/dashboard/calendar", icon: "calendar" },
          { label: "Ajustes", href: "/dashboard/settings", icon: "settings" },
        ]}
      />

      <div className="flex-1">
        <main className="p-2">{children}</main>
      </div>
    </div>
  );
}