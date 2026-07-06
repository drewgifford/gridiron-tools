import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  type ClickModifiers,
  PlayerCard,
} from "@/components/roster/players/PlayerCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getPositionGroup,
  type PositionGroupId,
  RosterPositionGroups,
} from "@/lib/domain/positions";
import type { GeneratedPlayer } from "@/lib/roster-generator";

type GroupFilter = PositionGroupId | "All";

const SORT_OPTIONS = [
  { value: "overall-desc", label: "Overall (high to low)" },
  { value: "overall-asc", label: "Overall (low to high)" },
  { value: "name", label: "Name (A–Z)" },
  { value: "depth", label: "Depth chart" },
] as const;
type SortKey = (typeof SORT_OPTIONS)[number]["value"];

function comparePlayers(a: GeneratedPlayer, b: GeneratedPlayer, sort: SortKey) {
  switch (sort) {
    case "overall-desc":
      return b.overall - a.overall;
    case "overall-asc":
      return a.overall - b.overall;
    case "name":
      return (
        a.lastName.localeCompare(b.lastName) ||
        a.firstName.localeCompare(b.firstName)
      );
    case "depth":
      return a.depthOrder - b.depthOrder;
  }
}

function matchesQuery(player: GeneratedPlayer, query: string) {
  if (!query) return true;
  const name = `${player.firstName} ${player.lastName}`.toLowerCase();
  return name.includes(query) || player.position.toLowerCase().includes(query);
}

function matchesGroup(player: GeneratedPlayer, group: GroupFilter) {
  return group === "All" || getPositionGroup(player.position).id === group;
}

export function RosterPlayers({
  players,
  selected,
  onSelectionChange,
  readOnly = false,
}: {
  players: GeneratedPlayer[];
  selected: Set<number>;
  onSelectionChange: (next: Set<number>) => void;
  readOnly?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState<GroupFilter>("All");
  const [sort, setSort] = useState<SortKey>("overall-desc");
  const [anchor, setAnchor] = useState<number | null>(null);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byGroup = new Map<
      string,
      { player: GeneratedPlayer; index: number }[]
    >();

    players.forEach((player, index) => {
      if (!matchesGroup(player, groupFilter) || !matchesQuery(player, q))
        return;
      const { id } = getPositionGroup(player.position);
      const list = byGroup.get(id);
      if (list) list.push({ player, index });
      else byGroup.set(id, [{ player, index }]);
    });

    return RosterPositionGroups.flatMap((group) => {
      const entries = byGroup.get(group.id);
      if (!entries) return [];
      return {
        id: group.id,
        name: group.name,
        entries: entries.sort((a, b) =>
          comparePlayers(a.player, b.player, sort),
        ),
      };
    });
  }, [players, query, groupFilter, sort]);

  const orderedIndices = useMemo(
    () => groups.flatMap((group) => group.entries.map((entry) => entry.index)),
    [groups],
  );

  const select = (index: number, modifiers: ClickModifiers) => {
    const next = new Set(selected);
    if (
      modifiers.shiftKey &&
      anchor != null &&
      orderedIndices.includes(anchor)
    ) {
      const from = orderedIndices.indexOf(anchor);
      const to = orderedIndices.indexOf(index);
      const [lo, hi] = from <= to ? [from, to] : [to, from];
      for (let i = lo; i <= hi; i++) next.add(orderedIndices[i]);
    } else if (modifiers.metaKey || modifiers.ctrlKey) {
      next.has(index) ? next.delete(index) : next.add(index);
      setAnchor(index);
    } else {
      next.clear();
      next.add(index);
      setAnchor(index);
    }
    onSelectionChange(next);
  };

  const toggle = (index: number) => {
    const next = new Set(selected);
    next.has(index) ? next.delete(index) : next.add(index);
    setAnchor(index);
    onSelectionChange(next);
  };

  const setMany = (indices: number[], include: boolean) => {
    const next = new Set(selected);
    for (const index of indices) include ? next.add(index) : next.delete(index);
    onSelectionChange(next);
  };

  const allVisibleSelected =
    orderedIndices.length > 0 && orderedIndices.every((i) => selected.has(i));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or position…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select
          value={groupFilter}
          onValueChange={(v) => setGroupFilter(v as GroupFilter)}
        >
          <SelectTrigger className="sm:w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All positions</SelectItem>
            {RosterPositionGroups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.id} · {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="sm:w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!readOnly && orderedIndices.length > 0 && (
        <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/20 px-3 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox
              checked={allVisibleSelected}
              onCheckedChange={(v) => setMany(orderedIndices, v === true)}
              aria-label="Select all visible players"
            />
            Select all ({orderedIndices.length})
          </div>
          {selected.size > 0 && (
            <div className="flex items-center gap-3 h-2">
              <span className="text-sm font-medium tabular-nums">
                {selected.size} selected
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onSelectionChange(new Set())}
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      )}

      {groups.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No players match your search.
        </div>
      ) : (
        <div className="flex flex-col gap-6 select-none">
          {groups.map((group) => (
            <section key={group.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                {!readOnly && (
                  <Checkbox
                    checked={group.entries.every((e) => selected.has(e.index))}
                    onCheckedChange={(v) =>
                      setMany(
                        group.entries.map((e) => e.index),
                        v === true,
                      )
                    }
                    aria-label={`Select all ${group.name}`}
                  />
                )}
                <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  {group.name}
                </h3>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {group.entries.length}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {group.entries.map(({ player, index }) => (
                  <PlayerCard
                    key={index}
                    player={player}
                    selected={selected.has(index)}
                    checked={readOnly ? undefined : selected.has(index)}
                    onCheckedChange={readOnly ? undefined : () => toggle(index)}
                    onClick={(modifiers) =>
                      readOnly
                        ? onSelectionChange(new Set([index]))
                        : select(index, modifiers)
                    }
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
