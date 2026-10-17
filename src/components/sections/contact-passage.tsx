"use client";

import { useEffect, useRef, useState } from "react";

const phrases = [
  "Construir. Observar. Evoluir.",
  "Interfaces. Percepção. Robótica.",
];

export function ContactPassage() {
  const passage = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = passage.current;
    if (!root || !("IntersectionObserver" in window)) return;
    let visible = false;
    const update = () => {
      root.dataset.running = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(root);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      delete root.dataset.running;
    };
  }, []);

  return (
    <div
      ref={passage}
      className="contact-passage"
      data-paused={paused || undefined}
    >
      <div className="contact-ribbons" aria-hidden="true">
        {phrases.map((phrase) => (
          <div className="contact-ribbon" key={phrase}>
            <div className="ribbon-track">
              {[0, 1].map((copy) => (
                <div className="ribbon-group" key={copy}>
                  {[0, 1, 2].map((i) => (
                    <span key={i}>{phrase}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="ribbon-control"
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Retomar faixas" : "Pausar faixas"}
      </button>
    </div>
  );
}
