import { MiniCalendar } from "./mini-calendar";
import { CalendarEvent } from "@/types/calendar-event";
import { Button } from "@/components/ui/button/button";

type Props = {
  events: CalendarEvent[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

export function CalendarSidebar({
  events,
  selectedDate,
  setSelectedDate,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <MiniCalendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          events={events}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <p className="text-sm font-medium text-slate-700 mb-3">Vista</p>

        <div className="space-y-2">
          <Button
            intent="primary"
            size="md"
            fullWidth
            className="font-bold"
            onClick={() => setSelectedDate(new Date())}
          >
            Hoy
          </Button>

          <Button
            intent="warning"
            size="md"
            fullWidth
            className="font-bold"
            onClick={() => console.log("Semana seleccionada")}
          >
            Semana
          </Button>
        </div>
      </div>
    </div>
  );
}