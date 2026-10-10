# Auditoria das referências — 2026-10-09

Método: Playwright Chromium 156, páginas públicas, desktop 1440x900 e mobile 375x812. Capturas após DOMContentLoaded e após espera de 2,5s; C também após 10s. Abertura da cápsula A por clique e Escape observado após 600ms. JSONs registram status HTTP, headings/fontes computadas e dimensões. Observação amostral, não avaliação integral nem benchmark.

| Referência                                                                 | Observado                                                                                                                                                                                                                                                                      | Decisão autoral                                                                                                                                                                         |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [A](https://personal-site-kit-v2.21st.app/)                                | HTTP 200; cápsula central clara com avatar/nome; expande para painel de seções/tema. Menu mobile se mantém dentro da tela. Desktop: nome serif Newsreader 24px e corpo Inter; mobile nome 21px. Escape recolheu a cápsula; após clique/Escape o foco observado estava no body. | Manter continuidade cápsula→painel; trocar por identidade do caderno, links semânticos e foco de retorno explícito. Não adicionar tema/command palette só porque existem na referência. |
| [B](https://t3code-cinematic-dark-saas-landing-page-template-v2.21st.app/) | HTTP 200; fundo preto, título Syne 80px desktop/30px mobile, arco roxo luminoso muito dominante e carrossel de depoimentos. CTA em linha no desktop, empilhado mobile.                                                                                                         | Usar hierarquia e respiro, sem arco, estrelas, depoimentos ou “download”. Acento verde restrito e foco nos projetos.                                                                    |
| [C](https://www.syahrilarfianalmazril.my.id/)                              | HTTP 200; entrada preta; mobile ainda mostrava escrita “hel” na captura de 2,5s. Após 10s, hero com palavras enormes e ícones. Desktop headings computados em 158,4px, mobile 48px; quebra SOFT/WARE e EN/GINEER muito fragmentada.                                            | Entrada nominal curta com limite próprio; preservar nome/palavras inteiras no mobile. Adaptar assimetria e escala, sem inferir senioridade equivalente.                                 |

## Evidência visual revisada

- A: a-desktop.png, a-mobile.png, a-desktop-expanded.png, a-mobile-expanded.png, a-mobile-escape.png e a-desktop-scroll.png.
- B: b-desktop.png, b-mobile.png e b-desktop-scroll.png.
- C: c-desktop-entry.png, c-mobile.png, c-desktop-settled.png e c-mobile-settled.png.
- Dados: reference-audit/observations.json e followup.json. Imagens são referência documental; não serão servidas como assets do portfólio.

## Limites

A não foi auditada com leitor de tela; a observação de foco após clique não prova todos os fluxos de teclado.
Em B, window.scrollBy e mouse.wheel não deslocaram window.scrollY (0, documento de 3420px). Isso não comprova a causa: pode haver contêiner interno/controle de scroll. Não afirmar parallax ou qualidade de scroll com base nessas capturas.
C foi amostrada em instantes, sem medição exata de duração da intro; o intervalo até 10s não é um tempo de carregamento medido.
Nenhuma pontuação Lighthouse, FPS ou INP foi medida nessas referências. A indisponibilidade anterior do IAB foi superada com Chromium de testes; preservar o histórico da limitação, não tratá-la como bloqueio atual.
