import { Button } from "@/components/ui/button/button";
import { LogOut } from "lucide-react";

interface LogoutSectionProps {
    onLogout: () => void;
}

export function LogoutSection({ onLogout }: LogoutSectionProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
                <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-800">Cerrar sesión</p>
                    <p className="text-xs text-slate-500">
                        Salir de tu cuenta en este dispositivo
                    </p>
                </div>
                <Button
                    intent="danger"
                    leftIcon={LogOut}
                    onClick={onLogout}
                    className="hover:bg-red-300"
                >
                    Cerrar sesión
                </Button>
            </div>
        </div>
    );
}