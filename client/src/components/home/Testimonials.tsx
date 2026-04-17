import { Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

export default function Testimonials() {
  return (
    <Section>
      <Reveal>
        <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-gold" /> Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white max-w-2xl mb-16">
          Real results, real clients
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.1}>
            <div className="p-7 rounded-2xl border border-white/10 bg-charcoal/60 hover:border-gold/30 transition-colors h-full flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-white/80 text-sm leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-5 border-t border-white/5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-gold/20"
                  loading="lazy"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
