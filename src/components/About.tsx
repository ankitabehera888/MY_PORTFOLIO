import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 border-b border-[#D8C8AE] relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Small Number */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#565149] uppercase">
            01 // BACKGROUND & PHILOSOPHY
          </span>
          <span className="h-[1px] flex-1 bg-[#D8C8AE]" />
        </div>

        {/* Huge Editorial Heading */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#191816] tracking-tighter uppercase">
            ABOUT ME
          </h2>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Only the Person (Background removed, no cards or boxes) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex items-end justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none flex items-end justify-center">
              <img
                src="/profile.png?v=4"
                alt="Ankita Behera"
                className="w-full max-h-[560px] lg:max-h-[620px] object-contain object-bottom select-none pointer-events-none"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* RIGHT: Editorial Narrative & Education / Research */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-lg sm:text-xl text-[#191816] leading-relaxed font-normal mb-6">
                I’m <strong className="font-bold text-[#191816]">Ankita Behera</strong>, a Computer Science and Engineering undergraduate at NIST University, passionate about <strong className="font-semibold text-[#191816]">Artificial Intelligence, Machine Learning, and Generative AI</strong>. I enjoy exploring new technologies, solving problems, and building practical applications through hands-on projects.
              </p>

              <p className="text-base sm:text-lg text-[#565149] leading-relaxed font-normal">
                My work includes <strong className="font-semibold text-[#191816]">text classification, LLM-powered applications, and Retrieval-Augmented Generation (RAG) systems</strong>. I’ve also worked on a <strong className="font-semibold text-[#191816]">financial Agentic AI project</strong> focused on automating expense tracking and simplifying financial data management. I’m interested in building intelligent systems that combine automation, reliable data processing, and practical problem-solving to address <strong className="font-semibold text-emerald-700">real-world challenges</strong>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

