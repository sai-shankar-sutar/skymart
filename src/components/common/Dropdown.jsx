import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({ value, options, onChange, width = "w-44" }) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.key === value) || options[0];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between gap-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 px-4 py-3 ${width}`}
      >
        <span className="truncate">{current.label}</span>
        <ChevronDown size={14} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <button className="fixed inset-0 z-10 cursor-default" onClick={() => setOpen(false)} aria-label="Close dropdown" />
          <div className={`absolute z-20 mt-2 rounded-xl border border-zinc-800 bg-zinc-900 py-1.5 shadow-xl shadow-black/40 ${width}`}>
            {options.map((o) => (
              <button
                key={o.key}
                onClick={() => {
                  onChange(o.key);
                  setOpen(false);
                }}
                className={`block w-full text-left text-sm px-4 py-2 hover:bg-zinc-800 ${
                  o.key === value ? "text-lime-300 font-semibold" : "text-zinc-300"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
