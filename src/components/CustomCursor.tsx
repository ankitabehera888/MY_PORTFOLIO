import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="project"]');
      const interactive = target.closest('button, a, input, [role="button"], [data-cursor="pointer"]');

      if (projectCard) {
        setCursorType('project');
      } else if (interactive) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Outer follow circle */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none rounded-full"
        animate={{
          x: mousePosition.x - (cursorType === 'project' ? 38 : cursorType === 'pointer' ? 22 : 14),
          y: mousePosition.y - (cursorType === 'project' ? 38 : cursorType === 'pointer' ? 22 : 14),
          width: cursorType === 'project' ? 76 : cursorType === 'pointer' ? 44 : 28,
          height: cursorType === 'project' ? 76 : cursorType === 'pointer' ? 44 : 28,
          backgroundColor:
            cursorType === 'project'
              ? isDark ? 'rgba(16, 185, 129, 0.95)' : 'rgba(18, 18, 18, 0.95)'
              : cursorType === 'pointer'
              ? isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(18, 18, 18, 0.08)'
              : 'transparent',
          borderColor: cursorType === 'default' ? (isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(18, 18, 18, 0.3)') : 'transparent',
          borderWidth: cursorType === 'default' ? 1.5 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.4,
        }}
      >
        {cursorType === 'project' && (
          <span className={`text-[11px] font-bold tracking-wider select-none uppercase font-mono-code flex items-center gap-0.5 ${isDark ? 'text-slate-950 font-black' : 'text-[#FAF9F5]'}`}>
            VIEW <span>↗</span>
          </span>
        )}
      </motion.div>

      {/* Center dot (only visible when not in project mode) */}
      {cursorType !== 'project' && (
        <motion.div
          className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none ${isDark ? 'bg-emerald-400' : 'bg-[#121212]'}`}
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: cursorType === 'pointer' ? 0.6 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 35,
            stiffness: 500,
          }}
        />
      )}
    </div>
  );
};
