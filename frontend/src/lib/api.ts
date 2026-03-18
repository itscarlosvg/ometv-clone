// lib/api.ts
import { supabase } from "./supabase";

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      console.log("No authenticated user found");
      return null;
    }

    return {
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || "",
      email: user.email || "",
      avatarUrl: user.user_metadata?.avatar_url || "",
    };
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
}