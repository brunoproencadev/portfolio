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
