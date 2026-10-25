import React, { useEffect, useRef, useState } from 'react';
import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
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
    <div className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.08] transition duration-500 hover:border-violet-300/25 ${isCenter ? 'bg-[#10111a] shadow-[0_24px_70px_rgba(0,0,0,0.28)]' : 'bg-[#10111a]'}`}>
      {/* Project Image */}
      <div className="relative h-48 shrink-0 overflow-hidden border-b border-white/[0.06] bg-[#171925] md:h-56">
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
        <div className="relative z-20 flex flex-1 flex-col p-6 md:p-7">
          <h3 className="mb-3 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-violet-200 md:text-xl">
            {project.title}
          </h3>
          <p className="mb-6 text-sm leading-7 text-slate-400">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
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
                className="flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-violet-200"
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
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

  const slideCount = Math.max(1, projects.length - slidesToShow + 1);
  const lastSlide = slideCount - 1;

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const updateSlidesToShow = () => {
      setSlidesToShow(desktopQuery.matches ? 2 : 1);
    };

    updateSlidesToShow();
    desktopQuery.addEventListener('change', updateSlidesToShow);
    return () => desktopQuery.removeEventListener('change', updateSlidesToShow);
  }, []);

  useEffect(() => {
    const nextSlide = Math.min(currentSlide, lastSlide);
    if (nextSlide !== currentSlide) setCurrentSlide(nextSlide);
  }, [currentSlide, lastSlide]);

  const scrollToSlide = (slideIndex: number) => {
    const nextSlide = Math.max(0, Math.min(slideIndex, lastSlide));
    const slider = sliderRef.current;
    const project = projectRefs.current[nextSlide];

    setCurrentSlide(nextSlide);
    if (slider && project) {
      slider.scrollTo({
        left: slider.scrollLeft + project.getBoundingClientRect().left - slider.getBoundingClientRect().left,
        behavior: 'smooth',
      });
    }
  };

  const handleSliderScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const sliderLeft = slider.getBoundingClientRect().left;
    const nearestProjectIndex = projectRefs.current.findIndex((project) => {
      return project !== null && project.getBoundingClientRect().left >= sliderLeft - 2;
    });
    const nextSlide = Math.min(Math.max(nearestProjectIndex, 0), lastSlide);
    setCurrentSlide((previousSlide) => previousSlide === nextSlide ? previousSlide : nextSlide);
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
      title="Projects"
      subtitle="Selected projects showcasing expertise in complex ML architectures and scalable deployments."
    >
      <div className="mt-10">
        <div className="mb-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollToSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
            aria-label="Previous projects"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition duration-200 hover:border-blue-300/30 hover:bg-blue-400/10 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSlide(currentSlide + 1)}
            disabled={currentSlide === lastSlide}
            aria-label="Next projects"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition duration-200 hover:border-blue-300/30 hover:bg-blue-400/10 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={sliderRef}
          role="region"
          aria-label="Project carousel"
          aria-roledescription="carousel"
          tabIndex={0}
          onScroll={handleSliderScroll}
          onKeyDown={handleSliderKeyDown}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth rounded-[1.6rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              ref={(element) => {
                projectRefs.current[index] = element;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${projects.length}: ${project.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="min-w-0 basis-full shrink-0 snap-start md:basis-[calc(50%-0.625rem)]"
            >
              <ProjectCard project={project} isCenter />
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2" role="group" aria-label="Choose a project slide">
          {Array.from({ length: slideCount }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to project slide ${index + 1}`}
              aria-current={currentSlide === index ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080a0e] ${
                currentSlide === index
                  ? 'w-8 bg-blue-400'
                  : 'w-2.5 bg-slate-500/60 hover:bg-blue-300/70'
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
