# Plano e gates

Regra: Plan → Implement → Validate → Review → Commit → Document → Continue. Cada fase depende de confirmação explícita; Fases 4–6 concluídas em 2026-10-10. Fase 7 autorizada em 2026-10-10 e concluída em 2026-10-11, após envio dos commits anteriores até c8878a6. Fase 8 aguarda seu próprio gate; commits da Fase 7 permanecem locais.

| Fase          | Entrega                                                     | Gate de saída                                                                             |
| ------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 0             | Git/ignores/instruções, raiz correta                        | status revisado, remoto conferido, commit local sem segredos                              |
| 1             | PRD, fontes e conteúdo-base                                 | fatos mapeados a fontes; lacunas identificadas; sem experiência inventada                 |
| 2             | Marca, referências e design system                          | capturas observadas, estados/foco/responsividade especificados, contraste medido          |
| 3             | Fundação Next/strict/ferramentas                            | instalação, peers, typegen, lint, testes e build verificáveis                             |
| Auditoria 0–3 | Correções e rastreabilidade                                 | relatório por severidade, commits, provas e riscos residuais; aguardar usuário            |
| 4             | Navbar, hero, sobre, projetos, competências, contato/footer | R01–R04/R06/R07/R09 aplicáveis; screenshots 320/375/768/1440; sem links futuros quebrados |
| 5             | Intro, sequências e microinterações                         | R05/R06/R11; falhas, skip, limpeza e reduced motion                                       |
| 6             | Cases e evidências                                          | R04/R08; rotas/404/erro/links/assets                                                      |
| 7             | QA e otimização                                             | R07/R10/R11; Lighthouse real, revisão manual e audit                                      |
| 8             | SEO e preparação de publicação                              | R12; domínio, canonical/OG/sitemap, retirada aprovada de noindex, checklist               |

## Incrementos concluídos da Fase 4

1. Compor layout e dados tipados a partir de CONTENT; tokens existentes; hero com nome/posicionamento/CTA.
2. Implementar cápsula como disclosure acessível e estado contextual; fallback de navegação sem JS.
3. Adicionar galeria, sobre, competências e contato/footer com destinos existentes.
4. Rever hierarquia/tamanhos/teclado/imagens em quatro larguras e reduced motion. Finalizar com documentação/commits e aguardar Fase 5.

A Fase 4 pode usar transição de estado simples do menu. Intro e coreografia cinematográfica pertencem à Fase 5. Não criar case vazio nem CTA “ver case” antes da Fase 6.
Cada incremento tem staging explícito, gate pertinente e commit próprio; não acumular uma fase inteira em um commit. Sem reescrever os commits iniciais para simular uma granularidade que não existiu.

## Incrementos concluídos da Fase 5

1. Intro nominal/diagrama pulável, timeline de 1,2s e timeout externo 2,2s; storage opcional, import cancelável e conteúdo SSR disponível.
2. Reveals locais GSAP/ScrollTrigger, entrada CSS da cápsula e cancelamento imediato por preferência/foco/saída; Motion dispensado do bundle por suficiência do CSS.
3. Regressões de falha/import atrasado/teclado/reduced motion e revisão de frames; 33 E2E e 3 unitários, gates e commits locais documentados.

## Incrementos concluídos da Fase 6

1. Cases estáticos, dados/fontes por SHA e diagramas autorais acessíveis; links na home e 404 para slugs desconhecidos/nomes herdados.
2. Recuperação de erro com foco, nova tentativa e retorno; falha de conteúdo RSC injetada somente nos testes, sem endpoint de QA na aplicação.
3. Fontes reconferidas, revisão editorial/visual, 50/50 E2E e 5/5 unitários, tipos/lint/formato/build e registros de assets/commits atualizados. Desmontagem da home e não repetição da intro entre rotas comprovadas.

## Incrementos concluídos da Fase 7

1. Instalação pelo lockfile, peers completos do lint, reauditoria runtime/desenvolvimento e revisão de links/fontes.
2. Chromium/Firefox/WebKit; correção de Escape após clique e do nome acessível do monograma. 148 E2E e cinco unitários aprovados; cinco exclusões E2E e riscos de dependências documentados.
3. Doze medições Lighthouse finais (três por rota), medianas de desempenho 99–100, LCP ≤2,09s e CLS ≤0,035. Sem requisições de imagens/fontes/mídia externas; revisão visual, documentação e commits locais. Prova detalhada em QA_PHASE7.

Fase 8 concluída em 2026-10-11: preparação de SEO/assets e publicação autorizada na Vercel. https://brunoproencasilva.vercel.app confirmado; produção READY em 0272dea, HTTPS/cabeçalhos/rotas/metadata/assets/sitemap verificados (LAUNCH). Previews permanecem noindex; compartilhamento real e métricas de campo continuam sem comprovação. Fotos/vídeos adicionais e novas fases exigem aprovação; nenhuma nova fase iniciada.
