# Fase F — scroll storytelling e mídia autêntica

Fechamento em2026-10-14. Entrega local autorizada pelo “continue” no gate E/F, em2026-10-13. Branch redesign/cinematic-portfolio. G–I/push/deploy continuam sem autorização.

## Resultado

A grade de três cards conceituais foi substituída por cenas distintas, com fontes reais: frame M3 amplo no RoboSense, faixa clara com duas capturas verificadas no Industry Week e página integral do Ateliê em coluna. Texto, stacks, estados, fontes, repositórios e cases foram preservados. Demonstração pública disponível apenas no Industry; HTTP200 reconfirmado nesta fase (não nova captura funcional do deployment). Avatar/favicon e novos conteúdos/cases não entraram no escopo.

A home usa Manrope e neutros/violeta com escopo local; diagramas/estilos dos cases permanecem existentes. Sem dependência, canvas ou backend novo. HomeMotion segue dono do cancelamento/import; GSAP matchMedia controla exclusivamente o scroll. O módulo só carrega quando a viewport permite a cena desktop.

## Referência → implementação

| Evidência original | Aplicação F | Diferença / limite |
| --- | --- | --- |
| R2 6,3–8,7s, screenshot cresce enquanto hero recua | RoboSense aproxima scale0,88→1/y64→0 e abre máscara6→0 durante scroll | Adaptação em fluxo: não reproduz toda a sobreposição dimensional do hero da referência. D/E preservados. |
| R3 22,8–25,2s, faixa clara estável e troca vertical | Industry fixa um palco por120svh; rótulos/links estáveis; mídia troca verticalmente no intervalo35–65%, com70% total de leitura | Dois estados reais do mesmo projeto; faixa proporcionalmente mais alta para screenshot/legenda legíveis. Não é equivalência geométrica exata. |
| R3, fundo ampliado derivado da mídia corrente | Duas cópias decorativas aria-hidden, escurecidas, trocam junto à mídia | Nenhuma mídia inventada; blur fixo, sem loop. |
| B, Ateliê em coluna editorial | Screenshot completo preserva aspecto; texto lateral desktop, fluxo vertical mobile | Não implica deployment público; origem é repositório/execução local. |
| Contrato de navegação segura | Mobile/reduced/no-JS/viewport baixo mostram ambas as telas no fluxo; foco/hash/pagehide/reduced cancelam | Movimento é enhancement. Um pin, sem scroll hijack; links fora do track mascarado. |

Easing original não é inferível com precisão dos vídeos. Scroll usa scrub linear; segundos das referências não são duração fixa do gesto implementado. Nenhuma afirmação pixel-perfect.

## Evidências visuais

- [RoboSense desktop](story-review/robo-1440.jpg), [mobile](story-review/robo-375.jpg).
- Industry: [início](story-review/industry-1440-0.2.jpg), [troca](story-review/industry-1440-0.5.jpg), [final](story-review/industry-1440-0.85.jpg), [mobile sequencial](story-review/industry-375.jpg).
- [Ateliê desktop](story-review/atelie-1440.jpg), [fluxo mobile completo](story-review/flow-375.jpg).
- Gravações reais25fps, amostradas nas pranchas [desktop](story-review/recorded-scroll-1440.jpg) e [mobile](story-review/recorded-scroll-375.jpg). WebMs locais .audit/phase-f/scroll-1440.webm e scroll-375.webm,17,2s/16,4s; hashes em recordings.json. Sem relógio simulado.
- Cinco larguras320/375/768/1440/1920,26 estados/checagens registrados em capture-results.json; sem overflow/pageerrors/violações axe. Estados completos reduced em flow-*.jpg. Axe não certifica WCAG.
- Correção apontada pela revisão:1920×700 extrapolava o palco. max-width dependente da altura agora mantém faixa y≈136/altura≈540 abaixo da ilha. [Meio WebKit](story-review/wide-short-1920-webkit-0.5.jpg); início/meio/fim Chromium/WebKit e geometria em wide-short-results.json.

Capturas padrão e gravações correspondem à implementação5c49407; correção de enquadramento b8d2f04 não altera esses tamanhos. Capturas1920×700 foram feitas após dbaae0e. Esta última alteração adia import mobile; não muda a aparência, comprovada pelos testes específicos. Originais e referência permanecem read-only; pranchas só redimensionam/rotulam capturas reais.

## Verificação

Build de produção, TypeScript strict, lint, formato dos arquivos alterados e diff-check aprovados. Vitest7/7. Playwright integral no núcleo F:244 passes/5 skips preexistentes/0 falhas, Chromium/Firefox/WebKit,3 workers. Os skips de zoom/teclado WebKit são anteriores, documentados em QA_PHASE7/PHASE_E_REVIEW.

Após correções finais: suite storytelling29 passes/1 falha de sincronização de viewport WebKit; teste de geometria passou3/3 após aguardar bounds estabilizados. Após otimização:122 passes/1 encerramento inesperado do workerWebKit(code3221226505); mesmo teste isolado passou1/1, sem alterar lógica/timeout. Não alegar nova rodada integral limpa após dbaae0e. Histórico completo em test-results.json; dados brutos em .audit/phase-f.

Provas incluem scroll normal/reverso/rápido, pin único limitado, resize, imagens carregadas/proporções, foco/hash, reduced em execução, pagehide, back/forward, no-JS, import falho e import adiado até desktop. Testes antigos de reveal foram substituídos por essas invariantes; texto do hero nas expectativas foi atualizado ao conteúdo D já existente.

React: cenas permanecem servidor; dados/mídia separados; sem efeitos React novos nas cenas, imports condicionais e cleanup explícito. Review detector executado uma vez em selected-work, sem achados; não substitui inspeção visual.

## Desempenho medido

Lighthouse mobile local, Chromium156, três execuções antes e três depois da otimização, sem E2E/gravação concorrente. Ambiente/throttling detalhados em performance.json. Medianas finais: performance97, acessibilidade100, boas práticas100, SEO66 pelo noindex intencional do preview; LCP2623ms, CLS0,03888, TBT42ms,312.974bytes. O carregamento condicional reduziu18.374bytes frente aos331.348bytes iniciais. LCP mudou de2630ms para2623ms: diferença pequena, não alegar ganho significativo. Meta≤2500ms ainda não atingida; continuar investigação em QA H, sem alterar a intro aprovada apenas para melhorar nota.

Gravação com712 amostrasRAF desktop e764 mobile: mediana16,7ms em ambos; p95 desktop33,3ms/máximo50,1ms e mobile16,8ms. Inclui custo do recorder local; não prova60fps sustentado, GPU/dispositivo real ou INP de campo. Não houve animação persistente fora do scroll. Frames25fps não medem frames de renderização.

## Limitações e próximo gate

Fotos pessoais não integradas: LinkedIn bloqueado e nenhum original/contexto recebido; pergunta opcional enviada, sem substituir por IA/stock. Revisar permissão de marca/fotos do Ateliê antes de publicação proeminente. Fontes das mídias/hashes/otimizações em MEDIA_ASSETS e project-media-manifest. LCP acima da meta e hardware real/INP permanecem não validados. Nenhum push/deploy.

Próxima fase G, somente após aprovação explícita: revisar narrativa factual, conteúdo/cases, mídias pessoais verificadas e avatar favicon conforme TASKS. Não iniciar automaticamente.

## Commits locais

- e933461 — plano e autorização F.
- 57dee8b — mídias autênticas otimizadas/proveniência.
- 5c49407 — cenas, scroll reversível, fallbacks e testes.
- b8d2f04 — enquadramento em desktops largos/baixos.
- dbaae0e — import condicional do scroll.

- 4026c99 — design system e produto sincronizados com F aplicada.

[Revisão independente](story-review/independent-review.md): **ship restrito às duas correções pontuadas**, ambas resolvidas. Sessões do reviewer/documenter foram interrompidas por limite de uso; escrita documental validada pelo executor e verdict pass retomado por novo revisor independente. Não houve nova auditoria integral no verdict pass. Commits de evidência/fechamento registrados em HANDOFF.

Nenhum listener nas portas3100/3101 na confirmação de fechamento. Servidores de teste/captura encerrados.
