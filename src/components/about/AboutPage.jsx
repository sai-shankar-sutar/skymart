import { Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-300 mb-6">
        <Zap size={26} className="fill-zinc-900 text-zinc-900" />
      </span>
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
        About Sky<span className="text-lime-300">Mart</span>
      </h1>
      <p className="text-zinc-400 leading-relaxed mb-10">
        SkyMart is a fast, friendly place to shop for electronics, clothing, furniture, home
        goods, sports gear, and accessories — all in one spot, with same-day delivery on select
        items and prices that don't hurt.
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          ["50", "Products"],
          ["6", "Categories"],
          ["4.9★", "Avg. Rating"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-2xl border border-zinc-800 bg-zinc-900/30 px-6 py-5">
            <p className="text-2xl font-extrabold text-lime-300">{n}</p>
            <p className="text-xs text-zinc-500 mt-1">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
