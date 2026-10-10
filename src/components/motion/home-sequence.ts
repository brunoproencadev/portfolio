import { gsap } from "gsap";

export function startIntro(root: HTMLElement, onComplete: () => void) {
  const context = gsap.context(() => {}, root);
  try {
    context.add(() => {
      gsap
        .timeline({ onComplete, defaults: { ease: "power2.out" } })
        .from(".orbit-center", { y: 16, duration: 0.9 })
        .from(".orbit-note", { x: 16, duration: 0.6, stagger: 0.1 }, 0.4)
        .from(
          ".hero-copy > .eyebrow, .hero-copy h1, .hero-headline",
          { y: 16, duration: 0.7, stagger: 0.1 },
          0,
        );
    });
  } catch (error) {
    context.revert();
    throw error;
  }
  return () => context.revert();
}
