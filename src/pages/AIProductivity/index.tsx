import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Sparkles, X, ArrowLeft } from "lucide-react";

const GALLERY = [
  { id: 1, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", title: "Autumn Special", analysis: "以暖茶色为主调，强化时令感知，极简排版让视觉焦点回归产品本身。" },
  { id: 2, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", title: "Brand Identity", analysis: "大面积留白，搭配衬线体，营造高端且内敛的品牌性格。" },
  { id: 3, img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80", title: "Space Concept", analysis: "通过光影对比建立空间纵深感，自然纹理传达纯粹的美学主张。" }
];

export const AIProductivity: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(0);
  const [activeGalleryItem, setActiveGalleryItem] = useState<typeof GALLERY[0] | null>(null);

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setStep(1); // Show Prompt

    // 【层层递进的交互反馈设计 01：时序节奏控制】
    // 并不是一瞬间展示所有内容，而是通过精确的定时器模拟 AI 思考和生成的真实过程。
    // 步骤1：解析需求并生成 Prompt -> 步骤2：显示进度条加载 -> 步骤3：呈现最终高审美图片。
    setTimeout(() => {
      setStep(2); // Show generation progress
    }, 1500);

    setTimeout(() => {
      setStep(3); // Show final image
      setTimeout(() => {
        setIsGenerating(false);
        setStep(0);
      }, 4000);
    }, 3500);
  };

  return (
    <Section id="ai-productivity" className="flex-col justify-start overflow-hidden min-h-0">
      <div className="shrink-0">
        <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif text-foreground mb-4 md:mb-6 self-start mt-8 md:mt-0">AI 实验室</h2>
        <p className="text-lg md:text-xl lg:text-[24px] text-foreground/60 mb-8 md:mb-12 self-start max-w-2xl font-light">
          从模糊意图到高转化率海报的瞬间跃迁。
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden pr-1 flex flex-col">
        <div className="flex-1 overflow-y-auto hide-scrollbar allow-touch-scroll flex flex-col">
          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8 mb-8 md:mb-12 md:h-[500px] shrink-0">
          <div className="flex-1 bg-white rounded-2xl md:rounded-[32px] p-8 md:p-12 shadow-soft border border-black/5 flex flex-col justify-center relative overflow-hidden min-h-[300px] md:min-h-0">
            <h3 className="text-sm md:text-[20px] text-foreground/40 uppercase tracking-widest mb-4 md:mb-8">01 / Requirement</h3>
            <div className="text-xl md:text-[28px] font-serif leading-relaxed">
              "我们需要一张秋季限定的咖啡海报，要看起来很高级，颜色要温暖一点，不要太复杂。"
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(217,119,87,0.4)] disabled:opacity-50 transition-opacity"
            >
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="flex-1 bg-[#2E2E2B] text-[#F9F7F2] rounded-2xl md:rounded-[32px] p-8 md:p-12 shadow-2xl flex flex-col justify-center relative overflow-hidden font-mono min-h-[300px] md:min-h-0">
            <h3 className="text-sm md:text-[20px] text-white/40 uppercase tracking-widest mb-4 md:mb-8 font-sans">02 / Processing</h3>
            
            <AnimatePresence mode="wait">
              {step >= 1 && (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm md:text-[16px] leading-relaxed text-white/80"
                >
                  {`> SYSTEM: Analyzing input...`}
                  <br /><br />
                  {`> PROMPT GENERATED:`}<br />
                  <span className="text-accent">
                    "Minimalist aesthetic coffee poster, autumn vibe, warm tone #D97757, large whitespace, high-end editorial style, Source Serif typography, soft shadow, highly detailed --ar 3:4 --v 6.0"
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-6 left-8 right-8 md:bottom-12 md:left-12 md:right-12 h-1 bg-white/20 rounded-full overflow-hidden"
              >
                <motion.div 
                  className="h-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                />
              </motion.div>
            )}
          </div>

          <div className="flex-1 bg-white rounded-2xl md:rounded-[32px] p-3 md:p-4 shadow-soft border border-black/5 relative overflow-hidden min-h-[300px] md:min-h-0">
            <h3 className="absolute top-6 left-6 md:top-12 md:left-12 text-xs md:text-[20px] text-foreground/40 uppercase tracking-widest z-10 bg-white/80 backdrop-blur-md px-3 py-1 md:px-4 md:py-2 rounded-full">03 / Result</h3>
            <div className="w-full h-full bg-gray-100 rounded-xl md:rounded-[24px] overflow-hidden relative">
              <AnimatePresence>
                {step >= 3 && (
                  <motion.img
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.32, 0, 0.67, 0] }}
                    src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"
                    alt="Generated Poster"
                    className="w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full pb-12">
          <h3 className="text-xl md:text-[24px] font-serif mb-6 md:mb-8">AI 设计档案</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pb-8">
            {GALLERY.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -8 }}
                transition={{ ease: [0.32, 0, 0.67, 0], duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => setActiveGalleryItem(item)}
              >
                <div className="aspect-video bg-gray-200 rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6 relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h4 className="text-lg md:text-[20px] font-medium mb-2">{item.title}</h4>
                <p className="text-sm md:text-[16px] text-foreground/60 leading-relaxed font-light">{item.analysis}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>

      <AnimatePresence>
        {activeGalleryItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveGalleryItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-background text-foreground w-full max-w-5xl h-[80vh] md:h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
            >
              {/* Back/Close buttons */}
              <div className="absolute top-4 md:top-8 left-4 md:left-8 z-10 flex gap-4">
                <button 
                  onClick={() => setActiveGalleryItem(null)} 
                  className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <ArrowLeft size={18} />
                  <span className="text-sm tracking-widest hidden md:inline">返回</span>
                </button>
              </div>
              <button 
                onClick={() => setActiveGalleryItem(null)} 
                className="absolute top-4 md:top-8 right-4 md:right-8 z-10 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="flex-1 bg-gray-100 relative h-1/2 md:h-full">
                <img src={activeGalleryItem.img} alt={activeGalleryItem.title} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-[400px] p-8 md:p-12 flex flex-col justify-center bg-[#F9F7F2] h-1/2 md:h-full overflow-y-auto">
                <h3 className="text-sm md:text-[20px] text-foreground/40 uppercase tracking-widest mb-4 md:mb-8 font-sans">Aesthetic Analysis</h3>
                <h2 className="text-3xl md:text-[40px] font-serif mb-6">{activeGalleryItem.title}</h2>
                <p className="text-base md:text-[18px] text-foreground/70 leading-relaxed font-light">
                  {activeGalleryItem.analysis}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default AIProductivity;
