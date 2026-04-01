export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "resume"
  | "contact";

export interface NavigationItem {
  id: SectionId;
  label: string;
}

export interface SkillGroup {
  title: string;
  icon: string;
  description: string;
  skills: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  stack: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  detailsUrl?: string;
  status?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  current?: boolean;
}

export interface ContactFormValues {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string;
}
