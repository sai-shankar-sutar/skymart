import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import ProductThumb from "../common/ProductThumb";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, cartValue, updateQty, removeFromCart, goToShop } = useApp();
  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
        aria-label="Close cart"
      />
      <div className="relative w-full max-w-sm h-full bg-zinc-950 border-l border-zinc-800 flex flex-col animate-[slideIn_0.2s_ease-out]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-900">
          <h2 className="text-lg font-bold text-white">Your Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-16">
              <ShoppingCart size={32} className="text-zinc-700" />
              <p className="text-zinc-500 text-sm">Your cart is empty.</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  goToShop();
                }}
                className="text-lime-300 text-sm font-semibold"
              >
                Browse products →
              </button>
            </div>
          ) : (
            cartItems.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-3 rounded-xl border border-zinc-900 bg-zinc-900/40 p-3">
                <ProductThumb product={product} className="h-16 w-16 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-100 truncate">{product.name}</p>
                  <p className="text-xs text-zinc-500 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-2 py-1">
                      <button
                        onClick={() => updateQty(product.id, -1)}
                        className="text-zinc-300 hover:text-lime-300"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-semibold text-white w-4 text-center">{qty}</span>
                      <button
                        onClick={() => updateQty(product.id, 1)}
                        className="text-zinc-300 hover:text-lime-300"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-lime-300">
                      ${(product.price * qty).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-zinc-600 hover:text-red-400 self-start"
                  aria-label="Remove item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-zinc-900 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Subtotal</span>
              <span className="font-bold text-white">${cartValue.toFixed(2)}</span>
            </div>
            <button className="w-full rounded-full bg-lime-300 text-zinc-900 font-bold py-3 text-sm hover:bg-lime-200 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
