// calendar-header.tsx
"use client";

import { Plus, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { PageTopbar } from "@/components/layout/page-topbar";
import { useRouter } from "next/navigation";

export function CalendarHeader() {

  const router = useRouter();

  const handleNewMeeting = () => {
    console.log("Nueva reunión");
    router.push("/dashboard/calendar/new")
  };

  const handleSchedule = () => {
    console.log("Programar");
    // Aquí iría la lógica para programar
  };

  return (
    <PageTopbar
      leftContent={
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Calendario
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gestiona tus reuniones y videollamadas
          </p>
        </div>
      }
      rightContent={
        <div className="flex gap-3">
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            leftIcon={Plus}
            onClick={handleNewMeeting}
          >
            Nueva reunión
          </Button>

          
        </div>
      }
    />
  );
}