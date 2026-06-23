CREATE TABLE "roster_likes" (
	"rosterId" serial NOT NULL,
	"userId" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "roster_likes_rosterId_userId_pk" PRIMARY KEY("rosterId","userId")
);
--> statement-breakpoint
ALTER TABLE "roster_likes" ADD CONSTRAINT "roster_likes_rosterId_rosters_id_fk" FOREIGN KEY ("rosterId") REFERENCES "public"."rosters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "roster_likes_roster_id_idx" ON "roster_likes" USING btree ("rosterId");