import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { startSectionTransitions } from "./section-transitions";
import { startToolBounce } from "./tool-bounce";

export function startReveals(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  let carousel: ScrollTrigger | undefined;
  let releaseSections: (() => void) | undefined;
  let releaseTools: (() => void) | undefined;
  try {
    media.add(
      "(min-width: 1100px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
      () => {
        const stage = root.querySelector<HTMLElement>(".story-stage");
        const track = root.querySelector<HTMLElement>(".story-track");
        if (!stage || !track) return;
        const count = track.children.length;
        const steps = count - 1;
        if (steps < 1) return;
        stage.classList.add("story-enhanced");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top 112px",
            end: () => `+=${innerHeight * 1.6 * steps}`,
            pin: true,
            refreshPriority: 1,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
        carousel = timeline.scrollTrigger;
        for (let index = 1; index < count; index++) {
          const offset = index - 1;
          timeline
            .to(
              track,
              { xPercent: (-100 * index) / count, duration: 0.6, ease: "none" },
              offset + 0.2,
            )
            .to(
              ".story-progress-thumb",
              { xPercent: 100 * index, duration: 0.6, ease: "none" },
              offset + 0.2,
            )
            .to(
              `.story-backdrop-${index - 1}`,
              { opacity: 0, duration: 0.35, ease: "none" },
              offset + 0.325,
            )
            .to(
              `.story-backdrop-${index}`,
              { opacity: 0.16, duration: 0.35, ease: "none" },
              offset + 0.325,
            )
            .to({}, { duration: 0.2 }, offset + 0.8);
        }
        return () => {
          carousel = undefined;
          stage.classList.remove("story-enhanced");
          gsap.set(".story-track, .story-progress-thumb", {
            clearProps: "transform",
          });
          gsap.set(".story-backdrop", { clearProps: "opacity" });
        };
      },
      root,
    );
    releaseSections = startSectionTransitions(root);
    releaseTools = startToolBounce(root);
    // Resolve the pin's added space before measuring any downstream text.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  } catch (error) {
    releaseTools?.();
    releaseSections?.();
    media.revert();
    throw error;
  }
  return {
    revert: () => {
      releaseTools?.();
      releaseSections?.();
      media.revert();
    },
    scrollTop(target: HTMLElement) {
      const robo = target.closest<HTMLElement>(".cover-enhanced .work-robo");
      if (robo) {
        const start = robo.parentElement!.getBoundingClientRect().top + scrollY;
        return start + Math.max(0, robo.offsetHeight - innerHeight + 48);
      }
      const band = target.closest(".story-band");
      if (!carousel || !band) return undefined;
      const index = Array.from(band.parentElement!.children).indexOf(band);
      const steps = band.parentElement!.children.length - 1;
      const position =
        index === 0 ? 0.1 : index === steps ? steps - 0.1 : index;
      return (
        carousel.start + (carousel.end - carousel.start) * (position / steps)
      );
    },
    settle() {
      ScrollTrigger.update();
      for (const trigger of ScrollTrigger.getAll())
        trigger.getTween()?.progress?.(1);
    },
  };
}
