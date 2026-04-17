import HeroHome from '../components/hero/HeroHome';
import ServicesPreview from '../components/home/ServicesPreview';
import PortfolioPreview from '../components/home/PortfolioPreview';
import WhyChooseMe from '../components/home/WhyChooseMe';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://lisgraphix.com/#webpage',
  url: 'https://lisgraphix.com',
  name: 'Lisgraphix | Web Designer in Accra Ghana',
  description:
    'Professional web design and software agency in Accra, Ghana. We build modern, fast, mobile-friendly websites that attract customers and grow your business.',
  isPartOf: { '@id': 'https://lisgraphix.com/#website' },
  about: { '@id': 'https://lisgraphix.com/#business' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lisgraphix.com' }],
  },
};

export default function Home() {
  return (
    <PageTransition>
      <SEO
        title="Home"
        description="Lisgraphix — Professional web designer in Accra, Ghana. We build modern, mobile-friendly websites and e-commerce stores that attract customers and grow your business. Get a free quote today."
        path="/"
        keywords="web designer Accra, web design Ghana, website developer Ghana, affordable website design Accra, e-commerce Ghana, graphic design Accra, software development Ghana"
        schema={homeSchema}
      />
      <HeroHome />
      <ServicesPreview />
      <PortfolioPreview />
      <WhyChooseMe />
      <Testimonials />
      <CTASection />

      {/* Local SEO hidden text — for crawlers */}
      <div className="sr-only" aria-hidden="true">
        <p>Lisgraphix is a professional web design agency based in Accra, Ghana. We provide affordable website design, e-commerce development, graphic design, and software development services to businesses in Accra, Tema, Kumasi, and across Ghana. Contact us on WhatsApp at +233544490241 for a free quote. Web designer Accra. Website developer Ghana. E-commerce website Ghana. Graphic design Accra.</p>
      </div>
    </PageTransition>
  );
}
