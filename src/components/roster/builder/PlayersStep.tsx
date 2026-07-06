import { useState } from "react";
import { BulkPlayerEditor } from "@/components/roster/players/BulkPlayerEditor";
import { PlayerEditor } from "@/components/roster/players/PlayerEditor";
import { RosterPlayers } from "@/components/roster/players/RosterPlayers";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { TabsContent } from "@/components/ui/tabs";
import { useIsDesktop } from "@/lib/client/use-is-desktop";
import type { GeneratedPlayer } from "@/lib/roster-generator";
import { cn } from "@/lib/utils";

export function PlayersStep({
  players,
  onUpdatePlayer,
  onUpdatePlayers,
  onRegeneratePlayers,
}: {
  players: GeneratedPlayer[];
  onUpdatePlayer: (index: number, next: GeneratedPlayer) => void;
  onUpdatePlayers: (
    indices: number[],
    mutate: (player: GeneratedPlayer) => GeneratedPlayer,
  ) => void;
  onRegeneratePlayers: (indices: number[]) => void;
}) {
  const [selected, setSelected] = useState<Set<number>>(() => new Set());
  const isDesktop = useIsDesktop();

  const clear = () => setSelected(new Set());
  const indices = [...selected]
    .filter((i) => i < players.length)
    .sort((a, b) => a - b);

  const editor =
    indices.length === 1 ? (
      <PlayerEditor
        player={players[indices[0]]}
        onChange={(next) => onUpdatePlayer(indices[0], next)}
        onRegenerate={() => onRegeneratePlayers(indices)}
        onClose={clear}
      />
    ) : indices.length > 1 ? (
      <BulkPlayerEditor
        players={players}
        indices={indices}
        onApply={(mutate) => onUpdatePlayers(indices, mutate)}
        onRegenerate={() => onRegeneratePlayers(indices)}
        onClose={clear}
      />
    ) : null;

  return (
    <TabsContent value="players" className="flex flex-col gap-4">
      {players.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No players yet. Use “Generate players” to fill out the depth chart.
        </div>
      ) : isDesktop ? (
        <div className="grid grid-cols-[1fr_minmax(360px,420px)] gap-6">
          <RosterPlayers
            players={players}
            selected={selected}
            onSelectionChange={setSelected}
          />

          <div
            className={cn(
              "sticky top-4 self-start rounded-2xl",
              editor
                ? "max-h-[calc(100vh-8rem)] overflow-y-auto border bg-card p-4"
                : "border border-dashed p-10 text-center text-sm text-muted-foreground",
            )}
          >
            {editor ??
              "Select a player to edit. Shift or ctrl-click for multiple"}
          </div>
        </div>
      ) : (
        <>
          <RosterPlayers
            players={players}
            selected={selected}
            onSelectionChange={setSelected}
          />
          <Sheet
            open={indices.length > 0}
            onOpenChange={(open) => {
              if (!open) clear();
            }}
          >
            <SheetContent
              side="right"
              className="w-full overflow-y-auto p-4 sm:max-w-md"
            >
              <SheetTitle className="sr-only">Edit players</SheetTitle>
              {editor}
            </SheetContent>
          </Sheet>
        </>
      )}
    </TabsContent>
  );
}
