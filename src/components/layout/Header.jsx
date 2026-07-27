import { Zap, ShoppingCart, LogOut } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Header() {
  const { user, route, setRoute, goToShop, cartCount, signOut, setCartOpen } = useApp();
  const initial = (user?.name || "S").charAt(0).toUpperCase();

  const navItem = (key, label, onClick) => (
    <button
      onClick={onClick ?? (() => setRoute(key))}
      className={`text-sm font-semibold transition-colors ${
        route === key ? "text-lime-300" : "text-zinc-400 hover:text-zinc-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-10 py-4 bg-zinc-950/95 backdrop-blur border-b border-zinc-900">
      <button
        onClick={() => setRoute("home")}
        className="flex items-center gap-2 shrink-0"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-300">
          <Zap size={16} className="fill-zinc-900 text-zinc-900" />
        </span>
        <span className="text-lg font-extrabold tracking-tight text-white">
          Sky<span className="text-lime-300">Mart</span>
        </span>
      </button>

      <nav className="hidden md:flex items-center gap-8">
        {navItem("home", "Home")}
        {navItem("shop", "Shop", () => goToShop())}
        {navItem("about", "About")}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 pl-1 pr-3 py-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-300 text-zinc-900 text-xs font-bold">
            {initial}
          </span>
          <span className="text-sm font-medium text-zinc-200">{user?.name || "Guest"}</span>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 hover:border-lime-300/50 hover:text-lime-300 transition-colors"
          aria-label="Open cart"
        >
          <ShoppingCart size={16} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-lime-300 px-1 text-[10px] font-bold text-zinc-900">
              {cartCount}
            </span>
          )}
        </button>
        <button
          onClick={signOut}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 hover:border-red-400/50 hover:text-red-400 transition-colors"
          aria-label="Sign out"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
}
