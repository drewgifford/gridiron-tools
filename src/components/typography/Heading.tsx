import type { ReactNode } from "react";
import type { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

interface HeadingParams {
  id?: string;
  className?: ClassNameValue;
  children: ReactNode;
}

export function Heading1({ id, className, children }: HeadingParams) {
  return (
    <h1
      id={id}
      className={cn(
        className,
        "scroll-m-20 text-4xl font-bold tracking-tight text-balance",
      )}
    >
      {children}
    </h1>
  );
}

export function Heading2({ id, className, children }: HeadingParams) {
  return (
    <h2
      id={id}
      className={cn(className, "scroll-m-20 text-3xl font-bold tracking-tight")}
    >
      {children}
    </h2>
  );
}

export function Heading3({ id, className, children }: HeadingParams) {
  return (
    <h3
      id={id}
      className={cn(className, "scroll-m-20 text-2xl font-bold tracking-tight")}
    >
      {children}
    </h3>
  );
}

export function Heading4({ id, className, children }: HeadingParams) {
  return (
    <h4
      id={id}
      className={cn(
        className,
        "scroll-m-20 text-xl font-semibold tracking-tight",
      )}
    >
      {children}
    </h4>
  );
}

export function Text({ id, className, children }: HeadingParams) {
  return (
    <p id={id} className={cn(className, "leading-7 not-first:mt-2")}>
      {children}
    </p>
  );
}
