"use client";

import { useEffect, useRef } from "react";
import { manrope } from "@/fonts/manrope";

let introSeen = false;

export function HomeMotion() {
  const skip = useRef<HTMLButtonElement>(null);
  const curtain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = skip.current?.closest("main");
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let hidden = false;
    let loading = false;
    let effects:
      ReturnType<typeof import("./home-reveals").startReveals> | undefined;
    let destination: HTMLElement | undefined;
    let timer = 0;
    let initialFrame = 0;
    let readingFrame = 0;
    let interacted = false;
    const cancel = () => {
      clearTimeout(timer);
      cancelAnimationFrame(readingFrame);
      destination = undefined;
    };
    const topFor = (target: HTMLElement) => {
      if (target.id === "inicio") return 0;
      const carouselTop = effects?.scrollTop(target);
      if (carouselTop !== undefined) return carouselTop;
      // A sticky heading is not a stable anchor; navigate to its reading section.
      const anchor = target.matches("h2")
        ? (target.closest("section") ?? target)
        : target;
      return Math.max(0, anchor.getBoundingClientRect().top + scrollY - 112);
    };
    const finish = () => {
      const target = destination;
      cancel();
      if (!target) return;
      // A delayed/cancelled native smooth scroll can go quiet before arriving.
      // Keep focus and viewport together, unless a user gesture cancelled us.
      const top = Math.min(
        topFor(target),
        document.documentElement.scrollHeight - innerHeight,
      );
      if (Math.abs(scrollY - top) > 2) scrollTo({ top, behavior: "instant" });
      effects?.settle();
      target.focus({ preventScroll: true });
    };
    const onScroll = () => {
      if (!destination) return;
      clearTimeout(timer);
      timer = window.setTimeout(finish, 160);
    };
    const navigate = (target: HTMLElement, smooth = true) => {
      cancel();
      destination = target;
      scrollTo({
        top: topFor(target),
        behavior: smooth && !reduced.matches ? "smooth" : "instant",
      });
      onScroll();
    };
    const hashTarget = () => document.getElementById(location.hash.slice(1));
    const alignInitialHash = () => {
      if (disposed || interacted || document.readyState !== "complete") return;
      cancelAnimationFrame(initialFrame);
      // Native fragment scrolling and font layout finish after the load event.
      initialFrame = requestAnimationFrame(() => {
        const target = hashTarget();
        if (!disposed && !interacted && target) navigate(target, false);
      });
    };
    const interrupt = () => {
      interacted = true;
      cancel();
    };
    const onHash = () => {
      const target = hashTarget();
      if (target) navigate(target);
    };
    const click = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
          : null;
      if (!link || link.hasAttribute("download") || link.target) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      if (location.hash !== link.hash) history.pushState(null, "", link.hash);
      navigate(target);
    };
    const focus = (event: FocusEvent) => {
      const target = event.target;
      if (
        destination ||
        !(target instanceof HTMLElement) ||
        !target.matches(":focus-visible")
      )
        return;
      const carouselTop = effects?.scrollTop(target);
      // Native focus may already have scrolled. Finish that scrub before measuring.
      effects?.settle();
      const bounds = target.getBoundingClientRect();
      if (carouselTop !== undefined) {
        scrollTo({ top: carouselTop, behavior: "instant" });
        effects?.settle();
      } else if (bounds.top < 112 || bounds.bottom > innerHeight) {
        target.scrollIntoView({ block: "center", behavior: "instant" });
        effects?.settle();
      }
    };
    const release = () => {
      effects?.revert();
      effects = undefined;
    };
    const readingPosition = () => {
      if (scrollY === 0) return;
      const candidates = Array.from(
        root.querySelectorAll<HTMLElement>(
          ".project-copy, .about-copy, h2, h3, .skill-row",
        ),
      );
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && root.contains(focused))
        candidates.unshift(focused);
      const element = candidates.find((candidate) => {
        const box = candidate.getBoundingClientRect();
        if (
          box.bottom <= 112 ||
          box.top >= innerHeight ||
          box.right <= 0 ||
          box.left >= innerWidth
        )
          return false;
        const x = Math.max(0, Math.min(innerWidth - 1, box.x + box.width / 2));
        const y = Math.max(
          113,
          Math.min(innerHeight - 1, box.y + box.height / 2),
        );
        // Ignore a sticky project covered by About, or an offscreen slide.
        return candidate.contains(document.elementFromPoint(x, y));
      });
      if (element)
        return {
          element,
          top: element.getBoundingClientRect().top,
          focused:
            focused instanceof HTMLElement && element.contains(focused)
              ? focused
              : undefined,
        };
    };
    const restoreReadingPosition = (
      position: ReturnType<typeof readingPosition>,
    ) => {
      if (!position) return;
      cancelAnimationFrame(readingFrame);
      // Restore after ScrollTrigger has finished resetting its saved scroll.
      readingFrame = requestAnimationFrame(() => {
        if (disposed) return;
        const carouselTop = effects?.scrollTop(position.element);
        if (carouselTop !== undefined)
          scrollTo({ top: carouselTop, behavior: "instant" });
        effects?.settle();
        scrollBy({
          top: position.element.getBoundingClientRect().top - position.top,
          behavior: "instant",
        });
        effects?.settle();
        if (document.activeElement === document.body)
          position.focused?.focus({ preventScroll: true });
      });
    };
    const pagehide = () => {
      hidden = true;
      interrupt();
      release();
    };
    const pageshow = () => {
      hidden = false;
      load();
    };
    const preference = () => {
      const target = destination;
      if (reduced.matches) {
        const position = readingPosition();
        release();
        restoreReadingPosition(position);
      } else load();
      if (target) navigate(target, false);
    };
    function load() {
      if (disposed || hidden || loading || effects || reduced.matches) return;
      loading = true;
      void import("./home-reveals")
        .then(({ startReveals }) => {
          if (disposed || hidden || reduced.matches) return;
          const position = readingPosition();
          effects = startReveals(root!);
          restoreReadingPosition(position);
          alignInitialHash();
        })
        .catch(release)
        .finally(() => {
          loading = false;
        });
    }
    reduced.addEventListener("change", preference);
    document.addEventListener("click", click);
    root.addEventListener("focusin", focus);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", pagehide);
    window.addEventListener("pageshow", pageshow);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("pointerdown", interrupt);
    window.addEventListener("keydown", interrupt);
    window.addEventListener("load", alignInitialHash);
    void document.fonts.ready.then(alignInitialHash);
    load();
    alignInitialHash();
    return () => {
      disposed = true;
      cancel();
      cancelAnimationFrame(initialFrame);
      release();
      reduced.removeEventListener("change", preference);
      document.removeEventListener("click", click);
      root.removeEventListener("focusin", focus);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", pagehide);
      window.removeEventListener("pageshow", pageshow);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      window.removeEventListener("keydown", interrupt);
      window.removeEventListener("load", alignInitialHash);
    };
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
