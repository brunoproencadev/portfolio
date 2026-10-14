---
name: "Bruno Proença Silva — direção B e superfícies C/D/E/F"
description: "Direção B preservada; navegação C, hero D, saudação E e projetos F aplicados localmente, com revisão F em andamento."
colors:
  background: "#08090d"
  surface: "#202024"
  surface-hover: "#303037"
  foreground: "#f5f3ff"
  muted: "#b8b5c5"
  accent: "#bda4ff"
  accent-deep: "#7350d6"
  paper: "#eeedf3"
  ink: "#181720"
  paper-muted: "#56525f"
  rule: "#34333d"
  control: "#858090"
  f-background: "#050506"
  f-surface: "#111115"
  f-foreground: "#f5f5f7"
  f-muted: "#aaa9b4"
  f-accent: "#c4b5fd"
  f-divider: "#33323a"
  f-control: "#85838f"
  f-paper: "#eeedf0"
  f-ink: "#17151b"
  f-paper-muted: "#52505a"
  f-paper-accent: "#684195"
  f-paper-control: "#827f88"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(64px, 6.65vw, 96px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(40px, 5vw, 72px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(36px, 3.9vw, 56px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.7
  caption:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  hero-display-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(36px, 10.5vw, 58px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  hero-position:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  hero-position-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  hero-description:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  hero-description-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  hero-label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.6
  hero-end:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  hero-end-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  f-headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)"
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  f-title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 5.5vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  f-industry-title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(2rem, 3.1vw, 3rem)"
    fontWeight: 550
    lineHeight: 1.1
  f-summary:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)"
    lineHeight: 1.6
  f-body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  f-caption:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "0.8125rem"
    lineHeight: 1.5
rounded:
  button: "8px"
  item: "10px"
  island: "30px"
  island-open: "28px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  group: "24px"
  lg: "32px"
  xl: "48px"
  section-gap: "64px"
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
  button-quiet:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "12px"
  hero-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.ink}"
    typography: "{typography.hero-label}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  hero-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
  hero-secondary:
    textColor: "{colors.foreground}"
    typography: "{typography.hero-label}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  hero-secondary-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent}"
  navigation-item:
    textColor: "{colors.foreground}"
    rounded: "{rounded.item}"
    padding: "10px 12px"
  navigation-item-current:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.foreground}"
  island:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.island}"
    width: "322px"
  f-work-link-dark:
    textColor: "{colors.f-foreground}"
    typography: "{typography.f-body}"
    padding: "12px 0"
  f-work-link-dark-hover:
    textColor: "{colors.f-accent}"
  f-work-link-light:
    textColor: "{colors.f-ink}"
    padding: "12px 0"
  f-work-link-light-hover:
    textColor: "{colors.f-paper-accent}"
  island-open:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.island-open}"
    width: "404px"
---

# Design System: Bruno Proença Silva — direção B e superfícies C/D/E/F

## Overview

**Creative North Star: "Horizonte e evidência"**

Nome sob uma borda de luz conduz a trabalho verificável, transformando curiosidade em evidência visual. Preto profundo, luz violeta interior, Manrope aberta, cápsula cinza e faixas de projeto com escalas distintas sustentam essa direção.

**A–E aprovadas; F autorizada pelo “continue” no gate E/F e aplicada localmente em 2026-10-13.** Este arquivo preserva os tokens do [protótipo estático B](docs/design-prototype/index.html), extraídos de [style.css](docs/design-prototype/style.css) e do SVG da home, além dos papéis `hero-*` observados em D. Os novos tokens `f-*` descrevem somente os valores realmente aplicados à home e às cenas F; não redefinem a direção B. A navegação C, o hero/composição/entrada D, a saudação/retirada E e os projetos F são as superfícies migradas. Sobre, competências e contato mantêm estrutura anterior, herdando agora Manrope e a paleta scoped da home; os cases preservam o ciclo anterior. G–I exigem confirmação individual. F está em revisão local: fontes `5c49407`, `b8d2f04` e `dbaae0e`, incluindo carregamento de scroll condicionado à viewport elegível. Nenhum push/deploy está autorizado. A especificação detalhada permanece em [DESIGN_SYSTEM](docs/DESIGN_SYSTEM.md), [COMPONENT_SPEC](docs/COMPONENT_SPEC.md), [VISUAL_DIRECTION](docs/VISUAL_DIRECTION.md) e [PHASE_F_PLAN](docs/PHASE_F_PLAN.md). Não importar o CSS documental no app nem migrar tokens globalmente a partir deste snapshot.

**Key Characteristics:**

- Identidade real e conteúdo em português, sustentados por evidência.
- Composição escura com luz violeta e uma faixa editorial clara.
- Projetos em escalas distintas, preservando as proporções das mídias.
- Navegação e leitura disponíveis sem JavaScript.

A revisão independente de B retornou `ship` no escopo estático; [resultados B](docs/design-review/results.json) registram cinco larguras, fonte/imagens carregadas, ausência de overflow e zero violações axe nos estados avaliados. A revisão independente de C também retornou `ship`, restrito à cápsula. [Resultados C](docs/island-review/results.json), [estados](docs/island-review/states-contact-sheet.jpg) e [sequência gravada](docs/island-review/recorded-sequence-1440.jpg) sustentam a extensão; não certificam WCAG, publicação nem conversão visual do produto inteiro. D recebeu `ship` na [revisão independente](docs/hero-review/finish-review.md); [PHASE_D_REVIEW](docs/PHASE_D_REVIEW.md) reúne capturas em cinco larguras, frames e sequências gravadas, geometria, testes e limites. O revisor avaliou arquivos/capturas, sem navegador próprio ou reprodução direta dos WebM. E recebeu `ship` na [revisão independente](docs/intro-review/finish-review.md); [PHASE_E_REVIEW](docs/PHASE_E_REVIEW.md) reúne 20 estados controlados em cinco larguras, frames de gravações reais desktop/mobile, 96 + 112 passes E2E em duas rodadas e cinco skips preexistentes. O revisor abriu as 20 capturas e pranchas, sem navegador próprio ou reprodução contínua dos WebM; testes e Lighthouse foram executados pelo implementador. As provas sustentam o escopo local, sem certificar suavidade em todo hardware ou acessibilidade completa.

As evidências F estão em [capturas](docs/story-review/capture-results.json), [gravações](docs/story-review/recordings.json), [amostras de movimento](docs/story-review/motion-samples.json), [verificação de viewport largo/baixo](docs/story-review/wide-short-results.json) e [resultados de testes](docs/story-review/test-results.json). Os resultados preservam falhas intermediárias e suas novas rodadas. [PHASE_F_REVIEW](docs/PHASE_F_REVIEW.md) reúne as validações posteriores, incluindo a correção de viewport largo/baixo e o carregamento condicional. Esta atualização documental não declara aceite visual final, aprovação do usuário, performance final ou equivalência integral às referências; o verdict pass independente resolveu os dois achados e retornou ship restrito a essas correções, em2026-10-14; não é nova auditoria integral nem aprovação de G. A meta local de LCP permanece pendente.

## Colors

Acento violeta sobre neutros quase pretos, aplicado localmente à ilha C, ao hero D e à saudação E. A faixa clara Industry Week chegou a src em F com valores próprios, registrados nos tokens f-paper, f-ink, f-paper-muted, f-paper-accent e f-paper-control. Os primitivos sem prefixo continuam sendo a autoridade B; os tokens f-* registram a implementação scoped, sem declarar igualdade cromática entre B e F.

- **Primary:** `accent` serve a foco, hover e ênfase; `accent-deep` pertence ao halo decorativo do SVG, nunca ao texto.
- **Neutral:** `background` guarda o negativo do arco; `surface` e `surface-hover` distinguem cápsula e opção ativa; `foreground` e `muted` hierarquizam texto.
- **Neutral claro:** `paper`, `ink` e `paper-muted` preservam contraste na faixa editorial.
- `rule` separa regiões sem representar um controle; `control` colore a scrollbar e reserva contraste para limites essenciais.

**The Legibility Rule.** Texto não cruza a borda luminosa; indicação atual inclui texto e forma além da cor.

Em D, background/foreground/muted/accent são variáveis locais do hero; o header da home compartilha o fundo. O arco usa accent-deep/accent/foreground, o CTA principal usa ink e o hover secundário usa surface. Em E, a camada usa background e os quatro traços foreground; Pular usa surface/foreground, borda control e accent no hover/foco. Em F, f-background/f-surface/f-foreground/f-muted/f-accent/f-divider/f-control são variáveis de .home-page, herdadas também pelas seções ainda não recompostas. A faixa Industry redefine os papéis claros dentro dela. C/D/E mantêm suas regras locais; :root e os cases preservam a paleta verde anterior.

Pares calculados estão nos resultados da revisão. Rampas tonais do sidecar são amostras sintetizadas para o painel, não novos tokens aprovados.

## Typography

Manrope Latin variável local, com Arial/sans-serif como fallback no protótipo documental. Licença SIL OFL 1.1 e origem estão em [fonts/source.json](docs/design-prototype/fonts/source.json); `font-display: swap` preserva leitura. C/D/E compartilham a mesma família via `src/fonts/manrope.ts` e `next/font/local`, pesos 400–800 e swap, na navegação, no hero e no botão Pular. A saudação é desenho SVG original, não uma fonte ou assinatura pessoal. F aplica a mesma Manrope ao wrapper .home-page, incluindo os textos herdados das seções ainda não recompostas; regras locais de serif/mono continuam onde já existiam. Os cases mantêm a tipografia anterior. CLS local de D está registrado em PHASE_D_REVIEW, sem representar o redesign completo.

O frontmatter preserva os papéis B: nome (`display`), seção (`headline`), projeto (`title`), leitura (`body`), CTA (`label`) e legenda (`caption`). D compartilha `display`; os papéis `hero-*` registram seus demais tamanhos e line-height herdado de 1.6, sem alterar os papéis B. Em D, o apoio usa 18px/16px desktop/mobile, a descrição 16px/14px, os CTAs 14px e o fechamento 14px/13px. A descrição tem máximo de 48ch, reduzido para 33ch no mobile. Os demais papéis B continuam documentais; os papéis f-* descrevem tamanhos e entrelinhas observados na home, sem migração global dos cases. F usa títulos de trabalho com peso 500 e título Industry com peso 550; resumos têm largura máxima de 55ch e descrições de evidência de 65ch. Legendas mantêm texto explícito sobre origem e limites.

**The Real Name Rule.** O nome completo permanece um único h1 semântico; quebras visuais respeitam palavras inteiras.

## Layout

No protótipo B: container até 1280px, com margens de 64px em desktop, 32px abaixo de 900px e 20px abaixo de 600px. O CSS também ajusta composição em 1100px e expande a cena a partir de 1600px. A cápsula compacta mede até 322px; aberta chega a 404px, limitada pela viewport. A abertura de B é um disclosure nativo instantâneo; C implementa o comportamento descrito em Components.

Em B, hero de 760px, padding superior de 164px; telas largas usam 830px/204px, mobile 620px/154px. Em D, o header reserva 96px em fluxo e o hero tem altura mínima de 664px com padding 68px 20px 60px; a partir de 1600px são 734px e padding superior de 108px. Abaixo de 600px são 524px e padding 58px 20px 24px. São alturas mínimas: conteúdo e quebra dos CTAs podem aumentar a cena. O título continua em duas linhas. Ações flexíveis usam gap de 16px (mobile 8px); empilham em 320px e ficam lado a lado em 375px nas capturas.

A decoração D começa 96px acima do hero, com clip apenas local. Arco desktop: top −15px e altura 700px; telas largas: 770px. Mobile: top 34px, altura 555px, largura 220% e posição esquerda −60%. O fechamento usa margem superior automática e padding superior de 100px (mobile 116px), sem bloquear scroll.

No protótipo B, RoboSense usa imagem ampla e texto lateral; Industry Week intercala uma faixa clara; Ateliê preserva a captura longa. Em larguras menores, a leitura progride verticalmente. Consultar [prancha de estados](docs/design-prototype/states.html) para geometria e storyboard: quadros consecutivos não implementam movimento.

F reutiliza o container existente até 1280px: margens de 64px a partir de 900px, 32px entre 600–899px e 20px abaixo. A introdução dos trabalhos usa colunas 7:4 e gap 64px no desktop; RoboSense ocupa a largura do container, seguido por contexto/links em 7:3 com gap 10%. Industry tem uma faixa em 1:2,5:1, gap 32px e padding horizontal clamp(32px, 4.5vw, 88px). A janela aprimorada tem proporção 1440/1040, incluindo espaço para legenda; largura máxima calc((100svh - 240px) * 1.384615) mantém a faixa dentro de desktops largos e baixos. O palco mede calc(100svh - 112px). Ateliê usa colunas 5:6, gap 9%, imagem integral e texto ao lado; abaixo de 900px a ordem é vertical. Sem aprimoramento, as duas capturas Industry aparecem consecutivamente no fluxo.

## Elevation & Depth

A cápsula recebe sombra ambiente; no protótipo B, a captura do Industry Week tem sombra discreta sobre papel. F não aplica essa sombra B à mídia: usa fundo derivado das capturas, ampliado e escurecido, apenas no palco aprimorado. O restante depende de espaço, escala e contraste tonal. O arco tem três traços SVG e blur estático localizado, sem filtro animado em tela cheia. Valores de sombra e trechos renderizáveis estão no sidecar.

B permanece estático. Em C, `motion/mini` interpola dimensões/raio da cápsula e opacity/translateY dos filhos; não escala letras/avatar. Em D, GSAP controla a entrada do hero, sem disputar propriedades com Motion. A entrada autoral D dura 1s, com `power2.out`; os offsets abaixo são relativos ao início de D, deslocado para 850ms no conjunto E: arco 0–800ms (y 30px, scale 1.04 e opacity 0.25 até repouso; borda de 12px para 2px), linhas do nome 120–860ms (yPercent 110, duração 640ms, stagger 100ms), posição 400–750ms (y 12px), descrição 500–900ms (y 10px), ações 640–1000ms (y 10px) e fechamento 600–1000ms. Apoios entram com opacity; filtros SVG de blur 24/7 permanecem estáticos. Os tempos adaptam a ordem observada em R2, sem alegar easing ou duração idênticos ao vídeo. Em E, GSAP escreve os quatro traços sequencialmente entre 0–850ms, com duração proporcional ao comprimento e easing linear; pausa 850–1000ms. A saudação perde opacidade em 1000–1150ms com `power2.out`, enquanto a camada sobe (`yPercent: 0 → −100`) em 1000–1450ms com `power3.inOut`. D começa atrás da camada em 850ms e termina em 1850ms. O watchdog independente de 2200ms conta desde elegibilidade, incluindo import; atraso pode encurtar a sequência. R3 orienta a ordem observada, mas seus tempos mais longos e “hello” foram adaptados para o “olá” original aprovado em B. Em F, GSAP/ScrollTrigger aproxima RoboSense por scroll (y 64→0, escala 0,88→1, máscara inset 6%→0), de top bottom a top 18%, com scrub linear. Industry usa um único pin, início top 112px e extensão de 1,2×innerHeight (alvo 120svh), somente em viewport ≥900×700 e no-preference. O progresso mantém a abertura em 0–0,35, move a mídia verticalmente em 0,35–0,65 (track yPercent −50 e crossfade do fundo) e mantém as eras em 0,65–1. Rótulos e links permanecem imóveis. Fundo usa blur estático de 8px, brightness 0,65, scale 1,08 e opacidade base 0,22; só a segunda camada tem opacity animada. A implementação adapta dois estados do mesmo projeto; R3 troca projetos distintos, portanto não há equivalência integral. [MOTION_SPEC](docs/MOTION_SPEC.md) distingue a implementação F das propostas históricas.

## Shapes

Cápsula contínua com raio compacto e aberto próprios, avatar circular, CTAs discretamente arredondados e itens de navegação com curva moderada. As mídias mantêm formato e pixels originais; não há grade repetida de cards. O arco é uma curva geométrica decorativa, não um fundo radial genérico.

## Components

- **Ilha B:** snapshot estático com identidade constante, avatar GitHub exato e cinco destinos; `details/summary` permite abertura por teclado sem JS.
- **Ilha C aplicada:** mesma paleta aprovada (`surface`, `surface-hover`, `foreground`, `muted`, `accent`, `rule`), sombra e Manrope, restritas à navegação. Nome curto e avatar exato (40px); subtítulo de 12px indica a seção atual. A nota de posicionamento fica sob os destinos, em 12px/20px. Ícones SVG geométricos têm traço de 1,5px, 18px nos links e 22px no botão de 44px.
- **Geometria C:** compacta até 322×60px, largura limitada a viewport−32px; aberta até 404px. Altura natural observada de 365px em 768/1440/1920px e 385px em 320/375px pela quebra da nota, sem altura fixa para esconder conteúdo. Centro/topo permanecem estáveis: 32px a partir de 900px, 16px abaixo, acrescidos de safe-area. Painel alto tem scroll interno. Itens usam raio de 12px (B: 10px), alvo mínimo de 48px; “Atual” usa 11px e violeta (B: 12px e cinza). O foco usa contorno violeta de 3px com offset −3px, voltado para dentro para evitar recorte pelo overflow da cápsula (B: offset externo de 4px).
- **Interação C:** abertura 420ms e fechamento 340ms, curva (0.22, 1, 0.36, 1); filhos entram em 160ms após 80ms, stagger de 30ms e deslocamento de 8px, saem em 100ms. Novo comando reverte sem fila; foco em um destino resolve imediatamente a geometria. Escape retorna ao botão; clique externo/saída de foco fecham; links focam destinos. Reduced motion em execução aplica estados imediatos; no-JS preserva links visíveis em fluxo. Observers, listeners e animações têm cleanup. Os timings são escolhas de implementação, não easing extraído do vídeo.
- **Hero D aplicado:** Server Component com um h1, nome em duas linhas sob máscaras locais e texto/links vindos dos dados existentes. SSR/no-JS mostram o estado completo; a timeline só aprimora a cena. HomeMotion preserva sessão, import dinâmico, pular, watchdog de 2,2s, cancelamento por foco/gesto/hash/reduced/pagehide e cleanup. E coordena a entrada e move HomeMotion para irmão de CinematicHero em main, escapando do stacking context isolado do hero. Reduced motion em execução resolve a cena; D/E não possuem pin ou scrub e não compartilham seus wrappers animados com F.
- **Saudação E aplicada:** quatro paths originais de “olá” do estudo B, sem atribuição de assinatura. SVG centrado, `viewBox="0 0 120 80"`, largura `clamp(104px, 10vw, 144px)` e altura automática; traço 1,6 em unidades SVG, pontas/junções arredondadas, pathLength/dasharray normalizados em 1. Camada fixa cobre a viewport (inset 0, z-index 30), usa grid/centro, `pointer-events: none`, `aria-hidden` e `hidden` no SSR; só aparece após instalação de cancelamento e import bem-sucedido.
- **Pular E:** botão Manrope fixo acima da camada (z-index 40), à direita/embaixo com `max(24px, env(safe-area-inset-right))` e `max(24px, env(safe-area-inset-bottom))`, alvo mínimo de 44px, padding 8px 12px, raio 8px e borda control de 1px. Hover accent; foco accent de 3px com offset 4px. Foco em qualquer elemento fora do botão ou pointerdown no conteúdo/navbar encerra a intro, além de Escape, wheel/touchstart, hash/pagehide/reduced. O botão retorna foco ao h1 apenas se estava focado; outros destinos são preservados. Sem body lock, inert ou focus trap.
- **Fallback E:** a camada permanece ausente em no-JS/reduced inicial, sessão já vista, hash ou scroll inicial; storage negado conserva guarda por documento. Interação durante import impede abertura tardia. Ao terminar/cancelar/desmontar, o owner esconde a camada e GSAP context.revert limpa atributos/estilos; falha/timeout também libera o conteúdo. HomeMotion continua único dono da intro, Motion continua dono da ilha.
- **CTAs D:** principal e GitHub têm altura mínima de 48px, raio de 8px, padding 12px 20px (mobile 12px 16px), gap de 20px (mobile 12px) e foco violeta de 3px com offset 4px. O principal passa de foreground para accent no hover, mantendo ink; o secundário ganha surface e texto accent. São links nativos, com SVG de 18px e traço 1,5px.
- **CTA principal e discreto B:** links reais, altura mínima de 48px; hover do principal muda para violeta preservando tinta escura.
- **Link de case/contato:** sublinhado e alvo mínimo de 44px; foco visível com contorno de 3px e offset de 4px. Na faixa clara o contorno usa tinta.
- **Projetos F aplicados:** `SelectedWork` é Server Component; os dados factuais continuam em portfolio e as mídias em `src/data/project-media.ts`. As três cenas usam article/h3/figure/figcaption, stack em lista e estado/fonte em lista de definição. Links nativos de case/repositório e demonstração Industry ficam fora das máscaras; não dependem de índice visual, pin ou JavaScript.
- **Mídias F:** WebPs reais sob `public/images/projects`, com dimensões reservadas, alt, sizes e carregamento responsivo por Next Image. RoboSense 960×540 é frame M3 de vídeo gravado, sem prova de hardware ao vivo. Industry usa duas capturas 1440×900 do site público observado em 11/10/2026; deployment e main são distintos. Ateliê 1000×3524 preserva a página longa do repositório, execução local documentada e publicação não confirmada. [Manifesto](docs/project-media-manifest.json) e [MEDIA_ASSETS](docs/MEDIA_ASSETS.md) registram origem/hash/transformações. Marca/fotografias do Ateliê exigem revisão de direitos antes de publicação proeminente; fotografias pessoais LinkedIn seguem indisponíveis.
- **Links F:** linhas de ação com alvo mínimo de 48px, padding vertical 12px, gap 16px, borda inferior control e seta SVG de 18px. Hover usa accent local e transição de cor de 160ms; reduced a remove. F herda foco de 2px com offset 4px, usando f-accent no escuro e f-paper-accent na faixa clara; não herda o contorno B de 3px. No desktop os links Industry usam 14px.
- **Lifecycle F:** HomeMotion adia o import de home-reveals até viewport ≥900×700; reduced inicial e hash direto preservam fluxo e evitam esse import. Foco em main, hashchange, pagehide e alteração de reduced encerram o aprimoramento, inclusive durante import. gsap.matchMedia reverte pin, classe e timelines no resize/reduced; cleanup remove listeners e libera transform/clipPath/opacity dos wrappers exclusivos, incluindo identity transform residual de refresh. Falha de import mantém SSR legível. D/E mantêm cancelamentos próprios; Motion continua exclusivo da ilha. Sem biblioteca nova, autoplay, loop ou bloqueio do scroll. O carregamento condicional foi commitado em dbaae0e e recebeu build/lint/strict e regressões específicas; não houve nova rodada E2E integral após o baseline 5c49407.
- **Competências:** lista sem porcentagens, cada grupo acompanhado por evidência de uso.
- **Arco:** SVG decorativo oculto da árvore acessível; não substitui conteúdo nem controla a navegação.

O sidecar preserva os snippets de B como amostras documentais e registra C em `extensions.appliedNavigation`, D em `extensions.appliedHero` E em `extensions.appliedIntro` e F em `extensions.appliedProjects`; não acrescenta inputs, formulários, chips ou cards ao produto. Snippets não são componentes prontos para integrar ao React. A amostra adicional de link F representa o controle aplicado, sem simular imagens ou animações. O hero mantém B/D; os projetos F substituem a grade repetida. Sobre/competências/contato conservam estrutura anterior sob paleta/fonte da home; cases continuam legados, fora de C–F. A ilha aberta pode sobrepor temporariamente o nome, conforme o disclosure C aprovado.

## Do's and Don'ts

**Do:**

- Preservar nome, avatar exato, mídias reais, proporções e legendas com contexto.
- Manter semântica, teclado, foco visível e leitura sem JavaScript.
- Consultar docs/DESIGN_SYSTEM.md e os contratos de fase antes de implementar.

**Don't:**

- Inventar experiência, métricas, prêmios, disponibilidade, fotografias ou interfaces de projetos.
- Tratar storyboard, snippets ou revisão estática como animações entregues.
- Aplicar este snapshot a src ou produção sem autorização da fase correspondente.
