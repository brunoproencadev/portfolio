// Sources, authorship and capture provenance: docs/PHASE_F_PROJECTS.md.
export const additionalProjects = [
  {
    slug: "museu-arte-moderna",
    name: "Museu de Arte Moderna",
    category: "Museu virtual",
    summary:
      "Um museu em realidade virtual sobre a Semana de Arte Moderna de 1922, com storytelling audiovisual e espaço para obras dos estudantes do SESI de Sorocaba.",
    stack: ["Unity", "C#"],
    status:
      "Apresentação prevista para 2026. Visita registrada em vídeo; participação declarada pelo autor, ainda sem contribuições no repositório.",
    repository: "https://github.com/rafaeldominguesdev/semana-da-arte-moderna",
    evidence:
      "Relato do autor, vídeo do percurso e cena MuseumScene no repositório.",
  },
  {
    slug: "kord",
    name: "kord",
    category: "Identidade visual interativa",
    summary:
      "Um brand book digital que reúne estratégia, cores, tipografia e aplicações da marca em uma apresentação interativa.",
    stack: ["HTML", "CSS", "JavaScript", "GSAP"],
    status:
      "Projeto acadêmico de uma marca fictícia. Interface executada localmente para esta captura.",
    repository: "https://github.com/brunoproencadev/kordvisualidentity",
    evidence: "README e aplicação HTML, CSS e JavaScript do repositório.",
  },
] as const;

export const additionalMedia = {
  museum: {
    src: "/images/projects/museu-arte-moderna/hall.webp",
    width: 2340,
    height: 1080,
    alt: "Hall do museu virtual, com piso de madeira, bancos e arcos que levam às galerias de arte moderna.",
    caption:
      "Hall do museu · frame aos 10s do vídeo de visita fornecido pelo autor.",
  },
  kord: {
    src: "/images/projects/kord/cover.webp",
    width: 1440,
    height: 900,
    alt: "Abertura do brand book kord, com mascote branco e azul e a frase work less, earn more.",
    caption:
      "Captura da aplicação real · execução local do repositório em 17/10/2026.",
  },
} as const;

export const additionalToolIcons = {
  Unity: "/images/tools/unity-original.svg",
  "C#": "/images/tools/csharp-original.svg",
  HTML: "/images/tools/html5-original.svg",
  CSS: "/images/tools/css3-original.svg",
  JavaScript: "/images/tools/javascript-original.svg",
} as const;
