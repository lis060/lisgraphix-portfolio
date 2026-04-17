import { motion } from 'framer-motion';
import { MapPin, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import GoldDivider from '../components/ui/GoldDivider';
import { site } from '../data/site';

const skills = [
  'React', 'Vite', 'Tailwind CSS', 'JavaScript',
  'GitHub', 'Supabase', 'Node.js', 'Photoshop', 'After Effects',
];

const milestones = [
  { year: '2022', title: 'Started Learning', desc: 'Began self-taught journey in web design and development, driven by passion for technology and helping businesses grow online.' },
  { year: '2023', title: 'First Projects', desc: 'Completed initial client projects including barbering websites and flyer designs, building real-world experience.' },
  { year: '2024', title: 'Expanded Skills', desc: 'Mastered React, built the LisTrack dashboard, and started delivering more complex software solutions.' },
  { year: '2025', title: 'Lisgraphix Growth', desc: 'Continuing to serve Ghanaian businesses with modern websites, graphics, and automation solutions.' },
];

export default function About() {
  return (
    <PageTransition>
      <SEO
        title="About — Listowell Dei Anane, Web Designer in Accra Ghana"
        description="Meet Listowell Dei Anane — Ghana-based soldier turned self-taught web designer and software developer. 2+ years building modern websites for businesses in Accra and across Ghana. Learn the story behind Lisgraphix."
        path="/about"
        keywords="Lisgraphix about, web designer Accra Ghana, Listowell Dei Anane, self-taught web developer Ghana, Ghana web design agency"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Lisgraphix — Web Designer in Accra Ghana',
          url: 'https://lisgraphix.com/about',
          isPartOf: { '@id': 'https://lisgraphix.com/#website' },
          about: { '@id': 'https://lisgraphix.com/#business' },
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-ink bg-radial-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal>
                <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-gold" /> About Me
                </p>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]">
                  Listowell{' '}
                  <span className="text-gold">Dei Anane</span>
                </h1>
                <p className="text-muted text-lg leading-relaxed mb-6">
                  I am a Ghana-based soldier and self-taught web designer, graphic designer, and
                  software developer. My journey started with a passion for design and technology,
                  and over time I have built skills in creating modern websites and digital solutions
                  that help businesses grow.
                </p>
                <p className="text-muted text-base leading-relaxed mb-6">
                  Through discipline from my military background and continuous self-learning, I have
                  been able to combine creativity with technical skills to deliver clean, effective,
                  and high-performing digital products. My goal is to help businesses look professional
                  online and attract more customers.
                </p>

                <div className="flex items-center gap-2 mt-8 text-muted text-sm">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{site.location}</span>
                  <span className="text-white/20">·</span>
                  <span>2+ years experience</span>
                </div>
              </Reveal>
            </div>

            {/* Profile visual */}
            <Reveal direction="left">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-charcoal border border-gold/20">
                  <img
                    src="/assets/profile.jpg"
                    alt="Listowell Dei Anane - Lisgraphix"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-5 -left-5 bg-charcoal border border-gold/30 rounded-2xl px-5 py-4 shadow-xl"
                >
                  <p className="text-gold font-black text-2xl">2+</p>
                  <p className="text-white/60 text-sm">Years Experience</p>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-5 -right-5 bg-charcoal border border-gold/30 rounded-2xl px-5 py-4 shadow-xl"
                >
                  <p className="text-gold font-black text-2xl">10+</p>
                  <p className="text-white/60 text-sm">Projects Delivered</p>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <Section>
        <GoldDivider className="mb-16" />
        <Reveal>
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-gold" /> Skills & Stack
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12">What I work with</h2>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <Reveal key={skill} delay={i * 0.05}>
              <span className="px-4 py-2 rounded-xl border border-white/10 bg-charcoal/60 text-white/80 text-sm font-medium hover:border-gold hover:text-gold transition-colors">
                {skill}
              </span>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section className="bg-charcoal/30">
        <Reveal>
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-gold" /> Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12">My Story</h2>
        </Reveal>
        <div className="relative border-l border-gold/20 pl-8 space-y-10">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.1}>
              <div className="relative">
                <div className="absolute -left-[38px] w-4 h-4 rounded-full bg-gold border-4 border-ink" />
                <p className="text-gold text-sm font-bold mb-1">{m.year}</p>
                <h3 className="text-white font-bold text-lg mb-2">{m.title}</h3>
                <p className="text-muted text-sm leading-relaxed max-w-xl">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Ready to work together?
            </h2>
            <p className="text-muted mb-10 max-w-lg mx-auto">
              Let's create something that grows your business. Reach out via any channel below.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gold text-ink font-semibold text-sm hover:bg-gold/90 transition-colors"
              >
                Book a Project
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-gold/40 text-gold font-semibold text-sm hover:border-gold hover:bg-gold/5 transition-all"
              >
                <Mail className="w-4 h-4" /> {site.email}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-white/70 font-semibold text-sm hover:text-gold hover:border-gold/40 transition-all"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </PageTransition>
  );
}
