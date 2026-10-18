import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProjectIllustration } from "@/components/projects/project-illustration";
import { getCaseStudy } from "@/data/case-studies";
import { profile, projects } from "@/data/portfolio";
import { pageMetadata } from "@/config/site";
import { manrope } from "@/fonts/manrope";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  return pageMetadata(
    `${study.name} | Bruno Proença Silva`,
    study.summary,
    `/projetos/${study.slug}`,
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  return (
    <div className={`case-page ${manrope.className}`}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="case-header page-container">
        <Link
          href="/"
          className="wordmark"
          aria-label="BP/ — Bruno Proença — início"
        >
          BP<span aria-hidden="true">/</span>
        </Link>
        <Link href="/#projetos" className="text-link">
          Todos os projetos
        </Link>
      </header>
      <main id="conteudo" tabIndex={-1} className="page-container case-main">
        <article>
          <header className="case-intro">
            <h1>{study.name}</h1>
            <p className="large-copy">{study.summary}</p>
            <ul className="tag-list" aria-label="Tecnologias utilizadas">
              {study.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="case-status">
              <strong>Estado do projeto</strong>
              <br />
              {study.status}
            </p>
            <div className="link-row">
              <a className="button-link button-primary" href={study.repository}>
                Ver repositório <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href={profile.links[2].href}>
                Conversar por e-mail
              </a>
            </div>
          </header>
          <div className="case-media" aria-label="Capturas reais do projeto">
            {study.media.map((media, index) => (
              <figure key={media.src}>
                <div
                  className="case-media-window"
                  role="region"
                  aria-label={`Captura ${index + 1} de ${study.name}`}
                  tabIndex={0}
                >
                  <Image
                    src={media.src}
                    width={media.width}
                    height={media.height}
                    alt={media.alt}
                    sizes="(min-width: 1408px) 1280px, (min-width: 900px) calc(100vw - 128px), (min-width: 600px) calc(100vw - 64px), calc(100vw - 40px)"
                  />
                </div>
                <figcaption>
                  <p>{media.caption}</p>
                  <a className="text-link" href={media.src}>
                    Abrir captura completa
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
          <section className="case-section" aria-labelledby="contexto">
            <div>
              <h2 id="contexto">O problema</h2>
            </div>
            <p>{study.context}</p>
          </section>
          <section className="case-section" aria-labelledby="abordagem">
            <div>
              <h2 id="abordagem">Como foi construído</h2>
            </div>
            <div>
              <p>{study.approach}</p>
              <ol className="case-list">
                {study.architecture.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <figure className="case-diagram project-artwork">
                <ProjectIllustration
                  slug={study.slug}
                  description={study.diagramDescription}
                />
                <figcaption>
                  <strong>Esquema conceitual autoral</strong>
                  <p>
                    {study.visualCaption}. Representação do fluxo, sem dados de
                    execução.
                  </p>
                </figcaption>
              </figure>
            </div>
          </section>
          <section className="case-section" aria-labelledby="decisoes">
            <div>
              <h2 id="decisoes">Escolhas e desafios</h2>
            </div>
            <ul className="case-list">
              {study.decisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
          </section>
          <section className="case-section" aria-labelledby="evidencias">
            <div>
              <h2 id="evidencias">O que sustenta o case</h2>
            </div>
            <div>
              <p>{study.evidenceSummary}</p>
              <ul className="case-sources">
                {study.sources.map((source) => (
                  <li key={source.path}>
                    <a
                      className="text-link"
                      href={`${study.repository}/blob/${study.revision}/${source.path}`}
                    >
                      {source.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="case-source-note">
                Fontes reconferidas em{" "}
                <time dateTime={study.sourcesCheckedAt}>18/10/2026</time>,
                vinculadas à revisão do código consultada. Os ensaios e testes
                dos projetos não foram reexecutados para este case.
              </p>
            </div>
          </section>
          <section className="case-section" aria-labelledby="limites">
            <div>
              <h2 id="limites">Até onde foi validado</h2>
            </div>
            <ul className="case-list">
              {study.limitations.map((limit) => (
                <li key={limit}>{limit}</li>
              ))}
            </ul>
          </section>
          <section className="case-section" aria-labelledby="aprendizados">
            <div>
              <h2 id="aprendizados">A próxima decisão</h2>
            </div>
            <div>
              <p>{study.learning}</p>
              <h3 className="case-next-heading">Próximos passos</h3>
              <p>{study.next}</p>
            </div>
          </section>
        </article>
        <nav className="case-other-projects" aria-label="Outros cases">
          <p>Continuar explorando</p>
          {projects
            .filter((project) => project.slug !== study.slug)
            .map((project) => (
              <Link
                key={project.slug}
                className="button-link"
                href={`/projetos/${project.slug}`}
                prefetch={false}
              >
                {project.name}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
        </nav>
      </main>
      <footer className="page-container site-footer">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <Link className="text-link" href="/#contato">
          Contato
        </Link>
      </footer>
    </div>
  );
}
