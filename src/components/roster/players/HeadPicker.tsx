import Image from "next/image";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getPlayerHeadUrl,
  HEADS_PER_SKIN_TONE,
  SKIN_TONE_COUNT,
} from "@/lib/util/player-heads";
import { cn } from "@/lib/utils";

const SKIN_TONES = Array.from({ length: SKIN_TONE_COUNT }, (_, i) => i);
const HEADS = Array.from({ length: HEADS_PER_SKIN_TONE }, (_, i) => i);

export function HeadPicker({
  skinToneIndex,
  headIndex,
  onChange,
}: {
  skinToneIndex: number;
  headIndex: number;
  onChange: (skinToneIndex: number, headIndex: number) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="size-12 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-muted/40 outline-none transition-shadow hover:ring-2 hover:ring-primary/40 focus-visible:ring-2 focus-visible:ring-ring/40"
        aria-label="Change head"
      >
        <Image
          src={getPlayerHeadUrl({ skinToneIndex, headIndex })}
          alt=""
          width={48}
          height={48}
          unoptimized
          className="size-full object-contain object-top"
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Select a head
          </span>
          <div className="flex flex-col gap-1">
            {SKIN_TONES.map((tone) => (
              <div key={tone} className="flex gap-1">
                {HEADS.map((head) => {
                  const active = tone === skinToneIndex && head === headIndex;
                  return (
                    <button
                      key={head}
                      type="button"
                      title={`Skin ${tone} · head ${head}`}
                      onClick={() => {
                        onChange(tone, head);
                        setOpen(false);
                      }}
                      className={cn(
                        "size-9 shrink-0 cursor-pointer overflow-hidden rounded-md bg-muted/40 outline-none transition-shadow hover:ring-2 hover:ring-primary/40 focus-visible:ring-2 focus-visible:ring-ring/40",
                        active && "ring-2 ring-primary dark:ring-primary",
                      )}
                    >
                      <Image
                        src={getPlayerHeadUrl({
                          skinToneIndex: tone,
                          headIndex: head,
                        })}
                        alt={`Skin ${tone}, head ${head}`}
                        width={36}
                        height={36}
                        unoptimized
                        className="size-full object-contain object-top"
                      />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
