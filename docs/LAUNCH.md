# Publicação vigente — 25/10/2026

Refinamento final já publicado: PR2 integrado em **abbf7a3ced78ef91b0ecda6cc1f6cd5541b7dc0b**, runtime0a53503, deployment **dpl_DYtwkccWuqUkQZmWpgFs5qXypQre** READY, alias https://brunoproencasilva.vercel.app atribuído sem erro. Corrige a indicação responsiva do avatar mantendo ampliação/qualidade e todas as rotinas de movimento. [Resumo final e rollback](finalization-review/publication-summary.json).

Cinco rotas/SEO/sitemap/imagens reais/ícones iguais por SHA/404/HTTPS e browser desktop/mobile conferidos no destino. Fonte mobile adequada a DPR2 e clamp publicado confirmados, zero overflow/pageerrors. Logs de build concluídos; zero error/fatal na janela amostral de cinco minutos, não monitoramento contínuo. Último Lighthouse público mediana95/LCP2517ms; H03 permanece aberta, assim como INP/cases não remedidos. Nenhuma perda de fluidez é aceita para fechar pontuação. A entrega inicial abaixo agora é rollback imediato; doc updates posteriores não precisam de novo deploy se o runtime não mudar.

Redesign publicado por autorização expressa do usuário após aceite visual final e exclusão de fotografias pessoais/contexto do escopo. PR1 integrado em `f9bd0cfa92b41b5fe0bb6dc4ec71c161c6913bce`; deployment `dpl_F9HSH5KotxomfkDPk17Mfsjc18vq`, READY, alias https://brunoproencasilva.vercel.app atribuído sem erro. A Vercel buscou o SHA de main pelo repoId1412563281, sem upload das quatro alterações locais preservadas. [Entrega e provas](FINALIZATION_REVIEW.md).

Cinco rotas200, canonical/OG/Twitter corretos, sitemap com cinco URLs, robots Allow,404/noindex para desconhecido/estudo, assets de ícones iguais por SHA, OG1200×630, redirecionamento HTTP→HTTPS308 e cabeçalhos conferidos. Desktop/mobile sem overflow/pageerrors. Logs de error/fatal na janela consultada de cinco minutos retornaram zero registros; não é monitoramento contínuo. Produção true/Preview false mantidos, sem alterar variáveis. Git deploy automático main/redesign permanece bloqueado.

H03 permanece aberta: primeira série pública93/LCP2547ms, laboratório local88/LCP3392ms. Correção responsiva0a53503, validada em24 E2E, elimina um download mobile duplicado sem alterar animações; aguarda integração/publicação. Sua série local88/LCP3419 não comprova ganho de LCP. O deployment inicial passa a ser rollback conhecido desse refinamento; retorno anterior dpl_6FxjM8rjeehB3bAeWJrG212ABmTL preservado no histórico. Os registros abaixo descrevem estados anteriores.

# Histórico — preparação de publicação em25/10/2026

Fase I preparada localmente para revisão: plano `ebaad99`, fonte `3b99eba`, [revisão/provas](PHASE_I_REVIEW.md), [checklist vigente de release e rollback](RELEASE_CHECKLIST.md). Cinco rotas, OG atual com avatar/Manrope/violeta, permissões Ateliê confirmadas, três perfis SEO com18/18 E2E e auditorias zero. Build local final noindex; deploy Git main/redesign continua bloqueado. Nenhuma publicação do redesign foi executada ou autorizada nesta fase.

H03, formato histórico e validações humanas/físicas impedem tratar o preparo como release liberado. Antes de publicar, reconfirmar projeto/domínio Vercel, SHA aprovado, ambiente e deployment de retorno. A consulta HTTP pública200 não identifica a versão implantada. Registros abaixo são históricos: descrições de BP/, apenas três cases e segurança/I pendentes foram superadas localmente; a produção de2026-10-11 não foi atualizada por esta fase.

# Histórico — preparação de publicação da Fase 8

## Push do redesign sem deploy — 2026-10-24

Usuário aceitou o avatar PNG e autorizou apenas o push. Histórico enviado à branch `redesign/cinematic-portfolio` até `32e24b5`; main não foi atualizada. A configuração `git.deploymentEnabled` passou a bloquear tanto `main` quanto `redesign/cinematic-portfolio`, impedindo que o push autorizado dispare o deploy Git dessas branches, conforme a [configuração oficial Vercel](https://vercel.com/docs/project-configuration/git-configuration). As demais branches não foram alteradas. A afirmação anterior de previews habilitados permanece histórica para a branch de redesign.

O GitHub confirmou o repositório renomeado `brunoproencadev/portfolio`; origin foi atualizado. API de deployments retornou0 registros para o SHA enviado na consulta; status agregado pending sem contextos não comprova uma execução de CI. Este fechamento documental será enviado à mesma branch. Não houve ação de deploy/merge nesta rodada; H03 e correção de segurança Next continuam pendentes, e fase I/publicação exigem aprovação própria.

## Integração GitHub da fase F — 2026-10-18

F aprovada pelo usuário, com pedido explícito de envio ao GitHub e atribuição no gráfico de contribuições. A branch padrão `main` recebe os commits originais do redesign por fast-forward, sem squash ou reescrita. O repositório é privado, não é fork, e o GitHub associa o e-mail dos commits a `brunoproencadev`.

Os registros de deployment do GitHub confirmaram que pushes na `main` acionavam produção. Para cumprir o gate de publicação separado, `vercel.json` define `git.deploymentEnabled.main=false` antes da integração. Só a criação automática de deployments por Git dessa branch fica desativada; previews das demais branches conservam a configuração anterior. Esse bloqueio é deliberado e deverá ser revisto no gate de publicação; integrar na `main` não autoriza deploy, indexação ou G–I. [Configuração oficial](https://vercel.com/docs/project-configuration/git-configuration).

Contribuições requerem commits alcançáveis pela branch padrão e e-mail associado; a atualização do gráfico pode levar até24h. Como o repositório é privado, a exibição pública dos quadrados também depende da preferência pessoal de contribuições privadas. Essa preferência não foi alterada. [Regras do GitHub](https://docs.github.com/en/account-and-profile/how-tos/contribution-settings/troubleshooting-missing-contributions).

Fase 8 publicada em 2026-10-11: https://brunoproencasilva.vercel.app. Usuário autorizou finalizar a publicação quando o MCP estivesse conectado, confirmou login GitHub e autorizou Vercel a acessar myportifolio. Os seis commits pendentes já haviam sido enviados por pedido explícito, com remoto confirmado em 0272dea.

## Lançamento confirmado

- Equipe BPS (bps-a015), projeto brunoproencasilva, preset Next.js, Node 24.x, npm ci e npm run build. Repositório privado brunoproencadev/myportifolio vinculado; apenas o site é publicado.
- Produção READY: dpl_9W75f4TbTM89PGMXKuSZcMDBwYLN, commit 0272dea2505c9d69e30f7097ce74ed6a22e96878. Build concluído em 31s, estado READY após cerca de 43s. Domínio associado/verificado, sem erro de alias.
- SITE_URL=https://brunoproencasilva.vercel.app em Production/Preview; SITE_INDEXABLE=true apenas em Production e false em Preview. Proteção padrão Vercel mantida para URLs de deployment; domínio público respondeu sem login.
- Chromium real/headless no destino, viewport 375×900/reduced motion: quatro rotas HTTP 200, h1 visível, sem overflow, titles/canonical/OG/Twitter corretos e imagens na origem pública. Screenshot de home revisado. Robots permite crawl, sitemap contém exatamente quatro URLs; PNGs OG/Apple com dimensões corretas, favicon SVG HTTP 200; 404 confirmado.
- HTTPS validado sem ignorar certificados, redirecionamento HTTP→HTTPS e HSTS presentes. Nosniff, Referrer-Policy, X-Frame-Options DENY, Permissions-Policy e ausência de X-Powered-By confirmados nas quatro páginas.
- Logs de build concluídos; avisos de ESLint sem suporte e allowScripts de unrs-resolver, sem falha de build. Consulta runtime error/fatal nos últimos cinco minutos não encontrou registros. Primeira consulta de uma hora foi recusada por retenção Hobby; não equivale a prova de ausência contínua de erros. Nenhum drain configurado; sem rastreadores ou monitoramento adicional instalado.

Provas brutas ignoradas em .audit/phase8/live-verification.json e live-home.png. Compartilhamento real em redes sociais, Safari/dispositivos/leitor de tela e INP de campo ainda não verificados. Nenhuma alteração de código ou dependência necessária ao deploy. Registro documental de lançamento em commit local, não enviado sem novo pedido de push.

## Decisões implementadas

- Configuração server em src/config/site.ts: SITE_URL opcional deve ser uma origem HTTPS sem credenciais, caminho, query ou fragmento; localhost e loopback são recusados. Canonical e OG URL só existem com origem informada.
- SITE_INDEXABLE=false por padrão. true exige SITE_URL válida; VERCEL_ENV=preview sempre preserva noindex/nofollow, robots disallow e sitemap vazio. Não configurar true antes da autorização de publicação.
- Metadados individuais nos quatro caminhos reais, OG pt_BR e Twitter summary_large_image sem conta inventada. Imagem comum autoral BP/, sem fontes externas ou nova dependência.
- Assets nativos do Next: SVG de favicon, PNG Apple 180×180 e OG 1200×630. Não carregam no conteúdo visível da página.
- Sitemap publicado contém só home e três cases, sem datas de modificação inventadas. Proteção de indexação não é controle de acesso.

## Vercel: checklist antes de publicar

1. Confirmar no projeto Vercel a disponibilidade e associação de brunoproencasilva.vercel.app à conta correta; se outro domínio for escolhido, usar sua origem exata.
2. Autorizar explicitamente o push dos commits locais e a publicação. A aprovação da Fase 8 prepara os arquivos, não autoriza essas ações.
3. Importar o repositório myportifolio, preset Next.js, diretório raiz, Node 24.x, instalação npm ci e build npm run build. Sem tokens em código ou NEXT_PUBLIC.
4. Configurar SITE_URL na origem confirmada; inicialmente SITE_INDEXABLE=false. Conferir preview, navegação, 404, assets e cabeçalhos. Previews Vercel continuam bloqueados mesmo se herdarem true.
5. Após autorização de produção/indexação, configurar SITE_INDEXABLE=true somente em Production e reconstruir. As rotas são estáticas: alterar variável sem novo build não atualiza metadata/robots/sitemap.
6. No destino HTTPS, confirmar canonical/OG/imagens de todas as rotas, robots, quatro URLs do sitemap, 404, redirecionamentos e ausência de URLs locais. Conferir nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy e comportamento HTTPS. Testar compartilhamento em plataformas reais.
7. Reauditar dependências e revisar fontes externas; registrar limites Safari/dispositivos/leitor de tela. Sem analytics/INP de campo nesta entrega.

Rollback: restaurar SITE_INDEXABLE=false e reconstruir/reimplantar. Preserva conteúdo e histórico. Crawlers podem levar tempo para atualizar; robots não remove sozinho conteúdo já indexado.

## Validação local

Gates comuns: format:check, lint, typecheck, test e build. Preview sem variáveis continua executável; o Next avisa que usa localhost para resolver imagens sociais quando falta metadataBase. Isso é restrito à preparação local: SITE_URL precisa ser configurada antes de uma publicação.

O teste tests/e2e/seo.spec.ts também aceita o perfil indexável com SITE_URL e SITE_INDEXABLE=true no build e no runner. Esse perfil local é apenas uma simulação, não confirma domínio, hospedagem ou autorização de indexação externa. Sempre restaurar o build de preview após a prova.

Audit em 2026-10-11: runtime zero; completo cinco high de desenvolvimento por braces (GHSA-vfj7-8cjw-p6xm). A solução automática propõe downgrade major de eslint-config-next para 14.2.35; não aplicada. Sem mudança de dependências/lockfile.
