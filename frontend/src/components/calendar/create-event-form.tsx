"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { setHours, setMinutes } from "date-fns";

export function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !start || !end || !email) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    if (end < start) {
      toast.error("La hora de fin no puede ser menor que la de inicio");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          guestEmail: email,
          notes,
        }),
      });

      if (!response.ok) throw new Error("Error al crear evento");

      await response.json();
      toast.success("Evento creado correctamente");

      // Limpiar formulario
      setTitle("");
      setStart(null);
      setEnd(null);
      setEmail("");
      setNotes("");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo crear el evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
      {/* Título */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Título <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="Reunión de proyecto..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Fecha y hora */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Fecha y hora de inicio <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={start}
            onChange={(date: Date | null) => setStart(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Selecciona fecha y hora"
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Fecha y hora de fin <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={end}
            onChange={(date: Date | null) => setEnd(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Selecciona fecha y hora"
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            minDate={start || undefined} 
            minTime={
              start && end && start.toDateString() === end.toDateString()
                ? start
                : setHours(setMinutes(new Date(), 0), 0)
            }
            maxTime={setHours(setMinutes(new Date(), 45), 23)}
          />
        </div>
      </div>

      {/* Invitado */}
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

      {/* Notas */}
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

      {/* Videollamada */}
      <div className="rounded-md bg-slate-50 border border-slate-200 p-4">
        <p className="text-sm font-medium text-slate-700">
          Crear enlace de videollamada
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Se generará automáticamente un enlace para la reunión
        </p>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <Button intent="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              Guardando...
              <span className="w-4 h-4 border-2 border-t-2 border-t-white border-gray-200 rounded-full animate-spin"></span>
            </span>
          ) : (
            "Guardar evento"
          )}
        </Button>

        <Button
          intent="warning"
          className="bg-violet-200 hover:bg-violet-300 text-violet-900"
          onClick={() => {
            setTitle("");
            setStart(null);
            setEnd(null);
            setEmail("");
            setNotes("");
          }}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}