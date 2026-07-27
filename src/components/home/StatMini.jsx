export default function StatMini({ icon: Icon, tint, value, label, sub }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0" style={{ backgroundColor: tint.bg }}>
        <Icon size={17} style={{ color: tint.fg }} />
      </span>
      <div className="min-w-0">
        <p className="text-xl font-extrabold text-white leading-none">{value}</p>
        <p className="text-sm font-semibold text-zinc-300 mt-1">{label}</p>
        <p className="text-xs text-zinc-500 truncate">{sub}</p>
      </div>
    </div>
  );
}
