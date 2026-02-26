import { LucideIcon } from "lucide-react";

export interface UserSettings {
    cameraOff: boolean;
    micOff: boolean;
    notifications: boolean;
}

export interface UserInfo {
    name: string;
    email: string;
    avatarUrl?: string; 
}


export interface Device {
    id: string;
    label: string;
    description: string;
    status: string;
    icon: LucideIcon;
    actionIcon: LucideIcon;
}