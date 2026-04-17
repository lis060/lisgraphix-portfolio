export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  popular: boolean;
  features: PricingFeature[];
  cta: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'GHS 1,000',
    priceNote: 'One-time payment',
    description: 'Perfect for small businesses, service providers, and personal brands getting online for the first time.',
    popular: false,
    features: [
      { text: '1–3 custom pages', included: true },
      { text: 'Mobile responsive design', included: true },
      { text: 'Basic UI design', included: true },
      { text: 'WhatsApp integration', included: true },
      { text: 'Contact form', included: false },
      { text: 'SEO setup', included: false },
      { text: 'Performance optimization', included: false },
      { text: 'E-commerce features', included: false },
    ],
    cta: 'Get Started',
  },
  {
    id: 'business',
    name: 'Business',
    price: 'GHS 2,000',
    priceNote: 'One-time payment',
    description: 'Ideal for growing businesses that need a professional online presence with more pages and features.',
    popular: true,
    features: [
      { text: 'Up to 6 custom pages', included: true },
      { text: 'Modern UI/UX design', included: true },
      { text: 'Contact form + WhatsApp', included: true },
      { text: 'Basic SEO setup', included: true },
      { text: 'Faster performance', included: true },
      { text: 'Google Analytics', included: true },
      { text: 'E-commerce features', included: false },
      { text: 'Advanced animations', included: false },
    ],
    cta: 'Choose Business',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'GHS 4,000',
    priceNote: 'Starting price — quoted per project',
    description: 'For established businesses that need e-commerce, custom features, or a complete digital system.',
    popular: false,
    features: [
      { text: 'Full multi-page website', included: true },
      { text: 'Advanced UI + animations', included: true },
      { text: 'E-commerce or custom features', included: true },
      { text: 'SEO + performance optimization', included: true },
      { text: 'Priority support', included: true },
      { text: 'Payment integration', included: true },
      { text: 'Dashboard / automation', included: true },
      { text: '3 months post-launch support', included: true },
    ],
    cta: 'Let\'s Talk Premium',
  },
];

export const pricingExclusions = {
  notIncluded: [
    { item: 'Domain Name', price: 'GHS 100–200/year' },
    { item: 'Hosting Plan', price: 'GHS 500–1,200/year' },
  ],
  additionalCharges: [
    { item: 'Extra Pages', price: 'GHS 150 per page' },
    { item: 'E-commerce Product Upload', price: 'GHS 5–10 per product' },
    { item: 'Payment Integration (Paystack, etc.)', price: 'GHS 200–400' },
    { item: 'Advanced Features (Dashboards, automation)', price: 'GHS 500+' },
    { item: 'Monthly Maintenance (optional)', price: 'GHS 100–300/month' },
  ],
};
