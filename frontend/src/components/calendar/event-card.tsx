"use client";

import { useRouter } from "next/navigation";
import { CalendarEvent } from "@/types/calendar-event";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button/button";

type Props = {
  event: CalendarEvent;
};

export function EventCard({ event }: Props) {
  const router = useRouter();

  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  const startHour = start.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endHour = end.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-medium px-3 py-2 rounded-md text-center leading-tight">
          {startHour}
          <br />
          {duration}h
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">{event.title}</p>

          <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
            <User className="w-3 h-3" /> {/* Icono pequeño */}
            <span>{event.guestEmail}</span>
          </div>
        </div>
      </div>

      <Button
        intent="warning"
        size="sm"
        onClick={() => router.push(`/dashboard/calendar/${event.id}`)}
      >
        Ver detalles
      </Button>
    </div>
  );
}
