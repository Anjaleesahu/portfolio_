import React, { useState } from 'react';
import { Section } from '../layout/Section';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { BrainCircuit, Database, Code2, Cpu, Network, LineChart, Sparkles } from 'lucide-react';

const skills = [
  {
    category: 'Languages',
    icon: <Code2 className="w-5 h-5 text-blue-400" />,
    items: ['Python', 'C++', 'JavaScript', 'HTML', 'CSS'],
    bgGlow: 'bg-blue-600/15',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    imageBg: '/languages-bg.png',
    imageFit: 'cover',
  },
  {
    category: 'ML / AI',
    icon: <BrainCircuit className="w-5 h-5 text-purple-400" />,
    items: ['Scikit-learn', 'Logistic Regression', 'PyTorch'],
    bgGlow: 'bg-purple-600/15',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    imageBg: '/ml-ai-bg.png',
    imageFit: 'cover',
  },
  {
    category: 'Data & Libraries',
    icon: <LineChart className="w-5 h-5 text-pink-400" />,
    items: ['NumPy', 'Pandas', 'Data Preprocessing', 'Data Pipelines', 'Model Evaluation'],
    bgGlow: 'bg-pink-600/15',
    iconBg: 'bg-pink-500/10 border-pink-500/20',
    imageBg: '/data-libraries-bg.png',
    imageFit: 'cover',
  },
  {
    category: 'Tools & Platforms',
    icon: <Cpu className="w-5 h-5 text-green-400" />,
    items: ['Git', 'GitHub', 'Jupyter Notebook', 'Google Colab', 'VS Code', 'Firebase', 'Arduino IDE'],
    bgGlow: 'bg-green-600/15',
    iconBg: 'bg-green-500/10 border-green-500/20',
    imageBg: '/tools-bg.png',
    imageFit: 'cover',
  },
  {
    category: 'Frameworks & APIs',
    icon: <Network className="w-5 h-5 text-yellow-400" />,
    items: ['Flask', 'FastAPI', 'Django', 'REST APIs', 'Hugging Face Transformers'],
    bgGlow: 'bg-yellow-600/15',
    iconBg: 'bg-yellow-500/10 border-yellow-500/20',
    imageBg: '/frameworks-bg.png',
    imageFit: 'cover',
  },
  {
    category: 'Databases',
    icon: <Database className="w-5 h-5 text-red-400" />,
    items: ['MySQL', 'MongoDB'],
    bgGlow: 'bg-red-600/15',
    iconBg: 'bg-red-500/10 border-red-500/20',
    imageBg: '/databases-bg.png',
    imageFit: 'cover',
  },
];

const categoryVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

const skillVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32 },
  },
};

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const prefersReducedMotion = useReducedMotion();
  const categories = ['All', ...skills.map(({ category }) => category)];
  const visibleSkills = activeCategory === 'All'
    ? skills
    : skills.filter(({ category }) => category === activeCategory);

  return (
    <Section
      id="skills"
      title="Under the Hood"
      subtitle="A comprehensive toolkit for building state-of-the-art AI systems."
    >
      <div className="skills-atlas">
        <div className="skills-category-tabs" role="tablist" aria-label="Filter skills by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={`skills-category-tab${activeCategory === category ? ' is-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'All' && <Sparkles aria-hidden="true" />}
              <span>{category}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCategory}
            className="skills-category-list"
            variants={prefersReducedMotion ? undefined : categoryVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={prefersReducedMotion ? undefined : 'visible'}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            role="tabpanel"
          >
            {visibleSkills.map((skill) => (
              <motion.article
                key={skill.category}
                className="skills-category-row"
                variants={prefersReducedMotion ? undefined : skillVariants}
              >
                <div className="skills-category-heading">
                  <span className="skills-category-icon">{skill.icon}</span>
                  <div>
                    <h3>{skill.category}</h3>
                    <span className="skills-category-rule" />
                  </div>
                </div>
                <div className="skills-entry-list">
                  {skill.items.map((item) => (
                    <motion.div
                      key={item}
                      className="skills-entry"
                      variants={prefersReducedMotion ? undefined : skillVariants}
                    >
                      <span className="skills-entry-icon">{skill.icon}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
};
