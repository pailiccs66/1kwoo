import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Handshake,
  Monitor,
  Palette,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import {
  BUSINESS_CATALOG,
  type BusinessCategory,
  type OfferItem,
} from "./catalog";

const CATEGORY_ICONS: Record<BusinessCategory["id"], LucideIcon> = {
  operations: Users,
  digital: Monitor,
  design: Palette,
  partnerships: Handshake,
};

const OfferRow = ({ item }: { item: OfferItem }) => {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = Boolean(item.details?.length);

  return (
    <div className="border-b border-foreground/10 last:border-b-0">
      <button
        type="button"
        onClick={() => hasDetails && setExpanded((value) => !value)}
        className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 text-left md:px-5 md:py-4 ${
          hasDetails ? "hover:bg-foreground/[0.035]" : "cursor-default"
        }`}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground md:text-[15px]">
              {item.name}
            </span>
            {hasDetails && (
              <ChevronDown
                size={14}
                className={`shrink-0 text-foreground/35 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-foreground/50 md:text-xs">
            {item.summary}
          </p>
        </div>
        <span className="shrink-0 font-serif text-sm text-accent md:text-base">
          {item.price}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && item.details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid gap-2 bg-foreground/[0.025] px-4 py-3 md:grid-cols-2 md:px-5">
              {item.details.map((detail) => (
                <div
                  key={detail}
                  className="flex items-start gap-2 text-[11px] leading-relaxed text-foreground/60 md:text-xs"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const POSMatrix: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] =
    useState<BusinessCategory["id"]>("operations");
  const activeCategory = useMemo(
    () =>
      BUSINESS_CATALOG.find((category) => category.id === activeCategoryId) ??
      BUSINESS_CATALOG[0],
    [activeCategoryId],
  );
  const [activeGroupId, setActiveGroupId] = useState(activeCategory.groups[0].id);
  const activeGroup =
    activeCategory.groups.find((group) => group.id === activeGroupId) ??
    activeCategory.groups[0];
  const [activeSectionId, setActiveSectionId] = useState(
    activeGroup.sections[0].id,
  );
  const activeSection =
    activeGroup.sections.find((section) => section.id === activeSectionId) ??
    activeGroup.sections[0];

  useEffect(() => {
    setActiveGroupId(activeCategory.groups[0].id);
    setActiveSectionId(activeCategory.groups[0].sections[0].id);
  }, [activeCategory]);

  const selectCategory = (category: BusinessCategory) => {
    setActiveCategoryId(category.id);
    setActiveGroupId(category.groups[0].id);
    setActiveSectionId(category.groups[0].sections[0].id);
  };

  const selectGroup = (groupId: string) => {
    const group = activeCategory.groups.find((item) => item.id === groupId);
    if (!group) return;
    setActiveGroupId(group.id);
    setActiveSectionId(group.sections[0].id);
  };

  return (
    <Section id="pos-matrix" containerClassName="!p-0" className="flex-col">
      <div className="flex h-full min-h-0 w-full flex-col px-5 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-7 sm:px-8 sm:pt-9 lg:px-16 lg:pt-12 xl:pb-12 xl:pl-[152px] xl:pr-16">
        <header className="mb-4 shrink-0 md:mb-5">
          <h2 className="text-3xl font-serif text-foreground md:text-[42px]">
            业务与报价
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-foreground/55 md:text-base">
            线上代运营、门店数字化、设计内容与异业配套。
          </p>
        </header>

        <nav
          aria-label="业务分类"
          className="mb-4 grid shrink-0 grid-cols-2 gap-2 md:grid-cols-4"
        >
          {BUSINESS_CATALOG.map((category) => {
            const Icon = CATEGORY_ICONS[category.id];
            const isActive = category.id === activeCategory.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => selectCategory(category)}
                className={`flex min-h-[58px] items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors md:min-h-[64px] md:px-4 ${
                  isActive
                    ? "border-accent/40 bg-accent/10 text-foreground"
                    : "border-foreground/10 bg-white/55 text-foreground/55 hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={1.6}
                  className={isActive ? "text-accent" : "text-foreground/40"}
                />
                <div className="min-w-0">
                  <div className="text-xs font-medium md:text-sm">
                    {category.shortName}
                  </div>
                  <div className="mt-0.5 hidden truncate text-[10px] text-foreground/40 lg:block">
                    {category.groups.length} 个业务分组
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="grid min-h-0 flex-1 overflow-hidden rounded-lg border border-foreground/10 bg-white/55 md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="flex min-h-0 border-b border-foreground/10 md:border-b-0 md:border-r">
            <div className="flex w-full gap-2 overflow-x-auto p-3 hide-scrollbar md:flex-col md:overflow-y-auto md:p-4 allow-touch-scroll">
              {activeCategory.groups.map((group) => {
                const isActive = group.id === activeGroup.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => selectGroup(group.id)}
                    className={`min-w-[150px] rounded-lg border px-3 py-3 text-left transition-colors md:min-w-0 ${
                      isActive
                        ? "border-foreground/15 bg-foreground/[0.06] text-foreground"
                        : "border-transparent text-foreground/50 hover:bg-foreground/[0.035] hover:text-foreground"
                    }`}
                  >
                    <span className="block text-xs font-medium md:text-sm">
                      {group.name}
                    </span>
                    <span className="mt-1 hidden text-[10px] leading-relaxed text-foreground/40 md:block">
                      {group.summary}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="flex min-h-0 min-w-0 flex-col">
            <div className="shrink-0 border-b border-foreground/10 px-4 py-4 md:px-6">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <div className="text-[10px] tracking-widest text-accent">
                    {activeCategory.name}
                  </div>
                  <h3 className="mt-1 text-xl font-serif text-foreground md:text-2xl">
                    {activeGroup.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-xs leading-relaxed text-foreground/50">
                    {activeGroup.summary}
                  </p>
                </div>

                <div
                  role="tablist"
                  aria-label={`${activeGroup.name}报价栏目`}
                  className="flex max-w-full gap-1 overflow-x-auto rounded-lg bg-foreground/[0.045] p-1 hide-scrollbar"
                >
                  {activeGroup.sections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      role="tab"
                      aria-selected={section.id === activeSection.id}
                      onClick={() => setActiveSectionId(section.id)}
                      className={`shrink-0 rounded-md px-3 py-2 text-[11px] transition-colors md:text-xs ${
                        section.id === activeSection.id
                          ? "bg-white text-foreground shadow-sm"
                          : "text-foreground/45 hover:text-foreground"
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto allow-touch-scroll">
              <div>
                {activeSection.items.map((item) => (
                  <OfferRow
                    key={`${activeCategory.id}-${activeGroup.id}-${activeSection.id}-${item.name}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </Section>
  );
};

export default POSMatrix;
