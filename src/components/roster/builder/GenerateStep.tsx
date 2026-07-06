import { ArrowRight, Check, Cog, Loader2 } from "lucide-react";
import { useState } from "react";
import { OvrSlider } from "@/components/roster/builder/OvrSlider";
import { RosterComposition } from "@/components/roster/builder/RosterComposition";
import type {
  GenerateConfig,
  GenerationStatus,
} from "@/components/roster/builder/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import {
  type RosterPreset,
  RosterPresets,
} from "@/data/roster-generator/presets";
import {
  type DefenseScheme,
  DefenseSchemes,
  type OffenseScheme,
  OffenseSchemes,
} from "@/data/roster-generator/schemes";

const ovrInRange = (ovr: number) => ovr >= 30 && ovr <= 99;

export function GenerateStep({
  value,
  onChange,
  onGenerate,
  onNext,
  status,
  generatedCount,
}: {
  value: GenerateConfig;
  onChange: (value: GenerateConfig) => void;
  onGenerate: () => void;
  onNext: () => void;
  status: GenerationStatus;
  generatedCount: number;
}) {
  const valid =
    value.preset !== "" &&
    ovrInRange(value.targetOffenseOvr) &&
    ovrInRange(value.targetDefenseOvr);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const requestGenerate = () => {
    if (generatedCount > 0) setConfirmOpen(true);
    else onGenerate();
  };

  return (
    <TabsContent value="generate" className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate players</CardTitle>
          <CardDescription>
            Pick a preset, set target overalls, and choose schemes to weight the
            archetypes generated at each position.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="roster-preset">Preset</Label>
              <Select
                value={value.preset}
                onValueChange={(v) =>
                  onChange({ ...value, preset: v as RosterPreset })
                }
              >
                <SelectTrigger id="roster-preset" className="w-full">
                  <SelectValue placeholder="Select a preset" />
                </SelectTrigger>
                <SelectContent>
                  {RosterPresets.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="offensive-scheme">Offensive scheme</Label>
              <Select
                value={value.offensiveScheme}
                onValueChange={(v) =>
                  onChange({ ...value, offensiveScheme: v as OffenseScheme })
                }
              >
                <SelectTrigger id="offensive-scheme" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OffenseSchemes.map((scheme) => (
                    <SelectItem key={scheme} value={scheme}>
                      {scheme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <OvrSlider
              id="target-offense-ovr"
              label="Target offensive OVR"
              value={value.targetOffenseOvr}
              onChange={(targetOffenseOvr) =>
                onChange({ ...value, targetOffenseOvr })
              }
            />

            <div className="flex flex-col gap-2">
              <Label htmlFor="defensive-scheme">Defensive scheme</Label>
              <Select
                value={value.defensiveScheme}
                onValueChange={(v) =>
                  onChange({ ...value, defensiveScheme: v as DefenseScheme })
                }
              >
                <SelectTrigger id="defensive-scheme" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DefenseSchemes.map((scheme) => (
                    <SelectItem key={scheme} value={scheme}>
                      {scheme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <OvrSlider
              id="target-defense-ovr"
              label="Target defensive OVR"
              value={value.targetDefenseOvr}
              onChange={(targetDefenseOvr) =>
                onChange({ ...value, targetDefenseOvr })
              }
            />
          </div>

          {value.preset !== "" && <RosterComposition preset={value.preset} />}

          <div className="flex items-center justify-end gap-3">
            {status === "done" && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-500">
                <Check className="size-4" />
                Generated {generatedCount} players
              </span>
            )}
            <Button
              variant="secondary"
              disabled={!valid || status === "generating"}
              onClick={requestGenerate}
            >
              {status === "generating" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Cog />
              )}
              Generate players
            </Button>
          </div>

          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Regenerate players?</AlertDialogTitle>
                <AlertDialogDescription>
                  This roster already has {generatedCount} players. Regenerating
                  builds a brand-new set and discards any edits you've made to
                  the current players. This can't be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onGenerate}>
                  Overwrite &amp; regenerate
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button disabled={!valid} onClick={onNext}>
          Next
          <ArrowRight />
        </Button>
      </div>
    </TabsContent>
  );
}
