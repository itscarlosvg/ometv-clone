"use client";

import Link from "next/link";
import { ArrowRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/icons";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
    const loginWithGoogle = async () => {
    const redirectTo = "http://localhost:3000/callback";

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: redirectTo,
            },
        }); // logica agregada inicio sesion google

        if (error) {
            console.error("Error:", error);
        }
  };
    
    return (
        <section className="flex w-full max-w-md flex-col items-center text-center">
            <IconBadge
                icon={Video}
                tone="logo"
                variant="soft"
                className="h-12 w-12 rounded-2xl"
            />

            <h1 className="mt-4 text-3xl font-semibold tracking-tight">Bienvenido</h1>
            <p className="mt-2 text-sm text-slate-600">
                Videollamadas 1:1 con chat y agenda
            </p>



            <div className="mt-6">
                <Button
                    intent="primary"
                    leftIcon={ArrowRight}
                    showRightIcon={false}
                    className="h-10 rounded-lg px-5"
                    onClick={loginWithGoogle} // logica agregada boton inicio sesion google
                >
                    Continuar con Google
                </Button>
            </div>

            <p className="mt-3 text-xs text-slate-500">
                Al continuar, aceptas nuestros{" "}
                <Link href="/terms" className="text-purple-700 hover:underline">
                    Términos de Servicio
                </Link>{" "}
                y{" "}
                <Link href="/privacy" className="text-purple-700 hover:underline">
                    Política de Privacidad
                </Link>
                .
            </p>
        </section>
    );  
}