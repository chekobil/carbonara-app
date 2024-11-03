import { unref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
export function useStoresIntersection() {
  let stopIntersection: {
    stop: () => void;
  };
  const findIntersectingElement = (
    listElm: HTMLElement,
    listItemClass: string,
    intersectionCallback: () => void
  ) => {
    if (!listElm || !unref(listElm)) return;
    const timer = setInterval(() => {
      // Si avanzas muy rapido salta mas de una vez este timer
      const childElms = unref(listElm)?.querySelectorAll(listItemClass);
      if (childElms) {
        const childElm = childElms[childElms.length - 5];
        if (childElm) {
          clearInterval(timer);
          stopIntersection = startIntersectionObserver(
            childElm as HTMLElement,
            intersectionCallback
          );
        }
      }
    }, 400);
  };
  const startIntersectionObserver = (
    intersectingElm: HTMLElement,
    callback: () => void
  ) => {
    if (stopIntersection) stopIntersection.stop();
    const { stop } = useIntersectionObserver(
      intersectingElm,
      async (entries) => {
        const { isIntersecting } = entries[0] as IntersectionObserverEntry;
        if (isIntersecting) {
          await callback();
        }
      },
      { threshold: 0 }
      // threshold: 0, en cuanto es visible, 1, cuando todo el elemento es visible
    );
    return { stop };
  };
  return {
    findIntersectingElement,
  };
}
