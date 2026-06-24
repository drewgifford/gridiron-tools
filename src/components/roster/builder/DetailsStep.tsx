import { ArrowRight } from "lucide-react";
import { StarRatingInput } from "@/components/roster/builder/StarRatingInput";
import type { RosterDetails } from "@/components/roster/builder/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function DetailsStep({
  value,
  onChange,
  onNext,
}: {
  value: RosterDetails;
  onChange: (value: RosterDetails) => void;
  onNext: () => void;
}) {
  const valid = value.name.trim().length > 0;

  return (
    <TabsContent value="details" className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Roster details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="roster-name">Name</Label>
            <Input
              id="roster-name"
              placeholder="Name your roster..."
              value={value.name}
              onChange={(e) => onChange({ ...value, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Program star rating</Label>
            <StarRatingInput
              value={value.starRating}
              onChange={(starRating) => onChange({ ...value, starRating })}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="roster-description">Description</Label>
            <Textarea
              id="roster-description"
              placeholder="Describe your roster..."
              value={value.description}
              onChange={(e) =>
                onChange({ ...value, description: e.target.value })
              }
            />
          </div>
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
