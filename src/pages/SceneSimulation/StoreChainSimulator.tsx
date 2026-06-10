import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Brain,
  Database,
  LineChart,
  RefreshCw,
  Store,
} from "lucide-react";

type LayerId = "physical" | "system" | "tools" | "ai" | "loop";

type ChainLayer = {
  id: LayerId;
  index: string;
  title: string;
  question: string;
  summary: string;
  icon: React.ElementType;
  color: string;
  sceneTitle: string;
  pain: string;
  action: string;
  result: string;
  flow: string[];
  formulaTitle: string;
  formula: string;
  metrics: Array<{ label: string; before: string; after: string }>;
};

const LAYERS: ChainLayer[] = [
  {
    id: "physical",
    index: "01",
    title: "物理门店",
    question: "店里真正痛在哪里？",
    summary: "先看见等待、跑动、错单和老板看不见的隐性损耗。",
    icon: Store,
    color: "#D97757",
    sceneTitle: "午餐高峰",
    pain: "顾客排队，员工来回确认，后厨等口头传单，老板只看到现场很忙。",
    action: "先不讲系统，只把混乱动作拆开：谁在等、谁在跑、哪里容易错。",
    result: "商家先承认：问题不是某个按钮不会用，而是门店动作没有被组织。",
    flow: ["顾客进店", "排队等待", "员工确认", "后厨接单", "老板凭感觉"],
    formulaTitle: "心理损耗",
    formula: "顾客厌恶值 = 等待焦虑 + 信息不确定 + 服务摩擦 + 出错体验",
    metrics: [
      { label: "等待时间", before: "12 分钟", after: "先被看见" },
      { label: "员工跑动", before: "高", after: "可统计" },
      { label: "老板盲区", before: "大", after: "被拆解" },
    ],
  },
  {
    id: "system",
    index: "02",
    title: "系统记录",
    question: "收银系统除了收钱还能干什么？",
    summary: "它把门店动作记录成订单、会员、库存、支付和报表数据。",
    icon: Database,
    color: "#4F8FBF",
    sceneTitle: "订单进入系统",
    pain: "没有系统化记录时，老板只能记得今天忙不忙，却不知道忙在哪里。",
    action: "点单变订单，支付变流水，菜品变销量，顾客变会员记录。",
    result: "真实动作开始变成可查询、可复盘、可计算的数据。",
    flow: ["点单", "订单", "支付", "库存", "报表"],
    formulaTitle: "数据入口",
    formula: "真实动作 → 系统记录 → 可查询数据 → 经营判断",
    metrics: [
      { label: "订单可追踪", before: "低", after: "高" },
      { label: "库存可见性", before: "靠感觉", after: "可扣减" },
      { label: "营业复盘", before: "看总额", after: "看结构" },
    ],
  },
  {
    id: "tools",
    index: "03",
    title: "工具扩展",
    question: "系统功能不完整怎么办？",
    summary: "把系统里的数据拿出来，用外部工具清洗、分群、计算机会。",
    icon: RefreshCw,
    color: "#4D9F72",
    sceneTitle: "qclaw / 外部工具接入",
    pain: "系统有会员数据，但不一定能给出足够好用的分析和动作建议。",
    action: "抓取会员数据，清洗消费记录，识别沉睡会员和高客单低频顾客。",
    result: "系统从封闭软件变成数据源，你的个人能力开始介入。",
    flow: ["会员数据", "抓取", "清洗", "分群", "机会列表"],
    formulaTitle: "个人能力杠杆",
    formula: "个人能力杠杆 = 系统数据 × 外部工具 × 场景理解",
    metrics: [
      { label: "沉睡会员", before: "不可见", after: "可识别" },
      { label: "高价值顾客", before: "凭印象", after: "按数据筛" },
      { label: "策略空间", before: "系统内", after: "系统外" },
    ],
  },
  {
    id: "ai",
    index: "04",
    title: "AI 转化",
    question: "数据怎么变成钱？",
    summary: "让 AI 根据数据生成发券策略、活动文案和收益预估。",
    icon: Brain,
    color: "#8B6CB8",
    sceneTitle: "会员唤醒",
    pain: "很多商家会发券，但不知道给谁发、发什么、什么时候发、到底赚没赚。",
    action: "AI 分析消费频次、客单价、偏好和沉睡天数，生成低成本唤醒方案。",
    result: "数据不只是报表，而是变成可执行的营销动作。",
    flow: ["消费数据", "AI判断", "发券策略", "顾客触达", "核销"],
    formulaTitle: "营销净收益",
    formula: "营销净收益 = 核销人数 × 客单价 × 毛利率 - 优惠成本 - 工具成本",
    metrics: [
      { label: "无效优惠", before: "高", after: "降低" },
      { label: "策略命中", before: "靠经验", after: "按分群" },
      { label: "活动结果", before: "难判断", after: "可复盘" },
    ],
  },
  {
    id: "loop",
    index: "05",
    title: "经营闭环",
    question: "为什么这不是普通系统演示？",
    summary: "门店行为、系统数据、外部工具、AI判断和复购结果会回流成循环。",
    icon: LineChart,
    color: "#C98A35",
    sceneTitle: "从一次消费到下一次复购",
    pain: "普通系统演示只停在功能，商家很难想象这些功能最后如何产生经营结果。",
    action: "顾客复购产生新订单，新数据回流系统，再进入工具和 AI 的下一轮判断。",
    result: "门店经营变成一个可计算、可迭代、可被个人能力放大的循环。",
    flow: ["门店行为", "系统记录", "工具扩展", "AI策略", "复购回流"],
    formulaTitle: "总公式",
    formula: "门店利润 = 订单效率 × 客单价 × 复购率 × 毛利率 - 隐性损耗",
    metrics: [
      { label: "系统价值", before: "收钱", after: "转化入口" },
      { label: "个人价值", before: "讲产品", after: "做连接" },
      { label: "经营结果", before: "靠感觉", after: "可计算" },
    ],
  },
];

export const StoreChainSimulator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeLayer, setActiveLayer] = useState<LayerId>("physical");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const layer = useMemo(
    () => LAYERS.find((item) => item.id === activeLayer) ?? LAYERS[0],
    [activeLayer],
  );
  const activeIndex = LAYERS.findIndex((item) => item.id === activeLayer);
  const ActiveIcon = layer.icon;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeLayer]);

  const go = (offset: number) => {
    const next = Math.max(0, Math.min(LAYERS.length - 1, activeIndex + offset));
    setActiveLayer(LAYERS[next].id);
  };

  return (
    <div className="w-full h-full bg-[#F7F3EB] text-[#292825] overflow-hidden flex flex-col">
      <div className="shrink-0 h-16 px-5 md:px-8 border-b border-black/10 flex items-center justify-between">
        <button
          onClick={onClose}
          className="h-10 px-4 rounded-full bg-black/5 hover:bg-black/10 flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft size={18} />
          返回场景模拟
        </button>
        <div className="hidden md:block text-xs tracking-[0.18em] uppercase text-foreground/40">
          Store Chain Simulator
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto hide-scrollbar allow-touch-scroll">
        <div className="max-w-7xl mx-auto p-5 md:p-8 pb-[calc(6rem+env(safe-area-inset-bottom))] xl:pb-10">
          <div className="overflow-x-auto hide-scrollbar mb-6">
            <div className="min-w-max flex gap-3">
              {LAYERS.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === activeLayer;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveLayer(item.id)}
                  className={`w-[144px] text-left rounded-2xl border p-3 transition-colors ${
                      isActive
                        ? "bg-[#292825] text-white border-[#292825]"
                        : "bg-white/55 text-foreground border-black/10 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: isActive ? "rgba(255,255,255,0.12)" : `${item.color}22` }}
                      >
                        <Icon size={19} style={{ color: item.color }} />
                      </div>
                      <div>
                        <div className={`text-xs tracking-[0.18em] ${isActive ? "text-white/45" : "text-foreground/35"}`}>
                          {item.index}
                        </div>
                        <div className="font-medium whitespace-nowrap text-sm">{item.title}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
            <section className="rounded-[28px] border border-black/10 bg-white/55 overflow-hidden">
              <div className="p-4 md:p-5 border-b border-black/10">
                <div className="text-xs tracking-[0.22em] uppercase mb-3" style={{ color: layer.color }}>
                  {layer.index} / {layer.title}
                </div>
                <h2 className="font-serif text-2xl md:text-[38px] leading-tight mb-2">{layer.question}</h2>
                <p className="text-sm md:text-base text-foreground/62 leading-relaxed">{layer.summary}</p>
              </div>

              <div className="relative bg-[#FBF8F1] overflow-hidden" style={{ height: 540 }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(217,119,87,0.13),transparent_30%)]" />
                <svg
                  className="absolute top-4"
                  viewBox="0 0 820 420"
                  role="img"
                  aria-label="门店平面经营链路模拟"
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    left: 16,
                    right: 16,
                    width: "calc(100% - 32px)",
                    height: 420,
                  }}
                >
                  <defs>
                    <filter id="nodeShadow" x="-40%" y="-40%" width="180%" height="180%">
                      <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.16" />
                    </filter>
                    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill={layer.color} />
                    </marker>
                  </defs>

                  <rect x="52" y="34" width="716" height="338" rx="28" fill="rgba(255,255,255,0.72)" stroke="rgba(41,40,37,0.14)" strokeWidth="2" />
                  <path d="M52 306 H92" stroke="#292825" strokeWidth="5" strokeLinecap="round" opacity="0.65" />
                  <text x="57" y="325" fontSize="13" fill="rgba(41,40,37,0.45)">入口</text>

                  <rect x="94" y="58" width="136" height="78" rx="18" fill="rgba(216,154,56,0.12)" stroke="rgba(216,154,56,0.28)" />
                  <text x="162" y="103" textAnchor="middle" fontSize="17" fill="rgba(41,40,37,0.55)">排队区</text>

                  <rect x="308" y="54" width="168" height="88" rx="18" fill="rgba(217,119,87,0.12)" stroke="rgba(217,119,87,0.28)" />
                  <text x="392" y="103" textAnchor="middle" fontSize="18" fill="rgba(41,40,37,0.58)">后厨</text>

                  <rect x="556" y="54" width="150" height="88" rx="18" fill="rgba(77,159,114,0.12)" stroke="rgba(77,159,114,0.28)" />
                  <text x="631" y="103" textAnchor="middle" fontSize="18" fill="rgba(41,40,37,0.58)">仓库</text>

                  <rect x="592" y="272" width="154" height="78" rx="18" fill="rgba(79,143,191,0.12)" stroke="rgba(79,143,191,0.28)" />
                  <text x="669" y="317" textAnchor="middle" fontSize="18" fill="rgba(41,40,37,0.58)">收银台</text>

                  {[
                    [294, 188, "A1"],
                    [430, 188, "A2"],
                    [294, 278, "B1"],
                    [430, 278, "B2"],
                  ].map(([x, y, label]) => (
                    <g key={label as string}>
                      <rect x={x as number} y={y as number} width="92" height="58" rx="16" fill="#FFF9EE" stroke="rgba(41,40,37,0.13)" />
                      <text x={(x as number) + 46} y={(y as number) + 35} textAnchor="middle" fontSize="15" fill="rgba(41,40,37,0.45)">{label}</text>
                    </g>
                  ))}

                  {[
                    [128, 170, "#D89A38", "客"],
                    [128, 220, "#D89A38", "客"],
                    [414, 265, "#D89A38", "客"],
                    [500, 130, "#4F8FBF", "员"],
                    [650, 236, "#4D9F72", "板"],
                  ].map(([cx, cy, fill, label], index) => (
                    <g key={`${label}-${index}`} filter="url(#nodeShadow)">
                      <circle cx={cx as number} cy={cy as number} r="20" fill={fill as string} stroke="white" strokeWidth="4" />
                      <text x={cx as number} y={(cy as number) + 5} textAnchor="middle" fontSize="13" fill="white">{label}</text>
                    </g>
                  ))}

                  <path d="M152 184 C205 185, 228 205, 286 214" fill="none" stroke={layer.color} strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow)" opacity="0.9" />
                  {activeIndex >= 1 && (
                    <path d="M474 192 C506 156, 526 126, 308 102" fill="none" stroke="#4F8FBF" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow)" opacity="0.9" />
                  )}
                  {activeIndex >= 2 && (
                    <path d="M476 102 C515 94, 535 94, 556 98" fill="none" stroke="#4D9F72" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow)" opacity="0.95" />
                  )}
                  {activeIndex >= 3 && (
                    <g>
                      <rect x="548" y="164" width="180" height="72" rx="16" fill="#292825" />
                      <text x="568" y="191" fontSize="12" fill="rgba(255,255,255,0.5)">AI 策略</text>
                      <text x="568" y="216" fontSize="17" fill="white">发券 / 分群 / 复盘</text>
                      <path d="M548 200 C508 230, 480 250, 434 264" fill="none" stroke="#8B6CB8" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow)" opacity="0.95" />
                    </g>
                  )}
                  {activeIndex >= 4 && (
                    <g>
                      <rect x="100" y="304" width="118" height="38" rx="19" fill="rgba(201,138,53,0.13)" stroke="rgba(201,138,53,0.42)" />
                      <text x="159" y="328" textAnchor="middle" fontSize="15" fill="#9A6B24">复购回流</text>
                      <path d="M218 323 C340 352, 510 348, 592 312" fill="none" stroke="#C98A35" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow)" opacity="0.95" />
                    </g>
                  )}
                </svg>

                <div className="absolute left-5 bottom-5 right-5 rounded-2xl bg-[#292825]/90 text-white p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${layer.color}22` }}>
                      <ActiveIcon size={22} style={{ color: layer.color }} />
                    </div>
                    <div>
                      <div className="text-xs tracking-[0.18em] uppercase text-white/35">当前小场景</div>
                      <h3 className="text-xl font-serif text-white">{layer.sceneTitle}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed">{layer.summary}</p>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <div className="rounded-[28px] border border-black/10 bg-white/60 p-5 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "痛点", text: layer.pain },
                    { label: "系统/工具动作", text: layer.action },
                    { label: "结果", text: layer.result },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-black/[0.035] p-4">
                      <div className="text-xs tracking-[0.18em] uppercase text-foreground/35 mb-2">{item.label}</div>
                      <p className="text-sm leading-relaxed text-foreground/68">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-black/10 bg-white/60 p-5 md:p-6">
                <div className="text-xs tracking-[0.18em] uppercase text-foreground/35 mb-4">链路</div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {layer.flow.map((item, index) => (
                    <div key={item} className="rounded-2xl bg-[#FAF7EF] p-4 flex sm:block items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm text-white shrink-0"
                        style={{ backgroundColor: layer.color }}
                      >
                        {index + 1}
                      </div>
                      <div className="text-sm font-medium">{item}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] bg-[#292825] text-white p-5 md:p-6">
                <div className="text-xs tracking-[0.18em] uppercase text-white/35 mb-3">{layer.formulaTitle}</div>
                <div className="font-serif text-2xl leading-relaxed mb-4">{layer.formula}</div>
                <p className="text-sm text-white/58 leading-relaxed">
                  后续可以继续插入真实公式，用来计算等待损耗、营销净收益、库存损耗和顾客厌恶值。
                </p>
              </div>

              <div className="rounded-[28px] border border-black/10 bg-white/60 p-5 md:p-6">
                <div className="text-xs tracking-[0.2em] uppercase text-foreground/35 mb-4">指标变化</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {layer.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl bg-white/70 border border-black/10 p-4">
                      <div className="text-sm font-medium mb-3">{metric.label}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-xl bg-black/[0.04] p-3">
                          <div className="text-[11px] text-foreground/38 mb-1">原来</div>
                          <div className="text-lg font-semibold text-foreground/68">{metric.before}</div>
                        </div>
                        <div className="rounded-xl p-3" style={{ backgroundColor: `${layer.color}1F` }}>
                          <div className="text-[11px] text-foreground/38 mb-1">介入后</div>
                          <div className="text-lg font-semibold" style={{ color: layer.color }}>
                            {metric.after}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => go(-1)}
                  disabled={activeIndex === 0}
                  className="h-11 px-5 rounded-full border border-black/10 bg-white/60 text-sm disabled:opacity-35"
                >
                  上一层
                </button>
                <button
                  onClick={() => go(1)}
                  disabled={activeIndex === LAYERS.length - 1}
                  className="h-11 px-5 rounded-full text-sm text-white disabled:opacity-35"
                  style={{ backgroundColor: layer.color }}
                >
                  下一层
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreChainSimulator;
