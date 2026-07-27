export default function ProductThumb({ product, className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-zinc-200 ${className}`}>
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
