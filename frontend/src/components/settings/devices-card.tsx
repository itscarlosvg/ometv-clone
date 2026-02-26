import { Device } from "./types";

interface DevicesCardProps {
  devices: Device[];
  onDeviceChange?: (deviceId: string) => void;
}

import { DeviceBadge } from "@/components/ui/device-badge";

function DeviceItem({
  icon: Icon,
  actionIcon: ActionIcon,
  label,
  description,
  status,
  onAction,
}: Device & { onAction?: () => void }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-green-400 border border-emerald-200/60 flex items-center justify-center">
          <Icon size={20} className="text-slate-800" />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">{label}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <DeviceBadge>{status}</DeviceBadge>

        <button
          onClick={onAction}
          className="w-8 h-8 rounded-md border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
        >
          <ActionIcon size={18}/>
        </button>
      </div>
    </div>
  );
}

export function DevicesCard({ devices, onDeviceChange }: DevicesCardProps) {
  return (
    <section>
      <h2 className="text-sm font-bold mb-3">Dispositivos</h2>
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        {devices.map((device) => (
          <DeviceItem
            key={device.id}
            {...device}
            onAction={() => onDeviceChange?.(device.id)}
          />
        ))}
      </div>
    </section>
  );
}
