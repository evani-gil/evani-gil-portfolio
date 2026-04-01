import Image from "next/image";
import { Download, MessageSquare, PlayCircle } from "lucide-react";

import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";

export function HeroSection() {
  return (
    <Section id="home" className="pt-32">
      <div className="section-shell grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <span className="pill mb-6">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_0_6px_rgba(6,182,212,0.18)]" />
            {siteConfig.availability}
          </span>
          <h1 id="home-heading" className="font-display text-5xl font-extrabold tracking-tight text-slate-950 md:text-7xl">
            {siteConfig.name.toUpperCase()}
          </h1>
          <p className="mt-5 max-w-3xl font-display text-2xl font-light leading-tight text-slate-600 md:text-3xl">
            {siteConfig.headline} bringing <span className="font-bold italic text-cyan-700">QA precision</span> and{" "}
            <span className="font-bold italic text-cyan-700">operational leadership</span> to modern software delivery.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{siteConfig.intro}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="#projects">View Projects</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              <MessageSquare className="h-4 w-4" />
              Contact Me
            </ButtonLink>
            <ButtonLink href="#resume" variant="ghost">
              <Download className="h-4 w-4" />
              Download Resume
            </ButtonLink>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="surface-card relative overflow-hidden p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-slate-950/10" />
            {siteConfig.introVideoUrl ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] md:aspect-square">
                <iframe
                  title="Introduction video"
                  src={siteConfig.introVideoUrl}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-slate-800/20 bg-slate-950 md:aspect-square">
                <Image
                  src={siteConfig.introVideoPoster}
                  alt="Styled placeholder for portfolio intro video"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white/12 p-6 text-white backdrop-blur">
                    <PlayCircle className="h-12 w-12" />
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-black/25 px-4 py-3 text-white/90 backdrop-blur">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Intro Video</p>
                  <p className="mt-1 max-w-[15rem] text-sm text-white/75">
                    Add your embed URL in <code>data/site.ts</code> to replace this placeholder.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
