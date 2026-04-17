import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import BookingForm from '../components/booking/BookingForm';
import { MessageCircle, Mail, Clock } from 'lucide-react';
import { site } from '../data/site';

export default function Booking() {
  return (
    <PageTransition>
      <SEO
        title="Book a Project"
        description="Ready to start your web project? Book a consultation with Lisgraphix — Ghana's premier web design and software studio."
        path="/booking"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-ink bg-radial-dark">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold" /> Book a Project
            </p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-3xl">
              Let's build something great together
            </h1>
            <p className="text-muted text-lg max-w-xl">
              Fill out the form below and we'll get back to you within 24 hours to discuss your project, timeline, and investment.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Info sidebar */}
          <Reveal className="space-y-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-charcoal/60">
              <h3 className="text-white font-bold mb-4">What happens next?</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'You submit this form', desc: 'Takes under 2 minutes. No commitment required.' },
                  { step: '2', title: 'We review your project', desc: 'We assess your requirements within 24 hours.' },
                  { step: '3', title: 'Discovery call', desc: 'We schedule a 30-min call to align on scope and goals.' },
                  { step: '4', title: 'Proposal & kickoff', desc: 'You receive a detailed proposal and we get to work.' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold flex-shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{s.title}</p>
                      <p className="text-muted text-xs mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-charcoal/60">
              <h3 className="text-white font-bold mb-4">Prefer to chat directly?</h3>
              <div className="space-y-3">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-gold/10 border border-gold/20 hover:bg-gold/20 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-white text-sm font-medium">WhatsApp</p>
                    <p className="text-muted text-xs">{site.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold/20 transition-colors"
                >
                  <Mail className="w-5 h-5 text-muted" />
                  <div>
                    <p className="text-white text-sm font-medium">Email</p>
                    <p className="text-muted text-xs">{site.email}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-charcoal/30">
              <Clock className="w-4 h-4 text-gold flex-shrink-0" />
              <p className="text-muted text-xs">
                We respond to all enquiries within 24 hours, Monday to Saturday.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-2">
            <div className="p-8 rounded-2xl border border-white/10 bg-charcoal/60">
              <h2 className="text-white font-bold text-xl mb-6">Project Request Form</h2>
              <BookingForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </PageTransition>
  );
}
