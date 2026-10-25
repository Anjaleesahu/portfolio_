import React, { useEffect, useState, useRef } from 'react';
import { Section } from '../layout/Section';
import { motion, useInView } from 'framer-motion';
import {
  BrainCircuit,
  Briefcase,
  Calendar,
  Code2,
  Cpu,
  FileText,
  FolderGit2,
  GraduationCap,
  Layers3,
  Waves,
} from 'lucide-react';

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
      title="Hello, World!"
      subtitle="Computer Science student building practical solutions with Python, full-stack development, and AI/ML."
    >
      <div className="about-layout">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="about-story-panel"
        >
          <span className="about-panel-label">WHAT I DO</span>
          <h3>
            Solving <span>Real Problems</span> with <span>Technology</span>
          </h3>
          <div className="about-story-accent" />
          <div className="about-story-copy">
            <p>
              I’m Anjalee Sahu, a final-year Computer Science student with hands-on experience in Python, full-stack development, AI/ML, and IoT. My projects include an IoT-based water quality monitor and an AI-powered medical report analyzer, where I’ve enjoyed turning ideas into useful, practical applications.
            </p>
            <p>
              After completing an Artificial Intelligence internship at Persevex, I’m eager to keep learning and take on new challenges. I’m passionate about exploring emerging technologies and building thoughtful, innovative solutions that can make a real difference.
            </p>
          </div>

          <div className="about-domain-list" aria-label="Areas of focus">
            <div className="about-domain-chip"><Code2 aria-hidden="true" /><span>Python</span></div>
            <div className="about-domain-chip"><Layers3 aria-hidden="true" /><span>Full-Stack</span></div>
            <div className="about-domain-chip"><BrainCircuit aria-hidden="true" /><span>AI/ML</span></div>
            <div className="about-domain-chip"><Cpu aria-hidden="true" /><span>IoT</span></div>
          </div>
        </motion.article>

        <motion.section
          className="about-profile-projects"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          aria-label="Profile and projects"
        >
          <div className="about-profile-card">
            <span className="about-panel-label">PROFILE</span>
            <h3>Anjalee Sahu</h3>
            <p>Final-year Computer Science student</p>
            <div className="about-profile-internship">
              <Briefcase aria-hidden="true" />
              <span><small>Internship</small>AI Intern at Persevex</span>
            </div>
          </div>
          <div className="about-project-showcase">
            <div className="about-projects-heading">
              <span className="about-panel-label">SELECTED PROJECTS</span>
              <span className="about-projects-rule" />
            </div>
            <article className="about-project-card">
              <span className="about-project-icon"><Waves aria-hidden="true" /></span>
              <div>
                <span className="about-project-type">IoT PROJECT</span>
                <h4>IoT-based water quality monitor</h4>
              </div>
            </article>
            <article className="about-project-card">
              <span className="about-project-icon about-project-icon-ai"><FileText aria-hidden="true" /></span>
              <div>
                <span className="about-project-type">AI/ML PROJECT</span>
                <h4>AI-powered medical report analyzer</h4>
              </div>
            </article>
          </div>
        </motion.section>
      </div>

      <div className="about-highlights">
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="about-highlight about-education"
        >
          <div className="about-highlight-topline">
            <span className="about-panel-label">EDUCATION</span>
            <GraduationCap aria-hidden="true" />
          </div>
          <h4>Education</h4>
          <p>B.Tech Computer Science</p>
          <span className="about-highlight-detail">Malwa Institute of Technology (2023 - 2027)</span>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="about-highlight about-internship"
        >
          <div className="about-highlight-topline">
            <span className="about-panel-label">EXPERIENCE</span>
            <Briefcase aria-hidden="true" />
          </div>
          <h4>Internship</h4>
          <p>AI Intern at Persevex</p>
          <span className="about-highlight-detail">Artificial Intelligence</span>
        </motion.article>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="about-stats"
      >
        <div className="about-stat">
          <FolderGit2 aria-hidden="true" />
          <div className="about-stat-value"><AnimatedCounter to={3} />+</div>
          <div className="about-stat-label">Projects</div>
        </div>
        <div className="about-stat">
          <Briefcase aria-hidden="true" />
          <div className="about-stat-value"><AnimatedCounter to={1} /></div>
          <div className="about-stat-label">Internship</div>
        </div>
        <div className="about-stat">
          <Calendar aria-hidden="true" />
          <div className="about-stat-value"><AnimatedCounter to={2027} duration={1} /></div>
          <div className="about-stat-label">Graduation</div>
        </div>
        <div className="about-stat">
          <Code2 aria-hidden="true" />
          <div className="about-stat-value about-stat-language">Python</div>
          <div className="about-stat-label">Primary Language</div>
        </div>
      </motion.div>
    </Section>
  );
};
