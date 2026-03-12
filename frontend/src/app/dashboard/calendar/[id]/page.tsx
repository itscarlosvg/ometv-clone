"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageTopbar } from "@/components/layout/page-topbar";
import { EventDetailCard } from "@/components/calendar/event-detail-card";
import { Button } from "@/components/ui/button/button";

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();

  const id = params?.id as string;

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <PageTopbar
        showActions={false}
        leftContent={
          <div className="flex items-start gap-3">
            <Button
              intent="neutral" 
              className="mt-1 w-8 h-8 p-0 flex items-center justify-center text-slate-500 hover:bg-slate-100"
              onClick={() => router.back()}
            >
              <ArrowLeft size={16} />
            </Button>

            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Detalle del evento
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Información completa de la reunión
              </p>
            </div>
          </div>
        }
      />

      <div className="flex-1 flex justify-center px-6 py-8">
        <EventDetailCard id={id} />
      </div>
    </div>
  );
}
