import { gsap } from "gsap";

/** Owns supporting sections; hero and horizontal track keep their own owners. */
export function startSectionTransitions(root: HTMLElement) {
  const media = gsap.matchMedia();
  media.add(
    {
      wide: "(min-width: 1100px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
      compact:
        "((max-width: 1099px) or (max-height: 799px)) and (prefers-reduced-motion: no-preference)",
      heroFallback:
        "((max-width: 899px) or (max-height: 799px)) and (prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const wide = Boolean(context.conditions?.wide);
      const targets: HTMLElement[] = [];
      const passage = root.querySelector<HTMLElement>(".robo-about-passage");
      const copy = passage?.querySelector<HTMLElement>(".work-robo");
      const surface = passage?.querySelector<HTMLElement>(".about-surface");
      if (passage && copy && surface) {
        passage.classList.add("cover-enhanced");
        gsap.set(copy, {
          top: () => Math.min(112, innerHeight - copy.offsetHeight - 48),
        });
        gsap.fromTo(
          surface,
          { "--cover-radius": "48px", "--cover-shadow": 1 },
          {
            "--cover-radius": "0px",
            "--cover-shadow": 0,
            ease: "none",
            scrollTrigger: {
              trigger: surface,
              start: "top bottom",
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
              onRefresh: () =>
                gsap.set(copy, {
                  top: Math.min(112, innerHeight - copy.offsetHeight - 48),
                }),
            },
          },
        );
      }
      const reveal = (
        selector: string,
        from: { x?: number; y?: number; scale?: number },
      ) => {
        for (const target of root.querySelectorAll<HTMLElement>(selector)) {
          targets.push(target);
          target.dataset.sectionMotion = "true";
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: target,
              start: "top bottom",
              end: "bottom top",
              scrub: wide ? 0.45 : 0.25,
              invalidateOnRefresh: true,
              onToggle: (trigger) => {
                target.dataset.sectionActive = String(trigger.isActive);
              },
              onRefresh: (trigger) => {
                target.dataset.sectionActive = String(trigger.isActive);
              },
            },
          });
          const entry = () =>
            (innerHeight * 0.3) / (innerHeight + target.offsetHeight);
          const exit = () => 96 / (innerHeight + target.offsetHeight);
          timeline
            .fromTo(
              target,
              { "--section-opacity": 0.18, ...from },
              {
                "--section-opacity": 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: entry(),
                ease: "power2.out",
              },
            )
            .to({}, { duration: 1 - entry() - exit() })
            .to(target, {
              "--section-opacity": 1,
              y: wide ? -32 : -16,
              duration: exit(),
              ease: "none",
            });
          target.dataset.sectionActive = String(
            Boolean(timeline.scrollTrigger?.isActive),
          );
        }
      };

      reveal(".work-robo .project-copy", { y: wide ? 88 : 36 });
      reveal(".about-heading", { x: wide ? -64 : 0, y: 36 });
      reveal(".about-copy", { y: wide ? 96 : 40 });
      reveal(".work-introduction", { y: wide ? 72 : 32, scale: 0.97 });
      reveal(".skills-section .section-heading", { y: wide ? 72 : 32 });
      reveal(".skill-row", { y: wide ? 64 : 32 });
      reveal(".skills-section .study-note", { y: 24 });

      if (context.conditions?.heroFallback) {
        gsap.fromTo(
          ".robo-visual",
          { scale: 1, opacity: 1 },
          {
            scale: 0.7,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".robo-visual",
              start: "bottom 55%",
              end: "bottom 15%",
              scrub: 0.25,
            },
          },
        );
        reveal(".robo-frame, .robo-frame + .tool-popups", { y: 36 });
        gsap.to(".hero-content", {
          y: -36,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.25,
          },
        });
      }

      if (wide) {
        const stage = root.querySelector<HTMLElement>(".story-stage");
        if (stage) {
          gsap.fromTo(
            stage.querySelector(".story-window"),
            { y: 56 },
            {
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stage,
                start: "top bottom",
                end: "top 55%",
                scrub: 0.45,
              },
            },
          );
        }
      } else {
        reveal(".story-visual, .story-band .project-copy", { y: 40 });
      }

      return () => {
        passage?.classList.remove("cover-enhanced");
        for (const target of targets) {
          delete target.dataset.sectionMotion;
          delete target.dataset.sectionActive;
        }
      };
    },
    root,
  );
  return () => media.revert();
}
