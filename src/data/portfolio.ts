export const profile = {
  name: "Bruno Proença Silva",
  shortName: "Bruno Proença",
  position: "Desenvolvedor em formação",
  fields: "Software, visão computacional e robótica.",
  introduction:
    "Exploro interfaces e sistemas de percepção por meio de projetos reais, experimentação e engenharia.",
  about:
    "Aprendo construindo: da experiência de uma interface aos sinais que um sistema de visão precisa interpretar. Meu trabalho reúne desenvolvimento web e experimentos em robótica, com decisões documentadas e limites claros.",
  contact: "Vamos conversar sobre o próximo desafio.",
  links: [
    { label: "GitHub", href: "https://github.com/brunoproencadev" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/brunoproencasilva",
    },
    { label: "E-mail", href: "mailto:brunoproencasilva@gmail.com" },
  ],
} as const;

export const sections = [
  { id: "inicio", label: "Início" },
  { id: "projetos", label: "Projetos" },
  { id: "sobre", label: "Sobre" },
  { id: "competencias", label: "Competências" },
  { id: "contato", label: "Contato" },
] as const;
export type SectionId = (typeof sections)[number]["id"];

// Fontes e limites editoriais: docs/CONTENT.md e docs/PROFILE_RESEARCH.md.
export const projects = [
  {
    slug: "robosense-lab",
    name: "RoboSense Lab",
    category: "Visão computacional",
    summary:
      "Um laboratório de percepção para investigar detecção de bola, validade dos frames e limites de tracking em robótica.",
    stack: ["Python", "NumPy", "OpenCV", "PySerial"],
    status:
      "Experimental: simulação, vídeos gravados e ensaio ao vivo; hardware ainda exige validação.",
    repository: "https://github.com/brunoproencadev/robosense-lab",
    evidence: "README, arquitetura e validação M3 no repositório.",
    visualCaption: "Aquisição → validade → observação",
  },
  {
    slug: "industry-week-senai",
    name: "Industry Week SENAI",
    category: "Experiência web",
    summary:
      "Uma narrativa interativa sobre a evolução industrial, desenvolvida para o evento Engrenagens do Tempo.",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "GSAP", "Motion"],
    status: "Interface implementada; demonstração indicada pelo repositório.",
    repository: "https://github.com/brunoproencadev/industry-week-senai-prj",
    evidence: "Código da aplicação e demonstração indicada no README.",
    visualCaption: "Uma narrativa organizada por eras",
  },
  {
    slug: "atelie-ingrid-xavier",
    name: "Ateliê Ingrid Xavier",
    category: "Aplicação web",
    summary:
      "Catálogo de peças artesanais com informações confirmadas e acesso contextual ao atendimento pelo WhatsApp.",
    stack: ["Next.js", "React", "TypeScript"],
    status:
      "Frontend local validado conforme documentação; publicação e CMS pendentes.",
    repository: "https://github.com/brunoproencadev/atelie-ingridxavier",
    evidence: "Catálogo, código e registro de validação local no repositório.",
    visualCaption: "Peça → informação → atendimento",
  },
] as const;
export type ProjectSlug = (typeof projects)[number]["slug"];

export const skills = [
  {
    title: "Percepção e experimentação",
    technologies: "Python · NumPy · OpenCV · PySerial",
    evidence: "Aquisição, detecção e tracking experimental no RoboSense Lab.",
    project: projects[0],
  },
  {
    title: "Interfaces e narrativa",
    technologies: "TypeScript · React · Tailwind · Vite · GSAP · Motion",
    evidence: "Capítulos e interação na experiência Industry Week SENAI.",
    project: projects[1],
  },
  {
    title: "Conteúdo e aplicações web",
    technologies: "Next.js · React · TypeScript · Git",
    evidence: "Dados do catálogo e contato contextual no Ateliê Ingrid Xavier.",
    project: projects[2],
  },
] as const;
