import React, { useState } from 'react';
import { Section } from '../layout/Section';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Code, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  imagePath?: string;
  imageFit?: 'cover' | 'contain';
  screenshots?: { src: string; alt: string }[];
  link: string;
  github?: string;
};

const projects: Project[] = [
  {
    title: 'Aqua Alert System',
    description: 'An IoT-based water quality monitoring system that displays real-time TDS and turbidity readings, monitors water quality status, and alerts users when configured safety thresholds are exceeded.',
    tags: ['IoT', 'ESP8266', 'React', 'Firebase', 'Blynk', 'JavaScript'],
    image: 'Aqua Alert System',
    imagePath: '/images/aqua-alert-safe-dashboard.png',
    screenshots: [
      { src: '/images/aqua-alert-safe-dashboard.png', alt: 'Aqua Alert SAFE WATER dashboard with sensor readings' },
      { src: '/images/aqua-alert-sensor-trends.png', alt: 'Aqua Alert sensor gauges and real-time TDS and turbidity trend graphs' },
      { src: '/images/aqua-alert-unsafe-water.png', alt: 'Aqua Alert UNSAFE WATER alert' },
      { src: '/images/aqua-alert-virtual-pins.png', alt: 'Aqua Alert dashboard header and Blynk virtual pin references' },
    ],
    link: '#',
    github: 'https://github.com/Anjaleesahu/AquaAlertSystem',
  },
  {
    title: 'Report Analysis — AI-Powered Medical Report Analyzer',
    description: 'Developed a full-stack web application that allows users to upload medical reports and receive clear, easy-to-understand explanations of their results. Built using Python and MongoDB to store and retrieve report data, with an AI-powered workflow that simplifies complex medical terminology into plain-language summaries.',
    tags: ['Python', 'Flask', 'React', 'MongoDB', 'AI', 'NLP'],
    image: 'Medical Report Analyzer',
    imagePath: '/images/report-analysis-dashboard.png',
    imageFit: 'contain',
    link: '',
    github: 'https://github.com/Anjaleesahu/reportAnalysi',
  },
  {
    title: 'Harry Ice Creams — Ice Cream Website',
    description: 'Built a Django website for Harry Ice Creams with a three-slide homepage carousel, an ice cream collection displayed in Bootstrap cards, and navigation to About, Services, and Contact pages. The contact form saves submissions to the database.',
    tags: ['Python', 'Django', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: 'Harry Ice Creams homepage',
    imagePath: '/images/harry-ice-creams-homepage.png',
    screenshots: [
      { src: '/images/harry-ice-creams-homepage.png', alt: 'Harry Ice Creams navigation, search field, and homepage carousel' },
      { src: '/images/harry-ice-creams-selection.png', alt: 'Harry Ice Creams ice cream collection card grid' },
      { src: '/images/harry-ice-creams-contact.png', alt: 'Harry Ice Creams Contact Us page and contact form' },
    ],
    link: '',
    github: 'https://github.com/Anjaleesahu/IceCream',
  },
];

const ProjectCard = ({ project, isCenter }: { project: Project; isCenter: boolean }) => {
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const screenshots = project.screenshots;
  const screenshot = screenshots?.[screenshotIndex];

  return (
    <div className={`projects-showcase-preview group relative flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.08] transition duration-500 hover:border-violet-300/25 ${isCenter ? 'bg-[#10111a] shadow-[0_24px_70px_rgba(0,0,0,0.28)]' : 'bg-[#10111a]'}`}>
      {/* Project Image */}
      <div className="projects-showcase-image relative h-48 shrink-0 overflow-hidden border-b border-white/[0.06] bg-[#171925] md:h-56">
          {screenshot ? (
            <>
              <img
                src={screenshot.src}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-xl"
              />
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                className="absolute inset-0 z-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </>
          ) : project.imagePath ? (
            <img 
              src={project.imagePath} 
              alt={project.title} 
              className={`absolute inset-0 z-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
          ) : (
            <div className="absolute inset-0 z-0 flex items-center justify-center font-medium text-slate-500">
              {project.image}
            </div>
          )}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-50 md:hidden" />
          {/* Hover effect on image placeholder */}
          <div className="absolute inset-0 z-10 bg-violet-500/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {screenshots && screenshots.length > 1 && isCenter && (
            <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label={`Previous ${project.title} screenshot`}
                onClick={(event) => {
                  event.stopPropagation();
                  setScreenshotIndex((screenshotIndex - 1 + screenshots.length) % screenshots.length);
                }}
                className="rounded-full border border-white/20 bg-black/70 p-1.5 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="rounded-full bg-black/70 px-2.5 py-1 text-xs text-white/80 backdrop-blur-md">
                {screenshotIndex + 1} / {screenshots.length}
              </span>
              <button
                type="button"
                aria-label={`Next ${project.title} screenshot`}
                onClick={(event) => {
                  event.stopPropagation();
                  setScreenshotIndex((screenshotIndex + 1) % screenshots.length);
                }}
                className="rounded-full border border-white/20 bg-black/70 p-1.5 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        {/* Project Content */}
        <div className="projects-showcase-content relative z-20 flex flex-1 flex-col p-6 md:p-7">
          <h3 className="mb-3 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-violet-200 md:text-xl">
            {project.title}
          </h3>
          <p className="mb-6 text-sm leading-7 text-slate-400">
            {project.description}
          </p>
          
          <div className="projects-showcase-tags flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="rounded-full border border-white/[0.07] bg-white/[0.035] px-3 py-1 text-xs font-medium text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
            {project.link && (
              <a
                href={project.link}
                className="projects-action-link projects-action-primary flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-violet-200"
              >
                <ArrowUpRight className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="projects-action-link projects-action-secondary flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
              >
                <Code className="w-4 h-4" />
                Source Code
              </a>
            )}
          </div>
        </div>
    </div>
  );
};

export const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const lastSlide = projects.length - 1;

  const scrollToSlide = (slideIndex: number) => {
    const nextSlide = Math.max(0, Math.min(slideIndex, lastSlide));
    setCurrentSlide(nextSlide);
  };

  const handleSliderKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollToSlide(currentSlide + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollToSlide(currentSlide - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      scrollToSlide(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      scrollToSlide(lastSlide);
    }
  };

  return (
    <Section
      id="projects"
      title="Featured Work"
      subtitle="Selected projects showcasing expertise in complex ML architectures and scalable deployments."
    >
      <div className="projects-showcase">
        <div className="projects-showcase-toolbar">
          <span className="projects-showcase-count">
            {String(currentSlide + 1).padStart(2, '0')}
            <span> / {String(projects.length).padStart(2, '0')}</span>
          </span>
          <div className="projects-showcase-arrows">
            <button
              type="button"
              onClick={() => scrollToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
              aria-label="Previous projects"
              className="projects-carousel-control"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSlide(currentSlide + 1)}
              disabled={currentSlide === lastSlide}
              aria-label="Next projects"
              className="projects-carousel-control"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="projects-showcase-layout">
          <div
            className="projects-showcase-active"
            role="region"
            aria-label="Active project preview"
            aria-live="polite"
            onKeyDown={handleSliderKeyDown}
            tabIndex={0}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={projects[currentSlide].title}
                className="projects-showcase-transition"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -18 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: 'easeOut' }}
              >
                <span className="projects-showcase-watermark" aria-hidden="true">
                  {String(currentSlide + 1).padStart(2, '0')}
                </span>
                <ProjectCard project={projects[currentSlide]} isCenter />
              </motion.div>
            </AnimatePresence>
          </div>

          <nav className="projects-showcase-list" aria-label="Choose a project">
            <span className="projects-showcase-list-label">EXPLORE PROJECTS</span>
            {projects.map((project, index) => (
              <motion.button
                key={project.title}
                type="button"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.32, delay: prefersReducedMotion ? 0 : index * 0.07 }}
                onClick={() => scrollToSlide(index)}
                onMouseEnter={() => setCurrentSlide(index)}
                aria-current={currentSlide === index ? 'true' : undefined}
                aria-label={`Show project ${String(index + 1).padStart(2, '0')}: ${project.title}`}
                className="projects-showcase-item"
              >
                <span className="projects-showcase-item-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="projects-showcase-item-title">{project.title}</span>
                <ArrowUpRight className="projects-showcase-item-arrow" aria-hidden="true" />
              </motion.button>
            ))}
            <div className="projects-showcase-pagination" role="group" aria-label="Choose a project slide">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => scrollToSlide(index)}
                  aria-label={`Go to project slide ${index + 1}`}
                  aria-current={currentSlide === index ? 'true' : undefined}
                  className={`projects-pagination-dot${currentSlide === index ? ' projects-pagination-active' : ''}`}
                />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </Section>
  );
};
