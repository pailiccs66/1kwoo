import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/layout/Section";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const Persona: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Cleanup old ripples
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 2000); // Wait for animation to finish
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples((prev) => [...prev, { id: Date.now(), x, y }]);
  };

  return (
    <Section id="persona" className="relative flex-col items-center justify-center cursor-crosshair">
      {/* 
        【层层递进的交互反馈设计 01：流体与涟漪的隐喻】
        背景不使用具象的图片，而是通过极弱的径向渐变（流场动画）和触摸产生的涟漪。
        每次触摸屏幕都会产生一个扩散的涟漪，象征着“商业场域中微小改变带来的涟漪效应”。
      */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        onPointerDown={handlePointerDown}
      >
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.3 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute w-[400px] h-[400px] rounded-full border border-foreground/10 bg-foreground/5 pointer-events-none"
              style={{
                left: ripple.x - 200,
                top: ripple.y - 200,
              }}
            />
          ))}
        </AnimatePresence>

        {/* Very subtle ambient gradient animation */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(217, 119, 87, 0.03) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      {/* 
        【层层递进的交互反馈设计 02：诗意留白】
        文字采用优雅的 ease: [0.32, 0, 0.67, 0] 曲线从底部浮现。
        极大的留白（Whitespace）让用户的注意力完全集中在文案的内核上，而非界面的繁杂元素。
      */}
      <div className="relative z-10 text-center flex flex-col items-center max-w-[1200px] pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.32, 0, 0.67, 0] }}
          className="text-4xl md:text-[60px] lg:text-[80px] leading-tight font-serif text-foreground tracking-wide mb-8 md:mb-12"
        >
          在数字的经纬里，<br />
          重塑商业场域的温度与味道。
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.32, 0, 0.67, 0] }}
          className="text-base md:text-xl lg:text-[24px] font-sans text-foreground/50 tracking-widest uppercase"
        >
          The Aesthetics of Technology & Sales
        </motion.p>
      </div>
    </Section>
  );
};

export default Persona;