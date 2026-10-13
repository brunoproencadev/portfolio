"use client";

import { useEffect, useRef } from "react";
import { manrope } from "@/fonts/manrope";

let introSeen = false;

export function HomeMotion() {
  const skip = useRef<HTMLButtonElement>(null);
  const curtain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = skip.current?.closest("main");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || reduced.matches || location.hash) return;
    let stopped = false;
    let revert: (() => void) | undefined;
    const finish = () => {
      stopped = true;
      revert?.();
      revert = undefined;
      reduced.removeEventListener("change", finish);
      root.removeEventListener("focusin", finish);
      window.removeEventListener("hashchange", finish);
      window.removeEventListener("pagehide", finish);
    };
    reduced.addEventListener("change", finish);
    root.addEventListener("focusin", finish);
    window.addEventListener("hashchange", finish);
    window.addEventListener("pagehide", finish);
    void import("./home-reveals")
      .then(({ startReveals }) => {
        if (!stopped) revert = startReveals(root);
      })
      .catch(finish);
    return finish;
  }, []);

  useEffect(() => {
    const button = skip.current;
    const layer = curtain.current;
    const root = button?.closest("main");
    if (!button || !layer || !root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let seen = introSeen;
    introSeen = true;
    try {
      seen ||= sessionStorage.getItem("portfolio-intro-seen") === "true";
      sessionStorage.setItem("portfolio-intro-seen", "true");
    } catch {
      // The document lifetime still prevents replay when storage is denied.
    }
    if (seen || reduced.matches || location.hash || scrollY > 0) return;

    let stopped = false;
    let revert: (() => void) | undefined;
    const finish = () => {
      if (stopped) return;
      stopped = true;
      clearTimeout(timeout);
      layer.hidden = true;
      revert?.();
      button.removeEventListener("click", finish);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("hashchange", finish);
      window.removeEventListener("pagehide", finish);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchstart", finish);
      reduced.removeEventListener("change", finish);
      if (document.activeElement === button)
        root
          .querySelector<HTMLElement>("#inicio")
          ?.focus({ preventScroll: true });
      button.hidden = true;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target !== button) finish();
    };
    const onPointer = (event: PointerEvent) => {
      if (!button.contains(event.target as Node)) finish();
    };
    button.hidden = false;
    const timeout = window.setTimeout(finish, 2200);
    button.addEventListener("click", finish);
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("hashchange", finish);
    window.addEventListener("pagehide", finish);
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchstart", finish, { passive: true });
    reduced.addEventListener("change", finish);

    void import("./home-sequence")
      .then(({ startIntro }) => {
        if (!stopped) {
          revert = startIntro(root, finish);
          if (!stopped) layer.hidden = false;
        }
      })
      .catch(finish);

    return finish;
  }, []);

  return (
    <>
      <div ref={curtain} className="intro-curtain" aria-hidden="true" hidden>
        <svg className="intro-greeting" viewBox="0 0 120 80" fill="none">
          <path
            className="intro-stroke"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
            d="M27 47C4 34 7 76 26 60S23 30 18 43"
          />
          <path
            className="intro-stroke"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
            d="M28 57C55 68 79 2 63 12S36 82 64 56"
          />
          <path
            className="intro-stroke"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
            d="M88 42C70 27 55 69 76 61C84 58 87 45 88 40L83 57C80 71 96 60 103 54"
          />
          <path
            className="intro-stroke"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
            d="M94 28l9-12"
          />
        </svg>
      </div>
      <button
        ref={skip}
        className={`intro-skip ${manrope.className}`}
        type="button"
        hidden
      >
        Pular intro
      </button>
    </>
  );
}
