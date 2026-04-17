import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Check, Star } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import { caseStudies } from '../data/caseStudies';
import NotFound from './NotFound';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) return <NotFound />;

  return (
    <PageTransition>
      <SEO
        title={cs.title}
        description={`Case study: ${cs.title} — ${cs.client}. Discover the approach and results.`}
        path={`/case-studies/${cs.slug}`}
        image={cs.coverImage}
      />

      {/* Hero */}
      <section className="pt-28 pb-0 bg-ink">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-muted text-sm hover:text-gold transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Case Studies
            </Link>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/20 text-gold text-xs font-semibold">
                {cs.industry}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-xs flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> {cs.duration}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-4xl leading-[1.05]">
              {cs.title}
            </h1>
            <p className="text-muted text-lg max-w-2xl mb-10">
              Client: <span className="text-white">{cs.client}</span>
            </p>
          </Reveal>
        </div>

        {/* Cover image */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl overflow-hidden aspect-video bg-charcoal">
            <img
              src={cs.coverImage}
              alt={cs.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Challenge */}
            <Reveal>
              <h2 className="text-2xl font-black text-white mb-4">The Challenge</h2>
              <p className="text-muted leading-relaxed">{cs.challenge}</p>
            </Reveal>

            {/* Approach */}
            <Reveal>
              <h2 className="text-2xl font-black text-white mb-6">The Approach</h2>
              <div className="space-y-6">
                {cs.approach.map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-xs font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1.5">{step.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Testimonial */}
            {cs.testimonial && (
              <Reveal>
                <div className="p-7 rounded-2xl border border-gold/20 bg-gold/5">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="text-white text-lg leading-relaxed mb-5">
                    "{cs.testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="text-white font-semibold">{cs.testimonial.author}</p>
                    <p className="text-muted text-sm">{cs.testimonial.role}</p>
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Results */}
            <Reveal>
              <div className="p-6 rounded-2xl border border-white/10 bg-charcoal/60">
                <h3 className="text-white font-bold mb-5">Results</h3>
                <div className="space-y-5">
                  {cs.results.map((r) => (
                    <div key={r.metric} className="border-b border-white/5 pb-5 last:border-0 last:pb-0">
                      <p className="text-gold font-black text-2xl">{r.value}</p>
                      <p className="text-white font-medium text-sm">{r.metric}</p>
                      <p className="text-muted text-xs mt-1">{r.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Stack */}
            <Reveal>
              <div className="p-6 rounded-2xl border border-white/10 bg-charcoal/60">
                <h3 className="text-white font-bold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {cs.stack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="p-6 rounded-2xl border border-gold/20 bg-gold/5 text-center">
                <p className="text-white font-bold mb-2">Want similar results?</p>
                <p className="text-muted text-sm mb-4">Let's discuss your project.</p>
                <Link
                  to="/booking"
                  className="block w-full py-3 rounded-xl bg-gold text-ink font-semibold text-sm text-center hover:bg-gold/90 transition-colors"
                >
                  Start a Project
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
