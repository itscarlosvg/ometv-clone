"use client";

import { useEffect, useState } from "react";
import { TodayMeetingCard } from "./today-meeting-card";
import { CalendarEvent } from "@/types/calendar-event";

export function TodayMeetings() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/events");
        const data: CalendarEvent[] = await res.json();

        const today = new Date();
        const eventsToday = data
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
      }
    };

    fetchEvents();
  }, []);

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