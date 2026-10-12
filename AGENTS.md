# Instruções persistentes

Leia CODEX.md e docs/PRD.md. Trabalhe diretamente em D:\projects\portifolio.
Preserve mudanças do usuário. Nunca invente experiência, métricas ou funcionalidades.
Workflow: Plan → Implement → Validate → Review → Commit → Document → Continue.
Commits locais obrigatórios, pequenos e atômicos, Conventional Commits, staging explícito; validar antes de cada commit. Não incluir alterações preexistentes, segredos, temporários ou builds. Registrar SHA e resumo em HANDOFF. Atualizar decisões e tarefas.
Push apenas com autorização explícita. Nunca force push, reset hard ou reescrita de histórico sem autorização.
TypeScript strict; dados separados da apresentação; HTML semântico; foco visível; reduced motion; cleanup de observers e animações. Não esconder falhas de testes.
@C:\Users\Bruno\.codex\RTK.md

## Gate obrigatório entre fases — instrução do usuário em 2026-10-09

Concluir a fase atual com implementação, testes relevantes, documentação e commits atômicos. Dentro de uma fase aprovada, trabalhar autonomamente sem pedir aprovação por tarefa ou commit.
Ao encerrar: resumir entregas, listar SHAs, testes e resultados, limitações e decisões pendentes; explicar a próxima fase. NÃO iniciar a próxima fase sem confirmação explícita do usuário. Aprovação de comando/sandbox não equivale a aprovação da próxima fase.
Estado atual: Fase 8 publicada em 2026-10-11 na Vercel, por autorização “Se sim, pode finalizar o que falta”. URL confirmada https://brunoproencasilva.vercel.app; produção READY no commit 0272dea. Commits enviados ao GitHub até 0272dea; registro documental posterior permanece local. Previews continuam noindex. Novos pushes/deploys e trabalho de outra fase exigem autorização explícita. Evidências e limites em docs/LAUNCH.md e docs/HANDOFF.md.

## Cuidados comprovados pela auditoria

No PowerShell, ler texto com -Encoding utf8 ou File.ReadAllText; preservar UTF-8/LF. Validar a árvore completa de peers ao alterar lint, não somente eslint-config-next. next-env.d.ts é gerado por next typegen e não deve ser versionado. Consulte docs/AUDIT.md e docs/REFERENCES.md antes da próxima fase.

## Redesign cinematográfico — contrato de 2026-10-11

- A raiz é o workspace atual D:\projects\portifolio; não criar outra aplicação aninhada. Preservar código útil, dados, SEO, rotas, mudanças do usuário e histórico Git.
- Branch preferida: redesign/cinematic-portfolio. Commits locais pequenos, atômicos, Conventional Commits, staging explícito e validação antes de cada commit. Push/deploy só com autorização explícita separada.
- Fase A concluída em 72d5877. Fase B autorizada explicitamente por “Pode começar a fase B”, em 2026-10-11: direção de arte, design system e protótipos documentais isolados. Preservar src, favicon, dependências e produção. B aprovada; C autorizada pelo “Continue” em resposta ao pedido explícito de aprovação de B/autorização de C, em 2026-10-12. C aprovada; D autorizada pelo “Continue” em resposta ao gate C/D. D implementa somente hero/composição/entrada, conforme docs/PHASE_D_PLAN.md. E–I exigem confirmação individual; não iniciar saudação/loading, storytelling avançado nem publicar.
- Fontes visuais prioritárias: vídeos reais em D:\aNova pasta\Desktop\coisas after\references, somente leitura. Analisar estados consecutivos/timestamps; não deduzir movimento de um screenshot. Priorizar fidelidade aos comportamentos observados.
- O novo brief substitui as antigas proibições de arco violeta, transição dimensional da cápsula e storytelling de scroll. BRAND/DESIGN_SYSTEM especificam a direção B aprovada; src migra somente a navegação em C, demais superfícies permanecem anteriores. Consulte também VISUAL_DIRECTION, COMPONENT_SPEC, PHASE_B_REVIEW, REFERENCE_ANALYSIS, MOTION_SPEC e VISUAL_ACCEPTANCE_CRITERIA em docs antes de implementar.
- Usar avatar GitHub exato, screenshots reais e fotografias pessoais com contexto/origem verificáveis. Não fabricar UI, experiência, métricas, prêmios ou fotos. LinkedIn inacessível exige originais/contexto do usuário; não contornar restrições. Registrar proveniência e permissões em docs/MEDIA_ASSETS.md.
- Validar interface em navegador real com capturas e gravações de interação, comparando geometria, sequência e tempos. Build/testes funcionais não comprovam fidelidade visual. Manter log de comparação, discrepâncias e limites.
- Preservar semântica, teclado/foco, no-JS, reduced motion em execução, conteúdo disponível em falha, cleanup e separação dados/apresentação. GSAP e Motion não devem controlar a mesma propriedade do mesmo elemento.
- Manter docs/TASKS.md, docs/HANDOFF.md, docs/VERIFICATION.md e decisões sincronizados. CODEX.md é apoio explicitamente referenciado, não substitui estas instruções.
- Fluxo do redesign: Analyze → Specify → Plan → Prototype → Implement → Test → Compare → Refine → Commit → Review → Request Approval. Ao fechar a fase, relatar entregas, SHAs, provas, limitações e próxima fase; parar até aprovação explícita.
