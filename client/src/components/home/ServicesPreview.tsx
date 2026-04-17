import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, ShoppingCart, Palette, Code2, Zap } from 'lucide-react';
import { services } from '../../data/services';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  ShoppingCart,
  Palette,
  Code2,
  Zap,
};

export default function ServicesPreview() {
  return (
    <Section className="bg-charcoal/30">
      <Reveal>
        <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-gold" /> Services
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white max-w-lg">
            Everything you need to win online
          </h2>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all"
          >
            All services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon];
          return (
            <Reveal key={service.id} delay={i * 0.1}>
              <Link
                to={`/services#${service.id}`}
                className="group block p-7 rounded-2xl border border-white/10 bg-charcoal/60 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  {Icon && <Icon className="w-5 h-5 text-gold" />}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{service.shortDescription}</p>
                <div className="mt-5 flex items-center gap-1 text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
