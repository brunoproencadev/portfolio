# Design system

Tokens: fundo #101311, painel #191e1a, texto #f0f2e9, secundário #a8b2a8, acento #c2f970, borda #354036.
Fontes: sans editorial local/sistema; mono para índices, tecnologias e legendas. Sem fonte externa bloqueante.
Espaçamento: 4/8/12/16/24/32/48/64/96px. Container 1280px; padding fluido 20–64px; grid 12 colunas conceitual, uma coluna mobile. Breakpoints 600/900px.
Componentes: capsule nav, botão/link, índice de seção, cartão de projeto, diagrama técnico, case section, footer. Foco 2px acento com offset; alvos ≥44px; conteúdo essencial independente de hover.
Motion: CSS 180ms para feedback; Motion 280ms para menu; GSAP hero/reveal 600–900ms, stagger ≤100ms. Intro ≤2,2s, sem progresso fictício. Somente transform/opacity; reduced motion remove sequências e scroll suave.
