"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Copy, Video, Pencil, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { CalendarEvent } from "@/types/calendar-event";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

export function EventDetailCard({ id }: Props) {
  const [event, setEvent] = useState<CalendarEvent | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const loadEvent = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/events/${id}`);
        if (!res.ok) throw new Error("Evento no encontrado");
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
        setEvent(null);
      }
    };

    loadEvent();
  }, [id]);

  if (!event) {
    return <p className="text-sm text-slate-500">Cargando evento...</p>;
  }

  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  const formattedDate = start.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const startHour = start.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endHour = end.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const meetingLink = event.meetingUrl;

  const copyLink = async () => {
    await navigator.clipboard.writeText(meetingLink);
    toast.success("Copiado al portapapeles");
  };

  return (
    <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{event.title}</h2>

        <div className="flex items-center gap-6 mt-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {formattedDate}
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} />
            {startHour} - {endHour}
          </div>
        </div>
      </div>

      <hr className="border-slate-200" />

      <div>
        <p className="text-sm font-medium text-slate-700 mb-3">Invitado</p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200" />

          <div>
            <p className="text-sm font-medium text-slate-900">Invitado</p>
            <p className="text-xs text-slate-500">{event.guestEmail}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-emerald-100 border border-emerald-200 p-5 space-y-3">
        <p className="text-sm font-medium text-slate-800">Enlace de la sala</p>

        <div className="flex gap-3">
          <Input
            value={meetingLink}
            readOnly
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm bg-white"
            disabled
          />

          <Button intent="primary" onClick={copyLink} leftIcon={Copy}>
            Copiar
          </Button>
        </div>
      </div>

      {event.notes && (
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Notas</p>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            {event.notes}
          </div>
        </div>
      )}

      <hr className="border-slate-200" />

      <div className="flex gap-3">
        <Button
          intent="primary"
          rightIcon={ArrowRight}
          onClick={() => router.push(`/dashboard/meeting/${event.id}`)}
        >
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
