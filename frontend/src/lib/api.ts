import { supabase } from "./supabase";

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return null;

  const user = data.user;

  return {
    name: user.user_metadata?.full_name ?? "",
    email: user.email ?? "",
    avatarUrl: user.user_metadata?.avatar_url ?? "",
  };
}