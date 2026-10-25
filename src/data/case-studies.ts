import { projects } from "./portfolio";
import { projectMedia } from "./project-media";
import { additionalMedia, additionalProjects } from "./additional-projects";

export const caseProjects = [
  projects[0],
  additionalProjects[0],
  projects[1],
  projects[2],
] as const;

// Pinned sources rechecked without rerunning the original experiments.
const sourcesCheckedAt = "2026-10-18";

const studies = [
  {
    slug: "robosense-lab",
    media: [projectMedia.robo],
    contributors: [],
    narrativeSource: null,
    context:
      "Antes de integrar percepção ao controle de um robô, é preciso distinguir uma bola não detectada de uma câmera sem dados ou de um frame antigo. O RoboSense Lab investiga esses contratos em experimentos de visão computacional para RoboCup Junior Soccer.",
    approach:
      "O trabalho começa com imagens sintéticas controladas, passa por ruído, oclusão e atraso virtual e chega ao processamento de gravações reais de uma bola laranja. Os ensaios ao vivo continuam experimentais.",
    architecture: [
      "Aquisição: uma fonte Camera entrega o frame e seus timestamps.",
      "Validade: o pipeline verifica a idade do frame antes de executar a detecção.",
      "Observação: limiares HSV e contornos selecionam candidatos; o tracking M3 associa medidas atuais em vídeos gravados.",
      "Registro: JSONL e resumos preservam condições, falhas e resultados do experimento.",
    ],
    decisions: [
      "Tratar falha de aquisição e rejeição por idade separadamente de ausência de bola; não reutilizar uma direção antiga como observação atual.",
      "Manter métricas de processamento distintas da latência física e explicitar os limites do detector de cor.",
      "Preservar o controle Arduino GIGA separado da percepção e dos ensaios da câmera.",
    ],
    evidenceSummary:
      "As fontes publicadas descrevem cenários sintéticos e tracking em gravações reais, com demonstração e validação M3. Estes resultados pertencem às execuções documentadas no projeto; não foram reexecutados para este case.",
    sources: [
      { label: "README e condições de execução", path: "README.md" },
      { label: "Arquitetura da percepção", path: "docs/architecture.md" },
      {
        label: "Validação dos vídeos gravados — M3",
        path: "docs/validation-m3.md",
      },
      {
        label: "Artefatos da demonstração M3",
        path: "artifacts/m3/index.html",
      },
    ],
    revision: "593768ee3d3f2f861f15beb83459131579e85104",
    limitations: [
      "Objetos laranja semelhantes podem gerar falsos alvos; o ensaio ao vivo ainda apresenta perdas.",
      "Vídeo gravado e atraso virtual não comprovam desempenho de câmera USB, estabilidade na Raspberry Pi ou latência ponta a ponta.",
      "O detector de bola laranja não valida a bola infravermelha. Calibração física, integração com rodas e execução real na Pi permanecem pendentes.",
    ],
    learning:
      "Separar aquisição, validade e detecção permite comparar experimentos e entender falhas antes de conectar observações a decisões de movimento.",
    next: "Calibrar e validar no hardware sob condições documentadas, incluindo aquisição e limites físicos. Esses passos são pendências do laboratório, não resultados já entregues.",
    diagramDescription:
      "Diagrama conceitual de um campo de visão com alvo e marcações de detecção; representa a observação, não uma captura de experimento.",
  },
  {
    slug: "industry-week-senai",
    media: projectMedia.industry,
    contributors: [],
    narrativeSource: null,
    context:
      "O evento Engrenagens do Tempo, da escola SESI em parceria com o SENAI, precisava apresentar a evolução industrial. A interface organiza o tema em uma jornada por eras, conectando conteúdo histórico e exploração visual.",
    approach:
      "Uma aplicação React e Vite reúne capítulos, mídias e detalhes por era. Navegação e alternância de tema ajudam a percorrer a narrativa; GSAP e Motion compõem o movimento.",
    architecture: [
      "Conteúdo: capítulos e eras organizam a leitura histórica.",
      "Apresentação: componentes React combinam texto, mídia e painéis de detalhes.",
      "Interação: estado local controla navegação, tema e feedback; App.tsx concentra essas responsabilidades.",
      "Movimento: GSAP e Motion participam da experiência visual.",
    ],
    decisions: [
      "Usar capítulos para manter uma sequência reconhecível entre texto histórico, mídia e movimento.",
      "Oferecer detalhes por era sem transformar a página principal em um texto contínuo extenso.",
      "Descrever o formulário de visita como feedback local: sua confirmação visual não comprova agendamento ou persistência.",
    ],
    evidenceSummary:
      "O código confirma navegação, tema e painéis por era. As capturas mostram o site público observado em 11/10/2026; o deployment consultado estava em uma revisão diferente da fonte analisada. Este case não certifica o funcionamento integral da aplicação externa.",
    sources: [
      {
        label: "Contexto do evento e demonstração indicada",
        path: "README.md",
      },
      { label: "Implementação da narrativa e interações", path: "src/App.tsx" },
      { label: "Stack e dependências do projeto", path: "package.json" },
    ],
    revision: "68ab01a95b770f28d66a8f76fb6f138e4c8edbd6",
    limitations: [
      "O formulário atualiza estado local e exibe confirmação; não há agendamento, persistência ou atendimento comprovados.",
      "O README mantém instruções antigas de HTML estático; o código React/Vite é a referência para a implementação.",
      "Uso de bibliotecas de animação não comprova performance, acessibilidade integral ou suporte completo a movimento reduzido.",
    ],
    learning:
      "Uma experiência visual precisa ser avaliada junto com seus comportamentos reais. Feedback de interface deve comunicar exatamente o que a aplicação realizou.",
    next: "Revisar documentação, semântica, acessibilidade e feedback do formulário. São recomendações desta análise, não um roadmap confirmado do projeto.",
    diagramDescription:
      "Diagrama conceitual de uma linha do tempo com quatro marcos, representando a organização da narrativa por eras.",
  },
  {
    slug: "atelie-ingrid-xavier",
    media: [projectMedia.atelie],
    contributors: [],
    narrativeSource: null,
    context:
      "O catálogo apresenta peças artesanais reais e facilita o atendimento sem exigir conta ou checkout. O desafio é manter as informações das peças e os destinos de contato coerentes com o conteúdo confirmado.",
    approach:
      "Next.js, React e TypeScript sustentam um catálogo local. Dados, imagens e preços confirmados alimentam as páginas; o WhatsApp recebe uma mensagem contextualizada para a peça escolhida.",
    architecture: [
      "Catálogo: dados locais ficam separados da apresentação.",
      "Validação: identificadores e informações são verificados no servidor.",
      "Páginas: componentes apresentam informações e imagens da peça.",
      "Atendimento: links WhatsApp usam o contexto do item, com fallback para identificadores inválidos.",
    ],
    decisions: [
      "Não inferir preço a partir de fotografia; usar somente informações confirmadas.",
      "Preservar imagens reais das peças e distinguir catálogo de uma operação de comércio eletrônico.",
      "Validar identificadores para evitar que uma URL inválida produza uma mensagem de contato enganosa.",
    ],
    evidenceSummary:
      "O registro de verificação documenta testes locais de catálogo, WhatsApp, responsividade e acessibilidade automatizada. Os resultados são atribuídos ao projeto de origem; não representam validação de produção ou resultado comercial.",
    sources: [
      { label: "Escopo e estado do catálogo", path: "README.md" },
      {
        label: "Verificação local e limites dos testes",
        path: "docs/VERIFICATION.md",
      },
      { label: "Stack e scripts do projeto", path: "package.json" },
    ],
    revision: "66969cf8354c3063807a98069354d78303defdf7",
    limitations: [
      "Sem checkout, carrinho ou CMS. A publicação do site não está confirmada.",
      "Testes locais não comprovam HTTPS, segurança do ambiente publicado ou métricas de visitantes.",
      "Documentos legais são rascunhos; não há revisão jurídica ou resultado comercial alegados.",
    ],
    learning:
      "Integridade do conteúdo e do destino de contato faz parte da experiência: uma boa interface também precisa preservar o significado dos dados.",
    next: "Publicação e novos serviços dependem dos gates do próprio projeto e de informações comerciais confirmadas.",
    diagramDescription:
      "Diagrama conceitual de uma peça no catálogo conectada a um painel de atendimento; ilustra o fluxo de informação para contato.",
  },
  {
    slug: "museu-arte-moderna",
    media: [additionalMedia.museum],
    contributors: [
      "Bruno Proença Silva",
      "Rodrigo Andrade",
      "Miguel Narvais",
      "Rafael Domingues",
      "Maria Vitorino",
    ],
    narrativeSource:
      "Contexto escolar, equipe, descrições audiovisuais e espaço para obras dos estudantes: relato de Bruno Proença Silva, confirmado em 18/10/2026. A apresentação no SESI de Sorocaba está prevista para 2026 e ainda não aconteceu.",
    visualCaption:
      "Frame da visita gravada ao museu virtual, fornecida pelo autor. A imagem registra o ambiente do projeto antes da apresentação escolar.",
    context:
      "A escola SESI de Sorocaba dedica uma semana do ano à Semana de Arte Moderna de 1922. Para essa programação, Bruno e seus colegas desenvolveram um museu em realidade virtual com o propósito de aproximar os estudantes da cultura da época de maneira acessível, imersiva e interativa. A apresentação está prevista para 2026.",
    approach:
      "Unity e C# sustentam a visita pelo ambiente tridimensional. Segundo o relato do autor, as obras principais recebem descrições audiovisuais em formato de storytelling, que percorrem seus elementos visuais e acrescentam contexto histórico. O projeto também reserva espaço para obras dos estudantes relacionadas aos conceitos da época.",
    architecture: [
      "Ambiente: a cena MuseumScene reúne o percurso e os objetos de exposição em Unity.",
      "Conteúdo: um catálogo editorial alimenta as fichas das obras, com título, autoria, descrição, fontes e relação com 1922.",
      "Interação: scripts C# identificam a peça observada e permitem fixar ou fechar sua ficha.",
      "Mediação: o painel apresenta o conteúdo da obra e opções de leitura durante a visita.",
    ],
    decisions: [
      "Apresentar arte e contexto no mesmo percurso, combinando exploração do espaço e leitura das obras.",
      "Usar storytelling audiovisual nas obras principais, conforme o relato da equipe, para desenvolver sua leitura visual e histórica.",
      "Abrir espaço para a produção dos estudantes ligada aos conceitos estudados, aproximando a proposta expositiva da atividade escolar.",
      "Manter as informações das obras em um catálogo separado dos scripts que controlam interação e apresentação.",
    ],
    evidenceSummary:
      "O vídeo fornecido pelo autor registra uma visita ao ambiente. A revisão fixada do repositório contém a cena Unity, o catálogo e os scripts das fichas e da interação pelo olhar. O contexto escolar, a equipe e a proposta audiovisual são atribuídos ao relato do autor; a apresentação aos estudantes ainda será realizada.",
    sources: [
      {
        label: "Visita, conteúdo e implementação do museu",
        path: "UnityProject/README.md",
      },
      {
        label: "Cena do ambiente de exposição",
        path: "UnityProject/Assets/Scenes/MuseumScene.unity",
      },
      {
        label: "Sincronização do catálogo editorial",
        path: "UnityProject/Assets/Scripts/Utils/CuratorialCatalog.cs",
      },
      {
        label: "Interação com as obras pelo olhar",
        path: "UnityProject/Assets/Scripts/Player/GazeDwellInteraction.cs",
      },
      {
        label: "Apresentação das fichas e opções de leitura",
        path: "UnityProject/Assets/Scripts/UI/MuseumGuidePanel.cs",
      },
    ],
    revision: "8fc221f7836b594edb53350197a2c49f621fad97",
    limitations: [
      "A apresentação no SESI de Sorocaba ainda não ocorreu; não há resultado pedagógico ou avaliação do público a relatar.",
      "A participação de Bruno e os créditos da equipe vêm do relato do autor. Bruno ainda não possui contribuições no repositório; não foram atribuídos papéis individuais.",
      "A visita gravada e a leitura do código não validam conforto, desempenho ou funcionamento em headset físico. Os testes do projeto de origem não foram reexecutados para este case.",
    ],
    learning:
      "A proposta conecta a construção do ambiente virtual à mediação cultural: as obras precisam de contexto, e o percurso precisa dar espaço tanto à observação quanto à leitura.",
    next: "Apresentar o museu na programação escolar de 2026. A recepção dos estudantes e os resultados dessa experiência permanecem em aberto.",
    diagramDescription: null,
  },
] as const;

export function getCaseStudy(slug: string) {
  const project = caseProjects.find((entry) => entry.slug === slug);
  const study = studies.find((entry) => entry.slug === slug);
  return project && study
    ? {
        ...project,
        ...study,
        sourcesCheckedAt,
        visualCaption:
          "visualCaption" in study
            ? study.visualCaption
            : "visualCaption" in project
              ? project.visualCaption
              : null,
      }
    : undefined;
}
