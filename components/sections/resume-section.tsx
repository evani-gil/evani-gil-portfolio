"use client";

import { Download, FileText } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/section";

export function ResumeSection() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleResumeClick() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/resume", { method: "HEAD" });

      if (!response.ok) {
        setMessage("Resume file not found yet. Add public/resume.pdf to enable download.");
        return;
      }

      window.open(siteConfig.resumePath, "_blank", "noopener,noreferrer");
    } catch {
      setMessage("Unable to check resume availability right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section
      id="resume"
      className="overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(137,245,231,0.14),_transparent_28%),linear-gradient(180deg,#0f172a_0%,#111827_100%)]"
    >
      <div className="section-shell grid items-center gap-14 md:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300/80">Resume</p>
          <h2 id="resume-heading" className="font-display text-4xl font-extrabold tracking-tight text-white">
            Technical integrity on paper
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Download the latest resume from the public directory. The section is wired to fail gracefully when the file
            has not been added yet.
          </p>
          <button
            type="button"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-cyan-500 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            onClick={handleResumeClick}
            disabled={loading}
          >
            <Download className="h-4 w-4" />
            {loading ? "Checking Resume" : "Download Full Resume"}
          </button>
          {message ? <p className="mt-4 text-sm text-cyan-100/90">{message}</p> : null}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-slate-950">
                <FileText className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-xl font-bold text-white">{siteConfig.name.toUpperCase()}</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{siteConfig.headline}</p>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="h-2 rounded-full bg-white/10" />
              <div className="h-2 w-4/5 rounded-full bg-white/10" />
              <div className="h-2 w-5/6 rounded-full bg-white/10" />
              <div className="pt-4 flex gap-3">
                <div className="h-8 w-20 rounded-full bg-cyan-400/10" />
                <div className="h-8 w-20 rounded-full bg-cyan-400/10" />
                <div className="h-8 w-20 rounded-full bg-cyan-400/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
