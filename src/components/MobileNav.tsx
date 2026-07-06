"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { ExternalLink, Menu } from "lucide-react";
import Link from "next/link";
import { navLinks } from "./nav-links";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="gap-0">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-3">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <SheetClose key={href} asChild>
              <Link
                href={href}
                className="flex items-center gap-2 rounded-2xl px-3 py-2 font-medium hover:bg-muted"
              >
                <Icon className="size-4" />
                <span>{label}</span>
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t p-6">
          <Button variant="ghost" className="justify-start">
            Install the extension <ExternalLink />
          </Button>

          <div className="flex items-center justify-between gap-2">
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
      </SheetContent>
    </Sheet>
  );
}
