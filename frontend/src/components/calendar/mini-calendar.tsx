"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MiniCalendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const startOffset = (firstDay + 6) % 7;

  const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];

  const goPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthLabel = currentDate.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-700 capitalize">
          {monthLabel}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={goPrevMonth}
            className="w-7 h-7 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={goNextMonth}
            className="w-7 h-7 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 text-xs text-center gap-y-2">
        {daysOfWeek.map((day) => (
          <span key={day} className="text-slate-400 font-medium">
            {day}
          </span>
        ))}

        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Días reales */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNumber = i + 1;
          const dayDate = new Date(year, month, dayNumber);

          const isSelected = isSameDay(dayDate, selectedDate);
          const isToday = isSameDay(dayDate, today);

          return (
            <button
              key={dayNumber}
              onClick={() => setSelectedDate(dayDate)}
              className={`
                w-8 h-8 mx-auto flex items-center justify-center rounded-md text-sm transition-colors
                ${
                  isSelected
                    ? "bg-emerald-400 text-white"
                    : isToday
                    ? "border border-emerald-300 text-emerald-600"
                    : "text-slate-700 hover:bg-slate-100"
                }
              `}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
}