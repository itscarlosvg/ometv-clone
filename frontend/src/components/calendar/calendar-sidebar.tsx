import { MiniCalendar } from "./mini-calendar";

export function CalendarSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <MiniCalendar />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <p className="text-sm font-medium text-slate-700 mb-3">
          Vista
        </p>

        <div className="space-y-2">
          <button className="w-full bg-emerald-400 text-white py-2 rounded-md font-medium">
            Hoy
          </button>

          <button className="w-full bg-violet-200 text-violet-900 py-2 rounded-md font-medium">
            Semana
          </button>
        </div>
      </div>
    </div>
  );
}