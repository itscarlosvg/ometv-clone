"use client";

import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarEvent } from "@/types/calendar-event";

export function TodayMeetingCard({ event }: { event: CalendarEvent }) {
  const router = useRouter();

  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  const startHour = start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

  const diffMs = end.getTime() - start.getTime();
  const totalMinutes = Math.round(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const durationFormatted =
    hours > 0 ? (minutes > 0 ? `${hours}h ${minutes} min` : `${hours}h`) : `${minutes} min`;

  const now = new Date();
  const isOngoing = start <= now && end >= now;

  return (
    <div className={`flex items-center justify-between rounded-xl border px-5 py-4 shadow-sm
      ${isOngoing ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"}
    `}>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center rounded-md border border-slate-200 bg-emerald-100 px-3 py-2 text-xs text-slate-700">
          <span className="font-semibold">{startHour}</span>
          <span>{durationFormatted}</span>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">{event.title}</p>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <User size={12} /> {event.guestEmail}
          </div>
        </div>
      </div>

      <Button intent="warning" size="sm" onClick={() => router.push(`/dashboard/calendar/${event.id}`)}>
        Ver detalles
      </Button>
    </div>
  );
}