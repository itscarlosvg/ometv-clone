"use client";

import { useEffect, useState } from "react";
import { Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarEvent } from "@/types/calendar-event";

export function NextMeetingCard() {
  const [nextEvent, setNextEvent] = useState<CalendarEvent | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/events");
        const data: CalendarEvent[] = await res.json();

        const today = new Date();

        // Filtrar eventos del día actual que aún no empezaron
        const eventsToday = data
          .filter(
            (e) =>
              new Date(e.startTime).toDateString() === today.toDateString() &&
              new Date(e.startTime) > today,
          )
          .sort(
            (a, b) =>
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
          );

        if (eventsToday.length > 0) {
          const next = eventsToday[0];

          setNextEvent(next); // aquí usamos el objeto original (strings)

          // calcular tiempo restante usando Date temporal
          const diffMs = new Date(next.startTime).getTime() - today.getTime();
          const hours = Math.floor(diffMs / (1000 * 60 * 60));
          const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

          setTimeLeft(`${hours > 0 ? hours + "h " : ""}${minutes} min`);
        } else {
          setNextEvent(null);
          setTimeLeft("");
        }
      } catch (err) {
        console.error(err);
        setNextEvent(null);
        setTimeLeft("");
      }
    };

    fetchEvents();
  }, []);

  if (!nextEvent) {
    return (
      <div className="rounded-xl border border-slate-200 p-6 shadow-sm bg-slate-50 text-slate-500">
        No hay próximos eventos hoy
      </div>
    );
  }

  const start = new Date(nextEvent.startTime);
  const end = new Date(nextEvent.endTime);

  const startHour = start.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endHour = end.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="relative rounded-xl border border-slate-200 p-6 shadow-sm
      bg-gradient-to-r from-emerald-100 via-slate-100 to-violet-100"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-md bg-emerald-200 px-2 py-1 text-xs font-medium text-emerald-900">
            En {timeLeft}
          </span>

          <h3 className="text-lg font-semibold text-slate-900">
            {nextEvent.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {startHour} - {endHour}
            </div>

            <div className="flex items-center gap-1">
              <User size={14} />
              {nextEvent.guestEmail}
            </div>
          </div>

          {nextEvent.notes && (
            <p className="text-sm text-slate-500">{nextEvent.notes}</p>
          )}
        </div>

        <Button intent="primary" rightIcon={ArrowRight}>
          Entrar
        </Button>
      </div>
    </div>
  );
}
