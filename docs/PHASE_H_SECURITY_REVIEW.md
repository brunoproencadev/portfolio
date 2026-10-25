# Correção de segurança e continuidade H — 25/10/2026

Autorização: “Faça o que for necessário para solucionar. Em seguida pode dar continuidade”. Plano `ae86b92`, correção `4ed77f9`, base anterior `9f0f064`, raiz `D:\projects\portifolio`, branch `redesign/cinematic-portfolio`. A fase H segue aberta; esta entrega não autoriza I ou publicação.

## Segurança corrigida localmente

Next e eslint-config-next atualizados de 16.4.0 para 16.4.3. Sharp instalado é 0.35.5, versão corrigida para o alerta de imagens. Mantidos React, GSAP, Motion, configurações, rotas, conteúdo e coreografia. Package.json só altera os dois pins Next; lockfile preserva versões reproduzíveis.

A auditoria completa também revelou quatro dependências de desenvolvimento com alertas corrigíveis. Atualizações dentro dos ranges existentes corrigiram Vitest/mocker 4.1.11→4.1.12, fast-uri 3.1.8→3.1.9 e zod 4.6.5→4.6.7, com suas subdependências compatíveis. Nenhuma dependência direta, override ou versão maior foi adicionada. Não foi usado audit fix indiscriminado.

[Auditoria final de runtime](phase-h-security-review/audit-runtime-final.json) e [auditoria completa](phase-h-security-review/audit-all-final.json): **zero vulnerabilidades**. Esse resultado cobre o grafo de dependências consultado; não é uma auditoria de invasão ou confirmação de correção no site publicado. A correção permanece local.

Avisos oficiais: [Image Optimization](https://github.com/advisories/GHSA-2464-fhr4-w9xw), [Server Actions](https://github.com/advisories/GHSA-p3m5-59mp-jv5r) e [use cache](https://github.com/advisories/GHSA-673q-mjm6-r5xr). As condições de exploração diferem: Linux/glibc no primeiro, uso de Server Actions no segundo e Cache Components com retorno específico no terceiro. A busca local não encontrou Server Actions/use cache/habilitação de SVG no otimizador; isso não foi usado para dispensar o patch.

## Instalação reproduzida e manifesto

[npm ci](phase-h-security-review/npm-ci.log), [build final/strict](phase-h-security-review/build-final.log), [lint](phase-h-security-review/lint-ci.log) e [nove unitários](phase-h-security-review/unit-ci.log) passaram após reinstalar pelo lockfile. Os 22 chunks JS/CSS ficaram byte a byte iguais aos usados na suíte E2E; [resultados e comparação](phase-h-security-review/installation.json). npm ls --all saiu com código zero, sem peers inválidos/ausentes, mas listou seis pacotes opcionais WASM como extraneous mesmo após npm ci. O aviso de ESLint 9 fora de suporte permanece; nenhuma migração maior foi necessária para zerar a auditoria.

O [manifesto](phase-h-security-review/manifest.json) usa os bytes UTF-8/LF efetivamente commitados, conferidos contra os blobs Git. O primeiro manifesto, em `4528fdd`, usava CRLF local nos quatro logs de build; `b9bcfd6` corrigiu os hashes em commit separado, preservando o histórico. Uma substituição inicial de texto pelo pipe PowerShell perdeu acentos e não inseriu esta seção; o relatório foi corrigido por script UTF-8, sem alterar provas de runtime.

## Validação e histórico preservado

- Build Next 16.4.3 com strict: PASS. [Log inicial](phase-h-security-review/build-patched.log).
- Lint completo: PASS; nove unitários com Vitest 4.1.12: PASS. [Lint](phase-h-security-review/lint-final.log), [unitários](phase-h-security-review/unit-final.log).
- Suíte E2E completa: **396 PASS, 1 FAIL e 5 SKIP**, 402 casos, Chromium/Firefox/WebKit, dois workers, sem retries. [Resultados e exclusões](phase-h-security-review/e2e.json).
- A falha de reversão em seção desktop Firefox repetiu na primeira confirmação isolada. Uma sonda independente completou os cinco alvos com entrada/saída esperadas; em seguida o teste original passou em três repetições consecutivas, sem alterações ou aumento de timeout. Entre a rodada completa e essa repetição, 397 casos distintos passaram; isso não transforma a rodada completa em execução sem falhas. Origem da intermitência não isolada.
- Cinco skips preservados: três fluxos de Tab WebKit/Windows e dois testes não Chromium de zoom dependente de extensão. Não são aprovações nem prova de Safari físico.
- Formato dos arquivos desta entrega e diff-check: PASS. [Formato global](phase-h-security-review/format-global.log): FAIL nos mesmos 24 arquivos históricos; nenhuma reformatação de evidências antigas foi aplicada.
- As [quatro alterações anteriores](phase-h-security-review/preserved-files.json) foram preservadas byte a byte e permanecem fora dos commits desta continuidade. As provas executam a árvore com essas pendências, não somente HEAD limpo.

A consulta npm inicial no sandbox falhou por rede/cache e foi refeita com acesso ampliado. Uma exportação preliminar de evidências foi disparada durante a reinstalação e não encontrou temporariamente o pacote Next; refeita após a instalação. O primeiro smoke HTTP teve erro de quoting; refeito por script, confirmou HTTP 200, imagem otimizada 200, slug desconhecido 404, noindex e cabeçalhos em [http.json](phase-h-security-review/http.json). Uma verificação documental inicial também falhou pela codificação do pipe PowerShell; executada novamente por arquivo UTF-8. São falhas de ferramenta, não provas de falha do produto.

## Navegador e comparação

Chromium real de produção, desktop 1440×900 e mobile 375×812: home, Sobre, projeto Industry Week, reduced motion em leitura e quatro cases. Foram produzidas 16 capturas, duas comparações geométricas e duas gravações brutas de navegação; nenhum overflow/pageerror nos estados registrados em [browser.json](phase-h-security-review/browser.json). Capturas inspecionadas: [home desktop](phase-h-security-review/1440-home.png), [home mobile](phase-h-security-review/375-home.png), [Sobre](phase-h-security-review/1440-about.png) e [Museu mobile](phase-h-security-review/375-museu-arte-moderna.png). Vídeos e capturas restantes permanecem locais em .audit; vídeos não foram reproduzidos integralmente e não medem FPS. Não há aceite visual humano ou prova de aparelho físico.

## Desempenho e próximo gate

Experimento e critérios em [PHASE_H_SECURITY_CONTINUATION](PHASE_H_SECURITY_CONTINUATION.md). Foram realizadas 21 navegações Lighthouse mobile simuladas, sem builds/testes concorrentes: três por rota na base corrigida, três na home candidata e três no controle restaurado. [Séries, ambiente e configuração](phase-h-security-review/performance.json).

| Estado/rota                    | Performance mediana | LCP mediano | TBT mediano |
| ------------------------------ | ------------------: | ----------: | ----------: |
| Base corrigida — home          |                  77 |      3753ms |     474,5ms |
| Base corrigida — RoboSense     |                  96 |      2583ms |       114ms |
| Base corrigida — Museu         |                  94 |      2513ms |       200ms |
| Base corrigida — Industry Week |                  94 |      2840ms |     109,5ms |
| Base corrigida — Ateliê        |                  91 |      2922ms |       220ms |
| Candidato — home               |                  80 |      3618ms |     394,5ms |
| Controle restaurado — home     |                  84 |      3585ms |       298ms |

O candidato retirou invalidateOnRefresh apenas de revelações com endpoints fixos e passou a medir uma altura por alvo. A pequena diferença inicial não se sustentou: o controle restaurado ficou melhor. **Candidato descartado; nenhuma otimização de movimento conservada.** Todos os builds passaram. Fonte restaurada integralmente; [os 22 chunks](phase-h-security-review/restored-chunks.json) voltaram a coincidir com os testados. Portanto, a suíte completa não foi repetida após rejeitar esse candidato. Os quatro arquivos preexistentes também continuam idênticos.

A home variou bastante mesmo sem mudança de fonte; não é possível atribuir a diferença ao patch Next sem série pareada da versão antiga. O perfil motivou uma hipótese delimitada, não comprovou que invalidar estilos fosse a causa principal do LCP. Próxima investigação de H03: coletar novos traces com amostragem por função e separar variabilidade de CPU/compositor de um custo reproduzível antes de propor outro candidato. Não retirar nem postergar a coreografia aprovada para obter nota.

CLS mediano 0,0389 na home e zero nos cases; acessibilidade/boas práticas 100 nas 21 execuções e SEO 66 pelo noindex deliberado. H03 continua aberta nas cinco rotas. H03 exige LCP mediano≤2500ms/performance≥90, preservando a experiência; TBT não comprova INP.

Fotos/contexto, direitos Ateliê, favicon em aba, Safari/dispositivos físicos, leitor de tela e provas de campo conservam os limites anteriores. A fase I tratará prontidão de produção e depende de autorização própria. Nenhum push, merge ou deploy foi feito.
