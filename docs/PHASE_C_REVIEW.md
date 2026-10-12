# Fase C — navegação Dynamic Island

Concluída para revisão do usuário em 2026-10-12. B foi aprovada e C autorizada pelo “Continue” em resposta ao gate explícito. Fonte validada: `d7e377f`, sobre baseline `a7955bf`, branch `redesign/cinematic-portfolio`. Sem push/deploy; D exige aprovação própria.

## Entrega e preservação

A cápsula passa a expandir largura/altura/raio como uma superfície contínua. Motion mini já instalado anima dimensões reais, sem scale nas letras/avatar; os destinos entram em sequência. Altura medida pelo conteúdo, largura do painel estável durante a interpolação, clipping local. A fonte Manrope licenciada e o avatar GitHub exato têm cópias locais com proveniência em [MEDIA_ASSETS](MEDIA_ASSETS.md).

Preservados: cinco destinos reais, âncoras/hash, foco no título, seção ativa, observer, fallback SSR/no-JS e ausência de focus trap/body lock. Fechamento deixa links inert/aria-hidden imediatamente. Escape retorna ao botão; clique externo resolve foco interno sem roubar o destino. Resize, fonte pronta, foco entrando no painel, visibilidade/pagehide e reduced motion encerram a transição de forma legível. Reversão não enfileira comandos; recursos recebem cleanup. Falha do motor foi simulada e mantém navegação funcional.

Hero, intro, projetos, conteúdo, rotas, SEO, favicon e dependências permanecem anteriores. A diferença visual entre a cápsula nova e o hero antigo corresponde ao limite autorizado de C.

## Comparação R1 → implementação

| Critério                       | Referência observada                                                        | Resultado C / decisão                                                                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C01: superfície e continuidade | 1.mp4, 3,7–4,3s e 7,4–8,1s; centro/topo preservados                         | Uma superfície; desvio de centro e topo **0 CSS px** nas 170 amostras desktop e 197 mobile, incluindo reversões                                               |
| C02: proporção                 | Compacta≈322×54; aberta≈404×368                                             | Desktop **322×60 →404×365**, aumento de largura25,47%; cabeçalho60 acomoda alvo44 e avatar40. Altura365 é intrínseca, não constante                           |
| C03: sequência                 | Crescimento/clipping e conteúdo progressivo; fechamento mais rápido         | Abertura420ms; fechamento340ms; easing(0.22,1,0.36,1). Filhos160ms, delay80ms +30ms por item, y8px; saída100ms. Avatar40px constante nas amostras             |
| C04: uso/fallback              | Vídeo demonstra desktop; mecanismo/teclado/easing originais não comprovados | Clique/toque/Enter/Espaço, Escape, Tab, clique externo, hash, foco, resize, zoom200%, no-JS, reduced inicial/em execução e falha do motor cobertos por E2E    |
| Identidade/contexto            | Nome/papel, quatro destinos e controles de tema                             | Nome/avatar reais; cinco destinos existentes. Subtítulo conserva seção atual; posicionamento aparece na nota. Sem Ctrl K ou seletor de tema não implementados |
| Mobile                         | Não demonstrado pelo vídeo                                                  | Adaptação explícita: gutters16px, topo16+safe-area, largura limitada, nota quebra naturalmente e painel rola em viewport baixo                                |

As durações/easing são decisões da implementação, não valores extraídos do código da referência. Não há alegação de pixel-perfect ou equivalência integral ao site original.

## Evidência visual e temporal

- [Desktop fechado](island-review/closed-1440.jpg), [aberto](island-review/open-1440.jpg), [mobile fechado](island-review/closed-375.jpg), [aberto](island-review/open-375.jpg).
- [Dez estados / cinco larguras](island-review/states-contact-sheet.jpg); [0/25/50/75/100% controlados](island-review/controlled-sequence.jpg). Estes últimos pausam WAAPI; não comprovam fluidez em tempo real.
- Frames das gravações reais: [desktop](island-review/recorded-sequence-1440.jpg), [mobile](island-review/recorded-sequence-375.jpg). Comparar com [R1 abertura](reference-video-audit/r1-open.jpg) e [fechamento](reference-video-audit/r1-close.jpg).
- WebM completos locais: `.audit/phase-c/island-1440.webm` (4,92s) e `island-375.webm` (4,84s), 25fps. Abertura/fechamento/reversão reais, sem relógio simulado. Mantidos fora do Git para não versionar vídeos temporários; hashes em [resultados](island-review/results.json).
- [Resultados e amostras RAF](island-review/results.json), [resumo E2E](island-review/verification.json) e [manifesto de integridade](island-review/manifest.json).

Capturas reais de Chromium headless, Windows, build de produção local, sem preferência reduzida, fontes/imagens prontas. 320/375/768×812, 1440×900,1920×1080. Hash #inicio evita intro antiga; contorno verde do h1 é o foco existente, não parte do redesign. Pranchas recortam e acrescentam timestamps; não alteram os pixels da interface. Protótipo B serviu ao contraste/forma; R1, ao comportamento.

| Viewport  | Compacta | Expandida | Topo |
| --------- | -------- | --------- | ---- |
| 320       | 288×60   | 288×385   | 16   |
| 375       | 322×60   | 343×385   | 16   |
| 768       | 322×60   | 404×365   | 16   |
| 1440/1920 | 322×60   | 404×365   | 32   |

Sem overflow, pageerrors ou violações axe nos dez estados capturados. A versão final aumentou nota para12px/20px e aplicou a sombra B, corrigindo o desvio do primeiro passe visual. Nenhum texto foi comprimido para manter altura artificial.

## Validação e correções

- Prettier dos arquivos alterados, lint integral sem avisos, TypeScript strict pelo build e build de produção aprovados. Aviso conhecido de metadataBase ausente no preview local sem SITE_URL; configuração SEO preservada.
- Vitest: **7/7**; testes de dados/ferramentas existentes. Novo comportamento coberto por cinco E2E específicos, executados nos três motores.
- Playwright final: **103 aprovados, 5 exclusões preexistentes, zero falhas/flaky**, 108 casos, 82,95s. Navegação, ilha, responsividade, motion e foundation. Chromium/Firefox/WebKit; zoom nativo200% em Chromium. As cinco exclusões são três comportamentos Tab de WebKit/Windows e zoom por extensão Chromium fora de Chromium; nomes em verification.json.
- A primeira rodada teve96 aprovados/7 falhas/5 exclusões: três leituras axe durante a opacidade transitória, duas transições hover ainda ativas em reduced, duas asserções correlatas de animação ativa. Correção: aguardar estado estável para axe/capturas e remover hover CSS em reduced. Mantidas as asserções de contraste e movimento. Rodada focada49/5 e rodada final103/5 passaram.
- Typecheck inicial apontou `hidden` em SVG; movido para CSS no fallback no-JS. Lint apontou mutação de ref recebido como argumento; hook passou a possuir o ref e efeitos declaram suas dependências. Sem supressão de regras.
- `git diff --check` limpo exceto espaço upstream da licença OFL, linha21, preservado deliberadamente byte a byte e documentado.

Revisão independente Impeccable: **ship**, exclusivamente para a cápsula C. Revisor inspecionou estados, sequências, código e amostras; não encontrou achados materiais nesse escopo. Conferiu dados RAF e cobertura, mas não repetiu a suíte nem reproduziu os WebM em velocidade real. A avaliação temporal combina gravações amostradas, geometria/opacity e código, não somente screenshots estáticos.

## Desempenho, limites e próximo gate

Sem biblioteca nova, WebGL, polling ou loop permanente. Dimensões refluem somente a superfície fixa durante transições curtas; não se presume que sejam custo zero. Maior intervalo RAF observado:36,1ms desktop/20,3ms mobile, com E2E concorrente; isso não é benchmark estável nem prova de60fps em hardware real. Vídeo25fps limita julgamento de frame pacing fino.

Sem Lighthouse novo, métricas de campo/INP, leitor de tela, Safari real, aparelhos físicos ou nova publicação. Esses resultados não certificam WCAG ou performance integral. Favicon/fotos e demais cenas continuam nos gates correspondentes.

**Próxima fase: D — hero cinematográfico**, arco/luz/composição e entrada tipográfica com base em R2, após aprovação explícita. A entrega C não autoriza D nem push/deploy.
