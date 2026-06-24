"use client";

import "katex/dist/katex.min.css";
import LatexNext from "react-latex-next";

export default function Latex({ children }: { children: string }) {
  return <LatexNext>{children}</LatexNext>;
}
