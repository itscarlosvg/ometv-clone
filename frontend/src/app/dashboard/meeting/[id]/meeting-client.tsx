// app/dashboard/meeting/[id]/meeting-client.tsx
"use client";

import { useEffect, useState } from "react";
import { PreJoin, JoinRoom } from "@/components/meeting";
import { getCurrentUser } from "@/lib/api";
import { CalendarEvent } from "@/types/calendar-event";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  joined?: string;
  initialEvent: CalendarEvent;
};

export function MeetingClient({ id, joined, initialEvent }: Props) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getCurrentUser();
        if (!userData) {
          router.push("/login");
          return;
        }
        setUser(userData);
      } catch (error) {
        console.error("Error loading user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (joined) {
    return <JoinRoom meetingId={id} event={initialEvent} user={user} />;
  }

  return <PreJoin meetingId={id} event={initialEvent} user={user} />;
}