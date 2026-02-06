import "@/styles/globals.css";

export const metadata = {
  title: "Meet Up",
  description: "Videollamadas 1:1 con chat y agenda",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}