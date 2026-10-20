import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Database, CheckCircle2, Play, RefreshCw } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const CurrentlyBuilding: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [isSimulating, setIsSimulating] = useState(false);

  const pipelineSteps = [
    { id: 0, label: "User Input Ingestion", tool: "Natural Language Prompt", status: "completed" },
    { id: 1, label: "Agentic Tool Router", tool: "Agno Autonomous Dispatch", status: "completed" },
    { id: 2, label: "External Telemetry Call", tool: "YFinance + DuckDuckGo", status: "active" },
    { id: 3, label: "Groq LLaMA Synthesis", tool: "Groq LPUs (340ms)", status: "pending" },
    { id: 4, label: "Verified Data Delivery", tool: "Structured Markdown + Citations", status: "pending" },
  ];

  const triggerSimulation = () => {
    setIsSimulating(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step > 4) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setActiveStep(2);
        }, 1200);
      } else {
        setActiveStep(step);
      }
    }, 600);
  };

  return (
    <section className="py-12 border-b border-[#E7E5E0] dark:border-slate-800 bg-[#F5F4EE] dark:bg-slate-950/60 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-[#DDDCD5] dark:border-slate-800 p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
          {/* Subtle top indicator bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400" />

          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EFEFEA] dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 -ml-5 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-xs font-mono-code font-bold tracking-widest text-emerald-800 dark:text-emerald-400 uppercase">
                  CURRENTLY BUILDING • LIVE ARCHITECTURE
                </span>
                <span className="text-xs font-mono-code px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 font-semibold">
                  ● ACTIVE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#121212] dark:text-slate-100 uppercase">
                {PERSONAL_INFO.currentlyBuilding.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={triggerSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-code font-bold bg-[#121212] dark:bg-emerald-500 text-[#FAF9F5] dark:text-slate-950 hover:bg-[#2F2F2D] dark:hover:bg-emerald-400 transition-colors disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>SIMULATING PIPELINE...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400 dark:text-slate-950 fill-current" />
                    <span>RUN TEST CYCLE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Pipeline Interactive Progress Visualizer */}
          <div className="py-6 sm:py-8">
            <div className="flex items-center justify-between text-xs font-mono-code text-[#6B7280] dark:text-slate-400 mb-4">
              <span>ACTIVE INFERENCE PIPELINE STAGES</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{PERSONAL_INFO.currentlyBuilding.phase}</span>
            </div>

            {/* Stage Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {pipelineSteps.map((step) => {
                const isCurrent = activeStep === step.id;
                const isPassed = activeStep > step.id;

                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 relative ${
                      isCurrent
                        ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-600 shadow-xs ring-1 ring-amber-300/50'
                        : isPassed
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-[#FAF9F5] dark:bg-slate-950/40 border-[#E8E7E1] dark:border-slate-800 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono-code font-bold text-[#6B7280] dark:text-slate-400">
                        0{step.id + 1}
                      </span>
                      {isPassed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-slate-700" />
                      )}
                    </div>
                    <div className="font-bold text-xs text-[#121212] dark:text-slate-100 mb-1 leading-snug">
                      {step.label}
                    </div>
                    <div className="text-[11px] font-mono-code text-[#6B7280] dark:text-slate-400 truncate">
                      {step.tool}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Horizontal Continuous Progress Line */}
            <div className="relative mt-5 h-1.5 w-full bg-[#E8E7E1] dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#121212] dark:bg-emerald-500"
                animate={{ width: `${((activeStep + 1) / 5) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Technical Telemetry Metadata */}
          <div className="pt-4 border-t border-[#EFEFEA] dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-code">
            <div className="flex items-center gap-2 text-[#4A4A45] dark:text-slate-300">
              <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>
                <strong className="text-[#121212] dark:text-slate-100">Engine Stack:</strong> {PERSONAL_INFO.currentlyBuilding.modelStack}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#4A4A45] dark:text-slate-300">
              <Database className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                <strong className="text-[#121212] dark:text-slate-100">Latency Target:</strong> {PERSONAL_INFO.currentlyBuilding.latency}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#4A4A45] dark:text-slate-300">
              <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong className="text-[#121212] dark:text-slate-100">Linear Benchmark:</strong> {PERSONAL_INFO.currentlyBuilding.accuracy}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
