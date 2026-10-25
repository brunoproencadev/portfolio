# Atualização H — medição das transições, 25/10/2026

[Revisão vigente](PHASE_H_RESOLUTION_REVIEW.md), plano `92952eb`, fonte `6fd47a7`, testes `d2e7bf7`. Corrigida a medição contaminada pelo estado de entrada, mantendo coreografia/tempos. Teste original 20/20 Firefox e transições 12/12 PASS; build/strict/lint/nove unitários PASS. Rodada completa inicial: 393 PASS/4 FAIL/5 SKIP; confirmação dos dois arquivos afetados: 15/15 PASS. 397 casos distintos aprovados entre os comandos, com cinco skips e zero retries. Não foi uma única rodada completa sem falhas. Histórico completo preservado.

H03 segue aberta: nota 88/LCP 3412ms/TBT 203ms, sem série pareada causal. Sondagem CSS sem ganho descartada; nenhum CSS alterado. Quatro arquivos anteriores intactos; formato e provas humanas/físicas pendentes. Sem push/deploy/I. Registros seguintes são históricos.

# Atualização H — 25/10/2026

[Relatório vigente da retomada](PHASE_H_SECURITY_REVIEW.md), fonte `4ed77f9`, plano `ae86b92`. Segurança Next/ferramentas corrigida localmente, auditorias completas zero; npm ci/build/strict/lint/nove unitários PASS. E2E 396 PASS/1 FAIL/5 SKIP e confirmação inicial FAIL, depois3/3 PASS, sem alterar teste/timeout. Intermitência Firefox permanece registrada.

H03 continua aberta: controle final home84/LCP 3585 ms/TBT 298 ms; cases LCP 2583/2513/2840/2922 ms. Experimento de refresh rejeitado após controle restaurado melhor; nenhuma mudança de movimento conservada.24 falhas históricas de formato e limites humanos/físicos mantidos. Quatro alterações anteriores intactas; sem push/deploy/I. Provas e decisões atuais no relatório vinculado; medições abaixo pertencem às rodadas históricas.

# Fase H — QA completo, com performance pendente

18/10/2026. Autorização registrada em [PHASE_H_PLAN](PHASE_H_PLAN.md): “Dê início a fase H”; retomada por “Dê continuidade”. Base `7a27a28b2f8cfd487ae83bb6ca284bc692cdc674`, branch `redesign/cinematic-portfolio`, workspace `D:/projects/portifolio`.

Esta rodada entrega a verificação e o diagnóstico. **H permanece aberta: as metas de LCP e de desempenho da home não foram atingidas.** Não representa aprovação visual, autorização de I ou publicação.

## Resultado e limites por critério

| Critério                         | Resultado desta rodada                                                                                                                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| H01 — layout e acessibilidade    | Cobertura automatizada de larguras, foco, alvos, contraste/axe e zoom Chromium; limites de WebKit/Windows e ausência de leitor de tela/dispositivo físico permanecem.                                                    |
| H02 — movimento reduzido         | Testes de preferência inicial/dinâmica, falhas, resize, navegação e cleanup; resultado funcional final registrado abaixo.                                                                                                |
| H03 — desempenho                 | Medição completa, três navegações por rota. CLS passa; LCP não passa nas cinco medianas finais, home abaixo de 90. INP de campo não medido.                                                                              |
| H04 — integridade da verificação | Build/strict/lint e nove unitários passam. Formato global falha nos mesmos 24 arquivos históricos. Provas correspondem à árvore identificada por hashes, incluindo quatro pendências preservadas fora dos novos commits. |

## Alterações e decisões

O commit anterior `7a27a28` corrigiu os alvos do carrossel para pelo menos 44 × 44px, atualizou a expectativa da captura Ateliê para o enquadramento cover aprovado e ampliou o teste de zoom aos quatro cases. As medições [antes](phase-h-review/touch-before.json) e [depois](phase-h-review/touch-after.json) registram larguras de 40,80/34,20/26,28px passando a 44px para Museu/Ateliê/kord.

Nesta retomada, nenhum ajuste de produto foi conservado. A opção experimental `inlineCss` foi testada em build real e retirada por ausência de ganho. A coreografia, o conteúdo, a navegação e as dependências permanecem iguais aos da entrada. Os quatro arquivos que já estavam alterados — plano H, CaseCapture, HeroProject e teste refinement — foram copiados para snapshot local, conferidos por SHA-256 e preservados byte a byte; não foram incluídos nos novos commits. As prioridades de imagem pendentes não são apresentadas como solução para o atraso.

## Lighthouse mobile

Nova série após restaurar a configuração, sem build ou testes concorrentes. Lighthouse 13.5.0, Chromium 156, Node 24.15.0, Windows 10.0.26300, Ryzen 7 5700G, cerca de 29,95 GB de RAM. Perfil mobile 412 × 823, DPR 1,75; throttling simulado, RTT 150ms, throughput 1638,4 Kbps, CPU 4×. Chrome novo e armazenamento limpo por navegação; servidor Next de produção local em 127.0.0.1:3115. Cache do servidor/otimizador local não equivale a uma visita fria à CDN em produção.

| Rota          | Performance |     LCP |    CLS |     TBT | Transferência |
| ------------- | ----------: | ------: | -----: | ------: | ------------: |
| Home          |          87 | 3.440ms | 0,0389 | 240,5ms |     314.638 B |
| RoboSense     |          97 | 2.594ms |      0 |    83ms |     243.059 B |
| Museu         |          97 | 2.537ms |      0 |    75ms |     245.943 B |
| Industry Week |          95 | 2.801ms |      0 |  92,5ms |     292.728 B |
| Ateliê        |          95 | 2.817ms |      0 |   106ms |     300.988 B |

Valores são medianas de três execuções, não a melhor rodada. Acessibilidade e boas práticas: 100 em todas as execuções finais. SEO: 66, limitado pelo `noindex` deliberado do preview; não removê-lo para elevar a nota. TBT não comprova INP e axe/Lighthouse não certificam acessibilidade.

[Dados completos de ambiente, execuções, medianas, rede e long tasks](phase-h-review/performance.json). Séries antigas estão identificadas separadamente; o nome histórico `lighthouse-final` não designa o resultado vigente, que é `lighthouse-restored`.

## Experimentos e causa ainda não resolvida

- Alta prioridade das imagens: séries anteriores não mostraram ganho consistente; as alterações de entrada foram preservadas, sem atribuir melhora causal.
- Decodificação síncrona por interceptação: diagnóstico anterior sem ganho; não aplicado ao produto.
- Bloquear o módulo de movimento inferior: reduziu TBT de 281 para 149ms numa sondagem, mas LCP permaneceu em 3.209ms e a experiência perdeu movimento. Não aplicado; esse teste não demonstra uma solução equivalente.
- CSS embutido: três execuções reais na home, mediana 84/3.601ms/290,5ms (performance/LCP/TBT), contra 87/3.440ms/240,5ms na nova série restaurada. Eliminou duas requisições CSS, mas aumentou a transferência total de 314.638 para 329.586 B e o documento de cerca de 14,3 para 38,9 KB. A opção duplica estilos em HTML/RSC e é experimental na documentação da versão Next instalada. Retirada antes da validação final.

O recurso de imagem já chega cedo nas sondagens; o atraso de apresentação e o trabalho de JavaScript/layout são candidatos mais fortes do que a prioridade de rede. Isso é diagnóstico parcial, não causalidade fechada: retirar um módulo inteiro e comparar séries sujeitas à variação da máquina não isola uma função responsável. Não há otimização adicional comprovada nesta rodada. O próximo trabalho de H deve isolar o custo de inicialização/refresh sem alterar a sequência aprovada, medir a solução e repetir suas regressões.

### Continuidade — custo de inicialização

Após novo “Continue”, plano `81641c0` e [resultados da investigação](PHASE_H_PERFORMANCE_PLAN.md). Três execuções por candidato e por rota restaurada, no mesmo perfil mobile e sem build/testes concorrentes:

| Estado                                      | Rota   | Performance | LCP mediano | TBT mediano | JavaScript |
| ------------------------------------------- | ------ | ----------: | ----------: | ----------: | ---------: |
| SVGs de ToolPopups/LinkIcon como img nativo | Home   |          84 |     3.543ms |     307,5ms |  213.339 B |
| Captura com getImageProps                   | Ateliê |          94 |     2.901ms |       130ms |  165.269 B |
| Fonte restaurada após os experimentos       | Home   |          86 |     3.412ms |       249ms |  213.339 B |
| Fonte restaurada após os experimentos       | Ateliê |          95 |     2.815ms |        91ms |  165.269 B |

Nenhum candidato trouxe ganho consistente; ambos foram retirados. A troca dos SVGs manteve o bundle transferido e aumentou HTML/RSC. A captura com propriedades geradas no servidor manteve o otimizador, mas não resolveu o atraso. A diferença pequena entre as bases restauradas não prova melhora. Esta confirmação mede somente home e Ateliê; os outros três cases conservam a medição integral anterior. CLS 0,0389/0, acessibilidade/boas práticas 100 e SEO66 nas seis execuções restauradas. **H03 continua sem passar.**

Doze sondagens adicionais, uma execução por condição/rota, compararam scripts bloqueados, filtros removidos e decode imediato. Bloquear scripts reduziu LCP/TBT, mas muda a experiência e não isola a função responsável. Retirar filtros ou decode não melhorou consistentemente. A segunda série intercepta o HTML de todas as condições, inclusive a base; seu custo impede comparar valores absolutos com a primeira. Traces mostram trabalho de JavaScript e compositor/GPU entre chegada da imagem e apresentação; não permitem atribuir todo o atraso à hidratação. O breakdown observado no trace não usa a mesma escala do LCP simulado.

[Execuções, ambiente, fontes preservadas e tentativas inválidas](phase-h-review/hydration-investigation.json). Builds dos [SVGs](phase-h-review/build-native-icons.log), da [captura](phase-h-review/build-server-capture.log) e da [restauração](phase-h-review/build-hydration-restored.log): PASS, incluindo TypeScript. Houve tentativa inicial com servidor indisponível, erro no leitor de trace e preview preliminar iniciado antes do build terminar; foram descartados antes das séries válidas. Um health check PowerShell também falhou e foi corrigido com `-UseBasicParsing` antes de medir. Não contabilizar essas tentativas como provas de produto.

Sem alteração de produto conservada, não foi repetida a suíte completa nem foi feito aceite visual dos candidatos rejeitados. Os quatro arquivos preexistentes voltaram a coincidir byte a byte com o snapshot; a prova E2E de 379 PASS/5 SKIP abaixo continua sendo a execução anterior, não uma nova rodada. O build e o preview foram restaurados. Próxima investigação de H: obter perfil de CPU por função na inicialização e relacioná-lo à apresentação antes de propor outra alteração; estas sondagens não identificaram uma correção segura. Coreografia, dependências, limites de acessibilidade e critérios de aceitação permanecem iguais.

## Checks e histórico de falhas

- Build restaurado e TypeScript strict: PASS; lint completo: PASS. O aviso de `metadataBase` ausente no ambiente local sem SITE_URL permanece; não é validação de SEO de produção. HTTP local 200, `noindex` presente e duas folhas CSS externas confirmadas após a restauração.
- Unitários: primeira rodada 8/9, timeout de 60s no teste que carrega plugins ESLint durante checks concorrentes. Reexecução isolada 9/9 em 3,03s, sem alterar teste ou limite. Ambos os logs são preservados.
- Formato global: FAIL em 24 arquivos preexistentes, mesma lista da entrada. Não houve reformatação histórica. Formato dos novos documentos/dados e diff-check verificados no fechamento.
- E2E inicial anterior: 371 aprovados, oito falhas e cinco skips em 384. Três falhas eram a expectativa antiga da captura Ateliê, três os alvos menores que 44px; um timeout de transição Firefox e um crash do worker Firefox. Confirmação selecionada: 84 aprovados e três skips em 87.
- E2E anterior após prioridades de imagem: 378 aprovados, uma falha e cinco skips em 384. A falha de leitura de competências veio do alinhamento tardio da âncora concorrendo com scroll programático do teste. A alteração pendente acrescenta um gesto de usuário antes da leitura; confirmação anterior 9/9, três repetições por engine.
- E2E desta retomada: **379 aprovados, cinco skips, zero falhas e zero retries**, em uma execução completa de 384 casos, Chromium/Firefox/WebKit, dois workers, cerca de 7,9 minutos. [Resumo integral](phase-h-review/e2e-continuation.json). A reconfirmação usa o build restaurado e inclui a alteração preexistente do teste de competências.

Cinco skips históricos: três fluxos de Tab no WebKit/Windows, que pula links nativos mesmo em HTML simples, e dois projetos não Chromium no teste de zoom por extensão Chromium. Não são testes aprovados; não representam prova de Safari real. Falhas e skips ficam nos resumos JSON, sem retries automáticos.

## Evidências e continuidade

Capturas selecionadas da reconfirmação atual: [menu a 320px](phase-h-review/chromium-menu-open-320.png), [foco por teclado](phase-h-review/chromium-keyboard-focus.png), zoom 200% [Museu](phase-h-review/chromium-zoom-200-museu-arte-moderna.png) e [Ateliê](phase-h-review/chromium-zoom-200-atelie-ingrid-xavier.png). A captura dos [alvos do carrossel](phase-h-review/carousel-after.png) documenta a correção anterior `7a27a28`. Provas de movimento contínuo G continuam em [PHASE_G_CINEMATIC_REVIEW](PHASE_G_CINEMATIC_REVIEW.md); não houve nova coreografia nem nova aceitação perceptual. Capturas estáticas não demonstram ritmo ou fluidez.

[Hashes da fonte e pendências preservadas](phase-h-review/source-fingerprints.json); [manifesto dos artefatos](phase-h-review/manifest.json). Relatórios Lighthouse completos, traces e snapshots permanecem locais em `.audit/phase-h`; resumos, logs relevantes e capturas selecionadas são duráveis em `docs/phase-h-review`.

Pendências: performance H03; formato histórico; consolidação das alterações preexistentes pelo fluxo próprio; fotos/contextos, direitos de destaque Ateliê, aparência do favicon em aba e validações humanas/em dispositivos físicos anteriores. Esta retomada não resolve nem presume dispensa dessas pendências. I será prontidão de produção — SEO, segurança, proveniência e checklist — e depende de confirmação explícita separada. Nenhum push/deploy foi executado.
