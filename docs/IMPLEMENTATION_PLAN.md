# Plano e gates

Regra: Plan → Implement → Validate → Review → Commit → Document → Continue. Cada fase depende de confirmação explícita; Fase 4 autorizada em 2026-10-10, após envio dos commits anteriores ao GitHub. Fase 5 ainda não autorizada.

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

## Incrementos da Fase 4 autorizada

1. Compor layout e dados tipados a partir de CONTENT; tokens existentes; hero com nome/posicionamento/CTA.
2. Implementar cápsula como disclosure acessível e estado contextual; fallback de navegação sem JS.
3. Adicionar galeria, sobre, competências e contato/footer com destinos existentes.
4. Rever hierarquia/tamanhos/teclado/imagens em quatro larguras e reduced motion. Finalizar com documentação/commits e aguardar Fase 5.

A Fase 4 pode usar transição de estado simples do menu. Intro e coreografia cinematográfica pertencem à Fase 5. Não criar case vazio nem CTA “ver case” antes da Fase 6.
Cada incremento tem staging explícito, gate pertinente e commit próprio; não acumular uma fase inteira em um commit. Sem reescrever os commits iniciais para simular uma granularidade que não existiu.
