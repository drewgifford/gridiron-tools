import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  getStatName,
  type PlayerStat,
  type PlayerStats,
  Stats,
} from "@/lib/domain/stats";
import { clamp } from "@/lib/util/random";

const ALL_STATS = Object.keys(Stats) as PlayerStat[];

function StatInput({
  stat,
  value,
  onChange,
}: {
  stat: PlayerStat;
  value: number;
  onChange: (value: number) => void;
}) {
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
        value={value}
        onChange={(e) =>
          onChange(clamp(Math.round(Number(e.target.value) || 0), 1, 99))
        }
        className="w-11 rounded bg-input/50 px-1 py-0.5 text-right text-sm font-semibold tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      />
    </label>
  );
}

export function PlayerStatsEditor({
  stats,
  weightedStats,
  onChange,
}: {
  stats: PlayerStats;
  weightedStats: PlayerStat[];
  onChange: (stats: PlayerStats) => void;
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
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="flex items-center gap-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
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
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
