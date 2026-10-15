# F — estudo isolado da passagem hero → RoboSense

Continuação autorizada por “Continue o projeto”, em 2026-10-15. F permanece em correção após a segunda rejeição visual. Este incremento entrega somente o protótipo para revisão; a integração e as fases G–I aguardam aprovação.

## Plano e decisões

- KEEP: `SiteNavigation`, `CinematicHero`, conteúdo factual, imagem M3 e home atual. Reutilizar os componentes e dados sem editá-los.
- REBUILD, somente no estudo: os dois intervalos independentes de hero/imagem dão lugar a uma timeline em um palco sticky nativo. Nada intercepta wheel/touch ou substitui o scroll do navegador.
- Foco: o arco desce enquanto o texto se desfaz e a imagem sobe ao mesmo centro; a imagem estabiliza antes de o contexto do projeto entrar em fluxo. Referência: `2.mp4`, 6,30–8,70s; reversão em 13,20–16,80s. Timestamps são posições do gesto, não durações prescritas.
- Orçamento: uma sequência, 140svh adicionais (teto B: 180svh), scrub amortecido em 0,35s; transform/opacity e blur limitado a 6px no texto. Sem motor/dependência adicional ou suavização global.
- Isolamento: `/experimentos/hero-projeto` serve somente com `NODE_ENV=development`; build/start de produção devem responder 404. Sem entrada no sitemap. Nenhum push/deploy.
- A cena é elegível somente a partir de 900×800px e com movimento permitido. A altura mínima de 800px conserva o fechamento do hero; abaixo disso, mobile, reduced motion, no-JS e falha do import usam hero → imagem → contexto em fluxo. A navbar recebe todos os seus destinos reais, com conteúdo dos dados existentes; essas seções não têm animações novas.
- Superfície alterada: nova rota, controlador e CSS locais; teste focado; documentos de continuidade. Nenhum caller da home muda. Riscos a verificar: foco em hero invisível, hash direto, resize/preferência em execução, imagem recortada, início/fim/reversão e liberação do sticky.

## Evidências e limites

Fonte: `e941dd570768c9fdb114781876d4d93bcc693a9c`. Evidências: `dac0825130231a32e1447588a9692b09d82d834f`. Revisão própria; sem parecer independente e sem aceite visual do usuário.

### Experimentar

Servidor local deixado em [localhost:3102/experimentos/hero-projeto](http://127.0.0.1:3102/experimentos/hero-projeto). Para reiniciar: `node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3102`. A rota exige desenvolvimento; não aparece na home ou no sitemap.

1. Role devagar até o frame, pare durante a passagem e volte.
2. Repita com um gesto rápido. O scroll continua nativo; somente a timeline acomoda em 0,35s.
3. Use “Explorar projetos”, Menu → Início e depois volte a rolar.
4. Compare com R2, principalmente o cruzamento entre arco, texto e mídia. O aceite pedido é dessa passagem, não da home completa.

[Prancha comparativa](scroll-prototype-review/comparison.jpg), [geometria/capturas](scroll-prototype-review/capture-results.json), [validação](scroll-prototype-review/verification.json) e [smoke de produção local](scroll-prototype-review/production-smoke.json).

Revisão com dois vídeos independentes, somente neste checkout: `.audit/phase-f-prototype/review.html`. O trecho R2 6,30–8,70s está em `reference-6.3-8.7.mp4`; a gravação real inclui roda progressiva/reversa, gesto rápido, CTA/menu e estados controlados finais. Vídeos em `interaction-1440.webm`, `interaction-1920.webm` e `interaction-375.webm`, no mesmo diretório ignorado. Os gestos têm velocidades diferentes; a prancha associa papéis narrativos, sem alegar sincronização temporal exata. Hash do original conferido; somente a barra do navegador foi recortada da referência. Original preservado.

### Comparação observada

| Referência                                            | Estudo                                                   | Diferença pendente de avaliação                                                                                                                  |
| ----------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 6,30s: título e arco estáveis                         | p0: hero reutilizado, arco com altura `max(700px,80svh)` | Nome em duas linhas e navbar aprovada têm proporções próprias                                                                                    |
| 6,60s: arco desce; texto perde definição; mídia entra | p0,25: os três movimentos participam da mesma timeline   | A mídia ainda está mais baixa neste estado; não afirmar correspondência exata de progresso                                                       |
| 6,90s: imagem central; texto residual atrás           | p0,50: imagem praticamente em leitura                    | Texto já saiu; o frame do RoboSense é mais claro, com maior massa visual                                                                         |
| 7,20–8,70s: leitura estabiliza                        | p0,75–1: mídia e legenda estáveis                        | Em 1440px a imagem ocupa 66,7% da largura, contra cerca de metade na referência; em 1920px ocupa 50%. Preserva o frame integral e suas anotações |
| 13,20–16,80s: percurso reverso                        | Gravação com roda reversa reconstrói a mesma cena        | Curva original e distância do gesto desconhecidas; amortecimento autoral                                                                         |

Imagem final 960×540 em 1440×900, posição x240/y161,60; em 1920×1080, x480/y251,60. Sem máscara sobre os pixels. A legenda centralizada junto à imagem explica o centro ligeiramente acima do meio da viewport. `width/height` no JSON medem a imagem; `viewport` identifica a janela.

### Validação e falhas preservadas

- 18 casos distintos E2E aprovados entre Chromium, Firefox e WebKit: rodada principal 15/15; import GSAP bloqueado 3/3. Reconfirmação final responsiva 3/3 após acrescentar fallback em 1920×700. Sem retries/skips.
- Ida/reversão, imagem integral, CTA/menu, foco em controles do hero, hash direto de projeto/contato, reduced em execução, resize, no-JS e falha do chunk. Axe: zero violações nos estados inicial desktop e leitura mobile avaliados.
- Larguras 320/375/768/1440/1920; viewport 1920×600/700 em fluxo; viewport 720×450 como aproximação de espaço disponível em zoom, não zoom real. Limite 1440×800 conferido: ações e fechamento do hero dentro da viewport.
- 15 JPEGs duráveis, incluindo cinco estados por desktop e uma prancha. Três gravações reais; zero pageerrors nas capturas. Rodas programadas no navegador real não medem fluidez em aparelho físico.
- Lint do repositório, build/TypeScript, 7/7 unitários, formato dos arquivos alterados e diff-check aprovados. Smoke do build: home/case/sitemap 200, estudo 404; sem experimento no sitemap. Build emite aviso de `metadataBase`/localhost no perfil local, sem alteração de publicação.
- Primeira rodada: 4 passes/1 falha de geometria; imagem terminava em y990 numa viewport de 900px. Causa: centralização CSS `translate` concorria com `y` do GSAP. Centralização passou ao mesmo owner `xPercent/yPercent`; testes posteriores passaram.
- Primeiro lint exigiu `Link` no retorno à home. Corrigido; lint final passou. O bloco acrescentado automaticamente pelo `next dev` a AGENTS.md foi removido, preservando o arquivo anterior.

Não executados: suíte integral da home, novo Lighthouse/INP, dispositivo físico, leitor de tela ou zoom real. Build/testes não certificam fluidez, WCAG completo ou fidelidade perceptual. As referências não fornecem easing, distância de scroll nem comportamento mobile.

## Gate

F continua reaberta. Aguardar avaliação visual desta passagem antes de integrar à home ou replicar cenas, conforme a estratégia registrada após a segunda rejeição em HANDOFF. Se aprovada, próximo incremento ainda é F: integrar somente a passagem aprovada e revalidar a convivência com intro/navegação/storytelling existentes. G–I, push e deploy não estão autorizados.
