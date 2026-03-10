"use client";

import { useState, useEffect } from "react";
import { CalendarSidebar } from "./calendar-sidebar";
import { CalendarEvents } from "./calendar-events";
import { CalendarEvent } from "@/types/calendar-event";

export function CalendarLayout() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week">("day");

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("http://localhost:8080/api/events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : (data.events ?? []));
    };

    fetchEvents();
  }, []);

  return (
    <div className="grid grid-cols-[280px_1fr] gap-8">
      <CalendarSidebar
        events={events}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <CalendarEvents
        events={events}
        selectedDate={selectedDate}
        viewMode={viewMode}
      />
    </div>
  );
}
