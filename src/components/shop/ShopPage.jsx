import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { PRODUCTS, CATEGORY_META } from "../../data/products";
import Dropdown from "../common/Dropdown";
import ProductCard from "./ProductCard";

const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Highest Rated" },
  { key: "name", label: "Name: A to Z" },
];

export default function ShopPage() {
  const { shopCategory } = useApp();
  const [query, setQuery] = useState("");
  // Seeded from context so arriving via a category card (or "View All" /
  // "See all") opens already filtered to the right category.
  const [category, setCategory] = useState(shopCategory);
  const [sort, setSort] = useState("featured");

  const categoryOptions = [
    { key: "all", label: "All Categories" },
    ...Object.keys(CATEGORY_META).map((c) => ({ key: c, label: c })),
  ];

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesQuery && matchesCategory;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }, [query, category, sort]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-1">All Products</h1>
      <p className="text-zinc-500 mb-6">{filtered.length} products found</p>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 mb-8 flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3">
          <Search size={15} className="text-zinc-500 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
          />
        </div>
        <Dropdown value={category} options={categoryOptions} onChange={setCategory} />
        <Dropdown value={sort} options={SORT_OPTIONS} onChange={setSort} width="w-52" />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-400 font-semibold mb-1">No products match your search.</p>
          <p className="text-zinc-600 text-sm">Try a different keyword or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
