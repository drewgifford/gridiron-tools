import { HardHat, Home, type LucideIcon } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/roster-builder", label: "Roster Builder", icon: HardHat },
];
