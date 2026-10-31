import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Check,
  Send
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Collaboration%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
    }, 600);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Centered Heading & Subtitle (matching reference screenshot) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#191816] dark:text-slate-100 tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#565149] dark:text-slate-400 leading-relaxed font-normal">
            Have a project, idea, or collaboration in mind? Leave a message — I'll get back to you.
          </p>
        </motion.div>

        {/* Centered Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl mx-auto"
        >
          {submitted ? (
            <div className="p-10 text-center space-y-4 bg-[#FAF3E7] dark:bg-slate-900 rounded-2xl border border-[#D8C8AE] dark:border-slate-800 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#191816] dark:text-slate-100">
                Message Prepared!
              </h3>
              <p className="text-sm sm:text-base text-[#565149] dark:text-slate-300 max-w-md mx-auto">
                Opening your email client to send your message directly to Ankita.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="mt-2 text-xs font-mono-code font-bold text-amber-800 dark:text-amber-400 underline underline-offset-4 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-5 py-4 rounded-xl text-sm sm:text-base text-[#191816] dark:text-slate-100 bg-[#FAF3E7] dark:bg-slate-900 border border-[#D8C8AE] dark:border-slate-800 focus:outline-none focus:border-[#191816] dark:focus:border-slate-300 transition-colors placeholder:text-[#8C8273] dark:placeholder:text-slate-500 shadow-2xs"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your Email"
                  className="w-full px-5 py-4 rounded-xl text-sm sm:text-base text-[#191816] dark:text-slate-100 bg-[#FAF3E7] dark:bg-slate-900 border border-[#D8C8AE] dark:border-slate-800 focus:outline-none focus:border-[#191816] dark:focus:border-slate-300 transition-colors placeholder:text-[#8C8273] dark:placeholder:text-slate-500 shadow-2xs"
                />
              </div>

              <div>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message"
                  className="w-full px-5 py-4 rounded-xl text-sm sm:text-base text-[#191816] dark:text-slate-100 bg-[#FAF3E7] dark:bg-slate-900 border border-[#D8C8AE] dark:border-slate-800 focus:outline-none focus:border-[#191816] dark:focus:border-slate-300 transition-colors placeholder:text-[#8C8273] dark:placeholder:text-slate-500 shadow-2xs resize-y min-h-[140px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[#191816] dark:bg-white text-[#FAF3E7] dark:text-slate-950 hover:bg-[#2E2B27] dark:hover:bg-slate-200 font-bold text-sm sm:text-base tracking-wide transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          )}

          {/* Social Icons Strip Below the Form (matching reference screenshot) */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-2">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ankita Behera on LinkedIn"
              title="Connect with Ankita Behera on LinkedIn"
              className="w-12 h-12 rounded-full border border-[#D8C8AE] dark:border-slate-800 bg-[#FAF3E7] dark:bg-slate-900 text-[#191816] dark:text-slate-200 hover:bg-[#191816] hover:text-[#FAF3E7] dark:hover:bg-white dark:hover:text-slate-950 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110 active:scale-95"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ankita Behera on GitHub"
              title="View Ankita Behera's projects on GitHub"
              className="w-12 h-12 rounded-full border border-[#D8C8AE] dark:border-slate-800 bg-[#FAF3E7] dark:bg-slate-900 text-[#191816] dark:text-slate-200 hover:bg-[#191816] hover:text-[#FAF3E7] dark:hover:bg-white dark:hover:text-slate-950 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110 active:scale-95"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email Ankita Behera"
              title="Send an email to Ankita Behera"
              className="w-12 h-12 rounded-full border border-[#D8C8AE] dark:border-slate-800 bg-[#FAF3E7] dark:bg-slate-900 text-[#191816] dark:text-slate-200 hover:bg-[#191816] hover:text-[#FAF3E7] dark:hover:bg-white dark:hover:text-slate-950 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110 active:scale-95"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

