# Arquitetura e decisões

## Estado implementado

Next 16.4.0, React 19.3.0, App Router, TypeScript strict e Tailwind 4. Home/layout/diagramas são Server Components; somente SiteNavigation é client. Dados editoriais tipados em src/data/portfolio.ts, consumidos pela home e navegação. Sem cases ou timelines implementados.
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

Cases usarão /projetos/[slug], generateStaticParams e notFound para slugs desconhecidos; resolver em dados próprios sem acesso inseguro a propriedades herdadas. Nenhum banco ou API é necessário. Adicionar tipo/helper apenas quando existir consumidor.

## Dependências e responsabilidades

- Next/React: rotas, SSR/prerender e metadata. Sem export estático obrigatório: headers atuais precisam do servidor/plataforma compatível.
- Tailwind: composição com tokens semânticos; globals é a fonte de valores. Breakpoints explícitos sm=600px e lg=900px, sem duplicar outros nomes.
- GSAP 3.15.0/ScrollTrigger: sequências e revelações da Fase 5. Sem import no layout ou loop próprio; criar contexto local e revert no cleanup. Não usar ScrollTrigger.getAll().kill(), pois afetaria outros componentes.
- Motion 14.1.0: selecionado para a animação de estado da cápsula na Fase 5, se ela trouxer benefício visual. Fase 4 usa React/CSS e não o importa. Import localizado; não animar o mesmo transform/opacity com GSAP e Motion.
- CSS: feedback simples. Sem Three/R3F/Drei, Anime, React Spring ou Lenis: SVG/CSS e scroll nativo atendem à proposta.
- Bibliotecas de movimento instaladas, ainda não importadas em src: instalação não implica uso nem custo integral no bundle.
- Vitest: dados e regressões úteis; Playwright/axe: comportamento em produção local. Lighthouse é ferramenta de laboratório, não telemetria.
- ESLint 9.39.5 fixado por compatibilidade de todos os peers. A consulta apenas a eslint-config-next permitia ESLint 10, mas import/react/jsx-a11y não. Atualizar conjuntamente quando suportado; não usar force/legacy-peer-deps. Risco residual de suporte e braces em AUDIT.

## Invariantes de UX e performance

Conteúdo renderizado antes do movimento; nunca usar opacity:0 global no SSR esperando JS. Intro é aprimoramento cancelável, não requisito de carregamento. Sem bloquear body/scroll. Preferência reduzida elimina intro/parallax e animação de layout; a preferência também deve cancelar timelines em execução.
Menu é disclosure não modal: sem focus trap, sem body lock. Links normais funcionam sem JS; useSyncExternalStore distingue servidor/hidratação e só esconde opções no cliente. Navegação por âncoras nativas, foco programático no título sem substituir URL/scroll; Escape retorna ao botão, saída de foco/clique externo fecham sem roubar foco. Observer/listeners têm cleanup, sem loop de animação ou listener contínuo de scroll.
Hero e imagens têm espaço reservado; imagens significativas usam next/image e dimensões. Não carregar vídeos/iframes externos automaticamente. Diagrama conceitual precisa de legenda distinta de evidência real.
Orçamentos iniciais para avaliar na Fase 7: imagem de hero ≤250 KiB e fontes adicionais ≤120 KiB transferidas. Atualmente fontes de sistema, sem download. Ajustar somente com medição e justificativa.
Ano em conteúdo pré-renderizado depende do build: incluir atualização anual no checklist, ou definir revalidação na implementação do footer.

## Segurança e publicação

Nosniff, Referrer-Policy, X-Frame-Options DENY e Permissions-Policy já configurados; não equivalem a uma auditoria de segurança completa.
Preview tem robots noindex/nofollow. Gate 8 deve substituir essa política somente com aprovação de publicação e domínio HTTPS confirmado; SITE_URL será validada e usada em canonical/OG/sitemap. Variável ainda não implementada nem necessária para executar localmente.
Links de conteúdo aceitam somente https e mailto nos destinos confirmados; URL externa com target blank usa noopener noreferrer. Não expor tokens em NEXT_PUBLIC. Sem trackers, formulários ou políticas jurídicas inventadas.
CSP será avaliada com scripts/fontes finais; não adicionar unsafe-inline genérico para simular proteção.

## Reprodutibilidade

Node 24; npm ci usa package-lock. npm run typecheck executa next typegen antes do tsc. next-env.d.ts é gerado, ignorado pelo Git. .editorconfig/.gitattributes padronizam UTF-8/LF; scripts PowerShell devem usar -Encoding utf8 ou File.ReadAllText/WriteAllText explícitos.
Lint falha também em avisos. Teste de tooling exercita regras React e alt-text em um exemplo inválido; seu timeout de 60s acomoda cold start dos plugins no Windows, sem desabilitar regras.
