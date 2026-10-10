# Design system — contrato para implementação

Fonte dos tokens/layout implementados: src/styles/globals.css. Home/cápsula implementadas na Fase 4; coreografia/intro na Fase 5. Cases seguem na Fase 6.

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
Implementado: corpo 16px, line-height 1,6 e texto curto em colunas; legendas 12–14px; h2 clamp(2rem,4vw,3.5rem); nome do hero clamp(2.75rem,7.3vw,6.5rem), line-height 1,02 e tracking -0,045em, conforme capturas 320–1440. Nome com palavras inteiras e quebras naturais, sem recorte. Um h1; h2 para seções, h3 nos projetos.

## Grid e espaço

Unidade 4px; escala 4/8/12/16/24/32/48/64/96. Container máximo 1280px, gutter 20px mobile/32px tablet/64px desktop. Colunas conceituais 12 no desktop; leitura em uma coluna no mobile.
Breakpoints sm=600px e lg=900px (37,5rem/56,25rem). Abaixo de 600: cartões empilhados e menu compacto; 600–899: grid de dois itens quando couber sem texto comprimido; ≥900: composição editorial assimétrica.
Espaço de seção 64–96px; alvos interativos pelo menos 44x44px. Navbar considera safe-area e scroll-margin-top para destinos. Não usar overflow-x:hidden para esconder erro de largura.

## Contrato da cápsula — implementado na Fase 4

Disclosure não modal: nav com nome acessível, botão nativo, aria-expanded e aria-controls; links a #inicio/#projetos/#sobre/#competencias/#contato. Sem role menu/menuitem para navegação normal.
Fechada: marca curta, seção atual e botão. Aberta: mesmos elementos mais links completos. Largura máxima min(28rem, calc(100vw - 2*gutter)); altura do painel limitada ao viewport com rolagem interna quando necessário. Conteúdo essencial nunca depende de hover.
Enter/Espaço acionam o botão; Tab segue ordem DOM; Escape fecha e retorna foco ao botão. Clique fora ou foco saindo fecham sem roubar foco do novo destino. Seleção de link fecha e move foco para o título da seção (tabindex -1); não devolver ao botão nessa ação.
Sem JS: links continuam visíveis/utilizáveis; botão só aparece após hidratação, via useSyncExternalStore. Seção ativa usa IntersectionObserver dos limites das seções: última seção em ordem DOM cujo início chegou à faixa de leitura até 40% da altura. Observer é recriado no resize e desconectado no cleanup; hash também atualiza contexto. aria-current=location e texto “Atual”/marca lateral distinguem localização, sem live region a cada scroll.
Menu suporta redimensionamento, orientação e reduced motion; link focado é trazido para a área visível após resize. Não prender foco nem scroll da página. Fase 5 adiciona entrada CSS de 8px/280ms aos links; ao focá-los a animação cessa, e hidden fecha imediatamente. Sem animação de altura, atraso de saída ou import de Motion na cápsula.

## Demais componentes e limites

- Link/botão: texto explícito, hover de cor/linha, focus-visible 2px com offset 4px; active com feedback discreto. Sem cursor customizado obrigatório.
- Card: índice, categoria, título, síntese, stack e estado sempre legíveis. Link de case separado do link GitHub, sem links aninhados. Enquanto case não existir, usar somente destino existente.
- Diagrama/imagem: proporção reservada, alt significativo ou decoração aria-hidden; legenda diferencia conceito/evidência.
- Contato: links reais GitHub/LinkedIn/mailto; sem formulário.
- Erro/404: mensagem objetiva e retorno à home previstos na Fase 6; ainda não são componentes autorais.

## Movimento e fallback

CSS --motion-fast 180ms e --motion-state 280ms; --ease-out cubic-bezier(0.22,1,0.36,1). CSS atende o feedback simples da cápsula; Motion permanece instalado, dispensado do bundle. GSAP: identificação/diagrama com 16px, trechos de 600–900ms e stagger de 100ms; reveals com 24px/700ms, uma vez. Sem opacidade de texto. Anéis permanecem estáticos para preservar a contenção em todos os frames. Sem parallax, scrub/pin ou loops: revisão não mostrou necessidade.
Intro nominal/diagrama com alvo 1,2s e timeout de segurança 2,2s independente da timeline/import; texto real, sem porcentagem/progresso fictício. Botão Pular intro integrado ao hero; Enter/Espaço e Escape funcionam. Nenhum foco ou scroll retido; foco só retorna ao h1 se estava no botão removido. Hash/scroll inicial evitam a intro; gesto de scroll, foco no conteúdo, hash, pagehide ou mudança de preferência a cancelam. sessionStorage opcional e guarda em memória por documento evitam repetição; storage negado não impede conclusão. Fluxo entre cases será testado quando as rotas existirem.
Reduced motion: tokens CSS zerados e matchMedia evitam carregar GSAP/ScrollTrigger inicialmente e revertem sequências ativas. Alterar de volta para no-preference não reinicia a animação na mesma montagem. Nenhum CSS global esconde conteúdo até hidratação; falhas/imports tardios deixam composição estática. Blur grande/efeito luminoso e animação de width/height contínua não são padrão.
