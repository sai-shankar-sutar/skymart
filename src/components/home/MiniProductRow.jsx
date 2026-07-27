import { ShoppingCart } from "lucide-react";
import { useApp } from "../../context/AppContext";
import ProductThumb from "../common/ProductThumb";

export default function MiniProductRow({ product }) {
  const { addToCart, openProductModal } = useApp();
  return (
    <div
      onClick={() => openProductModal(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && openProductModal(product)}
      className="cursor-pointer flex items-center gap-3 rounded-xl border border-zinc-100 px-3 py-2.5 hover:border-lime-300/60 transition-colors"
    >
      <ProductThumb product={product} className="h-11 w-11 rounded-lg shrink-0" />
      <span className="flex-1 min-w-0 text-sm font-bold text-zinc-900">
        ${product.price.toFixed(2)}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product.id);
        }}
        className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-100 text-lime-700 hover:bg-lime-200 transition-colors shrink-0"
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingCart size={13} />
      </button>
    </div>
  );
}
