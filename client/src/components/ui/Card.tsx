import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = true, onClick }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, borderColor: '#c9a96e' } : undefined}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl border border-white/10 bg-charcoal/60 backdrop-blur-sm shadow-sm ${
        hover ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
