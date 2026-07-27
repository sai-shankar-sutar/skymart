import { Star } from "lucide-react";

export default function StarRating({ rating, size = 12 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "fill-lime-300 text-lime-300" : "text-zinc-700"}
        />
      ))}
    </div>
  );
}
