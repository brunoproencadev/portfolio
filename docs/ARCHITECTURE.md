## Continuidade F e faixas — 2026-10-17

Contrato vigente deste incremento: [PHASE_F_TRANSITIONS](PHASE_F_TRANSITIONS.md). HomeMotion carrega o scroll em qualquer viewport sem reduced motion. `home-reveals` mantém o único pin horizontal e delega as seções de apoio a `section-transitions`; seus contextos são revertidos juntos. Contato/footer ficam fora dos seletores. O hero compacto só recebe movimento quando o owner cinematográfico não é elegível, preservando a separação de propriedades da intro e da navbar.

Fade usa variável CSS condicionada ao intervalo ativo, deixando o conteúdo fora da tela com opacidade integral. Hash e teclado acomodam o scrub antes de medir foco; não desmontam o pin durante navegação. A inicialização explícita da intro mantém sua sequência mesmo com refresh do ScrollTrigger antes do primeiro frame.

`ContactPassage` conserva markup SSR e delega a `ribbon-loop`: fases modulares em grupos iguais, impulso do scroll e amortecimento; ResizeObserver mede, RAF só escreve transforms dos trilhos. Inclinações pertencem aos wrappers CSS. IntersectionObserver, visibilidade, pagehide/pageshow e reduced controlam o loop; cleanup libera frames, observers, listeners e estilos. Remoção do botão foi solicitada explicitamente pelo usuário. Sem dependências novas ou motor de scroll.

As descrições abaixo são históricas e não substituem esses owners/comportamentos.

## Correção F — retomada de scroll e coreografia, 2026-10-14

HomeMotion separa suspensão reversível (foco/hash/reduced/pagehide) de desmontagem. Roda/toque retoma somente quando desktop e no-preference permitem; pending evita imports simultâneos. Uma referência visual em fluxo preserva a leitura ao reinserir o pin. startReveals finaliza ScrollTrigger.refresh antes de devolver o cleanup; medir antes desse refresh deixava salto equivalente à extensão do pin. pageshow só retoma quando persisted; o evento inicial não anula a proteção do hash direto.

GSAP scroll possui hero-content/hero-light, enquanto entrada D/E possui filhos; Motion continua exclusivo da cápsula. Faixa story-stage alterna Industry e Ateliê com títulos/mídias/fundos, sem links no track. Detalhes/cases/repositórios permanecem em fluxo. Painel Sobre, índices/linhas de competências e faixas de contato usam o mesmo contexto GSAP e cleanup; nenhum estado React por frame. Um pin de120svh; mobile/baixo/reduced/no-JS são sequenciais. Contrato e limites em PHASE_F_CORRECTION_REVIEW.

## Histórico da extensão F — cenas reais da home

SelectedWork é componente servidor: dados factuais continuam em portfolio.ts; mídia e legenda de evidência ficam em project-media.ts. Next Image usa dimensões explícitas, sizes e lazy loading. Sem novo estado React, rede runtime externa ou dependência.

HomeMotion continua responsável pela elegibilidade/cancelamento/import; F adia o módulo de scroll até uma viewport≥900×700, escutando resize até o primeiro import ou cancelamento. Mobile não baixa ScrollTrigger sem precisar; home-reveals usa um único gsap.matchMedia, que possui os ScrollTriggers. O pin só existe após enhancement, conteúdo SSR já é legível. ClearProps no cleanup libera propriedades sob ownership exclusivo, preservando estilos estruturais do Next Image. Links ficam fora do track mascarado. A home aplica Manrope/paleta neutra com escopo home-page; os cases mantêm estilos/diagramas existentes.

# Arquitetura e decisões

## Saudação e passagem — E, 2026-10-13

HomeMotion volta a ser irmão de CinematicHero dentro de main: a camada fixed precisa ficar fora do stacking context isolado do hero para cobrir também a navegação. Continua uma única ilha client, sem portal ou outro gerenciador. A camada é hidden/aria-hidden no SSR e só aparece após instalação de todos os encerramentos e sucesso do import. Pular usa Manrope compartilhada e fica fixo no canto inferior com safe-area, acima da camada.

O owner usa um ref para a camada e sempre a oculta antes de reverter GSAP. Foco/ponteiro no documento encerram a intro inclusive ao usar navbar/skip link; botão Pular permanece exceção até click/Enter. Listeners globais só existem durante a entrada, recebem cleanup e não cancelam eventos. Sem body lock, inert de conteúdo ou fake progress. requestAnimationFrame é responsabilidade do GSAP; sem loops adicionais de produção.

home-sequence mede quatro paths do traçado B, distribui850ms por comprimento e anima stroke-dashoffset sequencialmente. Timeline E retira o wrapper HTML em1000–1450ms e inicia a entrada D em850ms: total1850ms. Watchdog2200ms preservado, independente do sucesso/término da animação. Reduced/falha/hash/sessão mantêm a página estática. Sem mudanças de dependências, conteúdo, rotas, SEO ou scroll F.

## Hero cinematográfico — D, 2026-10-12

CinematicHero é Server Component; mantém profile, h1 único, #inicio e CTAs. HomeMotion continua a ilha client responsável por elegibilidade, import dinâmico, sessão, cancelamento e watchdog2,2s. startIntro usa GSAP context/revert no wrapper HTML do arco e nas linhas/apoios; Motion permanece exclusivo da cápsula. Fonte local Manrope compartilhada em src/fonts/manrope.ts, sem duplicar declaração ou adicionar dependências.

O caderno orbital foi removido porque sua composição contradizia R2/B; somente esse markup/CSS e a entrada foram reconstruídos. Luz SVG em três camadas, blur estático e stroke-width animado, clipping local. Header mantém96px no fluxo para estabilidade de hidratação. Conteúdo SSR legível e natural; min-height não recorta texto. Dados, SEO, rotas, estilo dos cases e home-reveals preservados. Storytelling e mídia de projetos aguardam F.

## Ilha dimensional — C, 2026-10-12

SiteNavigation preserva estado React, destinos, observer da seção, âncoras e fallback SSR/no-JS. useIslandMotion possui o ref e o ciclo de vida local; Motion mini (dependência existente) interpola width/height/radius e opacity/translateY dos filhos. Medição antes do paint usa altura natural e painel com largura expandida estável; o texto/avatar nunca recebe scale. Custo de layout restrito à pequena superfície fixa, sem listener de scroll nem loop permanente.

Comandos revertem a geometria corrente; revisão invalida conclusões antigas. Resize, fonte pronta, foco no painel, pagehide/visibilidade e reduced motion encerram a transição no estado legível. ResizeObserver/listeners/animações recebem cleanup. Falha de animação cai no estado final. Links fechados/saindo ficam inert e aria-hidden imediatamente; Escape devolve foco, clique externo resolve foco interno antes de ocultar sem capturar o destino externo. Sem body lock/focus trap. GSAP não toca esses nós.

Fonte Manrope e avatar locais usados somente na cápsula. Tokens B são locais nessa migração; o restante do produto mantém o sistema anterior até seus gates. Nenhuma dependência, rota, dado, SEO ou favicon alterado em C. Provas e limites em PHASE_C_REVIEW.

## Decisão da auditoria de redesign — Fase A, 2026-10-11

Preservar esta arquitetura e as invariantes de conteúdo/segurança/acessibilidade. Nenhum código foi alterado. O novo brief exige reconstruir apresentação e coreografia, não framework/rotas/dados. Motion instalado passa a ser candidato para transformação dimensional da ilha em C; GSAP/ScrollTrigger continuam donos de intro/cenas em D/E/F, sem disputar propriedades. Propostas e fronteiras em MOTION_SPEC/REDESIGN_AUDIT; gates A–I em VISUAL_REDESIGN_PLAN. A ausência de pin/scrub e o uso somente de CSS na cápsula abaixo descrevem o estado existente, não restrição para o redesign aprovado futuramente.

## Protótipos documentais B

HTML/CSS em docs/design-prototype, sem framework/build/roteador ou import em src. Uma fonte local licenciada e mídias documentais A. details nativo demonstra estados instantâneos; não substitui handlers do SiteNavigation. Tokens B em DESIGN_SYSTEM são proposta, não descrição do globals.css atual. Implementação em C–F continuará nas fronteiras existentes, sem biblioteca adicional.

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
