export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Programming' | 'Database' | 'Tools';
  iconName?: string;
}

export interface SkillCategory {
  id: string;
  name: 'Frontend' | 'Backend' | 'Programming' | 'Database' | 'Tools';
  description: string;
  iconName: string;
  skills: string[];
}

export interface InterestItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web Development' | 'Artificial Intelligence' | 'Software Development' | 'Core CS';
  description: string;
  highlights: string[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ContactInfo {
  email: string;
  linkedInUrl: string;
  gitHubUrl: string;
  location?: string;
  status?: string;
}

export interface SentMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
