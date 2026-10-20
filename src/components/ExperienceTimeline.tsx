import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck,
  Maximize2,
  X,
  BookOpen,
  Award,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { TIMELINE_DATA, CERTIFICATIONS_DATA, SUMMER_COURSES_DATA } from '../data/portfolioData';

type CredentialFilter = 'all' | 'summer' | 'industry';

export const ExperienceTimeline: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(2); // Default open to Summer 2025 to highlight summer courses!
  const [activeFilter, setActiveFilter] = useState<CredentialFilter>('all');
  const [modalImage, setModalImage] = useState<string | null>(null);

  const toggleRow = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-24 sm:py-32 border-b border-[#D8C8AE]/70 dark:border-slate-800/70 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#565149] dark:text-slate-400 uppercase">
            05 // TRAJECTORY & CREDENTIALS
          </span>
          <span className="h-[1px] flex-1 bg-[#D8C8AE] dark:bg-slate-800" />
        </div>

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#191816] dark:text-slate-100 tracking-tighter uppercase">
              EXPERIENCE & MILESTONES
            </h2>
            <p className="text-base sm:text-lg text-[#565149] dark:text-slate-400 mt-3 max-w-xl">
              Academic summer courses, systems training in C++, and production-grade artificial intelligence milestones.
            </p>
          </div>
        </div>

        {/* Editorial Rows with Dividers */}
        <div className="border-t border-[#191816] dark:border-slate-700 divide-y divide-[#D8C8AE] dark:divide-slate-800 mb-20">
          {TIMELINE_DATA.map((item, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={`${item.year}-${item.title}`}
                onClick={() => toggleRow(index)}
                className={`group cursor-pointer py-8 sm:py-10 transition-colors duration-250 ${
                  isExpanded ? 'bg-[#EFE1CB]/60 dark:bg-slate-900/60 px-4 sm:px-6 rounded-2xl' : 'hover:bg-[#FAF3E7] dark:hover:bg-slate-900/30 px-2'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Year & Category */}
                  <div className="flex items-baseline gap-4 md:w-1/4">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono-code text-[#191816] dark:text-slate-100">
                      {item.year}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 font-bold whitespace-nowrap">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Center: Title & Role */}
                  <div className="md:w-1/2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#191816] dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 flex items-center gap-2 transition-colors">
                      <span>{item.title}</span>
                    </h3>
                    <div className="text-xs sm:text-sm font-mono-code text-[#565149] dark:text-slate-400 mt-1">
                      {item.role} • <strong className="text-[#191816] dark:text-slate-300">{item.organization}</strong>
                    </div>
                  </div>

                  {/* Right: Expand Arrow Indicator */}
                  <div className="md:w-1/4 flex justify-end items-center gap-3">
                    <span className="text-xs font-mono-code text-[#565149] dark:text-slate-400 hidden sm:inline">
                      {isExpanded ? 'COLLAPSE' : 'EXPLORE'}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-10 h-10 rounded-full border border-[#D8C8AE] dark:border-slate-700 flex items-center justify-center text-[#191816] dark:text-slate-100 group-hover:border-[#191816] dark:group-hover:border-amber-500 group-hover:bg-[#191816] dark:group-hover:bg-amber-500 group-hover:text-[#FAF3E7] dark:group-hover:text-slate-950 transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Editorial Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden pt-6 mt-4 border-t border-[#D8C8AE] dark:border-slate-800"
                    >
                      <p className="text-sm sm:text-base text-[#565149] dark:text-slate-300 leading-relaxed mb-4 max-w-3xl">
                        {item.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        {item.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#191816] dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* If Summer Course row, provide quick scroll jump */}
                      {item.year.includes('Summer') && (
                        <div className="pt-3 border-t border-[#D8C8AE]/50 dark:border-slate-800 flex items-center gap-2 text-xs font-mono-code text-amber-800 dark:text-amber-400">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Includes 3 verified certificates below from NIST University & Cisco Networking Academy</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Credentials & Summer Courses Section */}
        <div>
          {/* Header & Filter Switcher */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#D8C8AE] dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code font-bold tracking-wider text-amber-800 dark:text-amber-400 uppercase mb-2">
                <Sparkles className="w-4 h-4" />
                <span>ACADEMIC COURSES & CREDENTIALS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#191816] dark:text-slate-100 tracking-tight uppercase">
                SUMMER COURSES & CERTIFICATIONS
              </h3>
              <p className="text-xs sm:text-sm text-[#565149] dark:text-slate-400 mt-1 max-w-2xl">
                C++ summer courses from NIST University & Cisco Networking Academy, paired with AWS & Oracle AI credentials.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-[#FAF3E7] dark:bg-slate-900 p-1.5 rounded-2xl border border-[#D8C8AE] dark:border-slate-800">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-mono-code font-bold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-[#191816] dark:bg-amber-500 text-[#FAF3E7] dark:text-slate-950 shadow-sm'
                    : 'text-[#565149] dark:text-slate-400 hover:text-[#191816] dark:hover:text-slate-200'
                }`}
              >
                All (07)
              </button>
              <button
                onClick={() => setActiveFilter('summer')}
                className={`px-4 py-2 rounded-xl text-xs font-mono-code font-bold transition-all flex items-center gap-1.5 ${
                  activeFilter === 'summer'
                    ? 'bg-[#191816] dark:bg-amber-500 text-[#FAF3E7] dark:text-slate-950 shadow-sm'
                    : 'text-[#565149] dark:text-slate-400 hover:text-[#191816] dark:hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Summer Courses (03)</span>
              </button>
              <button
                onClick={() => setActiveFilter('industry')}
                className={`px-4 py-2 rounded-xl text-xs font-mono-code font-bold transition-all flex items-center gap-1.5 ${
                  activeFilter === 'industry'
                    ? 'bg-[#191816] dark:bg-amber-500 text-[#FAF3E7] dark:text-slate-950 shadow-sm'
                    : 'text-[#565149] dark:text-slate-400 hover:text-[#191816] dark:hover:text-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Industry Certs (04)</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* 1. Summer Courses (Shown if filter is 'all' or 'summer') */}
            {(activeFilter === 'all' || activeFilter === 'summer') &&
              SUMMER_COURSES_DATA.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 rounded-2xl bg-[#FAF3E7] dark:bg-slate-900 border border-[#D8C8AE] dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-mono-code px-2.5 py-0.5 rounded-full font-bold border ${course.badgeColor}`}>
                        {course.issuer}
                      </span>
                      <span className="text-[11px] font-mono-code text-[#565149] dark:text-slate-400">
                        {course.period}
                      </span>
                    </div>

                    {/* Certificate Thumbnail Preview (Clickable to view high-res) */}
                    <div 
                      onClick={() => setModalImage(course.image)}
                      className="group/img relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#FBF5EA] dark:bg-slate-950 border border-[#D8C8AE] dark:border-slate-700 shadow-xs mb-4 cursor-pointer flex items-center justify-center p-2"
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-contain select-none transition-transform duration-300 group-hover/img:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 text-white text-xs font-mono-code backdrop-blur-2xs">
                        <Maximize2 className="w-4 h-4" />
                        <span>Click to view certificate</span>
                      </div>
                    </div>

                    {/* Course Title */}
                    <h4 className="text-lg font-bold text-[#191816] dark:text-slate-100 mb-2 leading-snug">
                      {course.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[#565149] dark:text-slate-400 leading-relaxed mb-4">
                      {course.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono-code bg-[#EFE1CB] dark:bg-slate-800 text-[#565149] dark:text-slate-300 border border-[#D8C8AE]/60 dark:border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Credential ID / Verification */}
                  <div className="pt-3 border-t border-[#D8C8AE] dark:border-slate-800 flex items-center justify-between text-xs font-mono-code text-emerald-800 dark:text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      SUMMER COURSE
                    </span>
                    <span className="text-[#565149] dark:text-slate-400 text-[11px] truncate max-w-[140px]" title={course.credentialId || course.instructor}>
                      {course.credentialId ? `ID: ${course.credentialId.split('/').slice(-1)[0]}` : 'CISCO VERIFIED'}
                    </span>
                  </div>
                </motion.div>
              ))}

            {/* 2. Industry Certifications (Shown if filter is 'all' or 'industry') */}
            {(activeFilter === 'all' || activeFilter === 'industry') &&
              CERTIFICATIONS_DATA.map((cert) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 rounded-2xl bg-[#FAF3E7] dark:bg-slate-900 border border-[#D8C8AE] dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-mono-code px-2.5 py-0.5 rounded-full font-bold border ${cert.badgeColor}`}>
                        {cert.issuer}
                      </span>
                      <span className="text-[11px] font-mono-code text-[#565149] dark:text-slate-400">
                        {cert.date}
                      </span>
                    </div>

                    {/* Certificate Thumbnail Preview */}
                    <div 
                      onClick={() => setModalImage(cert.image)}
                      className="group/img relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#FBF5EA] dark:bg-slate-950 border border-[#D8C8AE] dark:border-slate-700 shadow-xs mb-4 cursor-pointer flex items-center justify-center p-2"
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain select-none transition-transform duration-300 group-hover/img:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 text-white text-xs font-mono-code backdrop-blur-2xs">
                        <Maximize2 className="w-4 h-4" />
                        <span>Click to view certificate</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-bold text-[#191816] dark:text-slate-100 mb-2 leading-snug">
                      {cert.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[#565149] dark:text-slate-400 leading-relaxed mb-4">
                      {cert.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono-code bg-[#EFE1CB] dark:bg-slate-800 text-[#565149] dark:text-slate-300 border border-[#D8C8AE]/60 dark:border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Verification */}
                  <div className="pt-3 border-t border-[#D8C8AE] dark:border-slate-800 flex items-center justify-between text-xs font-mono-code text-emerald-800 dark:text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      CREDENTIAL VERIFIED
                    </span>
                    {cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-800 dark:text-amber-400 hover:underline inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>Credly</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[#565149] dark:text-slate-400 text-[11px]">VALIDATED</span>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Certificate Image Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#FAF3E7] dark:bg-slate-900 rounded-2xl overflow-hidden p-3 sm:p-4 shadow-2xl border border-white/20 flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setModalImage(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={modalImage}
                alt="Certificate full view"
                className="max-h-[82vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

