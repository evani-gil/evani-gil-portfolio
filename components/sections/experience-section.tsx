import { experience } from "@/data/experience";
import { Section } from "@/components/ui/section";

export function ExperienceSection() {
  return (
    <Section id="experience">
      <div className="section-shell max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker mb-4">Professional timeline</p>
          <h2 id="experience-heading" className="section-heading">
            Experience rooted in delivery, quality, and leadership
          </h2>
        </div>

        <div className="mt-16 space-y-4">
          {experience.map((item, index) => (
            <article key={`${item.role}-${item.period}`} className="group flex gap-6">
              <div className="flex flex-col items-center">
                <span
                  className={`mt-2 h-3 w-3 rounded-full border-4 ring-4 ring-white ${
                    item.current ? "border-cyan-100 bg-cyan-600" : "border-slate-100 bg-slate-300"
                  }`}
                />
                {index !== experience.length - 1 ? <span className="mt-2 h-full w-px bg-slate-200" /> : null}
              </div>
              <div className="surface-card flex-1 p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-slate-950">{item.role}</h3>
                    <p className="mt-2 text-sm font-medium text-slate-500">{item.company}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${
                      item.current ? "bg-cyan-50 text-cyan-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-cyan-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
