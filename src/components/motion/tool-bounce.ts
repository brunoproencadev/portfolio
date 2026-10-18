import { gsap } from "gsap";

/** Replays a short arrival when a tool group enters; no idle loop. */
export function startToolBounce(root: HTMLElement) {
  const media = gsap.matchMedia();
  media.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      hero: "(min-width: 900px) and (min-height: 800px)",
    },
    (context) => {
      if (!context.conditions?.motion) return;
      const selector = context.conditions.hero
        ? ".story-visual .tool-popups"
        : ".tool-popups";
      const entries = new Map<Element, gsap.core.Tween>();
      const observer = new IntersectionObserver(
        (changes) => {
          for (const entry of changes) {
            const tween = entries.get(entry.target);
            if (entry.isIntersecting && !document.hidden) tween?.restart();
            else tween?.progress(1).pause();
          }
        },
        { threshold: 0.5 },
      );
      for (const group of root.querySelectorAll(selector)) {
        const target = group.closest(".story-visual") ?? group;
        entries.set(
          target,
          gsap.fromTo(
            group.children,
            { y: 22, scale: 0.72 },
            {
              y: 0,
              scale: 1,
              duration: 0.65,
              stagger: 0.045,
              ease: "elastic.out(1, 0.5)",
              paused: true,
              immediateRender: false,
            },
          ),
        );
        observer.observe(target);
      }
      const finish = () => {
        if (document.hidden)
          for (const tween of entries.values()) tween.progress(1).pause();
      };
      document.addEventListener("visibilitychange", finish);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", finish);
      };
    },
    root,
  );
  return () => media.revert();
}
