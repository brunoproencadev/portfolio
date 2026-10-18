import Link from "next/link";
import { projects } from "@/data/portfolio";
import { projectMedia } from "@/data/project-media";
import { additionalProjects } from "@/data/additional-projects";
import { LinkIcon } from "./link-icon";

export function ProjectContent({
  project,
}: {
  project: (typeof projects)[number] | (typeof additionalProjects)[number];
}) {
  const Heading = project.slug === "robosense-lab" ? "h2" : "h3";
  return (
    <div className="project-copy">
      <div className="work-title">
        <Heading id={`titulo-${project.slug}`} tabIndex={-1}>
          {project.name}
        </Heading>
        <p>{project.category}</p>
      </div>
      <p className="work-summary">{project.summary}</p>
      <ul className="work-stack" aria-label={`Tecnologias de ${project.name}`}>
        {project.stack.map((technology) => (
          <li key={technology}>
            <strong>{technology}</strong>
          </li>
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
      <div className="work-links">
        {projects.some(({ slug }) => slug === project.slug) && (
          <Link
            href={`/projetos/${project.slug}`}
            prefetch={false}
            aria-label={`Ler case de ${project.name}`}
          >
            Ler case <LinkIcon name="arrow" />
          </Link>
        )}
        <a
          href={project.repository}
          aria-label={`Ver repositório de ${project.name}`}
        >
          <LinkIcon name="GitHub" /> Repositório
        </a>
        {project.slug === "industry-week-senai" && (
          <a href={projectMedia.industryLive}>
            Demonstração <LinkIcon name="arrow" />
          </a>
        )}
      </div>
    </div>
  );
}
