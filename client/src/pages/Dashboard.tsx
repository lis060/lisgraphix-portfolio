import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import LisTrackMini from '../components/dashboard/LisTrackMini';

export default function Dashboard() {
  return (
    <PageTransition>
      <SEO
        title="LisTrack Dashboard"
        description="Internal project and client dashboard — Lisgraphix studio operations overview."
        path="/dashboard"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-ink bg-radial-dark">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-gold" /> Studio Dashboard
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                  LisTrack <span className="text-gold">Mini</span>
                </h1>
                <p className="text-muted">
                  Live studio snapshot — clients, projects, revenue & tasks.
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">All systems live</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <LisTrackMini />
      </Section>
    </PageTransition>
  );
}
