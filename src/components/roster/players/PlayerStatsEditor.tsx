import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNumberInput } from "@/lib/client/use-number-input";
import {
  getStatName,
  type PlayerStat,
  type PlayerStats,
  Stats,
} from "@/lib/domain/stats";
import { ovrBoxClass } from "@/lib/util/ovr-color";
import { cn } from "@/lib/utils";

const ALL_STATS = Object.keys(Stats) as PlayerStat[];

function StatInput({
  stat,
  value,
  onChange,
  readOnly,
}: {
  stat: PlayerStat;
  value: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
}) {
  const input = useNumberInput(value, 1, 99, onChange);

  if (readOnly)
    return (
      <div className="flex items-center justify-between gap-2 rounded-md bg-muted/30 px-2 py-1">
        <span className="text-xs font-medium text-muted-foreground">
          {stat}
        </span>
        <span
          className={cn(ovrBoxClass(value), "px-1 rounded-md tabular-nums")}
        >
          {value}
        </span>
      </div>
    );

  return (
    <label
      title={getStatName(stat)}
      className="flex items-center justify-between gap-2 rounded-md bg-muted/30 px-2 py-1"
    >
      <span className="text-xs font-medium text-muted-foreground">{stat}</span>

      <input
        type="number"
        min={1}
        max={99}
        value={input.value}
        onChange={(e) => input.onChange(e.target.value)}
        onBlur={input.onBlur}
        className="w-11 rounded bg-input/50 px-1 py-0.5 text-right text-sm font-semibold tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      />
    </label>
  );
}

export function PlayerStatsEditor({
  stats,
  weightedStats,
  onChange,
  readOnly = false,
}: {
  stats: PlayerStats;
  weightedStats: PlayerStat[];
  onChange: (stats: PlayerStats) => void;
  readOnly?: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const weighted = new Set(weightedStats);
  const otherStats = ALL_STATS.filter((stat) => !weighted.has(stat));
  const set = (stat: PlayerStat, value: number) =>
    onChange({ ...stats, [stat]: value });

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          OVR-driving stats
        </h4>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {weightedStats.map((stat) => (
            <StatInput
              key={stat}
              stat={stat}
              value={stats[stat]}
              onChange={(value) => set(stat, value)}
              readOnly={readOnly}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="flex items-center gap-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase cursor-pointer"
        >
          {showAll ? (
            <ChevronDown className="size-3.5" />
          ) : (
            <ChevronRight className="size-3.5" />
          )}
          All other stats ({otherStats.length})
        </button>
        {showAll && (
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {otherStats.map((stat) => (
              <StatInput
                key={stat}
                stat={stat}
                value={stats[stat]}
                onChange={(value) => set(stat, value)}
                readOnly={readOnly}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
