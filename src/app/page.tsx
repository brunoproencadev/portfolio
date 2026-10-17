import { SelectedWork } from "@/components/sections/selected-work";
import { manrope } from "@/fonts/manrope";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { HeroProject } from "@/components/sections/hero-project";
import { HomeMotion } from "@/components/motion/home-motion";
import { profile, projects, skills } from "@/data/portfolio";
import { ProjectContent } from "@/components/projects/project-content";
import { LinkIcon } from "@/components/projects/link-icon";
import { ContactPassage } from "@/components/sections/contact-passage";

export default function Home() {
  return (
    <div className={`home-page ${manrope.className}`}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteNavigation />
      <main id="conteudo" tabIndex={-1}>
        <HeroProject />
        <HomeMotion />

        <article
          className="work-robo page-container"
          aria-labelledby="titulo-robosense-lab"
          data-scroll-copy
        >
          <ProjectContent project={projects[0]} />
        </article>

        <section
          className="section page-container about-section"
          aria-labelledby="sobre"
        >
          <div className="about-heading" data-scroll-copy>
            <h2 id="sobre" tabIndex={-1}>
              Aprender,
              <br />
              <em>construindo.</em>
            </h2>
          </div>
          <div className="about-copy">
            <div className="about-sweep" aria-hidden="true">
              {profile.fields}
            </div>
            <p className="large-copy">{profile.about}</p>
            <div className="process-note">
              <LinkIcon name="turn" />
              <p>
                <strong>Uma interface precisa comunicar.</strong> Um experimento
                precisa de contexto. Em ambos, a próxima decisão começa pelo que
                é possível observar.
              </p>
            </div>
          </div>
        </section>

        <SelectedWork />

        <section
          className="section page-container skills-section"
          aria-labelledby="competencias"
        >
          <div className="section-heading" data-scroll-copy>
            <div>
              <h2 id="competencias" tabIndex={-1}>
                Ferramentas com <em>contexto.</em>
              </h2>
            </div>
            <p>
              <strong>Tecnologias utilizadas nos projetos</strong>, com uma
              fonte para cada aplicação.
            </p>
          </div>
          <div className="skill-list">
            {skills.map((skill) => (
              <article className="skill-row" key={skill.title}>
                <div>
                  <h3>{skill.title}</h3>
                  <p>{skill.technologies}</p>
                </div>
                <div>
                  <p>{skill.evidence}</p>
                  <a className="text-link" href={skill.project.repository}>
                    Consultar projeto <LinkIcon name="arrow" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="study-note">
            Em estudo e exploração: Java/Spring, IA/ML e robótica.
          </p>
        </section>

        <ContactPassage />
        <section
          className="section page-container contact-section"
          aria-labelledby="contato"
        >
          <div data-scroll-copy>
            <h2 id="contato" tabIndex={-1}>
              {profile.contact}
            </h2>
            <p>
              Interfaces, percepção ou uma ideia que ainda está tomando forma.
            </p>
          </div>
          <div className="contact-actions">
            <a
              className="contact-email"
              href="mailto:brunoproencasilva@gmail.com"
            >
              brunoproencasilva@gmail.com
            </a>
            <div className="contact-links">
              {[profile.links[2], profile.links[1], profile.links[0]].map(
                (link) => (
                  <a key={link.label} className="button-link" href={link.href}>
                    <LinkIcon name={link.label} />
                    {link.label}
                  </a>
                ),
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="page-container site-footer">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a className="text-link" href="#inicio">
          Voltar ao início <LinkIcon name="up" />
        </a>
      </footer>
    </div>
  );
}
