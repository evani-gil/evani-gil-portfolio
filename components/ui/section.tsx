import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { SectionId } from "@/lib/types";

export function Section({
  id,
  className,
  children
}: Readonly<{
  id: SectionId;
  className?: string;
  children: ReactNode;
}>) {
  return (
    <section
      id={id}
      data-section
      className={cn("scroll-mt-24 py-24 md:py-28", className)}
      aria-labelledby={`${id}-heading`}
    >
      {children}
    </section>
  );
}
