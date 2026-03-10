"use client";

import { CalendarEvent } from "@/types/calendar-event";
import { EventCard } from "./event-card";
import { addDays, startOfWeek, endOfWeek, format } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
  events: CalendarEvent[];
  selectedDate: Date;
  viewMode: "day" | "week";
};

export function CalendarEvents({ events, selectedDate, viewMode }: Props) {
  let daysToShow: Date[] = [];

  if (viewMode === "day") {
    daysToShow = [selectedDate];
  } else {
    const startWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const endWeek = endOfWeek(selectedDate, { weekStartsOn: 1 });

    let current = startWeek;
    while (current <= endWeek) {
      daysToShow.push(current);
      current = addDays(current, 1);
    }
  }

  // Total de eventos para encabezado
  const totalEvents = daysToShow.reduce((acc, day) => {
    const count = events.filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getFullYear() === day.getFullYear() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getDate() === day.getDate()
      );
    }).length;
    return acc + count;
  }, 0);

  const headerText =
  viewMode === "day"
    ? selectedDate.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : `Semana ${format(daysToShow[0], "dd 'de' MMMM", { locale: es })} - ${format(
        daysToShow[daysToShow.length - 1],
        "dd 'de' MMMM",
        { locale: es }
      )}`;

  return (
    <div>
      {/* Encabezado */}
      <div className="mb-4">
        <p className="text-sm font-bold text-slate-700 capitalize">{headerText}</p>
        <p className="text-xs text-slate-400">{totalEvents} eventos programados</p>
      </div>

      {/* Eventos */}
      <div className={`space-y-6 max-h-[420px] overflow-y-auto pr-2 scrollbar-hide`}>
        {daysToShow.map((day) => {
          const dayEvents = events
            .filter((event) => {
              const eventDate = new Date(event.startTime);
              return (
                eventDate.getFullYear() === day.getFullYear() &&
                eventDate.getMonth() === day.getMonth() &&
                eventDate.getDate() === day.getDate()
              );
            })
            .sort(
              (a, b) =>
                new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
            );

          return (
            <div key={day.toISOString()}>
              {viewMode === "week" && (
                <p className="text-xs text-slate-700 font-medium mb-1 capitalize">
                  {day.toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
              )}

              {dayEvents.length === 0 && (
                <p className="text-xs text-slate-400 mb-2">
                  No hay reuniones programadas
                </p>
              )}

              <div className={`space-y-4 ${dayEvents.length > 5 ? "max-h-[600px] overflow-y-auto pr-2 scrollbar-hide" : ""}`}>
                {dayEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}