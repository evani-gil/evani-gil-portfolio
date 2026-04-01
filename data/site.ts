import type { NavigationItem } from "@/lib/types";

export const siteConfig = {
  name: "Evani Gil",
  headline: "Full Stack Developer",
  email: "evanigil@gmail.com",
  githubUrl: "https://github.com/evani-gil",
  linkedInUrl: "https://www.linkedin.com/in/evanigil",
  intro:
    "Full stack developer blending hands-on engineering, QA rigor, and operational leadership to deliver software that is dependable, maintainable, and aligned with real business needs.",
  availability: "Available for new opportunities",
  resumePath: "/resume.pdf",
  introVideoUrl: "",
  introVideoPoster: "/images/intro-video-placeholder.svg"
};

export const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" }
];
