# persistence

Disposition: **ship** — revisão independente da Fase E, fonte `75ba951`, em 2026-10-13. O parecer aprova o acabamento da saudação e sua passagem ao hero para o gate do usuário; não autoriza F–I, push ou deploy.

A implementação mantém os quatro traços originais do estudo B, a composição C/D e o conteúdo factual existente. Conferidos AGENTS, CODEX, PRODUCT, PRD, PHASE_E_PLAN, MOTION_SPEC, REFERENCE_ANALYSIS, o protótipo `design-prototype/states.html`, o piso de qualidade e o contrato de fechamento Impeccable. Nenhuma imagem gerada ou reprodução do trabalho da referência foi introduzida. A leitura de PRODUCT/PRD ainda contém estado histórico D/E; a documentação de encerramento deve refletir o gate vigente sem declarar aprovação do usuário antecipadamente.

# fidelity

A sequência preserva o comportamento observável de R3: traço claro pequeno no centro de fundo quase preto, escrita progressiva, palavra completa, redução de intensidade e camada que sobe, expondo a cena de baixo para cima. O desenho de “olá” corresponde aos caminhos aprovados em B. A adaptação de idioma e os tempos mais curtos estão declarados; não se trata de reprodução temporal exata de “hello” nem de indicador de carregamento.

Abri individualmente as 20 capturas obrigatórias: `intro-{320,375,768,1440,1920}-{900,1250,1950}.jpg` e os cinco instantes adicionais de 1440px, 32/250/550/1100/1500ms. Também inspecionei `controlled-sequence.jpg`, `recorded-sequence-1440.jpg`, `recorded-sequence-375.jpg`, as cinco pranchas `states-{width}.jpg` e `../reference-video-audit/r3-intro.jpg`. Todos os arquivos mostram o estado anunciado. Preto e conteúdo parcial nos instantes iniciais/intermediários são estados intencionais, não capturas inválidas. Os estados finais recuperam nome, posicionamento, ações e navegação; não há recorte persistente ou sobreposição residual da intro nos cinco tamanhos.

A saudação continua centrada e contida de 320 a 1920px. “Pular intro” permanece reconhecível, com alvo de 44px e afastamento de borda; durante a retirada mobile ele pode passar sobre conteúdo abaixo do hero por um breve intervalo, mas continua sendo um controle de cancelamento e desaparece no encerramento. Não há justificativa material para redesenhar a geometria aprovada por causa desse estado transitório.

# ceiling

O alcance é E: saudação, retirada e integração com a entrada D. O gesto autoral existe em sequência real e controlada; não foi reduzido a um fade da palavra inteira. A economia de elementos concentra a atenção no traço e devolve rapidamente o visitante ao conteúdo. O SVG é linework animado especificável, não ilustração substituta: corresponde à exceção geométrica do piso de qualidade e à autoridade explícita do estudo B.

A inspeção do código confirma camada SSR `hidden`/`aria-hidden`, `pointer-events: none`, instalação de cancelamento antes da abertura, reduced motion defensivo, watchdog de 2200ms e limpeza GSAP. `results.json` registra 20 estados sem overflow ou pageerror e zero violações axe nos cinco estados finais. Os 208 passes E2E em duas rodadas disjuntas e cinco skips preexistentes foram informados pelo implementador; não executei novamente esses testes. Lighthouse e revisão final da documentação ficam no fechamento conduzido pelo responsável principal.

Limites: esta revisão usa arquivos de captura e pranchas de frames das gravações, sem navegação própria ou reprodução contínua dos WebM. Ela sustenta ordem, geometria e estados amostrados; não certifica suavidade em todo hardware, acessibilidade completa, desempenho de campo ou equivalência pixel a pixel com R3. O detector fornecido contém 19 achados de superfícies anteriores fora da intro; eles não foram reclassificados como defeitos de E nem corrigidos fora de escopo.

# material_fixes

Nenhuma correção material exigida no escopo visual e de integração examinado. Não há pedido de recaptura: a matriz entregue permite distinguir escrita, pausa, retirada e estado final. O parecer não substitui os checks técnicos finais e o gate explícito do usuário.

# keep

- Preservar os caminhos originais de “olá”, seu tamanho contido e a pausa curta.
- Preservar a retirada de baixo para cima e a sobreposição temporal com D, sem adicionar uma segunda espera.
- Preservar cancelamento por interação/foco, fallback estático, reduced motion e ausência de bloqueio de scroll.
- Manter separadas as evidências de relógio controlado, frames de gravação real e testes automatizados.
- Manter C/D e as superfícies futuras sob seus próprios gates; o parecer é **ship** somente para o acabamento de E avaliado aqui.
