import { gsap } from "gsap";

export function startIntro(root: HTMLElement, onComplete: () => void) {
  const context = gsap.context(() => {}, root);
  try {
    context.add(() => {
      const timeline = gsap.timeline({
        onComplete,
        defaults: { ease: "power2.out" },
      });
      const strokes = Array.from(
        root.querySelectorAll<SVGPathElement>(".intro-stroke"),
      );
      const length = strokes.reduce(
        (sum, path) => sum + path.getTotalLength(),
        0,
      );
      let position = 0;
      for (const path of strokes) {
        const duration = (path.getTotalLength() / length) * 0.85;
        timeline.from(
          path,
          { attr: { "stroke-dashoffset": 1 }, duration, ease: "none" },
          position,
        );
        position += duration;
      }
      timeline
        .to(".intro-greeting", { opacity: 0, duration: 0.15 }, 1)
        .to(
          ".intro-curtain",
          { yPercent: -100, duration: 0.45, ease: "power3.inOut" },
          1,
        )
        .addLabel("hero", 0.85)
        .from(
          ".hero-arc",
          { y: 30, scale: 1.04, opacity: 0.25, duration: 0.8 },
          "hero",
        )
        .from(
          ".hero-arc-edge",
          { attr: { "stroke-width": 12 }, duration: 0.8 },
          "hero",
        )
        .from(
          ".hero-title-line",
          { yPercent: 110, duration: 0.64, stagger: 0.1 },
          "hero+=0.12",
        )
        .from(
          ".hero-position",
          { y: 12, opacity: 0, duration: 0.35 },
          "hero+=0.4",
        )
        .from(
          ".hero-description",
          { y: 10, opacity: 0, duration: 0.4 },
          "hero+=0.5",
        )
        .from(
          ".hero-actions",
          { y: 10, opacity: 0, duration: 0.36 },
          "hero+=0.64",
        )
        .from(".hero-end", { opacity: 0, duration: 0.4 }, "hero+=0.6");
    });
  } catch (error) {
    context.revert();
    throw error;
  }
  return () => context.revert();
}
