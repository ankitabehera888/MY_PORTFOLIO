import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        setCompact(true);
      } else {
        setCompact(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks: { name: string; href: string; badge?: string }[] = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FBF5EA]/92 dark:bg-[#0B0F17]/90 backdrop-blur-md border-b border-[#D8C8AE] dark:border-slate-800/80 shadow-[0_4px_20px_rgba(100,82,57,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 sm:px-8 transition-all duration-300 flex items-center justify-between ${
            compact ? 'py-3' : 'py-5 sm:py-6'
          }`}
        >
          {/* Brand Name */}
          <a
            href="#"
            className="group flex items-center gap-2.5 text-[#191816] dark:text-slate-100 focus:outline-none"
            aria-label="Ankita Behera - Home"
          >
            <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A338] shadow-[0_0_6px_rgba(212,163,56,0.6)]" />
            </span>
            <span className="relative inline-block font-black tracking-tight text-base sm:text-lg uppercase transition-all duration-300 group-hover:tracking-wider">
              <span className="brand-text-theme font-black">
                {PERSONAL_INFO.name}
              </span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-[#D4A338] via-[#EAD9BC] to-[#D4A338] dark:from-amber-400 dark:via-amber-200 dark:to-amber-400 transition-all duration-300 group-hover:w-full rounded-full" />
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative py-1 text-sm font-medium text-[#565149] dark:text-slate-300 hover:text-[#191816] dark:hover:text-white transition-colors duration-250 flex items-center gap-1.5"
              >
                <span className="inline-block transition-transform duration-250 group-hover:-translate-y-0.5">
                  {link.name}
                </span>

                {link.badge && (
                  <span className="text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/60 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                    {link.badge}
                  </span>
                )}

                {/* Underline expands from 0 -> 100% */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#191816] dark:bg-emerald-400 transition-all duration-250 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-kibo-chat', { detail: { toggle: true } }));
              }}
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm font-bold tracking-tight text-[#191816] bg-[#FAF3E7] hover:bg-[#191816] hover:text-[#FAF3E7] border border-[#D8C8AE] hover:border-[#191816] rounded-full transition-all duration-300 shadow-xs cursor-pointer"
              aria-label="Open Kibo AI Assistant to talk"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#191816] hover:bg-[#EFE1CB] rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[65px] z-40 bg-[#FAF3E7] border-b border-[#D8C8AE] shadow-xl md:hidden px-6 py-8"
          >
            <div className="flex flex-col gap-5">
              <div className="pb-3 border-b border-[#D8C8AE] flex items-center justify-between text-xs font-mono-code text-[#565149]">
                <span>NAVIGATION</span>
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <Terminal className="w-3.5 h-3.5" /> PORTFOLIO V2.6
                </span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-lg font-bold text-[#191816] hover:text-emerald-700 transition-colors py-1"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
              <div className="pt-4 border-t border-[#D8C8AE] flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent('open-kibo-chat'));
                  }}
                  className="w-full text-center py-3 bg-[#191816] text-[#FAF3E7] rounded-xl font-bold text-sm tracking-wide cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>LET'S TALK WITH KIBO</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4A338]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
