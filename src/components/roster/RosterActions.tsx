"use client";

import { Check, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Roster } from "@/lib/rosters";
import { cn } from "@/lib/utils";

export function RosterActions({ roster }: { roster: Roster }) {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const likeCount = roster.likes + (liked ? 1 : 0);

  async function handleShare() {
    const url = `${window.location.origin}/roster-creator/${roster.id}`;
    if (navigator.share) {
      await navigator.share({ title: roster.name, url }).catch(() => undefined);
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 px-2"
        aria-pressed={liked}
        aria-label={liked ? "Unlike roster" : "Like roster"}
        onClick={() => setLiked((prev) => !prev)}
      >
        <Heart className={cn(liked && "fill-red-500 text-red-500")} />
        <span className="text-xs tabular-nums">{likeCount}</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Share roster"
        onClick={handleShare}
      >
        {copied ? <Check className="text-green-500" /> : <Share2 />}
      </Button>
    </div>
  );
}
