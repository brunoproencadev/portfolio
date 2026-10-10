import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function startReveals(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const context = gsap.context(() => {}, root);
  try {
    context.add(() => {
      for (const target of root.querySelectorAll<HTMLElement>(
        ".project-artwork, .about-copy, .skill-row",
      )) {
        gsap.from(target, {
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: { trigger: target, start: "top 90%", once: true },
        });
      }
    });
  } catch (error) {
    context.revert();
    throw error;
  }
  return () => context.revert();
}
