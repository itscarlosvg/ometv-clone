import { EventCard } from "./event-card";

const events = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
];

export function CalendarEvents() {
  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-slate-500">Miércoles, 15 de Enero</p>
        <p className="text-xs text-slate-400">4 eventos programados</p>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <EventCard key={event.id} id={event.id} />
        ))}
      </div>
    </div>
  );
}
