import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icons/icon";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: LucideIcon;
    size?: "sm" | "md" | "lg";
    variant?: "ghost" | "soft" | "solid";
    tone?: "neutral" | "primary" | "danger";
};

const sizeCls = {
    sm: "h-9 w-9",
    md: "h-10 w-10",
    lg: "h-11 w-11",
};

const variantCls = {
    ghost: "bg-transparent hover:bg-slate-100",
    soft: "bg-slate-100 hover:bg-slate-200",
    solid: "bg-slate-900 text-white hover:bg-slate-800",
};

const toneCls = {
    neutral: "text-slate-800",
    primary: "text-emerald-700",
    danger: "text-red-700",
};

export function IconButton({
    icon,
    size = "md",
    variant = "ghost",
    tone = "neutral",
    className,
    ...props
}: IconButtonProps) {
    return (
        <button
            type="button"
            className={cn(
                "inline-flex items-center justify-center rounded-full transition outline-none",
                "focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2",
                "disabled:opacity-50 disabled:pointer-events-none",
                sizeCls[size],
                variantCls[variant],
                variant === "solid" ? "" : toneCls[tone],
                className
            )}
            {...props}
        >
            <Icon icon={icon} className={cn(variant === "solid" ? "text-inherit" : "")} />
        </button>
    );
}