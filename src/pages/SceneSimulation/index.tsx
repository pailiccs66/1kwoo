import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Plus, ChevronRight, MonitorPlay, Network, ClipboardList } from "lucide-react";
import { POSSimulator } from "./POSSimulator";
import { StoreChainSimulator } from "./StoreChainSimulator";

export const SceneSimulation: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<"meituan" | "keruyun" | "yinbao" | "kds" | null>(null);
  const [activeChain, setActiveChain] = useState(false);
  const hasDocument = typeof document !== "undefined";

  return (
    <>
      <Section id="scene-simulation" className="flex-col justify-start md:justify-center items-center relative overflow-hidden">
        <AnimatePresence>
          {!activeChain && !activeSystem && (
            <motion.div 
              key="simulation-menu"
              className="w-full h-full p-8 md:p-16 lg:p-24 xl:p-[120px] flex flex-col justify-start overflow-y-auto hide-scrollbar allow-touch-scroll"
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mt-12 md:mt-0 max-w-4xl shrink-0">
                <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif text-foreground mb-4 md:mb-6">场景模拟</h2>
                <p className="text-lg md:text-xl lg:text-[24px] text-foreground/60 mb-12 md:mb-20 font-light leading-relaxed">
                  按演示对象选择入口：系统界面看操作，经营链路看场景。
                </p>
              </div>

              <div className="mb-5 flex items-center gap-3 text-foreground/45 text-sm tracking-[0.18em] uppercase shrink-0">
                <span>经营链路模拟</span>
                <div className="h-px flex-1 bg-foreground/10" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] gap-6 md:gap-8 w-full shrink-0 mb-10">
                <div
                  onClick={() => setActiveChain(true)}
                  className="group cursor-pointer bg-[#292825] text-white border border-white/10 rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(217,119,87,0.35),transparent_32%)] opacity-80" />
                  <div className="relative z-10 max-w-3xl">
                    <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
                      <Network className="text-accent" size={32} />
                    </div>
                    <h3 className="text-3xl md:text-[40px] font-serif mb-4">门店经营链路模拟器</h3>
                    <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                      从门店动线、系统记录、工具扩展到经营复盘，按层查看问题在哪里。
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {["物理门店", "系统记录", "工具扩展", "AI转化", "经营闭环"].map((item) => (
                        <span key={item} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/75">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-accent text-sm font-medium tracking-widest uppercase">
                      进入链路模拟 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-foreground/10 bg-white/40 p-7 flex flex-col justify-center">
                  <div className="text-sm tracking-[0.18em] uppercase text-foreground/35 mb-4">Analysis Route</div>
                  <div className="font-serif text-2xl leading-relaxed mb-5">
                    场景问题 → 系统记录 → 可执行动作
                  </div>
                  <p className="text-foreground/55 leading-relaxed">
                    用来判断门店真正卡在排队、后厨、库存、会员还是复购。
                  </p>
                </div>
              </div>

              <div className="mb-5 flex items-center gap-3 text-foreground/45 text-sm tracking-[0.18em] uppercase shrink-0">
                <span>系统使用界面演示</span>
                <div className="h-px flex-1 bg-foreground/10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full shrink-0 pb-12">
                {/* 美团模拟入口 */}
                <div 
                  onClick={() => setActiveSystem("meituan")}
                  className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#FFC300]/20 flex items-center justify-center mb-6">
                    <MonitorPlay className="text-[#FFC300]" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-3">美团收银智能版</h3>
                  <p className="text-foreground/50 leading-relaxed mb-8">
                    体验美团官方收银系统的点餐、购物车与结账基础流程，感受其专为餐饮打造的交互逻辑。
                  </p>
                  <div className="flex items-center text-accent text-sm font-medium tracking-widest uppercase">
                    进入模拟 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 客如云模拟入口 */}
                <div 
                  onClick={() => setActiveSystem("keruyun")}
                  className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#1677FF]/20 flex items-center justify-center mb-6">
                    <MonitorPlay className="text-[#1677FF]" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-3">客如云 OnPOS</h3>
                  <p className="text-foreground/50 leading-relaxed mb-8">
                    体验阿里生态核心餐饮SaaS的界面布局，尝试将餐品加入购物车并完成基础交互操作。
                  </p>
                  <div className="flex items-center text-accent text-sm font-medium tracking-widest uppercase">
                    进入模拟 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 银豹模拟入口 */}
                <div 
                  onClick={() => setActiveSystem("yinbao")}
                  className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#D9383A]/20 flex items-center justify-center mb-6">
                    <MonitorPlay className="text-[#D9383A]" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-3">银豹收银系统</h3>
                  <p className="text-foreground/50 leading-relaxed mb-8">
                    体验高密度、快节奏的红白经典主题，专为高频收银与多业态通用打造的前台交互。
                  </p>
                  <div className="flex items-center text-accent text-sm font-medium tracking-widest uppercase">
                    进入模拟 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                {/* KDS后厨屏模拟入口 */}
                <div 
                  onClick={() => setActiveSystem("kds")}
                  className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#10B981]/20 flex items-center justify-center mb-6">
                    <ClipboardList className="text-[#10B981]" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-3">KDS后厨屏</h3>
                  <p className="text-foreground/50 leading-relaxed mb-8">
                    演示多入口订单进入后厨后的档口分流、单品完成、合并制作与超时预警。
                  </p>
                  <div className="flex items-center text-accent text-sm font-medium tracking-widest uppercase">
                    进入模拟 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center opacity-50">
                  <div className="w-16 h-16 rounded-full border-2 border-foreground/20 flex items-center justify-center mb-6">
                    <Plus className="text-foreground/40" size={24} />
                  </div>
                  <h3 className="text-xl font-serif text-foreground mb-2">3D硬件与场景布局</h3>
                  <p className="text-foreground/40 text-sm">
                    硬件使用场景与门店3D布局模拟即将上线
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {hasDocument && createPortal(
        <AnimatePresence>
          {activeChain ? (
          <motion.div
            key="store-chain-simulation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-[#F7F3EB] flex items-center justify-center"
          >
            <StoreChainSimulator onClose={() => setActiveChain(false)} />
          </motion.div>
        ) : activeSystem ? (
          <motion.div 
            key="pos-simulation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black flex items-center justify-center"
          >
            <POSSimulator
              initialMode={
                activeSystem === "meituan"
                  ? "meituan_home"
                  : activeSystem === "keruyun"
                    ? "keruyun_home"
                    : activeSystem === "yinbao"
                      ? "yinbao_home"
                      : "kds_home"
              }
              onClose={() => setActiveSystem(null)}
            />
          </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default SceneSimulation;
