# Preparação de publicação — Fase 8

Autorizada pelo usuário em 2026-10-11. Hospedagem escolhida: Vercel. Endereço desejado interpretado do nome `brunoproencasilva`: https://brunoproencasilva.vercel.app. Disponibilidade, projeto e titularidade ainda não verificados; nenhum MCP Vercel está exposto nesta sessão. Nenhum push/deploy autorizado nesta fase.

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
