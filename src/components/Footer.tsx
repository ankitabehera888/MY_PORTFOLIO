import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-transparent text-xs font-mono-code transition-colors flex items-center justify-center">
      <button
        onClick={scrollToTop}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF3E7] dark:bg-slate-900 border border-[#D8C8AE] dark:border-slate-800 text-[#191816] dark:text-slate-200 hover:bg-[#191816] hover:text-[#FAF3E7] dark:hover:bg-white dark:hover:text-slate-950 transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer font-bold"
      >
        <span>BACK TO TOP</span>
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
};
