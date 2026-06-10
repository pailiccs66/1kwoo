import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, LayoutGrid, Palette, BriefcaseBusiness, MonitorPlay } from "lucide-react";
import clsx from "clsx";

const SECTIONS = [
  { id: "persona", icon: Sparkles, label: "数字化序言" },
  { id: "pos-matrix", icon: LayoutGrid, label: "SaaS及服务" },
  { id: "scene-simulation", icon: MonitorPlay, label: "场景模拟" },
  { id: "ai-productivity", icon: Palette, label: "AI实验室" },
  { id: "operations", icon: BriefcaseBusiness, label: "经营之本" },
];

export const SideNavigation: React.FC<{
  activeSection: string;
  onNavigate: (id: string) => void;
}> = ({ activeSection, onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-black/5 flex justify-around items-center px-3 sm:px-4 py-3 sm:py-4 pb-safe">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onNavigate(sec.id)}
              className={clsx(
                "flex min-w-0 flex-1 flex-col items-center gap-1 transition-colors duration-300",
                isActive ? "text-accent" : "text-foreground/50 hover:text-accent"
              )}
            >
              <sec.icon strokeWidth={1.5} size={24} />
              <span className="max-w-full truncate text-[10px] tracking-wider">{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Side Navigation */}
      <motion.div
        className="hidden xl:flex fixed left-0 top-0 bottom-0 z-50 flex-col justify-center"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        initial={{ width: "120px" }}
        animate={{ width: isExpanded ? "400px" : "120px" }}
        transition={{ ease: [0.32, 0, 0.67, 0], duration: 0.5 }}
      >
        {/* Background blur panel */}
        <motion.div 
          className="absolute inset-y-0 left-0 bg-background/80 backdrop-blur-2xl border-r border-black/5"
          animate={{ width: isExpanded ? "400px" : "120px" }}
          transition={{ ease: [0.32, 0, 0.67, 0], duration: 0.5 }}
        />

        <div className="relative z-10 flex flex-col gap-8 px-[36px]">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onNavigate(sec.id)}
                className={clsx(
                  "group relative flex items-center h-[64px] rounded-2xl transition-colors duration-300",
                  isActive ? "text-accent" : "text-foreground hover:text-accent"
                )}
              >
                <div className="flex-shrink-0 w-[48px] h-[48px] flex items-center justify-center">
                  <sec.icon strokeWidth={1.5} size={32} />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isExpanded ? 1 : 0, 
                    x: isExpanded ? 0 : -20,
                    display: isExpanded ? "block" : "none"
                  }}
                  transition={{ ease: [0.32, 0, 0.67, 0], duration: 0.3, delay: isExpanded ? 0.1 : 0 }}
                  className="ml-6 whitespace-nowrap text-[24px] font-serif tracking-wide"
                >
                  {sec.label}
                </motion.div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};
