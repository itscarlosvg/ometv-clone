import { NextMeetingCard } from "./next-meeting-card";
import { TodayMeetings } from "./today-meetings";

export function HomeLayout() {
  return (
    <div className="flex-1 px-6 py-8">
      <div className="max-w-4xl space-y-8">

        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-3">
            Próxima reunión
          </h2>

          <NextMeetingCard />
        </div>

        <TodayMeetings />

      </div>
    </div>
  );
}