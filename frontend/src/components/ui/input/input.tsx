import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icons/icon";
import { inputStyles } from "./input.styles";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    state?: "default" | "error";
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ state = "default", leftIcon, rightIcon, className, ...props }, ref) => {
        const withLeftIcon = Boolean(leftIcon);
        const withRightIcon = Boolean(rightIcon);

        return (
            <div className="relative w-full">
                {leftIcon ? (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                        <Icon icon={leftIcon} />
                    </span>
                ) : null}

                <input
                    ref={ref}
                    className={cn(inputStyles({ state, withLeftIcon, withRightIcon }), className)}
                    {...props}
                />

                {rightIcon ? (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                        <Icon icon={rightIcon} />
                    </span>
                ) : null}
            </div>
        );
    }
);
Input.displayName = "Input";