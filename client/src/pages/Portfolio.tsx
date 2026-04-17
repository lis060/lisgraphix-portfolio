import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import { projects } from '../data/projects';

const categories = ['All', 'Web Design', 'E-commerce', 'E-commerce / Real Estate', 'Web Design & Branding', 'Software Development'];
const unique = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <PageTransition>
      <SEO
        title="Portfolio — Web Design Projects in Ghana"
        description="Explore Lisgraphix's portfolio of web design, e-commerce, branding, and software projects built for businesses across Ghana — including Accra, Tema and Kumasi. See real results from real clients."
        path="/portfolio"
        keywords="web design portfolio Ghana, website examples Accra, e-commerce website Ghana examples, graphic design portfolio Ghana, Lisgraphix portfolio"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Lisgraphix Portfolio — Web Design Projects in Ghana',
          description: 'Portfolio of web design, e-commerce, and software projects for Ghanaian businesses',
          url: 'https://lisgraphix.com/portfolio',
          isPartOf: { '@id': 'https://lisgraphix.com/#website' },
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-ink bg-radial-dark">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold" /> Portfolio
            </p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
              Work that delivers results
            </h1>
            <p className="text-muted text-lg max-w-xl">
              Explore a selection of projects we're proud of — from local barbershops to fintech startups.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        {/* Filter tabs */}
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-12">
            {unique.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === cat
                    ? 'bg-gold text-ink'
                    : 'border border-white/10 text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <div className="group rounded-2xl overflow-hidden border border-white/10 bg-charcoal/60 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.category} project by Lisgraphix, web design agency in Accra Ghana`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <div className="flex gap-3 flex-wrap">
                      {project.caseStudySlug && (
                        <Link
                          to={`/case-studies/${project.caseStudySlug}`}
                          className="px-3 py-1.5 rounded-lg bg-gold text-ink text-xs font-semibold"
                        >
                          Case Study
                        </Link>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gold text-xs font-medium uppercase tracking-widest">{project.category}</span>
                    <span className="text-muted text-xs">{project.year}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg">{project.title}</h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">{project.description}</p>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/5 text-white/50 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
