import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import { pricingTiers } from '../data/pricing';

export default function Pricing() {
  return (
    <PageTransition>
      <SEO
        title="Pricing"
        description="Transparent, all-inclusive pricing for web design, e-commerce, and software development in Ghana. Starter from GHS 2,500."
        path="/pricing"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-ink bg-radial-dark">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              — Transparent Pricing
            </p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
              No surprises. Just results.
            </h1>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Every package includes everything you need to succeed online — from design through to launch and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.1}>
              <div
                className={`relative rounded-2xl border overflow-hidden flex flex-col h-full transition-all ${
                  tier.popular
                    ? 'border-gold bg-gradient-to-b from-gold/10 to-charcoal shadow-2xl shadow-gold/10 scale-105'
                    : 'border-white/10 bg-charcoal/60'
                }`}
              >
                {tier.popular && (
                  <div className="bg-gold text-ink text-xs font-bold uppercase tracking-widest text-center py-2">
                    Most Popular
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-white font-black text-2xl mb-1">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-black text-white">{tier.price}</span>
                  </div>
                  <p className="text-muted text-xs mb-1">{tier.priceNote}</p>
                  <p className="text-muted text-sm leading-relaxed mt-3 mb-8">
                    {tier.description}
                  </p>

                  <div className="space-y-3 flex-1 mb-8">
                    {tier.features.map((feature) => (
                      <div key={feature.text} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-white/20 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-white/80' : 'text-white/30'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/booking?plan=${tier.id}`}
                    className={`block w-full py-3.5 rounded-xl text-sm font-semibold text-center transition-all ${
                      tier.popular
                        ? 'bg-gold text-ink hover:bg-gold/90'
                        : 'border border-gold/40 text-gold hover:bg-gold/5 hover:border-gold'
                    }`}
                  >
                    {tier.cta} <ArrowRight className="inline w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Note */}
        <Reveal>
          <div className="mt-12 p-6 rounded-2xl border border-white/5 bg-charcoal/30 text-center">
            <p className="text-muted text-sm">
              All prices listed in Ghanaian Cedis (GHS). Payment plans available for Business and Premium.
              Prices may vary based on project scope. Contact us for a custom quote.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section className="bg-charcoal/30">
        <Reveal>
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-gold" /> FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12">Common questions</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          {[
            {
              q: 'Do you offer payment plans?',
              a: 'Yes. For Business and Premium tiers, we offer a 50% deposit to start and 50% on delivery. For larger projects, custom payment schedules are available.',
            },
            {
              q: 'How long does a website take?',
              a: 'Starter sites are typically delivered in 1–2 weeks. Business sites take 2–3 weeks. Premium and custom software projects are scoped individually, usually 4–8 weeks.',
            },
            {
              q: 'What do I need to provide?',
              a: 'Your brand assets (logo if you have one), content (text, images), and your vision. We can also provide copywriting and photography direction for an additional fee.',
            },
            {
              q: 'Do you offer ongoing maintenance?',
              a: 'Yes. After your support window, we offer monthly retainer packages for updates, security patches, SEO monitoring, and new feature development.',
            },
          ].map((faq) => (
            <Reveal key={faq.q}>
              <div className="p-6 rounded-2xl border border-white/10 bg-charcoal/60">
                <h3 className="text-white font-bold mb-3">{faq.q}</h3>
                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
