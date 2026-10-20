import React from 'react';
import { Cpu, ShieldCheck, Activity, Award } from 'lucide-react';

export const TelemetryStrip: React.FC = () => {
  return (
    <div className="w-full border-y border-[#E7E5E0] dark:border-slate-800/80 bg-[#F5F4EE]/60 dark:bg-slate-900/40 py-4 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono-code">
          <div className="flex items-center gap-2 text-[#4A4A45] dark:text-slate-300">
            <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="truncate">
              <span className="text-[#6B7280] dark:text-slate-400">ENGINE:</span>{' '}
              <strong className="text-[#121212] dark:text-slate-100 font-bold">Agno + Groq LLMs</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#4A4A45] dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
            <div className="truncate">
              <span className="text-[#6B7280] dark:text-slate-400">ACCURACY:</span>{' '}
              <strong className="text-[#121212] dark:text-slate-100 font-bold">90.15% SVM Benchmark</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#4A4A45] dark:text-slate-300">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="truncate">
              <span className="text-[#6B7280] dark:text-slate-400">CREDENTIALS:</span>{' '}
              <strong className="text-[#121212] dark:text-slate-100 font-bold">Oracle & AWS Certified</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#4A4A45] dark:text-slate-300">
            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="truncate">
              <span className="text-[#6B7280] dark:text-slate-400">ACADEMICS:</span>{' '}
              <strong className="text-[#121212] dark:text-slate-100 font-bold">8.93 CGPA (NIST Univ)</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
