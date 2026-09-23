export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Skill {
  name: string;
  level: number | null;
  category: "AI/ML" | "Robotics" | "Security" | "Tooling";
}

export interface TimelineItem {
  period: string;
  role: string;
  org: string;
  description: string;
}

export interface EducationItem {
  period: string;
  degree: string;
  school: string;
  description: string;
  note?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  media: string | null;
  github: string | null;
  demo: string | null;
  image: string;
}

export interface Award {
  title: string;
  description: string;
  image?: string;
}

export interface Recommendation {
  org: string;
  quote: string | null;
  letterUrl?: string | null;
}

export interface BlogPost {
  title: string;
  url: string;
  excerpt: string;
}

export interface Personal {
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  freelance: string;
  address: string;
  phone: string;
  email: string;
  linkedin: string;
  googleScholar: string;
  researchGate: string;
  languages: string[];
  resumeUrl: string;
  github: string | null;
}

export interface Publication {
  title: string;
  index: "SCI" | "Scopus";
  citation: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  heroSummary: string;
  personal: Personal;
  stats: Stat[];
  skills: Skill[];
  experience: TimelineItem[];
  education: EducationItem[];
  projects: Project[];
  awards: Award[];
  records: Award[];
  conferences: { name: string }[];
  meetups: { name: string }[];
  recommendations: Recommendation[];
  blog: BlogPost[];
  publications: Publication[];
}