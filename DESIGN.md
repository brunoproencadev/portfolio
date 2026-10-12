---
name: "Bruno Proença Silva — protótipo B"
description: "Snapshot documental de horizonte e evidência; proposta B aguardando aprovação visual."
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

# Design System: Bruno Proença Silva — protótipo B

## Overview

**Creative North Star: "Horizonte e evidência"**

Nome sob uma borda de luz conduz a trabalho verificável, transformando curiosidade em evidência visual. Preto profundo, luz violeta interior, Manrope aberta, cápsula cinza e faixas de projeto com escalas distintas sustentam essa direção.

**Proposta B aguardando aprovação visual; não representa src nem produção.** Este arquivo é índice e snapshot dos tokens do [protótipo estático B](docs/design-prototype/index.html), extraídos de [style.css](docs/design-prototype/style.css) e do SVG da home. O frontmatter descreve esses valores observados; a especificação detalhada e os contratos futuros permanecem em [DESIGN_SYSTEM](docs/DESIGN_SYSTEM.md), [COMPONENT_SPEC](docs/COMPONENT_SPEC.md) e [VISUAL_DIRECTION](docs/VISUAL_DIRECTION.md). Não importar o CSS documental no app nem tratar este snapshot como autorização para migrar tokens ou fontes.

**Key Characteristics:**

- Identidade real e conteúdo em português, sustentados por evidência.
- Composição escura com luz violeta e uma faixa editorial clara.
- Projetos em escalas distintas, preservando as proporções das mídias.
- Navegação e leitura disponíveis sem JavaScript.

A revisão independente retornou `ship` somente no escopo estático B, sem achados materiais. [Resultados](docs/design-review/results.json) registram cinco larguras, fonte/imagens carregadas, ausência de overflow e zero violações axe nos estados avaliados. Isso não equivale a aprovação visual do usuário, certificação WCAG, validação de produção ou entrega de animações.

## Colors

Acento violeta sobre neutros quase pretos; papel claro aparece no capítulo Industry Week, com tinta escura e legenda própria.

- **Primary:** `accent` serve a foco, hover e ênfase; `accent-deep` pertence ao halo decorativo do SVG, nunca ao texto.
- **Neutral:** `background` guarda o negativo do arco; `surface` e `surface-hover` distinguem cápsula e opção ativa; `foreground` e `muted` hierarquizam texto.
- **Neutral claro:** `paper`, `ink` e `paper-muted` preservam contraste na faixa editorial.
- `rule` separa regiões sem representar um controle; `control` colore a scrollbar e reserva contraste para limites essenciais.

**The Legibility Rule.** Texto não cruza a borda luminosa; indicação atual inclui texto e forma além da cor.

Pares calculados estão nos resultados da revisão. Rampas tonais do sidecar são amostras sintetizadas para o painel, não novos tokens aprovados.

## Typography

Manrope Latin variável local, com Arial/sans-serif como fallback, carrega apenas no protótipo documental. Licença SIL OFL 1.1 e origem estão em [fonts/source.json](docs/design-prototype/fonts/source.json); `font-display: swap` preserva leitura. A integração de produção e a medição de CLS continuam futuras.

O frontmatter registra os papéis observados: nome (`display`), seção (`headline`), projeto (`title`), leitura (`body`), CTA (`label`) e legenda (`caption`). São extrações do CSS, não uma nova escala para o app. No mobile, o nome usa clamp(36px, 10.5vw, 58px); seções usam 40px, contato 36px e projetos 36px. O apoio central tem largura máxima de 48ch, reduzida para 33ch no mobile.

**The Real Name Rule.** O nome completo permanece um único h1 semântico; quebras visuais respeitam palavras inteiras.

## Layout

Container até 1280px, com margens de 64px em desktop, 32px abaixo de 900px e 20px abaixo de 600px. O CSS também ajusta composição em 1100px e expande a cena a partir de 1600px. A cápsula compacta mede até 322px; aberta chega a 404px, limitada pela viewport. A abertura é um disclosure nativo instantâneo.

Hero de 760px, com padding superior de 164px no conteúdo; em telas largas, 830px e padding de 204px. Mobile usa cena de 620px e padding de 154px. O arco móvel usa largura de 220% e posição esquerda de −60%, recortando apenas decoração.

RoboSense usa imagem ampla e texto lateral; Industry Week intercala uma faixa clara; Ateliê preserva a captura longa. Em larguras menores, a leitura progride verticalmente. Consultar [prancha de estados](docs/design-prototype/states.html) para geometria e storyboard: quadros consecutivos não implementam movimento.

## Elevation & Depth

A cápsula recebe sombra ambiente; a captura do Industry Week tem sombra discreta sobre papel. O restante depende de espaço, escala e contraste tonal. O arco tem três traços SVG e blur estático localizado, sem filtro animado em tela cheia. Valores de sombra e trechos renderizáveis estão no sidecar.

Não há animações implementadas em B. Motion, GSAP, FLIP, intro e storytelling de scroll são contratos futuros de [MOTION_SPEC](docs/MOTION_SPEC.md), dependentes dos gates correspondentes.

## Shapes

Cápsula contínua com raio compacto e aberto próprios, avatar circular, CTAs discretamente arredondados e itens de navegação com curva moderada. As mídias mantêm formato e pixels originais; não há grade repetida de cards. O arco é uma curva geométrica decorativa, não um fundo radial genérico.

## Components

- **Ilha:** identidade constante, avatar GitHub exato e cinco destinos. `details/summary` oferece abertura por teclado sem JS; Escape, observer, fechamento contextual e transição dimensional ainda pertencem à fase C.
- **CTA principal e discreto:** links reais, altura mínima de 48px; hover do principal muda para violeta preservando tinta escura.
- **Link de case/contato:** sublinhado e alvo mínimo de 44px; foco visível com contorno de 3px e offset de 4px. Na faixa clara o contorno usa tinta.
- **Projetos:** imagens reais de [media-audit](docs/media-audit), com dimensões, alt e legenda. Origem, contexto e permissões em [MEDIA_ASSETS](docs/MEDIA_ASSETS.md).
- **Competências:** lista sem porcentagens, cada grupo acompanhado por evidência de uso.
- **Arco:** SVG decorativo oculto da árvore acessível; não substitui conteúdo nem controla a navegação.

O sidecar reproduz apenas exemplos existentes; não acrescenta inputs, formulários, chips ou cards ao produto. Seus snippets são amostras do protótipo, não componentes prontos para integrar ao React.

## Do's and Don'ts

**Do:**

- Preservar nome, avatar exato, mídias reais, proporções e legendas com contexto.
- Manter semântica, teclado, foco visível e leitura sem JavaScript.
- Consultar docs/DESIGN_SYSTEM.md e os contratos de fase antes de implementar.

**Don't:**

- Inventar experiência, métricas, prêmios, disponibilidade, fotografias ou interfaces de projetos.
- Tratar storyboard, snippets ou revisão estática como animações entregues.
- Aplicar este snapshot a src ou produção sem autorização da fase correspondente.
