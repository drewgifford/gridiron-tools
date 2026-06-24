"use client";

import { Check, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { voteRoster } from "@/lib/actions/rosters";
import { cn } from "@/lib/utils";

type Vote = "like" | "dislike" | null;

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
  const [vote, setVote] = useState<Vote>(userVote ?? null);
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  const castVote = (choice: Exclude<Vote, null>) => {
    if (!isSignedIn) return;
    const previous = vote;
    const next = vote === choice ? null : choice;
    setVote(next); // optimistic press; counts come from the server on refresh
    startTransition(async () => {
      try {
        await voteRoster(rosterId, next);
      } catch {
        setVote(previous);
      }
    });
  };

  async function handleShare() {
    const url = `${window.location.origin}/roster-creator/${rosterId}`;
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
        <span className="text-xs tabular-nums">{likes}</span>
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
        <span className="text-xs tabular-nums">{dislikes}</span>
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
