"use client";

import { useState, useEffect } from "react";
import { CalendarSidebar } from "./calendar-sidebar";
import { CalendarEvents } from "./calendar-events";
import { CalendarEvent } from "@/types/calendar-event";
import { getCurrentUser } from "@/lib/api";

export function CalendarLayout() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week">("day");

  useEffect(() => {
    const fetchEvents = async () => {
      const user = await getCurrentUser();
      if (!user) return;

      try {
        const res = await fetch("http://localhost:8080/api/events/mine", {
          headers: {
            "X-User-Email": user.email,
          },
        });
        const data: CalendarEvent[] = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]);
      }
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