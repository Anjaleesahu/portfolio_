import { motion } from 'framer-motion';
import { ArrowUpRight, Award, BadgeCheck, BriefcaseBusiness } from 'lucide-react';
import { Section } from '../layout/Section';

const certificates = [
  {
    title: 'Certificate of Internship Completion',
    issuer: 'Persevex · Artificial Intelligence',
    detail: 'Awarded 11 January 2026 after a two-month internship.',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    accent: 'from-blue-400/15 to-transparent text-blue-200',
    href: '/anjalee_sahu_.pdf',
    linkLabel: 'View resume',
  },
  {
    title: 'Python',
    issuer: 'HackerRank Certification',
    detail: 'Python certification.',
    icon: <Award className="h-5 w-5" />,
    accent: 'from-violet-400/15 to-transparent text-violet-200',
    href: 'https://www.hackerrank.com/profile/anju_sahu0525',
    linkLabel: 'View profile',
  },
  {
    title: 'SQL',
    issuer: 'HackerRank Certification',
    detail: 'SQL certification.',
    icon: <BadgeCheck className="h-5 w-5" />,
    accent: 'from-indigo-400/15 to-transparent text-indigo-200',
    href: 'https://www.hackerrank.com/profile/anju_sahu0525',
    linkLabel: 'View profile',
  },
];

export const Certificates = () => (
  <Section
    id="certificates"
    title="Certificates"
    subtitle="Recognitions and certifications earned through hands-on learning and professional experience."
  >
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {certificates.map((certificate, index) => (
        <motion.article
          key={certificate.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: index * 0.07 }}
          className={`group relative overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-[#10111a] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-300/25`}
        >
          <div className={`pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-gradient-to-br blur-2xl ${certificate.accent.split(' ')[0]}`} />
          <div className="relative">
            <div className={`mb-8 inline-flex rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 ${certificate.accent.split(' ').slice(2).join(' ')}`}>
              {certificate.icon}
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.17em] text-slate-500">{certificate.issuer}</p>
            <h3 className="text-xl font-semibold leading-snug tracking-tight text-white">{certificate.title}</h3>
            <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">{certificate.detail}</p>
            <a
              href={certificate.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors hover:text-violet-200"
            >
              {certificate.linkLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  </Section>
);
