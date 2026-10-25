import React from 'react';
import { Section } from '../layout/Section';
import { motion, type Variants } from 'framer-motion';
import { BrainCircuit, Database, Code2, Cpu, Network, LineChart } from 'lucide-react';

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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const Skills = () => {
  return (
    <Section
      id="skills"
      title="Technical Arsenal"
      subtitle="A comprehensive toolkit for building state-of-the-art AI systems."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative h-full overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#10111a] p-6 transition duration-500 hover:-translate-y-1 hover:border-violet-300/20 hover:bg-[#131521] md:p-7"
          >
            <div className={`pointer-events-none absolute -right-24 -top-24 z-0 h-56 w-56 rounded-full opacity-70 blur-[85px] transition duration-700 group-hover:opacity-100 ${skill.bgGlow}`} />
            
            {/* Optional Image Background */}
            {skill.imageBg && (
              <div 
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] mix-blend-screen transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${skill.imageBg})`,
                  backgroundSize: skill.imageFit || 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
            
            <div className="relative z-10">
              <div className={`mb-6 inline-flex items-center justify-center rounded-xl border p-3 ${skill.iconBg}`}>
                {skill.icon}
              </div>
              <h3 className="mb-4 text-xl font-semibold tracking-tight text-white">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="cursor-default rounded-lg border border-white/[0.06] bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-violet-300/20 hover:bg-violet-300/[0.08] hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
