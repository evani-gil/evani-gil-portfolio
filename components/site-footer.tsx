import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { navigationItems, siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80">
      <div className="section-shell flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-cyan-300">
              EG
            </span>
            <div>
              <p className="font-display text-lg font-extrabold tracking-tight text-slate-950">EVANI GIL</p>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Built with architectural precision
              </p>
            </div>
          </div>
          <p className="max-w-md text-sm text-slate-600">
            Full stack developer creating reliable software with a strong foundation in QA, operations, and execution.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <nav className="flex flex-wrap gap-5" aria-label="Footer">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-cyan-200 hover:text-cyan-700"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href={siteConfig.linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-cyan-200 hover:text-cyan-700"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-cyan-200 hover:text-cyan-700"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            © {new Date().getFullYear()} Evani Gil
          </p>
        </div>
      </div>
    </footer>
  );
}
