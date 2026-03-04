"use client";

import { Calendar, Clock, Copy, Video, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";

type Props = {
  id: string;
};

export function EventDetailCard({ id }: Props) {
  const meetingLink = "https://videomeet.app/room/abc-def-ghi";

  const copyLink = async () => {
    await navigator.clipboard.writeText(meetingLink);
  };

  return (
    <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Reunión de proyecto Q1
        </h2>

        <div className="flex items-center gap-6 mt-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            Lunes, 15 Enero 2025
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} />
            10:00 - 11:00
          </div>
        </div>
      </div>

      <hr className="border-slate-200" />

      <div>
        <p className="text-sm font-medium text-slate-700 mb-3">Invitado</p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200" />
          <div>
            <p className="text-sm font-medium text-slate-900">
              Carlos Martínez
            </p>
            <p className="text-xs text-slate-500">carlos@email.com</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-emerald-100 border border-emerald-200 p-5 space-y-3">
        <p className="text-sm font-medium text-slate-800">Enlace de la sala</p>

        <div className="flex gap-3">
          <input
            value={meetingLink}
            readOnly
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm bg-white"
          />

          <Button intent="primary" onClick={copyLink} leftIcon={Copy}>
            Copiar
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Notas</p>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          Revisión del progreso del primer trimestre. Puntos a tratar: objetivos
          alcanzados, presupuesto utilizado, próximos pasos y ajustes necesarios
          para Q2.
        </div>
      </div>

      <hr className="border-slate-200" />

      <div className="flex gap-3">
        <Button intent="primary" leftIcon={Video}>
          Entrar
        </Button>

        <Button intent="warning" leftIcon={Pencil}>
          Editar
        </Button>

        <Button
          className="border border-red-300 text-red-600 hover:bg-red-50"
          leftIcon={Trash2}
        >
          Borrar
        </Button>
      </div>
    </div>
  );
}
