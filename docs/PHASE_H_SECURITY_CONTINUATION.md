# Continuidade H — segurança e desempenho, 25/10/2026

Usuário pediu continuidade das pendências e autorizou a correção do Next por “Faça o que for necessário para solucionar. Em seguida pode dar continuidade”. Base `9f0f064`, branch `redesign/cinematic-portfolio`, raiz `D:\projects\portifolio`. Sem push/deploy ou fase I.

## Plano

1. Preservar byte a byte as quatro alterações anteriores: PHASE_H_PLAN, CaseCapture, HeroProject e refinement.spec. Snapshot local em `.audit/phase-h-resume-20261025/preserved-files.json`.
2. Atualizar somente Next 16.4.0 → 16.4.3, correção compatível indicada pela auditoria atual, e alinhar eslint-config-next. Revisar lockfile, sharp e árvore completa de peers; não usar audit fix indiscriminado nem trocar versões maiores.
3. Confirmar auditoria de runtime sem os alertas Next, build/strict, lint, nove unitários e E2E em produção. A dependência altera todas as rotas, imagens e navegação; usar a suíte existente, mantendo skips e falhas reais. Conferir screenshots desktop/mobile e noindex.
4. Retomar H03 com medição atual. O perfil anterior aponta leituras de CSS e refresh GSAP; tempo próprio amostrado não prova causalidade de LCP. Isolar a inicialização antes de testar uma correção; conservar somente ganho medido com comportamento aprovado preservado.
5. Revisar diff, validar e criar commits atômicos. Sincronizar HANDOFF/TASKS/VERIFICATION/CODEX e decisões. H só encerra se cumprir seus critérios; I/publicação têm gates separados.

## Evidência inicial e limites

Auditoria npm atual confirma Next crítico e indica 16.4.3. Os três avisos afetam versões até 16.4.0; a correção começou em 16.4.1. A busca no código/configuração não encontrou Server Actions, use cache ou habilitação de SVG no otimizador; isso não substitui atualizar o pacote nem comprova segurança de produção.

Fontes oficiais: [imagens](https://github.com/advisories/GHSA-2464-fhr4-w9xw), [Server Actions](https://github.com/advisories/GHSA-p3m5-59mp-jv5r), [use cache](https://github.com/advisories/GHSA-673q-mjm6-r5xr). O primeiro risco depende de Linux/glibc; os demais têm requisitos de uso descritos nos avisos. Nenhuma evidência de invasão foi encontrada ou investigada neste escopo.

A primeira consulta npm no sandbox falhou por rede/cache; consulta com acesso ampliado confirmou metadados e auditoria. Não confundir essa falha com falha da aplicação. Node 24 e React 19.3 atendem aos peers declarados do patch. Auditoria de desenvolvimento e desempenho terão resultados registrados separadamente.

## Experimento H03 — refresh de transições

A auditoria completa após o patch identificou quatro alertas de ferramentas de desenvolvimento. Correções compatíveis via `npm update vitest fast-uri zod` resolveram os alertas; apenas o lockfile dessas ferramentas mudou, sem dependências novas. Vitest 4.1.12, fast-uri 3.1.9 e zod 4.6.7; subdependências compatíveis de Vitest/Vite também foram atualizadas. Auditorias finais e árvore completa passam. Não aplicar overrides ou atualização maior.

O perfil histórico de CPU contém cerca de 267ms amostrados sob startReveals, incluindo cerca de 76ms em uma chamada de refresh; valores de amostragem não são o LCP. As pilhas ligam o refresh à inicialização CSSPlugin/getComputedStyle. Em section-transitions, os endpoints das revelações são numéricos, e invalidateOnRefresh reabre a inicialização de todos os tweens a cada refresh global. Além disso, entry/exit leem a mesma altura quatro vezes intercaladas com criação das animações.

Candidato delimitado: medir a altura uma vez por revelação antes de escrever estilos e retirar a invalidação apenas dessas timelines com endpoints fixos. Preservar atualização dos limites do ScrollTrigger, onRefresh, media queries, cleanup, hero/carrossel e funções dependentes de viewport. A [documentação GSAP](https://gsap.com/docs/v3/Plugins/ScrollTrigger/#invalidateOnRefresh) distingue atualizar posições de invalidar valores da animação.

Medir três Lighthouse mobile antes/depois, sem concorrência, com o Next corrigido nos dois estados. Se não houver ganho consistente, restaurar integralmente section-transitions; não conservar micro-otimização apenas por parecer correta. Se o ganho justificar conservar, confirmar transições/reversão/resize/reduced motion/cleanup nos três motores e capturas desktop/mobile. Critérios H03 permanecem LCP≤2500ms/performance≥90; não adiar ou retirar a experiência aprovada para obter nota.

## Resultado

Correção de dependências em `4ed77f9`; zero vulnerabilidades em runtime e desenvolvimento, npm ci/build/strict/lint/nove unitários aprovados. E2E: 396 PASS/1 FAIL/5 SKIP, intermitência Firefox preservada e três confirmações posteriores aprovadas. Experimento de refresh descartado após controle restaurado melhor; nenhuma mudança de movimento conservada. Relatório vigente: [PHASE_H_SECURITY_REVIEW](PHASE_H_SECURITY_REVIEW.md). H03, formato histórico e validações humanas permanecem abertos; sem I/push/deploy.
