import { useApp } from "../../context/AppContext";
import { CATEGORY_META, CATEGORY_COUNTS } from "../../data/products";

export default function CategoryCard({ name }) {
  const { goToShop } = useApp();
  const { image } = CATEGORY_META[name];
  return (
    <button
      onClick={() => goToShop(name)}
      className="rounded-2xl bg-white text-zinc-900 overflow-hidden flex flex-col items-center hover:-translate-y-0.5 transition-transform text-center"
    >
      <img src={image} alt={name} loading="lazy" className="h-24 w-full object-cover" />
      <div className="px-4 py-4">
        <p className="font-bold">{name}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{CATEGORY_COUNTS[name]} items</p>
      </div>
    </button>
  );
}
