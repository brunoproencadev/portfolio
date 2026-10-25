# Tarefas e gate atual

## Estado vigente — entrega autorizada e validada, 25/10/2026

- [x] Aceite visual final do usuário; fotografias pessoais/contexto retirados do escopo. Publicação GitHub/main/Vercel explicitamente autorizada.
- [x] `857207f`/`d9430f4`: ícones com maior ocupação, ICO64 adicional e avatar1,1em com densidade correta.18/18 E2E focados e comparação visual inspecionada.
- [x] Release limpo isolado d9430f4: npm ci, build/strict/lint/nove unitários/formato PASS;400 E2E PASS/5 SKIP, zero falhas/retries. Auditorias zero; quatro edições locais preservadas e excluídas. [Revisão](FINALIZATION_REVIEW.md).
- [x] Confirmar recuperação de fluidez após parar QA paralelo; retomada com um worker/BelowNormal aprovada nos testes. Nenhuma mudança experimental no scroll mantida.
- [ ] Concluir PR1/main e publicar SHA integrado, com rollback identificado e conferência do domínio. Autorização já concedida, sem repetir pedido.
- [ ] H03 continua: home88/LCP3392ms; não declarar meta aprovada por publicação. Cases/INP não remedidos; hardware/leitor de tela mantêm limites anteriores.

## Estado vigente — pedidos de interação e formato, 25/10/2026

- [x] Plano `38cc257`; `a7034e9`: seleção de texto bloqueada nas cinco rotas e outline removido somente do título do hero, mantendo foco de links/botões.
- [x] Build/strict PASS;15 verificações de arraste, seis de foco/reload nos três motores, captura inspecionada. Teclado/reduced motion existente2 PASS/1 SKIP histórico WebKit/Windows. [Revisão](COMPLETION_REVIEW.md).
- [x] `b0f52c4`:24 avisos de formato resolvidos; JSON/Markdown preservados semanticamente, dez hashes/tamanhos atualizados em seis manifestos. Formato global PASS, quatro edições anteriores intactas.
- [x] Investigar inicialização pós-frame/idle com três execuções por variante; retirar os dois candidatos sem ganho comprovado necessário. JS restaurado ao controle; não reduzir a coreografia para ganhar nota.
- [ ] H03: localizar/reduzir custo de renderização/inicialização com comparação pareada; controle pré-CSS84/LCP3540ms, fora da meta. Cases/INP não remedidos.
- [ ] Revisão/liberação de I e limites humanos/físicos/fotos/contexto; autorizações próprias de push/integração/deploy conforme RELEASE_CHECKLIST.

Registros inferiores de formato24 pendente foram superados; segurança/SEO/permissão Ateliê mantêm as provas de I.

## Estado vigente — I preparada para revisão, 25/10/2026

- [x] Autorização I registrada em `ebaad99`; escopo PHASE_I_PLAN, sem publicação implícita.
- [x] `3b99eba`: OG com identidade atual, avatar exato e Manrope local/licenciada; nenhuma mudança da home/coreografia.
- [x] Permissão Ateliê confirmada expressamente pelo usuário e registrada em MEDIA_ASSETS; não inventar fotos/contexto.
- [x] SEO/assets18/18 nos três perfis e motores; builds/strict/lint/nove unitários PASS, auditorias zero, headers/404/sitemap conferidos. Build noindex restaurado, quatro edições anteriores intactas. [Revisão](PHASE_I_REVIEW.md).
- [x] Checklist de release/rollback documentado; deploy Git main/redesign permanece bloqueado, sem push/merge/deploy.
- [ ] Revisar I; resolver H03 e decidir formato histórico24 arquivos antes da liberação. H03 não foi dispensada pela autorização de I.
- [ ] Aceite visual humano, favicon em aba, compartilhamento real, Safari/aparelhos/leitor de tela, INP e fotos/contexto nos limites registrados.
- [ ] Autorizações próprias para envio, integração e publicação, com SHA/deployment e prova no destino conforme RELEASE_CHECKLIST.

Registros inferiores de I não autorizada ou direitos Ateliê pendentes são históricos; H03 continua aberta.

## Estado vigente — medição das transições, 25/10/2026

- [x] Plano `92952eb`, fonte `6fd47a7`: immediateRender:false impede que a entrada contamine a medição; coreografia/tempos/cleanup mantidos. [Revisão](PHASE_H_RESOLUTION_REVIEW.md).
- [x] Reprodução Firefox 11 PASS/1 FAIL com scroll correto; após correção, teste original 20/20 e transições 12/12 PASS, build/strict/lint/nove unitários PASS.
- [x] Testes `d2e7bf7`: geometria natural fora da tela e cápsula estável antes do contraste, mantendo foco/pin/axe/timeouts. Rodada completa inicial: 393 PASS/4 FAIL/5 SKIP; confirmação dos dois arquivos afetados: 15/15 PASS. 397 casos distintos aprovados entre os comandos, com cinco skips e zero retries. Não foi uma única rodada completa sem falhas.
- [x] Browser com saída/reversão:20 capturas e duas comparações, sem overflow/pageerror nos 22 registros; quatro arquivos anteriores intactos.
- [x] Sondagem CSS rejeitada sem editar produto; perfil CPU separado, sem extrapolar causalidade.
- [ ] H03: nota 88/LCP 3412ms, fora de nota≥90/LCP≤2500ms. Cases e INP não remedidos; foco seguinte em inicialização/medição das seções com prova pareada.
- [ ] Formato histórico, provas humanas/físicas, fotos/contexto, direitos Ateliê, favicon em aba e gates de I/publicação permanecem. Sem push/deploy.

Registros abaixo são históricos quando conflitarem com este estado; a intermitência de medição Firefox foi corrigida e reconfirmada.

## Estado vigente — retomada H em25/10/2026

- [x] Autorização de correção Next e continuidade; plano `ae86b92`, dependências `4ed77f9`, [relatório atual](PHASE_H_SECURITY_REVIEW.md).
- [x] Next/eslint-config-next16.4.3 e correções compatíveis de Vitest/mocker/fast-uri/zod. Auditorias de runtime e completa com zero vulnerabilidades; nenhuma versão maior ou dependência direta nova.
- [x] npm ci/build/strict/lint/nove unitários PASS;22 chunks JS/CSS byte a byte iguais aos testados. Árvore sem peers inválidos; seis avisos extraneous opcionais WASM registrados.
- [x] E2E completo396 PASS/1 FAIL/5 SKIP e confirmações documentadas;16 capturas desktop/mobile, sem overflow/pageerror nos estados registrados. Quatro alterações anteriores intactas e fora dos commits.
- [x] H03:21 Lighthouse, experimento delimitado de refresh rejeitado após controle restaurado melhor. Nenhuma mudança de movimento conservada.
- [ ] Investigar intermitência de reversão Firefox: duas falhas e três confirmações posteriores PASS, sem aumentar timeout/alterar teste; causa não isolada.
- [ ] H03: home final performance84/LCP3585ms; cases LCP2583/2513/2840/2922ms, todos fora da meta≤2500ms. Perfil atual com variabilidade controlada antes de outro candidato. INP segue sem prova própria.
- [ ] Formato global:24 arquivos históricos. Fotos/contexto, direitos Ateliê, favicon em aba, validações humanas/físicas e fase I/publicação continuam com gates próprios. Nenhum novo push/deploy autorizado.

Os registros abaixo são históricos quando conflitarem com este estado; a segurança local deixou de ser pendente.

## Push autorizado — 24/10/2026

- [x] Aceite do ajuste do PNG e autorização explícita “Perfeito, muito obrigado, pode fazer o push”. Enviados23 commits até `32e24b5`, mantendo histórico e branch `redesign/cinematic-portfolio`; sem merge/main.
- [x] Bloquear deploy Git automático também da branch de redesign em vercel.json, validando JSON/formato/diff; conferir SHA remoto, main inalterada e0 deployments na consulta do commit.
- [x] Confirmar renomeação para `brunoproencadev/portfolio`, atualizar origin e preservar as quatro alterações locais sem commit. Enviar também este fechamento documental na mesma branch.
- [ ] H03, segurança Next e fase I/publicação continuam pendentes e não foram aprovadas pelo pedido de push.

## Easter egg do nome — 24/10/2026

- [x] Ajuste posterior `21af82c`: PNG transparente sem fundo, recorte ou sombra; tamanho0,85em (~31% maior). Build/strict e9 regressões específicas passam; desktop/mobile conferidos.

- [x] Pedido explícito: “o” de Bruno troca pelo avatar e retorna após1s; fonte `6e9575a`, sem dependências novas. [Entrega](HERO_AVATAR_REVIEW.md).
- [x] Preservar posição/nome acessível, respeitar reduced motion e falha de imagem; confirmar75/75 E2E focados nos três motores, build/strict, lint e9 unitários.
- [x] Capturas e gravações desktop/mobile; registrar proveniência, falhas intermediárias e continuidade. Quatro arquivos preexistentes preservados.
- [ ] Avaliação perceptual do usuário. H03 e segurança Next continuam abertos; push/deploy/I não autorizados.

## Refinamento de UI/UX — 24/10/2026

- [x] Plano aprovado explicitamente; registro `7fc1de6`, implementação/testes `bac97a6`. [Relatório](UI_UX_REFINEMENT_REVIEW.md).
- [x] Corrigir perda de posição e foco ao alternar reduced motion; indicar projeto atual no carrossel sem alterar a coreografia aprovada.
- [x] Validar 9 novas regressões nos três motores; suíte de produção 387 PASS/5 SKIP/1 crash Firefox e confirmação isolada 1/1 PASS. Build/strict, lint e 9 unitários passam. Preservar histórico e 24 falhas globais de formato.
- [x] Capturar 23 estados finais e duas gravações; preservar os quatro arquivos de entrada e registrar hashes, decisões, métricas e SHAs.
- [ ] Avaliação perceptual do usuário; H03 continua fora da meta: home performance84/LCP3522ms na mediana de três execuções atuais.
- [ ] Decisão separada sobre atualizar Next 16.4.0 para a correção 16.4.3 indicada pelo npm audit crítico. Não aplicada nesta rodada; I/push/deploy não autorizados.

## Estado vigente — H autorizada, performance pendente

- [x] H autorizada em 18/10 por “Dê início a fase H”; retomada por “Dê continuidade”. Plano `d6a17f0`; correção anterior `7a27a28`; relatório/evidências `cbb81bc`. Registros de H não autorizada abaixo são históricos.
- [x] Reconfirmar a árvore: build/strict/lint, 9 unitários e suíte completa de 384 casos — 379 aprovados, cinco skips, zero falhas/retries. Histórico de falhas e limitações em [PHASE_H_REVIEW](PHASE_H_REVIEW.md).
- [x] H01/H02: cobertura automatizada de responsividade, toque, teclado/foco, zoom Chromium, no-JS/falhas, reduced inicial/dinâmico e cleanup. Preservar limites de WebKit/Windows e avaliação humana.
- [x] H03 medição: três Lighthouse mobile por rota; comparar prioridades/decodificação/CSS embutido, rejeitar experimento sem ganho e registrar ambiente/rede/long tasks. Não alterar coreografia para obter pontuação.
- [ ] H03 aceitação: reduzir LCP mediano a ≤2,5s e performance home a ≥90 sem mudar a sequência aprovada; nova rodada permanece fora da meta nas cinco rotas. INP depende de prova própria de campo.
- [ ] H04 residual: formato global falha em 24 arquivos históricos; quatro arquivos preexistentes preservados fora dos novos commits. Provas identificam a árvore com pendências por hashes.
- [ ] Validações humanas anteriores, fotos/contexto, direitos Ateliê e favicon em aba. I/push/deploy não autorizados; manter o gate individual.

## Redesign cinematográfico — estado vigente

- [x] Incremento G solicitado: planejar antes de animar, preservar13 pendências da mesma tarefa, aplicar identidade/scroll aos quatro cases e adicionar Museu com créditos coletivos/storytelling e imagem original2340×1080 preenchendo a janela. Fontes452cb71/32dfe49; relatório PHASE_G_CINEMATIC_REVIEW.
- [x] Validar build/strict/lint,9 unitários,102 testes selecionados entre confirmação99/102 e reconfirmação3/3, SEO6/6; preservar histórico de falhas.72 estados visuais e provas duráveis. Commits locais, sem push/deploy.
- [ ] Avaliação perceptual G; fotos/contexto, aba visível e direitos Ateliê conforme limites anteriores. H/I exigem autorização específica. Entradas anteriores de três cases abaixo são históricas.

- [x] 18/10: G autorizada explicitamente por “dê sequência com a fase G”. Plano6c1c768; ícones161b6a4; casesaee6ea7. Entrega local em PHASE_G_REVIEW; sem push/deploy ou H/I.
- [x] G02: três cases com mídia real, leitura B, fontes/limites, slugs e fallbacks preservados; build/strict/lint,8 unitários e60 E2E finais aprovados. Formato dos alterados passa; global falha em24 arquivos preexistentes, lista registrada.
- [x] G03 parcial: avatar atual confirmado; ICO16/32/48, PNG192/Apple180 e metadata/HTTP verificados.
- [ ] G01: fotografias pessoais/eventos ainda dependem de originais/contexto; nenhuma dispensa confirmada. G03: inspecionar aparência na aba visível. Obter avaliação da entrega G e decidir sobre essas pendências antes de encerrar o gate.
- [ ] Gate H: aguardar aprovação explícita para QA completo/performance; não iniciar automaticamente. G01/G03 não estão integralmente aceitos. Direitos de destaque Ateliê permanecem pendentes.

- [x] 18/10: F aprovada explicitamente por “Perfeito, a fase F finalmente está adequada”. Push e integração na branch padrão autorizados pelo pedido de contribuições; preservar todos os commits originais e bloquear deploy automático da `main` até o gate de publicação. E-mail associado ao perfil confirmado via API GitHub. G–I aguardam seus gates individuais.
- [x] 18/10: sete commits pendentes enviados;56 commits originais integrados à `main` por fast-forward. Refs remotas main/redesign iguais em30eeef5; JSON/formato/ancestralidade/árvores verificados, Preview confirmado pela API. Atualização do gráfico depende do processamento do GitHub e da preferência pessoal de contribuições privadas.

- [x] 18/10: concluir pendências em41eec81/6d5e46b e implementar o pedido posterior emf2cb592: competências Museu/kord e surgimento atrasado dos ícones somente no carrossel, RoboSense preservado. Build/lint/strict,7 unitários e30 E2E finais aprovados; provas/limites em PHASE_F_COMPETENCIES.

- [x] Pedido atual de 17/10: fechar revalidação anterior (`875da83`), bounce, Clawd central acima do RoboSense e carrossel Museu → Industry Week → Ateliê → kord com mídia real (`c3a801d`). Relatório vigente PHASE_F_PROJECTS.
- [x] Validar autoria declarada do Museu, natureza acadêmica do kord, mídia, âncoras, foco/reversão, mobile/no-JS/reduced; preservar três cases. Build/strict/lint, 7 unitários; 120 E2E distintos cobertos após confirmação 63/63. Evidências desktop/mobile.
- [x] Avaliação perceptual dos incrementos F aprovada pelo usuário em18/10. Push e integração realizados por autorização posterior; fase geral G e publicação ainda dependem de autorização explícita.

- [x] 17/10: usuário aprovou a versão do scroll e autorizou último refinamento F: recuo RoboSense→texto, superfície Sobre sobreposta, blurs, halo, sombras/glows, moldura e Claude Code nos três projetos. Implementação e provas em PHASE_F_DEPTH.
- [x] Preservar entrada aprovada, faixas e contato; validar reversão, foco, navegação interrompida, reduced/no-JS, resize e três engines. Resultados/limites vigentes em VERIFICATION e HANDOFF.
- [ ] Avaliação perceptual dos refinamentos finais; G–I, novos pushes e deploy aguardam autorização específica. O histórico de pendências abaixo não substitui este estado.

- [x] Fase A autorizada em 2026-10-11: workspace/Git/arquitetura/documentação inspecionados, status inicial limpo em aa70f4c, branch redesign/cinematic-portfolio preservada.
- [x] Três MP4 reais analisados; mapeamento, hashes, duração/resolução, keyframes sequenciais e limites em REFERENCE_ANALYSIS.
- [x] Baseline navegador desktop/mobile e auditoria KEEP/IMPROVE/REBUILD/REMOVE; causas do desvio e invariantes em REDESIGN_AUDIT.
- [x] Mídia pública pesquisada: avatar, deployment Industry Week e screenshots reais dos três projetos; LinkedIn bloqueado documentado, sem fabricação.
- [x] MOTION_SPEC, VISUAL_REDESIGN_PLAN, VISUAL_ACCEPTANCE_CRITERIA e MEDIA_ASSETS entregues; instruções/pesquisa/continuidade atualizadas.
- [x] Provas focadas e revisão documental; commits locais em HANDOFF, sem push/deploy/UI.
- [x] Gate B: autorizado pelo usuário em 2026-10-11, “Pode começar a fase B”.
- [x] B: direção, fonte licenciada, BRAND/DESIGN_SYSTEM, especificações e protótipos desktop/mobile.
- [x] Fechar revisão B, evidências e commits; ship no escopo estático, dois P3 resolvidos.
- [x] Gate C: B aprovada e C autorizada pelo “Continue” em resposta ao pedido explícito do gate, 2026-10-12.
- [x] C: ilha dimensional, assets locais, regressões, gravações/comparação e revisão independente ship; evidências em PHASE_C_REVIEW e commits em HANDOFF.
- [x] Gate D: autorizado pelo “Continue” em resposta ao pedido explícito C/D.
- [x] D: hero cinematográfico, entrada, regressões, capturas/gravações, Lighthouse e revisão independente ship; PHASE_D_REVIEW e commits em HANDOFF.
- [x] Gate E: D aprovada e E autorizada explicitamente por “Aprovo e autorizo”.
- [x] E: saudação manuscrita/retirada, cancelamento/fallbacks, regressões, vídeo/capturas, Lighthouse e revisão independente ship; PHASE_E_REVIEW e commits em HANDOFF.
- [x] Gate F: E aprovada e F autorizada pelo “continue”, 2026-10-13.
- [x] Corrigir F após rejeição da entrega9921190: lifecycle CTA/hash retomável, hero→mídia, troca de projetos e passagens editoriais; fontef1c78d9/provas0592565, relatório PHASE_F_CORRECTION_REVIEW.166 E2E passam/5 skips;36 capturas/duas gravações. Diferenças e falhas iniciais documentadas.
- [x] Retomar F em 2026-10-15 com protótipo isolado hero→RoboSense: fonte e941dd5, evidências dac0825, relatório PHASE_F_PROTOTYPE_REVIEW. Navbar/hero reutilizados e home preservada; 18 casos E2E distintos +3 reconfirmações, 7 unitários, build/lint/strict. Rota somente em desenvolvimento, 404 em produção.
- [x] Aceite visual da passagem em 2026-10-15: “de resto, essa parte está aprovada”; pedido adicional de pop-ups das ferramentas e revisão do scroll restante autoriza a integração dentro de F.
- [x] Integrar passagem compartilhada, ferramentas reais e continuidade editorial: fonte 4acc977, relógio de testes 7c518f4, evidências 83e07cc; PHASE_F_INTEGRATION_REVIEW. 172 E2E distintos da home +6 do estudo, 5 skips preexistentes, 7 unitários, build/strict/lint; 36 capturas e três gravações reais.
- [x] Retomar revisão de F em 2026-10-16, conforme escolha explícita do usuário. Ícones `e0dec50` e scroll inferior/janelas horizontais `77d2506` já implementados; reconfirmação sem nova mudança de produto: 63/63 E2E, 7/7 unitários, lint/build/strict, 33 estados capturados. Evidências `417fca9`; relatório PHASE_F_REVALIDATION. Os 47 arquivos preexistentes ficaram preservados e fora dos novos commits.
- [x] Em 2026-10-17, completar composição F previamente pendente, transições reversíveis em RoboSense/Sobre/Projetos/Competências, faixas cruzadas em loop contínuo e reativas ao scroll; remover controle de pausa. Fontes `2571228` e `b5e7875`; implementação/evidências finais e validação em `PHASE_F_TRANSITIONS.md`.
- [x] Consolidar documentação e evidências inferiores que permaneciam locais: contratos atuais/históricos em `c672e90`; relatório `PHASE_F_LOWER_REVIEW`, 42 artefatos e manifesto no commit documental seguinte. Nenhuma mudança de produto.
- [x] Avaliação global F recebida em18/10; G autorizada no pedido posterior. Registros anteriores de F aberta são históricos.
- [ ] G: implementação local disponível para avaliação; G01 fotografias/contexto e G03 inspeção humana de aba permanecem pendentes, conforme PHASE_G_REVIEW.
- [ ] H: QA completo/performance/comparação; gate próprio após G.
- [ ] I: prontidão de produção; gate próprio após H, sem push/deploy implícito.

Pendência de desempenho para H: última mediana LCP local2623ms, acima da meta2500ms, anterior à correçãof1c78d9 e potencialmente desatualizada; novo Lighthouse não executado nesta continuação. INP/dispositivos reais não medidos.

Pendências de fonte: originais e contexto das fotografias pessoais; consideração de direitos de marca/fotos do Ateliê antes de publicação proeminente. Manter timeout frio de tooling registrado (isolado passou); não alterar testes/dependências em A. Critérios de referência não medidos (mobile/easing exato/INP) permanecem explícitos.

## Histórico das fases 0–8

- [x] Fase 0: workspace/Git/remoto preservados; ignores, instruções e commits locais.
- [x] Fase 1: PRD e fontes revisados; conteúdo-base de três projetos com limites e proveniência.
- [x] Fase 2: direção de arte e design system especificados; A/B/C observadas em desktop/mobile e contraste medido.
- [x] Fase 3: fundação Next/strict/ferramentas, noindex de preview e testes.
- [x] Auditoria 0–3: peers de lint corrigidos; tipos regenerados; tokens/contratos e rastreabilidade corrigidos.
- [x] Gate Fase 4: usuário autorizou em 2026-10-10; push anterior concluído e SHA remoto confirmado.
- [x] Fase 4: navbar, hero, galeria, sobre, competências, contato/footer e responsividade.
- [x] Gate Fase 5: usuário autorizou explicitamente em 2026-10-10.
- [x] Fase 5: intro, GSAP/ScrollTrigger, microinterações e fallbacks.
- [x] Gate Fase 6: usuário autorizou explicitamente em 2026-10-10.
- [x] Fase 6: cases, diagramas/evidências, erro/404 e links.
- [x] Gate Fase 7: usuário autorizou explicitamente em 2026-10-10; commits anteriores enviados até c8878a6.
- [x] Fase 7: QA do produto, screenshots, Lighthouse e segurança, com limites registrados em QA_PHASE7.
- [x] Gate Fase 8: usuário autorizou explicitamente em 2026-10-11.
- [x] Fase 8: preparação local de canonical/OG/favicon/sitemap/robots, perfis preview/indexável e checklist de publicação.
- [x] Gate de publicação: usuário autorizou finalizar; projeto/domínio Vercel, produção/indexação e HTTPS/SEO no destino verificados em 2026-10-11 (LAUNCH).

## Incrementos da Fase 4 autorizada

- [x] Home editorial e dados confirmados; diagramas conceituais, contatos e footer.
- [x] Cápsula contextual: disclosure, foco, Escape, clique externo e fallback sem JS.
- [x] QA 320/375/768/1440, zoom/reduced motion/teclado, fontes e links.
- [x] Fechamento: documentação, revisão e commits locais; gate da Fase 5.

## Incrementos da Fase 5 autorizada

- [x] Intro integrada ao diagrama, pulável, 1,2s/timeout independente 2,2s; sem bloquear conteúdo, foco ou scroll.
- [x] Reveals GSAP/ScrollTrigger e avaliação da cápsula; cleanup local e reduced motion em execução.
- [x] Regressões de falha, storage negado, hash, cancelamento e revisão visual; commits/documentação e gate da Fase 6.

## Incrementos da Fase 6 autorizada

- [x] Três cases estáticos, dados editoriais, evidências vinculadas a SHAs e links ativos na home.
- [x] Diagramas autorais com descrição/dimensões; fontes públicas reconferidas; 404 para slugs inválidos.
- [x] Recuperação de erro com foco, nova tentativa e retorno ao início; falhas reais de recurso testadas.
- [x] Revisão, suíte completa, commits/documentação e gate da Fase 7.

## Incrementos da Fase 7 autorizada

- [x] Instalação reproduzível, árvore de peers e reauditoria de segurança.
- [x] QA em Chromium/Firefox/WebKit, revisão visual e correções comprovadas; 148 E2E passaram, cinco exclusões documentadas.
- [x] Lighthouse mobile de produção local: três execuções por rota, medianas, rede e ambiente; metas LCP/CLS atendidas.
- [x] Gates finais, decisões, commits locais e documentação; aguardar Fase 8.

## Limites preservados

- A09: ESLint compatível fora de suporte; cinco alertas high de desenvolvimento por braces sem patch compatível confirmado. Runtime auditado separadamente.
- LinkedIn bloqueado; formação/conquistas aguardam confirmação e ficam omitidas.
- Vercel publicada em https://brunoproencasilva.vercel.app, commit 0272dea. Novas ações externas exigem autorização; registro documental posterior permanece local.
- Scroll cinematográfico da referência B não foi comprovado; não copiar comportamento presumido.
- Composição/coreografia próprias revisadas; QA local concluído. Safari real/Tab, dispositivos físicos, leitor de tela e métricas de campo permanecem sem comprovação.
- Cases implementados com fontes fixas reconferidas e diagramas autorais; novas fotos/vídeos exigem origem/autorização confirmadas. Revisar novamente as fontes antes de publicar.
- Footer usa o ano do build; atualizar o build na virada do ano ou revisar revalidação no gate de produção.

Fases 1/2 originalmente tinham apenas documentação inicial; a auditoria corrigiu essa lacuna. Check nesta lista significa entrega da fase no escopo descrito, não aprovação de produção nem conclusão do produto final.
