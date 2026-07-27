import { ShoppingCart } from "lucide-react";
import { useApp } from "../../context/AppContext";
import ProductThumb from "../common/ProductThumb";
import StarRating from "../common/StarRating";

export default function ProductCard({ product }) {
  const { addToCart, openProductModal } = useApp();
  return (
    <div
      onClick={() => openProductModal(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && openProductModal(product)}
      className="cursor-pointer rounded-2xl bg-white text-zinc-900 overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 transition-all"
    >
      <div className="relative">
        <ProductThumb product={product} className="h-40 w-full" />
        <span className="absolute top-3 left-3 rounded-full bg-zinc-900/85 text-white text-[11px] font-semibold px-2.5 py-1">
          {product.category}
        </span>
      </div>
      <div className="flex-1 flex flex-col p-4">
        <p className="text-xs text-zinc-500 mb-1">{product.category}</p>
        <h3 className="font-bold text-sm leading-snug mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-zinc-400">({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-3">
          <span className="text-lg font-extrabold text-zinc-900">${product.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id);
            }}
            className="flex items-center gap-1.5 rounded-full bg-lime-300 text-zinc-900 font-bold text-xs px-3.5 py-2 hover:bg-lime-200 transition-colors"
          >
            <ShoppingCart size={12} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
