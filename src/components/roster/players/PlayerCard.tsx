import { BicepsFlexed, Brain, Star } from "lucide-react";
import Image from "next/image";
import type { ComponentType } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { GeneratedPlayer } from "@/lib/roster-generator";
import { getKeyStats } from "@/lib/roster-generator/stats";
import {
  ABILITY_TIER_CLASSES,
  ABILITY_TIER_LABELS,
  tierIndex,
} from "@/lib/util/ability-tier";
import { ovrBoxClass } from "@/lib/util/ovr-color";
import { getPlayerHeadUrl } from "@/lib/util/player-heads";
import { cn } from "@/lib/utils";

function formatHeight(inches: number) {
  return `${Math.floor(inches / 12)}'${inches % 12}"`;
}

function StatBox({
  code,
  value,
  className,
}: {
  code: string;
  value: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-16 h-16 flex-col items-center rounded-lg bg-muted/40 py-1 justify-center",
        className,
      )}
    >
      <span className="text-xs font-medium tracking-wide text-muted-foreground">
        {code}
      </span>
      <span className="text-base font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function AbilityBadge({
  name,
  level,
  icon: Icon,
}: {
  name: string;
  level: number;
  icon: ComponentType<{ className?: string }>;
}) {
  const tier = tierIndex(level);
  return (
    <span
      title={`${name} · ${ABILITY_TIER_LABELS[tier]}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border px-1.5 py-0.5 text-xs font-medium",
        ABILITY_TIER_CLASSES[tier],
      )}
    >
      <Icon className="size-3 shrink-0" />
      {name}
    </span>
  );
}

export type ClickModifiers = {
  shiftKey: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
};

export function PlayerCard({
  player,
  selected = false,
  onClick,
  checked,
  onCheckedChange,
}: {
  player: GeneratedPlayer;
  selected?: boolean;
  onClick?: (modifiers: ClickModifiers) => void;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const meta = [player.classYear, player.devTrait, player.archetype]
    .filter(Boolean)
    .join(" • ");
  const keyStats = getKeyStats(player.position, player.archetype);
  const stars = Array.from({ length: player.hsStarRating ?? 0 }, (_, i) => i);
  const physicalAbilities = player.physicalAbilities ?? [];
  const mentalAbilities = player.mentalAbilities ?? [];
  const hasAbilities =
    physicalAbilities.length > 0 || mentalAbilities.length > 0;
  const interactive = onClick != null;

  return (
    <Card
      size="sm"
      onClick={onClick ? (e) => onClick(e) : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(e);
              }
            }
          : undefined
      }
      className={cn(
        interactive &&
          "cursor-pointer transition-shadow hover:outline hover:outline-primary/20 dark:hover:ring-primary/40",
        selected && "outline outline-primary/50",
      )}
    >
      <CardContent className="flex flex-col gap-2.5">
        <div className="flex items-center gap-3">
          {onCheckedChange && (
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => onCheckedChange(value === true)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              aria-label={`Select ${player.firstName} ${player.lastName}`}
            />
          )}
          <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted/40">
            <Image
              src={getPlayerHeadUrl(player)}
              alt=""
              width={64}
              height={64}
              unoptimized
              className="size-full object-contain object-top"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <Badge className="shrink-0 bg-primary/15 text-primary">
                {player.position} • #{player.jerseyNumber}
              </Badge>
              <span className="min-w-0 flex-1 truncate font-semibold">
                {player.firstName} {player.lastName}
                <span className="inline-flex shrink-0 ml-2">
                  {stars.map((i) => (
                    <Star
                      key={`star-${i}`}
                      className="size-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </span>
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
              <span className="truncate">
                {meta} • {formatHeight(player.heightInches)} •{" "}
                {player.weightLbs}
                lbs
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {hasAbilities ? (
                <>
                  {physicalAbilities.map((ability) => (
                    <AbilityBadge
                      key={`physical-${ability.name}`}
                      name={ability.name}
                      level={ability.level}
                      icon={BicepsFlexed}
                    />
                  ))}
                  {mentalAbilities.map((ability) => (
                    <AbilityBadge
                      key={`mental-${ability.name}`}
                      name={ability.name}
                      level={ability.level}
                      icon={Brain}
                    />
                  ))}
                </>
              ) : (
                <span className="text-muted-foreground/50 italic">
                  No abilities
                </span>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <StatBox
              code="OVR"
              value={player.overall}
              className={ovrBoxClass(player.overall)}
            />
            {keyStats.length > 0 && (
              <div className="hidden items-center gap-1.5 lg:flex">
                {keyStats.map((stat) => (
                  <StatBox key={stat} code={stat} value={player.stats[stat]} />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
