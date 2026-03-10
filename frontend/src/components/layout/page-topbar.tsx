"use client";

import * as React from "react";
import { Plus, CalendarDays } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button/button";
import { useRouter } from "next/navigation";

type PageTopbarProps = {
  /**
   * Custom left content (replaces title/subtitle if provided)
   */
  leftContent?: React.ReactNode;

  /**
   * Main title shown on the left (ignored if leftContent is provided)
   * @defaultValue "Inicio"
   */
  title?: string;

  /**
   * Supporting subtitle/description shown under the title (ignored if leftContent is provided)
   * @defaultValue "Gestiona tus reuniones y videollamadas"
   */
  subtitle?: string;

  /**
   * Optional className to tweak spacing, sticky behavior, z-index, etc.
   */
  className?: string;

  /**
   * Handler for the primary action ("Nueva reunión").
   */
  onNewMeeting?: () => void;

  /**
   * Handler for the secondary action ("Programar").
   */
  onSchedule?: () => void;

  /**
   * Whether to show the action buttons.
   * @defaultValue true
   */
  showActions?: boolean;

  /**
   * Allows disabling individual actions.
   */
  disableNewMeeting?: boolean;
  disableSchedule?: boolean;

  /**
   * Custom right content (replaces action buttons if provided)
   */
  rightContent?: React.ReactNode;
};

export function PageTopbar({
  leftContent,
  title = "Inicio",
  subtitle = "Gestiona tus reuniones y videollamadas",
  className,
  onNewMeeting,
  onSchedule,
  showActions = true,
  disableNewMeeting,
  disableSchedule,
  rightContent,
}: PageTopbarProps) {
  const router = useRouter();

  const handleNewMeeting = () => {
    router.push("/dashboard/calendar/new");
  };

  const handleSchedule = () => {
    router.push("/dashboard/calendar")
  }
  return (
    <header
      className={cn(
        "flex items-start justify-between gap-4",
        "border-b border-slate-200 bg-white",
        "px-6 py-4",
        className,
      )}
    >
      {/* Left: Custom content or default title/subtitle */}
      <div className="min-w-0">
        {leftContent ? (
          leftContent
        ) : (
          <>
            <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </>
        )}
      </div>

      {/* Right: Custom content or default actions */}
      <div className="flex shrink-0 items-center gap-3">
        {rightContent
          ? rightContent
          : showActions && (
              <>
                <Button
                  intent="primary"
                  leftIcon={Plus}
                  onClick={handleNewMeeting}
                  disabled={disableNewMeeting}
                >
                  Nueva reunión
                </Button>
                <Button
                  intent="warning"
                  leftIcon={CalendarDays}
                  onClick={handleSchedule}
                  disabled={disableSchedule}
                >
                  Programar
                </Button>
              </>
            )}
      </div>
    </header>
  );
}
