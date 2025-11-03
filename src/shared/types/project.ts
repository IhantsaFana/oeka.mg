export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'ai' | 'fullstack';
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  completedAt: string;
  challenge: string;
  solution: string;
}

