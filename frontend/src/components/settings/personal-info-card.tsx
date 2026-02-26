import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { UserInfo } from "./types";

interface PersonalInfoCardProps {
  user: UserInfo;
}

export function PersonalInfoCard({ user }: PersonalInfoCardProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-bold">
        Información personal
      </h2>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-slate-200" />
            )}

            <button className="absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-white shadow border border-slate-700">
              <Camera size={12} className="text-slate-900"/>
            </button>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="text-xs text-slate-700 block mb-1">
                Nombre completo
              </label>
              <Input defaultValue={user.name} />
            </div>

            <div>
              <label className="text-xs text-slate-700 block mb-1">
                Correo electrónico
              </label>
              <Input value={user.email} disabled />
              <p className="text-xs text-slate-400 mt-1">
                El correo no se puede modificar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
