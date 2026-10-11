# Bruno Proença Silva — Portfólio

Portfólio Next.js diretamente em `D:\projects\portifolio`. Fase 7 concluída: home, movimento, três cases, erro/404 e QA local multibrowser/Lighthouse. Próximo gate: aprovação da Fase 8 (SEO/domínio e preparação de publicação). Estado e evidências: [HANDOFF](docs/HANDOFF.md), [QA da Fase 7](docs/QA_PHASE7.md) e [VERIFICATION](docs/VERIFICATION.md).

## Executar

Node 24 e npm 11. Nenhuma conta, segredo ou variável de ambiente é necessária nesta fase.

```sh
npm ci
npm run dev
```

Abrir http://127.0.0.1:3000. Para produção local: `npm run build` e `npm run start`.

## Verificar

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium firefox webkit
npm run test:e2e -- --workers=2
npm audit --omit=dev
```

Typecheck gera os tipos do Next antes de executar TypeScript. E2E exige build anterior, inicia e encerra servidor próprio em 127.0.0.1:3100; não reutiliza um servidor antigo. Screenshots/traces ficam em test-results, ignorados e substituídos a cada rodada. Instale os três navegadores em um novo ambiente; para uma rodada focada, use `--project=chromium`. O zoom usa Chromium completo, um perfil isolado e extensão temporária para aplicar 200%; não modifica o navegador pessoal. Três provas de Tab ficam não executadas em WebKit/Windows devido ao comportamento nativo do runner, reproduzido em HTML mínimo; detalhes em QA_PHASE7.

## Organização e limites

src/app compõe layout/home e cases estáticos no servidor; src/data/portfolio.ts e case-studies.ts separam conteúdo da apresentação. Duas ilhas client: navegação em src/components/navigation e intro/reveals em src/components/motion, com GSAP/ScrollTrigger sob demanda e cleanup local. app/error.tsx é a fronteira client de recuperação. src/styles contém tokens/layout e feedback CSS; src/components/projects contém os SVGs conceituais, com origem registrada em [ASSETS](docs/ASSETS.md). Navegação básica e conteúdo funcionam sem JavaScript. Contato por links reais; sem formulário ou rastreadores.
Validação atual: 7 unitários e 154 E2E aprovados, cinco exclusões documentadas e zero falhas. Inclui quatro larguras, sem JS, reduced motion, foco, zoom, axe, falhas/cleanup, cases/404 e recuperação de erro. Lighthouse mobile (três rodadas por rota): medianas de performance 99–100, acessibilidade/boas práticas 100, LCP ≤2,09s e CLS ≤0,035. Prova local, sem INP de campo nem certificação de acessibilidade.
Produção: **https://brunoproencasilva.vercel.app**, publicada na Vercel em 2026-10-11 no commit 0272dea, com domínio/HTTPS/canonical/OG/assets/robots/sitemap/404 e cabeçalhos verificados. Previews mantêm noindex/nofollow. Perfil indexável simulado localmente: Lighthouse SEO 100 nas quatro rotas. Detalhes e limites em [LAUNCH](docs/LAUNCH.md). Commits enviados ao GitHub até 0272dea; registro documental posterior local. Novos pushes/deploys exigem autorização explícita.
ESLint 9.39.5 mantém os peers compatíveis, mas está fora de suporte; cinco alertas de desenvolvimento na cadeia braces permanecem documentados em AUDIT. Não executar audit fix --force.
A pesquisa de design contém capturas documentais em docs/reference-audit; não são assets do portfólio nem trabalho de Bruno. Os diagramas exibidos são próprios e rotulados como conceituais; as evidências dos cases apontam a revisões fixas dos repositórios. Fotos/vídeos externos dependem de origem e autorização confirmadas. Safari real/teclado, leitor de tela, dispositivos físicos e hospedagem não foram validados.

## Continuidade

Leia [PRD](docs/PRD.md), [conteúdo](docs/CONTENT.md), [pesquisa](docs/PROFILE_RESEARCH.md), [design system](docs/DESIGN_SYSTEM.md), [referências](docs/REFERENCES.md) e [arquitetura](docs/ARCHITECTURE.md).
AGENTS.md determina staging explícito, commits pequenos, validação e aprovação obrigatória entre fases. CODEX.md complementa as instruções. A Fase 7 foi autorizada explicitamente e concluída; a Fase 8 aguarda confirmação.
