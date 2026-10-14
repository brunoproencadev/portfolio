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
        const frame = root.querySelector<HTMLElement>(".robo-frame");
        if (!stage || !track || !frame) return;
        const scroll = (
          trigger: string | HTMLElement,
          start: string,
          end: string,
        ) => ({
          trigger,
          start,
          end,
          scrub: true,
          invalidateOnRefresh: true,
        });

        // Entrance D/E owns the children; scroll owns only their outer wrappers.
        gsap
          .timeline({ scrollTrigger: scroll(".hero", "top top", "bottom 20%") })
          .to(".hero-content", { y: 130, filter: "blur(6px)", ease: "none" }, 0)
          .to(".hero-light", { y: 240, opacity: 0, ease: "none" }, 0);
        gsap.fromTo(
          ".robo-media",
          { y: -180, scale: 0.66, clipPath: "inset(8% 8% 8% 8%)" },
          {
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: scroll(frame, "top bottom", "top 18%"),
          },
        );
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
          { scaleX: 0.86, clipPath: "inset(35% 0% 35% 0%)" },
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
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .to(track, { yPercent: -50, duration: 0.3, ease: "none" }, 0.35)
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
            { scale: 0.88, rotation: -3, y: 70 },
            { scale: 1, rotation: 0, y: 0, ease: "none" },
            0,
          );
        const skills = gsap.timeline({
          scrollTrigger: scroll(".skills-section", "top 75%", "bottom 80%"),
        });
        root
          .querySelectorAll<HTMLElement>(".skill-row")
          .forEach((row, index) => {
            skills
              .fromTo(
                row,
                { x: index % 2 ? 64 : -64 },
                { x: 0, duration: 1, ease: "none" },
                index * 0.6,
              )
              .fromTo(
                row.querySelector(".skill-index"),
                { rotation: -90, scale: 1.4 },
                { rotation: 0, scale: 1, duration: 1, ease: "none" },
                index * 0.6,
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
          // Refresh may leave identity transforms on these exclusively owned wrappers.
          gsap.set(
            ".hero-content, .hero-light, .robo-media, .work-introduction h2, .story-window, .story-track, .about-heading, .about-copy, .skill-row, .skill-index, .contact-ribbon",
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
