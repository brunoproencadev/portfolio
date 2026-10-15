import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function startReveals(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  try {
    media.add(
      "(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
      () => {
        const stage = root.querySelector<HTMLElement>(".story-stage");
        const track = root.querySelector<HTMLElement>(".story-track");
        if (!stage || !track) return;
        root.classList.add("editorial-enhanced");
        const scroll = (
          trigger: string | HTMLElement,
          start: string,
          end: string,
        ) => ({
          trigger,
          start,
          end,
          scrub: 0.35,
          invalidateOnRefresh: true,
        });

        gsap.fromTo(
          ".work-introduction h2",
          { x: -100, scale: 1.08 },
          {
            x: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: scroll(
              ".work-introduction",
              "top bottom",
              "top 35%",
            ),
          },
        );

        stage.classList.add("story-enhanced");
        gsap.fromTo(
          ".story-window",
          { scaleX: 0.92, clipPath: "inset(35% 0% 35% 0%)" },
          {
            scaleX: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: scroll(stage, "top bottom", "top 112px"),
          },
        );
        gsap.set(".story-backdrop-1", { opacity: 0 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top 112px",
              end: () => `+=${innerHeight * 1.2}`,
              pin: true,
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          })
          .to(
            track,
            { yPercent: -50, duration: 0.3, ease: "power2.inOut" },
            0.35,
          )
          .to(
            ".story-backdrop-0",
            { opacity: 0, duration: 0.3, ease: "none" },
            0.35,
          )
          .to(
            ".story-backdrop-1",
            { opacity: 0.22, duration: 0.3, ease: "none" },
            0.35,
          )
          .to({}, { duration: 0.35 });

        gsap
          .timeline({
            scrollTrigger: scroll(".about-section", "top 90%", "top 20%"),
          })
          .fromTo(".about-heading", { x: -80 }, { x: 0, ease: "none" }, 0)
          .fromTo(
            ".about-copy",
            { scale: 0.84, y: 110 },
            { scale: 1, y: 0, ease: "power2.out" },
            0,
          )
          .fromTo(
            ".about-sweep",
            { xPercent: 10 },
            { xPercent: -12, ease: "none" },
            0,
          );
        root.querySelectorAll<HTMLElement>(".skill-row").forEach((row) => {
          gsap.fromTo(
            row,
            { y: 64 },
            {
              y: 0,
              ease: "power2.out",
              scrollTrigger: scroll(row, "top 90%", "top 45%"),
            },
          );
        });
        gsap
          .timeline({
            scrollTrigger: scroll(
              ".contact-passage",
              "top bottom",
              "bottom 25%",
            ),
          })
          .fromTo(
            ".contact-ribbon:first-child",
            { xPercent: -18, rotation: -9 },
            { xPercent: 0, rotation: -4, ease: "none" },
            0,
          )
          .fromTo(
            ".contact-ribbon:last-child",
            { xPercent: 12, rotation: 9 },
            { xPercent: -8, rotation: 4, ease: "none" },
            0,
          );
        return () => {
          stage.classList.remove("story-enhanced");
          root.classList.remove("editorial-enhanced");
          // Refresh may leave identity transforms on these exclusively owned wrappers.
          gsap.set(
            ".work-introduction h2, .story-window, .story-track, .about-heading, .about-copy, .about-sweep, .skill-row, .contact-ribbon",
            {
              clearProps: "transform,clipPath,filter,opacity",
            },
          );
          gsap.set(".story-backdrop", { clearProps: "opacity" });
        };
      },
      root,
    );
    // Finalize pin spacing before HomeMotion restores an anchor's viewport position.
    ScrollTrigger.refresh();
  } catch (error) {
    media.revert();
    throw error;
  }
  return () => media.revert();
}
