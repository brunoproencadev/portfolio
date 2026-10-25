import { profile } from "@/data/portfolio";
import { manrope } from "@/fonts/manrope";
import { HeroAvatarLetter } from "./hero-avatar-letter";

export function CinematicHero() {
  const [firstName, ...surname] = profile.name.split(" ");

  return (
    <section className={`hero ${manrope.className}`} aria-labelledby="inicio">
      <div className="hero-light" aria-hidden="true">
        <div className="hero-arc">
          <svg viewBox="0 0 1440 700" preserveAspectRatio="none">
            <defs>
              <filter
                id="hero-halo"
                x="-30%"
                y="-100%"
                width="160%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="38" />
              </filter>
              <filter
                id="hero-edge"
                x="-30%"
                y="-100%"
                width="160%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            <path
              d="M-80 344 Q720 824 1520 344"
              stroke="#7350d6"
              strokeWidth="76"
              opacity=".65"
              filter="url(#hero-halo)"
            />
            <path
              d="M-80 361 Q720 841 1520 361"
              stroke="#bda4ff"
              strokeWidth="14"
              opacity=".8"
              filter="url(#hero-edge)"
            />
            <path
              className="hero-arc-edge"
              d="M-80 365 Q720 845 1520 365"
              stroke="#f5f3ff"
              strokeWidth="2"
              opacity=".9"
            />
          </svg>
        </div>
      </div>
      <div className="hero-content">
        <h1 id="inicio" tabIndex={-1} aria-label={profile.name}>
          <span className="hero-title-mask">
            <span className="hero-title-line">
              {firstName.slice(0, -1)}
              <HeroAvatarLetter letter={firstName.slice(-1)} />
            </span>
          </span>{" "}
          <span className="hero-title-mask">
            <span className="hero-title-line">{surname.join(" ")}</span>
          </span>
        </h1>
        <p className="hero-position">{profile.position}.</p>
        <p className="hero-description">{profile.introduction}</p>
        <div className="hero-actions">
          <a className="hero-button hero-primary" href="#projetos">
            Explorar projetos
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v16m-6-6 6 6 6-6" />
            </svg>
          </a>
          <a
            className="hero-button hero-secondary"
            href={profile.links[0].href}
          >
            GitHub
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 19 19 5M5 5h14v14" />
            </svg>
          </a>
        </div>
      </div>
      <div className="hero-outro">
        <p className="hero-end">
          {profile.fields}
          <span>Construir. Observar. Evoluir.</span>
        </p>
      </div>
    </section>
  );
}
