import { CodeXml, Settings2, ShieldCheck, UsersRound } from "lucide-react";

import { skillGroups } from "@/data/skills";
import { Section } from "@/components/ui/section";

const icons = {
  "code-xml": CodeXml,
  "shield-check": ShieldCheck,
  "settings-2": Settings2,
  "users-round": UsersRound
};

export function SkillsSection() {
  return (
    <Section id="skills">
      <div className="section-shell grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="section-kicker mb-4">Technical arsenals</p>
          <h2 id="skills-heading" className="section-heading">
            Skills that span shipping, quality, and delivery
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            The stack is organized as editable content, so this section stays easy to update as the portfolio grows.
          </p>
        </div>
        <div className="md:col-span-3 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => {
            const Icon = icons[group.icon as keyof typeof icons];

            return (
              <article key={group.title} className="surface-card p-8">
                <Icon className="h-8 w-8 text-cyan-700" />
                <h3 className="mt-6 font-display text-2xl font-bold text-slate-950">{group.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{group.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
