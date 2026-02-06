import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "./icon";

type IconBadgeProps = {
    icon: LucideIcon;
    size?: number;
    variant?: "none" | "soft" | "solid";
    tone?: "neutral" | "primary" | "info" | "warning" | "danger";
    className?: string;
};

const toneClasses: Record<NonNullable<IconBadgeProps["tone"]>, string> = {
    neutral: "text-slate-700",
    primary: "text-emerald-700",
    info: "text-sky-700",
    warning: "text-amber-800",
    danger: "text-red-700",
};

const bgClasses: Record<
    NonNullable<IconBadgeProps["tone"]>,
    { soft: string; solid: string }
> = {
    neutral: { soft: "bg-slate-100", solid: "bg-slate-800 text-white" },
    primary: { soft: "bg-emerald-100", solid: "bg-emerald-500 text-slate-900" },
    info: { soft: "bg-sky-100", solid: "bg-sky-500 text-slate-900" },
    warning: { soft: "bg-amber-100", solid: "bg-amber-400 text-slate-900" },
    danger: { soft: "bg-red-100", solid: "bg-red-400 text-slate-900" },
};

export function IconBadge({
    icon,
    size = 18,
    variant = "soft",
    tone = "neutral",
    className,
}: IconBadgeProps) {
    const base = "inline-flex items-center justify-center rounded-lg";
    const padding = "h-9 w-9"; // ajusta según tu UI
    const toneText = toneClasses[tone];

    const bg =
        variant === "none"
            ? ""
            : variant === "soft"
                ? bgClasses[tone].soft
                : bgClasses[tone].solid;

    return (
        <span className={cn(base, padding, variant === "none" ? "" : bg, toneText, className)}>
            <Icon icon={icon} size={size} className={variant === "solid" ? "text-inherit" : ""} />
        </span>
    );
}