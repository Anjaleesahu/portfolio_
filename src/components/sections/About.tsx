import React, { useEffect, useState, useRef } from 'react';
import { Section } from '../layout/Section';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Code2, FolderGit2, Calendar } from 'lucide-react';

const AnimatedCounter = ({ to, duration = 2 }: { to: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      const steps = duration * 60;
      const increment = to / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(current));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}</span>;
};

export const About = () => {
  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Computer Science student building practical solutions with Python, full-stack development, and AI/ML."
    >
      <div className="mt-12 flex flex-col gap-12 md:gap-20">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex w-full flex-col gap-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Building Practical Solutions with Code and AI
              </h3>
              <div className="h-1 w-20 rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />
            </div>
            
            <div className="max-w-prose space-y-5 text-base leading-8 text-slate-400 sm:text-lg">
              <p>
                I’m Anjalee Sahu, a final-year Computer Science student with hands-on experience in Python, full-stack development, AI/ML, and IoT. My projects include an IoT-based water quality monitor and an AI-powered medical report analyzer, where I’ve enjoyed turning ideas into useful, practical applications.
              </p>
              <p>
                After completing an Artificial Intelligence internship at Persevex, I’m eager to keep learning and take on new challenges. I’m passionate about exploring emerging technologies and building thoughtful, innovative solutions that can make a real difference.
              </p>
            </div>

            {/* Information Cards (Education & Internship) */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="relative group/card h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/15 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover/card:opacity-100" />
                <div className="relative h-full rounded-2xl border border-white/[0.07] bg-[#10111a] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300/20">
                  <GraduationCap className="w-8 h-8 text-blue-400 mb-4" />
                  <h4 className="font-bold text-white mb-1">Education</h4>
                  <p className="text-sm text-gray-400">B.Tech Computer Science</p>
                  <p className="text-xs text-gray-500 mt-2">Malwa Institute of Technology (2023 - 2027)</p>
                </div>
              </div>

              <div className="relative group/card h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/15 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover/card:opacity-100" />
                <div className="relative h-full rounded-2xl border border-white/[0.07] bg-[#10111a] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-300/20">
                  <Briefcase className="w-8 h-8 text-purple-400 mb-4" />
                  <h4 className="font-bold text-white mb-1">Internship</h4>
                  <p className="text-sm text-gray-400">AI Intern at Persevex</p>
                  <p className="text-xs text-gray-500 mt-2">Artificial Intelligence</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#10111a] p-5 text-center transition-colors hover:border-violet-300/20 md:p-6">
            <FolderGit2 className="mb-3 h-6 w-6 text-blue-300" />
            <div className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter to={3} />+
            </div>
            <div className="text-sm font-medium text-slate-500">Projects</div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#10111a] p-5 text-center transition-colors hover:border-violet-300/20 md:p-6">
            <Briefcase className="mb-3 h-6 w-6 text-violet-300" />
            <div className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter to={1} />
            </div>
            <div className="text-sm font-medium text-slate-500">Internship</div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#10111a] p-5 text-center transition-colors hover:border-violet-300/20 md:p-6">
            <Calendar className="mb-3 h-6 w-6 text-blue-300" />
            <div className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter to={2027} duration={1} />
            </div>
            <div className="text-sm font-medium text-slate-500">Graduation</div>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#10111a] p-5 text-center transition-colors hover:border-violet-300/20 md:p-6">
            <Code2 className="mb-3 h-6 w-6 text-violet-300" />
            <div className="text-2xl font-bold text-white mb-1 mt-1">Python</div>
            <div className="text-sm font-medium text-slate-500">Primary Language</div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
