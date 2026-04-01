"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { SectionId } from "@/lib/types";

interface SectionObserverContextValue {
  activeSection: SectionId;
}

const SectionObserverContext = createContext<SectionObserverContextValue>({
  activeSection: "home"
});

export function SectionObserverProvider({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const id = visible?.target.getAttribute("id") as SectionId | null;

        if (id) {
          setActiveSection(id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.8]
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const value = useMemo(() => ({ activeSection }), [activeSection]);

  return <SectionObserverContext.Provider value={value}>{children}</SectionObserverContext.Provider>;
}

export function useActiveSection() {
  return useContext(SectionObserverContext);
}
