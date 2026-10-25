# Release do redesign — checklist de 25/10/2026

Preparação da fase I, não autorização de publicação. Branch `redesign/cinematic-portfolio`, plano `ebaad99`, fonte `3b99eba`; [provas e limites](PHASE_I_REVIEW.md). A publicação histórica de2026-10-11 em LAUNCH não comprova a publicação deste redesign.

Continuidade25/10: `a7034e9` atende seleção/título, `b0f52c4` resolve formato histórico com hashes atualizados; [revisão e limites atuais](COMPLETION_REVIEW.md). H03 não passou; sondas de agendamento retiradas, sem alteração de coreografia.

## Preparado localmente

- [x] Cinco rotas: `/`, `/projetos/robosense-lab`, `/projetos/museu-arte-moderna`, `/projetos/industry-week-senai`, `/projetos/atelie-ingrid-xavier`.
- [x] Matriz padrão/preview/produção simulada:18 E2E PASS nos três motores; canonical/OG/Twitter, robots/sitemap, ícones e cabeçalhos conferidos. Slug desconhecido e estudo experimental404/noindex.
- [x] OG alinhada à identidade e inspecionada; fontes locais com licença/proveniência; avatar exato reconfirmado.
- [x] Permissão para destacar marca/capturas Ateliê confirmada expressamente pelo usuário; demais atribuições preservadas no inventário.
- [x] Next/eslint-config-next16.4.3; auditorias runtime/completa zero vulnerabilidades; build/strict/lint/nove unitários PASS. Seis avisos opcionais extraneous conhecidos; varredura de padrões sem achados, com limites registrados.
- [x] Build local restaurado para noindex/sitemap vazio, exemplo de ambiente false, deploy automático Git bloqueado para main/redesign; quatro edições anteriores intactas e fora dos commits.

## Decisões e provas antes da liberação

- [ ] Resolver H03 (home fora das metas nota≥90/LCP≤2500ms), preservando coreografia e produzindo comparação pareada; INP de campo continua sem prova. Preparação de I não dispensa H.
- [x] Normalizar os24 arquivos históricos com prova JSON/AST equivalente e atualizar dez hashes/tamanhos em seis manifestos; formato global PASS, linhagem preservada em completion-review/format-preservation.json (`b0f52c4`).
- [ ] Concluir aceite visual humano e favicon em aba visível; registrar limites Safari, aparelhos físicos e leitor de tela. Fotografias/contexto ainda não fornecidos não podem ser tratados como conteúdo validado.
- [ ] Revisar I. Autorizar explicitamente push, eventual integração e deploy/indexação; não inferir uma autorização da outra. Conferir a árvore com as quatro alterações locais antes de definir o SHA exato do release.
- [ ] No projeto Vercel, reconfirmar conta, vínculo do repositório atual `brunoproencadev/portfolio` e domínio `brunoproencasilva.vercel.app`. O HTTP200 público desta fase não comprova essa associação. Registrar deployment de retorno antes de alterar produção.

## Execução futura, somente após autorização

1. Identificar SHA aprovado, árvore de trabalho e commits a enviar; preservar histórico. Publicar apenas o conjunto autorizado, sem incluir arquivos preexistentes por conveniência. Não reativar deploy Git das branches sem decisão explícita.
2. Conferir runtime/configuração do projeto remoto e executar instalação com lockfile/build do SHA aprovado. Preparar preview com `SITE_URL=https://brunoproencasilva.vercel.app` e `SITE_INDEXABLE=false`; confirmar seu noindex. As variáveis são server-side, sem tokens no repositório.
3. Depois do aceite do preview e autorização de produção/indexação, usar a mesma origem e `SITE_INDEXABLE=true` somente no ambiente Production; reconstruir. Metadata/robots/sitemap são estáticos: mudar variável sem build não atualiza a política. `VERCEL_ENV=preview` continua bloqueando indexação mesmo herdando true.
4. No domínio HTTPS efetivo: confirmar as cinco rotas200, canonical/OG/imagens na origem, robots Allow e sitemap exatamente com as cinco URLs; 404/noindex para desconhecido/estudo, favicon/Apple/OG, cabeçalhos e ausência de X-Powered-By. Verificar certificado, HTTP→HTTPS e HSTS no destino. Executar navegação/teclado/reduced motion em desktop/mobile, compartilhamento real e leitura dos logs.
5. Registrar SHA, deployment ID, URL, estado READY e provas do destino. Push concluído ou testes locais não comprovam publicação; logs amostrais não comprovam ausência contínua de erros.

## Rollback, se necessário e autorizado

Restaurar o deployment anterior previamente identificado na Vercel, verificando domínio, versão e funcionamento depois da reversão. Para retirar indexação do build atual, definir `SITE_INDEXABLE=false`, reconstruir e reimplantar; conferir noindex, robots Disallow e sitemap vazio no destino. Bloqueio automático Git permanece até decisão explícita. Preservar commits e registrar motivo/SHA/deployment; sem force push ou reescrita. Crawlers podem demorar a atualizar, e robots não remove sozinho páginas já indexadas. A reversão foi documentada, não executada nesta fase.
