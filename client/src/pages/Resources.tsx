import { FileCheck, Palette, TrendingUp, MessageCircle, CalendarDays, Download, FileText } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import { resources } from '../data/resources';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCheck, Palette, TrendingUp, MessageCircle, CalendarDays,
};

const typeColors: Record<string, string> = {
  PDF: 'bg-red-500/10 text-red-400',
  Guide: 'bg-blue-500/10 text-blue-400',
  Template: 'bg-purple-500/10 text-purple-400',
};

export default function Resources() {
  return (
    <PageTransition>
      <SEO
        title="Free Resources"
        description="Download free guides, checklists, and templates to help grow your Ghanaian business online — from the Lisgraphix team."
        path="/resources"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-ink bg-radial-dark">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold" /> Free Resources
            </p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-3xl leading-tight">
              Free tools to grow your<br />
              <span className="text-gold">business online</span>
            </h1>
            <p className="text-muted text-lg max-w-xl mb-8">
              Practical, actionable resources created specifically for Ghanaian entrepreneurs.
              No email required — just click and download.
            </p>
            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
              <div><p className="text-3xl font-black text-gold">5</p><p className="text-muted text-sm">Free Resources</p></div>
              <div><p className="text-3xl font-black text-gold">100%</p><p className="text-muted text-sm">Free Forever</p></div>
              <div><p className="text-3xl font-black text-gold">0</p><p className="text-muted text-sm">Email Required</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, i) => {
            const Icon = iconMap[resource.icon] || FileText;
            return (
              <Reveal key={resource.id} delay={i * 0.08}>
                <div className="group flex flex-col p-7 rounded-2xl border border-white/10 bg-charcoal/60 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 h-full">

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${typeColors[resource.type] || 'bg-gold/10 text-gold'}`}>
                      {resource.type}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-semibold">
                      Free
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 text-white/50 text-xs">
                      {resource.pages}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-3 leading-snug">{resource.title}</h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-6">{resource.description}</p>

                  {/* Download button */}
                  <a
                    href={resource.href}
                    download={resource.filename}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold text-ink text-sm font-black tracking-wide hover:bg-gold/90 transition-all group-hover:shadow-lg group-hover:shadow-gold/20"
                  >
                    <Download className="w-4 h-4" />
                    Download Free
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom note */}
        <Reveal>
          <div className="mt-16 p-8 rounded-2xl border border-white/5 bg-charcoal/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="text-white font-bold text-lg mb-1">Want a custom resource for your industry?</p>
              <p className="text-muted text-sm">All resources are free. More guides added monthly — bookmark this page.</p>
            </div>
            <a
              href="https://wa.me/233544490241?text=Hi%20Lisgraphix%2C%20I%20downloaded%20your%20free%20resources%20and%20would%20like%20help%20with%20my%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gold/40 text-gold text-sm font-semibold hover:bg-gold hover:text-ink transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </Section>
    </PageTransition>
  );
}
