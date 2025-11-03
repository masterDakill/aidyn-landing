'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimateIn({ children, delay = 0, className }: AnimateInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
