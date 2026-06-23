"use client";

import { Search } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { RosterCard } from "@/components/roster/RosterCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Roster } from "@/lib/rosters";

const SORTS = {
  recent: {
    label: "Recently edited",
    compare: (a: Roster, b: Roster) => b.updatedAt.localeCompare(a.updatedAt),
  },
  likes: {
    label: "Most liked",
    compare: (a: Roster, b: Roster) => b.likes - a.likes,
  },
  rating: {
    label: "Highest rated",
    compare: (a: Roster, b: Roster) => b.rating - a.rating,
  },
  ovr: {
    label: "Highest OVR",
    compare: (a: Roster, b: Roster) => b.ovr - a.ovr,
  },
  name: {
    label: "Name (A–Z)",
    compare: (a: Roster, b: Roster) => a.name.localeCompare(b.name),
  },
} satisfies Record<
  string,
  { label: string; compare: (a: Roster, b: Roster) => number }
>;

type SortKey = keyof typeof SORTS;

export function PublicRosters({ rosters }: { rosters: Roster[] }) {
  const [query, setQuery] = useState("");
  const [preset, setPreset] = useState("all");
  const [sort, setSort] = useState<SortKey>("recent");

  const searchId = useId();
  const presetId = useId();
  const sortId = useId();

  const presets = useMemo(
    () => Array.from(new Set(rosters.map((r) => r.preset))).sort(),
    [rosters],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rosters
      .filter((r) => preset === "all" || r.preset === preset)
      .filter(
        (r) =>
          q === "" ||
          r.name.toLowerCase().includes(q) ||
          r.preset.toLowerCase().includes(q) ||
          (r.author?.toLowerCase().includes(q) ?? false),
      )
      .sort(SORTS[sort].compare);
  }, [rosters, query, preset, sort]);

  return (
    <div className="flex flex-col gap-4">
      <search className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor={searchId} className="sr-only">
            Search public rosters
          </label>
          <div className="relative">
            <Search
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, preset, or creator"
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={presetId}
            className="text-xs font-medium text-muted-foreground"
          >
            Preset
          </label>
          <Select value={preset} onValueChange={setPreset}>
            <SelectTrigger id={presetId} className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All presets</SelectItem>
              {presets.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={sortId}
            className="text-xs font-medium text-muted-foreground"
          >
            Sort by
          </label>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger id={sortId} className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SORTS).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </search>

      <p aria-live="polite" className="text-sm text-muted-foreground">
        Showing {results.length} of {rosters.length} rosters
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((roster) => (
            <RosterCard key={roster.id} roster={roster} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No public rosters match your search.
        </div>
      )}
    </div>
  );
}
