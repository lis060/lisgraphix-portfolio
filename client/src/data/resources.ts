export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  icon: string;
  href: string;
  filename: string;
  tag: string;
  pages: string;
}

export const resources: Resource[] = [
  {
    id: 'website-launch-checklist',
    title: 'Website Launch Checklist',
    description:
      'The exact 47-point checklist we run through before launching every client website. Covers SEO, performance, security, analytics, and legal requirements.',
    type: 'PDF',
    icon: 'FileCheck',
    href: '/downloads/website-launch-checklist.pdf',
    filename: 'Lisgraphix-Website-Launch-Checklist.pdf',
    tag: 'Free Download',
    pages: '4 pages',
  },
  {
    id: 'brand-color-guide',
    title: 'Brand Color Guide for Ghanaian Businesses',
    description:
      'A practical guide to choosing brand colors that resonate with Ghanaian and West African audiences, including color psychology, palette examples, and Canva tips.',
    type: 'Guide',
    icon: 'Palette',
    href: '/downloads/brand-color-guide.pdf',
    filename: 'Lisgraphix-Brand-Color-Guide.pdf',
    tag: 'Free Download',
    pages: '4 pages',
  },
  {
    id: 'seo-quick-wins',
    title: 'SEO Quick Wins for Local Businesses',
    description:
      '10 fast, zero-cost actions you can take today to improve your Google ranking and get found by more local customers in Accra and across Ghana.',
    type: 'Guide',
    icon: 'TrendingUp',
    href: '/downloads/seo-quick-wins.pdf',
    filename: 'Lisgraphix-SEO-Quick-Wins.pdf',
    tag: 'Free Download',
    pages: '3 pages',
  },
  {
    id: 'whatsapp-business-setup',
    title: 'WhatsApp Business Setup Guide',
    description:
      'Complete step-by-step setup guide for WhatsApp Business — automated reply templates, catalogue setup, business profile optimization, and quick reply shortcuts.',
    type: 'Guide',
    icon: 'MessageCircle',
    href: '/downloads/whatsapp-business-guide.pdf',
    filename: 'Lisgraphix-WhatsApp-Business-Guide.pdf',
    tag: 'Free Download',
    pages: '4 pages',
  },
  {
    id: 'social-media-calendar',
    title: '30-Day Social Media Content Calendar',
    description:
      'A full 30-day done-for-you content calendar with post ideas, caption templates, hashtag banks, and posting schedules optimized for Ghanaian audiences.',
    type: 'Template',
    icon: 'CalendarDays',
    href: '/downloads/social-media-calendar.pdf',
    filename: 'Lisgraphix-30Day-Social-Media-Calendar.pdf',
    tag: 'Free Download',
    pages: '7 pages',
  },
];
