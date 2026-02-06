import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icons/icon";
import { buttonStyles } from "./button.styles";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    intent?: "neutral" | "primary" | "info" | "warning" | "danger";
    state?: "default" | "active" | "focus" | "selected";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;

    showText?: boolean;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    showLeftIcon?: boolean;
    showRightIcon?: boolean;

    // por si quieres “swap” desde Figma
    leftIconSwap?: LucideIcon;
    rightIconSwap?: LucideIcon;
    swapped?: boolean;
};

export function Button({
    intent,
    state,
    size,
    fullWidth,

    showText = true,
    leftIcon,
    rightIcon,
    showLeftIcon = true,
    showRightIcon = true,

    leftIconSwap,
    rightIconSwap,
    swapped = false,

    className,
    children,
    ...props
}: ButtonProps) {
    const Left = swapped ? leftIconSwap ?? leftIcon : leftIcon;
    const Right = swapped ? rightIconSwap ?? rightIcon : rightIcon;

    return (
        <button
            className={cn(buttonStyles({ intent, state, size, fullWidth }), className)}
            {...props}
        >
            {showLeftIcon && Left ? <Icon icon={Left} /> : null}
            {showText ? <span className="truncate">{children}</span> : null}
            {showRightIcon && Right ? <Icon icon={Right} /> : null}
        </button>
    );
}