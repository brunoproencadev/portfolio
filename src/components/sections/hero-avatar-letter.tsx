"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function HeroAvatarLetter({ letter }: { letter: string }) {
  const container = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = container.current;
    const glyph = root?.querySelector<HTMLElement>(".hero-avatar-glyph");
    const avatar = root?.querySelector<HTMLImageElement>("img");
    if (!root || !glyph || !avatar) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let animations: Animation[] = [];
    const cancel = () => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
    };
    const play = (event: PointerEvent) => {
      if (
        event.pointerType !== "mouse" ||
        !avatar.complete ||
        !avatar.naturalWidth ||
        typeof glyph.animate !== "function"
      )
        return;
      cancel();
      const motion = !reduced.matches;
      const away = {
        opacity: 0,
        transform: motion ? "translateY(-0.08em) scale(0.7)" : "none",
        filter: motion ? "blur(3px)" : "blur(0px)",
      };
      const options = {
        duration: 1000,
      };
      animations = [
        glyph.animate(
          [
            {
              opacity: 1,
              transform: "none",
              filter: "blur(0px)",
              easing: "ease-out",
            },
            { ...away, offset: 0.18 },
            { ...away, offset: 0.76, easing: "ease-in" },
            { opacity: 1, transform: "none", filter: "blur(0px)" },
          ],
          options,
        ),
        avatar.animate(
          [
            {
              opacity: 0,
              transform: motion ? "scale(0.5) rotate(-18deg)" : "none",
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            },
            {
              opacity: 1,
              transform: motion ? "scale(1.06) rotate(3deg)" : "none",
              offset: 0.2,
            },
            { opacity: 1, transform: "none", offset: 0.32 },
            { opacity: 1, transform: "none", offset: 0.76, easing: "ease-in" },
            {
              opacity: 0,
              transform: motion ? "scale(0.6) rotate(12deg)" : "none",
            },
          ],
          options,
        ),
      ];
    };
    root.addEventListener("pointerenter", play);
    reduced.addEventListener("change", cancel);
    return () => {
      cancel();
      root.removeEventListener("pointerenter", play);
      reduced.removeEventListener("change", cancel);
    };
  }, []);

  return (
    <span className="hero-avatar-letter" ref={container}>
      <span className="hero-avatar-glyph">{letter}</span>
      <Image
        className="hero-avatar-image"
        src="/images/profile/github-avatar.png"
        width={128}
        height={128}
        sizes="(max-width: 599px) clamp(40px, 12vw, 64px), 112px"
        alt=""
        aria-hidden="true"
        draggable={false}
        loading="eager"
        fetchPriority="low"
      />
    </span>
  );
}
