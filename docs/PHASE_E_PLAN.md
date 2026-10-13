# Fase E — saudação e passagem ao hero

Autorização explícita: “Aprovo e autorizo”, em resposta ao gate D/E. Baseline limpo c976322, branch redesign/cinematic-portfolio. Sem push/deploy, F–I não autorizados.

## Referência e composição

R3 real, 3.mp4: escrita 2,1–5,1s, pausa/desaparecimento até6,6s, tela preta recua de baixo para cima6,9–7,2s. Frames antes/durante/depois em reference-video-audit/r3-intro.jpg já extraídos dos originais somente leitura. Reusar “olá” em SVG original de design-prototype/states.html, aprovado B; não é assinatura real. Branco sobre preto, desenho pequeno e central, sem percentuais, afirmações ou espera de rede fictícia.

Momento focal: traço que se escreve → pausa → saudação desaparece → camada sobe revelando arco e nome reais. Desenho0–850ms (quatro traços sequenciais), pausa850–1000ms, saída1000–1450ms. Entrada D começa850ms atrás da camada e termina1850ms, conservando watchdog independente2200ms contado desde elegibilidade. A sobreposição evita somar1450+1000ms e exceder a proteção. Tempos autorais mais curtos que R3, documentar essa adaptação.

## Invariantes e alcance

HomeMotion já possui elegibilidade, import, skip, sessão, cleanup e watchdog: estender esse dono, sem segundo gerenciador/loading state global. Camada SSR hidden/aria-hidden, só exibida após import e instalação de cancelamento. HTML/CTAs continuam no DOM e acessíveis; camada decorativa pointer-events none, sem inert do conteúdo/body lock. Pular fica acima da camada. Qualquer foco fora de Pular ou ponteiro no conteúdo/navbar encerra a intro imediatamente, além de Escape, scroll/toque/hash/pagehide/reduced. Interação durante import impede abertura tardia. Falha de inicialização/execução deve retirar a camada no watchdog.

GSAP controla somente traços/retirada e a sequência D, com context/revert; Motion permanece na ilha. Sem novas dependências/fontes/mídia externa, sem loops. CSS contém a camada no viewport, safe areas no botão e reduced motion defensivo. Conteúdo no-JS estático. Cleanup sempre esconde a camada, restaura estilos e foco de Pular ao h1 quando necessário; não roubar foco da navegação.

Alcance: HomeMotion movido para irmão do hero dentro de main (a camada fixed precisa sair do stacking context do hero), markup/lifecycle, home-sequence coordenação, CSS intro, testes motion/hero/cases que dependem de timings e nova cobertura da camada. Não reconstruir navbar/hero, alterar dados/rotas/SEO, introduzir pin/mídia F nem favicon G.

## Validação e fechamento

E01–E02: estados escrita/parcial/completa/retirada/hero em320/375/768/1440/1920; vídeo real desktop/mobile e frames controlados, comparação R3/B. Teclado/foco/navbar, cancelamento em cada estágio, toque/wheel/hash/pagehide, reduced inicial/em execução, storage negado, import falho/tardio, watchdog mesmo com timeline parada, reentrada/no-JS. Testes dos callers preservados. Strict/lint/format/unit/build e E2E pertinente; Lighthouse local para verificar impacto da nova intro. Revisão independente, documentação e commits pequenos. Pedir aprovação antes de F.

## Fechamento

E entregue para revisão em PHASE_E_REVIEW.md: fonte75ba951, evidênciasa3d3126, revisão independente ship. Próximo gate: aprovação de E/autorização de F; não avançar automaticamente.
