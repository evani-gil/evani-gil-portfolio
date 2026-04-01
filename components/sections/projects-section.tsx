import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";

import { projects, projectsEmptyState } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/section";

export function ProjectsSection() {
  return (
    <Section id="projects" className="bg-white/70 backdrop-blur">
      <div className="section-shell">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker mb-4">Featured projects</p>
            <h2 id="projects-heading" className="section-heading">
              Clean architecture, real outcomes, and room to grow
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              This section is fully data-driven. Adding or removing projects only requires editing one file.
            </p>
          </div>
          <Link
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-cyan-700 transition hover:border-cyan-200 hover:bg-cyan-50"
          >
            <Github className="h-4 w-4" />
            View GitHub Archive
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="surface-card overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-slate-950">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    {project.liveUrl ? (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-cyan-700 transition hover:text-cyan-900"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                        Live Demo
                      </Link>
                    ) : null}
                    {project.githubUrl ? (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-950"
                      >
                        <Github className="h-4 w-4" />
                        Source Code
                      </Link>
                    ) : null}
                    {project.detailsUrl ? (
                      <Link
                        href={project.detailsUrl}
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-950"
                      >
                        Case Study
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <article className="surface-card overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/project-placeholder-analytics.svg"
                  alt="Sample analytics dashboard placeholder"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Tailwind"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-slate-950">Project-ready showcase</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  This starter card demonstrates the intended presentation style once portfolio projects are added.
                </p>
              </div>
            </article>
            <article className="surface-card overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/project-placeholder-automation.svg"
                  alt="Sample automation placeholder"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2">
                  {["Automation", "Testing", "CI"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-slate-950">Easy to extend</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Each future card can include a title, summary, stack, image, GitHub link, demo, and optional case study.
                </p>
              </div>
            </article>
            <article className="flex min-h-[22rem] flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-slate-300/80 bg-white/60 p-10 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-cyan-700">
                <Sparkles className="h-7 w-7" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-slate-950">{projectsEmptyState.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">{projectsEmptyState.description}</p>
            </article>
          </div>
        )}
      </div>
    </Section>
  );
}
