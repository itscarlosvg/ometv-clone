import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TodayMeetingCard() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="flex flex-col items-center justify-center rounded-md border border-slate-200 bg-emerald-100 px-3 py-2 text-xs text-slate-700">
          <span className="font-semibold">16:00</span>
          <span>1h</span>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">
            Sesión de feedback
          </p>

          <div className="flex items-center gap-1 text-xs text-slate-500">
            <User size={12} />
            Miguel López
          </div>
        </div>

      </div>

      <Button intent="warning">
        Ver detalles
      </Button>

    </div>
  );
}