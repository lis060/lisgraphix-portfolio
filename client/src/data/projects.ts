export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  description: string;
  caseStudySlug?: string;
  demoUrl?: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: 'elegance-barbering',
    title: 'ELEGANCE Barbering & Spa',
    category: 'Web Design',
    tags: ['Web Design', 'Barbering', 'WhatsApp Booking'],
    image: '/assets/project-elegance.jpg',
    description:
      'Modern website for a barbering salon with clean design and service showcase to attract premium clients. Features WhatsApp booking integration and mobile-first layout.',
    caseStudySlug: 'elegance-barbering',
    demoUrl: '/demos/elegance',
    year: '2024',
  },
  {
    id: 'lusso-homes',
    title: 'Lusso Homes Accra',
    category: 'Real Estate',
    tags: ['Real Estate', 'Property Listings', 'React'],
    image: '/assets/project-lusso.jpg',
    description:
      'Professional real estate website designed to showcase luxury properties and build trust with buyers. Clean visuals and structured content for easy browsing.',
    caseStudySlug: 'lusso-homes',
    demoUrl: '/demos/lusso',
    year: '2024',
  },
  {
    id: 'suit-up',
    title: 'Suit Up!',
    category: 'Fashion / E-commerce',
    tags: ['Fashion', 'E-commerce', 'Tailwind CSS'],
    image: '/assets/project-suitup.jpg',
    description:
      'Minimal luxury fashion store website with clean layout and strong brand feel for clothing business. Optimized for mobile shopping experience.',
    caseStudySlug: 'suit-up',
    demoUrl: '/demos/suitup',
    year: '2024',
  },
  {
    id: 'listrack-dashboard',
    title: 'LisTrack Dashboard',
    category: 'Software Development',
    tags: ['Dashboard', 'React', 'Business Tools'],
    image: '/assets/project-listrack.jpg',
    description:
      'Smart dashboard for tracking sales, expenses, clients, and daily business activities. Built for small business owners to manage operations efficiently.',
    year: '2024',
  },
  {
    id: 'church-flyer-system',
    title: 'Church Program Flyer System',
    category: 'Graphic Design',
    tags: ['Graphic Design', 'Branding', 'Print'],
    image: '/assets/project-church.jpg',
    description:
      'High-quality flyer designs and visual branding for church events and programs. Professional layouts that communicate event details with impact.',
    year: '2024',
  },
  {
    id: 'px-inventory',
    title: 'PX Inventory Concept',
    category: 'Software / Retail',
    tags: ['Inventory', 'Software', 'Military'],
    image: '/assets/project-px.jpg',
    description:
      'Concept system for tracking inventory and sales in a military mess/store environment. Designed for efficiency and accurate stock management.',
    year: '2024',
  },
];
