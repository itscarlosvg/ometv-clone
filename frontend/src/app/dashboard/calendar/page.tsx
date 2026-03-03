// calendar-page.tsx
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { CalendarLayout } from "@/components/calendar/calendar-layout";

export default function CalendarPage() {
  return (
    <>
      <CalendarHeader />
      <div className="max-w-6xl mx-auto py-8 px-6">
        <CalendarLayout />
      </div>
    </>
  );
}