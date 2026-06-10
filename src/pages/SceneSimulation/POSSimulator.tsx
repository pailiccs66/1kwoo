import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  Bell,
  Banknote,
  BarChart2,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ConciergeBell,
  CreditCard,
  FileText,
  Headphones,
  Lock,
  Minus,
  MonitorPlay,
  PlaySquare,
  Plus,
  Printer,
  ScanLine,
  Settings,
  ShoppingCart,
  User,
  Utensils,
  WalletCards,
  Wifi,
} from 'lucide-react';

type Brand = 'meituan' | 'keruyun' | 'yinbao' | 'kds';
type ViewMode = 'home' | 'pos' | 'board';

export type Mode =
  | 'meituan_home'
  | 'meituan_pos'
  | 'keruyun_home'
  | 'keruyun_pos'
  | 'yinbao_home'
  | 'yinbao_pos'
  | 'kds_home'
  | 'kds_board';

interface POSSimulatorProps {
  initialMode: Mode;
  onClose: () => void;
}

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: '热菜' | '冷菜' | '套餐' | '水';
};

type CartItem = {
  cartId: string;
  item: MenuItem | { id: number; name: string; price: number; category: string };
  quantity: number;
  specs: string[];
};

type KdsStatus = 'waiting' | 'cooking' | 'urgent' | 'done';

type KdsItem = {
  id: string;
  name: string;
  quantity: number;
  station: '热厨' | '冷菜' | '主食';
  status: 'waiting' | 'done';
  targetMinutes: number;
  components?: string[];
};

type KdsOrder = {
  id: string;
  source: '扫码点餐' | '收银台' | '外卖';
  table: string;
  minutes: number;
  station: '热厨' | '冷菜' | '主食';
  items: KdsItem[];
  remark?: string;
  status: KdsStatus;
};

const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: '捞汁秋葵', price: 32, category: '冷菜' },
  { id: 2, name: '酱肘子', price: 77, category: '热菜' },
  { id: 3, name: '拍黄瓜', price: 15, category: '冷菜' },
  { id: 4, name: '盐八凤爪(标准)', price: 28, category: '冷菜' },
  { id: 5, name: '东北大拉皮(标准)', price: 20, category: '冷菜' },
  { id: 6, name: '牛肉面', price: 18, category: '热菜' },
  { id: 7, name: '蜜汁花套餐', price: 48, category: '套餐' },
  { id: 8, name: '洞庭酱板鸭', price: 25, category: '热菜' },
  { id: 9, name: '红烧肉', price: 68, category: '热菜' },
  { id: 10, name: '清炒时蔬', price: 22, category: '热菜' },
  { id: 11, name: '农夫山泉', price: 2, category: '水' },
  { id: 12, name: '可口可乐', price: 3, category: '水' },
];

const SPEC_OPTIONS = ['标准', '加辣', '免葱'] as const;

const getBrandFromMode = (mode: Mode): Brand => {
  if (mode.startsWith('kds')) return 'kds';
  if (mode.startsWith('keruyun')) return 'keruyun';
  if (mode.startsWith('yinbao')) return 'yinbao';
  return 'meituan';
};

const getViewModeFromMode = (mode: Mode): ViewMode => {
  if (mode.endsWith('_board')) return 'board';
  return mode.endsWith('_pos') ? 'pos' : 'home';
};

const formatClock = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const week = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${month}月${day}日 星期${week} ${hours}:${minutes}:${seconds}`;
};

const initialMeituanCart = (): CartItem[] => [
  {
    cartId: 'meituan-default-1',
    item: { id: 1001, name: '捞汁秋葵', price: 32, category: '冷菜' },
    quantity: 1,
    specs: [],
  },
  {
    cartId: 'meituan-default-2',
    item: { id: 1002, name: '酱肘花', price: 77, category: '热菜' },
    quantity: 1,
    specs: [],
  },
  {
    cartId: 'meituan-default-3',
    item: { id: 1003, name: '拍黄瓜', price: 15, category: '冷菜' },
    quantity: 2,
    specs: [],
  },
  {
    cartId: 'meituan-default-4',
    item: { id: 1004, name: '盐八凤爪(标准)', price: 28, category: '冷菜' },
    quantity: 1,
    specs: ['标准'],
  },
  {
    cartId: 'meituan-default-5',
    item: { id: 1005, name: '东北大拉皮(标准)', price: 20, category: '冷菜' },
    quantity: 1,
    specs: ['标准'],
  },
];
const initialYinbaoCart = (): CartItem[] => [];

const initialKdsOrders = (): KdsOrder[] => [
  {
    id: 'A102',
    source: '扫码点餐',
    table: 'A2',
    minutes: 2,
    station: '热厨',
    items: [
      { id: 'A102-1', name: '招牌烤肉双拼', quantity: 1, station: '热厨', status: 'waiting', targetMinutes: 12, components: ['烤牛肉', '掌中宝', '时蔬'] },
      { id: 'A102-2', name: '牛肉炒饭', quantity: 1, station: '主食', status: 'waiting', targetMinutes: 8 },
      { id: 'A102-3', name: '清炒时蔬', quantity: 1, station: '热厨', status: 'waiting', targetMinutes: 6 },
    ],
    remark: '少辣',
    status: 'waiting',
  },
  {
    id: 'B087',
    source: '收银台',
    table: 'B1',
    minutes: 7,
    station: '冷菜',
    items: [
      { id: 'B087-1', name: '拍黄瓜', quantity: 2, station: '冷菜', status: 'waiting', targetMinutes: 5 },
      { id: 'B087-2', name: '捞汁秋葵', quantity: 1, station: '冷菜', status: 'waiting', targetMinutes: 5 },
      { id: 'B087-3', name: '米饭', quantity: 2, station: '主食', status: 'waiting', targetMinutes: 4 },
      { id: 'B087-4', name: '凉拌木耳', quantity: 1, station: '冷菜', status: 'waiting', targetMinutes: 5 },
    ],
    status: 'cooking',
  },
  {
    id: 'A118',
    source: '扫码点餐',
    table: 'A4',
    minutes: 5,
    station: '热厨',
    items: [
      { id: 'A118-1', name: '招牌烤肉双拼', quantity: 2, station: '热厨', status: 'waiting', targetMinutes: 12, components: ['烤牛肉', '掌中宝', '时蔬'] },
      { id: 'A118-2', name: '香辣鸡翅', quantity: 1, station: '热厨', status: 'waiting', targetMinutes: 10 },
      { id: 'A118-3', name: '米饭', quantity: 2, station: '主食', status: 'waiting', targetMinutes: 4 },
      { id: 'A118-4', name: '酱肘子', quantity: 1, station: '热厨', status: 'waiting', targetMinutes: 10 },
    ],
    remark: '同品可合并',
    status: 'waiting',
  },
  {
    id: 'W316',
    source: '外卖',
    table: '取餐柜',
    minutes: 12,
    station: '热厨',
    items: [
      { id: 'W316-1', name: '酱肘子', quantity: 1, station: '热厨', status: 'waiting', targetMinutes: 10 },
      { id: 'W316-2', name: '红烧肉', quantity: 1, station: '热厨', status: 'waiting', targetMinutes: 12 },
      { id: 'W316-3', name: '米饭', quantity: 2, station: '主食', status: 'waiting', targetMinutes: 4 },
    ],
    remark: '平台催单',
    status: 'urgent',
  },
  {
    id: 'D044',
    source: '扫码点餐',
    table: 'C3',
    minutes: 4,
    station: '冷菜',
    items: [
      { id: 'D044-1', name: '拍黄瓜', quantity: 1, station: '冷菜', status: 'waiting', targetMinutes: 5 },
      { id: 'D044-2', name: '凉拌木耳', quantity: 1, station: '冷菜', status: 'waiting', targetMinutes: 5 },
      { id: 'D044-3', name: '牛肉炒饭', quantity: 1, station: '主食', status: 'waiting', targetMinutes: 8 },
    ],
    status: 'waiting',
  },
];

export const POSSimulator: React.FC<POSSimulatorProps> = ({ initialMode, onClose }) => {
  const [currentBrand, setCurrentBrand] = useState<Brand>(getBrandFromMode(initialMode));
  const [viewMode, setViewMode] = useState<ViewMode>(getViewModeFromMode(initialMode));
  const [time, setTime] = useState(new Date());

  const [meituanCategory, setMeituanCategory] = useState<'全部' | '热菜' | '水' | '冷菜' | '套餐'>('全部');
  const [meituanCart, setMeituanCart] = useState<CartItem[]>(initialMeituanCart);
  const [meituanSelectedId, setMeituanSelectedId] = useState<string | null>(null);
  const [meituanDiscount, setMeituanDiscount] = useState(0);

  const [yinbaoCart, setYinbaoCart] = useState<CartItem[]>(initialYinbaoCart);
  const [yinbaoSelectedId, setYinbaoSelectedId] = useState<string | null>(null);
  const [kdsOrders, setKdsOrders] = useState<KdsOrder[]>(initialKdsOrders);
  const [kdsStation, setKdsStation] = useState<'全部' | KdsOrder['station']>('全部');
  const [kdsTimeOffset, setKdsTimeOffset] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [paymentAmount, setPaymentAmount] = useState(0);

  const [specModalOpen, setSpecModalOpen] = useState(false);
  const [toast, setToast] = useState('');
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setCurrentBrand(getBrandFromMode(initialMode));
    setViewMode(getViewModeFromMode(initialMode));
  }, [initialMode]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(window.clearTimeout);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    const timer = window.setTimeout(() => setToast(''), 1800);
    timersRef.current.push(timer);
  };

  const clearBrandState = (brand: Brand) => {
    if (brand === 'meituan') {
      setMeituanCart(initialMeituanCart());
      setMeituanSelectedId(null);
      setMeituanDiscount(0);
      setMeituanCategory('全部');
    }
    if (brand === 'yinbao') {
      setYinbaoCart(initialYinbaoCart());
      setYinbaoSelectedId(null);
    }
    if (brand === 'kds') {
      setKdsOrders(initialKdsOrders());
      setKdsStation('全部');
      setKdsTimeOffset(0);
    }
  };

  const runPaymentFlow = (brand: Brand, amount: number) => {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];

    setPaymentAmount(amount);
    setPaymentStatus('loading');

    const toSuccess = window.setTimeout(() => {
      setPaymentStatus('success');
    }, 1000);

    const toReset = window.setTimeout(() => {
      clearBrandState(brand);
      setCurrentBrand(brand);
      setViewMode('home');
      setPaymentStatus('idle');
      setPaymentAmount(0);
    }, 3000);

    timersRef.current.push(toSuccess, toReset);
  };

  const addMeituanItem = (item: MenuItem) => {
    setMeituanCart((prev) => {
      const hit = prev.find((entry) => entry.item.id === item.id && entry.specs.length === 0);
      if (hit) {
        return prev.map((entry) =>
          entry.cartId === hit.cartId ? { ...entry, quantity: entry.quantity + 1 } : entry,
        );
      }

      const cartId = `meituan-${Date.now()}-${Math.random()}`;
      setMeituanSelectedId(cartId);
      return [...prev, { cartId, item, quantity: 1, specs: [] }];
    });
  };

  const updateMeituanQuantity = (cartId: string, delta: number) => {
    setMeituanCart((prev) => {
      const next = prev
        .map((entry) => {
          if (entry.cartId !== cartId) return entry;
          const nextQuantity = entry.quantity + delta;
          if (nextQuantity <= 0) return null;
          return { ...entry, quantity: nextQuantity };
        })
        .filter(Boolean) as CartItem[];

      if (!next.some((entry) => entry.cartId === meituanSelectedId)) {
        setMeituanSelectedId(null);
      }

      return next;
    });
  };

  const addMeituanPackaging = () => {
    setMeituanCart((prev) => {
      const hit = prev.find((entry) => entry.item.id === 999);
      if (hit) {
        return prev.map((entry) =>
          entry.item.id === 999 ? { ...entry, quantity: entry.quantity + 1 } : entry,
        );
      }
      return [
        ...prev,
        {
          cartId: `meituan-package-${Date.now()}`,
          item: { id: 999, name: '打包费', price: 2, category: '其他' },
          quantity: 1,
          specs: [],
        },
      ];
    });
  };

  const deleteSelectedMeituan = () => {
    if (!meituanSelectedId) {
      showToast('请先选择购物车内的菜品');
      return;
    }
    setMeituanCart((prev) => prev.filter((entry) => entry.cartId !== meituanSelectedId));
    setMeituanSelectedId(null);
  };

  const addMeituanSpec = (spec: string) => {
    if (!meituanSelectedId) {
      showToast('请先选择购物车内的菜品');
      return;
    }

    setMeituanCart((prev) =>
      prev.map((entry) =>
        entry.cartId === meituanSelectedId && !entry.specs.includes(spec)
          ? { ...entry, specs: [...entry.specs, spec] }
          : entry,
      ),
    );
    setSpecModalOpen(false);
  };

  const meituanTotalPrice = meituanCart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const meituanPayable = Math.max(0, meituanTotalPrice - meituanDiscount);
  const meituanTotalItems = meituanCart.length;

  const meituanCheckout = () => {
    if (meituanCart.length === 0) {
      showToast('请先选择菜品');
      return;
    }
    runPaymentFlow('meituan', meituanPayable);
  };

  const addYinbaoItem = (item: MenuItem) => {
    setYinbaoCart((prev) => {
      const hit = prev.find((entry) => entry.item.id === item.id);
      if (hit) {
        return prev.map((entry) =>
          entry.cartId === hit.cartId ? { ...entry, quantity: entry.quantity + 1 } : entry,
        );
      }

      const cartId = `yinbao-${Date.now()}-${Math.random()}`;
      setYinbaoSelectedId(cartId);
      return [...prev, { cartId, item, quantity: 1, specs: [] }];
    });
  };

  const updateYinbaoQuantity = (cartId: string, delta: number) => {
    setYinbaoCart((prev) => {
      const next = prev
        .map((entry) => {
          if (entry.cartId !== cartId) return entry;
          const nextQuantity = entry.quantity + delta;
          if (nextQuantity <= 0) return null;
          return { ...entry, quantity: nextQuantity };
        })
        .filter(Boolean) as CartItem[];

      if (!next.some((entry) => entry.cartId === yinbaoSelectedId)) {
        setYinbaoSelectedId(null);
      }

      return next;
    });
  };

  const deleteSelectedYinbao = () => {
    if (!yinbaoSelectedId) {
      showToast('请先选择购物车内的菜品');
      return;
    }
    setYinbaoCart((prev) => prev.filter((entry) => entry.cartId !== yinbaoSelectedId));
    setYinbaoSelectedId(null);
  };

  const yinbaoTotalPrice = yinbaoCart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const yinbaoTotalItems = yinbaoCart.reduce((sum, entry) => sum + entry.quantity, 0);

  const yinbaoCheckout = () => {
    if (yinbaoCart.length === 0) {
      showToast('请先选择菜品');
      return;
    }
    runPaymentFlow('yinbao', yinbaoTotalPrice);
  };

  const keruyunCheckout = () => {
    runPaymentFlow('keruyun', 84);
  };

  const updateKdsStatus = (id: string, status: KdsStatus) => {
    setKdsOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) return order;
        if (status === 'done') {
          return {
            ...order,
            status,
            items: order.items.map((item) => ({ ...item, status: 'done' as const })),
          };
        }
        return { ...order, status };
      }),
    );
  };

  const completeKdsItem = (orderId: string, itemId: string) => {
    setKdsOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const nextItems = order.items.map((item) => (item.id === itemId ? { ...item, status: 'done' as const } : item));
        const allDone = nextItems.every((item) => item.status === 'done');
        return { ...order, items: nextItems, status: allDone ? 'done' : order.status === 'waiting' ? 'cooking' : order.status };
      }),
    );
  };

  const addKdsRushOrder = () => {
    const nextId = `N${Math.floor(100 + Math.random() * 800)}`;
    setKdsOrders((prev) => [
      {
        id: nextId,
        source: '扫码点餐',
        table: `A${Math.floor(1 + Math.random() * 4)}`,
        minutes: 0,
        station: '热厨',
        items: [
          { id: `${nextId}-1`, name: '香辣鸡翅', quantity: 1, station: '热厨', status: 'waiting', targetMinutes: 10 },
          { id: `${nextId}-2`, name: '米饭', quantity: 2, station: '主食', status: 'waiting', targetMinutes: 4 },
        ],
        remark: '刚进单',
        status: 'waiting',
      },
      ...prev,
    ]);
    showToast(`新订单 ${nextId} 已进入后厨屏`);
  };

  const getKdsOrderStatus = (order: KdsOrder): KdsStatus => {
    if (order.items.every((item) => item.status === 'done')) return 'done';
    return order.status;
  };

  const getKdsItemTiming = (order: KdsOrder, item: KdsItem) => {
    const elapsed = order.minutes + kdsTimeOffset;
    const remaining = item.targetMinutes - elapsed;
    const level = item.status === 'done' ? 'done' : remaining <= 0 ? 'overdue' : remaining <= 3 ? 'warning' : 'normal';
    return { elapsed, remaining, level };
  };

  const completeKdsBatch = (station: KdsItem['station'], name: string) => {
    let affectedOrders = 0;
    setKdsOrders((prev) =>
      prev.map((order) => {
        const hasTarget = order.items.some((item) => item.station === station && item.name === name && item.status !== 'done');
        if (!hasTarget) return order;
        affectedOrders += 1;
        const nextItems = order.items.map((item) =>
          item.station === station && item.name === name ? { ...item, status: 'done' as const } : item,
        );
        return {
          ...order,
          items: nextItems,
          status: nextItems.every((item) => item.status === 'done') ? 'done' : order.status === 'waiting' ? 'cooking' : order.status,
        };
      }),
    );
    showToast(`${name} 已合并完成，覆盖 ${affectedOrders} 个订单`);
  };

  const visibleKdsOrders = kdsOrders.filter((order) =>
    kdsStation === '全部' || order.items.some((item) => item.station === kdsStation),
  );
  const kdsWaitingCount = kdsOrders.filter((order) => getKdsOrderStatus(order) === 'waiting').length;
  const kdsCookingCount = kdsOrders.filter((order) => getKdsOrderStatus(order) === 'cooking').length;
  const kdsUrgentCount = kdsOrders.filter((order) => getKdsOrderStatus(order) === 'urgent').length;
  const kdsDoneCount = kdsOrders.filter((order) => getKdsOrderStatus(order) === 'done').length;
  const kdsTotalItems = kdsOrders.reduce((sum, order) => sum + order.items.length, 0);
  const kdsDoneItems = kdsOrders.reduce((sum, order) => sum + order.items.filter((item) => item.status === 'done').length, 0);
  const kdsWarningItems = kdsOrders.reduce(
    (sum, order) => sum + order.items.filter((item) => getKdsItemTiming(order, item).level === 'warning').length,
    0,
  );
  const kdsOverdueItems = kdsOrders.reduce(
    (sum, order) => sum + order.items.filter((item) => getKdsItemTiming(order, item).level === 'overdue').length,
    0,
  );
  const kdsPriorityItems = kdsOrders
    .flatMap((order) =>
      order.items
        .filter((item) => item.status !== 'done' && (kdsStation === '全部' || item.station === kdsStation))
        .map((item) => ({ order, item, timing: getKdsItemTiming(order, item) })),
    )
    .filter((entry) => entry.timing.level === 'warning' || entry.timing.level === 'overdue')
    .sort((a, b) => a.timing.remaining - b.timing.remaining)
    .slice(0, 4);
  const kdsMergedBatches = Object.values(
    kdsOrders.reduce((groups, order) => {
      order.items.forEach((item) => {
        if (item.status === 'done') return;
        if (kdsStation !== '全部' && item.station !== kdsStation) return;
        const key = `${item.station}-${item.name}`;
        if (!groups[key]) {
          groups[key] = { key, station: item.station, name: item.name, quantity: 0, refs: [] as string[] };
        }
        groups[key].quantity += item.quantity;
        groups[key].refs.push(`${order.table}#${order.id}`);
      });
      return groups;
    }, {} as Record<string, { key: string; station: KdsItem['station']; name: string; quantity: number; refs: string[] }>),
  ).sort((a, b) => b.refs.length - a.refs.length || b.quantity - a.quantity);

  const meituanQty = (itemId: number) =>
    meituanCart.filter((entry) => entry.item.id === itemId).reduce((sum, entry) => sum + entry.quantity, 0);

  const yinbaoQty = (itemId: number) =>
    yinbaoCart.filter((entry) => entry.item.id === itemId).reduce((sum, entry) => sum + entry.quantity, 0);

  const renderKdsHome = () => (
    <div className="w-full h-full overflow-hidden flex flex-col bg-[#111827] text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(16,185,129,0.22),transparent_30%),radial-gradient(circle_at_88%_22%,rgba(245,158,11,0.18),transparent_26%)]" />
      <div className="relative h-14 shrink-0 px-6 flex items-center justify-between border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-400/15 flex items-center justify-center">
            <ClipboardCheck size={20} className="text-emerald-300" />
          </div>
          <div>
            <div className="text-lg font-semibold">KDS后厨屏演示</div>
            <div className="text-xs text-white/45">订单入口统一进入后厨任务板</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/65">
          <span>{formatClock(time)}</span>
          <button onClick={onClose} className="rounded bg-white/10 border border-white/15 px-4 py-1.5 text-xs text-white/90 hover:bg-white/20">
            退出演示
          </button>
        </div>
      </div>

      <div className="relative flex-1 p-8 flex flex-col gap-6 overflow-hidden">
        <div className="grid grid-cols-4 gap-4 shrink-0">
          {[
            ['待接单', kdsWaitingCount, 'bg-amber-400/15 text-amber-200 border-amber-300/20'],
            ['制作中', kdsCookingCount, 'bg-sky-400/15 text-sky-200 border-sky-300/20'],
            ['催单', kdsUrgentCount, 'bg-red-400/15 text-red-200 border-red-300/20'],
            ['已出餐', kdsDoneCount, 'bg-emerald-400/15 text-emerald-200 border-emerald-300/20'],
          ].map(([label, value, className]) => (
            <div key={String(label)} className={`rounded-2xl border p-5 ${className as string}`}>
              <div className="text-sm opacity-75">{label as string}</div>
              <div className="mt-2 text-4xl font-bold">{value as number}</div>
            </div>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-[1.15fr_0.85fr] gap-6 overflow-hidden">
          <button
            onClick={() => setViewMode('board')}
            className="group rounded-[28px] border border-white/10 bg-white/[0.06] p-8 text-left shadow-2xl transition-all hover:bg-white/[0.09]"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/15">
                  <MonitorPlay size={34} className="text-emerald-300" />
                </div>
                <div className="text-[42px] font-serif leading-tight">进入后厨任务板</div>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/58">
                  模拟门店高峰：多入口订单进入后厨，按档口拆分，按菜品完成，并对临近超时的菜品做优先提醒。
                </p>
              </div>
              <div className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-300">
                Start board
              </div>
            </div>
          </button>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-white/35">Order Sources</div>
              <div className="mt-5 space-y-3">
                {['扫码点餐', '收银台补单', '外卖平台', '小程序套餐'].map((source) => (
                  <div key={source} className="flex items-center justify-between rounded-2xl bg-white/[0.06] px-4 py-3">
                    <span className="text-white/80">{source}</span>
                    <span className="rounded-full bg-emerald-400/12 px-3 py-1 text-xs text-emerald-200">进入KDS</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-sm uppercase tracking-[0.2em] text-white/35">Full KDS Stack</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {['多入口同步', '档口路由', '单品完成', '合并制作', '传菜核对', '计时预警', '沽清同步', '打印兜底'].map((item) => (
                  <div key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs font-medium text-white/62">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-relaxed text-amber-100/85">
              重点看三件事：订单有没有进对档口，菜品有没有按时完成，完成后能不能回到桌号和订单。
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderKdsBoard = () => {
    const statusMeta: Record<KdsStatus, { label: string; className: string }> = {
      waiting: { label: '待接单', className: 'border-amber-200 bg-amber-50 text-amber-700' },
      cooking: { label: '制作中', className: 'border-sky-200 bg-sky-50 text-sky-700' },
      urgent: { label: '催单', className: 'border-red-200 bg-red-50 text-red-700' },
      done: { label: '已出餐', className: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
    };

    return (
      <div className="w-full h-full overflow-hidden flex flex-col bg-[#F4F6F8] text-[#1F2329]">
        <div className="h-14 shrink-0 bg-[#101827] px-4 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setViewMode('home')} className="rounded bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20">
              <ChevronLeft size={16} className="inline-block align-[-3px]" /> 返回
            </button>
            <div>
              <div className="text-lg font-semibold">后厨任务板</div>
              <div className="text-xs text-white/45">演示门店 · 高峰出餐流程</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <span>{formatClock(time)}</span>
            <button onClick={addKdsRushOrder} className="rounded bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-400">
              模拟新单
            </button>
            <button onClick={onClose} className="rounded bg-white/10 border border-white/20 px-4 py-1.5 text-xs text-white/90 hover:bg-white/20">
              退出演示
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-[132px] md:w-[150px] shrink-0 border-r border-[#DCE2EA] bg-white p-4 flex flex-col">
            <div className="text-sm font-semibold text-gray-500">档口筛选</div>
            <div className="mt-4 space-y-2">
              {(['全部', '热厨', '冷菜', '主食'] as const).map((station) => (
                <button
                  key={station}
                  onClick={() => setKdsStation(station)}
                  className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    kdsStation === station ? 'bg-[#101827] text-white' : 'bg-[#F3F5F7] text-gray-600 hover:bg-[#E8EDF3]'
                  }`}
                >
                  {station}
                </button>
              ))}
            </div>
            <div className="mt-auto rounded-2xl bg-[#F3F5F7] p-4">
              <div className="text-xs text-gray-500">当前压力</div>
              <div className="mt-2 text-3xl font-bold text-[#101827]">{kdsWaitingCount + kdsCookingCount + kdsUrgentCount}</div>
              <div className="mt-1 text-xs text-gray-500">未完成任务</div>
            </div>
          </div>

          <div className="min-w-0 flex-1 overflow-y-auto hide-scrollbar p-5">
            <div className="mb-4 rounded-2xl border border-[#DCE2EA] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-gray-900">时间推进</div>
                  <div className="mt-1 text-xs text-gray-500">用于观察快超时、已超时和优先制作提醒</div>
                </div>
                <div className="rounded-full bg-[#101827] px-3 py-1 text-xs font-semibold text-white">
                  +{kdsTimeOffset} 分钟
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[0, 5, 10, 15, 20].map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => setKdsTimeOffset(minutes)}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                      kdsTimeOffset === minutes ? 'bg-[#101827] text-white' : 'bg-[#F3F5F7] text-gray-600 hover:bg-[#E8EDF3]'
                    }`}
                  >
                    +{minutes}分
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 rounded-2xl border border-[#DCE2EA] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-gray-900">合并制作台</div>
                  <div className="mt-1 text-xs text-gray-500">只合并同品同档口，其他单独菜品继续留在订单里</div>
                </div>
                <div className="rounded-full bg-[#F3F5F7] px-3 py-1 text-xs font-medium text-gray-500">
                  已完成 {kdsDoneItems}/{kdsTotalItems} 个菜品
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                {kdsMergedBatches.length === 0 ? (
                  <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">当前档口菜品已全部完成</div>
                ) : (
                  kdsMergedBatches.map((batch) => (
                    <button
                      key={batch.key}
                      onClick={() => completeKdsBatch(batch.station, batch.name)}
                      className="min-w-[220px] rounded-xl border border-[#DCE2EA] bg-[#F8FAFC] p-3 text-left hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-gray-500">{batch.station}</span>
                        <span className="text-xs font-semibold text-emerald-600">合并完成</span>
                      </div>
                      <div className="mt-2 text-base font-bold text-gray-900">{batch.name} x{batch.quantity}</div>
                      <div className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500">
                        关联：{batch.refs.join(' / ')}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-amber-900">菜品超时预警</div>
                  <div className="mt-1 text-xs text-amber-700/70">黄色快超时，红色已超时，优先从这里处理</div>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700">
                  快超时 {kdsWarningItems} · 已超时 {kdsOverdueItems}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
                {kdsPriorityItems.length === 0 ? (
                  <div className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-emerald-700">当前没有超时预警</div>
                ) : (
                  kdsPriorityItems.map(({ order, item, timing }) => (
                    <button
                      key={`${order.id}-${item.id}`}
                      onClick={() => completeKdsItem(order.id, item.id)}
                      className={`rounded-xl border px-3 py-3 text-left ${
                        timing.level === 'overdue' ? 'border-red-200 bg-red-50 text-red-800' : 'border-amber-200 bg-white text-amber-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold">{timing.level === 'overdue' ? '已超时' : '快超时'}</span>
                        <span className="text-xs">{order.table} #{order.id}</span>
                      </div>
                      <div className="mt-1 text-sm font-bold">{item.name} x{item.quantity}</div>
                      <div className="mt-1 text-xs opacity-70">
                        已等 {timing.elapsed} 分钟 · 标准 {item.targetMinutes} 分钟
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 pb-8">
              {visibleKdsOrders.map((order) => {
                const displayStatus = getKdsOrderStatus(order);
                const visibleItems = order.items.filter((item) => kdsStation === '全部' || item.station === kdsStation);
                return (
                <div key={order.id} className={`rounded-2xl border bg-white p-4 shadow-sm ${displayStatus === 'done' ? 'opacity-65' : ''}`}>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-gray-400">订单 #{order.id}</div>
                      <div className="mt-1 break-words text-xl font-bold text-gray-900">{order.table}</div>
                    </div>
                    <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusMeta[displayStatus].className}`}>
                      {statusMeta[displayStatus].label}
                    </div>
                  </div>

                  <div className="mb-3 flex items-center justify-between rounded-xl bg-[#F5F7FA] px-3 py-2 text-sm">
                    <span className="text-gray-500">{order.source}</span>
                    <span className={order.minutes >= 10 ? 'font-bold text-red-500' : 'font-semibold text-gray-700'}>
                      {order.minutes} 分钟
                    </span>
                  </div>

                  <div className="space-y-2">
                    {visibleItems.map((item) => {
                      const timing = getKdsItemTiming(order, item);
                      const itemClass =
                        timing.level === 'done'
                          ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                          : timing.level === 'overdue'
                            ? 'border-red-200 bg-red-50 text-red-800 hover:bg-red-100'
                            : timing.level === 'warning'
                              ? 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100'
                              : 'border-gray-100 bg-white text-gray-800 hover:border-emerald-200 hover:bg-emerald-50';
                      return (
                        <button
                          key={item.id}
                          onClick={() => completeKdsItem(order.id, item.id)}
                          disabled={item.status === 'done'}
                          className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-medium transition-colors ${itemClass}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span>{item.name} x{item.quantity}</span>
                            <span className="shrink-0 rounded-full bg-white/70 px-2 py-0.5 text-[10px] text-gray-500">{item.station}</span>
                          </div>
                          {item.components && (
                            <div className="mt-1 rounded-lg bg-white/55 px-2 py-1 text-[11px] leading-relaxed opacity-80">
                              套餐内容：{item.components.join(' / ')}
                            </div>
                          )}
                          <div className={`mt-1 text-xs ${item.status === 'done' ? 'text-emerald-600' : 'opacity-70'}`}>
                            {item.status === 'done'
                              ? `已完成 · 属于 ${order.table} #${order.id}`
                              : timing.level === 'overdue'
                                ? `已超时 ${Math.abs(timing.remaining)} 分钟 · 优先做`
                                : timing.level === 'warning'
                                  ? `快超时 · 剩 ${timing.remaining} 分钟`
                                  : `点击快速完成单品 · 标准 ${item.targetMinutes} 分钟`}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {order.remark && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
                      <AlertTriangle size={14} />
                      {order.remark}
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <button onClick={() => updateKdsStatus(order.id, 'cooking')} className="rounded-lg bg-sky-50 py-2 text-xs font-semibold text-sky-700 hover:bg-sky-100">
                      开始做
                    </button>
                    <button onClick={() => updateKdsStatus(order.id, 'urgent')} className="rounded-lg bg-red-50 py-2 text-xs font-semibold text-red-700 hover:bg-red-100">
                      标催单
                    </button>
                    <button onClick={() => updateKdsStatus(order.id, 'done')} className="rounded-lg bg-emerald-50 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">
                      出餐
                    </button>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          <div className="hidden w-[230px] shrink-0 border-l border-[#DCE2EA] bg-white p-5 md:flex flex-col gap-4">
            <div>
              <div className="text-sm font-semibold text-gray-500">经营信号</div>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-red-50 p-4">
                  <div className="text-xs text-red-500">催单风险</div>
                  <div className="mt-1 text-2xl font-bold text-red-600">{kdsUrgentCount}</div>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <div className="text-xs text-emerald-600">已完成出餐</div>
                  <div className="mt-1 text-2xl font-bold text-emerald-700">{kdsDoneCount}</div>
                </div>
                <div className="rounded-2xl bg-sky-50 p-4">
                  <div className="text-xs text-sky-600">单品完成度</div>
                  <div className="mt-1 text-2xl font-bold text-sky-700">{kdsDoneItems}/{kdsTotalItems}</div>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4">
                  <div className="text-xs text-amber-600">超时菜品</div>
                  <div className="mt-1 text-2xl font-bold text-amber-700">{kdsWarningItems + kdsOverdueItems}</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-[#DCE2EA] bg-[#F8FAFC] p-4 text-sm leading-relaxed text-gray-600">
              当前已补齐：单品完成、同品合并、套餐明细、超时预警、优先制作、完成回溯。
            </div>
            <div className="rounded-2xl border border-[#DCE2EA] bg-[#F8FAFC] p-4 text-sm leading-relaxed text-gray-600">
              后续可加：传菜核对、退菜/改菜、沽清拦截、打印兜底、历史出餐报表。
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderKeruyunHome = () => (
    <div className="w-full h-full overflow-hidden flex flex-col bg-[#11131A] text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(32,64,122,0.28),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(19,32,69,0.32),transparent_30%)]" />
      <div className="h-8 shrink-0 bg-white text-[#1F2329] flex items-center justify-between px-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-[#4A90E2]" />
          <span className="font-medium">客如云收银</span>
        </div>
        <span>_ □ ×</span>
      </div>
      
      {/* Top Bar & Store Info */}
      <div className="relative shrink-0 px-8 pt-5 pb-2 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-[#E5F0FF] flex items-center justify-center">
            <User size={32} className="text-[#3E7DFF]" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold tracking-wide">演示用门店</div>
              <span className="rounded bg-white/10 border border-white/20 px-2 py-0.5 text-xs text-white/70">主收银 POS</span>
            </div>
            <div className="mt-1.5 text-xs text-white/50">商户编号: 870611719 | 切换点餐模式 &gt;</div>
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm text-white/80">
          <span>营业日4月20日</span>
          <Lock size={16} />
          <div className="relative">
            <Bell size={16} />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
          </div>
          <ConciergeBell size={16} />
          <span className="text-lg font-medium text-white">02:22</span>
          <span className="rounded bg-[#00C26F] px-2 py-1 text-xs text-white">正常</span>
          <button onClick={onClose} className="rounded bg-black/40 border border-white/20 px-4 py-1.5 text-xs text-white/90 hover:bg-white/20 ml-2">
            退出演示
          </button>
        </div>
      </div>

      {/* Cards Grid (No Inner Box) */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-12 pb-10">
        <div className="grid grid-cols-6 gap-6 w-full max-w-6xl">
          {[
            ['桌台点餐', '#FF8A00', <Utensils size={28} className="text-white" />, () => setViewMode('pos'), false],
            ['快速点餐', '#FF8A00', <MonitorPlay size={28} className="text-white" />, undefined, false],
            ['订单', '#00D0A6', <FileText size={28} className="text-white" />, undefined, false],
            ['会员', '#B99A6B', <User size={28} className="text-white" />, undefined, false],
            ['销账', '#D3414E', <WalletCards size={28} className="text-white" />, undefined, false],
            ['交班', '#7641F0', <ClipboardCheck size={28} className="text-white" />, undefined, false],
            ['报表', '#1F7BFF', <BarChart2 size={28} className="text-white" />, undefined, false],
            ['打印', '#1F7BFF', <Printer size={28} className="text-white" />, undefined, false],
            ['沽清', '#FF8A00', <ShoppingCart size={28} className="text-white" />, undefined, false],
            ['存酒', '#7641F0', <Banknote size={28} className="text-white" />, undefined, false],
            ['预订', '#14C6A4', <PlaySquare size={28} className="text-white" />, undefined, false],
            ['效期贴', '#1F7BFF', <Settings size={28} className="text-white" />, undefined, false],
          ].map(([title, color, icon, onClick, isOutline]) => (
            <button key={String(title)} onClick={onClick as (() => void) | undefined} style={{ backgroundColor: color as string }} className={`h-32 rounded-2xl p-4 text-left shadow-lg hover:brightness-110 transition-all ${isOutline ? 'border border-white/10' : ''}`}>
              <div className="flex h-full flex-col justify-between">
                <div className="text-[17px] font-medium text-white">{title as string}</div>
                <div className="self-end">{icon as React.ReactNode}</div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-10 flex items-center justify-center gap-2">
          <div className="h-1 w-8 rounded-full bg-white" />
          <div className="h-1 w-8 rounded-full bg-white/20" />
        </div>
        <button className="absolute right-7 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60">
          <ChevronRight size={24} />
        </button>
        <div className="absolute left-6 bottom-4 text-xs text-white/35">客如云收银软件 · 标准版</div>
        <div className="absolute right-6 bottom-4 flex items-center gap-2 text-xs text-white/45">
          <button className="rounded-full bg-white/10 px-3 py-2">点餐 APP 下载</button>
          <button className="rounded-full bg-white/10 px-3 py-2">咨询客服</button>
        </div>
      </div>
    </div>
  );

  const renderKeruyunPOS = () => (
    <div className="w-full h-full overflow-hidden flex flex-col bg-[#F0F2F5] text-[#1F2329]">
      <div className="h-14 shrink-0 bg-black px-4 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => setViewMode('home')} className="text-white/70 hover:text-white">
            <ChevronLeft size={22} />
          </button>
          <span className="text-xl font-medium tracking-wide">中桌4(大厅)</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/80">
          <span>营业日4月20日</span>
          <span className="text-lg">9:55</span>
          <button onClick={onClose} className="rounded bg-white/10 border border-white/20 px-4 py-1.5 text-xs text-white/90 hover:bg-white/20 ml-2">
            退出演示
          </button>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[30%] shrink-0 bg-white border-r border-[#E3E6EB] flex flex-col">
          <div className="shrink-0 border-b border-gray-100 px-4 py-3 text-sm text-gray-500 flex items-center justify-between">
            <span>会员登录</span>
            <span>人数: 6人</span>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="border-b border-gray-100 px-4 py-4 text-left">
              <div className="flex items-center justify-between text-[16px] font-medium text-gray-800">
                <span>微脆牛肉丸</span>
                <span>¥18</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">x1</div>
            </div>
            <div className="border-b border-gray-100 px-4 py-4 text-left">
              <div className="flex items-center justify-between text-[16px] font-medium text-gray-800">
                <span>御膳肥牛</span>
                <span>¥66</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">x1</div>
            </div>
          </div>
          <div className="shrink-0 border-t border-[#E3E6EB] p-3">
            <div className="flex gap-2">
              <button onClick={() => showToast('演示模式暂不支持加菜')} className="flex-1 rounded-lg border border-[#95A9C8] bg-white py-2.5 text-sm font-medium text-[#51657F]">
                加菜
              </button>
              <button onClick={() => showToast('演示模式已生成预结单')} className="flex-1 rounded-lg border border-[#95A9C8] bg-white py-2.5 text-sm font-medium text-[#51657F]">
                打印预结单
              </button>
            </div>
          </div>
        </div>
        <div className="w-[35%] shrink-0 bg-white border-r border-[#E3E6EB] p-4 flex flex-col overflow-hidden">
          <div className="mb-3 text-lg font-semibold">选择优惠</div>
          <div className="grid grid-cols-3 gap-2">
            {['整单手动折扣', '免单', '促销活动'].map((label) => (
              <button key={label} className="rounded-xl border border-gray-200 bg-white py-4 text-sm text-gray-700 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]">
                {label}
              </button>
            ))}
          </div>
          <div className="mt-6 flex-1 rounded-2xl bg-[#F4F6F8] p-5 border border-[#E6EAF0]">
            <div className="text-lg font-semibold text-gray-800">账单明细</div>
            <div className="mt-8 flex items-end justify-between border-b border-[#E0E5EA] pb-6">
              <span className="text-xl font-semibold">应收金额</span>
              <span className="text-[38px] font-bold">¥ 84.00</span>
            </div>
            <div className="mt-5 space-y-4 text-gray-500">
              <div className="flex items-center justify-between">
                <span>订单金额</span>
                <span>¥ 84.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>已收金额</span>
                <span>¥ 0.00</span>
              </div>
              <div className="rounded-xl bg-white px-4 py-3 text-sm text-[#8B97A7]">
                挂账结账方式
              </div>
            </div>
          </div>
        </div>
        <div className="w-[35%] shrink-0 bg-[#F0F2F5] flex flex-col overflow-hidden">
          <div className="shrink-0 px-5 pt-4 pb-2">
            <div className="text-[30px] font-bold text-[#E24A4A]">请收款 ¥ 84.00</div>
            <div className="mt-2 text-sm text-[#A5AFBB]">选择结账方式</div>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                ['现金', <Banknote size={20} className="text-[#FF8A00]" />],
                ['银联卡记账', <CreditCard size={20} className="text-[#15A05A]" />],
                ['扫码支付', <ScanLine size={20} className="text-[#1677FF]" />],
                ['收款码', <MonitorPlay size={20} className="text-[#1677FF]" />, '推荐使用'],
                ['会员卡', <User size={20} className="text-[#B29868]" />],
                ['实体卡', <WalletCards size={20} className="text-[#00C2A3]" />],
                ['挂账', <FileText size={20} className="text-[#FF5A5F]" />],
                ['美团团购券', <ShoppingCart size={20} className="text-[#FFB000]" />],
                ['口碑购券', <Printer size={20} className="text-[#6B7280]" />],
                ['航同券', <Settings size={20} className="text-[#7E8AA5]" />],
                ['备用通道', <MonitorPlay size={20} className="text-[#24C16B]" />],
                ['其他券', <ScanLine size={20} className="text-[#2A7BFF]" />],
              ].map(([label, icon, badge]) => (
                <button key={String(label)} className="relative rounded-2xl bg-white px-3 py-4 text-left shadow-sm border border-[#E7EBF0]">
                  {badge && (
                    <span className="absolute right-2 top-2 rounded-full bg-[#E24A4A] px-2 py-0.5 text-[10px] text-white">
                      {badge as string}
                    </span>
                  )}
                  <div className="mb-3 h-10 w-10 rounded-xl bg-[#F4F7FA] flex items-center justify-center">
                    {icon as React.ReactNode}
                  </div>
                  <div className="text-sm font-medium text-gray-800">{label as string}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="shrink-0 p-5 pt-2">
            <button onClick={keruyunCheckout} className="w-full rounded-xl bg-[#B9D8F3] py-4 text-lg font-semibold text-white shadow-[0_8px_16px_rgba(116,163,211,0.24)]">
              请先完成收款
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMeituanHome = () => (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#0D0D0D] text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_18%),radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_30%)] opacity-60" />
      
      {/* Top Bar */}
      <div className="relative h-12 shrink-0 px-6 text-xs text-white/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-sm bg-[#FFB000] text-[10px] font-bold text-black flex items-center justify-center">美</div>
          <span className="text-sm">美团·餐饮系统 <span className="opacity-70 text-xs">[智能版 快餐]</span></span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-sm">06月13日 星期五 19:59:50</span>
          <Headphones size={16} />
          <Printer size={16} />
          <Wifi size={16} />
          <Bell size={16} />
          <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">
            <User size={14} />
          </div>
          <button onClick={onClose} className="rounded bg-white/10 border border-white/20 px-4 py-1.5 text-xs text-white/90 hover:bg-white/20 ml-2">
            退出演示
          </button>
        </div>
      </div>

      {/* Store Info */}
      <div className="relative shrink-0 flex flex-col items-center justify-center pt-8 pb-10">
        <div className="flex items-center justify-center gap-3">
          <div className="text-[34px] font-medium tracking-wide">牛多多牛肉面(城北吾悦首府店)</div>
          <span className="rounded bg-[#FFB000] px-2 py-1 text-sm text-black font-semibold">主收银</span>
        </div>
        <div className="mt-3 text-sm text-white/50">🏠 门店号: 58588100</div>
      </div>

      {/* Cards Grid */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-10 pb-8">
        <div className="grid grid-cols-5 gap-6">
          {[
            ['点餐', '#E87A3C', <Utensils size={38} />, () => setViewMode('pos')],
            ['接单', '#F0A23F', <ClipboardCheck size={38} />],
            ['订单', '#28B5E8', <FileText size={38} />],
            ['沽清', '#32B7E2', <ShoppingCart size={38} />],
            ['交班', '#5D86ED', <Banknote size={38} />],
            ['报表', '#5A8BDE', <BarChart2 size={38} />],
            ['学习中心', '#8D9BB3', <PlaySquare size={38} />, undefined, '10节未学习'],
            ['打印', '#A7B4C9', <Printer size={38} />],
            ['菜品管理', '#3DC98E', <ConciergeBell size={38} />],
            ['后台管理', '#F3C543', undefined, undefined, undefined, '美团餐饮系统', 'text-black'],
          ].map(([title, color, icon, onClick, badge, subtitle, textClass]) => (
            <button key={String(title)} onClick={onClick as (() => void) | undefined} style={{ backgroundColor: color as string }} className="relative h-32 w-40 rounded-[18px] shadow-lg transition-transform hover:scale-[1.02]">
              <div className="h-full w-full rounded-[18px] p-5 flex flex-col items-center justify-center relative">
                {badge && <span className="absolute -right-3 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">{badge as string}</span>}
                {icon && <div className={textClass as string | undefined}>{icon as React.ReactNode}</div>}
                {subtitle && <div className={`mt-2 text-[11px] ${textClass as string | undefined} opacity-90`}>{subtitle as string}</div>}
                <div className={`mt-2 text-lg font-bold tracking-widest ${textClass as string | undefined}`}>{title as string}</div>
                {title === '后台管理' && <div className="mt-1 text-[11px] text-black/80">美团管家PC</div>}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2">
          <div className="h-1 w-4 rounded-full bg-white/90" />
          <div className="h-1 w-4 rounded-full bg-white/90" />
        </div>
        <div className="mt-6 w-full flex items-center justify-between text-xs text-white/45">
          <div className="flex items-center gap-3">
            <button className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/70">下载中心</button>
            <button className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/70">产品建议</button>
            <button className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/70">在线客服</button>
          </div>
          <div>7*24小时服务，点击在线客服开启咨询</div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-white/35">
          <div className="rounded-md bg-white/10 px-2 py-1 text-[10px]">美团</div>
          <div className="text-[30px] font-semibold tracking-wider">美团</div>
        </div>
      </div>
    </div>
  );

  const renderMeituanPOS = () => (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#F7F8FA] text-[#1F2329]">
      <div className="h-14 shrink-0 bg-white border-b border-[#E8EAED] px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setViewMode('home')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-black">
            <ChevronLeft size={20} />
          </button>
          <div className="text-lg font-semibold text-gray-800">桌台 天5</div>
          <div className="rounded-full bg-[#F4F5F7] border border-gray-200 px-3 py-1.5 text-xs text-gray-600 flex items-center gap-1">人数4人 修改 &gt;</div>
        </div>
        <button onClick={onClose} className="rounded bg-black/5 border border-gray-200 px-4 py-1.5 text-xs text-gray-600 hover:bg-black/10">
          退出演示
        </button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[30%] shrink-0 bg-white border-r border-[#E8EAED] flex flex-col">
          <div className="h-12 shrink-0 px-4 border-b border-gray-100 flex items-center justify-between bg-white text-sm text-[#B47A00]">
            <span>👑 会员登录</span>
            <button
              onClick={() => {
                setMeituanCart(initialMeituanCart());
                setMeituanSelectedId(null);
                setMeituanDiscount(0);
              }}
              className="text-gray-500 hover:text-red-500"
            >
              清空
            </button>
          </div>
          <div className="shrink-0 border-b border-gray-100 px-4 py-2 text-xs text-[#8D96A5]">点餐区</div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {meituanCart.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-gray-400">暂无商品</div>
            ) : (
              meituanCart.map((entry) => (
                <button
                  key={entry.cartId}
                  onClick={() => setMeituanSelectedId(entry.cartId)}
                  className={`w-full border-b border-gray-100 px-4 py-3 text-left ${meituanSelectedId === entry.cartId ? 'bg-[#FFF6E0]' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-base font-medium text-gray-800 line-clamp-2">{entry.item.name}</div>
                      {entry.specs.length > 0 && <div className="mt-1 text-xs text-gray-400">规格: {entry.specs.join(' / ')}</div>}
                    </div>
                    <div className="text-base font-semibold text-gray-800">¥{(entry.item.price * entry.quantity).toFixed(2)}</div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">数量 x{entry.quantity}</div>
                </button>
              ))
            )}
          </div>
          <div className="shrink-0 border-t border-[#E8EAED] p-4 bg-white">
            <div className="mb-3 rounded-lg bg-[#FFF1F0] px-3 py-2 text-xs text-[#E05A59] flex items-center justify-between">
              <span>可参与整单折价</span>
              <span className="rounded-full bg-white px-2 py-1 text-[10px] text-[#E05A59]">选择优惠 &gt;</span>
            </div>
            {meituanDiscount > 0 && (
              <div className="mb-3 flex items-center justify-between rounded-xl bg-red-50 px-3 py-2 text-sm text-red-500">
                <span>打折减免</span>
                <span className="font-semibold">-¥{meituanDiscount}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button className="w-[26%] rounded-lg border border-[#E5E7EB] bg-white py-3 text-sm font-medium text-gray-700">
                下单
              </button>
              <div className="flex-1 text-center">
                <div className="text-sm font-semibold text-gray-700">共 {meituanTotalItems} 项 ¥{meituanPayable.toFixed(0)}</div>
              </div>
              <button onClick={meituanCheckout} className="w-[42%] rounded-lg bg-[#FFB000] py-3 text-base font-bold text-black shadow-sm">
                下单并结账
              </button>
            </div>
          </div>
        </div>
        <div className="w-[8%] shrink-0 bg-[#F4F5F7] border-r border-[#E8EAED] p-2 flex flex-col gap-2 overflow-y-auto hide-scrollbar">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <button onClick={() => meituanSelectedId ? updateMeituanQuantity(meituanSelectedId, 1) : showToast('请先选择购物车内的菜品')} className="h-12 w-full flex items-center justify-center hover:bg-gray-50">
              <Plus size={18} />
            </button>
            <div className="border-y border-gray-100 py-2 text-center text-lg font-semibold">
              {meituanSelectedId ? meituanCart.find((entry) => entry.cartId === meituanSelectedId)?.quantity ?? '-' : '-'}
            </div>
            <button onClick={() => meituanSelectedId ? updateMeituanQuantity(meituanSelectedId, -1) : showToast('请先选择购物车内的菜品')} className="h-12 w-full flex items-center justify-center hover:bg-gray-50">
              <Minus size={18} />
            </button>
          </div>
          <button onClick={() => meituanSelectedId ? setSpecModalOpen(true) : showToast('请先选择购物车内的菜品')} className="rounded-xl border border-gray-200 bg-white py-3 text-sm text-gray-700 hover:bg-gray-50">规格/做法</button>
          <button onClick={() => showToast('演示模式暂不支持加料')} className="rounded-xl border border-gray-200 bg-white py-3 text-sm text-gray-700 hover:bg-gray-50">加料</button>
          <button onClick={() => showToast('演示模式暂不支持单品备注')} className="rounded-xl border border-gray-200 bg-white py-3 text-sm text-gray-700 hover:bg-gray-50">单品备注</button>
          <button onClick={addMeituanPackaging} className="rounded-xl border border-gray-200 bg-white py-3 text-sm text-gray-700 hover:bg-gray-50">打包</button>
          <button onClick={() => showToast('演示模式暂不支持等叫')} className="rounded-xl border border-gray-200 bg-white py-3 text-sm text-gray-700 hover:bg-gray-50">等叫</button>
          <button onClick={() => meituanCart.length > 0 ? setMeituanDiscount(10) : showToast('请先选择菜品')} className="rounded-xl border border-gray-200 bg-white py-3 text-sm text-gray-700 hover:bg-gray-50">打折减免</button>
          <button onClick={() => showToast('演示模式暂不支持赠菜')} className="rounded-xl border border-gray-200 bg-white py-3 text-sm text-gray-700 hover:bg-gray-50">赠菜</button>
          <button onClick={deleteSelectedMeituan} className="rounded-xl border border-gray-200 bg-white py-3 text-sm text-gray-700 hover:bg-gray-50">删除</button>
        </div>
        <div className="w-[62%] shrink-0 flex flex-col bg-[#F7F8FA] overflow-hidden">
          <div className="h-14 shrink-0 bg-white border-b border-[#E8EAED] px-2 flex items-center overflow-x-auto hide-scrollbar">
            {[
              { label: '全部' },
              { label: '热菜3', badge: '3' },
              { label: '水' },
              { label: '套餐' },
              { label: '冷菜' },
              { label: '凉菜类', badge: '5' },
            ].map((category) => (
              <button
                key={category.label}
                onClick={() => setMeituanCategory(category.label === '热菜3' ? '热菜' : category.label === '凉菜类' ? '冷菜' : (category.label as '全部' | '热菜' | '水' | '冷菜' | '套餐'))}
                className={`relative h-full whitespace-nowrap border-b-2 px-6 text-sm ${((category.label === '热菜3' && meituanCategory === '热菜') || (category.label === '凉菜类' && meituanCategory === '冷菜') || meituanCategory === category.label) ? 'border-[#FFB000] font-semibold text-gray-900' : 'border-transparent text-gray-500'}`}
              >
                {category.label}
                {category.badge && <span className="absolute right-2 top-2 rounded-full bg-[#FFB000] px-1.5 text-[10px] text-black">{category.badge}</span>}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
            <div className="grid grid-cols-4 gap-3 pb-10">
              <button className="relative h-28 rounded-xl border border-dashed border-[#E05A59] bg-white p-4 text-left text-[#E05A59] hover:shadow-md">
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <Plus size={22} />
                  <div className="text-sm font-medium">添加临时菜</div>
                </div>
              </button>
              {(meituanCategory === '全部' ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === meituanCategory)).map((item) => (
                <button key={item.id} onClick={() => addMeituanItem(item)} className="relative h-28 rounded-xl border border-gray-200 bg-white p-3 text-left hover:shadow-md">
                  {meituanQty(item.id) > 0 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500 text-xs font-bold text-white flex items-center justify-center">
                      {meituanQty(item.id)}
                    </motion.div>
                  )}
                  <div className="flex h-full flex-col justify-between">
                    <div className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</div>
                    <div className="text-base font-bold text-gray-700">¥{item.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderYinbaoHome = () => (
    <div className="w-full h-full overflow-hidden flex flex-col bg-[#F5F5F5] text-[#1F2329]">
      <div className="h-12 shrink-0 bg-[#D9383A] px-4 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 font-semibold">
          <div className="rounded-full border border-white/60 px-2 py-1 text-xs uppercase tracking-[0.3em]">YB</div>
          <span className="text-lg tracking-wide">演示用门店</span>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <span className="font-medium">{formatClock(time)}</span>
          <button onClick={onClose} className="rounded bg-black/20 border border-white/20 px-4 py-1.5 text-xs text-white/90 hover:bg-black/30">
            退出演示
          </button>
        </div>
      </div>
      <div className="flex-1 p-6 flex flex-col gap-5 overflow-hidden">
        <div className="shrink-0 rounded-[28px] bg-white border border-[#E5E7EB] px-8 py-10">
          <div className="text-sm text-gray-500">今日营业额</div>
          <div className="mt-4 text-[64px] font-bold text-[#D9383A]">¥ 12,580.00</div>
        </div>
        <div className="flex-1 rounded-[28px] bg-[#EEF1F4] p-4">
          <div className="grid h-full grid-cols-3 gap-3">
            {[
              ['前台收银台', <MonitorPlay size={34} className="text-[#D9383A]" />, true, () => setViewMode('pos')],
              ['销售单据', <FileText size={30} />],
              ['交接班', <ClipboardCheck size={30} />],
              ['商品管理', <ShoppingCart size={30} />],
              ['会员中心', <User size={30} />],
              ['系统设置', <Settings size={30} />],
            ].map(([title, icon, emphasis, onClick]) => (
              <button key={String(title)} onClick={onClick as (() => void) | undefined} className={`rounded-xl border bg-white p-5 text-left shadow-sm ${emphasis ? 'border-[#D9383A] text-[#D9383A]' : 'border-[#D9DDE3] text-gray-700'}`}>
                <div className="mb-6">{icon as React.ReactNode}</div>
                <div className={`text-xl ${emphasis ? 'font-bold' : 'font-medium'}`}>{title as string}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderYinbaoPOS = () => (
    <div className="w-full h-full overflow-hidden flex flex-col bg-[#F0F0F0] text-[#202124]">
      <div className="h-12 shrink-0 bg-[#D9383A] px-4 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => setViewMode('home')} className="rounded bg-black/20 px-3 py-1 text-xs hover:bg-black/30">
            &lt; 返回首页
          </button>
          <span className="text-lg font-semibold tracking-wide">演示用门店</span>
        </div>
        <button onClick={onClose} className="rounded bg-black/20 border border-white/20 px-4 py-1.5 text-xs text-white/90 hover:bg-black/30">
          退出演示
        </button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[30%] shrink-0 bg-white border-r border-[#DFE2E7] flex flex-col">
          <div className="shrink-0 px-3 py-2 border-b border-gray-100 text-sm text-gray-500 flex items-center justify-between">
            <span>购物车</span>
            <button onClick={() => { setYinbaoCart([]); setYinbaoSelectedId(null); }} className="hover:text-red-500">
              清空
            </button>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {yinbaoCart.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-gray-400">暂无商品</div>
            ) : (
              yinbaoCart.map((entry) => (
                <button
                  key={entry.cartId}
                  onClick={() => setYinbaoSelectedId(entry.cartId)}
                  className={`w-full border-b border-gray-100 px-4 py-2 text-left ${yinbaoSelectedId === entry.cartId ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium text-gray-800 line-clamp-2">{entry.item.name}</div>
                    <div className="text-sm font-semibold text-gray-800">¥{(entry.item.price * entry.quantity).toFixed(2)}</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">x{entry.quantity}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); updateYinbaoQuantity(entry.cartId, -1); }} className="h-5 w-5 rounded border border-gray-200 bg-white text-gray-600 flex items-center justify-center"><Minus size={10} /></button>
                      <button onClick={(e) => { e.stopPropagation(); updateYinbaoQuantity(entry.cartId, 1); }} className="h-5 w-5 rounded border border-gray-200 bg-white text-gray-600 flex items-center justify-center"><Plus size={10} /></button>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
          <div className="shrink-0 bg-[#D9383A] p-3 text-white">
            <div className="mb-3 flex items-end justify-between">
              <span className="text-xs text-white/80">共 {yinbaoTotalItems} 项</span>
              <div className="text-right">
                <div className="text-[11px] text-white/70">应收</div>
                <div className="text-3xl font-bold">¥{yinbaoTotalPrice.toFixed(2)}</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-2">
              <button onClick={() => showToast('演示模式暂不支持规格')} className="rounded bg-white/15 py-2 text-xs">规格</button>
              <button onClick={() => showToast('演示模式暂不支持打包')} className="rounded bg-white/15 py-2 text-xs">打包</button>
              <button onClick={() => showToast('演示模式暂不支持改价')} className="rounded bg-white/15 py-2 text-xs">改价</button>
              <button onClick={deleteSelectedYinbao} className="rounded bg-white/15 py-2 text-xs">删除</button>
            </div>
            <button onClick={yinbaoCheckout} className="w-full rounded bg-white py-3 text-base font-bold text-[#D9383A]">
              收银
            </button>
          </div>
        </div>
        <div className="w-[70%] shrink-0 bg-[#F0F0F0] p-1 overflow-y-auto hide-scrollbar">
          <div className="grid grid-cols-6 gap-1">
            {MENU_ITEMS.map((item) => (
              <button key={item.id} onClick={() => addYinbaoItem(item)} className="relative h-16 rounded-sm border border-[#D9DDE3] bg-white px-2 py-1 text-left hover:border-[#D9383A]">
                {yinbaoQty(item.id) > 0 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                    {yinbaoQty(item.id)}
                  </motion.div>
                )}
                <div className="text-[11px] font-medium leading-tight text-gray-800 line-clamp-2">{item.name}</div>
                <div className="mt-1 text-[11px] font-bold text-[#D9383A]">¥{item.price}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCleanHome = (config: {
    brand: string;
    subtitle: string;
    accent: string;
    background: string;
    badgeClass: string;
    modules: Array<{ label: string; icon: React.ReactNode; primary?: boolean; onClick?: () => void }>;
  }) => (
    <div className={`w-full h-full overflow-hidden flex flex-col text-white ${config.background}`}>
      <div className="h-14 shrink-0 px-6 flex items-center justify-between border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-xl ${config.badgeClass} flex items-center justify-center text-sm font-bold`}>
            {config.brand.slice(0, 1)}
          </div>
          <div>
            <div className="text-lg font-semibold">{config.brand}</div>
            <div className="text-xs text-white/45">{config.subtitle}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <span>{formatClock(time)}</span>
          <Wifi size={16} />
          <Printer size={16} />
          <button onClick={onClose} className="rounded bg-white/10 border border-white/15 px-4 py-1.5 text-xs text-white/90 hover:bg-white/20">
            退出演示
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-10 py-8">
        <div className="mb-8">
          <div className="text-3xl font-semibold">演示门店</div>
          <div className="mt-2 text-sm text-white/45">主收银台 · 餐饮模式</div>
        </div>
        <div className="grid grid-cols-4 gap-4 xl:grid-cols-6">
          {config.modules.map((module) => (
            <button
              key={module.label}
              onClick={module.onClick}
              className={`h-32 rounded-2xl border p-4 text-left shadow-lg transition-transform hover:scale-[1.02] ${
                module.primary ? 'border-white/20 bg-white text-gray-950' : 'border-white/10 bg-white/[0.08] text-white'
              }`}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="text-base font-semibold">{module.label}</div>
                <div className={module.primary ? 'text-gray-950' : 'text-white/70'}>{module.icon}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrderLine = (entry: CartItem, active: boolean, onSelect: () => void) => (
    <button
      key={entry.cartId}
      onClick={onSelect}
      className={`w-full border-b px-4 py-3 text-left ${active ? 'bg-amber-50 border-amber-100' : 'border-gray-100 hover:bg-gray-50'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900 line-clamp-2">{entry.item.name}</div>
          {entry.specs.length > 0 && <div className="mt-1 text-xs text-gray-400">{entry.specs.join(' / ')}</div>}
        </div>
        <div className="text-sm font-bold text-gray-900">¥{(entry.item.price * entry.quantity).toFixed(0)}</div>
      </div>
      <div className="mt-2 text-xs text-gray-500">x{entry.quantity}</div>
    </button>
  );

  const renderMenuGrid = (brand: 'meituan' | 'yinbao', onAdd: (item: MenuItem) => void, qty: (id: number) => number) => {
    const accent = brand === 'meituan' ? '#FFB000' : '#D9383A';
    return (
      <div className="grid grid-cols-3 gap-3 xl:grid-cols-4">
        {MENU_ITEMS.filter((item) => item.category !== '水').map((item) => (
          <button
            key={`${brand}-${item.id}`}
            onClick={() => onAdd(item)}
            className="relative h-28 rounded-xl border border-gray-200 bg-white p-3 text-left shadow-sm hover:shadow-md"
          >
            {qty(item.id) > 0 && (
              <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full text-xs font-bold text-white flex items-center justify-center" style={{ backgroundColor: accent }}>
                {qty(item.id)}
              </div>
            )}
            <div className="mb-3 h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}18`, color: accent }}>
              <Utensils size={18} />
            </div>
            <div className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</div>
            <div className="mt-2 text-base font-bold" style={{ color: accent }}>¥{item.price}</div>
          </button>
        ))}
      </div>
    );
  };

  const renderMeituanHomeClean = () =>
    renderCleanHome({
      brand: '美团收银智能版',
      subtitle: '桌台点餐 · 接单 · 订单 · 报表',
      accent: '#FFB000',
      background: 'bg-[#101010]',
      badgeClass: 'bg-[#FFB000] text-black',
      modules: [
        { label: '点餐', icon: <Utensils size={32} />, primary: true, onClick: () => setViewMode('pos') },
        { label: '接单', icon: <ClipboardCheck size={30} /> },
        { label: '订单', icon: <FileText size={30} /> },
        { label: '菜品管理', icon: <ConciergeBell size={30} /> },
        { label: '沽清', icon: <ShoppingCart size={30} /> },
        { label: '报表', icon: <BarChart2 size={30} /> },
        { label: '打印', icon: <Printer size={30} /> },
        { label: '后台管理', icon: <Settings size={30} /> },
      ],
    });

  const renderKeruyunHomeClean = () =>
    renderCleanHome({
      brand: '客如云 OnPOS',
      subtitle: '桌台 · 订单 · 会员 · 交班',
      accent: '#1677FF',
      background: 'bg-[#111827]',
      badgeClass: 'bg-[#DCEBFF] text-[#1677FF]',
      modules: [
        { label: '桌台点餐', icon: <Utensils size={32} />, primary: true, onClick: () => setViewMode('pos') },
        { label: '快速点餐', icon: <MonitorPlay size={30} /> },
        { label: '订单', icon: <FileText size={30} /> },
        { label: '会员', icon: <User size={30} /> },
        { label: '交班', icon: <ClipboardCheck size={30} /> },
        { label: '报表', icon: <BarChart2 size={30} /> },
        { label: '打印', icon: <Printer size={30} /> },
        { label: '设置', icon: <Settings size={30} /> },
      ],
    });

  const renderYinbaoHomeClean = () =>
    renderCleanHome({
      brand: '银豹餐饮收银',
      subtitle: '前台收银 · 商品管理 · 会员',
      accent: '#D9383A',
      background: 'bg-[#D9383A]',
      badgeClass: 'bg-white text-[#D9383A]',
      modules: [
        { label: '前台收银', icon: <MonitorPlay size={32} />, primary: true, onClick: () => setViewMode('pos') },
        { label: '销售单据', icon: <FileText size={30} /> },
        { label: '商品管理', icon: <ShoppingCart size={30} /> },
        { label: '会员中心', icon: <User size={30} /> },
        { label: '交接班', icon: <ClipboardCheck size={30} /> },
        { label: '报表中心', icon: <BarChart2 size={30} /> },
        { label: '打印设置', icon: <Printer size={30} /> },
        { label: '系统设置', icon: <Settings size={30} /> },
      ],
    });

  const renderMeituanPOSClean = () => (
    <div className="w-full h-full overflow-hidden flex flex-col bg-[#F6F7F9] text-[#1F2329]">
      <div className="h-14 shrink-0 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setViewMode('home')} className="text-gray-500 hover:text-black"><ChevronLeft size={20} /></button>
          <div>
            <div className="text-base font-semibold">桌台 A2</div>
            <div className="text-xs text-gray-400">美团收银智能版 · 点餐</div>
          </div>
        </div>
        <button onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-50">退出演示</button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[30%] min-w-[260px] bg-white border-r border-gray-200 flex flex-col">
          <div className="h-12 shrink-0 px-4 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#B47A00]">会员/订单区</span>
            <button onClick={() => { setMeituanCart(initialMeituanCart()); setMeituanDiscount(0); }} className="text-xs text-gray-500 hover:text-red-500">重置</button>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {meituanCart.map((entry) => renderOrderLine(entry, meituanSelectedId === entry.cartId, () => setMeituanSelectedId(entry.cartId)))}
          </div>
          <div className="shrink-0 border-t border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-gray-500">合计</span>
              <span className="text-2xl font-bold text-gray-950">¥{meituanPayable.toFixed(0)}</span>
            </div>
            <button onClick={meituanCheckout} className="w-full rounded-xl bg-[#FFB000] py-3 text-base font-bold text-black">下单并结账</button>
          </div>
        </div>
        <div className="w-24 shrink-0 border-r border-gray-200 bg-[#F1F3F5] p-2 flex flex-col gap-2">
          {[
            ['规格', () => meituanSelectedId ? setSpecModalOpen(true) : showToast('请先选择菜品')],
            ['加菜', () => showToast('已进入加菜状态')],
            ['打包', addMeituanPackaging],
            ['折扣', () => meituanCart.length > 0 ? setMeituanDiscount(10) : showToast('请先选择菜品')],
            ['删除', deleteSelectedMeituan],
          ].map(([label, action]) => (
            <button key={String(label)} onClick={action as () => void} className="rounded-xl bg-white py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">{label as string}</button>
          ))}
        </div>
        <div className="min-w-0 flex-1 flex flex-col">
          <div className="h-14 shrink-0 bg-white border-b border-gray-200 flex items-center overflow-x-auto hide-scrollbar px-2">
            {(['全部', '热菜', '冷菜', '套餐'] as const).map((category) => (
              <button key={category} onClick={() => setMeituanCategory(category)} className={`h-full px-6 text-sm border-b-2 ${meituanCategory === category ? 'border-[#FFB000] text-gray-950 font-semibold' : 'border-transparent text-gray-500'}`}>{category}</button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
            {renderMenuGrid('meituan', addMeituanItem, meituanQty)}
          </div>
        </div>
      </div>
    </div>
  );

  const renderKeruyunPOSClean = () => (
    <div className="w-full h-full overflow-hidden flex flex-col bg-[#EEF2F7] text-[#1F2329]">
      <div className="h-14 shrink-0 bg-[#111827] px-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setViewMode('home')} className="text-white/70 hover:text-white"><ChevronLeft size={20} /></button>
          <div>
            <div className="text-base font-semibold">中桌 4</div>
            <div className="text-xs text-white/45">客如云 OnPOS · 账单收款</div>
          </div>
        </div>
        <button onClick={onClose} className="rounded bg-white/10 border border-white/20 px-4 py-1.5 text-xs text-white/90 hover:bg-white/20">退出演示</button>
      </div>
      <div className="flex-1 grid grid-cols-[30%_34%_36%] overflow-hidden">
        <div className="bg-white border-r border-gray-200 flex flex-col">
          <div className="h-12 px-4 border-b border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>账单菜品</span><span>6人</span>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {[
              ['御膳肥牛', 66, 1],
              ['微脆牛肉丸', 18, 1],
              ['拍黄瓜', 15, 1],
              ['米饭', 3, 2],
            ].map(([name, price, qty]) => (
              <div key={String(name)} className="border-b border-gray-100 px-4 py-4">
                <div className="flex justify-between gap-3 text-sm font-semibold text-gray-900"><span>{name}</span><span>¥{price}</span></div>
                <div className="mt-2 text-xs text-gray-500">x{qty}</div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full rounded-xl border border-[#95A9C8] py-3 text-sm font-semibold text-[#51657F]">打印预结单</button>
          </div>
        </div>
        <div className="bg-white border-r border-gray-200 p-5 flex flex-col">
          <div className="text-lg font-semibold">优惠与账单</div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {['整单折扣', '会员价', '团购券'].map((label) => (
              <button key={label} className="rounded-xl border border-gray-200 bg-white py-4 text-sm text-gray-700">{label}</button>
            ))}
          </div>
          <div className="mt-5 flex-1 rounded-2xl bg-[#F4F6F8] border border-gray-200 p-5">
            <div className="text-sm text-gray-500">应收金额</div>
            <div className="mt-4 text-[44px] font-bold text-gray-950">¥ 105.00</div>
            <div className="mt-6 space-y-3 text-sm text-gray-500">
              <div className="flex justify-between"><span>订单金额</span><span>¥105.00</span></div>
              <div className="flex justify-between"><span>已收金额</span><span>¥0.00</span></div>
              <div className="flex justify-between"><span>找零</span><span>¥0.00</span></div>
            </div>
          </div>
        </div>
        <div className="bg-[#EEF2F7] p-5 flex flex-col overflow-hidden">
          <div className="text-[30px] font-bold text-[#E24A4A]">请收款 ¥105.00</div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              ['现金', <Banknote size={20} />],
              ['扫码支付', <ScanLine size={20} />],
              ['会员卡', <User size={20} />],
              ['银行卡', <CreditCard size={20} />],
              ['团购券', <ShoppingCart size={20} />],
              ['挂账', <FileText size={20} />],
            ].map(([label, icon]) => (
              <button key={String(label)} className="rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm">
                <div className="mb-3 h-9 w-9 rounded-xl bg-[#EAF2FF] text-[#1677FF] flex items-center justify-center">{icon as React.ReactNode}</div>
                <div className="text-sm font-semibold text-gray-800">{label as string}</div>
              </button>
            ))}
          </div>
          <button onClick={keruyunCheckout} className="mt-auto w-full rounded-xl bg-[#1677FF] py-4 text-lg font-semibold text-white">确认收款</button>
        </div>
      </div>
    </div>
  );

  const renderYinbaoPOSClean = () => (
    <div className="w-full h-full overflow-hidden flex flex-col bg-[#E9F0F1] text-[#202124]">
      <div className="h-12 shrink-0 bg-[#0A9AC0] px-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setViewMode('home')} className="rounded bg-black/15 px-3 py-1 text-xs hover:bg-black/25"><ChevronLeft size={16} className="inline-block align-[-3px]" /> 返回</button>
          <span className="text-base font-semibold">银豹餐饮演示</span>
        </div>
        <button onClick={onClose} className="rounded bg-black/15 border border-white/20 px-4 py-1.5 text-xs text-white/90 hover:bg-black/25">退出演示</button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[30%] min-w-[250px] bg-[#F7FFF4] border-r border-[#CFE3D1] flex flex-col">
          <div className="h-11 px-4 border-b border-[#DDEBDD] flex items-center justify-between text-sm text-gray-600">
            <span>购物车</span>
            <button onClick={() => { setYinbaoCart([]); setYinbaoSelectedId(null); }} className="text-xs hover:text-red-500">清空</button>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {yinbaoCart.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-gray-400">请选择商品</div>
            ) : (
              yinbaoCart.map((entry) => renderOrderLine(entry, yinbaoSelectedId === entry.cartId, () => setYinbaoSelectedId(entry.cartId)))
            )}
          </div>
          <div className="shrink-0 bg-[#FF6B6B] p-4 text-white">
            <div className="flex items-end justify-between">
              <span className="text-xs text-white/80">共 {yinbaoTotalItems} 项</span>
              <div className="text-right"><div className="text-[11px] text-white/70">主单</div><div className="text-3xl font-bold">¥{yinbaoTotalPrice.toFixed(2)}</div></div>
            </div>
            <button onClick={yinbaoCheckout} className="mt-3 w-full rounded bg-white py-3 text-base font-bold text-[#D9383A]">收银</button>
          </div>
        </div>
        <div className="min-w-0 flex-1 flex flex-col">
          <div className="h-14 shrink-0 bg-[#0A9AC0] flex items-center overflow-x-auto hide-scrollbar">
            {['热菜', '冷菜', '套餐', '小吃', '主食'].map((label) => (
              <button key={label} className="h-full min-w-28 border-r border-white/15 px-6 text-sm font-semibold text-white/90 hover:bg-white/10">{label}</button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar p-3">
            {renderMenuGrid('yinbao', addYinbaoItem, yinbaoQty)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full overflow-hidden flex flex-col select-none relative">
      {currentBrand === 'keruyun' && viewMode === 'home' && renderKeruyunHome()}
      {currentBrand === 'keruyun' && viewMode === 'pos' && renderKeruyunPOSClean()}
      {currentBrand === 'meituan' && viewMode === 'home' && renderMeituanHome()}
      {currentBrand === 'meituan' && viewMode === 'pos' && renderMeituanPOSClean()}
      {currentBrand === 'yinbao' && viewMode === 'home' && renderYinbaoHomeClean()}
      {currentBrand === 'yinbao' && viewMode === 'pos' && renderYinbaoPOSClean()}
      {currentBrand === 'kds' && viewMode === 'home' && renderKdsHome()}
      {currentBrand === 'kds' && viewMode === 'board' && renderKdsBoard()}

      <AnimatePresence>
        {paymentStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[220] bg-black/55 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 16 }}
              className="w-[400px] rounded-[28px] bg-white px-8 py-10 shadow-2xl"
            >
              {paymentStatus === 'loading' && (
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 h-16 w-16 rounded-full border-4 border-gray-100 border-t-[#1677FF] animate-spin" />
                  <div className="text-2xl font-semibold text-gray-900">正在调起支付通道...</div>
                </div>
              )}
              {paymentStatus === 'success' && (
                <div className="flex flex-col items-center text-center">
                  <CheckCircle size={78} className="mb-6 text-green-500" />
                  <div className="text-3xl font-bold text-gray-900">🎉 支付成功！</div>
                  <div className="mt-3 text-base text-gray-600">已完成扣款 ¥{paymentAmount.toFixed(2)}</div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {specModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSpecModalOpen(false)}
            className="absolute inset-0 z-[210] bg-black/35 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              onClick={(event) => event.stopPropagation()}
              className="w-[360px] rounded-[24px] bg-white p-6 shadow-2xl"
            >
              <div className="mb-5 text-xl font-semibold text-gray-900">选择规格/做法</div>
              <div className="grid grid-cols-3 gap-3">
                {SPEC_OPTIONS.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => addMeituanSpec(spec)}
                    className="rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:border-[#FFB000] hover:text-[#FFB000]"
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute left-1/2 top-20 z-[230] -translate-x-1/2 rounded-full bg-gray-900 px-5 py-3 text-sm text-white shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
