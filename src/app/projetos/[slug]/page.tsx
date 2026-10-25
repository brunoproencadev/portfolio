import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseMotion } from "@/components/motion/case-motion";
import { CaseCapture } from "@/components/projects/case-capture";
import { LinkIcon } from "@/components/projects/link-icon";
import { ProjectIllustration } from "@/components/projects/project-illustration";
import { ContactPassage } from "@/components/sections/contact-passage";
import { caseProjects, getCaseStudy } from "@/data/case-studies";
import { profile } from "@/data/portfolio";
import { pageMetadata } from "@/config/site";
import { manrope } from "@/fonts/manrope";
import "@/styles/cases.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return caseProjects.map(({ slug }) => ({ slug }));
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
    <CaseMotion key={study.slug} className={`case-page ${manrope.className}`}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="case-header page-container">
        <Link
          href="/"
          className="wordmark"
          aria-label="BP/ — Bruno Proença — início"
        >
          <Image
            src="/images/profile/github-avatar.png"
            width={36}
            height={36}
            alt=""
          />
          <span>{profile.shortName}</span>
        </Link>
        <Link
          href="/#projetos"
          className="case-back"
          aria-label="Todos os projetos"
        >
          Projetos <LinkIcon name="arrow" />
        </Link>
      </header>
      <main id="conteudo" tabIndex={-1} className="case-main">
        <article>
          <div className="case-scene">
            <div className="case-scene-stage">
              <div className="case-light" aria-hidden="true">
                <svg
                  viewBox="0 0 1440 700"
                  preserveAspectRatio="none"
                  fill="none"
                  focusable="false"
                >
                  <defs>
                    <filter id="case-halo">
                      <feGaussianBlur stdDeviation="38" />
                    </filter>
                    <filter id="case-edge">
                      <feGaussianBlur stdDeviation="7" />
                    </filter>
                  </defs>
                  <path
                    d="M-80 344 Q720 824 1520 344"
                    stroke="#7350d6"
                    strokeWidth="76"
                    opacity=".65"
                    filter="url(#case-halo)"
                  />
                  <path
                    d="M-80 361 Q720 841 1520 361"
                    stroke="#bda4ff"
                    strokeWidth="14"
                    opacity=".8"
                    filter="url(#case-edge)"
                  />
                  <path
                    d="M-80 365 Q720 845 1520 365"
                    stroke="#f5f3ff"
                    strokeWidth="2"
                    opacity=".9"
                  />
                </svg>
              </div>
              <div className="page-container case-opening">
                <header className="case-intro">
                  <h1>{study.name}</h1>
                  <p className="case-category">{study.category}</p>
                  <p className="large-copy">{study.summary}</p>
                  <ul className="tag-list" aria-label="Tecnologias utilizadas">
                    {study.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="link-row">
                    <a
                      className="button-link button-primary"
                      href={study.repository}
                    >
                      Ver repositório <LinkIcon name="arrow" />
                    </a>
                    <a className="text-link" href={profile.links[2].href}>
                      Conversar por e-mail
                    </a>
                  </div>
                  <p className="case-scroll-cue" aria-hidden="true">
                    Explore o projeto <LinkIcon name="up" />
                  </p>
                </header>
                <CaseCapture
                  media={study.media[0]}
                  name={study.name}
                  cover={study.slug === "museu-arte-moderna"}
                />
              </div>
            </div>
          </div>
          <div className="case-body">
            <div className="page-container">
              <p className="case-status">
                <strong>Estado do projeto</strong>
                <span>{study.status}</span>
              </p>
              <section className="case-section" aria-labelledby="contexto">
                <div className="case-chapter">
                  <h2 id="contexto">O problema</h2>
                </div>
                <div className="case-copy">
                  <p className="case-lead">{study.context}</p>
                  {study.contributors.length > 0 && (
                    <div className="case-credits">
                      <h3>Desenvolvido em conjunto</h3>
                      <ul>
                        {study.contributors.map((name) => (
                          <li key={name}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
              <section className="case-section" aria-labelledby="abordagem">
                <div className="case-chapter">
                  <h2 id="abordagem">Como foi construído</h2>
                </div>
                <div className="case-copy">
                  <p>{study.approach}</p>
                  <ol className="case-list case-architecture">
                    {study.architecture.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  {study.slug !== "museu-arte-moderna" &&
                    study.diagramDescription && (
                      <figure className="case-diagram project-artwork">
                        <ProjectIllustration
                          slug={study.slug}
                          description={study.diagramDescription}
                        />
                        <figcaption>
                          <strong>Esquema conceitual autoral</strong>
                          <p>
                            {study.visualCaption}. Representação do fluxo, sem
                            dados de execução.
                          </p>
                        </figcaption>
                      </figure>
                    )}
                </div>
              </section>
              {study.media.slice(1).map((media, index) => (
                <CaseCapture
                  key={media.src}
                  media={media}
                  name={study.name}
                  index={index + 1}
                />
              ))}
              <section className="case-section" aria-labelledby="decisoes">
                <div className="case-chapter">
                  <h2 id="decisoes">Escolhas e desafios</h2>
                </div>
                <div className="case-copy">
                  <ul className="case-list">
                    {study.decisions.map((decision) => (
                      <li key={decision}>{decision}</li>
                    ))}
                  </ul>
                </div>
              </section>
              <section className="case-section" aria-labelledby="evidencias">
                <div className="case-chapter">
                  <h2 id="evidencias">O que sustenta o case</h2>
                </div>
                <div className="case-copy">
                  <p>{study.evidenceSummary}</p>
                  {study.narrativeSource && (
                    <p className="case-source-note case-author-note">
                      {study.narrativeSource}
                    </p>
                  )}
                  <ul className="case-sources">
                    {study.sources.map((source) => (
                      <li key={source.path}>
                        <a
                          className="text-link"
                          href={`${study.repository}/blob/${study.revision}/${source.path}`}
                        >
                          {source.label} <LinkIcon name="arrow" />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="case-source-note">
                    Fontes reconferidas em{" "}
                    <time dateTime={study.sourcesCheckedAt}>18/10/2026</time>,
                    vinculadas à revisão do código consultada. Os ensaios e
                    testes dos projetos não foram reexecutados para este case.
                  </p>
                </div>
              </section>
              <section className="case-section" aria-labelledby="limites">
                <div className="case-chapter">
                  <h2 id="limites">Até onde foi validado</h2>
                </div>
                <div className="case-copy">
                  <ul className="case-list">
                    {study.limitations.map((limit) => (
                      <li key={limit}>{limit}</li>
                    ))}
                  </ul>
                </div>
              </section>
              <section className="case-section" aria-labelledby="aprendizados">
                <div className="case-chapter">
                  <h2 id="aprendizados">A próxima decisão</h2>
                </div>
                <div className="case-copy">
                  <p className="case-lead">{study.learning}</p>
                  <h3 className="case-next-heading">Próximos passos</h3>
                  <p>{study.next}</p>
                </div>
              </section>
            </div>
          </div>
        </article>
        <ContactPassage />
        <nav
          className="case-other-projects page-container"
          aria-label="Outros cases"
        >
          <p>
            Continuar <em>explorando.</em>
          </p>
          {caseProjects
            .filter((project) => project.slug !== study.slug)
            .map((project) => (
              <Link
                key={project.slug}
                className="case-next-project"
                href={`/projetos/${project.slug}`}
                prefetch={false}
              >
                <span>{project.name}</span>
                <LinkIcon name="arrow" />
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
    </CaseMotion>
  );
}
