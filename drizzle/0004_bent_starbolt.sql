CREATE TYPE "public"."rosterVote" AS ENUM('like', 'dislike');--> statement-breakpoint
ALTER TABLE "players" ALTER COLUMN "position" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."rosterPosition";--> statement-breakpoint
CREATE TYPE "public"."rosterPosition" AS ENUM('QB', 'WR', 'RB', 'LT', 'LG', 'C', 'RG', 'RT', 'TE', 'FB', 'LE', 'RE', 'DT', 'LOLB', 'ROLB', 'MLB', 'CB', 'FS', 'SS', 'K', 'P');--> statement-breakpoint
ALTER TABLE "players" ALTER COLUMN "position" SET DATA TYPE "public"."rosterPosition" USING "position"::"public"."rosterPosition";--> statement-breakpoint
ALTER TABLE "roster_likes" ADD COLUMN "vote" "rosterVote" DEFAULT 'like' NOT NULL;