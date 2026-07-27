import { ShoppingCart } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-[fadeIn_0.15s_ease-out]">
      <div className="flex items-center gap-2 rounded-full bg-lime-300 text-zinc-900 font-semibold text-sm px-5 py-3 shadow-xl shadow-black/40">
        <ShoppingCart size={15} />
        {toast}
      </div>
    </div>
  );
}
