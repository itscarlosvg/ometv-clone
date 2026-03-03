"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";

export function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="w-full max-w-xl bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
      {/* Título */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Título <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="Placeholder"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Fecha y hora de inicio <span className="text-red-500">*</span>
          </label>
          <Input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Fecha y hora de fin <span className="text-red-500">*</span>
          </label>
          <Input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
      </div>

      {/* Invitado */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Invitado (email) <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          placeholder="Placeholder"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Notas */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Notas (opcional)
        </label>
        <textarea
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
          rows={4}
          placeholder="Placeholder"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Auto link info */}
      <div className="rounded-md bg-slate-50 border border-slate-200 p-4">
        <p className="text-sm font-medium text-slate-700">
          Crear enlace de videollamada
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Se generará automáticamente un enlace para la reunión
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button intent="primary">Guardar evento</Button>

        <Button
          intent="warning"
          className="bg-violet-200 hover:bg-violet-300 text-violet-900"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
