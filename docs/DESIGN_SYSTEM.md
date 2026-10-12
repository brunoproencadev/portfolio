# Design system — proposta da Fase B

Revisão2026-10-12: direção B aprovada; ilha C e hero/entrada D aplicados localmente. Manrope compartilhada, paleta violeta/neutra escopada. Demais superfícies preservam o sistema anterior até seus gates. [Prova D](PHASE_D_REVIEW.md), [prova C](PHASE_C_REVIEW.md), [componentes](COMPONENT_SPEC.md), [direção](VISUAL_DIRECTION.md). Baseline anterior recuperável em72d5877.

## Cores

| Token         | Valor   | Papel                              |
| ------------- | ------- | ---------------------------------- |
| background    | #08090d | Fundo/negativo do arco             |
| surface       | #202024 | Cápsula                            |
| surface-hover | #303037 | Opção hover/ativa                  |
| foreground    | #f5f3ff | Texto principal                    |
| muted         | #b8b5c5 | Texto secundário sobre escuro      |
| accent        | #bda4ff | Links/foco, não disponibilidade    |
| accent-deep   | #7350d6 | Halo decorativo, nunca texto       |
| paper         | #eeedf3 | Faixa editorial clara              |
| ink           | #181720 | Texto sobre paper/CTA              |
| paper-muted   | #56525f | Legenda sobre paper                |
| rule          | #34333d | Separador decorativo               |
| control       | #858090 | Limite essencial quando necessário |

Pares calculados em [PHASE_B_REVIEW](PHASE_B_REVIEW.md). Normal ≥4,5:1; grande/controle/foco ≥3:1. Texto não cruza a borda luminosa. Contraste de pares isolados não comprova legibilidade sobre luz. Estado ativo inclui forma/texto.

## Fonte e escala

Manrope Latin variável, local, 24.836 bytes, SIL OFL 1.1. [Origem/hash](design-prototype/fonts/source.json) e licença distribuída junto da fonte. `font-display:swap`; fallback Arial/sans-serif. Na produção usar next/font/local e medir CLS/acentos; preload só da família usada. Orçamento anterior de fontes ≤120 KiB preservado.

| Papel            | Desktop                     | Mobile                      | Peso / entrelinha / tracking |
| ---------------- | --------------------------- | --------------------------- | ---------------------------- |
| Nome h1          | `clamp(64px, 6.65vw, 96px)` | `clamp(36px, 10.5vw, 58px)` | 500 / 1,06 / -0,04em         |
| Seção            | `clamp(40px, 5vw, 72px)`    | 36–42 px                    | 500 / 1,08 / -0,035em        |
| Projeto          | 40–56 px                    | 30–36 px                    | 600 / 1,1 / -0,03em          |
| Lead             | 20 px                       | 18 px                       | 400 / 1,6 / normal           |
| Corpo            | 16 px                       | 16 px                       | 400 / 1,7 / normal           |
| Legenda/controle | 13–14 px / 14–16 px         | 13–14 px / 14–16 px         | 500 / 1,5 / normal           |

H1 “Bruno” / “Proença Silva”, palavras inteiras, um nome semântico no DOM. Corpo até65 ch; apoio hero até48 ch centralizado. Sem labels decorativos em mono. Código/diagrama real pode usar Consolas/monospace.

## Grid, ritmo e profundidade

Container1280 px; gutters64 px desktop/32 px tablet/20 px mobile. Breakpoints600/900 px preservados; scroll avançado só candidato ≥900 px e altura≥700 px. Grid conceitual12/6/4 colunas, gaps24/20/16 px. Mobile uma coluna de leitura. Escala4/8/12/16/24/32/48/64/96/128 px.

Seções96–128 px, grupos16–32 px; mobile64–80 px. Hero desktop760 px, nome inicia perto de y180 em 1440×900; arco termina perto de y590. Trabalho real aparece antes do fim da primeira dobra. Mobile cena620 px com CTAs antes da luz, mídia no fluxo.

Ilha raio30 px compacta/28 px aberta; mídia0–12 px; botões8 px. Ilha elevada com sombra `0 16px 48px #0007`. Sem backdrop-filter obrigatório nem cards aninhados. Molduras não alteram pixels do screenshot.

## Luz

SVG viewBox1440×700, curva de (−80,365) via (720,845) até (1520,365), vértice y605. Grande elipse inferior, extremidades sobem e centro desce. Halo violeta amplo fraco, banda violeta estreita, núcleo claro1–2 px; interior negro. Três camadas geométricas, não radial-gradient genérico.

SVG decorativo aria-hidden; blur estático localizado, nunca filtro animado full-screen. Futuro GSAP anima wrappers de opacity/transform. Mobile recorta só a decoração e reduz intensidade, sem overflow-x:hidden global disfarçando layout quebrado.

## Estados e acessibilidade

Links sublinhados fora de controles óbvios, underline-offset4 px. Foco3 px accent/offset4 px, ink sobre paper. Seleção accent/ink; cursor padrão; scrollbar temática sem reduzir largura nativa. Alvos≥44 px. Zoom200% não comprime identidade contra botão; painel alto rola internamente.

Não há estado loading/desabilitado artificial em links. Mídia falha preserva alt/proporção/legenda e acesso ao repositório. Falta de foto resulta em composição textual. Erro/404 usam recuperação existente. Produto sem JS mantém destinos; protótipo usa disclosure nativo.

## Movimento proposto

| Token        | Valor inicial                           | Dono futuro               |
| ------------ | --------------------------------------- | ------------------------- |
| feedback     | 160 ms                                  | CSS hover/press           |
| island-open  | 420 ms, bezier(0.22,1,0.36,1)           | Motion dimensões          |
| island-close | 340 ms; filhos100 ms                    | Motion                    |
| island-child | 160 ms; delay80 ms; stagger30 ms; y8 px | Motion                    |
| hero-entry   | total1000 ms                            | GSAP                      |
| intro        | 850+150+450=1450 ms                     | GSAP traço/pausa/retirada |
| watchdog     | 2200 ms independente                    | HomeMotion                |

Tokens são propostas compatíveis com os intervalos observados, não easing recuperado do vídeo. Motores não disputam propriedade/elemento. Mobile/reduced sem pin/FLIP/parallax; mudança em execução cancela efeitos. B é estático: não comprova timings, spring ou loader. Contratos em [MOTION_SPEC](MOTION_SPEC.md).

## Entrega

Migrar tokens em src/styles/globals.css nas fases autorizadas; preservar dados/rotas/handlers/testes. Não importar o CSS documental no app. Medir fonte/imagem/LCP/CLS após integração. Nenhuma nova dependência em B.
