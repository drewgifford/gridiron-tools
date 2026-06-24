import { Computer, User, Verified } from "lucide-react";
import Link from "next/link";
import { RosterActions } from "@/components/roster/RosterActions";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Roster } from "@/lib/schema/roster";
import { ovrBoxClass } from "@/lib/util/ovr-color";
import { cn } from "@/lib/utils";
import { Text } from "../typography/Heading";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl py-2",
        ovrBoxClass(value),
      )}
    >
      <span className="text-xl font-semibold tabular-nums">{value}</span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function RosterCard({
  roster,
  isSignedIn,
}: {
  roster: Roster;
  isSignedIn: boolean;
}) {
  return (
    <Card
      size="sm"
      className="relative cursor-pointer transition-shadow hover:outline hover:outline-primary/20 dark:hover:ring-primary/40"
    >
      <CardHeader>
        <CardTitle className="text-base">
          <Link
            href={`/roster-builder/roster/${roster.id}`}
            className="after:absolute after:inset-0"
          >
            {roster.name}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Badge variant="secondary">{roster.preset}</Badge>
          {roster.status === "draft" && (
            <Badge className="bg-muted text-muted-foreground">Draft</Badge>
          )}
          {roster.user ? (
            <span className="flex items-center gap-1">
              <User className="size-3.5" />
              {roster.user.name}
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Computer className="size-3.5" />
              gridiron.tools <Verified className="w-4 h-4 text-primary" />
            </span>
          )}
        </CardDescription>
        <CardAction>
          <div className="relative z-10">
            <RosterActions
              rosterId={roster.id}
              rosterName={roster.name}
              likes={roster.likes}
              dislikes={roster.dislikes}
              userVote={roster.userVote}
              isSignedIn={isSignedIn}
            />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        {roster.description && (
          <Text className="text-sm text-muted-foreground mb-2">
            {roster.description}
          </Text>
        )}

        <div className="grid grid-cols-3 gap-2">
          <Stat label="OVR" value={roster.ovr} />
          <Stat label="Offense" value={roster.offenseOvr} />
          <Stat label="Defense" value={roster.defenseOvr} />
        </div>

        <Text className="text-xs text-muted-foreground my-2!">
          Edited {formatDate(roster.updatedAt)}
        </Text>
      </CardContent>
    </Card>
  );
}
