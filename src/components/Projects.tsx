import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { PROJECTS_DATA, PERSONAL_INFO, type Project } from '../data/portfolioData';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const Projects: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Estimate active card
      const cardWidth = 420; // approximate width + gap
      const newIndex = Math.min(
        PROJECTS_DATA.length - 1,
        Math.max(0, Math.round(scrollLeft / cardWidth))
      );
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = Math.max(340, scrollRef.current.clientWidth * 0.75);
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="projects" className="py-24 sm:py-32 border-b border-[#D8C8AE] dark:border-slate-800 transition-colors relative">
      {/* Anchor support for #work */}
      <div id="work" className="absolute -top-24 left-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Number Kicker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#565149] dark:text-slate-400 uppercase">
            04 // FEATURED SYSTEMS
          </span>
          <span className="h-[1px] flex-1 bg-[#D8C8AE] dark:bg-slate-800" />
        </div>

        {/* Section Title & Carousel Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#191816] dark:text-slate-100 tracking-tighter uppercase">
              PROJECTS
            </h2>
            <p className="text-base sm:text-lg text-[#565149] dark:text-slate-400 mt-3 max-w-2xl leading-relaxed">
              Applied machine learning pipelines, autonomous multi-agent systems, and production full-stack AI applications.
            </p>
          </div>

          {/* Navigation Arrows & Counter */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="text-xs font-mono-code font-bold text-[#565149] dark:text-slate-400 mr-2">
              0{activeIndex + 1} / 0{PROJECTS_DATA.length}
            </span>
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous project"
              className={`p-3 rounded-full border transition-all ${
                canScrollLeft
                  ? 'bg-[#FAF3E7] dark:bg-slate-800 border-[#D8C8AE] dark:border-slate-700 text-[#191816] dark:text-slate-100 hover:bg-[#EFE1CB] dark:hover:bg-slate-700 shadow-xs hover:scale-105 active:scale-95'
                  : 'bg-[#FAF3E7]/40 dark:bg-slate-900/40 border-[#D8C8AE]/50 dark:border-slate-800 text-[#B0B0A8] dark:text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next project"
              className={`p-3 rounded-full border transition-all ${
                canScrollRight
                  ? 'bg-[#FAF3E7] dark:bg-slate-800 border-[#D8C8AE] dark:border-slate-700 text-[#191816] dark:text-slate-100 hover:bg-[#EFE1CB] dark:hover:bg-slate-700 shadow-xs hover:scale-105 active:scale-95'
                  : 'bg-[#FAF3E7]/40 dark:bg-slate-900/40 border-[#D8C8AE]/50 dark:border-slate-800 text-[#B0B0A8] dark:text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Card-Wise Scroll Track */}
        <div className="relative -mx-6 sm:-mx-8 px-6 sm:px-8">
          <div
            ref={scrollRef}
            className="flex gap-6 sm:gap-7 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {PROJECTS_DATA.map((project, idx) => (
              <HorizontalProjectCard 
                key={project.id} 
                project={project} 
                isLatest={idx === 0}
              />
            ))}
          </div>
        </div>

        {/* Bottom Bar: GitHub Profile Link */}
        <div className="mt-14 pt-10 border-t border-[#D8C8AE] dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#EFE1CB] dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-[#D8C8AE] dark:border-slate-800/80">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#191816] text-[#FAF3E7] flex items-center justify-center shrink-0">
              <GithubIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#191816] dark:text-slate-100">
                Explore All Repositories on GitHub
              </h4>
              <p className="text-xs sm:text-sm text-[#565149] dark:text-slate-400">
                Explore complete source code, evaluation datasets, and live branches.
              </p>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Ankita Behera's GitHub Profile (@ankitabehera888)"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#191816] dark:bg-[#E5B842] text-[#FAF3E7] dark:text-slate-950 text-xs sm:text-sm font-bold tracking-tight hover:bg-[#2E2B27] hover:scale-105 active:scale-95 transition-all shadow-sm shrink-0"
          >
            <span>GITHUB @ankitabehera888</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

interface HorizontalProjectCardProps {
  project: Project;
  isLatest?: boolean;
}

const HorizontalProjectCard: React.FC<HorizontalProjectCardProps> = ({ project, isLatest }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="snap-start flex flex-col justify-between w-[320px] sm:w-[380px] lg:w-[410px] shrink-0 rounded-2xl sm:rounded-3xl bg-[#FAF3E7] dark:bg-slate-900/80 border border-[#D8C8AE] dark:border-slate-800/90 p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#191816]/30 dark:hover:border-[#E5B842]/50 transition-all duration-300 group"
    >
      {/* Top Content Area */}
      <div>
        {/* Header: Title + Optional LATEST badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#191816] dark:text-slate-100 leading-snug tracking-tight">
            {project.title}
          </h3>

          {isLatest && (
            <span className="text-[10px] font-mono-code font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 uppercase shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              LATEST
            </span>
          )}
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-[13.5px] text-[#565149] dark:text-slate-300 leading-relaxed mb-6 font-normal">
          {project.description}
        </p>

        {/* Hashtag-style tags (matching reference image) */}
        <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono-code font-bold text-amber-800 dark:text-[#E5B842] hover:underline cursor-default"
            >
              #{tag.replace(/\s+/g, '')}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Action Links */}
      <div className="pt-5 border-t border-[#D8C8AE] dark:border-slate-800/80 flex flex-col gap-2.5">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} source code on GitHub`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-mono-code font-semibold text-[#565149] dark:text-slate-400 hover:text-[#191816] dark:hover:text-[#E5B842] transition-colors group/link"
        >
          <span>View on GitHub</span>
          <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
        </a>

        {project.liveDemoUrl && (
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Try live demo for ${project.title}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-mono-code font-semibold text-[#565149] dark:text-slate-400 hover:text-[#191816] dark:hover:text-[#E5B842] transition-colors group/link"
          >
            <span>Test it now</span>
            <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};
