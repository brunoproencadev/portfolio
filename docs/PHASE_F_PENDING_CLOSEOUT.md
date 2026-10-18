# Fechamento das pendências anteriores — F, 17/10/2026

Retomada autorizada pelo pedido “Termine o que está pendente”. Antes de alterar o produto para o novo pedido, o estado local sobre `b966e4b` foi revalidado: build/TypeScript strict, lint completo e 7/7 unitários aprovados; storytelling + robo-handoff, 54/54 casos nos três engines, sem retries ou skips. Comando: `node node_modules/@playwright/test/cli.js test tests/e2e/storytelling.spec.ts tests/e2e/robo-handoff.spec.ts --workers=2 --reporter=line`. Log local `.audit/phase-f-projects/baseline-e2e.txt`.

Isso confirma funcionalmente as correções de recuo, cobertura, ponteiros e navegação já presentes. As 4 falhas da rodada anterior foram seguidas por 54/54 no fechamento anterior e novamente nesta retomada. Evidências visuais locais anteriores permanecem em `docs/scroll-depth-review` e `.audit/phase-f-depth/confirmed`; não foram recriadas nem tratadas como aceite do usuário. Build mantém o aviso conhecido de metadataBase/localhost.

Havia 21 arquivos rastreados modificados e quatro entradas não rastreadas na chegada (incluindo uma pasta de evidências). Cópias e inventário de preservação em `.audit/phase-f-projects/baseline*`. Por instrução persistente de não incluir alterações preexistentes, elas não integram o commit deste fechamento. A validação é da árvore de trabalho, não apenas de HEAD; este limite precisa acompanhar o handoff.

Próximo incremento explicitamente autorizado neste mesmo pedido: bounce nos pop-ups, Clawd no topo central do RoboSense, Museu e kord com mídia verificável, carrossel Museu → Industry Week → Ateliê → kord. As etapas gerais G–I, push e deploy continuam sem autorização. Os três cases existentes serão preservados.
