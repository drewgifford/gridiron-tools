import { ArrowRight, HardHat, Wrench } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/Container";
import { Heading1, Heading2, Text } from "@/components/typography/Heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ToolCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full transition-colors hover:bg-muted/40">
        <CardHeader>
          <div className="mb-1 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto text-sm font-medium text-primary">
          Open
          <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-cover bg-center bg-no-repeat opacity-30 grayscale"
        style={{
          backgroundImage: "url('/image.webp')",
          maskImage: "linear-gradient(to bottom, black, transparent 50%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 50%)",
        }}
      />
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col gap-16 px-4 py-16">
          <section className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Heading1>
              Your toolkit for{" "}
              <span className="text-primary">Team Builder</span>
            </Heading1>
            <Text className="text-lg text-muted-foreground">
              <span className="text-foreground">gridiron.tools</span> is a
              growing collection of utilities for College Football 27 and
              Madden. Create rosters, rate your program, and share your builds
              with the community.
            </Text>
            <Button asChild size="lg">
              <Link href="/roster-creator">
                Open Roster Builder
                <ArrowRight />
              </Link>
            </Button>
          </section>

          <section
            aria-labelledby="tools-heading"
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1">
              <Heading2 id="tools-heading">Tools</Heading2>
              <Text className="text-muted-foreground">
                What&apos;s available right now.
              </Text>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ToolCard
                href="/roster-builder"
                icon={<HardHat className="size-5" />}
                title="Roster Builder"
                description="Build, rate, and share rosters for Team Builder, and browse public rosters from the community."
              />
              <div className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-[min(var(--radius-4xl),24px)] border-2 border-dashed border-border p-6 text-center text-muted-foreground">
                <Wrench className="size-5" />
                <p className="text-sm font-medium">More tools coming soon</p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
