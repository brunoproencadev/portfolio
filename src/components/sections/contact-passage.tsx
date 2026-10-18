"use client";

import { useEffect, useRef } from "react";
import { startRibbonLoop } from "../motion/ribbon-loop";

const phrases = [
  "Construir. Observar. Evoluir.",
  "Interfaces. Percepção. Robótica.",
];

export function ContactPassage() {
  const passage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = passage.current;
    if (root) return startRibbonLoop(root);
  }, []);

  return (
    <div ref={passage} className="contact-passage">
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
    </div>
  );
}
