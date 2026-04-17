import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

export default function PortfolioPreview() {
  const featured = projects.slice(0, 3);

  return (
    <Section>
      <Reveal>
        <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-gold" /> Portfolio
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white max-w-lg">
            Work that speaks for itself
          </h2>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all"
          >
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.12}>
            <div className="group rounded-2xl overflow-hidden border border-white/10 bg-charcoal/60 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div className="flex gap-3">
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
                        <ExternalLink className="w-3 h-3" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <span className="text-gold text-xs font-medium uppercase tracking-widest">{project.category}</span>
                <h3 className="text-white font-bold text-lg mt-1">{project.title}</h3>
                <p className="text-muted text-sm mt-2 line-clamp-2">{project.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
