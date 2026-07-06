"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { DeleteRosterButton } from "@/components/roster/DeleteRosterButton";
import { PlayerEditor } from "@/components/roster/players/PlayerEditor";
import { RosterPlayers } from "@/components/roster/players/RosterPlayers";
import { RosterActions } from "@/components/roster/RosterActions";
import { StarRating } from "@/components/roster/StarRating";
import { Heading1, Text } from "@/components/typography/Heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useIsDesktop } from "@/lib/client/use-is-desktop";
import type { RosterWithAuthor } from "@/lib/db/rosters";
import type { GeneratedPlayer } from "@/lib/roster-generator";
import { ovrBoxClass } from "@/lib/util/ovr-color";
import { cn } from "@/lib/utils";

function OvrBox({ label, value }: { label: string; value: number }) {
  return (
    <div
      className={cn(
        "flex size-20 shrink-0 flex-col items-center justify-center rounded-xl text-3xl font-bold tabular-nums",
        ovrBoxClass(value),
      )}
    >
      {value}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium">{children}</span>
    </div>
  );
}

export function RosterView({
  roster,
  players,
  isOwner,
  likes,
  dislikes,
  userVote,
  isSignedIn,
}: {
  roster: RosterWithAuthor;
  players: GeneratedPlayer[];
  isOwner: boolean;
  likes: number;
  dislikes: number;
  userVote?: "like" | "dislike" | null;
  isSignedIn: boolean;
}) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const isDesktop = useIsDesktop();

  const index = [...selected][0];
  const clear = () => setSelected(new Set());
  const editor =
    index != null ? (
      <PlayerEditor player={players[index]} readOnly onClose={clear} />
    ) : null;

  return (
    <>
      <header className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Heading1>{roster.name}</Heading1>
            {roster.status === "draft" && (
              <Badge
                className={
                  "capitalize text-base p-3 bg-muted text-muted-foreground"
                }
              >
                {roster.status}
              </Badge>
            )}
          </div>
          {roster.description && <Text>{roster.description}</Text>}
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            <Field label="Author">{roster.user?.name ?? "Unknown"}</Field>
            <Field label="Preset">{roster.preset}</Field>
            <Field label="Program rating">
              <StarRating rating={roster.rating} />
            </Field>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            {isOwner && (
              <>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/roster-builder/roster/${roster.id}/edit`}>
                    <Pencil />
                    Edit
                  </Link>
                </Button>
                <DeleteRosterButton
                  rosterId={roster.id}
                  rosterName={roster.name}
                  redirectTo="/roster-builder/my-rosters"
                  label
                />
              </>
            )}
            <RosterActions
              rosterId={roster.id}
              rosterName={roster.name}
              likes={likes}
              dislikes={dislikes}
              userVote={userVote}
              isSignedIn={isSignedIn}
            />
          </div>
          <div className="flex items-center gap-2">
            <OvrBox label="OVR" value={roster.ovr} />
            <OvrBox label="OFF" value={roster.offenseOvr} />
            <OvrBox label="DEF" value={roster.defenseOvr} />
          </div>
        </div>
      </header>

      {isDesktop ? (
        <div className="grid grid-cols-[1fr_minmax(360px,420px)] gap-6">
          <RosterPlayers
            players={players}
            selected={selected}
            onSelectionChange={setSelected}
            readOnly
          />
          <div
            className={cn(
              "sticky top-4 self-start rounded-2xl",
              editor
                ? "max-h-[calc(100vh-2rem)] overflow-y-auto border bg-card p-4"
                : "border border-dashed p-10 text-center text-sm text-muted-foreground",
            )}
          >
            {editor ?? "Select a player to view their details."}
          </div>
        </div>
      ) : (
        <>
          <RosterPlayers
            players={players}
            selected={selected}
            onSelectionChange={setSelected}
            readOnly
          />
          <Sheet
            open={index != null}
            onOpenChange={(open) => {
              if (!open) clear();
            }}
          >
            <SheetContent
              side="right"
              className="w-full overflow-y-auto p-4 sm:max-w-md"
            >
              <SheetTitle className="sr-only">Player details</SheetTitle>
              {editor}
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
}
