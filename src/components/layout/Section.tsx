import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const Section = ({
  id,
  title,
  subtitle,
  children,
  className,
  containerClassName,
}: SectionProps) => {
  return (
    <section id={id} className={cn('relative overflow-hidden py-20 md:py-28', className)}>
      <motion.div 
        className={cn('container mx-auto px-6 md:px-12 relative z-10', containerClassName)}
      >
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-12 md:mb-16"
          >
            {title && (
              <h2 className="mb-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        {children}
      </motion.div>
    </section>
  );
};
