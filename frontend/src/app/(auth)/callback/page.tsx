"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  useEffect(() => {
    const handleCallback = async () => {
      console.log("Iiniciando callback");
      
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        console.error("Error ", error);
        window.location.href = "/dashboard";
        return;
      }

      console.log("Sesión obtenida", session.access_token.substring(0, 20) + "...");

      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const userData = await response.json();
        console.log("Usuario autenticado en backend", userData);
        
        window.location.href = "/dashboard";
        
      } catch (err) {
        console.error("Error llamando al backend", err);
        window.location.href = "/dashboard";
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent mx-auto"></div>
        <p className="text-slate-600">Creando tu sesión...</p>
      </div>
    </div>
  );
}