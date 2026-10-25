# Fase I — prontidão de produção, 25/10/2026

Autorização do usuário: “Aprovado, pode dar inicio”, em resposta à entrega anterior e ao gate de I. Base `db04dc9`, branch `redesign/cinematic-portfolio`, raiz `D:\projects\portifolio`. Iniciar I não encerra nem dispensa H03, formato histórico ou validações humanas; não autoriza push, merge, deploy ou ativação pública de indexação.

## Escopo e critérios I01

1. Preservar as quatro alterações anteriores, conferindo os hashes de `phase-h-resolution-review/preserved-files.json`. Não incluir esses arquivos nos commits.
2. Validar SEO em três builds locais: padrão sem origem/indexação, preview Vercel herdando `SITE_INDEXABLE=true`, e simulação de produção indexável com a origem documentada. Conferir cinco rotas, canonical/OG/Twitter, robots, sitemap, 404, ícones e cabeçalhos. Restaurar ao final o build local noindex. Variáveis de processo temporárias não mudam Vercel ou a produção real.
3. Corrigir a imagem OG legada: ainda usa BP/ e verde, divergindo de avatar/neutros/violeta da identidade aprovada. Reutilizar perfil e avatar verificado, sem criar mídia ou afirmações pessoais. ImageResponse suporta TTF/OTF/WOFF, mas a fonte local de interface é WOFF2: obter somente um formato compatível da mesma Manrope já aprovada, com origem/licença/hashes documentados. Sem nova família ou dependência.
4. Reconfirmar auditorias de runtime e desenvolvimento, árvore de peers, arquivos rastreados/segredos evidentes e proveniência dos assets exibidos. Não declarar pentest ou permissão de marca/fotografia sem evidência. A consulta pública do avatar não implica licença adicional da arte.
5. Preparar checklist de release/rollback concreto. H03, formato, direitos Ateliê, fotos/contextos, aparência do favicon em aba e provas físicas/INP continuam explícitos até confirmação. Há pergunta assíncrona sobre a permissão do Ateliê; demais verificações podem avançar independentemente.
6. Validar build/strict/lint/unitários e E2E de SEO/ícones nos três perfis e motores, além de inspeção da OG 1200×630. Não repetir a suíte de movimento sem mudança nessa superfície. Revisar diff, registrar SHAs, evidências, decisões e limites; commits locais atômicos com staging explícito.

## Constatações de entrada

Auditorias atuais de runtime e completa: zero vulnerabilidades. Configuração existente já exige origem HTTPS para indexação e bloqueia preview mesmo herdando true. Reutilizar essa lógica; não adicionar configurações ou serviços especulativos. Vercel mantém deploy Git automático bloqueado para main/redesign.

O browser de produção local confirmou a OG legada. Consultas pelo navegador de pesquisa ao site público e à API GitHub falharam; tentar HTTP público direto e registrar a limitação se persistir. Não presumir estado de produção a partir do checkout local.

## Resultado para revisão

Plano `ebaad99`, fonte `3b99eba`; entrega/provas em [PHASE_I_REVIEW](PHASE_I_REVIEW.md), próximos gates em [RELEASE_CHECKLIST](RELEASE_CHECKLIST.md). SEO/assets18/18 nos três perfis/motores, build/strict/lint/nove unitários PASS, auditorias zero. Avatar e origem pública responderam via HTTP direto; isto não verifica conta ou SHA na Vercel. A pergunta de permissão Ateliê foi respondida: “Confirmo que tenho permissão para esse uso”, resolvendo essa pendência específica. OG inspecionada com fontes locais e proveniência; build noindex restaurado e quatro arquivos anteriores intactos. H03, formato histórico e provas humanas/físicas não foram dispensados. Sem push/deploy; I preparada localmente para revisão, sem liberação de release.
