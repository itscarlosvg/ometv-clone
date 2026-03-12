const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getEventById(id: string) {
  const res = await fetch(`${API_URL}/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }

  return res.json();
}