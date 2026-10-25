# Fase H — QA do portfólio completo

Autorização explícita do usuário: “Dê início a fase H”, em 18/10/2026. Base limpa `502cfa7`, após fechamento cinematográfico G (`452cb71`, `32dfe49`, `9dab881`, `502cfa7`). Trabalhar na branch atual, sem push/deploy ou início de I. Fotografias/contexto, direitos do Ateliê e inspeção humana do favicon continuam pendentes; a autorização de H permite prosseguir com QA, sem inventar o atendimento desses requisitos.

## Plano e critérios

1. Conferir build de produção, strict, lint, unitários, formato e diff; rodar a suíte E2E completa em Chromium/Firefox/WebKit. Preservar exclusões justificadas e investigar falhas antes de alterar produto ou testes.
2. H01/H02: confirmar layout/teclado/zoom/reduced inicial e dinâmico, falhas/no-JS, navegação e cleanup. Reutilizar provas G ainda válidas e complementar lacunas, sem recriar a direção visual aprovada.
3. H03: Lighthouse mobile local, três navegações por rota (home e quatro cases), sem build/testes concorrentes; registrar ambiente, throttling, rede, long tasks e medianas. Metas LCP≤2500ms, CLS≤0,1 e notas≥90 nas categorias aplicáveis. SEO limitado pelo noindex deliberado; TBT não comprova INP.
4. Corrigir somente defeitos reproduzidos. Medir novamente a superfície afetada e executar regressões pertinentes antes de cada commit de implementação. Sem atualizações de dependências ou reformatação histórica sem necessidade comprovada.
5. Revisar evidências, registrar resultados/falhas/limitações, SHAs e decisões em HANDOFF/TASKS/VERIFICATION e relatório H. Encerrar para avaliação do usuário; I (prontidão de produção) depende de autorização própria.

## Método e limites

Skills `verify-and-stop` e `investigate-first`: provas suficientes, diagnóstico antes de correção, sem polimento adicional após os critérios passarem. Navegadores automatizados locais não comprovam Safari real, leitor de tela, dispositivo físico ou experiência de campo. Não presumir INP ou aprovação humana de aparência. O check global de formato tinha24 arquivos históricos fora do padrão em G; registrar o resultado real, sem escondê-lo.
