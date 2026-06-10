import { useEffect } from "react";

const MAX_PULL = 84;

const getScroller = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>(".allow-touch-scroll");
};

const atTop = (element: HTMLElement) => element.scrollTop <= 0;

const atBottom = (element: HTMLElement) =>
  Math.ceil(element.scrollTop + element.clientHeight) >= element.scrollHeight;

const dampen = (distance: number) =>
  Math.min(MAX_PULL, Math.pow(Math.abs(distance), 0.82) * 0.72) *
  Math.sign(distance);

const applyPull = (element: HTMLElement, pull: number) => {
  element.classList.add("is-elastic-scrolling");
  element.style.transition = "none";
  element.style.transform = `translate3d(0, ${pull}px, 0)`;
};

const resetPull = (element: HTMLElement | null) => {
  if (!element) return;

  element.style.transition = "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)";
  element.style.transform = "translate3d(0, 0, 0)";

  window.setTimeout(() => {
    element.classList.remove("is-elastic-scrolling");
    element.style.transition = "";
    element.style.transform = "";
  }, 430);
};

export const useElasticScroll = () => {
  useEffect(() => {
    let activeScroller: HTMLElement | null = null;
    let startY = 0;
    let isPulling = false;
    let wheelResetTimer = 0;

    const handleTouchStart = (event: TouchEvent) => {
      activeScroller = getScroller(event.target);
      startY = event.touches[0]?.clientY ?? 0;
      isPulling = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!activeScroller || event.touches.length !== 1) return;

      const currentY = event.touches[0].clientY;
      const deltaY = currentY - startY;
      const shouldPullTop = deltaY > 0 && atTop(activeScroller);
      const shouldPullBottom = deltaY < 0 && atBottom(activeScroller);

      if (!shouldPullTop && !shouldPullBottom) {
        if (isPulling) resetPull(activeScroller);
        isPulling = false;
        return;
      }

      isPulling = true;
      event.preventDefault();
      applyPull(activeScroller, dampen(deltaY));
    };

    const handleTouchEnd = () => {
      if (isPulling) resetPull(activeScroller);
      activeScroller = null;
      isPulling = false;
    };

    const handleWheel = (event: WheelEvent) => {
      const scroller = getScroller(event.target);
      if (!scroller) return;

      const shouldPullTop = event.deltaY < 0 && atTop(scroller);
      const shouldPullBottom = event.deltaY > 0 && atBottom(scroller);

      if (!shouldPullTop && !shouldPullBottom) return;

      event.preventDefault();
      const pull = dampen(-event.deltaY);
      applyPull(scroller, pull);

      window.clearTimeout(wheelResetTimer);
      wheelResetTimer = window.setTimeout(() => resetPull(scroller), 120);
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchcancel", handleTouchEnd);
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.clearTimeout(wheelResetTimer);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);
};
