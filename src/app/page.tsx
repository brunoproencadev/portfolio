import { ProjectIllustration } from "@/components/projects/project-illustration";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { HomeMotion } from "@/components/motion/home-motion";
import { profile, projects, skills } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteNavigation />
      <main id="conteudo" tabIndex={-1}>
        <section className="hero page-container" aria-labelledby="inicio">
          <div className="hero-copy">
            <p className="eyebrow">{profile.position}</p>
            <h1 id="inicio" tabIndex={-1}>
              {profile.name}
            </h1>
            <p className="hero-headline">
              Construir. Observar. <em>Evoluir.</em>
            </p>
            <p className="hero-fields">{profile.fields}</p>
            <p className="hero-introduction">{profile.introduction}</p>
            <div className="link-row">
              <a className="button-link button-primary" href="#projetos">
                Explorar projetos <span aria-hidden="true">↘</span>
              </a>
              <a className="text-link" href={profile.links[0].href}>
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <figure className="hero-notebook">
            <figcaption className="eyebrow">
              Caderno de engenharia / 01
            </figcaption>
            <div className="notebook-orbit" aria-hidden="true">
              <div className="orbit-ring orbit-one" />
              <div className="orbit-ring orbit-two" />
              <span className="orbit-center">observar</span>
              <span className="orbit-note note-one">entrada</span>
              <span className="orbit-note note-two">contexto</span>
              <span className="orbit-note note-three">evidência</span>
            </div>
            <HomeMotion />
            <p className="notebook-caption">
              Da ideia à evidência.
              <br />
              <span>Esquema conceitual autoral</span>
            </p>
          </figure>
          <div className="hero-footnote">
            <span>Software / Percepção / Experimentação</span>
            <a className="text-link" href="#projetos">
              Conheça os trabalhos <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="section page-container" aria-labelledby="projetos">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Projetos selecionados</p>
              <h2 id="projetos" tabIndex={-1}>
                Ideias em <em>construção.</em>
              </h2>
            </div>
            <p>
              O problema, as escolhas e até onde cada resultado foi validado.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className="project-card"
                key={project.slug}
                aria-labelledby={`titulo-${project.slug}`}
              >
                <figure className={`project-artwork artwork-${project.slug}`}>
                  <div className="artwork-index" aria-hidden="true">
                    0{index + 1} / {project.category}
                  </div>
                  <ProjectIllustration slug={project.slug} />
                  <figcaption>
                    <span>Esquema conceitual</span>
                    {project.visualCaption}
                  </figcaption>
                </figure>
                <div className="project-content">
                  <p className="eyebrow">{project.category}</p>
                  <h3 id={`titulo-${project.slug}`}>{project.name}</h3>
                  <p>{project.summary}</p>
                  <ul
                    className="tag-list"
                    aria-label={`Tecnologias de ${project.name}`}
                  >
                    {project.stack.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <p className="project-status">
                    <span>Estado</span>
                    {project.status}
                  </p>
                  <p className="project-evidence">
                    <span>Fonte</span>
                    {project.evidence}
                  </p>
                  <a
                    className="project-link"
                    href={project.repository}
                    aria-label={`Ver repositório de ${project.name}`}
                  >
                    Ver repositório <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section page-container about-section"
          aria-labelledby="sobre"
        >
          <div>
            <p className="eyebrow">02 / Sobre & processo</p>
            <h2 id="sobre" tabIndex={-1}>
              Aprender,
              <br />
              <em>construindo.</em>
            </h2>
          </div>
          <div className="about-copy">
            <p className="large-copy">{profile.about}</p>
            <div className="process-note">
              <span aria-hidden="true">↳</span>
              <p>
                Uma interface precisa comunicar. Um experimento precisa de
                contexto. Em ambos, a próxima decisão começa pelo que é possível
                observar.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section page-container"
          aria-labelledby="competencias"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / Competências</p>
              <h2 id="competencias" tabIndex={-1}>
                Ferramentas com <em>contexto.</em>
              </h2>
            </div>
            <p>
              Tecnologias utilizadas nos projetos, com uma fonte para cada
              aplicação.
            </p>
          </div>
          <div className="skill-list">
            {skills.map((skill, index) => (
              <article className="skill-row" key={skill.title}>
                <span className="skill-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3>{skill.title}</h3>
                  <p>{skill.technologies}</p>
                </div>
                <div>
                  <p>{skill.evidence}</p>
                  <a className="text-link" href={skill.project.repository}>
                    Consultar projeto <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="study-note">
            Em estudo e exploração: Java/Spring, IA/ML e robótica.
          </p>
        </section>

        <section
          className="section page-container contact-section"
          aria-labelledby="contato"
        >
          <p className="eyebrow">04 / Contato</p>
          <h2 id="contato" tabIndex={-1}>
            {profile.contact}
          </h2>
          <p>
            Interfaces, percepção ou uma ideia que ainda está tomando forma.
          </p>
          <div className="contact-links">
            {profile.links.map((link) => (
              <a key={link.label} className="button-link" href={link.href}>
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <footer className="page-container site-footer">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a className="text-link" href="#inicio">
          Voltar ao início <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  );
}
