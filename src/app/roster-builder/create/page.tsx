import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Container from "@/components/Container";
import { CreateRosterForm } from "@/components/roster/builder/CreateRosterForm";
import { Heading2, Text } from "@/components/typography/Heading";
import { Button } from "@/components/ui/button";
import { countRostersByUser } from "@/lib/db/rosters";
import { MAX_ROSTERS_PER_USER } from "@/lib/rosters";

export default async function RosterBuilderCreate() {
  const { userId } = await auth();
  const atLimit = userId
    ? (await countRostersByUser(userId)) >= MAX_ROSTERS_PER_USER
    : false;

  return (
    <Container>
      <div className="flex flex-col gap-4 px-4 py-8">
        {atLimit ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed p-10 text-center">
            <Heading2>Roster limit reached</Heading2>
            <Text className="text-muted-foreground">
              You've reached the limit of {MAX_ROSTERS_PER_USER} rosters. Delete
              one to create a new roster.
            </Text>
            <Button asChild className="mt-2">
              <Link href="/roster-builder">Back to rosters</Link>
            </Button>
          </div>
        ) : (
          <CreateRosterForm />
        )}
      </div>
    </Container>
  );
}
