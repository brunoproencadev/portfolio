import { gsap } from "gsap";

export function startIntro(root: HTMLElement, onComplete: () => void) {
  const context = gsap.context(() => {}, root);
  try {
    context.add(() => {
      gsap
        .timeline({ onComplete, defaults: { ease: "power2.out" } })
        .from(
          ".hero-arc",
          { y: 30, scale: 1.04, opacity: 0.25, duration: 0.8 },
          0,
        )
        .from(
          ".hero-arc-edge",
          { attr: { "stroke-width": 12 }, duration: 0.8 },
          0,
        )
        .from(
          ".hero-title-line",
          { yPercent: 110, duration: 0.64, stagger: 0.1 },
          0.12,
        )
        .from(".hero-position", { y: 12, opacity: 0, duration: 0.35 }, 0.4)
        .from(".hero-description", { y: 10, opacity: 0, duration: 0.4 }, 0.5)
        .from(".hero-actions", { y: 10, opacity: 0, duration: 0.36 }, 0.64)
        .from(".hero-end", { opacity: 0, duration: 0.4 }, 0.6);
    });
  } catch (error) {
    context.revert();
    throw error;
  }
  return () => context.revert();
}
