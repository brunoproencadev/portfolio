# Bruno Proença Silva — Portfólio

Fundação Next.js diretamente em `D:\projects\portifolio`. A interface da Fase 4 ainda aguarda aprovação. Estado e evidências: [HANDOFF](docs/HANDOFF.md), [AUDIT](docs/AUDIT.md) e [VERIFICATION](docs/VERIFICATION.md).

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
npx playwright install chromium
npm run test:e2e
npm audit --omit=dev
```

Typecheck gera os tipos do Next antes de executar TypeScript. E2E exige build anterior, inicia e encerra servidor próprio em 127.0.0.1:3100; não reutiliza um servidor antigo. Screenshots/traces ficam em test-results, ignorados pelo Git. Chromium já foi instalado nesta máquina, mas deve ser instalado em um novo ambiente.

## Organização e limites

src/app contém layout/home estáticos; src/styles contém tokens; tests cobre a fundação. Diretórios de dados/componentes serão criados quando consumidos, sem scaffolding vazio.
Preview contém noindex/nofollow. SEO final e remoção dessa proteção exigem o gate de produção. Sem site publicado ou push.
ESLint 9.39.5 mantém os peers compatíveis, mas está fora de suporte; cinco alertas de desenvolvimento na cadeia braces permanecem documentados em AUDIT. Não executar audit fix --force.
A pesquisa de design contém capturas documentais em docs/reference-audit; não são assets do portfólio nem trabalho de Bruno.

## Continuidade

Leia [PRD](docs/PRD.md), [conteúdo](docs/CONTENT.md), [pesquisa](docs/PROFILE_RESEARCH.md), [design system](docs/DESIGN_SYSTEM.md), [referências](docs/REFERENCES.md) e [arquitetura](docs/ARCHITECTURE.md).
AGENTS.md determina staging explícito, commits pequenos, validação e aprovação obrigatória entre fases. CODEX.md complementa as instruções. A auditoria autorizada das Fases 0–3 não autoriza iniciar a Fase 4.
