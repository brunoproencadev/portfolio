# Arquitetura e decisões

## Decisão da auditoria de redesign — Fase A, 2026-10-11

Preservar esta arquitetura e as invariantes de conteúdo/segurança/acessibilidade. Nenhum código foi alterado. O novo brief exige reconstruir apresentação e coreografia, não framework/rotas/dados. Motion instalado passa a ser candidato para transformação dimensional da ilha em C; GSAP/ScrollTrigger continuam donos de intro/cenas em D/E/F, sem disputar propriedades. Propostas e fronteiras em MOTION_SPEC/REDESIGN_AUDIT; gates A–I em VISUAL_REDESIGN_PLAN. A ausência de pin/scrub e o uso somente de CSS na cápsula abaixo descrevem o estado existente, não restrição para o redesign aprovado futuramente.

## Estado implementado

Next 16.4.0, React 19.3.0, App Router, TypeScript strict e Tailwind 4. Home/layout/cases/diagramas são Server Components; SiteNavigation e HomeMotion são ilhas client. Dados editoriais em src/data/portfolio.ts e case-studies.ts. app/error.tsx é a fronteira client de recuperação, independente das ilhas. Intro/reveals e três cases entregues nas Fases 5/6.
CSS global é dono dos tokens, layout e feedback; classes próprias como page-container evitam colisão com utilitários do Tailwind. Não criar diretórios vazios ou abstrações para componentes inexistentes.

## Fronteiras para as próximas fases

| Responsabilidade                          | Local/dono                               | Limite                                                                                          |
| ----------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Composição de páginas, metadata e JSON-LD | src/app                                  | Servidor; não colocar use client no layout/home inteiros                                        |
| Identidade, URLs e projetos               | src/config e src/data, quando consumidos | Objetos locais tipados; fonte editorial em CONTENT; testes verificam slugs, protocolos e origem |
| Navegação contextual                      | src/components/navigation                | Uma ilha client para estado/observer; links semânticos; cleanup                                 |
| Seções e cartões                          | src/components/sections e projects       | Servidor por padrão; reusar composição existente antes de extrair                               |
| Intro/reveals                             | src/components/motion                    | Escopo local, cancelamento e fallback visível                                                   |
| Tokens/layout/feedback simples            | src/styles/globals.css                   | CSS é dono de foco, hover, cores e espaços                                                      |

Cases usam /projetos/[slug], generateStaticParams, dynamicParams=false e notFound. getCaseStudy combina projeto/texto por find, sem acesso a propriedades herdadas. Conteúdo SSR/SSG com metadados por case e noindex herdado; links Next permitem navegar entre cases e voltar à home sem replay da intro. Fontes públicas por blob/SHA, diagramas inline com role img/title/dimensões. app/not-found.tsx retorna mensagem e links úteis; error.tsx foca o título, mantém erro interno fora da UI e oferece refresh/reset ou retorno ao início. Nenhum banco, API ou endpoint de teste é necessário.

## Dependências e responsabilidades

- Next/React: rotas, SSR/prerender e metadata. Sem export estático obrigatório: headers atuais precisam do servidor/plataforma compatível.
- Tailwind: composição com tokens semânticos; globals é a fonte de valores. Breakpoints explícitos sm=600px e lg=900px, sem duplicar outros nomes.
- GSAP 3.15.0/ScrollTrigger: HomeMotion importa home-sequence/home-reveals sob demanda, com contextos limitados ao main. Intro tem timeout externo, sessionStorage opcional e guarda por documento; reveals usam gatilhos locais uma vez por alvo. Cleanup por preferência/foco/hash/pagehide/unmount usa context.revert e guarda contra imports tardios. Não usar ScrollTrigger.getAll().kill(), pois afetaria outros componentes.
- Motion 14.1.0: instalado, sem import. Avaliação da Fase 5 manteve CSS na cápsula: deslocamento simples de 8px/280ms, sem animação de altura/saída nem alteração de hidden/foco. Um runtime adicional não trouxe benefício suficiente. GSAP não atua na cápsula.
- CSS: feedback simples. Sem Three/R3F/Drei, Anime, React Spring ou Lenis: SVG/CSS e scroll nativo atendem à proposta.
- Movimento reduzido inicial evita imports dos módulos de animação; ativá-lo durante execução reverte efeitos e não os reinicia automaticamente ao voltar a no-preference. Textos nunca têm opacity reduzida; nenhum estado SSR fica esperando JavaScript.
- Vitest: dados e regressões úteis; Playwright/axe: comportamento em produção local. Lighthouse é ferramenta de laboratório, não telemetria.
- ESLint 9.39.5 fixado por compatibilidade de todos os peers. A consulta apenas a eslint-config-next permitia ESLint 10, mas import/react/jsx-a11y não. Atualizar conjuntamente quando suportado; não usar force/legacy-peer-deps. Risco residual de suporte e braces em AUDIT.

## Invariantes de UX e performance

Conteúdo renderizado antes do movimento; nunca usar opacity:0 global no SSR esperando JS. Intro é aprimoramento cancelável, não requisito de carregamento. Sem bloquear body/scroll. Preferência reduzida elimina intro/parallax e animação de layout; a preferência também deve cancelar timelines em execução.
Menu é disclosure não modal: sem focus trap, sem body lock. Links normais funcionam sem JS; useSyncExternalStore distingue servidor/hidratação e só esconde opções no cliente. Navegação por âncoras nativas, foco programático no título sem substituir URL/scroll; Escape retorna ao botão, saída de foco/clique externo fecham sem roubar foco. Observer/listeners têm cleanup, sem loop de animação ou listener contínuo de scroll.
Hero e imagens têm espaço reservado; imagens significativas usam next/image e dimensões. Não carregar vídeos/iframes externos automaticamente. Diagrama conceitual precisa de legenda distinta de evidência real.
Orçamentos verificados na Fase 7: imagem de hero ≤250 KiB e fontes adicionais ≤120 KiB. Zero requisições de imagem/fonte/mídia; SVG inline contabilizado no HTML e fontes de sistema. Lighthouse mobile: home ~204,6 KiB totais e cases ~166,6–166,8 KiB, LCP mediano ≤2,09s/CLS ≤0,035. Sem orçamento rígido de JS inventado após a medição; manter ilhas pequenas/imports sob demanda e repetir as métricas quando a interface mudar. Detalhes/limites em QA_PHASE7.
Ano em conteúdo pré-renderizado depende do build: incluir atualização anual no checklist, ou definir revalidação na implementação do footer.

Escape é ouvido no documento somente enquanto a cápsula está aberta: cliques no WebKit podem manter foco fora do nav. O efeito remove keydown/pointerdown no fechamento e unmount. Não forçar foco no botão ao abri-lo por ponteiro; isso interferiu no clique de links no WebKit. O retorno de foco ao fechar por Escape é preservado. Monogramas incluem BP/ no nome acessível para corresponder ao texto visível.

## Segurança e publicação

Nosniff, Referrer-Policy, X-Frame-Options DENY e Permissions-Policy já configurados; não equivalem a uma auditoria de segurança completa.
src/config/site.ts valida SITE_URL e centraliza metadata/canonical/OG e SITE_INDEXABLE. Sem URL, não cria canonical. Indexação exige true e origem HTTPS; previews Vercel permanecem noindex/nofollow com robots disallow e sitemap vazio. Rotas metadata são estáticas: variáveis exigem novo build. Política pública só muda com autorização de publicação e domínio confirmado; checklist em LAUNCH.md.
Links de conteúdo aceitam somente https e mailto nos destinos confirmados; URL externa com target blank usa noopener noreferrer. Não expor tokens em NEXT_PUBLIC. Sem trackers, formulários ou políticas jurídicas inventadas.
CSP será avaliada com scripts/fontes finais; não adicionar unsafe-inline genérico para simular proteção.

## Reprodutibilidade

Node 24; npm ci usa package-lock. npm run typecheck executa next typegen antes do tsc. next-env.d.ts é gerado, ignorado pelo Git. .editorconfig/.gitattributes padronizam UTF-8/LF; scripts PowerShell devem usar -Encoding utf8 ou File.ReadAllText/WriteAllText explícitos.
Lint falha também em avisos. Teste de tooling exercita regras React e alt-text em um exemplo inválido; seu timeout de 60s acomoda cold start dos plugins no Windows, sem desabilitar regras.
