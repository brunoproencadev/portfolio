"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Only this wrapper owns the case transforms. The server renders the complete,
// readable document; enhancement is applied after both motion imports succeed.
export function CaseMotion({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = container.current;
    if (!root) return;
    let disposed = false;
    let hidden = false;
    let pending = false;
    let resumePending = false;
    const initialFocus = document.activeElement;
    let reading = Boolean(
      location.hash ||
      (initialFocus instanceof HTMLElement &&
        root.contains(initialFocus) &&
        initialFocus.matches(":focus-visible") &&
        initialFocus.closest(".case-scene, .case-body")),
    );
    let revert: (() => void) | undefined;
    const eligible = matchMedia(
      "(min-width: 1100px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
    );

    const reset = () => {
      revert?.();
      revert = undefined;
      delete root.dataset.caseEnhanced;
    };
    // A keyboard or anchor destination takes precedence over scroll staging.
    // Stay in ordinary document flow until this case is left and entered again.
    const readAt = (target: Element | null) => {
      reading = true;
      reset();
      target?.scrollIntoView({
        block: target.id === "conteudo" ? "start" : "center",
        behavior: "instant",
      });
    };
    const onFocus = (event: FocusEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.matches(":focus-visible") &&
        event.target.closest(".case-scene, .case-body")
      )
        readAt(event.target);
    };
    const onHash = () => {
      if (location.hash) {
        let id = location.hash.slice(1);
        try {
          id = decodeURIComponent(id);
        } catch {
          /* Keep malformed fragments harmless. */
        }
        const target = document.getElementById(id);
        if (target && root.contains(target)) readAt(target);
      }
    };
    const load = () => {
      if (!eligible.matches) {
        reset();
        return;
      }
      if (disposed || hidden || pending || revert || reading) return;
      pending = true;
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([{ gsap }, { ScrollTrigger }]) => {
          if (disposed || hidden || !eligible.matches || reading) return;
          gsap.registerPlugin(ScrollTrigger);
          const context = gsap.context(() => {
            root.dataset.caseEnhanced = "true";
            const scene = root.querySelector(".case-scene");
            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: scene,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.4,
                invalidateOnRefresh: true,
              },
            });
            timeline
              .to(".case-intro", { y: -48, opacity: 0, duration: 0.32 }, 0.02)
              .set(".case-intro", { pointerEvents: "none" }, 0.34)
              .to(
                ".case-light",
                { y: () => innerHeight * 0.45, opacity: 0, duration: 0.5 },
                0,
              )
              .fromTo(
                ".case-scene .case-media",
                {
                  xPercent: -50,
                  yPercent: -50,
                  y: () => innerHeight * 0.65,
                  scale: 0.65,
                  opacity: 0,
                  pointerEvents: "none",
                },
                {
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power2.out",
                },
                0.15,
              )
              .set(".case-scene .case-media", { pointerEvents: "auto" }, 0.65)
              .to({}, { duration: 0.35 }, 0.65);
            gsap.fromTo(
              ".case-body",
              { borderRadius: "32px 32px 0 0" },
              {
                borderRadius: "0px 0px 0 0",
                ease: "none",
                scrollTrigger: {
                  trigger: ".case-body",
                  start: "top bottom",
                  end: "top 20%",
                  scrub: 0.4,
                },
              },
            );
            for (const section of root.querySelectorAll(".case-section")) {
              gsap.fromTo(
                section.querySelector(".case-copy"),
                { y: 48 },
                {
                  y: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    end: "top 48%",
                    scrub: 0.4,
                  },
                },
              );
            }
          }, root);
          revert = () => context.revert();
          ScrollTrigger.refresh();
        })
        .catch(reset)
        .finally(() => {
          pending = false;
          if (resumePending) {
            resumePending = false;
            load();
          }
        });
    };
    const onHide = () => {
      hidden = true;
      reset();
    };
    const onShow = () => {
      hidden = false;
      if (pending) resumePending = true;
      else load();
    };
    eligible.addEventListener("change", load);
    root.addEventListener("focusin", onFocus);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("pagehide", onHide);
    window.addEventListener("pageshow", onShow);
    load();
    return () => {
      disposed = true;
      reset();
      eligible.removeEventListener("change", load);
      root.removeEventListener("focusin", onFocus);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("pageshow", onShow);
    };
  }, []);

  return (
    <div className={className} ref={container}>
      {children}
    </div>
  );
}
