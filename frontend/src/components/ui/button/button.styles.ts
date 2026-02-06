import { cva } from "class-variance-authority";

export const buttonStyles = cva(
    [
        "inline-flex items-center justify-center gap-2",
        "rounded-lg px-4 py-2 text-sm font-medium",
        "transition outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
    ].join(" "),
    {
        variants: {
            intent: {
                neutral: "bg-slate-100 text-slate-900 hover:bg-slate-200",
                primary: "bg-emerald-400 text-slate-900 hover:bg-emerald-300",
                info: "bg-sky-400 text-slate-900 hover:bg-sky-300",
                warning: "bg-amber-300 text-slate-900 hover:bg-amber-200",
                danger: "bg-red-200 text-slate-900 hover:bg-red-100",
            },
            state: {
                default: "",
                active: "ring-2 ring-slate-900/20",
                focus: "ring-2 ring-sky-400 ring-offset-2",
                selected: "ring-2 ring-emerald-400 ring-offset-2",
            },
            size: {
                sm: "h-9 px-3",
                md: "h-10 px-4",
                lg: "h-11 px-5 text-base",
            },
            fullWidth: {
                true: "w-full",
                false: "",
            },
        },
        defaultVariants: {
            intent: "neutral",
            state: "default",
            size: "md",
            fullWidth: false,
        },
    }
);