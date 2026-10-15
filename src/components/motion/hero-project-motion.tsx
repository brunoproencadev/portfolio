"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "../sections/hero-project.module.css";

export function HeroProjectMotion({ children }: { children: ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scene.current;
    if (!root) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    let settle: (() => void) | undefined;
    let pending = false;
    const query =
      "(min-width: 900px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)";
    const eligible = matchMedia(query);

    // Native anchors leave the sticky scene; focusing its hero returns to its start.
    const revealHero = () => {
      if (location.hash === "#inicio") {
        window.scrollTo({ top: 0, behavior: "instant" });
        settle?.();
      }
    };
    const focusHero = (event: FocusEvent) => {
      if (
        root.classList.contains(styles.enhanced) &&
        event.target instanceof Element &&
        event.target.closest(".hero")
      ) {
        window.scrollTo({ top: 0, behavior: "instant" });
        settle?.();
      }
    };
    root.addEventListener("focusin", focusHero);
    window.addEventListener("hashchange", revealHero);

    const load = () => {
      if (!eligible.matches || pending || revert || disposed) return;
      pending = true;
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([{ gsap }, { ScrollTrigger }]) => {
          if (disposed || !eligible.matches) return;
          gsap.registerPlugin(ScrollTrigger);
          const media = gsap.matchMedia();
          revert = () => media.revert();
          media.add(
            query,
            () => {
              root.classList.add(styles.enhanced);
              const frame = root.querySelector("figure");
              gsap.set("[data-project-tool]", {
                y: 28,
                scale: 0.55,
                opacity: 0,
              });
              const timeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: root,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.35,
                  invalidateOnRefresh: true,
                },
              });
              settle = () => {
                ScrollTrigger.update();
                timeline.scrollTrigger?.getTween()?.progress(1);
              };
              timeline
                .to(
                  ".hero-content",
                  { y: -48, opacity: 0, filter: "blur(6px)", duration: 0.34 },
                  0.04,
                )
                .to(".hero-outro", { opacity: 0, duration: 0.12 }, 0)
                .to(
                  ".hero-light",
                  { y: () => innerHeight * 0.52, opacity: 0, duration: 0.48 },
                  0,
                )
                .fromTo(
                  frame,
                  {
                    xPercent: -50,
                    yPercent: -50,
                    y: () => innerHeight * 0.65,
                    scale: 0.55,
                    opacity: 0,
                  },
                  {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.58,
                    ease: "power2.out",
                  },
                  0.1,
                )
                .fromTo(
                  "figcaption",
                  { opacity: 0 },
                  { opacity: 1, duration: 0.12 },
                  0.64,
                )
                .to(
                  "[data-project-tool]",
                  {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.12,
                    stagger: 0.025,
                    ease: "power3.out",
                  },
                  0.68,
                )
                .to({}, { duration: 0.125 }, 0.875);
              return () => {
                settle = undefined;
                root.classList.remove(styles.enhanced);
              };
            },
            root,
          );
          ScrollTrigger.refresh();
        })
        .catch(() => {
          revert?.();
          root.classList.remove(styles.enhanced);
        })
        .finally(() => {
          pending = false;
        });
    };
    eligible.addEventListener("change", load);
    load();

    return () => {
      disposed = true;
      revert?.();
      root.removeEventListener("focusin", focusHero);
      eligible.removeEventListener("change", load);
      window.removeEventListener("hashchange", revealHero);
    };
  }, []);

  return (
    <div ref={scene} data-scroll-study>
      <div className={styles.canvas}>{children}</div>
    </div>
  );
}
