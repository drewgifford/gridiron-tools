import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { football } from "@lucide/lab";
import { ExternalLink, HardHat, Home, Icon } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

export default async function Navbar() {
  return (
    <Container>
      <div className="grid grid-cols-3 items-center bg-background p-2">
        <Link href="/" className="justify-self-start font-semibold text-lg">
          <span className="flex gap-1 items-center">
            <Icon iconNode={football} className="w-4 h-4" />
            <span>
              gridiron<span className="text-primary">.tools</span>
            </span>
          </span>
        </Link>
        <NavigationMenu className="justify-self-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">
                  <Home />
                  <span>Home</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/roster-creator">
                  <HardHat />
                  <span>Roster Creator</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2 justify-self-end">
          <Button variant="ghost">
            Install the extension <ExternalLink />
          </Button>

          <ThemeToggle />

          <Show when="signed-in">
            <UserButton />
          </Show>

          <Show when="signed-out">
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </Show>
        </div>
      </div>
    </Container>
  );
}
