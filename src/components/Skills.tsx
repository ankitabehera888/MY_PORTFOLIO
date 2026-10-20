import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Server, Wrench } from 'lucide-react';

interface SkillItem {
  name: string;
  current?: boolean;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  accent: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: <Code2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
    accent: "text-amber-800 dark:text-[#E5B842]",
    skills: [
      { name: "Python", current: true },
      { name: "C", current: false },
      { name: "C++", current: false },
      { name: "Java", current: false },
      { name: "SQL", current: false },
    ],
  },
  {
    title: "Frameworks & ML Stack",
    icon: <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
    accent: "text-amber-800 dark:text-[#E5B842]",
    skills: [
      { name: "LangChain", current: true },
      { name: "LangGraph", current: true },
      { name: "Scikit-learn", current: false },
      { name: "Hugging Face", current: false },
    ],
  },
  {
    title: "Backend & Cloud Infrastructure",
    icon: <Server className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
    accent: "text-amber-800 dark:text-[#E5B842]",
    skills: [
      { name: "AWS", current: true },
      { name: "FastAPI", current: true },
      { name: "Amazon SageMaker", current: false },
    ],
  },
  {
    title: "Tools & Data Stack",
    icon: <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
    accent: "text-amber-800 dark:text-[#E5B842]",
    skills: [
      { name: "MySQL", current: false },
      { name: "Git / GitHub", current: true },
      { name: "Pandas", current: false },
      { name: "NumPy", current: false },
      { name: "Jupyter Notebook", current: false },
    ],
  },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 sm:py-32 border-b border-[#D8C8AE] dark:border-slate-800/80 relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Number Kicker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#565149] dark:text-slate-400 uppercase">
            02 // TECHNICAL ARSENAL
          </span>
          <span className="h-[1px] flex-1 bg-[#D8C8AE] dark:bg-slate-800" />
        </div>

        {/* Section Title */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#191816] dark:text-slate-100 tracking-tighter uppercase">
            SKILLS
          </h2>
        </div>

        {/* 4 Cards Grid - Styled according to reference & website theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 items-stretch">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-[#FAF3E7] dark:bg-slate-900/60 border border-[#D8C8AE] dark:border-slate-800 hover:border-[#191816]/30 dark:hover:border-slate-700 shadow-2xs hover:shadow-md"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#D8C8AE] dark:border-slate-800/80">
                  <h3 className={`text-base sm:text-lg font-bold tracking-tight ${category.accent}`}>
                    {category.title}
                  </h3>
                  <div className="p-1.5 rounded-lg bg-[#EFE1CB] dark:bg-slate-800/60 border border-[#D8C8AE] dark:border-slate-700/60">
                    {category.icon}
                  </div>
                </div>

                {/* Skills List */}
                <ul className="space-y-3.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between gap-3 text-sm sm:text-[15px]"
                    >
                      <span className="font-semibold text-[#191816] dark:text-slate-200 group-hover/item:text-[#191816] dark:group-hover/item:text-white transition-colors">
                        {skill.name}
                      </span>

                      {skill.current && (
                        <span className="shrink-0 text-[10px] font-mono-code font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EFE1CB] dark:bg-slate-800 border border-[#D8C8AE] dark:border-slate-700 text-[#565149] dark:text-slate-300">
                          CURRENT
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Subtle Bar Accent */}
              <div className="pt-6 mt-6 border-t border-[#D8C8AE] dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono-code text-[#565149] dark:text-slate-400">
                <span>{category.skills.length} Capabilities</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
