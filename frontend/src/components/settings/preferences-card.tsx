import { Switch } from "@/components/ui/switch";
import { UserSettings } from "./types";

interface PreferencesCardProps {
    settings: UserSettings;
    onSettingChange: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

function PreferenceItem({ 
    label, 
    description, 
    checked, 
    onChange 
}: { 
    label: string; 
    description: string; 
    checked: boolean; 
    onChange: (checked: boolean) => void;
}) {
    return (
        <div className="p-4 flex items-center justify-between">
            <div>
                <p className="text-slate-900 text-sm font-medium">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{description}</p>
            </div>
            <Switch checked={checked} onCheckedChange={onChange} />
        </div>
    );
}

export function PreferencesCard({ settings, onSettingChange }: PreferencesCardProps) {
    return (
        <section>
            <h2 className="text-sm font-bold mb-3">
                Preferencias
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
                <PreferenceItem
                    label="Iniciar con cámara apagada"
                    description="Tu cámara estará desactivada al unirte a reuniones"
                    checked={settings.cameraOff}
                    onChange={(checked) => onSettingChange('cameraOff', checked)}
                />
                <PreferenceItem
                    label="Iniciar con micrófono apagado"
                    description="Tu micrófono estará silenciado al unirte a reuniones"
                    checked={settings.micOff}
                    onChange={(checked) => onSettingChange('micOff', checked)}
                />
                <PreferenceItem
                    label="Notificaciones de reuniones"
                    description="Recibe recordatorios antes de cada reunión"
                    checked={settings.notifications}
                    onChange={(checked) => onSettingChange('notifications', checked)}
                />
            </div>
        </section>
    );
}