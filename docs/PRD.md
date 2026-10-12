# PRD — Bruno Proença Silva

Atualização de precedência2026-10-12: A/B concluídas, B aprovada e C autorizada no gate explícito. C entregue para revisão conforme PHASE_C_REVIEW; D–I exigem confirmação individual em VISUAL_REDESIGN_PLAN. REFERENCE_ANALYSIS/MOTION_SPEC/VISUAL_ACCEPTANCE_CRITERIA substituem decisões visuais incompatíveis do ciclo anterior. Conteúdo factual, rotas, segurança/SEO e fallbacks continuam válidos. O texto abaixo descreve o produto anterior; estado vigente em HANDOFF. Nenhum novo push/deploy autorizado.

Revisão de auditoria: 2026-10-09; home, movimento e cases entregues nas Fases 4–6 em 2026-10-10. QA local da Fase 7 concluído em 2026-10-11, com resultados e limites em QA_PHASE7. Fonte de escopo; mudanças entre fases exigem aprovação. Fase 8 publicada na Vercel em 2026-10-11 por autorização do usuário; domínio/HTTPS/SEO confirmados em LAUNCH. Validações humanas e de campo permanecem limitadas conforme registros.

## 1. Problema e proposta de valor

Um perfil de desenvolvedor em formação precisa demonstrar competência sem depender de senioridade ou números inventados. O portfólio deve tornar legíveis o problema, a decisão técnica e a evidência de cada projeto. Promessa: projetos reais, experimentação documentada e limites explícitos.

## 2. Público e necessidades

| Público                 | Pergunta prioritária               | Resposta do produto                                                      |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------------------ |
| Recrutador              | Quem é Bruno e o que constrói?     | Nome, posicionamento, três trabalhos e contato visíveis                  |
| Desenvolvedor           | Como foi construído?               | Tecnologias usadas, arquitetura, código e decisões                       |
| Professor/pesquisador   | O resultado sustenta a afirmação?  | Fonte, condições de avaliação, limitações e próximos passos              |
| Avaliador universitário | Qual foi o contexto e aprendizado? | Contexto educacional confirmado e síntese técnica, sem inferir matrícula |

## 3. Objetivos e avaliação

- Em uma inspeção da primeira dobra, nome, condição de desenvolvedor em formação, áreas e CTA devem estar legíveis.
- Três projetos priorizados; cada um com repositório e estado explícito. Qualidade de evidência prevalece sobre quantidade.
- Contato em até duas ações a partir da home ou de um case.
- Metas de laboratório: LCP ≤2,5s, CLS ≤0,1; Lighthouse preferencialmente >90 nas quatro categorias. Medir produção local, Chromium, perfil mobile, três execuções e mediana, registrando máquina/versões/throttling. Não usar resultado da página mínima como desempenho final.
- INP ≤200ms é meta de campo: exige interações/telemetria apropriada após publicação. TBT de Lighthouse não equivale a INP.
- Sem rastreadores no MVP. Clareza e navegação serão avaliadas manualmente; não declarar conversão ou compreensão de visitantes sem estudo.

## 4. Jornada e informação

Home: início → projetos selecionados → sobre/processo → competências → contato → footer.
Projetos aparecem antes da biografia longa para permitir avaliação rápida.
Cases: contexto/problema → abordagem/arquitetura → decisões/desafios → evidências → limites/aprendizados → próximos passos → repositório/contato.
Experiência/conquistas específicas só entram se confirmadas; o contexto educacional do Industry Week pode integrar o case, sem criar uma carreira fictícia.

## 5. MVP

Home em português, cápsula de navegação contextual, intro curta pulável, três cases estáticos, competências por evidência, contato por links, footer, 404 própria e tratamento de erro. Metadados por rota, favicon, OG, sitemap/robots/canonical no gate de produção com domínio confirmado. Conteúdo e navegação básica devem continuar disponíveis sem animação ou JavaScript.

Rotas implementadas: /, /projetos/robosense-lab, /projetos/industry-week-senai, /projetos/atelie-ingrid-xavier. Três cases estáticos, links ativos na home e entre cases; slugs desconhecidos retornam 404 autoral. Fontes/limites e diagramas autorais documentados; fotografias externas ainda dependem de autorização/origem.

## 6. Futuro e exclusões

Futuro condicionado a evidência: formação/conquistas, novos cases e tradução humana.
Fora do MVP: login, banco, CMS, backend dedicado, formulário, blog, chatbot, analytics, cópia de interfaces de referência e 3D sem função. GSAP e Motion têm responsabilidades distintas; Anime/React Spring/Lenis não são necessários.

## 7. Requisitos funcionais e não funcionais

| ID  | Requisito verificável                                                                                   | Fase responsável    | Prova esperada                                                              |
| --- | ------------------------------------------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------- |
| R01 | Nome, posicionamento e CTA claros                                                                       | 4                   | Revisão da primeira dobra em 375/1440px                                     |
| R02 | Navegação por links reais; cápsula abre/fecha, Escape retorna foco, saída de foco/clique externo fecham | 4                   | Playwright mouse/teclado e sem JS                                           |
| R03 | Seção ativa indica localização sem depender só de cor; âncoras não ficam sob navbar                     | 4                   | Scroll e URL com hash em desktop/mobile                                     |
| R04 | Projetos com estado, stack usada e fontes; nenhum link interno futuro quebrado                          | 4/6                 | Unitário de dados/URLs e revisão editorial                                  |
| R05 | Intro não bloqueia conteúdo/scroll; duração normal alvo 1,2s, limite de segurança 2,2s; pular funciona  | 5                   | Testar cancelamento, falha de biblioteca, storage negado e navegação direta |
| R06 | Reduced motion imediato, inclusive alteração da preferência em execução                                 | 4/5                 | Playwright e revisão manual, sem suavização/parallax                        |
| R07 | 320/375/768/1440px sem overflow; zoom 200%, toque ≥44px, foco e contraste AA                            | 4/7                 | E2E, axe e inspeção manual; axe não certifica WCAG                          |
| R08 | Cases completos, imagens com origem/alt/dimensões; erro e 404 úteis                                     | 6                   | URLs diretas, slug inválido e falhas de recursos                            |
| R09 | Contato GitHub/LinkedIn/e-mail; footer funcional                                                        | 4                   | URLs permitidas e teclado; não enviar mensagens em testes                   |
| R10 | Build reproduzível, strict, lint, formatação, unitários e E2E                                           | 3 e cada incremento | npm ci + gates; árvore de peers válida                                      |
| R11 | Performance sem loops gratuitos, imagens/fontes otimizadas e cleanup                                    | 5/7                 | Bundle/rede, desmontagem e Lighthouse documentado                           |
| R12 | Preview noindex; produção com SEO e domínio validados, sem segredos                                     | 3/8                 | Metadata/cabeçalhos, audit, links e checklist de lançamento                 |

## 8. Critérios de aceitação e gates

A Fase 3 demonstra somente R10 e parte da infraestrutura R07/R12. Aprovação dessa fase não comprova a UI, todas as preferências de movimento ou performance do produto.
Cada fase encerra com diff revisado, checks pertinentes, commits explícitos e HANDOFF atualizado; a próxima aguarda confirmação do usuário. Falhas/pendências não podem aparecer como concluídas.
Produção exige cases revisados, matriz R01–R12 coberta, build e QA completos; nenhum push/deploy está autorizado por este documento.

## 9. Riscos e dependências

LinkedIn bloqueado; formação e prêmios específicos sem confirmação. E-mail confirmado no README público. Endereço desejado brunoproencasilva.vercel.app, na Vercel; disponibilidade e titularidade não verificadas. Não tratar como domínio confirmado.
A pesquisa de referências é amostral, sem certificação de desempenho/acessibilidade externa. Conteúdo dos projetos deve ser ancorado nas fontes registradas em PROFILE_RESEARCH.
ESLint 9 compatível, mas fora de suporte; cadeia braces com alertas de desenvolvimento sem patch disponível. Reavaliar no gate 7/8. Mudança para ESLint 10 exige suporte dos plugins, não apenas do pacote principal.
