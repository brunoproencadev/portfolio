# Medição das transições — continuidade H, 25/10/2026

Autorização: “Tem minha aprovação, continue”. Plano `92952eb`, correção `6fd47a7`, base anterior `a9a49f6`. Raiz `D:\projects\portifolio`, branch `redesign/cinematic-portfolio`. A fase H continua aberta por desempenho; não houve push, deploy ou início de I.

## Causa e correção

Na reprodução com dois workers, o teste Firefox falhou uma vez em doze. A [instrumentação anterior](phase-h-resolution-review/before-scroll-diagnostic.json) registrou o scroll solicitado chegando a 3453px e permanecendo nessa posição. A cópia de Sobre ficou com tradução vertical de 0px, e o título com -16,3333px. Os valores são coerentes com limites de scroll medidos após aplicar os deslocamentos iniciais de 96px e 36px, respectivamente. A falha não veio de uma solicitação de scroll perdida.

As revelações usam o próprio elemento animado como trigger. No GSAP 3.15 instalado, ScrollTrigger.js:1319–1325 reaplica os estados iniciais de tweens `fromTo` com `immediateRender` durante a invalidação, antes de medir os limites. Esse comportamento explica por que o estado de entrada podia contaminar a medição. Oito repetições com instrumentação mais pesada e três com resize passaram; a falha não ocorreu em toda inicialização ou refresh.

A correção define `immediateRender: false` no `fromTo` das revelações. O estado inicial passa a ser aplicado durante o avanço da animação, preservando a geometria natural na medição. Endpoints, duração, easing, scrub, invalidação de refresh e cleanup foram mantidos. O único chamador continua sendo HomeMotion → startReveals → startSectionTransitions. Hero, carrossel, conteúdo, assets, dependências e os quatro arquivos anteriores não foram alterados.

[Documentação de fromTo](<https://gsap.com/docs/v3/GSAP/gsap.fromTo()/>) e [refresh](<https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()/>). A explicação acima combina o código instalado com as posições observadas; não é uma alegação de defeito em todos os usos de GSAP.

## Validação

- Build/TypeScript strict, lint completo e nove unitários: PASS. [Build](phase-h-resolution-review/build-transition-fix.log), [lint](phase-h-resolution-review/lint-transition-fix.log), [unitários](phase-h-resolution-review/unit-transition-fix.log).
- Teste original de reversão desktop: **20/20 PASS no Firefox**, dois workers, sem instrumentação, retries ou alterações de teste/timeout. [Log](phase-h-resolution-review/firefox-fixed-repeated.log).
- Suíte de transições: **12/12 PASS**, Chromium/Firefox/WebKit, sem falhas/skips/retries. Cobre reversão, faixas, reduced motion e lifecycle/cleanup. [Resumo](phase-h-resolution-review/transitions.json).
- Suíte completa de produção: Rodada completa inicial: 393 PASS/4 FAIL/5 SKIP; confirmação dos dois arquivos afetados: 15/15 PASS. 397 casos distintos aprovados entre os comandos, com cinco skips e zero retries. Não foi uma única rodada completa sem falhas. [Resultados e falhas preservadas](phase-h-resolution-review/e2e.json)..
- Formato dos arquivos desta entrega e diff-check: PASS no fechamento. O check global falhou exatamente nos mesmos 24 arquivos históricos, sem novos avisos. [Log](phase-h-resolution-review/format-global.log) e [checks](phase-h-resolution-review/checks.json).
- As [quatro alterações anteriores](phase-h-resolution-review/preserved-files.json) continuam byte a byte iguais, fora dos commits desta continuidade. As provas cobrem a árvore com essas pendências.

Os logs da [sondagem inicial](phase-h-resolution-review/firefox-diagnostic.log), da [reprodução com falha](phase-h-resolution-review/firefox-concurrent-diagnostic.log) e do [resize](phase-h-resolution-review/refresh-reproduction.log) preservam o histórico. A primeira inspeção da variável interna `_gsap` falhou porque ela é um cache, não a API pública; a inspeção corrigida não foi usada como prova de produto. A primeira chamada do runner da sondagem CSS também recebeu um argumento extra e foi refeita corretamente.

## Sincronização dos testes

A rodada completa expôs três expectativas antigas de um transform inicial em Sobre fora da tela, incompatíveis com a correção. O teste passou a exigir enhancement ativo e transform:none antes da entrada; suas verificações de foco, posição, pin e retorno do hero permanecem. A quarta falha foi contraste da nota da cápsula durante o fade: o teste podia observar a ausência de data-animating antes de a abertura iniciar. A sincronização agora exige data-open:true, fim da animação e opacidade 1 antes de avaliar o estado expandido; o fechamento também espera a transição de data-open. A confirmação passou 15/15 nos três motores; o menu WebKit320px passou em mais três repetições. Lint completo e TypeScript após os ajustes também passaram. Nenhuma regra axe foi desabilitada, nenhuma animação da cápsula foi alterada e nenhum timeout foi aumentado. Ajustes de testes em `d2e7bf7`.

## Comparação no navegador

Chromium de produção, desktop 1440×900 e mobile 375×812: home, Sobre, saída/reversão, projeto Industry Week, reduced motion e quatro cases. Foram produzidas **20 capturas**, duas comparações geométricas de preferência de movimento e duas gravações brutas. Nenhum overflow/pageerror nos [22 registros](phase-h-resolution-review/browser.json).

Capturas inspecionadas: [Sobre desktop](phase-h-resolution-review/1440-about.png), [saída desktop](phase-h-resolution-review/1440-about-exit.png), [reversão mobile](phase-h-resolution-review/375-about-reversed.png) e [home mobile](phase-h-resolution-review/375-home.png). As demais capturas e vídeos permanecem em `.audit/phase-h-resolution/browser-fixed`. Vídeos não foram reproduzidos integralmente; sua taxa de quadros não mede FPS da interface. Provas automatizadas e inspeção de capturas não substituem aceite perceptual ou hardware físico.

## H03 — resultado ainda fora da meta

Três Lighthouse mobile diretos, sem build/testes concorrentes, sobre o build corrigido: [série, configuração e ambiente](phase-h-resolution-review/performance.json).

| Execução | Performance |        LCP |       TBT |        CLS |
| -------- | ----------: | ---------: | --------: | ---------: |
| 1        |          88 |     3412ms |     203ms |     0,0389 |
| 2        |          87 |     3439ms |   215,5ms |     0,0389 |
| 3        |          89 |     3388ms |     190ms |     0,0389 |
| Mediana  |      **88** | **3412ms** | **203ms** | **0,0389** |

H03 não passou: LCP≤2500ms/performance≥90. Acessibilidade/boas práticas 100 e SEO 66 pelo noindex deliberado. Não houve série pareada da fonte anterior nesta retomada; a diferença para métricas históricas não prova ganho causado pela correção. Cases e INP não foram remedidos.

Também foi investigada a herança de `--section-opacity`, `--cover-radius` e `--cover-shadow`, usadas apenas nos próprios elementos. Seis Lighthouse alternaram base/candidato em ordem ABBAAB, com o mesmo método de interceptação HTML nas duas condições. [Sondagem e medianas](phase-h-resolution-review/property-probe.json): base nota 84/LCP3891ms/TBT202,5ms; candidato 84/LCP3885ms/TBT222ms. Diferença de LCP desprezível e TBT pior; **candidato rejeitado antes de alterar o CSS do projeto**. As métricas interceptadas não são comparáveis diretamente às navegações normais e não substituem a série final.

O [perfil atual de CPU](phase-h-resolution-review/cpu-summary.json), coletado separadamente com CPU 4× e viewport 412×823, localizou cerca de 152ms amostrados sob startReveals; aproximadamente 87ms estavam no callback das transições e 14ms no callback de ferramentas. São tempos cumulativos amostrados, não parcelas aditivas nem breakdown de LCP. Isso delimita a investigação seguinte em inicialização/medição das seções; não justifica reescrever ferramentas, trocar bibliotecas ou retirar a coreografia aprovada.

O [manifesto de evidências](phase-h-resolution-review/manifest.json) usa bytes UTF-8/LF e foi conferido contra o conteúdo staged do Git antes do commit. As provas brutas completas permanecem locais em `.audit/phase-h-resolution`.

## Decisões e continuidade

Conservar somente a correção funcional de `immediateRender`; rejeitar a sondagem de propriedades CSS sem ganho consistente. H03, formato histórico, fotos/contexto, direitos Ateliê, favicon em aba e validações humanas/físicas continuam abertos. A fase I tratará prontidão de produção e mantém seu gate próprio. Produção não atualizada.
