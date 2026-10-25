# Fase E — saudação manuscrita e passagem ao hero

Entrega local de 2026-10-13 para revisão do usuário. D foi aprovada e E autorizada explicitamente por “Aprovo e autorizo”. Baseline c976322, plano/autorização0ab2720, fonte75ba951. Branch redesign/cinematic-portfolio; sem push/deploy. F–I continuam sujeitos a gates individuais.

## Entrega

“olá” original do estudo B é escrito em quatro traços brancos no centro de uma tela quase preta. Uma breve pausa precede o desaparecimento da saudação e a retirada da camada de baixo para cima. Arco, nome e apoios D entram coordenados durante a retirada. Nenhuma porcentagem/progresso fictício, assinatura pessoal atribuída, fonte nova ou asset externo.

HomeMotion permanece dono da elegibilidade, sessão, import dinâmico, encerramento e cleanup. Foi movido para irmão do hero dentro de main, pois o stacking context isolado do hero impediria a camada de cobrir a navbar. Não foi criado portal/gerenciador de loading. Hero, ilha C, conteúdo, rotas, SEO, dependências e scroll existente preservados.

## Comparação R3/B → E

| Critério     | Observação da referência                                                | Resultado E                                                                                                                                                                                            |
| ------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| E01 escrita  | R3,3.mp4,2,1–5,1s: traços formam hello progressivamente em fundo preto  | SVG original B escreve olá, caminho por caminho, duração total850ms proporcional ao comprimento. Branco#f5f3ff sobre#08090d. Adaptação para português e duração curta.                                 |
| Pausa        | R3,5,1–6,3s: palavra completa antes de desaparecer                      | Pausa850–1000ms; ausência de percentuais/status de download.                                                                                                                                           |
| Retirada     | R3,6,6–7,2s: saudação desaparece; a tela preta recua de baixo para cima | Opacidade do traço1000–1150ms; wrapper HTML yPercent0→−100 entre1000–1450ms, power3.inOut. Sem blur ou desenho animado em tela inteira.                                                                |
| Integração D | B states.html prevê retirada1000–1450ms e hero revelado                 | Entrada D começa850ms atrás da camada e termina1850ms. A sobreposição preserva o watchdog2200ms, em vez de somar as durações.                                                                          |
| E02 controle | A gravação não comprova teclado/reduced/falhas da referência            | Pular visível acima da camada, sem body lock/focus trap; foco/ponteiro/nav, Escape, roda/toque, hash/pagehide/reduced cancelam imediatamente. Timeout também limpa timeline estagnada e import tardio. |
| Mobile       | Não demonstrado no vídeo R3                                             | Adaptação validada em320/375/768px: SVG mínimo104px, botão≥44px, gutters/safe-area; composição final preservada.                                                                                       |

Não há alegação de duração/easing originais, pixel-perfect ou reprodução literal da palavra hello. O letterform vem do desenho B aprovado, não de uma assinatura real.

## Fallbacks e acessibilidade

Camada hidden/aria-hidden no HTML inicial; só é mostrada após listeners/timeout instalados e import bem-sucedido. Pointer-events none preserva acesso ao conteúdo; interação fora de Pular também remove a camada. Foco em Pular pode ativá-lo por Enter, retornando ao h1; outros destinos de foco são preservados. Nenhum elemento essencial foi colocado em inert ou escondido no SSR. Reduced motion evita os módulos de animação e mantém a home estática; CSS também suprime a camada defensivamente.

Storage negado não prende a entrada; guarda por documento impede replay em reentrada. Ao terminar/cancelar, owner esconde a camada e GSAP context.revert limpa atributos/estilos temporários. O watchdog de2,2s conta desde elegibilidade, então import lento pode encurtar a sequência para liberar conteúdo. Renderização de efeitos/intro requer JS; sem JS, links e conteúdo permanecem disponíveis.

## Prova visual e temporal

- [Saudação desktop](intro-review/intro-1440-900.jpg), [mobile](intro-review/intro-375-900.jpg).
- Estados900/1250/1950ms: [320](intro-review/states-320.jpg), [375](intro-review/states-375.jpg), [768](intro-review/states-768.jpg), [1440](intro-review/states-1440.jpg), [1920](intro-review/states-1920.jpg).
- [Sequência controlada desktop](intro-review/controlled-sequence.jpg), oito estados32–1950ms. Recortes do título e tela escura no meio são fases deliberadas, não estado final.
- Frames de vídeos reais: [desktop](intro-review/recorded-sequence-1440.jpg), [mobile](intro-review/recorded-sequence-375.jpg). WebMs locais `.audit/phase-e/intro-1440.webm` (2,96s) e `intro-375.webm` (3,08s),25fps, fora do Git. Hashes no [manifesto](intro-review/manifest.json).
- [Resultados](intro-review/results.json):20 estados controlados, cinco larguras, zero overflow/pageerrors; axe zero nos cinco estados finais.220 amostras RAF reais:107 desktop/113 mobile; intervalo amostrado1864,5/1858,7ms, maior intervalo entre frames32,5/18,2ms. O vídeo inclui navegação/preparação; timestamps do WebM não são offsets exatos da timeline. Não prova60fps em todo hardware.

Primeira coleta pausou o relógio também durante axe e ficou aguardando timers. Foi interrompida; script corrigido libera o relógio após os screenshots e antes de axe. Todas as capturas finais foram regeneradas, sem alteração de UI. Pranchas usam resize/timestamp para comparação, sem redesenhar pixels.

## Testes

Build, lint sem avisos, TypeScript strict e formato dos arquivos de código alterados aprovados. Build mantém aviso metadataBase do preview sem SITE_URL; noindex/SEO preservados.

Playwright, Chromium/Firefox/WebKit, duas rodadas disjuntas: **96 focados +112 regressões aprovados**, cinco exclusões preexistentes, zero falhas/flaky. Os96 cobrem intro/motion/hero; os112 cobrem navbar/ilha, cases, responsividade e fundação. Cancelamento da camada exercitado em400/1200ms; toque nessa matriz é evento sintético, não hardware. No-JS, fonte falha, chunks falhos/tardios, watchdog sem RAF, reduced inicial/em execução, storage negado, sessão/foco e cleanup cobertos. Cinco skips: zoom nativo somente Chromium (dois) e três limites de Tab no runner WebKit/Windows, herdados de C/D.

Vitest: seis passaram na primeira rodada; tooling.test.ts excedeu60000ms na carga inicial de ESLint (104088ms registrados). Rerun isolado do mesmo teste passou, sem aumento de timeout:22,59s total/15,80s no teste. As sete provas estão cobertas entre as duas execuções; não alegar uma execução integral limpa. [Resumo](intro-review/verification.json).

A revisão React preservou componente servidor para conteúdo, fonte compartilhada no módulo, import condicional, refs para estado transitório e listeners limitados à fase ativa. Detector Impeccable:19 avisos em estilos legados de cards/cases/rampas, fora da intro; nenhum exigiu ampliar E.

## Performance local

Três rodadas Lighthouse13.5.0, mobile, build local127.0.0.1:3101; sem E2E/captura concorrentes. Mesmo perfil D: Chromium156.0.8078.4, Node24.15.0, Windows11 Pro/Ryzen7 5700G, mobile412×823, CPU4×/RTT150ms/throughput1638,4Kbps simulados. [Ambiente](intro-review/lighthouse-environment.json), [resultados individuais](intro-review/lighthouse-summary.json).

| Rodada  | Performance | LCP       | CLS     | TBT     |
| ------- | ----------- | --------- | ------- | ------- |
| 1       | 97          | 2484,60ms | 0,03888 | 59,08ms |
| 2       | 98          | 2393,03ms | 0,03888 | 82,50ms |
| 3       | 98          | 2383,70ms | 0,03888 | 74,50ms |
| Mediana | 98          | 2393,03ms | 0,03888 | 74,50ms |

Acessibilidade/boas práticas100 e SEO66/noindex em todas. Peso total251762bytes (D251291bytes), diferença471bytes. LCP mediano D2387ms; diferença de cerca de6ms está na variabilidade do laboratório, não comprova equivalência no campo. Todas as rodadas ficaram abaixo de2,5s, a primeira por margem pequena. Reavaliar após F/mídia e em produção; TBT não comprova INP. Oportunidades de JS não usado≈52KiB, legado≈14KiB e recursos bloqueantes290–340ms permanecem; não houve nova dependência.

## Revisão e próximo gate

Revisão independente: **ship**, sem correções materiais ou recaptura, em [finish-review](intro-review/finish-review.md), escopo E. Continuidade do design system e estado persistente devem refletir C/D/E aplicados, sem tratar F–I como concluídos.

A próxima fase F integra screenshots autênticos à apresentação dos projetos e desenvolve as transições de scroll, com alternativas para mobile/reduced motion. Não foi iniciada. Fotos pessoais ainda dependem de fontes/contexto; favicon e revisão de conteúdo pertencem a fases posteriores. Nenhum push/deploy autorizado.
