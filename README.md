# Bruno Proença Silva — Portfólio

Portfólio Next.js diretamente em `D:\projects\portifolio`. Fase 5 concluída: home editorial, cápsula contextual, intro pulável e movimento com fallbacks. Próximo gate: aprovação da Fase 6 (cases, evidências e erro/404). Estado e evidências: [HANDOFF](docs/HANDOFF.md), [AUDIT](docs/AUDIT.md) e [VERIFICATION](docs/VERIFICATION.md).

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

Typecheck gera os tipos do Next antes de executar TypeScript. E2E exige build anterior, inicia e encerra servidor próprio em 127.0.0.1:3100; não reutiliza um servidor antigo. Screenshots/traces ficam em test-results, ignorados e substituídos a cada rodada. Chromium já foi instalado nesta máquina, mas deve ser instalado em um novo ambiente. O teste de zoom usa Chromium completo, um perfil isolado e uma extensão temporária para aplicar zoom nativo de 200%; não modifica o navegador pessoal.

## Organização e limites

src/app compõe layout/home no servidor; src/data/portfolio.ts contém os dados editoriais confirmados. Duas ilhas client: navegação em src/components/navigation e intro/reveals em src/components/motion, com GSAP/ScrollTrigger sob demanda e cleanup local. src/styles contém tokens/layout e feedback CSS da cápsula; src/components/projects contém os SVGs conceituais. Navegação básica e conteúdo funcionam sem JavaScript. Contato por links reais; sem formulário ou rastreadores.
Validação atual: 3 unitários e 33 E2E, incluindo teclado/foco, quatro larguras, sem JS, movimento reduzido em execução, zoom 200%, links, axe, falha de biblioteca/storage e cancelamento de animações. Consulte os limites da prova em VERIFICATION.
Preview contém noindex/nofollow. SEO final e remoção dessa proteção exigem o gate de produção. Commits anteriores enviados ao GitHub até e54c0c7, antes da Fase 4; incrementos das Fases 4/5 permanecem locais. Sem deploy.
ESLint 9.39.5 mantém os peers compatíveis, mas está fora de suporte; cinco alertas de desenvolvimento na cadeia braces permanecem documentados em AUDIT. Não executar audit fix --force.
A pesquisa de design contém capturas documentais em docs/reference-audit; não são assets do portfólio nem trabalho de Bruno. Os diagramas exibidos são próprios e rotulados como conceituais. Cases e SEO final seguem seus gates; a 404 ainda é a padrão do Next.

## Continuidade

Leia [PRD](docs/PRD.md), [conteúdo](docs/CONTENT.md), [pesquisa](docs/PROFILE_RESEARCH.md), [design system](docs/DESIGN_SYSTEM.md), [referências](docs/REFERENCES.md) e [arquitetura](docs/ARCHITECTURE.md).
AGENTS.md determina staging explícito, commits pequenos, validação e aprovação obrigatória entre fases. CODEX.md complementa as instruções. A Fase 5 foi autorizada explicitamente e concluída; a Fase 6 aguarda confirmação.
