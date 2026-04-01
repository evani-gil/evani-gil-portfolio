"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { navigationItems } from "@/data/site";
import { useActiveSection } from "@/components/providers/section-observer";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { activeSection } = useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-[rgba(247,249,251,0.78)] backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between">
        <Link href="#home" className="flex items-center gap-3 text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-cyan-300">
            EG
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">EVANI GIL</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "text-[11px] font-bold uppercase tracking-[0.2em] transition-colors",
                activeSection === item.id ? "text-cyan-700" : "text-slate-500 hover:text-slate-950"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-cyan-200 hover:text-cyan-700 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden" id="mobile-nav">
          <nav className="section-shell flex flex-col py-4" aria-label="Mobile">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                  activeSection === item.id
                    ? "bg-cyan-50 text-cyan-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
