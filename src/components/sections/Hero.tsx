import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Brain, Code2, Layers, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const socials = [
  {
    href: 'https://www.linkedin.com/in/anjalee-sahu-365b39334/',
    label: 'LinkedIn',
    icon: <FaLinkedinIn />,
  },
  {
    href: 'https://leetcode.com/u/_anjalee_sahu/',
    label: 'LeetCode',
    icon: <SiLeetcode />,
  },
  {
    href: 'https://github.com/Anjaleesahu',
    label: 'GitHub',
    icon: <FaGithub />,
  },
];

export const Hero = () => {
  return (
    <section className="hero-surface relative isolate flex min-h-[min(900px,100svh)] items-center overflow-hidden pt-28 pb-20">
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="hero-glow hero-glow-blue pointer-events-none absolute -left-40 top-24 -z-10" />
      <div className="hero-glow hero-glow-violet pointer-events-none absolute -right-40 bottom-0 -z-10" />

      <div className="container mx-auto grid items-center gap-12 px-6 md:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 mx-auto w-full max-w-3xl text-center lg:mx-0 lg:text-left"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.06] px-4 py-2 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 text-blue-300" />
            <span>Junior AI/ML Engineer | Python Developer</span>
          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.03] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl xl:text-[5.5rem] lg:mx-0">
            Code Meets
            <span className="mt-2 block bg-gradient-to-r from-blue-300 via-blue-200 to-sky-300 bg-clip-text text-transparent">
              Intelligence Future
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg lg:mx-0">
            Aspiring Software Engineer skilled in Python and full-stack development, with hands-on experience in AI, machine learning, and IoT projects. Passionate about building smart, practical solutions using technology.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="#projects"
              className="hero-primary-button inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5"
            >
              Explore my work <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="/anjalee_sahu_.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-6 py-3.5 text-sm font-semibold text-slate-200 transition duration-300 hover:border-blue-300/30 hover:bg-white/[0.07]"
            >
              View resume <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 lg:justify-start">
            <span className="mr-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Find me on</span>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-blue-300/30 hover:bg-blue-400/10 hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[420px] lg:mr-2"
        >
          <div className="hero-photo-glow pointer-events-none absolute -inset-6 rounded-[2.5rem] blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0c1318] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0c1318]">
              <img
                src="/me.png"
                alt="Anjalee Sahu - Profile Photo"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b11]/70 via-transparent to-transparent" />
            </div>
          </div>
          <div className="hero-skill-pills" role="group" aria-label="Areas of expertise">
            <div className="hero-skill-pill">
              <Code2 className="h-4 w-4" />
              Python Development
            </div>
            <div className="hero-skill-pill">
              <Layers className="h-4 w-4" />
              Full-Stack Development
            </div>
            <div className="hero-skill-pill">
              <Brain className="h-4 w-4" />
              AI/ML
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
