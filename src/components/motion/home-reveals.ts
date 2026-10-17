import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function startReveals(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  let carousel: ScrollTrigger | undefined;
  try {
    media.add(
      "(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
      () => {
        for (const copy of root.querySelectorAll<HTMLElement>(
          "[data-scroll-copy]",
        )) {
          const distance = innerHeight + copy.offsetHeight;
          const entry = (innerHeight * 0.24) / distance;
          const exit = 112 / distance;
          // One timeline owns both edges; its middle is a fully readable plateau.
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: copy,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            })
            .fromTo(
              copy,
              { opacity: 0.78, y: 20, filter: "blur(2px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: entry },
            )
            .to({}, { duration: 1 - entry - exit })
            .fromTo(
              copy,
              { opacity: 1, y: 0, filter: "blur(0px)" },
              {
                opacity: 0.78,
                y: -12,
                filter: "blur(2px)",
                duration: exit,
                immediateRender: false,
              },
            );
        }
        gsap.fromTo(
          ".about-copy",
          { y: 60, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-section",
              start: "top 85%",
              end: "top 30%",
              scrub: 0.5,
            },
          },
        );
        return () => {
          gsap.set("[data-scroll-copy], .about-copy", {
            clearProps: "transform,opacity,filter",
          });
        };
      },
      root,
    );

    media.add(
      "(min-width: 1100px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
      () => {
        const stage = root.querySelector<HTMLElement>(".story-stage");
        const track = root.querySelector<HTMLElement>(".story-track");
        if (!stage || !track) return;
        stage.classList.add("story-enhanced");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top 112px",
            end: () => `+=${innerHeight * 1.6}`,
            pin: true,
            refreshPriority: 1,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
        carousel = timeline.scrollTrigger;
        timeline
          .to(track, { xPercent: -50, duration: 0.6, ease: "none" }, 0.2)
          .to(
            ".story-progress-thumb",
            { xPercent: 100, duration: 0.6, ease: "none" },
            0.2,
          )
          .to(
            ".story-backdrop-0",
            { opacity: 0, duration: 0.35, ease: "none" },
            0.325,
          )
          .to(
            ".story-backdrop-1",
            { opacity: 0.16, duration: 0.35, ease: "none" },
            0.325,
          )
          .to({}, { duration: 0.2 }, 0.8);
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
    // Resolve the pin's added space before measuring any downstream text.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  } catch (error) {
    media.revert();
    throw error;
  }
  return {
    revert: () => media.revert(),
    scrollTop(target: HTMLElement) {
      const band = target.closest(".story-band");
      if (!carousel || !band) return undefined;
      const index = Array.from(band.parentElement!.children).indexOf(band);
      return (
        carousel.start +
        (carousel.end - carousel.start) * (index === 0 ? 0.1 : 0.9)
      );
    },
    settle() {
      ScrollTrigger.update();
      for (const trigger of ScrollTrigger.getAll())
        trigger.getTween()?.progress(1);
    },
  };
}
