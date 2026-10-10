"use client";

import { useEffect, useRef } from "react";

let introSeen = false;

export function HomeMotion() {
  const skip = useRef<HTMLButtonElement>(null);

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
      button.removeEventListener("click", finish);
      document.removeEventListener("keydown", onKey);
      root.removeEventListener("focusin", onFocus);
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
    button.hidden = false;
    const timeout = window.setTimeout(finish, 2200);
    button.addEventListener("click", finish);
    document.addEventListener("keydown", onKey);
    root.addEventListener("focusin", onFocus);
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

    return finish;
  }, []);

  return (
    <button ref={skip} className="intro-skip" type="button" hidden>
      Pular intro
    </button>
  );
}
