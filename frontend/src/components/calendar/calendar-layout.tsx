import { CalendarSidebar } from "./calendar-sidebar";
import { CalendarEvents } from "./calendar-events";

export function CalendarLayout() {
  return (
    <div className="grid grid-cols-[280px_1fr] gap-8">
      <CalendarSidebar />
      <CalendarEvents />
    </div>
  );
}