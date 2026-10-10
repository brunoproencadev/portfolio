import type { ProjectSlug } from "@/data/portfolio";

export function ProjectIllustration({ slug }: { slug: ProjectSlug }) {
  return (
    <svg
      viewBox="0 0 480 260"
      fill="none"
      className="project-illustration"
      aria-hidden="true"
      focusable="false"
    >
      {slug === "robosense-lab" && (
        <>
          <path d="M40 50h50M40 50v50m400-50h-50m50 0v50M40 210h50m-50 0v-50m400 50h-50m50 0v-50" />
          <ellipse cx="240" cy="130" rx="145" ry="65" />
          <path d="M95 130h290M240 65v130" strokeDasharray="4 8" />
          <circle cx="267" cy="116" r="30" className="sketch-accent" />
          <path
            d="M227 85h16m-16 0v16m80-16h-16m16 0v16m-80 46h16m-16 0v-16m80 16h-16m16 0v-16"
            className="sketch-accent"
          />
        </>
      )}
      {slug === "industry-week-senai" && (
        <>
          <path d="M50 180h380" />
          <path
            d="M80 165V95m105 70V75m105 90V55m105 110V35"
            strokeDasharray="4 8"
          />
          <circle cx="80" cy="180" r="7" />
          <circle cx="185" cy="180" r="7" />
          <circle cx="290" cy="180" r="7" />
          <circle cx="395" cy="180" r="7" className="sketch-accent" />
          <path d="M60 130l20-35 20 35H60Zm105-20V75h40v35h-40Zm105-20V55h40v35h-40Zm105-20V35h40v35h-40Z" />
          <path d="M50 210h65m40 0h65m40 0h65m40 0h65" />
        </>
      )}
      {slug === "atelie-ingrid-xavier" && (
        <>
          <rect x="58" y="40" width="126" height="180" rx="6" />
          <path d="M78 160h86m-86 20h60m-60 20h38" />
          <path d="M99 88c0-28 45-28 45 0l12 51H87l12-51Z" />
          <path d="M198 130h37m-10-8 12 8-12 8" className="sketch-accent" />
          <rect x="251" y="66" width="170" height="128" rx="6" />
          <path d="M276 94h100m-100 22h70" />
          <rect
            x="276"
            y="143"
            width="120"
            height="26"
            rx="13"
            className="sketch-accent"
          />
          <path d="M293 156h62m10 0h13" className="sketch-accent" />
        </>
      )}
    </svg>
  );
}
