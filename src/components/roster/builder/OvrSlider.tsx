import { Label } from "@/components/ui/label";
import { ovrAccentClass, ovrBoxClass } from "@/lib/util/ovr-color";
import { cn } from "@/lib/utils";

export function OvrSlider({
  id,
  label,
  value,
  onChange,
  min = 30,
  max = 99,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span
          className={cn(
            "rounded-md px-2 py-0.5 text-sm font-semibold tabular-nums",
            ovrBoxClass(value),
          )}
        >
          {value}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn("h-2 w-full cursor-pointer", ovrAccentClass(value))}
      />
    </div>
  );
}
