export function EventCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-medium px-3 py-2 rounded-md text-center leading-tight">
          16:00 <br /> 1h
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">
            Sesión de feedback
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Miguel López
          </p>
        </div>

      </div>

      <button className="bg-violet-200 text-violet-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-violet-300">
        Ver detalles
      </button>

    </div>
  );
}