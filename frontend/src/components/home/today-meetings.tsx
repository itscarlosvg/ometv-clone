import { TodayMeetingCard } from "./today-meeting-card";

export function TodayMeetings() {

  const meetings = [1,2,3];

  return (
    <div className="space-y-4">

      <h2 className="text-sm font-semibold text-slate-700">
        Reuniones de hoy
      </h2>

      <div className="space-y-4">
        {meetings.map((m) => (
          <TodayMeetingCard key={m} />
        ))}
      </div>

    </div>
  );
}