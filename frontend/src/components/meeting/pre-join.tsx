"use client";

import { useState } from "react";
import { Mic, Video, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CalendarEvent } from "@/types/calendar-event";
import Image from "next/image";

type Props = {
  meetingId: string;
  event: CalendarEvent;
  user: any;
};

export function PreJoin({ meetingId, event, user }: Props) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(false);
  const router = useRouter();
  const isCreator = user?.email === event.creatorEmail;
  const otherParticipant = isCreator ? event.guestEmail : event.creatorEmail;

  return (
    <div className="flex w-full flex-col items-center pt-10">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold text-slate-800">{event.title}</h1>
        <p className="text-sm text-slate-500">
          Reunión con:{" "}
          <span className="font-medium text-slate-700">{otherParticipant}</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Comprobar audio y video antes de unirse
        </p>
      </div>

      <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-slate-300 shadow-sm">
        <div className="flex h-[340px] items-center justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
          <div className="flex flex-col items-center gap-3 text-white">
            {user?.avatarUrl ? (
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={user.avatarUrl}
                  alt={user.name || user.email}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="h-20 w-20 rounded-full bg-slate-500 flex items-center justify-center">
                <User size={40} />
              </div>
            )}

            <span className="font-medium">{user?.name}</span>

            <span className="text-xs text-slate-300">
              {isCreator ? "Organizador" : "Invitado"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-white p-6">
          <div className="rounded-lg border border-slate-300 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Mic size={16} />
                Micrófono
              </div>

              <button
                onClick={() => setMicEnabled(!micEnabled)}
                className={`h-6 w-11 rounded-full ${
                  micEnabled ? "bg-emerald-400" : "bg-slate-300"
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white ${
                    micEnabled ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
              <option>Micrófono predeterminado</option>
            </select>
          </div>

          <div className="rounded-lg border border-slate-300 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Video size={16} />
                Cámara
              </div>

              <button
                onClick={() => setCamEnabled(!camEnabled)}
                className={`h-6 w-11 rounded-full ${
                  camEnabled ? "bg-emerald-400" : "bg-slate-300"
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white ${
                    camEnabled ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
              <option>Cámara integrada</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center border-t border-slate-200 bg-white px-6 py-4">
          <Button
            intent="primary"
            onClick={() =>
              router.push(`/dashboard/meeting/${event.id}?joined=true`)
            }
          >
            Unirse
          </Button>
        </div>
      </div>
    </div>
  );
}
