import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type HalfState = "empty" | "solid" | "add" | "remove";

const HALF_CLASS: Record<Exclude<HalfState, "empty">, string> = {
  // Committed selection.
  solid: "text-yellow-400",
  // Hover preview, both directions (added or removed) — dimmed.
  add: "text-yellow-400/25",
  remove: "text-yellow-400/25",
};

function StarHalf({
  side,
  state,
}: {
  side: "left" | "right";
  state: HalfState;
}) {
  if (state === "empty") return null;
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-y-0 w-1/2 overflow-hidden",
        side === "left" ? "left-0" : "right-0",
      )}
    >
      <Star
        strokeWidth={0}
        className={cn(
          "absolute top-0 size-6 fill-current transition-colors",
          side === "left" ? "left-0" : "right-0",
          HALF_CLASS[state],
        )}
      />
    </div>
  );
}

export function StarRatingInput({
  value,
  onChange,
  max = 5,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const active = hover ?? value;
  const lo = Math.min(active, value);
  const hi = Math.max(active, value);
  const diffState: HalfState =
    hover === null ? "empty" : hover > value ? "add" : "remove";

  const halfState = (halfValue: number): HalfState => {
    if (halfValue <= lo) return "solid";
    if (halfValue <= hi) return diffState;
    return "empty";
  };

  return (
    <div
      className="flex h-8 items-center gap-2.5"
      role="radiogroup"
      aria-label="Program star rating"
      onMouseLeave={() => setHover(null)}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => {
          const leftValue = star - 0.5;
          return (
            <div key={star} className="relative size-6">
              <Star
                strokeWidth={0}
                className="pointer-events-none size-6 fill-current text-muted-foreground/30"
              />
              <StarHalf side="left" state={halfState(leftValue)} />
              <StarHalf side="right" state={halfState(star)} />
              <button
                type="button"
                aria-label={`${leftValue} stars`}
                onMouseEnter={() => setHover(leftValue)}
                onClick={() => onChange(leftValue)}
                className="absolute inset-y-0 left-0 w-1/2 cursor-pointer rounded-l-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
              <button
                type="button"
                aria-label={`${star} stars`}
                onMouseEnter={() => setHover(star)}
                onClick={() => onChange(star)}
                className="absolute inset-y-0 right-0 w-1/2 cursor-pointer rounded-r-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>
          );
        })}
      </div>
      <span className="text-sm font-semibold text-foreground tabular-nums">
        {active.toFixed(1)}
        <span className="font-normal text-muted-foreground"> / {max}</span>
      </span>
    </div>
  );
}
