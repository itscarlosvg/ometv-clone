import { BgDetails } from "@/components/layout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <main className="relative min-h-screen w-full overflow-hidden">
        <BgDetails />

        <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
          {children}
        </div>
      </main>
    </div>
  );
}
