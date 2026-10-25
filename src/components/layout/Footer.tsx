import { motion, useReducedMotion } from 'framer-motion';
import { Terminal, Code, Briefcase, Mail, Heart } from 'lucide-react';

const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Commit History', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  const socialLinks = [
    {
      icon: <Code className="h-4 w-4" />,
      href: 'https://github.com/Anjaleesahu',
      label: 'GitHub',
    },
    {
      icon: <Briefcase className="h-4 w-4" />,
      href: 'https://www.linkedin.com/in/anjalee-sahu-365b39334/',
      label: 'LinkedIn',
    },
    {
      icon: <Mail className="h-4 w-4" />,
      href: 'mailto:anjaleesahu25@gmail.com',
      label: 'Email',
    },
  ];

  const tileReveal = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 16 },
    whileInView: prefersReducedMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.45, ease: 'easeOut' as const },
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <motion.section className="footer-tile footer-brand-tile" {...tileReveal}>
            <a href="#" className="footer-brand" aria-label="Anjalee Sahu, back to top">
              <span className="footer-brand-mark" aria-hidden="true">
                <Terminal className="h-5 w-5" />
              </span>
              <span>Anjalee Sahu</span>
            </a>
            <div className="footer-socials" aria-label="Social links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="footer-social-link"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.section>

          <motion.nav
            className="footer-tile footer-navigation-tile"
            aria-label="Footer navigation"
            {...tileReveal}
          >
            <h2 className="footer-tile-title">Navigation</h2>
            <ul className="footer-navigation-list">
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="footer-text-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav
            className="footer-tile footer-legal-tile"
            aria-label="Legal"
            {...tileReveal}
          >
            <h2 className="footer-tile-title">Legal</h2>
            <ul className="footer-legal-list">
              {legalLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="footer-text-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div className="footer-tile footer-meta-tile" {...tileReveal}>
            <p className="footer-copyright">
              © {currentYear} AI Engineer Portfolio. All rights reserved.
            </p>
            <p className="footer-credit">
              <span>Built with</span>
              <Heart className="footer-heart" aria-hidden="true" />
              <span>using code</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
