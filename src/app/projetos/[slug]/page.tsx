import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectIllustration } from "@/components/projects/project-illustration";
import { getCaseStudy } from "@/data/case-studies";
import { profile, projects } from "@/data/portfolio";

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
  return {
    title: `${study.name} | Bruno Proença Silva`,
    description: study.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  return (
    <>
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
            <p className="eyebrow">Case / {study.category}</p>
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
          <figure className="case-diagram project-artwork">
            <ProjectIllustration
              slug={study.slug}
              description={study.diagramDescription}
            />
            <figcaption>
              <span>Esquema conceitual autoral</span>
              {study.visualCaption}. Representação do fluxo; as evidências estão
              nas fontes abaixo.
            </figcaption>
          </figure>
          <section className="case-section" aria-labelledby="contexto">
            <div>
              <p className="eyebrow">01 / Contexto</p>
              <h2 id="contexto">O problema</h2>
            </div>
            <p>{study.context}</p>
          </section>
          <section className="case-section" aria-labelledby="abordagem">
            <div>
              <p className="eyebrow">02 / Abordagem</p>
              <h2 id="abordagem">Como foi construído</h2>
            </div>
            <div>
              <p>{study.approach}</p>
              <ol className="case-list">
                {study.architecture.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </section>
          <section className="case-section" aria-labelledby="decisoes">
            <div>
              <p className="eyebrow">03 / Decisões</p>
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
              <p className="eyebrow">04 / Evidências</p>
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
              <p className="eyebrow">
                Fontes conferidas em 10/10/2026, vinculadas à revisão do código
                consultada.
              </p>
            </div>
          </section>
          <section className="case-section" aria-labelledby="limites">
            <div>
              <p className="eyebrow">05 / Limites</p>
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
              <p className="eyebrow">06 / Aprendizados</p>
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
          <p className="eyebrow">Continuar explorando</p>
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
    </>
  );
}
