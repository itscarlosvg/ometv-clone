import { PageTopbar } from "@/components/layout/page-topbar";
import { HomeLayout } from "@/components/home/home-layout";

export default function AppHome() {
    return (
    <div className="h-full flex flex-col bg-slate-50">
      <PageTopbar
        title="Inicio"
        subtitle="Gestiona tus reuniones y videollamadas"
      />

      <HomeLayout />
    </div>
  );
}