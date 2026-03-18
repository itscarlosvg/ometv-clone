"use client";

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MessageSquare,
  Users,
  PhoneOff,
  ArrowLeft,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconButton } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { PageTopbar } from "@/components/layout/page-topbar";
import { CalendarEvent } from "@/types/calendar-event";
import Image from "next/image";

type Props = {
  meetingId: string;
  event: CalendarEvent;
  user: any;
};

export function JoinRoom({ event, user }: Props) {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(false);
  const router = useRouter();

  const isCreator = user?.email === event.creatorEmail;
  const guestEmail = isCreator ? event.guestEmail : event.creatorEmail;
  const guestName = guestEmail?.split("@")[0] || "Invitado";

  const yourName = user?.name || user?.email?.split("@")[0] || "Tú";

  return (
    <div className="flex h-[calc(100vh-70px)] flex-col bg-slate-950">
      <PageTopbar
        showActions={false}
        leftContent={
          <div className="flex items-start gap-3">
            <Button
              intent="neutral"
              className="mt-1 w-8 h-8 p-0 flex items-center justify-center"
              onClick={() => router.back()}
            >
              <ArrowLeft size={16} />
            </Button>

            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                {event.title}
              </h1>

              <p className="text-sm text-slate-500">{event?.notes}</p>
            </div>
          </div>
        }
      />

      <div className="relative flex flex-1 items-center justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
        <div className="flex flex-col items-center text-white">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-white shadow-lg">
            <span className="text-3xl font-bold text-white">
              {guestName.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="mt-3 font-medium text-lg">{guestName}</span>
          <span className="text-xs text-slate-300">
            {isCreator ? "Invitado" : "Organizador"} • Cámara desactivada
          </span>
        </div>

        <div className="absolute bottom-6 right-6 w-48 rounded-lg bg-slate-900 p-3 shadow-lg border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white font-medium">Tú</span>
            <button className="rounded bg-red-100 p-1 text-red-600">
              {mic ? <Mic size={14} /> : <MicOff size={14} />}
            </button>
          </div>

          <div className="flex h-24 items-center justify-center rounded bg-slate-800 text-white">
            {user?.avatarUrl ? (
              <div className="h-14 w-14 rounded-full overflow-hidden border border-white">
                <Image
                  src={user.avatarUrl}
                  alt={yourName}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="h-14 w-14 rounded-full bg-slate-600 flex items-center justify-center">
                <span className="text-lg">
                  {yourName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>{yourName}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 border-t border-slate-800 bg-white py-4">
        <IconButton icon={mic ? Mic : MicOff} onClick={() => setMic(!mic)} />
        <IconButton
          icon={cam ? Video : VideoOff}
          onClick={() => setCam(!cam)}
        />
        <IconButton icon={MonitorUp} />
        <IconButton icon={MessageSquare} />
        <IconButton icon={Users} />
        <IconButton
          icon={PhoneOff}
          className="border-red-400 text-red-600 hover:bg-red-50"
          onClick={() => router.push("/dashboard")}
        />
      </div>
    </div>
  );
}
