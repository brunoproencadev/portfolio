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
