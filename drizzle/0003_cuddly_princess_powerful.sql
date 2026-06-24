CREATE TYPE "public"."playerDealbreaker" AS ENUM('None', 'Brand Exposure', 'Championship Contender', 'Coach Prestige', 'Conference Prestige', 'Playing Style', 'Playing Time', 'Pro Potential', 'Proximity to Home');--> statement-breakpoint
CREATE TYPE "public"."playerDevTrait" AS ENUM('Normal', 'Impact', 'Star', 'Elite');--> statement-breakpoint
CREATE TYPE "public"."playerHandedness" AS ENUM('Left', 'Right');--> statement-breakpoint
CREATE TYPE "public"."playerPotnetial" AS ENUM('Low', 'Medium', 'High');--> statement-breakpoint
CREATE TYPE "public"."playerYear" AS ENUM('R-FR', 'FR', 'R-SO', 'SO', 'R-JR', 'JR', 'R-SR', 'SR');--> statement-breakpoint
CREATE TYPE "public"."publishStatus" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."rosterPosition" AS ENUM('QB', 'WR', 'RB', 'LT', 'LG', 'C', 'RG', 'RT', 'TE', 'FB', 'LE', 'RE', 'DT', 'LOLB', 'ROLB', 'MLB', 'CB', 'FS', 'SS', 'K', 'P', 'LS');--> statement-breakpoint
CREATE TABLE "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"rosterId" integer NOT NULL,
	"position" "rosterPosition" NOT NULL,
	"depthOrder" integer NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"jerseyNumber" integer NOT NULL,
	"classYear" "playerYear" DEFAULT 'FR',
	"age" integer DEFAULT 18 NOT NULL,
	"heightInches" integer NOT NULL,
	"weightLbs" integer NOT NULL,
	"overall" integer NOT NULL,
	"archetype" text NOT NULL,
	"dealbreaker" "playerDealbreaker" DEFAULT 'None' NOT NULL,
	"devTrait" "playerDevTrait" DEFAULT 'Normal' NOT NULL,
	"potential" "playerPotnetial" DEFAULT 'Low' NOT NULL,
	"handedness" "playerHandedness" DEFAULT 'Right' NOT NULL,
	"hsStarRating" integer DEFAULT 1 NOT NULL,
	"skinToneIndex" integer DEFAULT 0 NOT NULL,
	"headIndex" integer DEFAULT 0 NOT NULL,
	"mentalAbilities" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"physicalAbilities" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"stats" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "rosters" ADD COLUMN "status" "publishStatus" DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "players" ADD CONSTRAINT "players_rosterId_rosters_id_fk" FOREIGN KEY ("rosterId") REFERENCES "public"."rosters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "players_roster_id_idx" ON "players" USING btree ("rosterId");