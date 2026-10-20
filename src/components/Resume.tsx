import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  FileText, 
  X,
  Eye
} from 'lucide-react';

export const Resume: React.FC = () => {
  const [previewPdf, setPreviewPdf] = useState<string | null>(null);

  const conciseResumeUrl = '/resume/Ankita_Behera_Resume.pdf';
  const extendedCvUrl = '/resume/Ankita_Behera_Extended_CV.pdf';

  return (
    <section id="resume" className="py-24 sm:py-32 border-b border-[#D8C8AE] dark:border-slate-800 transition-colors relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Number Kicker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#565149] dark:text-slate-400 uppercase">
            05 // CURRICULUM VITAE
          </span>
          <span className="h-[1px] flex-1 bg-[#D8C8AE] dark:bg-slate-800" />
        </div>

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#191816] dark:text-slate-100 tracking-tighter uppercase">
              RESUME
            </h2>
            <p className="text-base sm:text-lg text-[#565149] dark:text-slate-400 mt-3 max-w-2xl leading-relaxed">
              Official academic curriculum, technical credentials, and engineering project portfolio.
            </p>
          </div>
        </div>

        {/* Central Editorial Framed Card (matching reference design) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-3xl bg-[#FAF3E7] dark:bg-slate-900/80 border border-[#D8C8AE] dark:border-slate-800 p-8 sm:p-14 lg:p-16 text-center max-w-4xl mx-auto shadow-sm overflow-hidden"
        >
          {/* Heading in Editorial Serif Font */}
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#191816] dark:text-slate-100 tracking-tight leading-snug mb-4">
            Interested in my full background?
          </h3>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base text-[#565149] dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Download my concise resume for a quick overview, or explore the extended version for a deeper look into my academic and technical journey.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            {/* Primary Download Button (Gold / Amber) */}
            <a
              href={conciseResumeUrl}
              download="Ankita_Behera_Resume.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#D4A338] hover:bg-[#C2932E] dark:bg-[#E5B842] dark:hover:bg-[#D4A734] text-slate-950 font-bold text-sm sm:text-base tracking-tight shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Download Resume (PDF)</span>
            </a>

            {/* Secondary Extended CV Button (Outlined / Interactive Preview) */}
            <button
              onClick={() => setPreviewPdf(extendedCvUrl)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-transparent hover:bg-[#EFE1CB] border-2 border-[#191816] dark:border-white text-[#191816] dark:text-white font-bold text-sm sm:text-base tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>View Extended CV</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Interactive PDF Preview Modal */}
      <AnimatePresence>
        {previewPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewPdf(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full h-[90vh] bg-[#FAF3E7] dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col cursor-default"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-[#FBF5EA] dark:bg-slate-950 border-b border-[#D8C8AE] dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="font-bold text-sm sm:text-base text-[#191816] dark:text-slate-100">
                    Ankita Behera — Extended Curriculum Vitae
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={previewPdf}
                    download="Ankita_Behera_Extended_CV.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                  <a
                    href={previewPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFE1CB] dark:bg-slate-800 text-[#191816] dark:text-slate-200 text-xs font-bold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Tab</span>
                  </a>
                  <button
                    onClick={() => setPreviewPdf(null)}
                    aria-label="Close modal"
                    className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-[#565149] dark:text-slate-400 hover:text-[#191816] dark:hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* PDF Preview Frame */}
              <div className="flex-1 w-full bg-[#525659]">
                <iframe
                  src={`${previewPdf}#toolbar=0&navpanes=0`}
                  title="Ankita Behera CV Preview"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
