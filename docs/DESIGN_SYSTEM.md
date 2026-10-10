# Design system — contrato para implementação

Fonte dos tokens implementados: src/styles/globals.css. Componentes e composição continuam planejados para Fase 4.

## Cor e contraste

| Papel      | Token/valor              | Uso e contraste medido                                       |
| ---------- | ------------------------ | ------------------------------------------------------------ |
| Fundo      | --background #101311     | Superfície principal                                         |
| Painel     | --surface #191e1a        | Cápsula/cards                                                |
| Texto      | --foreground #f0f2e9     | 16,54:1 sobre fundo                                          |
| Secundário | --muted #a8b2a8          | 8,55:1 sobre fundo; 7,73:1 sobre painel                      |
| Acento     | --accent #c2f970         | Texto escuro sobre acento 15,20:1; foco sobre painel 13,75:1 |
| Separador  | --divider #354036        | 1,56:1 sobre painel: apenas decoração                        |
| Controle   | --control-border #788578 | 4,37:1 sobre painel: limites essenciais                      |

Razões calculadas pela luminância relativa sRGB/WCAG; ver reference-audit/followup.json. Alvos: texto normal ≥4,5:1; texto grande ≥3:1; partes essenciais/foco ≥3:1. Não reduzir opacidade desses pares sem medir novamente. Estado ativo inclui texto/forma, não só cor.

## Tipografia

Sistema local: Arial/Helvetica para corpo e display; Georgia/Times para acento editorial; Cascadia Code/Consolas para código/legendas. Sem dependência de download. A escolha de fonte externa só deverá ocorrer se revisão visual demonstrar benefício e licença/asset forem confirmados.
Planejado: corpo 16–18px, line-height 1,6 e largura 60–70ch; legenda ≥12px, preferir 14px; h2 clamp(2rem,4vw,3.5rem); hero clamp(2.75rem,7vw,7rem), line-height 1,05 e tracking até -0,04em. Ajustar por quebra real em 320px, nunca cortar o nome nem separar palavras para forçar um efeito. Um h1 por página; h2 para seções, h3 nos projetos.

## Grid e espaço

Unidade 4px; escala 4/8/12/16/24/32/48/64/96. Container máximo 1280px, gutter 20px mobile/32px tablet/64px desktop. Colunas conceituais 12 no desktop; leitura em uma coluna no mobile.
Breakpoints sm=600px e lg=900px (37,5rem/56,25rem). Abaixo de 600: cartões empilhados e menu compacto; 600–899: grid de dois itens quando couber sem texto comprimido; ≥900: composição editorial assimétrica.
Espaço de seção 64–96px; alvos interativos pelo menos 44x44px. Navbar considera safe-area e scroll-margin-top para destinos. Não usar overflow-x:hidden para esconder erro de largura.

## Contrato da cápsula — planejado, não implementado

Disclosure não modal: nav com nome acessível, botão nativo, aria-expanded e aria-controls; links a #inicio/#projetos/#sobre/#competencias/#contato. Sem role menu/menuitem para navegação normal.
Fechada: marca curta, seção atual e botão. Aberta: mesmos elementos mais links completos. Largura máxima min(28rem, calc(100vw - 2*gutter)); altura do painel limitada ao viewport com rolagem interna quando necessário. Conteúdo essencial nunca depende de hover.
Enter/Espaço acionam o botão; Tab segue ordem DOM; Escape fecha e retorna foco ao botão. Clique fora ou foco saindo fecham sem roubar foco do novo destino. Seleção de link fecha e move foco para o título da seção (tabindex -1); não devolver ao botão nessa ação.
Sem JS: links continuam visíveis/utilizáveis; não deixar um botão morto como única navegação. Seção ativa usa IntersectionObserver com desempate determinístico por posição; aria-current=location no link; estado não provoca anúncio de live region a cada scroll.
Menu normal suporta redimensionamento, orientação e reduced motion. Não prender foco nem scroll da página.

## Demais componentes planejados

- Link/botão: texto explícito, hover de cor/linha, focus-visible 2px com offset 4px; active com feedback discreto. Sem cursor customizado obrigatório.
- Card: índice, categoria, título, síntese, stack e estado sempre legíveis. Link de case separado do link GitHub, sem links aninhados. Enquanto case não existir, usar somente destino existente.
- Diagrama/imagem: proporção reservada, alt significativo ou decoração aria-hidden; legenda diferencia conceito/evidência.
- Contato: links reais GitHub/LinkedIn/mailto; sem formulário.
- Erro/404: mensagem objetiva e retorno à home; não simular carregamento infinito.

## Movimento e fallback

CSS --motion-fast 180ms e --motion-state 280ms; --ease-out cubic-bezier(0.22,1,0.36,1). Motion: painel/estado do menu, usando camada interna para opacity/transform e dimensão reservada quando possível. GSAP: hero/reveal 600–900ms, stagger ≤100ms, deslocamento discreto 16–32px; parallax somente se sustentado pela revisão visual.
Intro alvo 1,2s, timeout de segurança 2,2s independente da timeline; texto real, sem porcentagem/progresso fictício. Pular por botão/teclado; nenhum foco ou scroll retido; não repetir na navegação entre cases. Storage negado não impede conclusão.
Reduced motion: tokens CSS zerados; componentes devem usar matchMedia/useReducedMotion para não iniciar GSAP e cancelar sequências ativas. Nenhum CSS global deve esconder conteúdo até hidratação. Blur grande/efeito luminoso e animação de width/height contínua não são padrão.
