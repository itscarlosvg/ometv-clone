"use client";

import { useEffect, useState } from "react";
import { TodayMeetingCard } from "./today-meeting-card";
import { CalendarEvent } from "@/types/calendar-event";
import { getCurrentUser } from "@/lib/api";
import { fromUTCToLocal } from "@/lib/date-utils"; // Importamos la función

export function TodayMeetings() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      const user = await getCurrentUser();
      if (!user) {
        console.error("No se pudo obtener el usuario");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/events/mine", {
          headers: {
            "X-User-Email": user.email,
          },
        });

        const data = await res.json();

        // Asegurarse de que siempre sea un array
        const eventsArray: CalendarEvent[] = Array.isArray(data) ? data : [];

        // Convertir todas las fechas UTC a locales
        const eventsWithLocalDates = eventsArray.map(event => ({
          ...event,
          startTime: fromUTCToLocal(event.startTime).toISOString(),
          endTime: fromUTCToLocal(event.endTime).toISOString(),
        }));

        const today = new Date();
        const eventsToday = eventsWithLocalDates
          .filter((e) => {
            const start = new Date(e.startTime);
            return (
              start.getFullYear() === today.getFullYear() &&
              start.getMonth() === today.getMonth() &&
              start.getDate() === today.getDate()
            );
          })
          .sort(
            (a, b) =>
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
          );

        setEvents(eventsToday);
      } catch (err) {
        console.error("Error al traer eventos:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 p-6 shadow-sm bg-slate-50 text-slate-500">
        Cargando reuniones...
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 p-6 shadow-sm bg-slate-50 text-slate-500">
        No hay reuniones hoy
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-slate-700">Reuniones de hoy</h2>
      <div className="space-y-4">
        {events.map((e) => (
          <TodayMeetingCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}