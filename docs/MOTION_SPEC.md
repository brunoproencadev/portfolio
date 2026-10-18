## Estado vigente F — transições e faixas, 2026-10-17

Esta seção substitui as geometrias históricas abaixo. `HomeMotion` carrega o owner de scroll em qualquer viewport com `no-preference`; reduced motion mantém o fluxo estático. `section-transitions` coordena detalhes RoboSense, Sobre, abertura dos projetos e Competências com scrub0,45s no desktop e0,25s no compacto. Contato e footer ficam fora desse owner. Foco e hash acomodam as timelines antes da medição; pagehide, aba oculta, mudança de preferência e desmontagem liberam seus recursos.

Projetos usam um único pin a partir de1100×800, top112px, extensão160svh. O trilho de duas colunas move xPercent0→−50 entre p0,2–0,8, ease none e scrub0,5s; fundos cruzam entre p0,325–0,675. Viewports menores ou baixos permanecem no fluxo vertical, mas recebem transições menores de seção. As faixas de contato cruzam a−6°/+6°, repetem dois grupos iguais e percorrem sentidos opostos em loop de34px/s. O delta do scroll adiciona impulso limitado a±600px/s e amortecido; IntersectionObserver, ResizeObserver, visibilitychange, reduced motion e eventos de página controlam execução e cleanup. Não há botão de pausa nem interceptação de wheel/touch. [Relatório e provas](PHASE_F_TRANSITIONS.md).

## Histórico — correção F inferior + R4, 2026-10-15

Substituiu o trecho inferior da integração abaixo, rejeitado pelo usuário; hero→RoboSense e navbar continuaram aprovados. [Relatório histórico](PHASE_F_LOWER_REVIEW.md). Os números desta seção descrevem o commit `77d2506` e não a implementação vigente.

- **Projetos:** mesmo `home-reveals` e único pin120svh/top112px, elegível ≥900×700/no-preference. Janela altura100svh−160px; track largura200%, duas colunas de50%. Texto/estado/janela viajam em xPercent0→−50 entre p0,2–0,8, ease none; leitura nas extremidades e scrub0,35s. Fundos cruzam p0,35–0,65. Entrada scaleX0,92→1/máscara35→0% preservada; saída retorna à rolagem vertical.
- **Ateliê:** preview clamp(280px,65svh,620px), original intacto e link para captura completa. Altura da seção em1440×900 cai de2402 para829px, sem alongamento vazio da coluna de texto.
- **Sobre:** scale0,84→1/y110→0 e título x−80→0 distribuídos de top85% a bottom80%, encerrando quando o painel está visível. Texto decorativo x0→overflow negativo medido, sem distância percentual arbitrária.
- **Competências:** composição desktop em CSS independentemente do estado GSAP; linhas estáticas. Título sticky/top144px somente ≥900×800/no-preference, sem segundo pin. Foco/retomada não troca a altura da seção.
- **Contato:** translação das duas faixas −12→0% e8→−8%; inclinações constantes em CSS, sem novo giro durante a passagem.
- **Foco e ciclo:** foco normal mantém o pin; teclado (`:focus-visible`) centraliza somente quando o alvo está sob a navbar ou fora do viewport. Clique não reposiciona o link entre mousedown e mouseup. Hash/reduced/pagehide continuam liberando e wheel/touch retomam com compensação da leitura. Hero mantém seu owner próprio. Cena horizontal não contém links escondidos.

Ícones reais substituem apenas os símbolos tipográficos dos pop-ups, mantendo nomes, posição e timeline da passagem aprovada. GSAP/Motion não compartilham propriedades; listeners/import tardio/matchMedia têm cleanup. Sem dependência ou interceptação de wheel.

## Histórico da integração anterior

## Integração F após aprovação da passagem — 2026-10-15

O usuário aprovou hero→RoboSense e solicitou ferramentas e revisão do restante. Fonte4acc977; [relatório](PHASE_F_INTEGRATION_REVIEW.md). `HeroProject/HeroProjectMotion` compartilham a mesma passagem entre home e estudo local, preservando a geometria e timeline do protótipo abaixo. Ferramentas reais entram em p0,68: y28→0, scale0,55→1, opacity0→1, duration0,12, stagger0,025, power3.out. Todas acomodadas em p0,875; leitura até p1. Estado inicial de todas é aplicado por gsap.set dentro do contexto antes do tween, garantindo reversão e cleanup.

Responsabilidades: intro controla `.hero-end`; passagem controla `.hero-outro` e os wrappers externos `.hero-content/.hero-light`, frame/legenda/ferramentas. `HomeMotion/home-reveals` fica apenas com conteúdo posterior. Nenhum transform é compartilhado com Motion da navbar. Imports da passagem só iniciam em ≥900×800/no-preference; `matchMedia` e desmontagem revertem. Foco em controles do hero/retorno #inicio acomodam imediatamente o estado inicial.

Restante permanece elegível em ≥900×700/no-preference. Todos os scrubs agora0,35s. Faixa: altura clamp(280px,34svh,360px), entrada scaleX0,92→1; único pin120svh/top112px. Troca em35–65%, yPercent0→−50 com power2.inOut; fundos cruzam0,22. Sobre: scale0,84→1/y110→0, power2.out; texto factual aria-hidden xPercent10→−12, sem tilt. Competências: título sticky/top144px no fluxo, linhas y64→0, power2.out; nenhum pin extra. Contato conserva trajetória anterior e recebe scrub amortecido.

Foco/hash libera os efeitos editoriais; roda/toque retoma preservando a leitura. A limpeza não apaga propriedades da passagem independente. Mobile/reduced/baixo/no-JS/falha de import mantém conteúdo no fluxo; ferramentas estáticas e texto decorativo oculto em mobile/reduced. Curvas e distâncias são decisões locais, não medições exatas das referências.

## Histórico — protótipo isolado F — 2026-10-15

Somente `/experimentos/hero-projeto`, fonte e941dd5; não altera a home descrita abaixo. Uma cena sticky nativa de 240svh (140 adicionais), somente ≥900×800/no-preference. ScrollTrigger top top→bottom bottom, scrub0,35s, uma timeline normalizada. Hero-content y0→−48/opacity1→0/blur0→6px em p0,04–0,38; fechamento sai em p0–0,12; arco y0→52vh/opacity1→0 em p0–0,48. Frame integral y65vh→0/scale0,55→1/opacity0→1 em p0,10–0,68, power2.out; xPercent/yPercent−50 centralizam sem disputar translate CSS. Legenda aparece em p0,64–0,76; restante é leitura. Arco mede max(700px,80svh). Escala/curva são decisões experimentais, não medições do easing original.

Âncoras seguem ao conteúdo em fluxo; foco no hero/retorno ao início acomodam imediatamente a timeline no estado inicial. Não há interceptação de wheel/touch, pin-spacer ou smooth scroll global. MatchMedia reverte estilos/classe ao sair de elegibilidade; imports tardios e desmontagem têm cleanup. Mobile/baixo/reduced/no-JS/falha ficam sequenciais. Uma imagem e legenda sem duplicatas, navbar existente fora do owner GSAP. [Prova, discrepâncias e gate visual](PHASE_F_PROTOTYPE_REVIEW.md).

## Histórico — correção F — 2026-10-14

O plano anterior foi rejeitado por insuficiência coreográfica. PHASE_F_CORRECTION_REVIEW passa a registrar a implementação vigente. R2: hero-content y0→130/blur0→6px e hero-light y0→240/opacity1→0, top top→bottom20%; filhos da entrada D/E não são controlados por scroll. RoboSense abre máscara8→0%, scale0,66→1/y−180→0, top bottom→top18%. Título dos projetos x−100→0/scale1,08→1. Não há redução de opacidade do texto do hero, corrigindo falha de contraste detectada por axe.

Faixa story-stage: entrada scaleX0,86→1 e máscara vertical35→0%; um pin120svh/top112px. Track troca Industry Week por Ateliê em35–65%, yPercent0→−50; título/estado/imagem viajam juntos. Fundos cruzam0,22→0 e0→0,22. Leitura ocupa70% do intervalo; links/detalhes ficam sempre fora da máscara. Recorte superior do Ateliê identificado, imagem integral no fluxo.

Sobre: título x−80→0, painel scale0,88→1/rotation−3→0/y70→0. Competências: linhas x±64→0, índices rotation−90→0/scale1,4→1 em progressão local. Contato: faixas xPercent−18→0 e12→−8, rotações−9→−4 e9→4. Scrub linear, nenhum loop ou segundo pin. Fotos/mosaico/objeto3D não implementados.

Foco/hash suspende e libera destinos; próximo wheel/touchstart pode retomar. Refresh síncrono precede compensação da posição de leitura. Reduced limpa imediatamente; no-preference restaura apenas scroll, nunca intro. Pagehide limpa/pageshow persisted restaura. Viewport estreito/baixo, no-JS e falha de chunk mantêm composição legível e sequencial. Todos os efeitos têm revert e limpeza das propriedades de seus wrappers.

## Histórico da aplicação F — 2026-10-13

M04 implementado em SelectedWork/home-reveals. RoboSense abre máscara6→0%, escala0,88→1 e y64→0 durante top bottom→top18%; scrub linear. Industry Week tem um pin de120svh, top112px, somente≥900×700/no-preference. Timeline0–0,35 mantém hero;0,35–0,65 translada track em -50% e troca fundo;0,65–1 mantém eras. O viewport da mídia limita a largura por (100svh−240px)×1440/1040, preservando margem para ilha e padding mesmo em1920×700. Apenas as mídias se movem, rótulos/links ficam imóveis. Ateliê é imagem vertical integral em fluxo. Diferença R3: dois estados do mesmo projeto, não troca de projetos distintos; sem inventar duração/easing do vídeo.

SSR/mobile/reduced/viewport baixo: duas capturas Industry sequenciais. HomeMotion mantém cancelamento por foco/hash/pagehide/reduced e late import inofensivo. gsap.matchMedia é owner único das timelines; revert remove pin/classe e clearProps libera transform/clipPath/opacity dos wrappers exclusivos, inclusive identity transform deixado pelo refresh do ScrollTrigger. D/E não compartilham elementos animados com F. Sem fade repetitivo em About/Skills, sem dependências novas. Documentar provas finais em PHASE_F_REVIEW.

# Especificação de movimento — observações A e decisões B

## M03 implementado — E

“olá” em quatro traços originais do estudo B, não assinatura pessoal. stroke-dasharray/pathLength normalizados; desenho linear0–850ms proporcional ao comprimento, pausa850–1000ms. Opacidade da saudação1→0 em1000–1150ms; camada yPercent0→−100 em1000–1450ms, power3.inOut. A sequência D abaixo mantém sua duração/easing, com início deslocado para850ms dentro do conjunto E. Total1850ms, limite independente2200ms desde a elegibilidade.

Default SSR sem camada. Instalação de cancelamento precede exibição; import falho/tardio não cria tela presa. Foco fora de Pular e pointerdown em conteúdo/navbar também cancelam, além de Escape, roda/toque, hash/pagehide/reduced. Camada pointer-events none/aria-hidden, Pular acima; sem bloquear scroll/foco. Estados finais limpos por context.revert e hidden do owner. Mobile usa a mesma sequência curta, traço104px; desktop até144px. Reduced usa hero estático sem saudação/import de animação.

R3 é mais longo e escreve “hello”; E adapta para português e duração curta aprovada em B. Evidências E devem distinguir relógio controlado de gravações reais; não chamar esse gesto de progresso de carregamento.

## Entrada D implementada

Timeline total1000ms, ease power2.out: arco HTML y30/scale1,04/opacity0,25→estado final em800ms; borda SVG stroke-width12→2 no mesmo intervalo. Linhas do h1 yPercent110→0 em640ms, início120ms e stagger100ms. Posição400–750ms, descrição500–900ms, ações640–1000ms; fechamento editorial600–1000ms. As durações são autorais fundamentadas na ordem R2, não easing original medido.

HomeMotion preserva cancelamento por interação/foco/hash/reduced/pagehide, skip, sessão e fallback sem biblioteca. Contexto GSAP é revertido ao terminar/cancelar; não deixa transforms inline residuais. Mobile mantém a entrada curta; reduced usa composição estática. E agora integra a saudação antes desta entrada, conforme M03 implementado acima. Frames controlados e gravações reais em hero-review, testes em hero.spec/motion.spec.

Base observada: [REFERENCE_ANALYSIS](REFERENCE_ANALYSIS.md). B aprovada; M01 implementado e validado em C, fonte d7e377f: abertura420ms/fechamento340ms, filhos160ms/delay80ms/stagger30ms/y8px e saída100ms. Motion mini mede dimensões naturais; reduced/foco/resize/falha terminam imediatamente. [Evidências e limites](PHASE_C_REVIEW.md). M02 entrada do hero implementada em D; M03 implementado em E; M04–M05 e transição de scroll continuam propostas F–G. Faixas abaixo preservam a proposta A, sem alegar easing original conhecido.

## Responsabilidades e invariantes

| Dono                                   | Responsabilidade futura                         | Preservar                                                                                                            |
| -------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `SiteNavigation` + Motion já instalado | Estado/layout/entrada e saída da ilha           | Disclosure não modal, links reais, foco, Escape, clique externo, seção ativa, no-JS, cleanup                         |
| `HomeMotion`                           | Elegibilidade, cancelamento, imports e watchdog | Storage opcional, guarda por documento, hash/scroll inicial, reduced motion em execução, imports tardios inofensivos |
| `home-sequence` + GSAP                 | Intro e entrada coordenada do hero              | Contexto local e retorno de função de limpeza                                                                        |
| `HeroProjectMotion` + ScrollTrigger    | Passagem hero→RoboSense e ferramentas           | Sticky nativo, foco no hero legível, reduced/no-JS, import tardio e desmontagem/revert                               |
| `home-reveals` + ScrollTrigger         | Faixa de projetos e passagens editoriais        | SSR legível, âncoras nativas, conteúdo alcançável por foco, desmontagem/revert                                       |
| CSS                                    | Layout estático, foco, hover e fallback         | Sem ocultação global aguardando JS, contraste e dimensões reservadas                                                 |

Nenhum elemento terá GSAP e Motion controlando o mesmo transform/dimensão. Separar wrappers por responsabilidade quando necessário; não criar outro motor, gerenciador global ou abstração de cenas sem consumidor. Não instalar Three/R3F/Lenis: os comportamentos prioritários observados podem ser prototipados com a stack existente.

## M01 — ilha contínua (Fase C)

Referência: 1.mp4, 3,7–4,3s e 7,4–8,1s. Medição visual de abertura: 322×54 → 404×368px, centro/topo preservados. Acomodação principal de cerca de 350–500ms; não são tamanhos CSS obrigatórios para o texto de Bruno.

Estados: compacta → abrindo → expandida → fechando → compacta. A mesma superfície contém identidade e opções; nenhuma segunda caixa salta abaixo. Medir conteúdo real para altura natural, observar resize e respeitar limite do viewport; não usar max-height arbitrário enorme nem fixar altura de cinco links.

Proposta de partida: geometria 380–450ms, curva de saída desacelerada ou spring amortecida sem quique perceptível. Conteúdo entra após 70–100ms, deslocamento 6–10px e opacidade em 140–200ms; stagger de 25–40ms, terminando junto com a geometria. Na saída, conteúdo desaparece em 80–120ms e superfície recolhe em 280–380ms. Confirmar com vídeo antes de fixar tokens. A identidade permanece legível, sem esticar avatar/letras; FLIP/layout com filhos protegidos de scale ou interpolação de dimensões limitada a esse pequeno painel são opções de protótipo.

- Botão único acessível aciona por clique, toque, Enter e Espaço. Não depender de hover nem copiar atalho Ctrl K não implementado.
- `aria-expanded` acompanha intenção. Links ficam fora da ordem de foco quando fechados/fechando; ao fechar, resolver foco antes de aplicar inert/hidden. Não atrasar Escape até acabar animação.
- Escape retorna ao botão; selecionar âncora fecha e foca destino; clique/Tab para fora não roubam foco. Nenhum focus trap/body lock.
- Reverter a animação ao receber novo comando, sem fila de cliques. Redimensionamento e mudança de fonte não podem recortar o link focado.
- Mobile: respeitar safe-area/gutters e toque ≥44px. O nome completo pode ter forma curta confirmada; não reduzir texto a ponto de caber à força. Expansão lateral pode ser menor no viewport estreito, mas a superfície continua única.
- Reduced motion: atualização imediata dos estados, sem spring/FLIP; no-JS mantém links visíveis. O conteúdo essencial não depende do carregamento de Motion.

## M02 — entrada e transição do hero (Fases D/F)

Referência: 2.mp4, 2,6–4,8s e 6,3–8,7s. Cena de arco com título central, apoios e CTA; transição posterior para screenshot em profundidade. Fazer iluminação por camadas de SVG/CSS, não usar apenas radial-gradient atrás de texto comum.

Coreografia proposta, após liberação da intro quando houver: arco se define em 500–800ms; grupos tipográficos revelam em 500–650ms com stagger de 70–100ms; descrição/CTAs concluem a cena em até 1,1s. Usar máscaras locais em wrappers decorativos, preservar h1 e texto semântico único. Nunca separar palavra de forma ilegível no mobile. Não animar blur enorme em toda a viewport sem prova de custo aceitável.

Keyframes de scroll propostos para protótipo: p=0 hero estável; p≈0,35 arco se desloca para baixo, screenshot começa a ocupar eixo central; p≈0,7 texto já fora da sobreposição e screenshot em foco; p=1 projeto seguinte em leitura. `p` é progresso local medido, não duração em segundos do gesto filmado. Definir distâncias na Fase B/F após testar conteúdo e altura real. Reversão deve reconstruir a cena; foco/hash pode pular imediatamente para estado legível. Entrada e scrub não podem disputar o mesmo wrapper.

Mobile/reduced motion: arco estático leve, texto/CTAs seguidos por mídia no fluxo; sem pin ou blur em movimento. A composição cinematográfica deve sobreviver sem animação. Sem loop decorativo permanente.

## M03 — escrita e abertura (Fase E)

Referência: 3.mp4, 2,1–7,2s. Traço progressivo, pausa e retirada da tela preta de baixo para cima. Proposta original: uma saudação manuscrita curta, vinculada à identidade de Bruno, com desenho SVG próprio ou fonte licenciada convertida para traço quando tecnicamente adequado. Não usar imagem gerada como assinatura real nem copiar a assinatura do autor da referência.

Sequência proposta: desenho 700–950ms → pausa 120–200ms → retirada por transform/máscara 400–550ms; alvo total 1,3–1,7s, watchdog existente 2,2s. O vídeo mantém a saudação por mais tempo; a adaptação curta é deliberada para acesso rápido e será revisada no gate E. Não inventar porcentagem ou chamar animação de progresso de download.

Overlay decorativo só pode existir após instalar o mecanismo de encerramento; não bloquear clique/foco/scroll nem manter conteúdo essencial escondido no SSR. Pular intro permanece visível e operável. Escape, gesto de scroll/toque, foco no conteúdo, hash, pagehide, reduced motion ou falha de import removem a camada imediatamente. Se o botão que desaparece tinha foco, devolvê-lo ao h1; outros destinos preservam foco. Reentrada na sessão/documento não repete; storage bloqueado não impede encerramento. Watchdog independe da timeline. A Fase E deve ajustar expectativas coreográficas dos testes sem retirar essas provas.

## M04 — projetos como cenas (Fase F)

Referência principal: 3.mp4, 22,8–25,2s; apoio: 2.mp4, 6,3–8,7s. Um enquadramento estável dá continuidade enquanto trabalho, título e fundo mudam. Não converter os três projetos em um slideshow automático ou prender o usuário a um único índice.

- RoboSense: frame anotado real e contexto de gravação, com leitura dos setores; não sobrepor métrica inventada.
- Industry Week: screenshot desktop capturado do deployment e estados reais; indicar que deploy e main têm SHAs diferentes. Mobile com limitações não vira mockup corrigido artificialmente.
- Ateliê: screenshot de repositório identificado como execução local documentada; preservar proporções/peças e não inferir loja publicada.

Proposta de ciclo por trabalho: entrada da mídia no enquadramento → título/estado técnico em leitura → troca vertical por máscara para próximo projeto, com fundo derivado da mesma captura se aprovado. As faixas de leitura devem ocupar a maior parte do progresso; duração não depende de autoplay. Case/repositório devem continuar alcançáveis por teclado, incluindo trabalhos fora da cena visual corrente. Um único trecho de pin poderá ser experimentado no desktop; limitar extensão após protótipo e não multiplicar pins por seção. Link direto, resize, back/forward e scroll rápido precisam terminar em estado coerente.

Mobile, viewport baixo, reduced motion ou falha de inicialização: projetos sequenciais no fluxo, todos legíveis e com mídia leve. Sem detecção especulativa de hardware; preferir media queries e evidências de desempenho. Para preferência de economia de dados, não carregar vídeo automaticamente.

## M05 — fotografia e ritmo editorial (Fases F/G)

Referência: 3.mp4, 11,5–13,7s e 33,8–35,9s. Escala e deslocamento conduzem de texto a fotografia e de mosaico a imagem central. Só implementar galeria se houver conjunto real suficiente e contexto/autorização. Hoje LinkedIn é bloqueador de aquisição, não motivo para stock/IA. Sem mídia pessoal suficiente, projetar composição editorial com uma imagem confirmada ou manter seção textual até o gate correspondente.

Zoom sempre em wrapper; a imagem preserva proporção e não corta informação essencial. Legendas e alt descrevem evento comprovado. Reduced motion usa imagem estática e ordem DOM equivalente.

## Prova obrigatória de movimento

Registrar cada interação em tempo real, além dos frames controlados em 0/25/50/75/100% e dos estados estáveis. Comparar abrir/fechar, interrupção no meio, scroll normal/reverso/rápido e retorno de rota. Na referência, segundos do gesto são evidência de ordem, não duration fixa para scrub. Na implementação, registrar navegador, viewport, preferência, commit, recurso/motor e diferença observada. Um screenshot final, detector limpo ou build aprovado nunca fecha sozinho o requisito de movimento.
