import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function startReveals(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  try {
    media.add(
      "(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
      () => {
        const frame = root.querySelector<HTMLElement>(".robo-frame");
        const image = root.querySelector<HTMLElement>(".robo-media");
        const stage = root.querySelector<HTMLElement>(".industry-stage");
        const track = root.querySelector<HTMLElement>(".industry-track");
        const backdrop = root.querySelector<HTMLElement>(
          ".industry-backdrop-1",
        );
        if (!frame || !image || !stage || !track || !backdrop) return;
        gsap.fromTo(
          image,
          { y: 64, scale: 0.88, clipPath: "inset(6% 6% 6% 6%)" },
          {
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "top 18%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
        stage.classList.add("story-enhanced");
        gsap.set(backdrop, { opacity: 0 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top 112px",
            end: () => `+=${innerHeight * 1.2}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        // Reading intervals occupy 70% of the timeline; only media moves.
        timeline
          .to(track, { yPercent: -50, duration: 0.3, ease: "none" }, 0.35)
          .to(backdrop, { opacity: 1, duration: 0.3, ease: "none" }, 0.35)
          .to({}, { duration: 0.35 });
        return () => {
          stage.classList.remove("story-enhanced");
          // ScrollTrigger refresh can retain an identity transform after revert.
          // These wrappers are owned exclusively here; release only our properties.
          gsap.set([image, track], { clearProps: "transform,clipPath" });
          gsap.set(backdrop, { clearProps: "opacity" });
        };
      },
    );
  } catch (error) {
    media.revert();
    throw error;
  }
  return () => media.revert();
}
