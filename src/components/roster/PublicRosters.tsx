"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useId, useRef } from "react";
import { RosterCard } from "@/components/roster/RosterCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MAX_PUBLIC_ROSTERS,
  ROSTER_SORTS,
  type RosterSort,
} from "@/lib/rosters";
import type { Roster } from "@/lib/schema/roster";

const ALL_PRESETS = "all";

export function PublicRosters({
  rosters,
  presets,
  query,
  preset,
  sort,
  isSignedIn,
}: {
  rosters: Roster[];
  presets: string[];
  query: string;
  preset: string;
  sort: RosterSort;
  isSignedIn: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounce = useRef<ReturnType<typeof setTimeout>>(undefined);

  const searchId = useId();
  const presetId = useId();
  const sortId = useId();

  // Push an updated query string; the server re-queries and streams new rosters.
  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.replace(`${pathname}?${params}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const onSearch = (value: string) => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => setParam("q", value), 300);
  };

  const atLimit = rosters.length >= MAX_PUBLIC_ROSTERS;

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
              defaultValue={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search by name or preset"
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
          <Select
            value={preset || ALL_PRESETS}
            onValueChange={(v) =>
              setParam("preset", v === ALL_PRESETS ? "" : v)
            }
          >
            <SelectTrigger id={presetId} className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_PRESETS}>All presets</SelectItem>
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
          <Select value={sort} onValueChange={(v) => setParam("sort", v)}>
            <SelectTrigger id={sortId} className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ROSTER_SORTS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </search>

      <p aria-live="polite" className="text-sm text-muted-foreground">
        Showing {rosters.length} roster{rosters.length === 1 ? "" : "s"}
        {atLimit &&
          ` (max ${MAX_PUBLIC_ROSTERS} - refine your search to narrow)`}
      </p>

      {rosters.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rosters.map((roster) => (
            <RosterCard
              key={roster.id}
              roster={roster}
              isSignedIn={isSignedIn}
            />
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
