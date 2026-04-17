import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import { caseStudies } from '../data/caseStudies';

export default function CaseStudies() {
  return (
    <PageTransition>
      <SEO
        title="Case Studies"
        description="Deep-dive into how Lisgraphix helped Ghanaian businesses grow online — real projects, real metrics, real results."
        path="/case-studies"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-ink bg-radial-dark">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold" /> Case Studies
            </p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-3xl">
              Results we're proud to put our name on
            </h1>
            <p className="text-muted text-lg max-w-xl">
              Every number here is real. These are the stories behind the metrics — the challenges, the strategies, and the outcomes.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="space-y-8">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 0.1}>
              <Link
                to={`/case-studies/${cs.slug}`}
                className="group grid md:grid-cols-5 rounded-2xl border border-white/10 bg-charcoal/60 hover:border-gold/40 transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="md:col-span-2 aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={cs.coverImage}
                    alt={cs.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="md:col-span-3 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-gold text-xs font-semibold uppercase tracking-widest">{cs.industry}</span>
                      <span className="text-muted text-xs">· {cs.duration}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                      {cs.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                      {cs.challenge}
                    </p>

                    {/* Result pills */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {cs.results.slice(0, 3).map((r) => (
                        <div key={r.metric} className="px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/20">
                          <span className="text-gold font-bold text-sm">{r.value}</span>
                          <span className="text-white/50 text-xs ml-1">{r.metric}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2">
                      {cs.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded bg-white/5 text-white/40 text-xs">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gold text-sm font-medium mt-6 group-hover:gap-3 transition-all">
                    Read full case study <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
