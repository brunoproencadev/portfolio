import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/portfolio";
import { projectMedia } from "@/data/project-media";
import type { ReactNode } from "react";

type Project = (typeof projects)[number];

function ProjectWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="project-window">
      <div className="window-bar" aria-hidden="true">
        <span className="window-lights">
          <span />
          <span />
          <span />
        </span>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="work-links">
      <Link
        href={`/projetos/${project.slug}`}
        prefetch={false}
        aria-label={`Ler case de ${project.name}`}
      >
        Ler case <Arrow />
      </Link>
      <a
        className="project-link"
        href={project.repository}
        aria-label={`Ver repositório de ${project.name}`}
      >
        Ver repositório <Arrow />
      </a>
      {project.slug === "industry-week-senai" && (
        <a href={projectMedia.industryLive}>
          Abrir demonstração <Arrow />
        </a>
      )}
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="work-details">
      <p className="work-summary">{project.summary}</p>
      <ul className="work-stack" aria-label={`Tecnologias de ${project.name}`}>
        {project.stack.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <dl className="work-evidence">
        <div>
          <dt>Estado</dt>
          <dd>{project.status}</dd>
        </div>
        <div>
          <dt>Fonte</dt>
          <dd>{project.evidence}</dd>
        </div>
      </dl>
    </div>
  );
}

export function SelectedWork() {
  const [robo, industry, atelie] = projects;
  const scenes = [
    { project: industry, media: projectMedia.industry[0] },
    { project: atelie, media: projectMedia.atelie },
  ];
  return (
    <section className="selected-work" aria-labelledby="projetos">
      <div className="work-introduction page-container">
        <h2 id="projetos" tabIndex={-1}>
          Ideias em <em>construção.</em>
        </h2>
        <p>O problema, as escolhas e até onde cada resultado foi validado.</p>
      </div>
      <article
        className="work-robo page-container"
        aria-labelledby={`titulo-${robo.slug}`}
      >
        <div className="work-title">
          <h3 id={`titulo-${robo.slug}`}>{robo.name}</h3>
          <p>{robo.category}</p>
        </div>
        <div className="work-context">
          <ProjectDetails project={robo} />
          <ProjectLinks project={robo} />
        </div>
      </article>
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
            {scenes.map(({ project, media }, index) => (
              <div className="story-band" key={media.src}>
                <div className="story-title">
                  <p>{project.name}</p>
                  <span>{project.category}</span>
                </div>
                <figure className="story-slide">
                  <ProjectWindow title={project.name}>
                    <div className="story-image">
                      <Image
                        src={media.src}
                        alt={media.alt}
                        width={media.width}
                        height={media.height}
                        sizes="(min-width: 900px) 42vw, 90vw"
                      />
                    </div>
                  </ProjectWindow>
                  <figcaption>
                    {index === 1
                      ? "Prévia do catálogo · detalhes e captura completa a seguir."
                      : media.caption}
                  </figcaption>
                </figure>
                <p className="story-category">{project.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <article
        className="work-industry"
        aria-labelledby={`titulo-${industry.slug}`}
      >
        <div className="industry-context page-container">
          <div className="work-title">
            <h3 id={`titulo-${industry.slug}`}>{industry.name}</h3>
            <p>{industry.category}</p>
          </div>
          <div className="work-context">
            <ProjectDetails project={industry} />
            <ProjectLinks project={industry} />
          </div>
        </div>
      </article>
      <article
        className="work-atelie page-container"
        aria-labelledby={`titulo-${atelie.slug}`}
      >
        <div className="atelie-copy">
          <div className="work-title">
            <h3 id={`titulo-${atelie.slug}`}>{atelie.name}</h3>
            <p>{atelie.category}</p>
          </div>
          <ProjectDetails project={atelie} />
          <ProjectLinks project={atelie} />
        </div>
        <figure className="atelie-frame">
          <ProjectWindow title={atelie.name}>
            <div className="atelie-preview">
              <Image
                src={projectMedia.atelie.src}
                width={projectMedia.atelie.width}
                height={projectMedia.atelie.height}
                alt="Prévia do catálogo do Ateliê Ingrid Xavier. Captura completa disponível no link abaixo."
                sizes="(min-width: 900px) 42vw, 90vw"
              />
            </div>
          </ProjectWindow>
          <figcaption>
            {projectMedia.atelie.caption}
            <a className="text-link" href={projectMedia.atelie.src}>
              Abrir captura completa <span aria-hidden="true">↗</span>
            </a>
          </figcaption>
        </figure>
      </article>
    </section>
  );
}
