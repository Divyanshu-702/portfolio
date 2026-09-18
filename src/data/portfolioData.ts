import { SkillCategory, InterestItem, ProjectItem, ContactInfo } from '../types';

export const PERSONAL_DETAILS = {
  name: 'Divyanshu Singh',
  role: 'B.Tech Computer Science Engineering Student',
  tagline: 'Learning, Building, and Exploring Technology.',
  year: '2026',
  degree: 'Bachelor of Technology (B.Tech)',
  department: 'Computer Science and Engineering',
  location: 'India',
  availability: 'Open for Internships & Practical Projects',
  
  // Exact introduction specified in user prompt
  introduction:
    'Hello, I’m Divyanshu Singh, a B.Tech Computer Science Engineering student with a strong interest in technology, programming, and web development. I enjoy learning new technologies, building practical projects, and improving my problem-solving skills. I am passionate about exploring modern technologies such as artificial intelligence, web development, and software development.',

  // Professional portfolio development & assessment acknowledgment
  aiCreationTitle: 'Designed & Developed by Divyanshu Singh',
  aiCreationNotice:
    'Built with React, TypeScript & Tailwind CSS • Developed with AI-assisted engineering workflows for the B.Tech CSE Personal Profile Assessment.',
};

export const INTERESTS: InterestItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Crafting responsive, user-friendly frontend interfaces and robust backend web applications with modern frameworks.',
    iconName: 'Globe',
  },
  {
    id: 'programming',
    title: 'Programming',
    description: 'Solving algorithmic challenges, writing clean and modular code, and building solid fundamentals in core data structures.',
    iconName: 'Code',
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Exploring neural networks, intelligent assistants, prompt engineering, and the transformative potential of AI tools.',
    iconName: 'Brain',
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Understanding data-driven patterns, predictive modeling, data preprocessing, and evaluation metrics.',
    iconName: 'Cpu',
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    description: 'Applying software engineering principles, version control, API architecture, and scalable design patterns.',
    iconName: 'Layers',
  },
  {
    id: 'new-tech',
    title: 'New Technologies',
    description: 'Staying current with evolving developer tooling, cloud advancements, and modern computer science innovations.',
    iconName: 'Sparkles',
  },
];

// Exact technical skills listed in prompt
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Building modern, accessible, and reactive user interfaces',
    iconName: 'Layout',
    skills: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'React.js'],
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Developing RESTful server services, routing, and business logic',
    iconName: 'Server',
    skills: ['Node.js', 'Express.js'],
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'Core logic, object-oriented principles, and low-level computational foundations',
    iconName: 'Terminal',
    skills: ['Java', 'Python', 'C', 'C++'],
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Relational data modeling, querying, schema design, and data integrity',
    iconName: 'Database',
    skills: ['MySQL', 'PostgreSQL'],
  },
  {
    id: 'tools',
    name: 'Tools',
    description: 'Version control workflows, collaborative repositories, and code editing environments',
    iconName: 'Wrench',
    skills: ['Git', 'GitHub', 'VS Code'],
  },
];

// Real-world engineering student projects highlighting the skills
export const PROJECTS: ProjectItem[] = [
  {
    id: 'ai-code-analyzer',
    title: 'Smart Code Assistant & Analyzer',
    category: 'Artificial Intelligence',
    description: 'An interactive developer utility that inspects code snippets, explains algorithmic time complexity, and offers clean refactoring recommendations using modern AI APIs.',
    highlights: [
      'Interactive code editor with real-time syntax highlighting',
      'Automated time and space complexity estimation (Big-O analysis)',
      'Clean recommendations for bug detection and code readability',
    ],
    techStack: ['React.js', 'Node.js', 'Tailwind CSS', 'JavaScript'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'campus-collab-hub',
    title: 'Campus Academic Resource Portal',
    category: 'Web Development',
    description: 'A full-stack collaborative platform for computer science students to organize subject lecture notes, share practical assignments, and manage peer study groups.',
    highlights: [
      'Modular RESTful API backend handling student course enrollments',
      'Relational PostgreSQL schema for relational course metadata and notes',
      'Responsive student dashboard with dark/light visual clarity',
    ],
    techStack: ['React.js', 'Express.js', 'PostgreSQL', 'Node.js', 'Tailwind CSS'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'pathfinding-visualizer',
    title: 'Interactive Algorithm Visualizer',
    category: 'Core CS',
    description: 'A web-based computational canvas illustrating classical graph algorithms including Dijkstra’s, Breadth-First Search (BFS), and A* heuristic pathfinding with interactive wall placement.',
    highlights: [
      'Visual step-by-step frontier expansion and shortest path reconstruction',
      'Configurable animation speeds and dynamic obstacle creation',
      'Deep dive into graph traversal fundamentals and heuristics',
    ],
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS', 'React.js'],
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 'student-db-system',
    title: 'University Records & Course Manager',
    category: 'Software Development',
    description: 'A structured desktop and server-backed database management system designed with object-oriented principles to handle grading, student enrollments, and academic course schedules.',
    highlights: [
      'Robust SQL schema with normalized tables and relational integrity keys',
      'Modular Java service layer with complete CRUD operations and exception logging',
      'Comprehensive version management tracked through Git',
    ],
    techStack: ['Java', 'MySQL', 'Git', 'OOP'],
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];

export const INITIAL_CONTACT_INFO: ContactInfo = {
  email: 'divyanshusingh7846@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/in/divyanshu-singh-a063452b8?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  gitHubUrl: 'https://github.com/Divyanshu-702',
  location: 'India',
  status: 'Available for student projects & internships',
};
