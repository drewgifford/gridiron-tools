import Container from "@/components/Container";
import { CreateRosterForm } from "@/components/roster/builder/CreateRosterForm";

export default function RosterBuilderCreate() {
  return (
    <Container>
      <div className="flex flex-col gap-4 px-4 py-8">
        <CreateRosterForm />
      </div>
    </Container>
  );
}
