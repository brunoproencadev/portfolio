import Image from "next/image";
import { HeroProjectMotion } from "@/components/motion/hero-project-motion";
import { CinematicHero } from "./cinematic-hero";
import { projects } from "@/data/portfolio";
import { projectMedia, toolIcons } from "@/data/project-media";
import styles from "./hero-project.module.css";

export function HeroProject() {
  const media = projectMedia.robo;
  return (
    <HeroProjectMotion>
      <CinematicHero />
      <figure className={`robo-frame ${styles.frame}`}>
        <div className="robo-media">
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes="(min-width: 900px) 960px, 90vw"
            priority
          />
        </div>
        <figcaption>{media.caption}</figcaption>
      </figure>
      <ul
        className={styles.tools}
        aria-label="Ferramentas usadas no RoboSense Lab"
      >
        {projects[0].stack.map((tool) => (
          <li key={tool} data-project-tool>
            <span className={styles.symbol} aria-hidden="true">
              <Image src={toolIcons[tool]} alt="" width={40} height={40} />
            </span>
            <span>{tool}</span>
          </li>
        ))}
      </ul>
    </HeroProjectMotion>
  );
}
