"use client";

import { useEffect, useState } from "react";
import { Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarEvent } from "@/types/calendar-event";
import { getCurrentUser } from "@/lib/api";
import { fromUTCToLocal } from "@/lib/date-utils";
import { useRouter } from "next/navigation";

export function NextMeetingCard() {
  const [nextEvent, setNextEvent] = useState<CalendarEvent | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const user = await getCurrentUser();
      if (!user) return;
      setUserEmail(user.email);

      try {
        const res = await fetch("http://localhost:8080/api/events/mine", {
          headers: { "X-User-Email": user.email },
        });
        const data: CalendarEvent[] = await res.json();

        // Convertir todas las fechas UTC a locales
        const eventsWithLocalDates = data.map((event) => ({
          ...event,
          startTime: fromUTCToLocal(event.startTime).toISOString(),
          endTime: fromUTCToLocal(event.endTime).toISOString(),
        }));

        const now = new Date();

        // Filtramos eventos de hoy
        const eventsToday = eventsWithLocalDates
          .filter((e) => {
            const start = new Date(e.startTime);
            return (
              start.getFullYear() === now.getFullYear() &&
              start.getMonth() === now.getMonth() &&
              start.getDate() === now.getDate()
            );
          })
          .sort(
            (a, b) =>
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
          );

        // Buscar eventos en curso
        const ongoingEvents = eventsToday.filter((e) => {
          const start = new Date(e.startTime);
          const end = new Date(e.endTime);
          return start <= now && end >= now;
        });

        if (ongoingEvents.length > 0) {
          setNextEvent(ongoingEvents[0]);
          setTimeLeft("En curso");
        } else {
          const upcomingEvents = eventsToday.filter(
            (e) => new Date(e.startTime) > now,
          );

          if (upcomingEvents.length > 0) {
            const next = upcomingEvents[0];
            setNextEvent(next);

            const diffMs = new Date(next.startTime).getTime() - now.getTime();
            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const minutes = Math.floor(
              (diffMs % (1000 * 60 * 60)) / (1000 * 60),
            );

            setTimeLeft(`${hours > 0 ? hours + "h " : ""}${minutes} min`);
          } else {
            setNextEvent(null);
            setTimeLeft("");
          }
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

  const isOngoing = timeLeft === "En curso";

  return (
    <div
      className={`
      relative rounded-xl border p-6 shadow-sm
      ${
        isOngoing
          ? "border-blue-200 bg-gradient-to-r from-blue-100 via-sky-100 to-cyan-100 animate-soft-pulse"
          : "border-slate-200 bg-gradient-to-r from-emerald-100 via-slate-100 to-violet-100"
      }
    `}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <span
            className={`
            inline-flex items-center rounded-md px-2 py-1 text-xs font-medium
            ${
              isOngoing
                ? "bg-purple-200 text-purple-900"
                : "bg-emerald-200 text-emerald-900"
            }
          `}
          >
            {isOngoing ? "En curso" : `En ${timeLeft}`}
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

        <Button
          intent="primary"
          rightIcon={ArrowRight}
          onClick={() => router.push(`/dashboard/meeting/${nextEvent.id}`)}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
