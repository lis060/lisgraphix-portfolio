import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../../data/site';

const words = ['I', 'Build', 'Websites', 'That', 'Get', 'You', 'Customers'];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroHome() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink bg-grid bg-radial-dark grain">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Micro-label */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6 flex items-center gap-2"
            >
              <span className="w-8 h-px bg-gold" />
              Based in Accra, Ghana
            </motion.p>

            {/* Animated Heading */}
            <motion.h1
              variants={container}
              initial="hidden"
              animate="show"
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariant}
                  className={`inline-block mr-3 ${
                    word === 'Customers' ? 'text-gold' : 'text-white'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-muted text-lg leading-relaxed max-w-md mb-10"
            >
              Web Design, Graphics & Software Solutions in Accra — built for businesses
              that want real results, not just a pretty page.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gold text-ink font-semibold text-sm hover:bg-gold/90 transition-all hover:shadow-lg hover:shadow-gold/25 hover:-translate-y-0.5"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-gold/40 text-gold font-semibold text-sm hover:border-gold hover:bg-gold/5 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex gap-8 mt-12 pt-8 border-t border-white/5"
            >
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '100%', label: 'Client Satisfaction' },
                { value: '3yrs', label: 'Experience' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-muted text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Laptop Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Laptop SVG */}
            <div className="relative w-full max-w-lg animate-float">
              <div className="relative rounded-3xl overflow-hidden border border-gold/30 shadow-2xl shadow-gold/10 aspect-[4/3] bg-charcoal">
                <img
                  src="/assets/hero.jpg"
                  alt="Lisgraphix — premium web design for Ghanaian businesses"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* Subtle gradient overlay for luxury feel */}
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -left-8 top-1/4 bg-charcoal border border-gold/30 rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="text-gold font-black text-xl">+312%</p>
                <p className="text-white/60 text-xs mt-0.5">Leads increase</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute -right-4 bottom-16 bg-charcoal border border-gold/30 rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="text-gold font-black text-xl">24h</p>
                <p className="text-white/60 text-xs mt-0.5">Avg delivery start</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
