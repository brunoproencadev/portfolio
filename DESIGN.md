---
name: "Bruno Proença Silva — direção B, ilha C e hero D"
description: "Direção B aprovada; navegação C e hero/entrada D aplicados no código local."
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
  island-open:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.island-open}"
    width: "404px"
---

# Design System: Bruno Proença Silva — direção B, ilha C e hero D

## Overview

**Creative North Star: "Horizonte e evidência"**

Nome sob uma borda de luz conduz a trabalho verificável, transformando curiosidade em evidência visual. Preto profundo, luz violeta interior, Manrope aberta, cápsula cinza e faixas de projeto com escalas distintas sustentam essa direção.

**B/C aprovadas; D autorizada no gate C/D e implementada localmente (`7d4d018`).** Este arquivo preserva os tokens do [protótipo estático B](docs/design-prototype/index.html), extraídos de [style.css](docs/design-prototype/style.css) e do SVG da home. O frontmatter mantém essa autoridade e acrescenta papéis `hero-*` observados em D; `display` também é aplicado ao nome em D. A navegação C e o hero/composição/entrada D são as superfícies migradas. Projetos, sobre, competências, contato e cases preservam o ciclo anterior; saudação/loading e demais fases E–I dependem de confirmação individual. D está entregue para revisão do usuário, sem push/deploy autorizado. A especificação detalhada permanece em [DESIGN_SYSTEM](docs/DESIGN_SYSTEM.md), [COMPONENT_SPEC](docs/COMPONENT_SPEC.md) e [VISUAL_DIRECTION](docs/VISUAL_DIRECTION.md). Não importar o CSS documental no app nem migrar tokens globalmente a partir deste snapshot.

**Key Characteristics:**

- Identidade real e conteúdo em português, sustentados por evidência.
- Composição escura com luz violeta e uma faixa editorial clara.
- Projetos em escalas distintas, preservando as proporções das mídias.
- Navegação e leitura disponíveis sem JavaScript.

A revisão independente de B retornou `ship` no escopo estático; [resultados B](docs/design-review/results.json) registram cinco larguras, fonte/imagens carregadas, ausência de overflow e zero violações axe nos estados avaliados. A revisão independente de C também retornou `ship`, restrito à cápsula. [Resultados C](docs/island-review/results.json), [estados](docs/island-review/states-contact-sheet.jpg) e [sequência gravada](docs/island-review/recorded-sequence-1440.jpg) sustentam a extensão; não certificam WCAG, publicação nem conversão visual do produto inteiro. D recebeu `ship` na [revisão independente](docs/hero-review/finish-review.md); [PHASE_D_REVIEW](docs/PHASE_D_REVIEW.md) reúne capturas em cinco larguras, frames e sequências gravadas, geometria, testes e limites. O revisor avaliou arquivos/capturas, sem navegador próprio ou reprodução direta dos WebM.

## Colors

Acento violeta sobre neutros quase pretos, aplicado localmente à ilha C e ao hero D. Papel claro, tinta escura e legenda própria pertencem ao capítulo Industry Week do protótipo B; essa faixa ainda não migrou para src.

- **Primary:** `accent` serve a foco, hover e ênfase; `accent-deep` pertence ao halo decorativo do SVG, nunca ao texto.
- **Neutral:** `background` guarda o negativo do arco; `surface` e `surface-hover` distinguem cápsula e opção ativa; `foreground` e `muted` hierarquizam texto.
- **Neutral claro:** `paper`, `ink` e `paper-muted` preservam contraste na faixa editorial.
- `rule` separa regiões sem representar um controle; `control` colore a scrollbar e reserva contraste para limites essenciais.

**The Legibility Rule.** Texto não cruza a borda luminosa; indicação atual inclui texto e forma além da cor.

Em D, background/foreground/muted/accent são variáveis locais do hero; o header da home compartilha o fundo. O arco usa accent-deep/accent/foreground, o CTA principal usa ink e o hover secundário usa surface. As cores globais verdes legadas e os cases permanecem preservados.

Pares calculados estão nos resultados da revisão. Rampas tonais do sidecar são amostras sintetizadas para o painel, não novos tokens aprovados.

## Typography

Manrope Latin variável local, com Arial/sans-serif como fallback no protótipo documental. Licença SIL OFL 1.1 e origem estão em [fonts/source.json](docs/design-prototype/fonts/source.json); `font-display: swap` preserva leitura. C/D compartilham a mesma família via `src/fonts/manrope.ts` e `next/font/local`, pesos 400–800 e swap, na navegação e no hero. As outras superfícies mantêm a tipografia anterior. CLS local de D está registrado em PHASE_D_REVIEW, sem representar o redesign completo.

O frontmatter preserva os papéis B: nome (`display`), seção (`headline`), projeto (`title`), leitura (`body`), CTA (`label`) e legenda (`caption`). D compartilha `display`; os papéis `hero-*` registram seus demais tamanhos e line-height herdado de 1.6, sem alterar os papéis B. Em D, o apoio usa 18px/16px desktop/mobile, a descrição 16px/14px, os CTAs 14px e o fechamento 14px/13px. A descrição tem máximo de 48ch, reduzido para 33ch no mobile. Os demais papéis B continuam documentais, sem migração tipográfica global.

**The Real Name Rule.** O nome completo permanece um único h1 semântico; quebras visuais respeitam palavras inteiras.

## Layout

No protótipo B: container até 1280px, com margens de 64px em desktop, 32px abaixo de 900px e 20px abaixo de 600px. O CSS também ajusta composição em 1100px e expande a cena a partir de 1600px. A cápsula compacta mede até 322px; aberta chega a 404px, limitada pela viewport. A abertura de B é um disclosure nativo instantâneo; C implementa o comportamento descrito em Components.

Em B, hero de 760px, padding superior de 164px; telas largas usam 830px/204px, mobile 620px/154px. Em D, o header reserva 96px em fluxo e o hero tem altura mínima de 664px com padding 68px 20px 60px; a partir de 1600px são 734px e padding superior de 108px. Abaixo de 600px são 524px e padding 58px 20px 24px. São alturas mínimas: conteúdo e quebra dos CTAs podem aumentar a cena. O título continua em duas linhas. Ações flexíveis usam gap de 16px (mobile 8px); empilham em 320px e ficam lado a lado em 375px nas capturas.

A decoração D começa 96px acima do hero, com clip apenas local. Arco desktop: top −15px e altura 700px; telas largas: 770px. Mobile: top 34px, altura 555px, largura 220% e posição esquerda −60%. O fechamento usa margem superior automática e padding superior de 100px (mobile 116px), sem bloquear scroll.

No protótipo B, RoboSense usa imagem ampla e texto lateral; Industry Week intercala uma faixa clara; Ateliê preserva a captura longa. Em larguras menores, a leitura progride verticalmente. Consultar [prancha de estados](docs/design-prototype/states.html) para geometria e storyboard: quadros consecutivos não implementam movimento.

## Elevation & Depth

A cápsula recebe sombra ambiente; a captura do Industry Week tem sombra discreta sobre papel. O restante depende de espaço, escala e contraste tonal. O arco tem três traços SVG e blur estático localizado, sem filtro animado em tela cheia. Valores de sombra e trechos renderizáveis estão no sidecar.

B permanece estático. Em C, `motion/mini` interpola dimensões/raio da cápsula e opacity/translateY dos filhos; não escala letras/avatar. Em D, GSAP controla a entrada do hero, sem disputar propriedades com Motion. A timeline autoral dura 1s, com `power2.out`: arco 0–800ms (y 30px, scale 1.04 e opacity 0.25 até repouso; borda de 12px para 2px), linhas do nome 120–860ms (yPercent 110, duração 640ms, stagger 100ms), posição 400–750ms (y 12px), descrição 500–900ms (y 10px), ações 640–1000ms (y 10px) e fechamento 600–1000ms. Apoios entram com opacity; filtros SVG de blur 24/7 permanecem estáticos. Os tempos adaptam a ordem observada em R2, sem alegar easing ou duração idênticos ao vídeo. Saudação E e storytelling avançado F continuam futuros em [MOTION_SPEC](docs/MOTION_SPEC.md), sujeitos aos respectivos gates.

## Shapes

Cápsula contínua com raio compacto e aberto próprios, avatar circular, CTAs discretamente arredondados e itens de navegação com curva moderada. As mídias mantêm formato e pixels originais; não há grade repetida de cards. O arco é uma curva geométrica decorativa, não um fundo radial genérico.

## Components

- **Ilha B:** snapshot estático com identidade constante, avatar GitHub exato e cinco destinos; `details/summary` permite abertura por teclado sem JS.
- **Ilha C aplicada:** mesma paleta aprovada (`surface`, `surface-hover`, `foreground`, `muted`, `accent`, `rule`), sombra e Manrope, restritas à navegação. Nome curto e avatar exato (40px); subtítulo de 12px indica a seção atual. A nota de posicionamento fica sob os destinos, em 12px/20px. Ícones SVG geométricos têm traço de 1,5px, 18px nos links e 22px no botão de 44px.
- **Geometria C:** compacta até 322×60px, largura limitada a viewport−32px; aberta até 404px. Altura natural observada de 365px em 768/1440/1920px e 385px em 320/375px pela quebra da nota, sem altura fixa para esconder conteúdo. Centro/topo permanecem estáveis: 32px a partir de 900px, 16px abaixo, acrescidos de safe-area. Painel alto tem scroll interno. Itens usam raio de 12px (B: 10px), alvo mínimo de 48px; “Atual” usa 11px e violeta (B: 12px e cinza). O foco usa contorno violeta de 3px com offset −3px, voltado para dentro para evitar recorte pelo overflow da cápsula (B: offset externo de 4px).
- **Interação C:** abertura 420ms e fechamento 340ms, curva (0.22, 1, 0.36, 1); filhos entram em 160ms após 80ms, stagger de 30ms e deslocamento de 8px, saem em 100ms. Novo comando reverte sem fila; foco em um destino resolve imediatamente a geometria. Escape retorna ao botão; clique externo/saída de foco fecham; links focam destinos. Reduced motion em execução aplica estados imediatos; no-JS preserva links visíveis em fluxo. Observers, listeners e animações têm cleanup. Os timings são escolhas de implementação, não easing extraído do vídeo.
- **Hero D aplicado:** Server Component com um h1, nome em duas linhas sob máscaras locais e texto/links vindos dos dados existentes. SSR/no-JS mostram o estado completo; a timeline só aprimora a cena. HomeMotion preserva sessão, import dinâmico, pular, watchdog de 2,2s, cancelamento por foco/gesto/hash/reduced/pagehide e cleanup. Reduced motion em execução resolve a cena; não há saudação/loading E, pin ou scrub F.
- **CTAs D:** principal e GitHub têm altura mínima de 48px, raio de 8px, padding 12px 20px (mobile 12px 16px), gap de 20px (mobile 12px) e foco violeta de 3px com offset 4px. O principal passa de foreground para accent no hover, mantendo ink; o secundário ganha surface e texto accent. São links nativos, com SVG de 18px e traço 1,5px.
- **CTA principal e discreto B:** links reais, altura mínima de 48px; hover do principal muda para violeta preservando tinta escura.
- **Link de case/contato:** sublinhado e alvo mínimo de 44px; foco visível com contorno de 3px e offset de 4px. Na faixa clara o contorno usa tinta.
- **Projetos:** imagens reais de [media-audit](docs/media-audit), com dimensões, alt e legenda. Origem, contexto e permissões em [MEDIA_ASSETS](docs/MEDIA_ASSETS.md).
- **Competências:** lista sem porcentagens, cada grupo acompanhado por evidência de uso.
- **Arco:** SVG decorativo oculto da árvore acessível; não substitui conteúdo nem controla a navegação.

O sidecar preserva os snippets de B como amostras documentais e registra C em `extensions.appliedNavigation` e D em `extensions.appliedHero`; não acrescenta inputs, formulários, chips ou cards ao produto. Snippets não são componentes prontos para integrar ao React. O hero agora segue B; verde, cards e demais superfícies posteriores continuam legados, fora de D. A ilha aberta pode sobrepor temporariamente o nome, conforme o disclosure C aprovado.

## Do's and Don'ts

**Do:**

- Preservar nome, avatar exato, mídias reais, proporções e legendas com contexto.
- Manter semântica, teclado, foco visível e leitura sem JavaScript.
- Consultar docs/DESIGN_SYSTEM.md e os contratos de fase antes de implementar.

**Don't:**

- Inventar experiência, métricas, prêmios, disponibilidade, fotografias ou interfaces de projetos.
- Tratar storyboard, snippets ou revisão estática como animações entregues.
- Aplicar este snapshot a src ou produção sem autorização da fase correspondente.
