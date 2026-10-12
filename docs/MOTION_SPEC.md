# Especificação de movimento — observações A e decisões B

Base observada: [REFERENCE_ANALYSIS](REFERENCE_ANALYSIS.md). B aprovada; M01 implementado e validado em C, fonte d7e377f: abertura420ms/fechamento340ms, filhos160ms/delay80ms/stagger30ms/y8px e saída100ms. Motion mini mede dimensões naturais; reduced/foco/resize/falha terminam imediatamente. [Evidências e limites](PHASE_C_REVIEW.md). M02–M05 continuam propostas para D–G; hero1000ms e intro1450ms não estão implementados. Faixas abaixo preservam a proposta A, sem alegar easing original conhecido.

## Responsabilidades e invariantes

| Dono                                   | Responsabilidade futura                         | Preservar                                                                                                            |
| -------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `SiteNavigation` + Motion já instalado | Estado/layout/entrada e saída da ilha           | Disclosure não modal, links reais, foco, Escape, clique externo, seção ativa, no-JS, cleanup                         |
| `HomeMotion`                           | Elegibilidade, cancelamento, imports e watchdog | Storage opcional, guarda por documento, hash/scroll inicial, reduced motion em execução, imports tardios inofensivos |
| `home-sequence` + GSAP                 | Intro e entrada coordenada do hero              | Contexto local e retorno de função de limpeza                                                                        |
| `home-reveals` + ScrollTrigger         | Progressão hero→projetos e cenas de trabalho    | SSR legível, âncoras nativas, conteúdo alcançável por foco, desmontagem/revert                                       |
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
