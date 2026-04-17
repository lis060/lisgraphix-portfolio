import { Monitor, ShoppingCart, Palette, Code2, Zap, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import { services } from '../data/services';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor, ShoppingCart, Palette, Code2, Zap,
};

export default function Services() {
  return (
    <PageTransition>
      <SEO
        title="Web Design & Digital Services in Accra Ghana"
        description="Professional web design, e-commerce development, graphic design, software development and social media services in Accra, Ghana. Affordable pricing starting from ₵1,000. Get a free quote from Lisgraphix today."
        path="/services"
        keywords="web design services Accra, website development Ghana, e-commerce website Ghana, graphic design Accra, software development Ghana, social media design Ghana, affordable web designer Ghana"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Web Design and Digital Marketing',
          provider: { '@id': 'https://lisgraphix.com/#business' },
          areaServed: { '@type': 'Country', name: 'Ghana' },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Lisgraphix Digital Services',
            itemListElement: [
              { '@type': 'ListItem', position: 1, item: { '@type': 'Service', name: 'Website Design', description: 'Custom responsive website design for businesses in Ghana', offers: { '@type': 'Offer', price: '1000', priceCurrency: 'GHS' } } },
              { '@type': 'ListItem', position: 2, item: { '@type': 'Service', name: 'E-commerce Development', description: 'Online store with payment integration for Ghanaian businesses' } },
              { '@type': 'ListItem', position: 3, item: { '@type': 'Service', name: 'Graphic Design', description: 'Logos, flyers, branding for businesses in Accra and Ghana' } },
              { '@type': 'ListItem', position: 4, item: { '@type': 'Service', name: 'Software Development', description: 'Custom web apps and business software in Ghana' } },
            ],
          },
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-ink bg-radial-dark">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold" /> What We Do
            </p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-3xl">
              Web Design & Digital Services in Accra, Ghana
            </h1>
            <p className="text-muted text-lg max-w-xl leading-relaxed">
              From a simple business website to a fully custom e-commerce platform — Lisgraphix
              covers every dimension of your digital presence, built for the Ghanaian market.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Detail */}
      <Section>
        <div className="space-y-24">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            const isEven = i % 2 === 0;
            return (
              <Reveal key={service.id} id={service.id}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                      {Icon && <Icon className="w-7 h-7 text-gold" />}
                    </div>
                    <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-3 block">
                      0{i + 1} — Service
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-muted text-base leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-white/80">
                          <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/booking?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink text-sm font-semibold hover:bg-gold/90 transition-colors"
                    >
                      {service.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className={`${isEven ? 'lg:order-2' : ''} rounded-3xl overflow-hidden aspect-video bg-charcoal border border-white/10`}>
                    <img
                      src={service.image}
                      alt={`${service.title} in Accra Ghana — professional digital service by Lisgraphix`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                {i < services.length - 1 && (
                  <div className="mt-24 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                )}
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-charcoal/30">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Not sure which service you need?
            </h2>
            <p className="text-muted mb-10 max-w-lg mx-auto">
              Tell us about your business and goals — we'll recommend the right solution and give you an honest quote.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold text-ink font-semibold hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20"
            >
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </PageTransition>
  );
}
