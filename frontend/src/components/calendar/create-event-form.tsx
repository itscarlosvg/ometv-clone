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

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        startTime: start,
        endTime: end,
        guestEmail: email,
        notes,
      }),
    });

    if (!response.ok) {
      console.error("Error creating event");
      return;
    }

    const data = await response.json();
    console.log("Event created:", data);
  };

  return (
    <div className="w-full max-w-xl bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Título <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="Reunion de proyecto..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

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

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Invitado <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Notas (opcional)
        </label>
        <textarea
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
          rows={4}
          placeholder="..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="rounded-md bg-slate-50 border border-slate-200 p-4">
        <p className="text-sm font-medium text-slate-700">
          Crear enlace de videollamada
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Se generará automáticamente un enlace para la reunión
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button intent="primary" onClick={handleSubmit}>
          Guardar evento
        </Button>

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
