"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { profile, sections, type SectionId } from "@/data/portfolio";
import Image from "next/image";
import { manrope } from "@/fonts/manrope";
import { useIslandMotion } from "./use-island-motion";

const icons: Record<SectionId, string> = {
  inicio: "m3 11 9-8 9 8M5 9v12h5v-7h4v7h5V9",
  projetos: "M3 6h18v15H3zM8 6V3h8v3M3 12h18",
  sobre: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 22v-3a8 8 0 0 1 16 0v3",
  competencias: "m7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18",
  contato: "M2 5h20v14H2zM2 6l10 7L22 6",
};

const subscribeToHydration = () => () => {};

export function SiteNavigation() {
  const enhanced = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("inicio");
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useIslandMotion(enhanced, open);

  useEffect(() => {
    if (!enhanced) return;
    const targets = sections.flatMap((section) => {
      const element = document.getElementById(section.id)?.closest("section");
      return element ? [{ id: section.id, element }] : [];
    });
    const updateActive = () => {
      let current: SectionId = "inicio";
      for (const target of targets) {
        if (
          target.element.getBoundingClientRect().top <=
          Math.max(112, innerHeight * 0.4)
        )
          current = target.id;
      }
      setActive(current);
    };
    let observer: IntersectionObserver | undefined;
    const observe = () => {
      observer?.disconnect();
      updateActive();
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && nav.current?.contains(focused)) {
        focused.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
      if (!("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(updateActive, {
        rootMargin: `-96px 0px -${Math.max(0, Math.round(innerHeight * 0.6))}px 0px`,
      });
      for (const target of targets) observer.observe(target.element);
    };
    observe();
    window.addEventListener("resize", observe);
    window.addEventListener("hashchange", updateActive);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observe);
      window.removeEventListener("hashchange", updateActive);
    };
  }, [enhanced, nav]);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !nav.current?.contains(event.target)
      ) {
        const focused = document.activeElement;
        if (focused instanceof HTMLElement && nav.current?.contains(focused))
          focused.blur();
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      setOpen(false);
      toggle.current?.focus();
    };
    document.addEventListener("pointerdown", closeOutside);
    // Pointer activation in WebKit can leave focus outside the disclosure.
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, nav]);

  return (
    <header className="site-header page-container">
      <a
        className="wordmark"
        href="#inicio"
        aria-label="BP/ — Bruno Proença — início"
        hidden={enhanced}
      >
        BP<span aria-hidden="true">/</span>
      </a>
      <nav
        ref={nav}
        className={`capsule ${manrope.className}`}
        data-enhanced={enhanced || undefined}
        data-open={open || undefined}
        aria-label="Navegação principal"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setOpen(false);
        }}
      >
        <div className="capsule-heading" hidden={!enhanced}>
          <Image
            className="capsule-avatar"
            src="/images/profile/github-avatar.png"
            width={40}
            height={40}
            alt=""
            priority
          />
          <div className="capsule-identity">
            <span className="capsule-name">{profile.shortName}</span>
            <span className="capsule-current">
              {sections.find((section) => section.id === active)?.label}
            </span>
          </div>
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="navigation-links"
            aria-label={open ? "Fechar" : "Menu"}
            onClick={() => setOpen((value) => !value)}
            className="capsule-toggle"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={open ? "m6 6 12 12M6 18 18 6" : "M5 9h14M5 15h14"} />
            </svg>
          </button>
        </div>
        <div
          id="navigation-links"
          className="capsule-panel"
          inert={enhanced && !open}
          aria-hidden={enhanced && !open ? true : undefined}
        >
          <ul className="capsule-links">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-label={section.label}
                  aria-current={
                    enhanced && active === section.id ? "location" : undefined
                  }
                  onClick={(event) => {
                    if (
                      event.button !== 0 ||
                      event.ctrlKey ||
                      event.metaKey ||
                      event.shiftKey ||
                      event.altKey
                    )
                      return;
                    setOpen(false);
                    setActive(section.id);
                    document
                      .getElementById(section.id)
                      ?.focus({ preventScroll: true });
                  }}
                >
                  <svg
                    className="capsule-link-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={icons[section.id]} />
                  </svg>
                  {section.label}
                  <span
                    className="capsule-link-current"
                    hidden={!enhanced || active !== section.id}
                  >
                    Atual
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="capsule-note" hidden={!enhanced}>
            {profile.position}. Software, visão e robótica.
          </p>
        </div>
      </nav>
    </header>
  );
}
