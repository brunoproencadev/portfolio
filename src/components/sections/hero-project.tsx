import Image from "next/image";
import { HeroProjectMotion } from "@/components/motion/hero-project-motion";
import { CinematicHero } from "./cinematic-hero";
import { projects } from "@/data/portfolio";
import { projectMedia } from "@/data/project-media";
import { ToolPopups } from "@/components/projects/tool-popups";
import styles from "./hero-project.module.css";

export function HeroProject() {
  const media = projectMedia.robo;
  return (
    <HeroProjectMotion>
      <CinematicHero />
      <div className="robo-visual">
        <figure className={`robo-frame ${styles.frame}`}>
          <div className="robo-media project-window">
            <div className="window-bar" aria-hidden="true">
              <span className="window-lights">
                <span />
                <span />
                <span />
              </span>
              <span>{projects[0].name}</span>
            </div>
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
        <ToolPopups tools={projects[0].stack} name={projects[0].name} />
      </div>
    </HeroProjectMotion>
  );
}
