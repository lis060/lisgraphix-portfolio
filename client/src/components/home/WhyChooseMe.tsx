import { CheckCircle2, Clock, TrendingUp, Shield, MessageCircle, Zap } from 'lucide-react';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

const reasons = [
  {
    icon: TrendingUp,
    title: 'Results-Driven Design',
    description:
      'Every design decision is made with one goal: converting your visitors into paying customers. We obsess over analytics, not just aesthetics.',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description:
      'We work efficiently without cutting corners. Most projects are delivered within 2–4 weeks. You\'ll never wait months for your website.',
  },
  {
    icon: MessageCircle,
    title: 'Clear Communication',
    description:
      'No ghosting, no jargon, no excuses. You get real-time updates via WhatsApp and a clear process from kickoff to launch.',
  },
  {
    icon: Shield,
    title: 'Local Expertise',
    description:
      'We understand the Ghanaian market, payment systems (Paystack, MTN MoMo), and what your local audience actually responds to.',
  },
  {
    icon: Zap,
    title: 'Performance Obsessed',
    description:
      'Your site loads fast on every connection — including 3G. We optimize for Core Web Vitals so Google rewards you with rankings.',
  },
  {
    icon: CheckCircle2,
    title: 'Post-Launch Support',
    description:
      'We don\'t disappear after launch. Every project comes with a support window, and we\'re always available when you need us.',
  },
];

export default function WhyChooseMe() {
  return (
    <Section className="bg-charcoal/30">
      <Reveal>
        <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-gold" /> Why Lisgraphix
        </p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white max-w-2xl mb-16">
          Why businesses in Accra choose us
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, i) => {
          const Icon = reason.icon;
          return (
            <Reveal key={reason.title} delay={i * 0.1}>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mt-1">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">{reason.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
