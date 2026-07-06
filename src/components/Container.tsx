import type { ReactNode } from "react";
import type { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: ClassNameValue;
  variant?: "prose" | "default";
  children?: ReactNode;
}

export default function Container({
  variant,
  children,
  className,
}: ContainerProps) {
  let classes: string = "";
  if (variant === "default" || !variant) {
    classes = "max-w-[1600px]";
  } else if (variant === "prose") {
    classes = "max-w-prose";
  }

  return (
    <div className={cn(classes, "mx-auto px-4", className)}>{children}</div>
  );
}
