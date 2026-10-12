"use client";

import { useLayoutEffect, useRef } from "react";
import { animate } from "motion/mini";

/** Dimensional animation is local: no scaling text, body lock or global timeline. */
export function useIslandMotion(enhanced: boolean, open: boolean) {
  const nav = useRef<HTMLElement>(null);
  const update = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const root = nav.current;
    const heading = root?.querySelector<HTMLElement>(".capsule-heading");
    const panel = root?.querySelector<HTMLElement>(".capsule-panel");
    if (!enhanced || !root || !heading || !panel) return;
    const items = [...panel.querySelectorAll<HTMLElement>("li, .capsule-note")];
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let controls: ReturnType<typeof animate>[] = [];
    let revision = 0;
    let disposed = false;
    let lastContentHeight = 0;

    const stop = () => {
      revision++;
      controls.forEach((control) => control.stop());
      controls = [];
    };
    const render = (instant = false) => {
      const expanded = root.hasAttribute("data-open");
      const current = root.getBoundingClientRect();
      stop();
      const version = revision;
      // Temporarily measure natural layout before paint. Only this small surface reflows.
      root.dataset.animating = "true";
      root.style.removeProperty("width");
      root.style.removeProperty("height");
      const width = root.getBoundingClientRect().width;
      const contentHeight = heading.offsetHeight + panel.offsetHeight;
      lastContentHeight = contentHeight;
      const height = expanded ? contentHeight : heading.offsetHeight;
      const finish = () => {
        if (disposed || version !== revision) return;
        root.style.width = `${width}px`;
        root.style.height = `${height}px`;
        root.style.borderRadius = expanded ? "28px" : "30px";
        delete root.dataset.animating;
        items.forEach((item) => {
          item.style.opacity = expanded ? "1" : "0";
          item.style.transform = expanded ? "none" : "translateY(8px)";
        });
      };
      if (instant || preference.matches || document.hidden) {
        finish();
        return;
      }
      root.style.width = `${current.width}px`;
      root.style.height = `${current.height}px`;
      try {
        const frame = animate(
          root,
          {
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: expanded ? "28px" : "30px",
          },
          { duration: expanded ? 0.42 : 0.34, ease: [0.22, 1, 0.36, 1] },
        );
        controls.push(frame);
        items.forEach((item, index) => {
          controls.push(
            animate(
              item,
              {
                opacity: expanded ? 1 : 0,
                transform: expanded ? "translateY(0px)" : "translateY(8px)",
              },
              {
                duration: expanded ? 0.16 : 0.1,
                delay: expanded ? 0.08 + index * 0.03 : 0,
                ease: [0.22, 1, 0.36, 1],
              },
            ),
          );
        });
        void frame.then(finish);
      } catch {
        controls.forEach((control) => control.stop());
        controls = [];
        finish();
      }
    };
    const snap = () => render(true);
    const onFocus = (event: FocusEvent) => {
      // Keyboard access must never wait for a clipped or transparent link.
      if (event.target instanceof Node && panel.contains(event.target)) snap();
    };
    const observer = new ResizeObserver(() => {
      if (
        root.hasAttribute("data-animating") ||
        !root.hasAttribute("data-open")
      )
        return;
      if (heading.offsetHeight + panel.offsetHeight !== lastContentHeight)
        snap();
    });
    observer.observe(heading);
    observer.observe(panel);
    preference.addEventListener("change", snap);
    window.addEventListener("resize", snap);
    window.addEventListener("pagehide", snap);
    document.addEventListener("visibilitychange", snap);
    root.addEventListener("focusin", onFocus);
    void document.fonts.ready.then(() => {
      if (!disposed) snap();
    });
    update.current = () => render();
    snap();
    root.dataset.motionReady = "true";
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      preference.removeEventListener("change", snap);
      window.removeEventListener("resize", snap);
      window.removeEventListener("pagehide", snap);
      document.removeEventListener("visibilitychange", snap);
      root.removeEventListener("focusin", onFocus);
      root.style.removeProperty("width");
      root.style.removeProperty("height");
      root.style.removeProperty("border-radius");
      items.forEach((item) => {
        item.style.removeProperty("opacity");
        item.style.removeProperty("transform");
      });
      delete root.dataset.animating;
      delete root.dataset.motionReady;
      update.current = null;
    };
  }, [nav, enhanced]);

  useLayoutEffect(() => {
    update.current?.();
  }, [open]);
  return nav;
}
