"use client";


import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarEvent } from "@/types/calendar-event";

export function TodayMeetingCard({ event }: { event: CalendarEvent }) {
  const router = useRouter();
  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  const totalMinutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const duration =
    hours > 0
      ? `${hours}h${minutes > 0 ? " " + minutes + " min" : ""}`
      : `${minutes} min`;

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center rounded-md border border-slate-200 bg-emerald-100 px-3 py-2 text-xs text-slate-700">
          <span className="font-semibold">{`${start.getHours().toString().padStart(2, "0")}:${start
            .getMinutes()
            .toString()
            .padStart(2, "0")}`}</span>
          <span>{duration}</span>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">{event.title}</p>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <User size={12} />
            {event.guestEmail}
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