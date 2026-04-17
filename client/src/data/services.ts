export interface Service {
  id: string;
  icon: string;
  image: string;
  title: string;
  shortDescription: string;
  description: string;
  bullets: string[];
  cta: string;
}

export const services: Service[] = [
  {
    id: 'web-design',
    icon: 'Monitor',
    image: '/assets/service-webdesign.jpg',
    title: 'Web Design & Development',
    shortDescription: 'Beautiful, fast websites that convert visitors into paying customers.',
    description:
      'We design and build responsive, performance-optimized websites that rank on Google and turn your visitors into leads, bookings, and sales. Every pixel is intentional — from your homepage hero to your contact form.',
    bullets: [
      'Custom design tailored to your brand identity',
      'Mobile-first, fully responsive layouts',
      'Fast load times (Core Web Vitals optimized)',
      'On-page SEO baked in from the start',
      'CMS integration (Sanity, WordPress, or custom)',
      'Analytics setup (Google Analytics 4)',
    ],
    cta: 'Start Your Website',
  },
  {
    id: 'ecommerce',
    icon: 'ShoppingCart',
    image: '/assets/service-ecommerce.jpg',
    title: 'E-commerce Development',
    shortDescription: 'Online stores engineered to sell — 24/7, even while you sleep.',
    description:
      'From a boutique fashion store to a multi-vendor marketplace, we build e-commerce platforms that are fast, secure, and built to scale. Payment integration, inventory management, and conversion optimization included.',
    bullets: [
      'Shopify, WooCommerce, or custom-built storefronts',
      'Mobile-optimized checkout flows',
      'Payment gateway integration (Paystack, Flutterwave, Stripe)',
      'Product catalog & inventory management',
      'Abandoned cart recovery workflows',
      'Order tracking & email notifications',
    ],
    cta: 'Launch Your Store',
  },
  {
    id: 'graphic-design',
    icon: 'Palette',
    image: '/assets/service-graphic.jpg',
    title: 'Graphic Design',
    shortDescription: 'Brand identities and visuals that make you impossible to ignore.',
    description:
      'Your brand is your first impression — make it count. We create logos, brand kits, social media graphics, flyers, and marketing materials that communicate trust, quality, and professionalism at a glance.',
    bullets: [
      'Logo design & brand identity systems',
      'Social media graphic templates (Canva/Figma)',
      'Business cards, flyers, and print materials',
      'Presentation decks and pitch decks',
      'Banner ads and digital marketing assets',
      'Brand style guides for consistency',
    ],
    cta: 'Brand My Business',
  },
  {
    id: 'software-development',
    icon: 'Code2',
    image: '/assets/service-software.jpg',
    title: 'Software Development',
    shortDescription: 'Custom web apps and dashboards that automate your operations.',
    description:
      'Have a workflow problem that off-the-shelf software cannot solve? We build custom web applications — CRMs, booking systems, client portals, internal dashboards — engineered specifically for how your business works.',
    bullets: [
      'Custom CRM and client management systems',
      'Booking and appointment scheduling apps',
      'Internal admin dashboards',
      'REST API design and integration',
      'Third-party integrations (WhatsApp API, payment, SMS)',
      'Ongoing maintenance and feature development',
    ],
    cta: 'Build My App',
  },
  {
    id: 'social-media-automation',
    icon: 'Zap',
    image: '/assets/service-social.jpg',
    title: 'Social Media & Automation',
    shortDescription: 'Automated systems that grow your audience and generate leads on autopilot.',
    description:
      'Stop manually posting every day. We set up content calendars, scheduling tools, WhatsApp Business automation, chatbots, and lead generation funnels so your digital marketing runs 24/7 with minimal effort from you.',
    bullets: [
      'WhatsApp Business API setup and chatbot',
      'Content calendar strategy and creation',
      'Social media scheduling (Buffer, Meta Business Suite)',
      'Lead generation funnel design',
      'Email marketing automation (Mailchimp, ConvertKit)',
      'Monthly performance reporting',
    ],
    cta: 'Automate My Growth',
  },
];
