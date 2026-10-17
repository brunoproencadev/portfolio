import Image from "next/image";
import { projects } from "@/data/portfolio";
import { projectMedia } from "@/data/project-media";
import { ProjectContent } from "@/components/projects/project-content";
import { ToolPopups } from "@/components/projects/tool-popups";
import { LinkIcon } from "@/components/projects/link-icon";

export function SelectedWork() {
  const scenes = [
    { project: projects[1], media: projectMedia.industry[0] },
    { project: projects[2], media: projectMedia.atelie },
  ];
  return (
    <section className="selected-work" aria-labelledby="projetos">
      <div className="work-introduction page-container" data-scroll-copy>
        <h2 id="projetos" tabIndex={-1}>
          Ideias em <em>construção.</em>
        </h2>
        <p>O problema, as escolhas e até onde cada resultado foi validado.</p>
      </div>
      <div className="story-stage" role="region" aria-label="Projetos em foco">
        <div className="story-background" aria-hidden="true">
          {scenes.map(({ media }, index) => (
            <Image
              key={media.src}
              src={media.src}
              alt=""
              fill
              sizes="100vw"
              className={`story-backdrop story-backdrop-${index}`}
            />
          ))}
        </div>
        <div className="story-window">
          <div className="story-track">
            {scenes.map(({ project, media }) => (
              <article
                className="story-band"
                key={project.slug}
                aria-labelledby={`titulo-${project.slug}`}
              >
                <div className="story-visual">
                  <figure className="story-slide">
                    <div className="project-window">
                      <div className="window-bar" aria-hidden="true">
                        <span className="window-lights">
                          <span />
                          <span />
                          <span />
                        </span>
                        <span>{project.name}</span>
                      </div>
                      <div className="story-image">
                        <Image
                          src={media.src}
                          alt={media.alt}
                          width={media.width}
                          height={media.height}
                          sizes="(min-width: 1100px) 45vw, 90vw"
                        />
                      </div>
                    </div>
                    <figcaption>{media.caption}</figcaption>
                    {project.slug === "atelie-ingrid-xavier" && (
                      <a className="text-link" href={media.src}>
                        Abrir captura completa <LinkIcon name="arrow" />
                      </a>
                    )}
                  </figure>
                  <ToolPopups tools={project.stack} name={project.name} />
                </div>
                <ProjectContent project={project} />
              </article>
            ))}
          </div>
        </div>
        <nav
          className="story-progress page-container"
          aria-label="Navegar entre projetos"
        >
          <a href="#titulo-industry-week-senai">Industry Week</a>
          <span className="story-progress-rail" aria-hidden="true">
            <span className="story-progress-thumb" />
          </span>
          <a href="#titulo-atelie-ingrid-xavier">Ateliê Ingrid</a>
        </nav>
      </div>
    </section>
  );
}
