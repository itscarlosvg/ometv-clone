import { MeetingClient } from "./meeting-client";
import { CalendarEvent } from "@/types/calendar-event";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ joined?: string }>;
};

async function getEvent(id: string): Promise<CalendarEvent | null> {
  try {
    const res = await fetch(`http://localhost:8080/api/events/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch event: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export default async function MeetingPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { joined } = await searchParams;
  
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  return (
    <MeetingClient 
      id={id} 
      joined={joined} 
      initialEvent={event} 
    />
  );
}