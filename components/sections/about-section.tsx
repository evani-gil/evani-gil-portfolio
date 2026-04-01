import { aboutContent } from "@/data/about";
import { Section } from "@/components/ui/section";

export function AboutSection() {
  return (
    <Section id="about" className="bg-white/70 backdrop-blur">
      <div className="section-shell grid gap-12 md:grid-cols-12 md:items-start">
        <div className="md:col-span-4">
          <div className="mb-8 h-1 w-14 rounded-full bg-cyan-500" />
          <p className="section-kicker mb-4">{aboutContent.kicker}</p>
          <h2 id="about-heading" className="section-heading">
            {aboutContent.title}
          </h2>
        </div>
        <div className="md:col-span-8 space-y-6">
          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-8 text-slate-600 md:text-xl">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
