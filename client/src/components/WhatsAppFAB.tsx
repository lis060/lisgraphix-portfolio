import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { site } from '../data/site';

export default function WhatsAppFAB() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping" />
      <motion.a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gold shadow-lg shadow-gold/30 hover:bg-gold/90 transition-colors"
      >
        <MessageCircle className="w-6 h-6 text-ink" fill="currentColor" />
      </motion.a>
    </div>
  );
}
