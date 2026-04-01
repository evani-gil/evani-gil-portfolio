import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming & Development",
    icon: "code-xml",
    description: "Application development across modern frontend and backend stacks.",
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "SQL"]
  },
  {
    title: "QA & Testing",
    icon: "shield-check",
    description: "Quality-first delivery with pragmatic test strategy and automation.",
    skills: ["Selenium", "Postman", "API Testing", "Cucumber", "Regression Testing", "UAT"]
  },
  {
    title: "Tools & Operations",
    icon: "settings-2",
    description: "Tooling, deployment, and workflow experience that supports reliable releases.",
    skills: ["Git", "GitHub Actions", "Docker", "AWS", "Vercel", "Jira"]
  },
  {
    title: "Leadership",
    icon: "users-round",
    description: "Cross-functional communication, execution, and steady technical ownership.",
    skills: ["Agile Delivery", "Team Mentoring", "Business Operations", "Process Design", "Documentation"]
  }
];
