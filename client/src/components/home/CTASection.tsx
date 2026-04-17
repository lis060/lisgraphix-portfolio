import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { site } from '../../data/site';
import Section from '../ui/Section';
import Reveal from '../ui/Reveal';

export default function CTASection() {
  return (
    <Section className="bg-charcoal/30">
      <Reveal>
        <div className="relative rounded-3xl overflow-hidden bg-charcoal border border-gold/20 p-12 md:p-20 text-center">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-5">
              — Ready to grow?
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-2xl mx-auto">
              Your dream website is one conversation away
            </h2>
            <p className="text-muted text-lg max-w-lg mx-auto mb-10">
              Let's discuss your goals, timeline, and budget. No hard sell — just an honest conversation about what's possible.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold text-ink font-semibold hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20"
                >
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gold/40 text-gold font-semibold hover:border-gold hover:bg-gold/5 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Now
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
