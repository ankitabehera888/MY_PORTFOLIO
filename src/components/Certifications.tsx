import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Award, 
  Sparkles,
  Maximize2,
  X
} from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const cert = CERTIFICATIONS_DATA[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CERTIFICATIONS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === CERTIFICATIONS_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="certifications" className="py-24 sm:py-32 border-b border-[#D8C8AE] dark:border-slate-800/80 relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Number Kicker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#565149] dark:text-slate-400 uppercase">
            03 // ACCREDITED CREDENTIALS
          </span>
          <span className="h-[1px] flex-1 bg-[#D8C8AE] dark:bg-slate-800" />
        </div>

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#191816] dark:text-slate-100 tracking-tighter uppercase">
              CERTIFICATIONS
            </h2>
            <p className="text-base sm:text-lg text-[#565149] dark:text-slate-400 mt-3 max-w-2xl">
              Industry credentials and virtual programs that shaped my practical engineering skillset.
            </p>
          </div>

          {/* Navigation Controls (Top Right on Desktop) */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-code font-bold text-[#565149] dark:text-slate-400 mr-2">
              0{currentIndex + 1} / 0{CERTIFICATIONS_DATA.length}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous certificate"
              className="p-3 rounded-full bg-[#FAF3E7] dark:bg-slate-800 border border-[#D8C8AE] dark:border-slate-700 text-[#191816] dark:text-slate-100 hover:bg-[#EFE1CB] dark:hover:bg-slate-700 shadow-2xs hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next certificate"
              className="p-3 rounded-full bg-[#FAF3E7] dark:bg-slate-800 border border-[#D8C8AE] dark:border-slate-700 text-[#191816] dark:text-slate-100 hover:bg-[#EFE1CB] dark:hover:bg-slate-700 shadow-2xs hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Showcase Showcase Card */}
        <div className="relative">
          {/* Floating Left/Right Prev/Next Buttons for wide desktop */}
          <button
            onClick={handlePrev}
            aria-label="Previous certificate"
            className="hidden xl:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-[#FAF3E7]/90 dark:bg-slate-800/90 border border-[#D8C8AE] dark:border-slate-700 text-[#191816] dark:text-slate-100 hover:bg-[#191816] hover:text-[#FAF3E7] dark:hover:bg-emerald-500 dark:hover:text-slate-950 shadow-md backdrop-blur-xs transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next certificate"
            className="hidden xl:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-[#FAF3E7]/90 dark:bg-slate-800/90 border border-[#D8C8AE] dark:border-slate-700 text-[#191816] dark:text-slate-100 hover:bg-[#191816] hover:text-[#FAF3E7] dark:hover:bg-emerald-500 dark:hover:text-slate-950 shadow-md backdrop-blur-xs transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Animated Card Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="rounded-3xl bg-[#FAF3E7] dark:bg-slate-900/70 border border-[#D8C8AE] dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* LEFT: Credential Details */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    {/* Badges Bar */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      {cert.isLatest && (
                        <span className="text-[10px] font-mono-code font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 uppercase flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          LATEST
                        </span>
                      )}
                      <span className="text-[10px] font-mono-code font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#EFE1CB] dark:bg-slate-800 border border-[#D8C8AE] dark:border-slate-700 text-[#565149] dark:text-slate-300">
                        {cert.date.split(' ').slice(-1)[0]}
                      </span>
                      {cert.hours && (
                        <span className="text-[10px] font-mono-code font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                          {cert.hours}
                        </span>
                      )}
                    </div>

                    {/* Certificate Title in Warm Amber/Gold */}
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-800 dark:text-[#E5B842] leading-snug mb-2 font-serif">
                      {cert.title}
                    </h3>

                    {/* Issuer & Date */}
                    <p className="text-xs sm:text-sm font-mono-code text-[#565149] dark:text-slate-400 mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>{cert.issuer} • {cert.date}</span>
                    </p>

                    {/* Description Narrative */}
                    <p className="text-sm sm:text-base text-[#565149] dark:text-slate-300 leading-relaxed mb-6">
                      {cert.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="space-y-3 mb-8">
                      {cert.highlights.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#191816] dark:text-slate-300 leading-relaxed">
                          <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0 mt-0.5">◆</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags and Action Verification Link */}
                  <div className="pt-6 border-t border-[#D8C8AE] dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {cert.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs font-mono-code bg-[#EFE1CB] dark:bg-slate-800/80 border border-[#D8C8AE] dark:border-slate-700/80 text-[#565149] dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Verification / Credential ID Link */}
                    {cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-emerald-700 dark:text-emerald-400 hover:underline underline-offset-4"
                      >
                        <span>Verify Credly Badge</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : cert.credentialId ? (
                      <span className="text-xs font-mono-code text-[#565149] dark:text-slate-400">
                        ID: <strong className="text-[#191816] dark:text-slate-200">{cert.credentialId}</strong>
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* RIGHT: Framed Certificate Image Display */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center">
                  <div 
                    onClick={() => setModalImage(cert.image)}
                    className="group/img relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FBF5EA] dark:bg-slate-950 border-2 border-[#D8C8AE] dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center p-2 sm:p-3"
                  >
                    <img
                      src={cert.image}
                      alt={`Ankita Behera - ${cert.title} Credential Certificate issued by ${cert.issuer}`}
                      className="w-full h-full object-contain select-none transition-transform duration-300 group-hover/img:scale-[1.02]"
                      loading="lazy"
                      width={800}
                      height={600}
                    />

                    {/* Hover Click to Expand Overlay Badge */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-mono-code shadow-md backdrop-blur-xs">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to view full</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick 4-Certificate Thumbnail Selector Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 mt-6">
            {CERTIFICATIONS_DATA.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  currentIndex === idx
                    ? 'bg-[#FAF3E7] dark:bg-slate-800 border-amber-600 dark:border-amber-400 shadow-sm ring-2 ring-amber-500/20'
                    : 'bg-[#FAF3E7]/60 dark:bg-slate-900/40 border-[#D8C8AE] dark:border-slate-800 hover:border-[#191816]/30 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-mono-code font-bold text-[#565149] dark:text-slate-400">
                    0{idx + 1}
                  </span>
                  {currentIndex === idx ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  ) : null}
                </div>
                <div className="text-xs font-bold text-[#191816] dark:text-slate-100 line-clamp-1">
                  {item.title.split('—')[0]}
                </div>
                <div className="text-[11px] font-mono-code text-[#565149] dark:text-slate-400 mt-1">
                  {item.issuer.split(' ')[0]}
                </div>
              </button>
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
              className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl overflow-hidden p-3 sm:p-4 shadow-2xl border border-white/20 flex flex-col items-center justify-center"
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
                alt="Ankita Behera Credential Certificate Full View"
                className="max-h-[82vh] w-auto max-w-full object-contain rounded-lg"
                loading="lazy"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
