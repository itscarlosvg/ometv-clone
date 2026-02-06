import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type IconProps = {
    icon: LucideIcon;
    size?: number;
    className?: string;
    strokeWidth?: number;
};

export function Icon({
    icon: Lucide,
    size = 18,
    strokeWidth = 2,
    className,
}: IconProps) {
    return (
        <Lucide
            size={size}
            strokeWidth={strokeWidth}
            className={cn("shrink-0", className)}
        />
    );
}