import HeroHome from '../components/hero/HeroHome';
import ServicesPreview from '../components/home/ServicesPreview';
import PortfolioPreview from '../components/home/PortfolioPreview';
import WhyChooseMe from '../components/home/WhyChooseMe';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <SEO
        title="Home"
        description="Lisgraphix — I build websites that bring customers. Premium web design, graphics & software solutions in Accra, Ghana."
        path="/"
      />
      <HeroHome />
      <ServicesPreview />
      <PortfolioPreview />
      <WhyChooseMe />
      <Testimonials />
      <CTASection />
    </PageTransition>
  );
}
