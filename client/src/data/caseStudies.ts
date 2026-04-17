export interface CaseStudyResult {
  metric: string;
  value: string;
  description: string;
}

export interface CaseStudyStep {
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  projectId: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  stack: string[];
  coverImage: string;
  challenge: string;
  approach: CaseStudyStep[];
  results: CaseStudyResult[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'elegance-barbering',
    projectId: 'elegance-barbering',
    title: 'Elevating a Barbering Brand to Premium Status',
    client: 'ELEGANCE Barbering & Spa',
    industry: 'Health & Beauty',
    duration: '3–5 days',
    stack: ['HTML', 'CSS', 'JavaScript'],
    coverImage: '/assets/case-elegance.jpg',
    challenge:
      'The barbering business had no strong online presence and looked basic, making it hard to attract premium clients. They needed a professional website that showcased their services and made booking easy.',
    approach: [
      {
        title: 'Discovery & Strategy',
        description:
          'We discussed the brand goals, target audience, and desired image. The focus was on creating a luxury feel that would appeal to premium clients looking for quality grooming services.',
      },
      {
        title: 'Clean Luxury UI Design',
        description:
          'Designed a modern, clean interface with professional color scheme and typography. The layout emphasizes service quality and builds immediate trust with visitors.',
      },
      {
        title: 'Structured Service Showcase',
        description:
          'Organized services clearly with descriptions and pricing. Each service has its own section with visuals that communicate the premium experience.',
      },
      {
        title: 'WhatsApp Booking Integration',
        description:
          'Added a prominent WhatsApp button for instant booking. This direct communication channel makes it easy for clients to schedule appointments without phone calls.',
      },
      {
        title: 'Mobile Optimization',
        description:
          'Ensured the site looks and works perfectly on all devices. Most customers browse on mobile, so the mobile experience was prioritized throughout.',
      },
    ],
    results: [
      { metric: 'Brand Perception', value: 'Elevated', description: 'From basic to premium professional image' },
      { metric: 'Customer Trust', value: 'Increased', description: 'More inquiries and bookings through WhatsApp' },
      { metric: 'Mobile Traffic', value: '85%', description: 'Of visitors browse on mobile devices' },
      { metric: 'Load Speed', value: 'Fast', description: 'Optimized for quick loading on all connections' },
    ],
    testimonial: {
      quote:
        'Very professional and fast delivery. My shop now looks premium online and customers trust my brand more.',
      author: 'Kwame Mensah',
      role: 'Owner, ELEGANCE Barbering',
    },
  },
  {
    slug: 'lusso-homes',
    projectId: 'lusso-homes',
    title: 'Building Trust Through Professional Real Estate Presentation',
    client: 'Lusso Homes Accra',
    industry: 'Real Estate',
    duration: '5–7 days',
    stack: ['React', 'Vite'],
    coverImage: '/assets/case-lusso.jpg',
    challenge:
      'Real estate listings were not presented professionally, reducing client trust. The business needed a website that showcased luxury properties and conveyed professionalism to serious buyers.',
    approach: [
      {
        title: 'Requirements Analysis',
        description:
          'Identified the key elements buyers look for: property photos, location details, pricing, and agent contact. The site needed to feel trustworthy and high-end.',
      },
      {
        title: 'Modern Property Layout',
        description:
          'Created a clean grid layout for property listings with large images, key details, and clear calls-to-action. The design emphasizes visual appeal and easy navigation.',
      },
      {
        title: 'Clean Visual Design',
        description:
          'Used a minimalist color palette with plenty of white space to let property photos shine. The design feels premium without being distracting.',
      },
      {
        title: 'Structured Content',
        description:
          'Organized content for easy browsing: featured properties, about section, services, and contact. Visitors can find what they need within seconds.',
      },
      {
        title: 'Strong Branding Feel',
        description:
          'Developed consistent branding throughout with logo placement, color scheme, and typography that communicates luxury real estate expertise.',
      },
    ],
    results: [
      { metric: 'Brand Image', value: 'Professional', description: 'Transformed from basic to luxury presentation' },
      { metric: 'Listing Views', value: 'Higher', description: 'Better presentation leads to more engagement' },
      { metric: 'Client Trust', value: 'Improved', description: 'Professional site builds confidence in buyers' },
      { metric: 'Inquiries', value: 'Increased', description: 'More qualified leads through contact forms' },
    ],
    testimonial: {
      quote:
        'The website completely changed how clients see my business. Clean, modern and effective.',
      author: 'Ama Boateng',
      role: 'Director, Lusso Homes Accra',
    },
  },
  {
    slug: 'suit-up',
    projectId: 'suit-up',
    title: 'Creating a Premium Fashion Brand Identity Online',
    client: 'Suit Up! Fashion',
    industry: 'Fashion & E-commerce',
    duration: '4–6 days',
    stack: ['React', 'Tailwind CSS'],
    coverImage: '/assets/case-suitup.jpg',
    challenge:
      'The brand needed a premium online presence to compete with modern fashion brands. They wanted a site that looked international and made their clothing collection attractive to buyers.',
    approach: [
      {
        title: 'Brand Discovery',
        description:
          'Understood the brand values: minimal luxury, clean aesthetics, and quality clothing. The website needed to reflect these values in every detail.',
      },
      {
        title: 'Minimal Luxury UI',
        description:
          'Designed with generous white space, elegant typography, and subtle animations. The interface feels high-end without overwhelming the products.',
      },
      {
        title: 'Product Presentation',
        description:
          'Created a layout that showcases clothing items with large images, clear descriptions, and pricing. The focus is always on the products.',
      },
      {
        title: 'Clean Typography & Spacing',
        description:
          'Selected modern fonts with excellent readability and used consistent spacing to create visual hierarchy and breathing room.',
      },
      {
        title: 'Mobile Shopping Optimization',
        description:
          'Ensured the shopping experience is smooth on mobile devices with touch-friendly buttons, fast loading, and intuitive navigation.',
      },
    ],
    results: [
      { metric: 'Brand Identity', value: 'Stronger', description: 'Premium feel that matches product quality' },
      { metric: 'Product Display', value: 'Attractive', description: 'Items presented in best light' },
      { metric: 'Mobile Experience', value: 'Smooth', description: 'Optimized for on-the-go shopping' },
      { metric: 'International Feel', value: 'Achieved', description: 'Site looks global and professional' },
    ],
    testimonial: {
      quote:
        'I love the design. It makes my brand look international and serious.',
      author: 'Kofi Asare',
      role: 'Founder, Suit Up! Fashion',
    },
  },
];
