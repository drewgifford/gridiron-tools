CREATE TABLE "rosters" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"preset" text NOT NULL,
	"ovr" integer NOT NULL,
	"offenseOvr" integer NOT NULL,
	"defenseOvr" integer NOT NULL,
	"rating" real NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "rosters_user_id_idx" ON "rosters" USING btree ("userId");