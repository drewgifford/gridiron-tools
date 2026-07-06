import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
}

export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  const fillPercent = Math.max(0, Math.min(1, rating / max)) * 100;
  const emptyStars = Array.from({ length: max }, (_, i) => `empty-${i}`);
  const fullStars = Array.from({ length: max }, (_, i) => `full-${i}`);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div
        className="relative inline-flex"
        role="img"
        aria-label={`${rating} out of ${max} stars`}
      >
        <div className="flex text-muted-foreground/30">
          {emptyStars.map((key) => (
            <Star key={key} className="size-4" />
          ))}
        </div>
        <div
          className="absolute inset-0 flex overflow-hidden text-yellow-400"
          style={{ width: `${fillPercent}%` }}
        >
          {fullStars.map((key) => (
            <Star key={key} className="size-4 shrink-0 fill-current" />
          ))}
        </div>
      </div>
      <span className="text-xs text-muted-foreground tabular-nums">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
