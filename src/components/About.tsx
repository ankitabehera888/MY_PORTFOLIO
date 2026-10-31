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
                alt="Ankita Behera - AI & Machine Learning Systems Developer"
                className="w-full max-h-[560px] lg:max-h-[620px] object-contain object-bottom select-none pointer-events-none"
                loading="eager"
                width={600}
                height={800}
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
                I’m <strong className="font-bold text-[#191816]">Ankita Behera</strong>, a Computer Science and Engineering undergraduate at NIST University, passionate about <strong className="font-semibold text-[#191816]">Artificial Intelligence, Machine Learning, Generative AI</strong>, and modern <strong className="font-semibold text-[#191816]">Software Development</strong>. With strong foundations in <strong className="font-semibold text-[#191816]">Python</strong> and autonomous agent systems, I enjoy designing and deploying practical software architectures that solve complex problems.
              </p>

              <p className="text-base sm:text-lg text-[#565149] leading-relaxed font-normal">
                My hands-on <strong className="font-semibold text-[#191816]">AI Projects</strong> span autonomous multi-agent systems, NLP text classification, LLM reasoning pipelines, and Retrieval-Augmented Generation (RAG) applications. Notably, I engineered a <strong className="font-semibold text-[#191816]">financial Agentic AI system</strong> coordinating specialized agents to synthesize real-time market telemetry into structured reports. I focus on building resilient software combining rigorous ML algorithms, low latency, and practical problem-solving to address <strong className="font-semibold text-emerald-700">real-world challenges</strong>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

