# Fase D — escopo e invariantes

Autorizada pelo “Continue” em resposta ao pedido de aprovação de C e autorização de D. Baseline limpo `e63bb7d`, branch redesign/cinematic-portfolio. Somente hero/composição/entrada; E–I, push e deploy exigem seus gates.

## Fonte e decisão

R2 real: 2.mp4, 2,6–4,8s; pranchas já verificadas em REFERENCE_ANALYSIS. Arco largo inicialmente difuso define a borda; título entra depois, seguido de apoio/CTA. Protótipo B aprovado em docs/design-prototype/index.html/style.css define Manrope, nome central em duas linhas, arco SVG amplo e negativo acima da luz. Reusar essas decisões; não adicionar WebGL ou biblioteca.

Reconstrução justificada em REDESIGN_AUDIT: o caderno orbital e hero dividido não atendem R2. Substituir somente essa composição; dados, casos, navbar C, SEO, scroll/reveals existentes e controles/fallbacks permanecem. Screenshot/narrativa avançada de projetos e transição hero→RoboSense serão F; não implementar pin/scrub agora.

## Movimento e responsabilidade

Momento principal: arco se define enquanto as duas linhas do nome saem de máscaras locais; posição, descrição e ações entram coordenadas. Luz usa blur estático em duas camadas e borda SVG, nunca filtro full-screen animado. GSAP existente controla transform/opacity e stroke-width da borda; Motion permanece dono da ilha C.

Entrada proposta total1s: arco0–800ms, título120–860ms, posição400–750ms, descrição500–900ms, CTA640–1000ms, fechamento editorial600–1000ms. São timings autorais fundamentados na ordem R2, sem alegar easing original conhecido. A saudação/loading E não será criada.

Reusar HomeMotion: sessão, import dinâmico, botão pular, limite2,2s, cancelamento por interação/foco/hash/reduced/pagehide e cleanup. SSR e no-JS devem mostrar título/CTAs completos. Sem esconder texto por CSS até JS; somente a timeline melhora a cena. Header conserva espaço no fluxo para evitar salto de hidratação.

## Alcance do diff

- Home substitui o markup do caderno por CinematicHero, Server Component. Textos vêm de profile; nome dividido em duas linhas sem duplicar o h1 acessível. CTAs e IDs mantidos.
- Fonte local existente passa a um módulo compartilhado por hero/nav, sem downloads/dependências novos.
- CSS somente hero e fundo/enquadramento do header da home; estilos compartilhados de casos/erro/404 permanecem. Clipe de decoração local, sem esconder overflow do documento.
- home-sequence troca coreografia; HomeMotion/home-reveals continuam responsáveis por cancelamento e scroll já existentes.
- Testes de motion/cases atualizam seletores removidos; responsividade troca a prova da órbita pela contenção da luz. Novos checks cobrem hierarquia, geometria, sequência e cancelamento da cena.

## Prova e gate

D01–D03 em VISUAL_ACCEPTANCE_CRITERIA: capturas320/375/768/1440/1920, entrada gravada e frames antes/durante/depois; comparação R2/B, teclado, reduced em execução, no-JS, falha/import lento, zoom e regressão C/cases. Formato/lint/strict/build, testes pertinentes e observação de desempenho real. Refinar defeitos, commits atômicos, revisão independente e documentação. Ao encerrar D, pedir autorização de E; não avançar automaticamente.
