import { EventCard } from "./event-card";

export function CalendarEvents() {
  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-slate-500">
          Miércoles, 15 de Enero
        </p>
        <p className="text-xs text-slate-400">
          4 eventos programados
        </p>
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((e) => (
          <EventCard key={e} />
        ))}
      </div>
    </div>
  );
}