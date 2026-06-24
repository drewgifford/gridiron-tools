import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { football } from "@lucide/lab";
import { ExternalLink, Icon } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import { MobileNav } from "./MobileNav";
import { navLinks } from "./nav-links";
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
      <div className="grid grid-cols-2 items-center bg-background p-2 md:grid-cols-3">
        <Link href="/" className="justify-self-start font-semibold text-lg">
          <span className="flex gap-1 items-center">
            <Icon iconNode={football} className="w-4 h-4" />
            <span>
              gridiron<span className="text-primary">.tools</span>
            </span>
          </span>
        </Link>
        <NavigationMenu className="hidden justify-self-center md:flex">
          <NavigationMenuList>
            {navLinks.map(({ href, label, icon: LinkIcon }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild>
                  <Link href={href}>
                    <LinkIcon />
                    <span>{label}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hidden items-center gap-2 justify-self-end md:flex">
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

        <div className="justify-self-end md:hidden">
          <MobileNav />
        </div>
      </div>
    </Container>
  );
}
