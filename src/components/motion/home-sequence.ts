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
      // Explicit start states survive scroll-plugin refresh before the first frame.
      gsap.set(strokes, { attr: { "stroke-dashoffset": 1 } });
      gsap.set(".hero-arc", { y: 30, scale: 1.04, opacity: 0.25 });
      gsap.set(".hero-arc-edge", { attr: { "stroke-width": 12 } });
      gsap.set(".hero-title-line", { yPercent: 110 });
      gsap.set(".hero-position", { y: 12, opacity: 0 });
      gsap.set(".hero-description, .hero-actions", { y: 10, opacity: 0 });
      gsap.set(".hero-end", { opacity: 0 });
      let position = 0;
      for (const path of strokes) {
        const duration = (path.getTotalLength() / length) * 0.85;
        timeline.to(
          path,
          { attr: { "stroke-dashoffset": 0 }, duration, ease: "none" },
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
        .to(".hero-arc", { y: 0, scale: 1, opacity: 1, duration: 0.8 }, "hero")
        .to(
          ".hero-arc-edge",
          { attr: { "stroke-width": 2 }, duration: 0.8 },
          "hero",
        )
        .to(
          ".hero-title-line",
          { yPercent: 0, duration: 0.64, stagger: 0.1 },
          "hero+=0.12",
        )
        .to(".hero-position", { y: 0, opacity: 1, duration: 0.35 }, "hero+=0.4")
        .to(
          ".hero-description",
          { y: 0, opacity: 1, duration: 0.4 },
          "hero+=0.5",
        )
        .to(".hero-actions", { y: 0, opacity: 1, duration: 0.36 }, "hero+=0.64")
        .to(".hero-end", { opacity: 1, duration: 0.4 }, "hero+=0.6");
    });
  } catch (error) {
    context.revert();
    throw error;
  }
  return () => context.revert();
}
