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
      const entries = new Map<
        Element,
        { tween: gsap.core.Tween; carousel: boolean }
      >();
      let active = true;
      const observer = new IntersectionObserver(
        (changes) => {
          if (!active) return;
          for (const entry of changes) {
            const animation = entries.get(entry.target);
            if (!animation) continue;
            const { tween, carousel } = animation;
            if (entry.isIntersecting && !document.hidden)
              tween.restart(carousel);
            else tween.progress(carousel ? 0 : 1).pause();
          }
        },
        { threshold: 0.5 },
      );
      for (const group of root.querySelectorAll(selector)) {
        const visual = group.closest(".story-visual");
        const carousel = Boolean(visual);
        const from = carousel
          ? { y: 28, scale: 0.55, opacity: 0 }
          : { y: 22, scale: 0.72 };
        // The image arrives first; only carousel tools wait before appearing.
        if (carousel) gsap.set(group.children, from);
        entries.set(visual ?? group, {
          carousel,
          tween: gsap.fromTo(group.children, from, {
            ...(carousel ? { opacity: 1 } : {}),
            y: 0,
            scale: 1,
            duration: 0.65,
            delay: carousel ? 0.24 : 0,
            stagger: 0.045,
            ease: carousel ? "back.out(2.6)" : "elastic.out(1, 0.5)",
            paused: true,
            immediateRender: false,
          }),
        });
        observer.observe(visual ?? group);
      }
      const finish = () => {
        if (document.hidden)
          for (const { tween } of entries.values()) tween.progress(1).pause();
      };
      document.addEventListener("visibilitychange", finish);
      return () => {
        active = false;
        observer.disconnect();
        entries.clear();
        document.removeEventListener("visibilitychange", finish);
      };
    },
    root,
  );
  return () => media.revert();
}
