import { Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NextMeetingCard() {
  return (
    <div className="relative rounded-xl border border-slate-200 p-6 shadow-sm
    bg-gradient-to-r from-emerald-100 via-slate-100 to-violet-100">

      <div className="flex items-start justify-between">

        <div className="space-y-3">

          <span className="inline-flex items-center rounded-md bg-emerald-200 px-2 py-1 text-xs font-medium text-emerald-900">
            En 15 minutos
          </span>

          <h3 className="text-lg font-semibold text-slate-900">
            Reunión de proyecto Q1
          </h3>

          <div className="flex items-center gap-4 text-sm text-slate-600">

            <div className="flex items-center gap-1">
              <Clock size={14} />
              14:30 - 15:30
            </div>

            <div className="flex items-center gap-1">
              <User size={14} />
              Ana García
            </div>

          </div>

          <p className="text-sm text-slate-500">
            Revisión de objetivos y métricas del primer trimestre
          </p>

        </div>

        <Button intent="primary" rightIcon={ArrowRight}>
          Entrar
        </Button>

      </div>
    </div>
  );
}