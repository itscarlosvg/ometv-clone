"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PersonalInfoCard } from "../../components/settings/personal-info-card";
import { DevicesCard } from "../../components/settings/devices-card";
import { PreferencesCard } from "../../components/settings/preferences-card";
import { LogoutSection } from "../../components/settings/logout-section";
import { PageTopbar } from "@/components/layout/page-topbar";
import { Button } from "@/components/ui/button/button"; 
import {
  UserSettings,
  UserInfo,
  Device,
} from "../../components/settings/types";
import { Mic, Camera, Volume2, Video, Play } from "lucide-react";
import { getCurrentUser } from "@/lib/api";


const MOCK_DEVICES: Device[] = [
  {
    id: "mic",
    label: "Micrófono",
    description: "Micrófono predeterminado",
    status: "Micrófono predeterminado",
    icon: Mic,
    actionIcon: Volume2,
  },
  {
    id: "camera",
    label: "Cámara",
    description: "Cámara web integrada",
    status: "Cámara web integrada",
    icon: Video,
    actionIcon: Camera,
  },
  {
    id: "speaker",
    label: "Altavoces",
    description: "Altavoces predeterminados",
    status: "Altavoces predeterminados",
    icon: Volume2,
    actionIcon: Play,
  },
];

export function SettingsPageClient() {
  const router = useRouter();

  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const u = await getCurrentUser();
      if (u) setUser(u);
    };

    loadUser();
  }, []);

  if (!user) return <div>Cargando...</div>;



  const [settings, setSettings] = useState<UserSettings>({
    cameraOff: true,
    micOff: true,
    notifications: true,
  });

  const handleSettingChange = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    // Aquí iría la llamada a la API
  };

  const handleLogout = async () => {
    // Aquí iría la lógica de logout
    router.push("/login");
  };

  const handleDeviceChange = (deviceId: string) => {
    // Aquí iría la lógica para cambiar dispositivo
    console.log("Cambiar dispositivo:", deviceId);
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar cambios
    console.log("Guardando configuración:", settings);
  };

  return (
    <>
      <PageTopbar
        leftContent={
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Ajustes y Perfil</h1>
            <p className="mt-1 text-sm text-slate-500">
              Gestiona tu información y dispositivos
            </p>
          </div>
        }
        rightContent={
          <Button intent="primary" onClick={handleSave}>
            Guardar cambios
          </Button>
        }
      />
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="space-y-8">
          <PersonalInfoCard user={user} />
          <DevicesCard
            devices={MOCK_DEVICES}
            onDeviceChange={handleDeviceChange}
          />
          <PreferencesCard
            settings={settings}
            onSettingChange={handleSettingChange}
          />
          <LogoutSection onLogout={handleLogout} />
        </div>
      </div>
    </>
  );
}