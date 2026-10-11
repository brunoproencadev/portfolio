"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { profile, sections, type SectionId } from "@/data/portfolio";

const subscribeToHydration = () => () => {};

export function SiteNavigation() {
  const enhanced = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("inicio");
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

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
  }, [enhanced]);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !nav.current?.contains(event.target))
        setOpen(false);
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
  }, [open]);

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
        className="capsule"
        data-enhanced={enhanced || undefined}
        aria-label="Navegação principal"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setOpen(false);
        }}
      >
        <div className="capsule-heading" hidden={!enhanced}>
          <span className="capsule-monogram" aria-hidden="true">
            BP/
          </span>
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
            onClick={() => setOpen(!open)}
            className="capsule-toggle"
          >
            {open ? "Fechar" : "Menu"}
          </button>
        </div>
        <div
          id="navigation-links"
          className="capsule-panel"
          hidden={enhanced && !open}
        >
          <p className="capsule-panel-label" hidden={!enhanced}>
            Percorrer o caderno
          </p>
          <ul className="capsule-links">
            {sections.map((section, index) => (
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
                  <span
                    className="capsule-link-index"
                    hidden={!enhanced}
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
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
        </div>
      </nav>
    </header>
  );
}
