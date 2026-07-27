import { ArrowRight, Box, TrendingUp, Star, Tag, Zap, Shield } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { PRODUCTS, CATEGORY_META, CATEGORY_COUNTS, TOP_RATED, NEW_ARRIVALS } from "../../data/products";
import StatMini from "./StatMini";
import CategoryCard from "./CategoryCard";
import MiniProductRow from "./MiniProductRow";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function HomePage() {
  const { user, cartCount, cartValue, goToShop } = useApp();
  const topProductCount = PRODUCTS.filter((p) => p.rating === 5).length;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 space-y-10">
      {/* Welcome banner */}
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <p className="text-xs font-bold tracking-widest text-lime-300 mb-3">
            {greeting().toUpperCase()} 👋
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Welcome back,
            <br />
            <span className="text-lime-300">{user?.name || "there"}!</span>
          </h1>
          <p className="text-zinc-400 max-w-md mb-6">
            Discover today's picks — hand-curated products across electronics, fashion, and more.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => goToShop()}
              className="flex items-center gap-2 rounded-full bg-lime-300 text-zinc-900 font-bold px-6 py-3 text-sm hover:bg-lime-200 transition-colors"
            >
              Shop Now <ArrowRight size={15} />
            </button>
            <button
              onClick={() => goToShop()}
              className="rounded-full border border-zinc-700 text-zinc-200 font-semibold px-6 py-3 text-sm hover:border-zinc-500 transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
        <div className="flex md:flex-col gap-3 shrink-0">
          <div className="rounded-2xl bg-lime-300 text-zinc-900 px-6 py-4 text-center min-w-[150px]">
            <p className="text-2xl font-extrabold">{PRODUCTS.length}+</p>
            <p className="text-xs font-semibold mt-0.5">Products Available</p>
          </div>
          <div className="rounded-2xl border border-zinc-700 px-6 py-4 text-center min-w-[150px]">
            <p className="text-xl font-extrabold text-white">Free</p>
            <p className="text-xs text-zinc-400 mt-0.5">Delivery on $99+</p>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatMini
          icon={Box}
          tint={{ bg: "#3f3f2e", fg: "#d9f99d" }}
          value={cartCount}
          label="Cart Items"
          sub="In your bag"
        />
        <StatMini
          icon={TrendingUp}
          tint={{ bg: "#1e3a5f", fg: "#7dd3fc" }}
          value={`$${cartValue.toFixed(2)}`}
          label="Cart Value"
          sub="Ready to checkout"
        />
        <StatMini
          icon={Star}
          tint={{ bg: "#4a3413", fg: "#fbbf24" }}
          value={topProductCount}
          label="Top Products"
          sub="Highly rated"
        />
        <StatMini
          icon={Tag}
          tint={{ bg: "#3b1f4d", fg: "#e9d5ff" }}
          value={Object.keys(CATEGORY_COUNTS).length}
          label="Categories"
          sub="To explore"
        />
      </section>

      {/* Shop by category */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-extrabold text-white">Shop by Category</h2>
          <button onClick={() => goToShop()} className="flex items-center gap-1 text-sm font-semibold text-lime-300">
            View All <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.keys(CATEGORY_META).map((name) => (
            <CategoryCard key={name} name={name} />
          ))}
        </div>
      </section>

      {/* Top rated / new arrivals */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white text-zinc-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 font-extrabold text-lg">
              <Star size={17} className="fill-amber-400 text-amber-400" /> Top Rated
            </h3>
            <button onClick={() => goToShop()} className="flex items-center gap-1 text-sm font-semibold text-amber-500">
              See all <ArrowRight size={13} />
            </button>
          </div>
          <div className="space-y-2">
            {TOP_RATED.map((p) => (
              <MiniProductRow key={p.id} product={p} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white text-zinc-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 font-extrabold text-lg">
              <Zap size={17} className="fill-lime-400 text-lime-500" /> New Arrivals
            </h3>
            <button onClick={() => goToShop()} className="flex items-center gap-1 text-sm font-semibold text-lime-600">
              See all <ArrowRight size={13} />
            </button>
          </div>
          <div className="space-y-2">
            {NEW_ARRIVALS.map((p) => (
              <MiniProductRow key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="grid sm:grid-cols-3 gap-4">
        {[
          [Zap, "Fast Delivery", "Same-day on select items"],
          [Shield, "Secure Payments", "100% encrypted checkout"],
          [Tag, "Best Prices", "Price-match guarantee"],
        ].map(([Icon, title, sub]) => (
          <div key={title} className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
            <Icon size={18} className="text-lime-300 shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">{title}</p>
              <p className="text-xs text-zinc-500">{sub}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
