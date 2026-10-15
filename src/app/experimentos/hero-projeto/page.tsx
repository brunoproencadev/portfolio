import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { CinematicHero } from "@/components/sections/cinematic-hero";
import { profile, projects, skills } from "@/data/portfolio";
import { projectMedia } from "@/data/project-media";
import { manrope } from "@/fonts/manrope";
import { ScrollStudy } from "./scroll-study";
import styles from "./study.module.css";

export const metadata: Metadata = {
  title: "Estudo local — hero e RoboSense",
  robots: { index: false, follow: false },
};

export default function HeroProjectStudy() {
  // This disposable review surface must not be served by production builds.
  if (process.env.NODE_ENV !== "development") notFound();
  const project = projects[0];
  const media = projectMedia.robo;

  return (
    <div className={`home-page ${manrope.className} ${styles.study}`}>
      <a className="skip-link" href="#projetos">
        Pular para o projeto
      </a>
      <SiteNavigation />
      <main>
        <ScrollStudy>
          <CinematicHero />
          <figure className={styles.frame}>
            <Image
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              sizes="(min-width: 900px) 960px, 90vw"
              priority
            />
            <figcaption>{media.caption}</figcaption>
          </figure>
        </ScrollStudy>
        <section className={`page-container ${styles.context}`}>
          <h2 id="projetos" tabIndex={-1}>
            {project.name}
          </h2>
          <p className="large-copy">{project.summary}</p>
          <p>{project.status}</p>
          <div className="link-row">
            <Link className="text-link" href={`/projetos/${project.slug}`}>
              Ler o case
            </Link>
            <a className="text-link" href={project.repository}>
              Consultar repositório
            </a>
            <a className="text-link" href="#inicio">
              Rever a passagem
            </a>
          </div>
        </section>
        <aside
          className={`page-container ${styles.review}`}
          aria-label="Revisão do estudo"
        >
          <p>
            Estudo local da passagem hero → projeto. Role nos dois sentidos; use
            também “Explorar projetos” e o menu. Em telas estreitas ou com
            movimento reduzido, a leitura segue em fluxo normal.
          </p>
          <Link className="text-link" href="/">
            Abrir a home atual
          </Link>
        </aside>
        <section className={`page-container ${styles.context}`}>
          <h2 id="sobre" tabIndex={-1}>
            Aprender, construindo.
          </h2>
          <p>{profile.about}</p>
        </section>
        <section className={`page-container ${styles.context}`}>
          <h2 id="competencias" tabIndex={-1}>
            Ferramentas com contexto.
          </h2>
          {skills.map((skill) => (
            <p key={skill.title}>
              {skill.title}: {skill.technologies}
            </p>
          ))}
        </section>
        <section className={`page-container ${styles.context}`}>
          <h2 id="contato" tabIndex={-1}>
            {profile.contact}
          </h2>
          <div className="link-row">
            {profile.links.map((link) => (
              <a className="text-link" href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
