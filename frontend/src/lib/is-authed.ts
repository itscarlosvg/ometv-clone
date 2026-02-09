import { cookies } from "next/headers";

export async function isAuthed() {
  const store = await cookies();

  const token =
    store.get("token")?.value ||
    store.get("access_token")?.value ||
    store.get("session")?.value;

  return Boolean(token);
}