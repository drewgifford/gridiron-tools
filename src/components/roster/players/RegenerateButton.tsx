import { RefreshCw } from "lucide-react";
import { useState } from "react";
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

export function RegenerateButton({
  count,
  onConfirm,
}: {
  count: number;
  onConfirm: () => void;
}) {
  const [open, setOpen] = useState(false);
  const subject = count === 1 ? "this player" : `${count} players`;

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <RefreshCw />
        Regenerate {count > 0 && "All"}
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Regenerate {count === 1 ? "player" : "players"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are about to regenerate {subject}. This builds{" "}
              {count === 1 ? "a brand new player" : "brand new players"} and
              discards any edits you've made. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>
              Regenerate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
