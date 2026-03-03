"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageTopbar } from "@/components/layout/page-topbar";
import { CreateEventForm } from "@/components/calendar/create-event-form";

export default function NewMeetingPage() {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <PageTopbar
        showActions={false}
        leftContent={
          <div className="flex items-start gap-3">
            <button
              onClick={() => router.back()}
              className="mt-1 w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100"
            >
              <ArrowLeft size={16} />
            </button>

            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Crear evento
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Programa una nueva reunión
              </p>
            </div>
          </div>
        }
      />

      <div className="flex-1 flex justify-center px-6 py-8">
        <CreateEventForm />
      </div>
    </div>
  );
}