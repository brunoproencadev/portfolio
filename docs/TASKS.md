# Tarefas e gate atual

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
