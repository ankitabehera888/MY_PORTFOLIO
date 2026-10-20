import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import heroBg from '../assets/hero_full_bg_2x.png';

export const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i: number) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.85,
        delay: 0.12 + i * 0.16,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden isolate transition-colors">
      {/* FULL BACKGROUND COVERING ENTIRE 1ST PAGE (matching 2nd screenshot reference) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <img
          src={heroBg}
          alt="Ankita Behera Hero Background"
          className="w-full h-full object-cover object-[75%_center] sm:object-[70%_center] lg:object-center select-none pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 82%, rgba(0,0,0,0.6) 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 82%, rgba(0,0,0,0.6) 92%, transparent 100%)',
          }}
          loading="eager"
        />

        {/* Soft bottom blend to seamlessly merge into the page background */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 md:h-48 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(242, 230, 211, 0.4) 35%, rgba(242, 230, 211, 0.85) 75%, #F2E6D3 100%)',
          }}
        />

        {/* Soft mobile readability scrim for small screens (hidden on desktop lg+) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F2E6]/95 via-[#F8F2E6]/80 to-transparent lg:hidden pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 relative z-10 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl lg:max-w-2xl xl:max-w-[42rem] flex flex-col items-start"
        >
          {/* Main Hero Heading (Dynamic 3-Line Kinetic Editorial Typography) */}
          <div className="relative mb-6 sm:mb-8 select-none w-full">
            <h1 className="clamp-hero-editorial font-black text-[#191816] uppercase tracking-tight">
              {/* Line 1: IDEAS ARE INFINITE. */}
              <div className="overflow-hidden py-0.5 sm:py-1">
                <motion.div
                  custom={0}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center flex-wrap gap-x-2.5 sm:gap-x-4"
                >
                  <span className="inline-block hover:-translate-y-1 transition-transform duration-200 cursor-default">
                    IDEAS
                  </span>
                  <span className="inline-block hover:-translate-y-1 transition-transform duration-200 cursor-default">
                    ARE
                  </span>
                  <span className="relative inline-block hover:-translate-y-1 transition-transform duration-200 cursor-default">
                    <span className="hero-infinite-gradient font-black">
                      INFINITE.
                    </span>
                  </span>
                </motion.div>
              </div>

              {/* Line 2: EXECUTION IS THE REAL */}
              <div className="overflow-hidden py-0.5 sm:py-1 mt-0.5 sm:mt-1">
                <motion.div
                  custom={1}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center flex-wrap gap-x-2.5 sm:gap-x-4 text-[#191816]"
                >
                  <span className="inline-block hover:-translate-y-1 transition-transform duration-200 cursor-default">
                    EXECUTION
                  </span>
                  <span className="inline-block hover:-translate-y-1 transition-transform duration-200 cursor-default">
                    IS
                  </span>
                  <span className="inline-block hover:-translate-y-1 transition-transform duration-200 cursor-default">
                    THE
                  </span>
                  <span className="inline-block hover:-translate-y-1 transition-transform duration-200 cursor-default">
                    REAL
                  </span>
                </motion.div>
              </div>

              {/* Line 3: ALGORITHM. */}
              <div className="overflow-hidden py-0.5 sm:py-1 mt-0.5 sm:mt-1">
                <motion.div
                  custom={2}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative inline-flex items-center group cursor-default"
                >
                  {/* Shimmering Centerpiece Golden Word */}
                  <span className="hero-gold-gradient font-black relative inline-block transition-transform duration-300 group-hover:scale-[1.01]">
                    ALGORITHM.
                  </span>

                  {/* Animated scanning execution beam track beneath ALGORITHM. */}
                  <div className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-[3px] sm:h-[4px] rounded-full bg-[#D8C8AE]/50 overflow-hidden">
                    <div className="w-1/3 h-full rounded-full bg-gradient-to-r from-transparent via-[#D4A338] to-transparent animate-scan-beam" />
                  </div>
                </motion.div>
              </div>
            </h1>
          </div>

          {/* Subtitle & Narrative */}
          <motion.div variants={itemVariants} className="max-w-xl mb-8 sm:mb-10">
            <p className="text-base sm:text-lg lg:text-[1.125rem] font-normal text-[#4A453E] leading-relaxed tracking-tight">
              I design and develop intelligent applications using <strong className="font-semibold text-[#191816]">Machine Learning</strong>, <strong className="font-semibold text-[#191816]">Deep Learning</strong>, and <strong className="font-semibold text-[#191816]">Generative AI</strong>. Shipped as working prototypes, not just coursework.
            </p>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto">
            {/* VIEW MY WORK */}
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#191816] hover:bg-[#2E2B27] rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              <span>VIEW MY WORK</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#D4A338]" />
            </a>

            {/* LET'S CONNECT */}
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#191816] hover:text-black transition-colors w-full sm:w-auto text-center"
            >
              <span>LET'S CONNECT</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
