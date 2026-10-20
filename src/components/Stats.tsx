import React from 'react';
import { motion } from 'framer-motion';
import { STATS_ITEMS } from '../data/portfolioData';

export const Stats: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-b border-[#D8C8AE]/70 dark:border-slate-800/70 bg-[#EFE1CB]/40 dark:bg-slate-950/30 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-[#D8C8AE] dark:divide-slate-800">
          {STATS_ITEMS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col justify-between ${index !== 0 ? 'pt-6 sm:pt-0 sm:pl-8 lg:pl-10' : ''}`}
            >
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono-code text-[#191816] dark:text-slate-100 tracking-tighter mb-2 flex items-baseline">
                  <span>{item.value}</span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#565149] dark:text-slate-400 ml-1">
                    {item.suffix}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-[#191816] dark:text-slate-200 leading-tight">
                  {item.label}
                </div>
              </div>

              <div className="text-xs font-mono-code text-[#565149] dark:text-slate-400 mt-3">
                {item.meta}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
