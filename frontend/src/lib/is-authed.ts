import { getSession } from "./auth";

export async function isAuthed() {
  const session = await getSession();
  return !!session;
}