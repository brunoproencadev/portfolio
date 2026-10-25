# Fase D — hero cinematográfico

Entrega para revisão do usuário em 2026-10-12, fonte `7d4d018`, sobre baseline C `e63bb7d`. Autorização registrada em `f24cd81`. Branch redesign/cinematic-portfolio; nenhum push/deploy. E depende de aprovação explícita.

## Entrega e preservação

Nome central em duas linhas, Manrope local, arco violeta com halo/banda/borda separados e entrada coordenada de1s. CinematicHero permanece Server Component; posição, introdução, áreas e frase editorial preservam dados reais. CTAs levam a projetos e GitHub. A reconstrução do caderno orbital é justificada pela divergência de composição em REDESIGN_AUDIT e PHASE_D_PLAN.

HomeMotion mantém sessão, cancelamento por foco/gesto/hash/reduced/pagehide, botão pular, import dinâmico, watchdog2,2s e cleanup. HTML inicial legível sem JS. Header reserva96px no fluxo; SVG decorativo usa clipping local. Navbar C, scroll/reveals existentes, conteúdo, rotas, SEO, cases e dependências preservados. Fonte compartilhada sem adicionar biblioteca/WebGL.

## Comparação observável

| Critério                  | Fonte                                                | Implementação e diferença                                                                                                                                                                         |
| ------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D01 composição            | R2,2.mp4,2,6–4,8s; B home-1440                       | Nome central, negativo acima do arco, apoio e CTAs no centro. Arco usa os três paths do estudo B. Texto factual existente substitui copy demonstrativa do protótipo. Não é cópia da landing SaaS. |
| D02 sequência             | R2 mostra arco definindo borda antes de título/apoio | Arco0–800ms; título120–860ms, stagger100ms; posição400–750ms; descrição500–900ms; ações640–1000ms; fechamento600–1000ms. power2.out é decisão autoral, não easing original conhecido.             |
| D03 adaptação e custo     | Vídeo original só demonstra desktop                  | 320/375/768/1440/1920 sem overflow; CTAs≥44px, título único legível, falha de fonte testada. 320 usa duas linhas de ações. Reduced e no-JS mantêm composição estática. Lighthouse medido abaixo.  |
| Continuidade com navbar   | Ilha C e estados do protótipo B                      | Menu aberto sobrepõe temporariamente título, fecha com Escape/clique externo/saída de foco; é a superfície existente, sem segunda camada de navegação.                                            |
| Continuidade com projetos | R2,6,3–8,7s; transição planejada em B                | Screenshot/pin/scrub e novo showcase pertencem a F. O verde e os cards da seção seguinte permanecem anteriores; essa quebra visual é transitória e explicitamente fora de D.                      |

Não há alegação de pixel-perfect, easing idêntico, fidelidade mobile a vídeo inexistente ou conclusão de E–I.

## Evidências

- [Hero desktop](hero-review/hero-1440.jpg), [mobile](hero-review/hero-375.jpg), [320px](hero-review/hero-320.jpg), [tablet](hero-review/hero-768.jpg), [1920px](hero-review/hero-1920.jpg).
- Ilha aberta sobre hero: [desktop](hero-review/island-open-1440.jpg), [mobile](hero-review/island-open-375.jpg).
- Gravações reais25fps: [sequência desktop](hero-review/recorded-sequence-1440.jpg), [sequência mobile](hero-review/recorded-sequence-375.jpg). WebMs locais `.audit/phase-d/hero-entry-1440.webm` (2,2s) e `hero-entry-375.webm` (2,12s); hashes no [manifesto](hero-review/manifest.json).
- Frames controlados em32/150/350/650/1000/1250ms: `hero-review/entry-*.jpg`. Relógio pausado facilita inspecionar a coreografia; não mede fluidez.
- [Resultados geométricos e amostras RAF](hero-review/results.json):100 amostras totais,38 desktop/62 mobile. Intervalo máximo46,6ms desktop/18,3ms mobile; duração amostrada1041,5/1006,3ms. Não afirmar60fps constante; gravação e automação têm custo. Sem overflow/pageerrors e zero violações axe nas cinco larguras estáticas.

## Validação e histórico de correções

Formato dos arquivos de código alterados, lint integral sem avisos, TypeScript strict, build e Vitest7/7 aprovados. Build conserva aviso metadataBase no preview sem SITE_URL; indexação não alterada.

Primeira rodada E2E:144 aprovados/5 excluídos/4 falhas. Testes antigos usavam o h1 como clique externo; a nova posição central fica atrás da ilha expandida. Alvo corrigido para `.hero-end`, preservando assertions de foco/fechamento.

Rodada ampla com novos testes:154 aprovados/5 excluídos/3 falhas,162 casos. Somente a nova assertion de transform antes do primeiro RAF falhou nos três engines. Espera de `translate` e avanço32ms corrigem a sincronização. Rerun focado hero:9/9, zero falhas,14,31s, Chromium/Firefox/WebKit. As três falhas foram resolvidas nessa rodada; não foi feita outra execução integral limpa. [Resumo preservado](hero-review/verification.json).

As cinco exclusões são preexistentes: duas de zoom nativo exclusivo Chromium e três de Tab no runner WebKit/Windows. A cobertura inclui reduced inicial/em execução, no-JS, falha/import lento, watchdog, cleanup/reentrada, hash, navegação, cases e tamanhos; não certifica WCAG nem substitui Safari/dispositivos/leitor de tela.

## Performance local

Build de produção local em127.0.0.1:3101, Windows11 Pro, Ryzen7 5700G, RAM≈29,95GB, Node24.15.0, Chromium156.0.8078.4, Lighthouse13.5.0. Mobile412×823, throttling simulado CPU4×, RTT150ms/throughput1638,4Kbps. Sem E2E concorrente. [Ambiente completo](hero-review/lighthouse-environment.json), [três rodadas](hero-review/lighthouse-summary.json).

| Rodada  | Performance | LCP       | CLS     | TBT     |
| ------- | ----------- | --------- | ------- | ------- |
| 1       | 97          | 2402,70ms | 0,03888 | 89,86ms |
| 2       | 98          | 2387,00ms | 0,03888 | 73,80ms |
| 3       | 98          | 2368,78ms | 0,03888 | 55,84ms |
| Mediana | 98          | 2387,00ms | 0,03888 | 73,80ms |

Todas atenderam LCP≤2,5s e CLS≤0,1 neste laboratório. Acessibilidade/boas práticas100; SEO66 por noindex intencional. Peso total251.291bytes. Oportunidades observadas: JS não usado≈52KiB, legado≈14KiB e recursos bloqueantes≈300ms. Nenhuma dependência adicionada. TBT não comprova INP. Resultado próximo à meta LCP exige reavaliar após mídia/scroll/intro e no ambiente publicado.

## Revisão e próximo gate

Revisão independente: **ship**, nenhum defeito material no escopo D, com cinco seções contratuais em [finish-review](hero-review/finish-review.md). Detector local encontrou padrões legados nas seções/cases e divergências de rampas documentais; o arco violeta e a composição central são exigências do brief. Correções e disposição final devem ser lidas no relatório do revisor.

A próxima fase E trata da saudação manuscrita e transição para este hero, com conclusão segura, opção de pular, reduced motion e gravação. Ela ainda não foi iniciada. Fotos LinkedIn e uso do avatar no favicon permanecem pendências de fases posteriores. Aprovação de D não autoriza publicação.
