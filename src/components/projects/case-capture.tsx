import Image from "next/image";
import { LinkIcon } from "./link-icon";

type Capture = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export function CaseCapture({
  media,
  name,
  index = 0,
  cover = false,
}: {
  media: Capture;
  name: string;
  index?: number;
  cover?: boolean;
}) {
  return (
    <div className="case-media">
      <figure>
        <div className="project-window">
          <div className="window-bar" aria-hidden="true">
            <span className="window-lights">
              <span />
              <span />
              <span />
            </span>
            <span>{name}</span>
          </div>
          <div
            className={`case-media-window${cover ? " case-media-cover" : ""}`}
            role="region"
            aria-label={`Captura ${index + 1} de ${name}`}
            tabIndex={0}
          >
            <Image
              src={media.src}
              width={media.width}
              height={media.height}
              alt={media.alt}
              sizes="(min-width: 1408px) 1180px, (min-width: 900px) 85vw, 90vw"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        </div>
        <figcaption>
          <p>{media.caption}</p>
          <a className="text-link" href={media.src}>
            Abrir captura completa <LinkIcon name="arrow" />
          </a>
        </figcaption>
      </figure>
    </div>
  );
}
