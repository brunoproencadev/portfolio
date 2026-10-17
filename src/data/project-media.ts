// Provenance, original hashes and publication limits: docs/MEDIA_ASSETS.md.
export const toolIcons = {
  Python: "/images/tools/python.svg",
  NumPy: "/images/tools/numpy.svg",
  OpenCV: "/images/tools/opencv.svg",
  PySerial: "/images/tools/pyserial.png",
  React: "/images/tools/react.svg",
  TypeScript: "/images/tools/typescript.svg",
  Vite: "/images/tools/vite.svg",
  Tailwind: "/images/tools/tailwind.svg",
  GSAP: "/images/tools/gsap.svg",
  Motion: "/images/tools/motion.svg",
  "Next.js": "/images/tools/nextjs.svg",
} as const;

export const projectMedia = {
  robo: {
    src: "/images/projects/robosense-lab/m3.webp",
    width: 960,
    height: 540,
    alt: "Frame do RoboSense com bola laranja detectada e setores Left, Front e Right.",
    caption:
      "Vídeo gravado · experimento M3. Anotações originais do frame; não é uma transmissão ao vivo.",
  },
  industry: [
    {
      src: "/images/projects/industry-week/hero.webp",
      width: 1440,
      height: 900,
      alt: "Tela inicial do Industry Week: O Futuro foi Formado na Indústria sobre fotografia industrial.",
      caption: "Abertura · captura do site público em 11/10/2026.",
    },
    {
      src: "/images/projects/industry-week/eras.webp",
      width: 1440,
      height: 900,
      alt: "Tela Do Vapor ao Algoritmo com as quatro eras da indústria no Industry Week.",
      caption: "Quatro eras · captura do site público em 11/10/2026.",
    },
  ],
  atelie: {
    src: "/images/projects/atelie-ingrid/catalog.webp",
    width: 1000,
    height: 3524,
    alt: "Página completa do Ateliê Ingrid Xavier com apresentação, peças artesanais e contato.",
    caption:
      "Screenshot do repositório · execução local documentada. Publicação não confirmada.",
  },
  industryLive: "https://brunoproencadev.github.io/industry-week-senai-prj/",
} as const;
