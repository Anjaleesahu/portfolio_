import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  BrainCircuit,
  Code2,
  Database,
  GitBranch,
  Laptop,
  PanelsTopLeft,
  Terminal,
} from 'lucide-react';

const technologies = [
  { name: 'HTML', icon: Code2 },
  { name: 'CSS', icon: PanelsTopLeft },
  { name: 'JAVASCRIPT', icon: Code2 },
  { name: 'PYTHON', icon: Terminal },
  { name: 'NUMPY', icon: BrainCircuit },
  { name: 'PANDAS', icon: BrainCircuit },
  { name: 'SCIKIT-LEARN', icon: BrainCircuit },
  { name: 'C++', icon: Code2 },
  { name: 'FIGMA', icon: PanelsTopLeft },
  { name: 'MACHINE LEARNING', icon: BrainCircuit },
  { name: 'NLP', icon: BrainCircuit },
  { name: 'SQL', icon: Database },
  { name: 'GIT', icon: GitBranch },
  { name: 'GITHUB', icon: GitBranch },
  { name: 'VS CODE', icon: Laptop },
  { name: 'JUPYTER NOTEBOOK', icon: Laptop },
];

export const SkillsHighlights = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '100px 0px', threshold: 0 },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const firstRow = technologies.slice(0, 8);
  const secondRow = technologies.slice(8);

  return (
    <section
      ref={sectionRef}
      className={`tech-highlights${isInView ? ' is-in-view' : ''}${prefersReducedMotion ? ' is-static' : ''}`}
      aria-label="Core Toolkit: technologies and tools"
    >
      <div className="tech-highlights-inner">
        <div className="tech-highlights-heading">
          <span>CORE TOOLKIT</span>
          <div className="tech-highlights-rule" aria-hidden="true">
            <i />
          </div>
        </div>

        <div className="tech-marquee" role="group" aria-label="Core technologies">
          {[firstRow, secondRow].map((row, rowIndex) => (
            <div
              className={`tech-marquee-row${rowIndex === 1 ? ' tech-marquee-row-reverse' : ''}`}
              key={rowIndex}
            >
              <div className="tech-marquee-track">
                {[0, 1].map((copy) => (
                  <div
                    className="tech-marquee-group"
                    key={copy}
                    aria-hidden={copy === 1 ? 'true' : undefined}
                  >
                    {row.map(({ name, icon: Icon }, index) => (
                      <div
                        className="tech-highlight-chip"
                        key={name}
                        style={{ '--chip-order': index } as CSSProperties}
                      >
                        <Icon aria-hidden="true" />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
