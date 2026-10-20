import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200; // Fast and snappy ~1.2s total
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setCount(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#F2E6D3] dark:bg-[#0B0F17] p-6 sm:p-12 transition-colors"
        exit={{
          y: '-100%',
          transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
        }}
      >
        {/* Top Status */}
        <div className="flex justify-between items-center text-xs font-mono-code uppercase tracking-wider text-[#565149] dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>INITIALIZING ENVIRONMENT</span>
          </div>
          <span>BERHAMPUR, IN [19.31°N, 84.79°E]</span>
        </div>

        {/* Center Name */}
        <div className="my-auto">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-[#191816] dark:text-slate-100 uppercase"
            >
              ANKITA BEHERA
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-3">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="text-sm sm:text-base font-mono-code text-[#565149] dark:text-slate-400 tracking-wide"
            >
              AI ENGINEER • MACHINE LEARNING • GENAI
            </motion.p>
          </div>
        </div>

        {/* Bottom Counter & Bar */}
        <div>
          <div className="flex justify-between items-end mb-3">
            <span className="text-xs font-mono-code text-[#565149] dark:text-slate-400 tracking-widest uppercase">
              "IDEAS ARE INFINITE. EXECUTION IS THE REAL ALGORITHM."
            </span>
            <span className="text-4xl sm:text-6xl font-black font-mono-code text-[#191816] dark:text-slate-100 tracking-tighter">
              {count.toString().padStart(2, '0')}%
            </span>
          </div>
          {/* Progress track */}
          <div className="h-[2px] w-full bg-[#D8C8AE] dark:bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full bg-[#191816] dark:bg-emerald-500"
              style={{ width: `${count}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
