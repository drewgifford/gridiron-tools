import { Computer, User, Verified } from "lucide-react";
import Link from "next/link";
import { RosterActions } from "@/components/roster/RosterActions";
import { StarRating } from "@/components/roster/StarRating";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Roster } from "@/lib/schema/roster";
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

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-muted/40 py-2">
      <span
        className={cn(
          "text-xl font-semibold tabular-nums",
          highlight && "text-primary",
        )}
      >
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function RosterCard({ roster }: { roster: Roster }) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-base">
          <Link
            href={`/roster-creator/${roster.id}`}
            className="hover:underline"
          >
            {roster.name}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Badge variant="secondary">{roster.preset}</Badge>
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
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-muted-foreground">
              Program rating
            </span>
            <StarRating rating={roster.rating} />
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
          <Stat label="OVR" value={roster.ovr} highlight />
          <Stat label="Offense" value={roster.offenseOvr} />
          <Stat label="Defense" value={roster.defenseOvr} />
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t">
        <span className="text-xs text-muted-foreground">
          Edited {formatDate(roster.updatedAt)}
        </span>
        <RosterActions roster={roster} />
      </CardFooter>
    </Card>
  );
}
