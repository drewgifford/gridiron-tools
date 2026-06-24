"use client";

import { Check, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { voteRoster } from "@/lib/actions/rosters";
import { cn } from "@/lib/utils";

type Vote = "like" | "dislike" | null;

/** How a bucket's count shifts moving from the server's vote to the current one. */
function voteDelta(
  serverVote: Vote,
  current: Vote,
  bucket: Exclude<Vote, null>,
) {
  return (current === bucket ? 1 : 0) - (serverVote === bucket ? 1 : 0);
}

export function RosterActions({
  rosterId,
  rosterName,
  likes,
  dislikes,
  userVote,
  isSignedIn,
}: {
  rosterId: number;
  rosterName: string;
  likes: number;
  dislikes: number;
  userVote?: Vote;
  isSignedIn: boolean;
}) {
  const router = useRouter();
  const [vote, setVote] = useState<Vote>(userVote ?? null);
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  const serverVote = userVote ?? null;
  const likeCount = likes + voteDelta(serverVote, vote, "like");
  const dislikeCount = dislikes + voteDelta(serverVote, vote, "dislike");

  const castVote = (choice: Exclude<Vote, null>) => {
    if (!isSignedIn) return;
    const previous = vote;
    const next = vote === choice ? null : choice;
    setVote(next);
    startTransition(async () => {
      try {
        await voteRoster(rosterId, next);
        router.refresh();
      } catch {
        setVote(previous);
      }
    });
  };

  async function handleShare() {
    const url = `${window.location.origin}/roster-builder/roster/${rosterId}`;
    if (navigator.share) {
      await navigator.share({ title: rosterName, url }).catch(() => undefined);
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
        disabled={!isSignedIn}
        title={isSignedIn ? undefined : "Sign in to vote"}
        aria-pressed={vote === "like"}
        aria-label={vote === "like" ? "Remove like" : "Like roster"}
        onClick={() => castVote("like")}
      >
        <ThumbsUp
          className={cn(vote === "like" && "fill-emerald-500 text-emerald-500")}
        />
        <span className="text-xs tabular-nums">{likeCount}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 px-2"
        disabled={!isSignedIn}
        title={isSignedIn ? undefined : "Sign in to vote"}
        aria-pressed={vote === "dislike"}
        aria-label={vote === "dislike" ? "Remove dislike" : "Dislike roster"}
        onClick={() => castVote("dislike")}
      >
        <ThumbsDown
          className={cn(vote === "dislike" && "fill-red-500 text-red-500")}
        />
        <span className="text-xs tabular-nums">{dislikeCount}</span>
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
