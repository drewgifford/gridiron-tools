import { useState } from "react";
import { clamp } from "@/lib/util/random";

/**
 * Controlled numeric input helper. Lets the user clear or partially edit the
 * field without it snapping to the floor; commits a rounded, clamped number
 * only for valid input and normalizes the display on blur.
 */
export function useNumberInput(
  value: number,
  min: number,
  max: number,
  onCommit: (value: number) => void,
) {
  const [draft, setDraft] = useState<string | null>(null);

  return {
    value: draft ?? String(value),
    onChange: (raw: string) => {
      setDraft(raw);
      if (raw.trim() === "") return;
      const parsed = Number(raw);
      if (Number.isNaN(parsed)) return;
      onCommit(clamp(Math.round(parsed), min, max));
    },
    onBlur: () => setDraft(null),
  };
}
