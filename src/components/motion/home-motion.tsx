"use client";

import { useEffect, useRef } from "react";

let introSeen = false;

export function HomeMotion() {
  const skip = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = skip.current;
    const root = button?.closest("main");
    if (!button || !root) return;
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
      revert?.();
      if (document.activeElement === button)
        root
          .querySelector<HTMLElement>("#inicio")
          ?.focus({ preventScroll: true });
      button.hidden = true;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    button.hidden = false;
    const timeout = window.setTimeout(finish, 2200);
    button.addEventListener("click", finish);
    document.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", finish);
    window.addEventListener("pagehide", finish);
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchstart", finish, { passive: true });
    reduced.addEventListener("change", finish);

    void import("./home-sequence")
      .then(({ startIntro }) => {
        if (!stopped) revert = startIntro(root, finish);
      })
      .catch(finish);

    return () => {
      finish();
      button.removeEventListener("click", finish);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", finish);
      window.removeEventListener("pagehide", finish);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchstart", finish);
      reduced.removeEventListener("change", finish);
    };
  }, []);

  return (
    <button ref={skip} className="intro-skip" type="button" hidden>
      Pular intro
    </button>
  );
}
