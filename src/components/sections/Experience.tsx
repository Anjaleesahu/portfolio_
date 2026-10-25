import React, { useRef } from 'react';
import { Section } from '../layout/Section';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BriefcaseBusiness, CalendarDays } from 'lucide-react';

const experiences = [
  {
    role: 'Artificial Intelligence Intern',
    company: 'Persevex',
    period: 'Nov 2025 – Jan 2026',
    description: 'Applied machine learning and NLP techniques to real-world problem statements. Developed and evaluated supervised learning models using Python and Scikit-learn, implementing text preprocessing and feature engineering workflows.',
  },
];

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <Section id="experience" title="Commit History" subtitle="My professional journey in building intelligent systems.">
      <div ref={containerRef} className="experience-log">
        {experiences.map((exp, index) => (
          <motion.article
            key={`${exp.company}-${exp.role}`}
            className="experience-entry"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="experience-entry-aside">
              <span className="experience-entry-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="experience-entry-kicker">COMMIT HISTORY</span>
              <div className="experience-entry-period">
                <CalendarDays aria-hidden="true" />
                <span>{exp.period}</span>
              </div>
            </div>

            <div className="experience-entry-content">
              <div className="experience-entry-company">
                <BriefcaseBusiness aria-hidden="true" />
                <span>{exp.company}</span>
              </div>
              <h3>{exp.role}</h3>
              <p>{exp.description}</p>
            </div>
          </motion.article>
        ))}
        <div className="experience-progress" aria-hidden="true">
          <motion.div
            className="experience-progress-fill"
            style={{ scaleX: progress, transformOrigin: 'left' }}
          />
        </div>
      </div>
    </Section>
  );
};
