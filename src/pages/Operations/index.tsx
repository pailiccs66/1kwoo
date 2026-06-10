import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";

const TOC_ITEMS = [
  { chapter: "I", title: "品牌运营与商业哲思", desc: "商业不应是简单的买卖。我们用极致的美学与技术，重新定义数字化时代的商业体验与运营标准。", page: "01" },
  { chapter: "II", title: "持续演进", desc: "在数字化的浪潮中，我们将持续迭代服务与硬件体系，始终保持对前沿技术的敏锐与对商业本质的敬畏。", page: "02" },
];

export const Operations: React.FC = () => {
  return (
    <Section id="operations" className="flex-col justify-start md:justify-center items-center overflow-hidden min-h-0">
      <div className="w-full max-w-5xl h-full flex flex-col min-h-0">
        <div className="shrink-0 mt-8 md:mt-0">
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif text-foreground mb-2 md:mb-4 text-center">经营之本</h2>
          <p className="text-xs md:text-[20px] text-foreground/50 tracking-[0.2em] uppercase text-center mb-10 md:mb-16 font-light">
            Operations & Infrastructure
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden pr-1 flex flex-col">
          <div className="flex-1 overflow-y-auto hide-scrollbar allow-touch-scroll flex flex-col gap-6 md:gap-8 pb-12 md:pb-16">
            {TOC_ITEMS.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8, ease: [0.32, 0, 0.67, 0] }}
                className="flex items-baseline group"
              >
                <div className="w-8 md:w-16 text-lg md:text-[24px] font-serif text-foreground/40 italic">{item.chapter}</div>
                <div className="flex-1">
                  <div className="flex items-end">
                    <h3 className="text-xl md:text-[32px] font-serif text-foreground mr-2 md:mr-6 transition-colors duration-500 whitespace-nowrap">
                      {item.title}
                    </h3>
                    <div className="flex-1 border-b border-dashed border-foreground/20 mb-2 md:mb-3 opacity-30 transition-opacity duration-500 hidden md:block" />
                    <span className="text-sm md:text-[20px] font-serif text-foreground/40 ml-2 md:ml-6 italic ml-auto">{item.page}</span>
                  </div>
                  <p className="text-sm md:text-[16px] text-foreground/60 mt-2 md:mt-4 max-w-2xl leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Operations;
