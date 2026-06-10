import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { X, ArrowLeft } from "lucide-react";

const SCENES = [
  { 
    id: "saas", 
    type: "main",
    name: "收银系统与SaaS软件", 
    desc: "涵盖美团、客如云、银豹、爨火等主流系统，提供买断与年费方案。",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2360&q=80",
    systems: ["美团", "客如云", "银豹", "爨火"],
    pricingCategories: [
      {
        title: "美团餐饮系统",
        desc: "美团官方出品的智能收银与餐饮管理系统，无缝对接美团/大众点评公域流量，提供外卖、团购、扫码点餐全链路解决方案。",
        items: [
          { name: "轻享版促销季", price: "¥1499", desc: "原价¥2398。含基础设置、团购外卖、手机点餐、外卖中心自动回复等。", details: ["包含功能：基础收银、团购外卖管理、手机点餐、二维码点餐、会员储值、营销活动、小程序点餐、外卖中心"] },
          { name: "智能版系列", price: "¥2888/首年", desc: "分LITE新店、标准新店及友商老店方案。含扫码点餐及外卖。", details: ["主收银：¥2888 (次年续费¥2000)", "副点位：¥1000 (次年续费¥600)", "含平台小程序扫码点餐及美团外卖深度集成"] },
          { name: "商家小程序", price: "¥1200", desc: "高级版(微信) / 旗舰版(微信+支付宝)。", details: ["商家小程序高级版(微信)：¥999", "商家小程序旗舰版(微信+支付宝)：¥1200"] },
          { name: "SaaS 整体方案", price: "¥3688/年起", desc: "主收银包¥3688/年；会员营销¥2888/年；供应链¥2088/年。", details: ["主收银包：¥3688/年 | 副收银：¥988/年", "高级会员：¥1888/年 | 旗舰会员：¥2888/年", "门店进销存：¥2088/年 | 成本精细化管理：¥4888/年", "手机点餐助手：¥888/年 | 智能叫号：¥888/年"] }
        ]
      },
      {
        title: "客如云数智化",
        desc: "阿里生态核心餐饮SaaS，强大的私域营销与连锁管理能力，支持多平台外卖接单与公私域联动运营。",
        items: [
          { name: "快享版/智享版", price: "¥3000/首年", desc: "含主收银、小程序，支持进阶点餐宝、排队、外卖接单。", details: ["快享版：主收银(含平台小程序+基础会员) ¥2000", "智享版标准模块：主收银 ¥3000 | 副收银 ¥1000", "外卖接单：¥339 | 数电发票：¥800 | 进销存：¥800"] },
          { name: "智享版精选套餐", price: "¥3000/首年", desc: "套餐A(扫码点餐+基础会员) / 套餐B(小程序+私域旗舰版)。", details: ["套餐A：主收银+扫码点餐+基础会员 ¥2500", "套餐B：主收银+商家小程序+私域会员旗舰版 ¥3000"] },
          { name: "SaaS 整体解决方案", price: "¥3200/年起", desc: "基础包¥3200/年(含7平台验券/AI录菜)；会员营销¥800/年。", details: ["门店管理系统：¥3200/年", "平台扫码点餐：¥399/年", "会员营销基础版：¥400/年 | 旗舰版：¥800/年"] },
          { name: "私域与外卖扩展", price: "¥1199/年", desc: "商家小程序¥999/年；三大外卖对接¥349/年；电子发票¥1199/年。", details: ["商家小程序：¥999/年 | 企业微信运营：¥600/年", "外卖对接：¥349/年 | 自营外卖：¥800/年", "电子发票：¥1199/年", "单门店进销存：¥800/年 | 总部订货+进销存：¥3000/年"] }
        ]
      },
      {
        title: "银豹智慧收银",
        desc: "跨行业通用的全能型收银系统，涵盖餐饮、零售、茶饮等多种业态，支持强大的进销存与灵活的私域小程序定制。",
        items: [
          { name: "基础收银板块 (买断)", price: "¥1299/终身", desc: "必选。含基础收银、团购核销、我的店铺APP、进销存。", details: ["基础收银系统：¥1299/终身", "包含：团购核销、我的店铺APP、手机收银APP、进销存管理"] },
          { name: "小程序与私域营销", price: "¥999/年起", desc: "小程序定制装修、堂食外卖、智能储值及30+营销活动。", details: ["小程序装修+扫码点餐：¥999/年", "支持：堂食、自提、外卖、会员营销、套餐秒杀、折扣活动", "私域模块包含：会员等级、储值营销、积分系统、老系统会员迁移"] },
          { name: "连锁与高级增值", price: "¥1000-6000", desc: "总部账号¥1000终身，连锁仓库¥3999终身，BI大数据¥6000/年。", details: ["连锁总部账号：¥1000/终身", "连锁仓库账号：¥3999/终身 或 ¥1999/年", "高级供应链：¥3599/年 | 供应商直供：¥1899/终身", "全电发票：¥899/年 | BI大数据：¥6000/年"] }
        ]
      },
      {
        title: "爨火独立小程序",
        desc: "高性价比的独立小程序解决方案，深度集成微信/支付宝生态，支持多门店与自配送，摆脱平台高佣金。",
        items: [
          { name: "优选套餐A/B/C", price: "¥1980/套", desc: "微信/支付宝小程序+抖音美团核销+不同型号芯烨打印机。", details: ["套餐A：¥1280", "推荐套餐B：¥1680", "套餐C：¥1980", "统一服务：系统教学、配送对接、企业微信客服群、7×12小时售后"] },
          { name: "额外收费与通用服务", price: "¥300", desc: "增加门店¥300/个，售后维护¥100/年，含配送对接与企微服务群。", details: ["增加门店：¥300/个", "售后服务：¥100/年", "腾讯认证费(企业)：¥300 | 腾讯认证费(个体)：¥30"] }
        ]
      }
    ]
  },
  { 
    id: "hardware", 
    type: "main",
    name: "商业智能硬件设备", 
    desc: "收银机、打印机、扫码器等全套前后台商用级外设。",
    img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2360&q=80",
    systems: ["收银机", "打印机", "辅助外设"],
    pricingCategories: [
      {
        title: "智能收银机系列",
        desc: "高性能商用级智能硬件，支持双屏交互与多种外设扩展，为高并发收银场景提供稳定保障。",
        items: [
          { name: "智能收银机 4L", price: "¥1280", desc: "基础款高性价比。", details: ["高性价比基础收银机", "适合小型零售与餐饮门店"] },
          { name: "智能收银机 POS5", price: "¥1580", desc: "性能进阶款。", details: ["性能进阶收银机", "运行流畅，适合标准门店"] },
          { name: "智能收银机 POS5D", price: "¥1680", desc: "双屏互动款，客显增强交互。", details: ["双屏互动收银机", "带副屏客显，增强顾客支付与点餐体验"] },
          { name: "智能称重收银机 3DW", price: "¥2860", desc: "生鲜、称重类商户专属。", details: ["一体化称重收银机", "适合生鲜、水果、称重自选类商户"] },
          { name: "mini 4 PRO", price: "¥2480", desc: "高端便携款。", details: ["高端便携收银机", "占地小、设计感强，适合精品店"] }
        ]
      },
      {
        title: "后厨与前台打印机",
        desc: "防油防水、高速低噪的专业商用打印设备，满足前台收据与后厨飞单的严苛环境需求。",
        items: [
          { name: "80MM后厨打印机 (防水防油)", price: "¥450", desc: "后厨重油污环境首选。", details: ["80MM幅宽", "防水防油设计，适合中餐/快餐后厨飞单"] },
          { name: "58/80MM标签打印机", price: "¥450", desc: "茶饮/烘焙贴纸必备。", details: ["支持58MM或80MM标签", "适合奶茶杯贴、烘焙糕点包装"] },
          { name: "80MM后厨打印机 (标准)", price: "¥300", desc: "常规后厨适用。", details: ["80MM幅宽标准版", "适合普通餐厅前台或后厨打印"] },
          { name: "58MM前台打印机", price: "¥159", desc: "前台收据打印。", details: ["58MM幅宽", "高性价比，适合小型门店收据打印"] }
        ]
      },
      {
        title: "辅助外设 (扫码/排队/后厨)",
        desc: "涵盖扫码枪、排队机、KDS后厨屏等全套辅助设备，全方位提升门店运营与出餐效率。",
        items: [
          { name: "美味不用等排队机", price: "¥1299", desc: "智能叫号排队。", details: ["智能叫号、排队取号", "提升等位体验，防流失"] },
          { name: "KDS MIN后厨屏", price: "¥1400", desc: "无纸化后厨出餐。", details: ["无纸化后厨显示", "防漏单、错单，提升出餐效率"] },
          { name: "商米二维扫码枪", price: "¥175", desc: "高速识别支付码/条码。", details: ["二维扫码枪", "高速识别手机支付码与商品条码"] },
          { name: "扫码盒子", price: "¥89", desc: "桌面免提扫码。", details: ["桌面固定式扫码盒", "顾客自助扫码支付，解放收银员双手"] },
          { name: "大/小钱箱", price: "¥120", desc: "坚固耐用，基础收银必备。", details: ["金属材质钱箱", "配合收银机自动弹开"] }
        ]
      }
    ]
  },
  { 
    id: "services", 
    type: "main",
    name: "全域代运营与增值服务", 
    desc: "小程序装修、代运营、短视频与系统代维等高附加值服务。",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2360&q=80",
    systems: ["代运营", "小程序设计", "短视频"],
    pricingCategories: [
      {
        title: "四大核心代运营方案",
        desc: "为商家提供从品牌管控、会员营销到系统代维的一站式深度运营服务，助力门店业绩增长。",
        items: [
          { name: "品牌管控解决方案", price: "面议", desc: "连锁总部统一管控、巡店督导、自动分账与资金归集。", details: ["适用于：连锁品牌、多门店、加盟体系", "核心能力：总部统一管控、巡店督导、支付体系、自动分账、资金归集"] },
          { name: "全域会员营销代运营", price: "面议", desc: "公域引流转私域，搭建储值、积分、裂变等全生命周期运营闭环。", details: ["运营闭环：公域平台 → 私域沉淀 → 会员转化 → 储值复购 → 裂变拉新", "支持平台：美团、抖音、快手、支付宝、小程序、企业微信"] },
          { name: "供应链运营解决方案", price: "面议", desc: "打通总部采购、统仓统配、门店订货与库存管理。", details: ["包含：总部采购、门店订货、库存管理", "统仓统配、数据分析"] },
          { name: "系统代运维套餐", price: "¥4688", desc: "套餐A(¥2688) / 套餐B(¥4688)。含配置增改、排障、出具经营报告。", details: ["服务内容：配置、数据、批量操作、远程排障、数据分析+优化建议", "服务时间：7×14小时 (9:00-23:00) 10分钟响应", "套餐A：¥2688 | 套餐B：¥4688"] }
        ]
      },
      {
        title: "小程序设计与装修服务",
        desc: "专业的设计与开发团队，提供从基础版到高级定制的小程序视觉呈现，打造专属品牌调性。",
        items: [
          { name: "基础版装修", price: "¥1000", desc: "5-7天交付。含首页+点餐页+个人中心，支持2轮局部修改。", details: ["包含：首页+点餐页+个人中心", "周期：5-7天", "支持：2轮局部修改"] },
          { name: "高级版装修", price: "¥1999", desc: "7-10天交付。全页面个性化，支持微动效及3轮不限内容修改。", details: ["包含：全页面个性化设计、微动效", "周期：7-10天", "支持：3轮不限内容修改"] },
          { name: "非标定制", price: "按需报价", desc: "满足商家特殊设计需求，沟通后确认。", details: ["满足商家特殊设计需求", "沟通确认后评估周期与价格"] }
        ]
      },
      {
        title: "短视频与团购业务",
        desc: "基于AI快剪与本地生活流量分发，为门店提供短视频矩阵与视频号团购运营，抢占同城曝光。",
        items: [
          { name: "AI快剪1000条视频", price: "¥2980", desc: "海量短视频矩阵分发，抢占本地生活流量。", details: ["制作1000条高质量AI剪辑短视频", "适合本地生活多账号矩阵分发，霸屏曝光"] },
          { name: "视频号团购上线+运营", price: "按需报价", desc: "微信生态内公私域联动，商业闭环打造。", details: ["视频号团购组件开通与上架", "配合直播与短视频挂载，公私域联动"] }
        ]
      }
    ]
  },
  { 
    id: "broadband", 
    type: "main",
    name: "商铺宽带与异业合作", 
    desc: "三大运营商商用宽带及布线，赠送收银硬件。",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2360&q=80",
    systems: ["联通", "电信", "移动"],
    pricingCategories: [
      {
        title: "中国联通 (生态套餐送设备)",
        desc: "联通高带宽商用网络，结合生态合作赠送收银硬件，降低门店初期IT投入成本。",
        items: [
          { name: "99生态版", price: "¥74/月(实付)", desc: "300M宽带+60G流量，赠二手收银机1台。", details: ["实付月租：¥74/月", "包含：300M宽带 + 60G流量", "赠送福利：二手收银机1台"] },
          { name: "129生态版", price: "¥98/月(实付)", desc: "赠二手收银机+80mm打印机。", details: ["实付月租：¥98/月", "包含：联通商铺宽带与流量", "赠送福利：二手收银机 + 80mm打印机"] },
          { name: "159生态版", price: "¥119/月(实付)", desc: "赠全新收银机 (客如云/美团/Windows等)。", details: ["实付月租：¥119/月", "包含：联通高配宽带套餐", "赠送福利：全新收银机1台"] },
          { name: "199生态版", price: "¥147/月(实付)", desc: "赠全新收银机+2台80mm打印机。", details: ["实付月租：¥147/月", "包含：联通顶级宽带套餐", "赠送福利：全新收银机 + 2台80mm打印机"] },
          { name: "159/199生意通", price: "¥173/月", desc: "含双路由组网FTTR+可选监控枪机。", details: ["生意通专属组网方案", "包含双路由FTTR组网", "可选配监控设备"] }
        ]
      },
      {
        title: "中国电信 (高价值成交套餐)",
        desc: "电信千兆/双千兆高品质宽带，搭配丰富的硬件赠品，满足高带机量与大流量业务需求。",
        items: [
          { name: "300M套餐", price: "¥99/月(实付)", desc: "含50G流量/300分钟，赠二手收银机+手机。", details: ["实付月租：¥99/月", "包含：300M宽带 + 50G流量 + 300分钟通话", "赠送福利：二手收银机 + 手机"] },
          { name: "1000M套餐", price: "¥139/月(实付)", desc: "含60G流量/700分钟，赠全新收银机+手机。", details: ["实付月租：¥139/月", "包含：1000M宽带 + 60G流量 + 700分钟通话", "赠送福利：全新收银机 + 手机"] },
          { name: "2000M双宽带 A", price: "¥219/月(实付)", desc: "2000M+1000M双宽带，赠全新收银机+1台80机+1台58机+手机。", details: ["实付月租：¥219/月", "包含：2000M主宽带 + 1000M副宽带", "赠送福利：全新收银机 + 80打印机 + 58打印机 + 手机"] },
          { name: "2000M双宽带 B", price: "¥199/月(实付)", desc: "预存¥2400，赠全新收银机+2台80机+钱箱+手机。", details: ["实付月租：¥199/月 (需预存¥2400)", "包含：2000M主宽带 + 1000M副宽带", "赠送福利：全新收银机 + 2台80打印机 + 钱箱 + 手机"] }
        ]
      },
      {
        title: "中国移动 (商铺合约包)",
        desc: "移动高性价比纯宽带与互联网专线方案，支持FTTR全光组网，适合对网络并发有极高要求的商户。",
        items: [
          { name: "99元套餐", price: "¥99/月", desc: "纯宽带1000M，FTTR-H(1主1从)，预存12个月¥990。", details: ["月租：¥99/月 (预存12个月¥990)", "包含：纯宽带1000M", "支持：FTTR-H全光组网(1主1从)"] },
          { name: "169元套餐", price: "¥169/月", desc: "纯宽带2000M，FTTR-B轻量版，预存12个月¥1690。", details: ["月租：¥169/月 (预存12个月¥1690)", "包含：纯宽带2000M", "支持：FTTR-B轻量版全光组网"] },
          { name: "199/299元套餐", price: "¥199-299/月", desc: "100M/200M互联网专线，上下行对等，适合高并发。", details: ["月租：¥199-299/月", "包含：100M/200M 互联网商用专线", "优势：上下行对等，带机量大，适合高并发网络环境"] }
        ]
      },
      {
        title: "配套网络服务",
        desc: "提供专业的门店网络布线、监控部署与收银系统组网调试，确保营业环境网络稳定无死角。",
        items: [
          { name: "门店网络布线与规划", price: "面议", desc: "装修前网络勘测规划，避免明线影响美观。", details: ["服务内容：装修前网络勘测、规划、弱电施工", "避免明线影响美观，确保点位预留合理"] },
          { name: "收银组网与监控部署", price: "面议", desc: "门店收银系统组网调试及监控网络搭建。", details: ["服务内容：收银机/打印机局域网组网调试", "安防监控摄像头安装与网络搭建配置"] }
        ]
      }
    ]
  }
];

const SceneItemCard = ({ item }: { item: any }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div 
      className="flex flex-col bg-foreground/5 p-3 rounded-xl border border-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium text-foreground/90 text-sm md:text-base">{item.name}</span>
        <span className="font-serif text-accent/90 text-sm md:text-base">{item.price}</span>
      </div>
      <span className="text-[10px] md:text-[12px] text-foreground/50 leading-relaxed">{item.desc}</span>
      
      <AnimatePresence>
        {expanded && item.details && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-foreground/10">
              <ul className="flex flex-col gap-2">
                {item.details.map((detail: string, idx: number) => (
                  <li key={idx} className="text-[11px] md:text-[13px] text-foreground/70 flex items-start">
                    <span className="text-accent mr-2 mt-0.5">•</span>
                    <span className="flex-1 leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const POSMatrix: React.FC = () => {
  const [activeScene, setActiveScene] = useState<typeof SCENES[0] | null>(null);

  const renderSceneCard = (scene: typeof SCENES[0]) => {
    const isActive = activeScene?.id === scene.id;
    const isFaded = activeScene && !isActive;

    return (
        <motion.div
          key={scene.id}
          onClick={() => !isActive && setActiveScene(scene)}
          animate={{ 
            opacity: isFaded ? 0 : 1,
            flexGrow: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`rounded-2xl md:rounded-[32px] overflow-hidden shrink-0 md:shrink md:w-[280px] lg:w-[320px] h-[280px] md:h-[400px] ${
            isActive ? "absolute !w-full !h-full inset-0 z-50 cursor-default bg-transparent" : "relative bg-white shadow-soft cursor-pointer hover:shadow-xl transition-shadow"
          }`}
          style={{ display: isFaded ? "none" : "flex", flexDirection: "column", transform: "translateZ(0)" }}
        >
        {!isActive ? (
          <div className="p-6 md:p-8 h-full flex flex-col justify-between">
            <div>
              {scene.type === "independent" && (
                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-accent rounded-full" />
                </div>
              )}
              <h3 className="text-xl md:text-[28px] font-serif text-foreground mb-2 md:mb-4">{scene.name}</h3>
              <p className="text-xs md:text-[15px] text-foreground/60 leading-relaxed">{scene.desc}</p>
            </div>
            <div className={`text-[10px] md:text-[12px] font-sans tracking-widest uppercase ${scene.type === "independent" ? "text-accent" : "text-foreground/40"}`}>
              Explore →
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full relative overflow-hidden">
            {/* Top Left Back Button */}
            <button 
              className="absolute top-4 left-4 md:top-8 md:left-8 z-20 px-4 py-2 flex items-center gap-2 bg-foreground/5 hover:bg-foreground/10 rounded-full text-foreground backdrop-blur-md transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setActiveScene(null);
              }}
            >
              <ArrowLeft size={18} />
              <span className="text-sm tracking-widest">返回主视图</span>
            </button>

            {/* Top Right Close Button */}
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 z-20 w-10 h-10 flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 rounded-full text-foreground backdrop-blur-md transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setActiveScene(null);
              }}
            >
              <X size={20} />
            </button>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.32, 0, 0.67, 0] }}
              className="flex-1 min-h-0 p-8 md:p-16 pt-20 md:pt-24 flex flex-col justify-between text-foreground overflow-hidden"
            >
              <div className="shrink-0">
                <h3 className="text-3xl md:text-[48px] font-serif mb-4 md:mb-6">{scene.name}</h3>
                <p className="text-base md:text-[20px] text-foreground/70 leading-relaxed mb-8 md:mb-12 max-w-md">
                  {scene.desc}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {scene.systems.map((sys, idx) => (
                    <span 
                      key={idx} 
                      onClick={(e) => {
                        e.stopPropagation();
                        // 寻找包含这个系统名称的分类
                        const catIndex = scene.pricingCategories?.findIndex(cat => cat.title.includes(sys));
                        if (catIndex !== undefined && catIndex !== -1) {
                          const el = document.getElementById(`cat-${scene.id}-${catIndex}`);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }
                      }}
                      className="cursor-pointer hover:bg-foreground/10 transition-colors px-4 py-1 md:px-6 md:py-2 rounded-full border border-foreground/30 text-foreground/90 text-sm md:text-[16px]"
                    >
                      {sys}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="w-full flex-1 min-h-0 bg-foreground/5 border border-foreground/10 rounded-2xl p-4 md:p-6 mt-8 md:mt-12 flex flex-col overflow-y-auto hide-scrollbar allow-touch-scroll">
                {scene.pricingCategories && scene.pricingCategories.length > 0 ? (
                  scene.pricingCategories.map((cat, idx) => (
                    <div key={idx} id={`cat-${scene.id}-${idx}`} className="mb-6 last:mb-12 shrink-0 scroll-mt-6">
                      <h4 className="text-xs md:text-[14px] text-foreground/50 uppercase tracking-widest mb-1">{cat.title}</h4>
                      {cat.desc && <p className="text-[10px] md:text-xs text-foreground/40 mb-3 leading-relaxed">{cat.desc}</p>}
                      <div className="flex flex-col gap-2">
                        {cat.items.map((item, i) => (
                          <SceneItemCard key={i} item={item} />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40">
                    Pricing information coming soon...
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    );
  };
  React.useEffect(() => {
    SCENES.forEach(scene => {
      const img = new Image();
      img.src = scene.img;
    });
  }, []);

  return (
    <Section id="pos-matrix" containerClassName="!p-0" className="flex-col">
      {/* 
        【层层递进的交互反馈设计 01：背景沉浸】
        当用户点击场景卡片时，背景瞬间淡入真实的商业空间照片，
        从抽象的系统概念无缝过渡到具象的物理场景，建立“系统即场景”的认知。
      */}
      <AnimatePresence>
        {activeScene && (
          <motion.div
            key="solid-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0, 0.67, 0] }}
            className="absolute inset-0 z-0 bg-background"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full h-full p-6 sm:p-8 lg:p-24 xl:p-[120px] pb-[calc(6rem+env(safe-area-inset-bottom))] xl:pb-[120px] flex flex-col justify-center min-h-0">
        {/* 
          【层层递进的交互反馈设计 02：文案隐退】
          进入沉浸模式后，大标题和描述文案平滑上移并淡出，
          将视觉重心完全让渡给展开后的场景卡片，避免信息过载。
        */}
        <motion.div 
          animate={{ opacity: activeScene ? 0 : 1, y: activeScene ? -20 : 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0, 0.67, 0] }}
          className="mt-12 md:mt-0 shrink-0"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif text-foreground mb-4 md:mb-6">SaaS及服务</h2>
          <p className="text-lg md:text-xl lg:text-[24px] text-foreground/60 mb-8 md:mb-12 max-w-2xl font-light leading-relaxed">
            全栈商业解决方案，从硬件、软件到全域运营，为门店增长提供确定性基建。
          </p>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-6 md:gap-12 pb-12 md:pb-0 flex-1 min-h-0 overflow-y-auto hide-scrollbar allow-touch-scroll items-stretch">
          
          {/* 全栈系统展示区 */}
          <div className="flex-1 flex flex-col gap-4 min-h-min">
            {!activeScene && (
              <h3 className="text-foreground/50 tracking-widest text-sm font-medium uppercase px-2 shrink-0">全栈业务矩阵</h3>
            )}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 flex-wrap xl:flex-nowrap pb-12">
              {SCENES.filter(s => s.type === "main").map(renderSceneCard)}
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default POSMatrix;
