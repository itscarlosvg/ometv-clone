import * as React from "react";
import { cn } from "@/lib/cn";

type SwitchProps = {
    checked: boolean;
    onCheckedChange: (v: boolean) => void;
    disabled?: boolean;
    className?: string;
};

export function Switch({ checked, onCheckedChange, disabled, className }: SwitchProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                "relative h-7 w-12 rounded-full transition",
                checked ? "bg-emerald-400" : "bg-slate-300",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            aria-pressed={checked}
        >
            <span
                className={cn(
                    "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition",
                    checked ? "left-[26px]" : "left-[3px]"
                )}
            />
        </button>
    );
}