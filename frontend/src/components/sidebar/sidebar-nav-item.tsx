import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Home, CalendarDays, Settings, Video } from "lucide-react";
import type { SidebarIconName } from "./sidebar-nav";

type SidebarNavItemProps = {
    /**
     * Visible label.
     */
    label: string;

    /**
     * Link destination.
     */
    href: string;

    /**
     * Serializable icon identifier.
     */
    icon: SidebarIconName;

    /**
     * Whether this item is currently active.
     * @defaultValue false
     */
    active?: boolean;
};

/**
 * Maps icon identifiers to actual Lucide icon components.
 *
 * Important:
 * - This mapping lives on the Client side (or inside a file imported by client),
 *   so Server Components never have to pass icon components through props.
 */
const ICONS: Record<SidebarIconName, React.ElementType> = {
    home: Home,
    calendar: CalendarDays,
    settings: Settings,
    video: Video,
};

/**
 * Single sidebar navigation item.
 *
 * Accessibility:
 * - When `active`, sets `aria-current="page"`.
 */
export function SidebarNavItem({
    label,
    href,
    icon,
    active = false,
}: SidebarNavItemProps) {
    const Icon = ICONS[icon];

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                active
                    ? "bg-emerald-100 text-slate-900"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            )}
            aria-current={active ? "page" : undefined}
        >
            <Icon className={cn("h-4 w-4", active ? "text-slate-900" : "text-slate-700")} />
            <span className="truncate">{label}</span>
        </Link>
    );
}
