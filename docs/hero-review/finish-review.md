disposition: ship

Escopo: revisão independente da Fase D local em 2026-10-12; code-led, com direção B e R2 fornecidos. Sem comp gerada aprovada ou QUALITY BAR separada; o protótipo B e os frames reais são as autoridades recebidas. Revisão por arquivos e capturas, sem navegador próprio ou reprodução direta dos WebM.

## persistence

Pass no contrato visual delimitado por AGENTS.md e PHASE_D_PLAN.md. PRODUCT.md, DESIGN.md, PRD, COMPONENT_SPEC e MOTION_SPEC existem; B fixa a direção, portanto esta implementação não reabre escolha de conceito nem exige comp/seed novo. DESIGN.md e PRODUCT.md ainda descrevem a aplicação restrita a C: drift de estado para o documentador atualizar no encerramento D, não autorização para migrar outras superfícies.

Todas as capturas obrigatórias foram abertas: hero-320/375/768/1440/1920.jpg, island-open-375/1440.jpg, entry-32/150/350/650/1000/1250.jpg e recorded-sequence-1440/375.jpg. Mostram os tamanhos/estados indicados. Ausência de texto e máscaras parciais nas primeiras imagens são a entrada deliberada; não há captura inválida que exija recapture. results.json identifica Chromium 156.0.8078.4 e working tree D, com scrollY zero, overflow false, fonte Manrope, errors e axe vazios nas cinco larguras. Não vincula sozinho a evidência a um SHA final.

## fidelity

| Elemento | Estado | Evidência e limite |
| --- | --- | --- |
| TYPE | match | Manrope local, peso 500, máximo 96px e tracking -0.04em reproduzem o caráter aberto e nome em duas linhas de B; nome completo continua um h1. Capturas 320–1920 legíveis, sem corte no estado final. |
| MATERIAL | match | Três traços SVG com halo violeta e borda branca realizam a geometria luminosa aprovada; não simulam fotografia nem inventam mídia de projeto. O halo é decoração, não uma sombra de elevação. |
| GROUND | match | Campo quase preto #08090d e texto #f5f3ff, coerentes com B e CSS recebido. Comparação visual dos JPGs confirma a família tonal; não foi medido pixel-diff. |
| Composição e arco | match | Em 1440px, nome central, apoio e CTA ficam acima da curva, com negativo amplo e fechamento editorial inferior, como home-1440.jpg de B. Luz não atravessa texto no estado final. |
| Conteúdo | adaptation | Introdução e fechamento usam profile em vez da copy ilustrativa do protótipo, conforme PHASE_D_PLAN e obrigação de preservar fatos. Nenhuma experiência, métrica ou disponibilidade nova. |
| Responsividade | adaptation | Ações empilham em 320px e permanecem lado a lado em 375px; nome e halo preservam leitura. Reflow é exigido por acessibilidade e PHASE_D_PLAN, sem reduzir alvos abaixo dos 48px definidos no CSS. |
| Entrada R2 | adaptation | As pranchas reais R2 mostram arco difuso que se define, depois título e apoios. Sequências D mantêm essa ordem, comprimida na timeline autoral de 1s, com máscaras de nome previstas em MOTION_SPEC. D tem borda inicial mais discreta e fina que a massa branca de R2; adaptação de B, não reprodução literal da duração/material de cada frame R2. |
| Ilha C | match | Estados abertos 375/1440 preservam superfície única, centro/topo, avatar, cinco destinos e leitura. Sobreposição temporária ao nome quando aberta é o disclosure aprovado, não colisão persistente. |
| Continuidade para projetos | adaptation | Fundo, título e cards antigos ainda aparecem abaixo do hero, diferentes do protótipo B. PHASE_D_PLAN exclui mídia/narrativa F; não são defeito material de D nem atestado de fidelidade da home inteira. |

Amostras RAF reais: 38 em 1440px e 62 em 375px, sem overflow registrado; última amostra com cleanup/skip oculto em cerca de 1293ms e 1263ms desde a origem da medição. Esses tempos incluem preparação; não devem ser chamados de duração de 1s desde navegação. Frames controlados comprovam os marcos da coreografia, enquanto as pranchas de gravação confirmam progressão real. Esta evidência não sustenta promessa de 60fps em dispositivos reais.

## ceiling

Reached para a composição/entrada aprovada de D. O arco ocupa a largura, estabelece profundidade e conduz a atenção para identidade e ação. A assinatura visual é preservada sem elementos novos fora do gate.

Craft: contraste calculado a partir dos tokens CSS é 18.14:1 para texto principal/fundo, 9.91:1 para apoio/fundo, 16.20:1 para CTA principal e 8.39:1 no hover violeta. São pares nominais, não certificação WCAG da página. Título até 6rem, espaçamento hierárquico, CTA de 48px, foco violeta de 3px, SVG geométrico e default SSR visível têm suporte no código inspecionado. Máscaras locais e context.revert preservam cleanup; não há filtro full-screen animado.

Detector recebido: side-tab e grade pertencem a áreas legadas fora de D; desvios de font-size em hero-description/hero-position correspondem aos tamanhos 16/18px aprovados, não a um defeito visível. Eyebrows, numeração e desenho dos projetos vistos abaixo do hero são legado explicitamente preservado para F; removê-los aqui violaria o escopo. Easing exato de R2, hardware mobile, teclado/reduced/no-JS em execução não foram reexecutados por este revisor. Resultados de testes comunicados pelo executor não substituem essas observações.

## material_fixes

Nenhum material fix no escopo D. Não ampliar para saudação E, mídia/scroll F nem publicar. Próximas ações do executor: concluir sincronização documental de D, registrar SHA das evidências/commits e relatar com precisão o rerun focal após as três falhas iniciais de sincronização RAF; esta revisão visual não transforma a execução ampla anterior em verde.

## keep

Preservar nome real em duas linhas, Manrope, negativo acima do arco, luz violeta com borda fina, texto fora da faixa branca, links nativos, entrada cancelável e limites explícitos dos gates E/F.
