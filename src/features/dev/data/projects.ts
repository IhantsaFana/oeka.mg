import type { Project } from '@/types/project';

export const projectsData: Project[] = [
  {
    id: 'factura',
    title: 'Factura',
    description: 'factura.description',
    longDescription: 'factura.longDescription',
    image: '/projects/factura.png',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    category: 'fullstack',
    featured: true,
    liveUrl: 'https://factura.mg',
    githubUrl: 'https://github.com/IhantsaFana/factura',
    completedAt: '2024-12',
    challenge: 'factura.challenge',
    solution: 'factura.solution'
  },
  {
    id: 'tourmada',
    title: 'Tourmada',
    description: 'tourmada.description',
    longDescription: 'tourmada.longDescription',
    image: '/projects/tourmada.png',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    category: 'mobile',
    featured: true,
    liveUrl: 'https://tourmada.com',
    githubUrl: 'https://github.com/IhantsaFana/tourmada',
    completedAt: '2024-06',
    challenge: 'tourmada.challenge',
    solution: 'tourmada.solution'
  },
  {
    id: 'theologix',
    title: 'Theologix',
    description: 'theologix.description',
    longDescription: 'theologix.longDescription',
    image: '/projects/theologix.png',
    technologies: ['React', 'Node.js', 'MongoDB'],
    category: 'web',
    featured: true,
    liveUrl: 'https://theologix.org',
    githubUrl: 'https://github.com/IhantsaFana/theologix',
    completedAt: '2023-12',
    challenge: 'theologix.challenge',
    solution: 'theologix.solution'
  },
];