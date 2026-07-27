import { X, ShoppingCart } from "lucide-react";
import { useApp } from "../../context/AppContext";
import StarRating from "../common/StarRating";

export default function ProductModal() {
  const { selectedProduct, closeProductModal, addToCart } = useApp();
  if (!selectedProduct) return null;
  const p = selectedProduct;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8">
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeProductModal}
        aria-label="Close product details"
      />
      <div className="relative w-full max-w-2xl max-h-full overflow-y-auto rounded-2xl bg-white text-zinc-900 animate-[fadeIn_0.15s_ease-out]">
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900/80 text-white hover:bg-zinc-900"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <img src={p.image} alt={p.name} className="h-64 md:h-72 w-full object-cover" />

        <div className="p-6 md:p-8">
          <span className="inline-block rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold px-3 py-1 mb-3">
            {p.category}
          </span>
          <h2 className="text-2xl font-extrabold mb-2">{p.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={p.rating} size={15} />
            <span className="text-sm text-zinc-500">({p.reviews} reviews)</span>
          </div>
          <p className="text-zinc-600 leading-relaxed mb-6">{p.description}</p>

          <div className="flex items-center justify-between border-t border-zinc-100 pt-5">
            <span className="text-3xl font-extrabold">${p.price.toFixed(2)}</span>
            <button
              onClick={() => {
                addToCart(p.id);
                closeProductModal();
              }}
              className="flex items-center gap-2 rounded-full bg-lime-300 text-zinc-900 font-bold px-6 py-3 text-sm hover:bg-lime-200 transition-colors"
            >
              <ShoppingCart size={15} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
