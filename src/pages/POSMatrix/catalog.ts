export type OfferItem = {
  name: string;
  price: string;
  summary: string;
  details?: string[];
};

export type OfferSection = {
  id: string;
  name: string;
  items: OfferItem[];
};

export type BusinessGroup = {
  id: string;
  name: string;
  summary: string;
  sections: OfferSection[];
};

export type BusinessCategory = {
  id: "operations" | "digital" | "design" | "partnerships";
  name: string;
  shortName: string;
  summary: string;
  groups: BusinessGroup[];
};

const KERUYUN_HARDWARE: OfferItem[] = [
  { name: "智能收银机 4L", price: "¥1280", summary: "基础高性价比款，适合小型餐饮与零售门店。" },
  { name: "智能收银机 POS5", price: "¥1580", summary: "性能进阶款，适合标准门店。" },
  { name: "智能收银机 POS5D", price: "¥1680", summary: "双屏客显款，适合需要顾客互动的门店。" },
  { name: "智能称重收银机 3DW", price: "¥2860", summary: "称重一体机，适合生鲜、水果和自选业态。" },
  { name: "mini 4 PRO", price: "¥2480", summary: "占地更小的高配收银设备。" },
  { name: "80MM 后厨打印机（防水防油）", price: "¥450", summary: "适合重油污后厨环境。" },
  { name: "58/80MM 标签打印机", price: "¥450", summary: "适合茶饮、烘焙和商品标签。" },
  { name: "80MM 后厨打印机", price: "¥300", summary: "标准后厨与前台打印。" },
  { name: "58MM 前台打印机", price: "¥159", summary: "小型门店前台小票打印。" },
  { name: "商米二维扫码枪", price: "¥175", summary: "识别支付码与商品条码。" },
  { name: "扫码盒子", price: "¥89", summary: "桌面固定式免提扫码。" },
  { name: "大/小钱箱", price: "¥120", summary: "配合收银机自动弹开。" },
  { name: "KDS MIN 屏", price: "¥1400", summary: "后厨接单、分单和出餐显示设备。" },
  { name: "美味不用等排队机", price: "¥1299", summary: "排队取号与智能叫号设备。" },
];

const MEITUAN_HARDWARE: OfferItem[] = [
  { name: "S5 单屏收银机", price: "¥1688", summary: "美团餐饮系统单屏收银设备。" },
  { name: "S5 Pro 单屏收银机", price: "¥1888", summary: "旗舰性能单屏收银设备。" },
  { name: "S4 Mini Pro 收银机", price: "¥2388", summary: "小巧灵活的桌面收银设备。" },
  { name: "美团收银平板 P2", price: "¥1288", summary: "适合桌台点餐与移动收银。" },
  { name: "S5S Pro 双屏收银机", price: "¥2388", summary: "双屏顾客交互收银设备。" },
  { name: "L4 称重一体机", price: "¥2888", summary: "收银、称重和打印一体。" },
  { name: "美团扫码盒 SC3", price: "¥160", summary: "桌面支付扫码设备。" },
  { name: "美团蓝牙扫码盒 SC3B", price: "¥180", summary: "蓝牙连接的桌面扫码设备。" },
  { name: "K9 手持 POS", price: "¥1200", summary: "移动点餐与收银设备。" },
  { name: "M1 手持 POS", price: "¥1200", summary: "移动点餐与收银设备。" },
  { name: "58A 打印机", price: "¥200", summary: "前台小票打印设备。" },
  { name: "80C Pro 打印机", price: "¥360", summary: "80MM 商用打印设备。" },
  { name: "80D 打印机", price: "¥420", summary: "80MM 商用打印设备。" },
  { name: "LP2 标签打印机", price: "¥400", summary: "商品与餐饮标签打印。" },
  { name: "智能灯 KT10", price: "¥2180", summary: "智能灯语与门店提醒设备。" },
  { name: "DC2 点菜宝 + JZ2 基站", price: "¥369 + ¥429", summary: "点菜宝与配套基站。" },
  { name: "K1 后厨 KDS", price: "¥1800", summary: "后厨接单与出餐显示设备。" },
];

const GENERIC_HARDWARE: OfferItem[] = [
  { name: "单屏智能收银机", price: "¥1580", summary: "标准门店使用的单屏收银设备。" },
  { name: "双屏智能收银机", price: "¥1680", summary: "带顾客显示屏的双屏收银设备。" },
  { name: "称重收银一体机", price: "¥2860", summary: "适合生鲜、水果与称重业态。" },
  { name: "80MM 后厨打印机", price: "¥300", summary: "后厨订单与前台小票打印。" },
  { name: "58MM 前台打印机", price: "¥159", summary: "小型门店前台小票打印。" },
  { name: "标签打印机", price: "¥450", summary: "茶饮、烘焙与商品标签打印。" },
  { name: "二维扫码枪", price: "¥175", summary: "识别支付码与商品条码。" },
  { name: "扫码盒子", price: "¥89", summary: "桌面固定式免提扫码。" },
  { name: "钱箱", price: "¥120", summary: "配合收银机自动弹开。" },
  { name: "KDS 后厨屏", price: "¥1400", summary: "后厨接单、分单与出餐显示。" },
];

export const BUSINESS_CATALOG: BusinessCategory[] = [
  {
    id: "operations",
    name: "线上代运营",
    shortName: "线上代运营",
    summary: "公域内容与平台运营、私域会员运营及视频号团购。",
    groups: [
      {
        id: "public-domain",
        name: "公域运营",
        summary: "短视频、小红书、大众点评与美团等公域平台运营。",
        sections: [
          {
            id: "platform",
            name: "平台运营",
            items: [
              {
                name: "大众点评/美团基础运营",
                price: "¥3500/月/店",
                summary: "商户装修、套餐运营、点评维护与基础活动执行。",
                details: ["商户通装修", "套餐设计与推广", "点评维护与数据分析", "活动部署与执行"],
              },
              {
                name: "大众点评/美团深度运营",
                price: "¥5000/月/店",
                summary: "增加活动运营、经营报告与持续优化。",
                details: ["活动策划与投放", "点评与口碑运营", "菜品与业绩报告", "问题诊断与优化建议"],
              },
              {
                name: "公域账号矩阵策划",
                price: "¥11000/次",
                summary: "公众号、视频号、抖音、快手和小红书的矩阵策划。",
              },
            ],
          },
          {
            id: "short-video",
            name: "短视频",
            items: [
              {
                name: "主题人设短视频",
                price: "¥13800/10条",
                summary: "品牌定位、人设设定、选题结构、拍摄与内容 SOP。",
                details: ["品牌与人设定位", "系列选题规划", "内容结构与脚本", "模特与拍摄执行"],
              },
              {
                name: "AI 快剪 1000 条视频",
                price: "¥2980",
                summary: "适合本地生活多账号内容分发。",
              },
            ],
          },
          {
            id: "xiaohongshu",
            name: "小红书",
            items: [
              {
                name: "小红书图文运营",
                price: "¥2000/月",
                summary: "账号搭建、主页设计、关键词话题与图文发布。",
                details: ["账号简介与主页设计", "关键词与话题规划", "每月 12 篇图文编辑发布"],
              },
              {
                name: "小红书达人探店",
                price: "按数量报价",
                summary: "根据达人粉丝量、探店数量与拍摄要求确认。",
              },
            ],
          },
        ],
      },
      {
        id: "private-domain",
        name: "私域运营",
        summary: "通过 SaaS、小程序和企业微信沉淀会员并提升复购。",
        sections: [
          {
            id: "mini-program",
            name: "小程序私域",
            items: [
              {
                name: "SaaS + 小程序私域运营",
                price: "¥2800/月",
                summary: "会员体系、优惠券、自动化触达与数据复盘。",
                details: ["会员数据诊断", "会员等级与积分体系", "优惠券与自动化流程", "小程序内容运营", "数据看板与策略优化"],
              },
              {
                name: "季度运营服务",
                price: "¥7800/季度",
                summary: "SaaS 与小程序私域运营季度方案。",
              },
              {
                name: "零基础启动搭建",
                price: "¥4999/次",
                summary: "私域诊断、会员体系、小程序界面与营销流程搭建。",
              },
            ],
          },
          {
            id: "wechat",
            name: "企业微信私域",
            items: [
              {
                name: "SaaS + 小程序 + 企业微信运营",
                price: "¥3500/月",
                summary: "企业微信承接、社群运营、会员触达与复购管理。",
                details: ["企业微信账号搭建", "引流物料与到店沉淀", "社群内容与互动", "新客欢迎与复购活动", "运营 SOP 与员工培训"],
              },
              {
                name: "季度运营服务",
                price: "¥9800/季度",
                summary: "企业微信私域运营季度方案。",
              },
              {
                name: "私域启动搭建",
                price: "¥5999/次",
                summary: "数据诊断、企微搭建、引流物料与启动策略。",
              },
            ],
          },
        ],
      },
      {
        id: "wechat-video-groupbuy",
        name: "视频号团购",
        summary: "在视频号 ROI 链接中挂载商家团购小程序。",
        sections: [
          {
            id: "service",
            name: "挂载服务",
            items: [
              {
                name: "视频号团购小程序挂载",
                price: "¥999",
                summary: "视频号 ROI 链接挂载小程序，形成团购购买入口。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "digital",
    name: "门店数字化",
    shortName: "门店数字化",
    summary: "按品牌查看常选软件组合、独立功能模块和硬件设备。",
    groups: [
      {
        id: "meituan",
        name: "美团收银",
        summary: "餐饮收银、团购外卖、扫码点餐与美团生态协同。",
        sections: [
          {
            id: "bundles",
            name: "常选组合",
            items: [
              {
                name: "轻享版",
                price: "¥2398",
                summary: "基础收银、团购外卖、手机点餐、会员与营销功能。",
                details: ["基础收银", "团购外卖管理", "手机与二维码点餐", "会员储值与营销活动", "小程序点餐与外卖中心"],
              },
              {
                name: "智能版 LITE 新店方案",
                price: "¥3688",
                summary: "主收银、平台扫码点餐与美团外卖。",
                details: ["主收银", "平台小程序扫码点餐", "美团外卖对接"],
              },
              {
                name: "智能版标准新店方案",
                price: "¥4688/首年",
                summary: "标准餐饮新店主收银方案，可增加副收银。",
              },
              {
                name: "友商老店切换方案",
                price: "¥2988/首年",
                summary: "已有其他系统并计划切换至美团收银。",
              },
            ],
          },
          {
            id: "software",
            name: "软件模块",
            items: [
              { name: "主收银包", price: "¥3688/年", summary: "门店日常收银与经营管理。" },
              { name: "副收银", price: "¥988/年", summary: "增加一个副收银点位。" },
              { name: "平台赋能", price: "¥888/年", summary: "平台评价、买单销量与营销展示同步。" },
              { name: "饿了么外卖接单", price: "¥268/年", summary: "饿了么订单、出错与库存协同。" },
              { name: "京东外卖接单", price: "¥268/年", summary: "京东外卖订单与库存协同。" },
              { name: "高级会员", price: "¥1888/年", summary: "会员体系、全渠道拉新、会员营销与分析。" },
              { name: "旗舰会员", price: "¥2888/年", summary: "潜客营销、团购会员卡与多平台会员打通。" },
              { name: "门店进销存", price: "¥2088/年", summary: "采购、库存、联动结清与财务对账。" },
              { name: "门店精细化管理", price: "¥4888/年", summary: "库存损耗、精细核算与经营分析。" },
              { name: "商家小程序", price: "¥999/年", summary: "品牌展示、会员注册、预订与到店自提。" },
              { name: "点餐助手", price: "¥888/年", summary: "服务员手机点餐与加菜。" },
              { name: "智能预订", price: "¥4888/年", summary: "桌台预订、预付与到店管理。" },
              { name: "平板点餐", price: "¥1288/年", summary: "平板端点餐与桌台服务。" },
              { name: "美团点餐排队 A", price: "¥1288/年", summary: "大众点评、美团 App 排队与取号。" },
              { name: "数电发票", price: "¥988/年", summary: "数字化电子发票开具能力。" },
              { name: "后厨 KDS 智能版", price: "¥1088/年", summary: "后厨接单、分单与出餐管理。" },
              { name: "智能叫号智能版", price: "¥888/年", summary: "订单叫号、语音和取餐提醒。" },
              { name: "外卖中心（单店版）", price: "¥360/年", summary: "外卖评价回复与经营消息处理。" },
              { name: "自营外卖", price: "¥888/年", summary: "门店自有外卖平台与会员复购。" },
              { name: "企微营销", price: "¥598/年", summary: "企业微信引流、触达与私域转化。" },
              { name: "连锁总部账号", price: "¥5000/年", summary: "连锁品牌总部统一管理。" },
              { name: "连锁单店点位", price: "¥688/年", summary: "连锁体系单门店点位。" },
              { name: "数智督导", price: "¥1288/年", summary: "巡店、培训考试与督导管理。" },
              { name: "财务凭证助手", price: "¥1688/年", summary: "对账、凭证与财务系统衔接。" },
              { name: "行业洞察", price: "¥58888/年", summary: "行业经营数据与竞争洞察。" },
              { name: "经营洞察（单店版）", price: "¥2888/年", summary: "单店经营诊断与品类分析。" },
              { name: "商圈选址（单店版）", price: "¥388/店", summary: "商圈、门店与竞对经营分析。" },
            ],
          },
          {
            id: "hardware",
            name: "硬件设备",
            items: MEITUAN_HARDWARE,
          },
        ],
      },
      {
        id: "keruyun",
        name: "客如云",
        summary: "新店收银、平台小程序、私域会员与连锁扩展。",
        sections: [
          {
            id: "bundles",
            name: "常选组合",
            items: [
              {
                name: "快享版新店方案",
                price: "¥3200",
                summary: "主收银、平台小程序与基础会员。",
              },
              {
                name: "智享版新店方案",
                price: "¥3999",
                summary: "主收银为核心，可继续扩展小程序和会员。",
              },
              {
                name: "扫码点餐组合",
                price: "¥4200",
                summary: "主收银、扫码点餐与基础会员。",
              },
              {
                name: "私域会员组合",
                price: "¥4999",
                summary: "主收银、商家小程序与私域会员旗舰版。",
              },
            ],
          },
          {
            id: "software",
            name: "软件模块",
            items: [
              { name: "门店管理系统", price: "¥3200/年", summary: "收银点餐、团购核销、掌上管理、报表、促销与 AI 功能。" },
              { name: "会员营销基础版", price: "¥400/年", summary: "会员等级、会员价、积分与储值消费。" },
              { name: "会员营销旗舰版", price: "¥800/年", summary: "全渠道会员、会员活动、分析与潜客营销。" },
              { name: "平台点餐小程序", price: "¥399/年", summary: "到店扫码点餐小程序。" },
              { name: "商家小程序", price: "¥999/年", summary: "品牌展示、预约订餐、到店自提与会员引导。" },
              { name: "外卖平台对接", price: "¥349/年", summary: "饿了么、美团、京东等外卖平台接单。" },
              { name: "自营外卖", price: "¥800/年", summary: "自有流量入口、配送追踪与第三方配送。" },
              { name: "电子发票", price: "¥1199/年", summary: "结账时自动勾选并打印电子发票。" },
              { name: "后厨 KDS 2.0 软件", price: "¥1200/年", summary: "后厨接单与出餐管理。" },
              { name: "企业微信运营", price: "¥600/年", summary: "企微客服、社群活动与客户维护。" },
              { name: "平板点餐高级版", price: "¥899/年", summary: "平板端点餐服务。" },
              { name: "平板点餐旗舰版", price: "¥1699/年", summary: "完整平板点餐服务。" },
              { name: "单门店进销存", price: "¥800/年", summary: "单店采购、库存和销售管理。" },
              { name: "总部订货+进销存", price: "¥3000/年", summary: "总部订货和连锁库存管理。" },
              { name: "副收银点位", price: "¥900/年", summary: "大型门店副收银系统点位。" },
              { name: "连锁门店点位", price: "¥200/年", summary: "总部管控下的连锁单店点位。" },
              { name: "电子自助发票", price: "¥800/年", summary: "顾客自助开票与明细管理。" },
            ],
          },
          {
            id: "hardware",
            name: "硬件设备",
            items: KERUYUN_HARDWARE,
          },
        ],
      },
      {
        id: "yinbao",
        name: "银豹",
        summary: "基础收银买断，小程序、私域和连锁模块按需增加。",
        sections: [
          {
            id: "bundles",
            name: "常选组合",
            items: [
              {
                name: "基础收银",
                price: "¥1999/终身",
                summary: "基础收银、团购核销、门店 APP 与进销存。",
              },
            ],
          },
          {
            id: "software",
            name: "软件模块",
            items: [
              { name: "基础收银系统", price: "¥1299/终身", summary: "收银点餐、团购核销、手机收银、门店管理与进销存。" },
              { name: "会员营销", price: "包含", summary: "会员等级、储值、积分、活动与会员分析。" },
              { name: "小程序+扫码点餐", price: "¥999/年", summary: "堂食、自提、外卖与小程序装修。" },
              { name: "会员营销方法", price: "¥900起", summary: "结合门店场景配置会员营销活动。" },
              { name: "连锁仓库账号", price: "¥3999/终身", summary: "连锁仓库与库存管理。" },
              { name: "连锁总部账号", price: "¥1000/终身", summary: "连锁总部统一管理。" },
              { name: "区域管理账号", price: "¥500/年", summary: "区域门店管理账号。" },
              { name: "供应商直供", price: "¥1899/终身", summary: "供应商直供业务能力。" },
              { name: "高级供应链", price: "¥3599/年", summary: "进阶采购与供应链管理。" },
              { name: "大客户销售", price: "¥2999/年", summary: "大客户业务与销售管理。" },
              { name: "全电发票", price: "¥899/年", summary: "全面数字化电子发票。" },
              { name: "BI 大数据", price: "¥6000/年", summary: "经营数据分析与可视化。" },
            ],
          },
          {
            id: "hardware",
            name: "硬件设备",
            items: GENERIC_HARDWARE,
          },
        ],
      },
      {
        id: "cuanhuo",
        name: "爨火小程序",
        summary: "独立小程序、平台核销与打印设备方案。",
        sections: [
          {
            id: "bundles",
            name: "常选组合",
            items: [
              { name: "套餐 A", price: "¥1680", summary: "基础小程序、平台核销与配套服务。" },
              { name: "推荐套餐 B", price: "¥2280", summary: "小程序与打印设备组合。" },
              { name: "套餐 C", price: "¥2680", summary: "更完整的小程序与打印设备组合。" },
            ],
          },
          {
            id: "software",
            name: "软件模块",
            items: [
              { name: "增加门店", price: "¥300/个", summary: "增加一个小程序门店。" },
              { name: "售后服务", price: "¥100/年", summary: "年度售后维护服务。" },
              { name: "腾讯认证费（企业）", price: "¥300", summary: "企业主体腾讯认证。" },
              { name: "腾讯认证费（个体）", price: "¥30", summary: "个体工商户腾讯认证。" },
            ],
          },
          {
            id: "hardware",
            name: "硬件设备",
            items: [
              { name: "80MM 后厨打印机（防水防油）", price: "¥450", summary: "适合重油污后厨环境。" },
              { name: "80MM 后厨打印机", price: "¥300", summary: "标准后厨与前台打印。" },
              { name: "58MM 前台打印机", price: "¥159", summary: "小型门店前台小票打印。" },
              { name: "商米二维扫码枪", price: "¥175", summary: "识别支付码与商品条码。" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "design",
    name: "设计与内容",
    shortName: "设计与内容",
    summary: "小程序装修、视觉物料、商品图片与内容拍摄。",
    groups: [
      {
        id: "mini-program-design",
        name: "小程序设计装修",
        summary: "餐饮、零售与连锁品牌的小程序视觉设计。",
        sections: [
          {
            id: "services",
            name: "设计服务",
            items: [
              { name: "基础版装修", price: "¥1000", summary: "首页、点餐页、个人中心；约 5–7 天交付。" },
              { name: "高级版装修", price: "¥1999", summary: "全页面个性化设计与微动效；约 7–10 天交付。" },
              { name: "非标定制", price: "按需报价", summary: "特殊页面、交互或品牌视觉需求。" },
            ],
          },
        ],
      },
      {
        id: "visual-design",
        name: "视觉物料设计",
        summary: "线上活动与门店经营所需的视觉内容。",
        sections: [
          {
            id: "services",
            name: "设计服务",
            items: [
              { name: "活动海报设计", price: "按需报价", summary: "节日、店庆、会员日与促销活动海报。" },
              { name: "商品头图设计", price: "按需报价", summary: "小程序商品图、轮播图与套餐图。" },
              { name: "门店经营物料", price: "按需报价", summary: "桌贴、台卡、外卖卡与门店海报。" },
            ],
          },
        ],
      },
      {
        id: "content-production",
        name: "内容拍摄制作",
        summary: "菜品、门店与短视频内容制作。",
        sections: [
          {
            id: "services",
            name: "拍摄服务",
            items: [
              { name: "菜谱拍摄", price: "¥3500/8小时", summary: "指定时长内的菜品和门店内容拍摄。" },
              { name: "主题短视频拍摄", price: "¥13800/10条", summary: "定位、选题、脚本与拍摄制作。" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "partnerships",
    name: "异业合作",
    shortName: "异业合作",
    summary: "商铺宽带、网络布线、收银组网与监控部署。",
    groups: [
      {
        id: "unicom",
        name: "联通生态套餐",
        summary: "商铺宽带与收银硬件组合。",
        sections: [
          {
            id: "plans",
            name: "宽带套餐",
            items: [
              { name: "99 生态版", price: "¥74/月", summary: "赠二手收银机。" },
              { name: "129 生态版", price: "¥98/月", summary: "赠收银机与打印机。" },
              { name: "159 生态版", price: "¥119/月", summary: "赠全新收银机。" },
              { name: "199 生态版", price: "¥147/月", summary: "赠收银机与两台打印机。" },
            ],
          },
        ],
      },
      {
        id: "telecom",
        name: "电信套餐",
        summary: "宽带、通信与收银硬件组合。",
        sections: [
          {
            id: "plans",
            name: "宽带套餐",
            items: [
              { name: "300M 套餐", price: "¥99/月", summary: "赠二手收银机与手机。" },
              { name: "1000M 套餐", price: "¥139/月", summary: "赠全新收银机与手机。" },
              { name: "双宽带 A", price: "¥219/月", summary: "赠收银机与打印机。" },
              { name: "双宽带 B", price: "¥199/月", summary: "赠收银机、打印机与钱箱。" },
            ],
          },
        ],
      },
      {
        id: "network-services",
        name: "网络与监控服务",
        summary: "新店装修阶段的网络规划、组网与监控部署。",
        sections: [
          {
            id: "services",
            name: "配套服务",
            items: [
              { name: "商铺宽带办理", price: "按需报价", summary: "移动、联通、电信商铺宽带办理。" },
              { name: "门店网络布线", price: "按需报价", summary: "门店网线、路由与网络点位施工。" },
              { name: "装修前网络规划", price: "按需报价", summary: "装修阶段提前规划网络与设备点位。" },
              { name: "收银设备组网", price: "按需报价", summary: "收银机、打印机与局域网调试。" },
              { name: "监控网络部署", price: "按需报价", summary: "监控摄像头安装与网络配置。" },
            ],
          },
        ],
      },
    ],
  },
];
