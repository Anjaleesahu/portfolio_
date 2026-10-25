import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'border-b border-white/[0.06] bg-[#0a0b12]/85 py-3 backdrop-blur-2xl' : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-blue-400/20 to-violet-400/20 shadow-lg shadow-violet-500/10 transition-shadow group-hover:shadow-violet-500/25">
            <Terminal className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">Anjalee Sahu</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="nav-link-anim text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 border-l border-white/10 pl-4">

            <a 
              href="/anjalee_sahu_.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="blob-btn"
            >
              Resume
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition-colors hover:bg-white/[0.08] md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 border-t border-white/10 bg-[#0a0b12]/95 backdrop-blur-2xl md:hidden"
        >
          <div className="flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white text-lg font-medium"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="/anjalee_sahu_.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="blob-btn w-full mt-4"
            >
              Download Resume
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                </span>
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
