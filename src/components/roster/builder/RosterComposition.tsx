import { Badge } from "@/components/ui/badge";
import {
  type RosterPreset,
  RosterPresetData,
} from "@/data/roster-generator/presets";
import { RosterPositionUnitGroups } from "@/lib/domain/positions";
import { cn } from "@/lib/utils";

export function RosterComposition({ preset }: { preset: RosterPreset }) {
  const counts = RosterPresetData[preset];
  const units = RosterPositionUnitGroups.map((unit) => {
    const groups = unit.groups.map((group) => ({
      label: group.label,
      count: group.positions.reduce((sum, pos) => sum + counts[pos], 0),
    }));
    return {
      label: unit.unit,
      groups,
      total: groups.reduce((sum, group) => sum + group.count, 0),
    };
  });
  const total = units.reduce((sum, unit) => sum + unit.total, 0);

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-muted/40 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Roster composition</span>
        <span className="text-sm text-muted-foreground tabular-nums">
          {total} players
        </span>
      </div>
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {unit.label}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {unit.total}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {unit.groups.map((group) => (
              <Badge
                key={group.label}
                variant="secondary"
                className={cn(group.count === 0 && "opacity-40")}
              >
                {group.label}
                <span className="text-muted-foreground tabular-nums">
                  {group.count}
                </span>
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
