import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  id?: string;
}

export default function Reveal({ children, className = '', delay = 0, direction = 'up', id }: RevealProps) {
  const shouldReduce = useReducedMotion();

  const initial = shouldReduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === 'up' ? 32 : 0,
        x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
      };

  const animate = { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      id={id}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
