"use client";

import { CalendarEvent } from "@/types/calendar-event";
import { EventCard } from "./event-card";

type Props = {
  events: CalendarEvent[];
  selectedDate: Date;
};

export function CalendarEvents({ events, selectedDate }: Props) {
  const filteredEvents = events
    .filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    })
    .sort((a, b) => {
      // Ordenar por hora de inicio
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });

  const formattedDate = selectedDate.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-slate-900 capitalize">{formattedDate}</p>
        <p className="text-xs text-slate-400">
          {filteredEvents.length} eventos programados
        </p>
      </div>

      <div
        className={`space-y-4 ${
          filteredEvents.length > 5
            ? "max-h-[420px] overflow-y-auto scrollbar-hide pr-2"
            : ""
        }`}
      >
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}