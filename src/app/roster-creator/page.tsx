import { Plus } from "lucide-react";
import Container from "@/components/Container";
import { PublicRosters } from "@/components/roster/PublicRosters";
import { RosterCard } from "@/components/roster/RosterCard";
import { Heading1, Heading2, Text } from "@/components/typography/Heading";
import { Button } from "@/components/ui/button";
import { myRosters, publicRosters } from "@/lib/rosters";

export default async function RosterCreator() {
  return (
    <Container>
      <div className="flex flex-col gap-10 px-4 py-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <Heading1>Roster Creator</Heading1>
            <Text>Easily manage rosters for Team Builder on CFB 27.</Text>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost">My Rosters</Button>
            <Button>
              <Plus />
              New roster
            </Button>
          </div>
        </header>

        <section
          aria-labelledby="your-rosters-heading"
          className="flex flex-col gap-4"
        >
          <Heading2 id="your-rosters-heading">Your rosters</Heading2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myRosters.map((roster) => (
              <RosterCard key={roster.id} roster={roster} />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="public-rosters-heading"
          className="flex flex-col gap-4"
        >
          <Heading2 id="public-rosters-heading">Public rosters</Heading2>
          <PublicRosters rosters={publicRosters} />
        </section>
      </div>
    </Container>
  );
}
