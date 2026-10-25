# Continuidade técnica e ajustes solicitados — 25/10/2026

Plano `38cc257`, ajustes de interação `a7034e9`, formato/evidências `b0f52c4`. Branch `redesign/cinematic-portfolio`, raiz `D:\projects\portifolio`. O usuário autorizou a continuidade e depois priorizou bloquear seleção de texto e retirar a caixa do título mostrada na captura. Entrega local; sem push, merge ou deploy. H03 continua aberta.

## Seleção e contorno do título

`body` agora usa `user-select:none` e o prefixo WebKit, sem listener ou bloqueio de eventos. A mudança alcança a home e os quatro cases. Somente `.hero h1:focus` tem outline suprimido; o heading mantém id/tabindex e continua disponível para navegação programática. Links, botões, skip link e demais destinos conservam seus estilos de foco.

A captura do usuário é compatível com a regra `.hero :focus-visible`, que desenhava3px ao redor do h1 inteiro quando focado. Nos navegadores headless, o clique comum após reload não produziu a borda automaticamente; foco de teclado/programático no título reproduziu o contorno. Não atribuir o estado a um defeito confirmado de restauração do browser. A correção CSS cobre o título focado em qualquer modalidade, sem alterar listeners, animações ou foco dos controles.

[Seleção](completion-review/selection.json):15 verificações com arraste real em cinco rotas e três motores, sem texto selecionado. [Foco](completion-review/focus-after.json): seis verificações, com/sem reload em Chromium/Firefox/WebKit; título sem outline e link do hero com foco visível. [Diagnóstico anterior](completion-review/focus-before.json). [Captura posterior](completion-review/focus-after.png) inspecionada com foco forçado no título; não mostra a caixa. Headless/viewport simulado não equivale a Safari ou aparelho físico.

Build de produção/strict e formato do CSS PASS. Teste existente de teclado/reduced motion:2 PASS/1 SKIP, sem falhas/retries; skip histórico do Tab nativo de links no WebKit/Windows. A conferência adicional nos três motores verificou o foco dos links por automação, sem alegar resolver esse limite. A tentativa inicial de uma matriz com JS ligado/desligado foi interrompida: o primeiro locator alcançava texto oculto e o fechamento explícito de contexto travou a sonda seguinte. Foram usados locator visível e encerramento por browser; confirmação final15/15 com JS ligado. Não alegar uma rodada sem JS. Logs e códigos em [verification.json](completion-review/verification.json).

## Formato histórico resolvido

Os24 arquivos apontados pelo Prettier foram normalizados. Antes da escrita, os19 JSONs foram comparados por valores parseados e os cinco Markdown por AST sem posições de origem; conteúdo equivalente em todos. Dez entradas de hash/bytes em seis manifestos foram atualizadas para refletir os novos bytes UTF-8/LF. Ao todo29 arquivos mudaram neste commit; nenhuma alteração de produto ou resultado histórico foi introduzida. A expansão de JSON antes compacto explica o volume de linhas do diff.

[Prova de preservação e linhagem](completion-review/format-preservation.json) registra hashes anteriores de trabalho/Git, hashes da normalização, hashes finais e as dez atualizações de metadata. Não restaram referências antigas nos textos rastreados durante a varredura; o próprio relatório de linhagem preserva esses hashes intencionalmente. Validação final compara valores/AST novamente e verifica os dez hashes/tamanhos contra seus arquivos. `prettier --check .` PASS; diff-check e staging explícito PASS. Não foram trocadas imagens, estatísticas, fontes ou permissões de evidências históricas.

## H03 — sondagens retiradas

O controle atual reconfirmou a imagem RoboSense como LCP: recurso já prioritário e pequeno, com atraso de renderização durante inicialização de efeitos. Guias Next instalados de lazy loading/imagens/CSS foram consultados. A semântica dos agendadores foi verificada nas referências [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame), [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) e [refresh GSAP](<https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()/>).

Três navegações frescas por variante, Lighthouse13.5/mobile/simulate/CPU4×, produção3117, sem build ou teste concorrente. [Configurações, ambiente, valores e decisão](completion-review/performance.json) e JSONs de séries adjacentes:

| Série exploratória                            | Nota mediana | LCP mediano | TBT mediano | Decisão                                                |
| --------------------------------------------- | -----------: | ----------: | ----------: | ------------------------------------------------------ |
| Controle, antes dos pedidos CSS               |           84 |      3540ms |       307ms | H03 fora da meta                                       |
| Inicialização após dois frames                |           89 |      3221ms |     201,5ms | Retirada; não atingiu meta nem comprovou ganho pareado |
| Inicialização em idle, fallback imediato/hash |           87 |      3445ms |       225ms | Retirada; não comprovou ganho necessário               |

São séries sequenciais exploratórias com variabilidade, não um experimento aleatorizado pareado; não atribuir ganho causal. Um ensaio anterior com um frame foi invalidado por servidor ainda mantendo referências do build antigo e erros de rede/console. Foi excluído da comparação; para as séries seguintes o servidor foi encerrado e reiniciado após cada build e o runner passou a rejeitar erros de console. Os logs inválidos permanecem identificados.

`home-motion.tsx` foi restaurado byte a byte ao blob `db9095e` antes das alterações CSS. Nenhuma mudança de agendamento ou coreografia foi conservada. As métricas acima antecedem os pedidos de CSS e não são uma medição do build final. A suíte completa de movimento não foi repetida, porque o JavaScript experimental foi retirado; a prova anterior permanece delimitada em PHASE_H_RESOLUTION_REVIEW. H03 exige LCP≤2500ms/nota≥90 e continua sem fechamento; cases e INP não remedidos.

## Estado e continuidade

[Quatro edições preexistentes](completion-review/preserved-files.json) intactas por SHA256 e fora dos commits. Build local final noindex, origem não ativada e deploy Git automático main/redesign bloqueado. Preview http://127.0.0.1:3117/. [Manifesto](completion-review/manifest.json), [fontes](completion-review/source-fingerprints.json) e [checklist de release](RELEASE_CHECKLIST.md).

Próximo trabalho técnico é localizar e reduzir o custo de renderização/inicialização sem reabrir a coreografia aprovada; as duas sondagens não justificam uma nova arquitetura ou a retirada da intro. Aceite humano, favicon em aba, compartilhamento social, fotos/contexto, hardware/leitor de tela e INP permanecem nos limites anteriores. Não iniciar publicação por inferência. SHA documental por `git log -1 -- docs/COMPLETION_REVIEW.md`.
