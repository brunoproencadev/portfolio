# Continuidade H — transições e desempenho, 25/10/2026

Autorização: “Tem minha aprovação, continue”. Base `a9a49f6`, branch `redesign/cinematic-portfolio`, raiz `D:\projects\portifolio`. Preservar os quatro arquivos anteriores identificados em `phase-h-security-review/preserved-files.json`. Sem publicação ou avanço automático de fase.

## Evidência e plano

O teste de transições Firefox passou oito vezes com instrumentação mais pesada; com dois workers e instrumentação reduzida falhou uma vez em doze. Na falha, o scroll solicitado chegou a 3453px e permaneceu lá. About manteve deslocamentos de entrada na medição: o título terminou em -16,3333px e a cópia em 0px, coerentes com limites deslocados em 36px/96px. Não é suficiente aumentar a espera ou retirar a asserção.

O código instalado de GSAP 3.15 em ScrollTrigger.js, linhas 1319–1325, reaplica os tweens fromTo com immediateRender durante invalidateOnRefresh, antes de medir o trigger. As revelações animam o próprio trigger. Uma sondagem com resize passou 3/3, portanto o problema não ocorre em todo refresh; preservar essa distinção.

1. Testar immediateRender:false nas revelações para deixar a geometria natural disponível durante a medição. Manter endpoints, tempos, scrub, refresh, media queries e cleanup. Chamador: HomeMotion → startReveals → startSectionTransitions; superfície: cópias RoboSense/Sobre, introdução, competências e fallback compacto. Não alterar os quatro arquivos anteriores.
2. Confirmar o teste original repetidamente no Firefox, além de transições/reversão/resize, reduced motion, foco/hash, no-JS e cleanup nos três motores. Se a correção não eliminar o mecanismo, continuar o diagnóstico; não declarar resolução apenas por uma execução verde.
3. H03: o trace atual concentra trabalho em JavaScript e estilos. Investigar separadamente o custo de herdar propriedades CSS usadas apenas no elemento animado. Uma sondagem com @property/inherits:false manterá os valores e a coreografia; conservar somente com ganho medido e confirmado no build real. Não tratar sondagem por interceptação como métrica final de produto.
4. Validar build/strict/lint/unitários e regressões pertinentes; comparar capturas desktop/mobile. Registrar histórico de falhas, métricas, limitações, hashes e decisões. Commits locais atômicos, staging explícito. H03 só fecha com LCP≤2500ms/performance≥90; TBT não comprova INP.

Fontes: [GSAP fromTo](<https://gsap.com/docs/v3/GSAP/gsap.fromTo()/>), [refresh](<https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()/>), [benchmark CSS @property](https://web.dev/blog/at-property-performance). O candidato anterior de retirar invalidação/medir alturas foi rejeitado; não será reapresentado como ganho.

## Resultado

Fonte `6fd47a7`, testes `d2e7bf7`: medição corrigida, teste original 20/20 Firefox e transições 12/12 PASS; build/strict/lint/nove unitários aprovados. Rodada completa inicial: 393 PASS/4 FAIL/5 SKIP; confirmação dos dois arquivos afetados: 15/15 PASS. 397 casos distintos aprovados entre os comandos, com cinco skips e zero retries. Não foi uma única rodada completa sem falhas. Sondagem CSS descartada; H03 segue aberta, nota 88/LCP 3412ms, sem ganho causal declarado. Evidências e limites em [PHASE_H_RESOLUTION_REVIEW](PHASE_H_RESOLUTION_REVIEW.md).
