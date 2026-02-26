export function DeviceBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-green-400 text-slate-800 text-xs px-2.5 py-1 rounded-xs font-medium">
      {children}
    </span>
  );
}
