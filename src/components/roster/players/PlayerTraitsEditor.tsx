import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dealbreakers,
  DevTraits,
  Handednesses,
  PlayerPotentials,
  PlayerYears,
} from "@/lib/domain/player-traits";
import type { GeneratedPlayer } from "@/lib/roster-generator";
import { clamp } from "@/lib/util/random";

function formatHeight(inches: number) {
  return `${Math.floor(inches / 12)}'${inches % 12}"`;
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  readOnly,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>

      {readOnly ? (
        <span>{value}</span>
      ) : (
        <Select value={value} onValueChange={(v) => onChange(v as T)}>
          <SelectTrigger className="h-8 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  hint,
  onChange,
  readOnly,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  hint?: string;
  onChange: (value: number) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xs text-muted-foreground">
        {label}
        {hint ? (
          <span className="text-muted-foreground/60"> · {hint}</span>
        ) : null}
      </Label>

      {readOnly ? (
        <span>{value}</span>
      ) : (
        <Input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) =>
            onChange(clamp(Math.round(Number(e.target.value) || 0), min, max))
          }
        />
      )}
    </div>
  );
}

export function PlayerTraitsEditor({
  player,
  onChange,
  readOnly,
}: {
  player: GeneratedPlayer;
  onChange: (patch: Partial<GeneratedPlayer>) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <SelectField
          label="Class"
          value={player.classYear ?? "FR"}
          options={PlayerYears}
          onChange={(classYear) => onChange({ classYear })}
          readOnly={readOnly}
        />
        <NumberField
          label="Jersey #"
          value={player.jerseyNumber}
          min={0}
          max={99}
          onChange={(jerseyNumber) => onChange({ jerseyNumber })}
          readOnly={readOnly}
        />
        <NumberField
          label="Age"
          value={player.age ?? 18}
          min={16}
          max={30}
          onChange={(age) => onChange({ age })}
          readOnly={readOnly}
        />
        <NumberField
          label="Height"
          value={player.heightInches}
          min={60}
          max={90}
          hint={formatHeight(player.heightInches)}
          onChange={(heightInches) => onChange({ heightInches })}
          readOnly={readOnly}
        />
        <NumberField
          label="Weight"
          value={player.weightLbs}
          min={150}
          max={400}
          hint="lbs"
          onChange={(weightLbs) => onChange({ weightLbs })}
          readOnly={readOnly}
        />
        <SelectField
          label="Handedness"
          value={player.handedness ?? "Right"}
          options={Handednesses}
          onChange={(handedness) => onChange({ handedness })}
          readOnly={readOnly}
        />
        <NumberField
          label="HS stars"
          value={player.hsStarRating ?? 1}
          min={1}
          max={5}
          onChange={(hsStarRating) => onChange({ hsStarRating })}
          readOnly={readOnly}
        />
        <SelectField
          label="Dev trait"
          value={player.devTrait ?? "Normal"}
          options={DevTraits}
          onChange={(devTrait) => onChange({ devTrait })}
          readOnly={readOnly}
        />
        <SelectField
          label="Potential"
          value={player.potential ?? "Low"}
          options={PlayerPotentials}
          onChange={(potential) => onChange({ potential })}
          readOnly={readOnly}
        />
        <div className="col-span-2">
          <SelectField
            label="Dealbreaker"
            value={player.dealbreaker ?? "None"}
            options={Dealbreakers}
            onChange={(dealbreaker) => onChange({ dealbreaker })}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
}
