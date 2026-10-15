import { SelectedWork } from "@/components/sections/selected-work";
import { manrope } from "@/fonts/manrope";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { HeroProject } from "@/components/sections/hero-project";
import { HomeMotion } from "@/components/motion/home-motion";
import { profile, skills } from "@/data/portfolio";

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

        <SelectedWork />

        <section
          className="section page-container about-section"
          aria-labelledby="sobre"
        >
          <div className="about-heading">
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
          className="section page-container skills-section"
          aria-labelledby="competencias"
        >
          <div className="section-heading">
            <div>
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

        <div className="contact-passage" aria-hidden="true">
          <div className="contact-ribbon">
            Construir. Observar. Evoluir. Construir. Observar. Evoluir.
          </div>
          <div className="contact-ribbon">
            Interfaces. Percepção. Robótica. Interfaces. Percepção. Robótica.
          </div>
        </div>
        <section
          className="section page-container contact-section"
          aria-labelledby="contato"
        >
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
    </div>
  );
}
