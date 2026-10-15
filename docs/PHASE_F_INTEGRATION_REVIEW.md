# F — passagem aprovada, ferramentas e continuidade da home

2026-10-15. O usuário aprovou a passagem hero→RoboSense (“de resto, essa parte está aprovada”), pediu pop-ups de ferramentas como na referência e revisão do scroll no restante da página. A aprovação libera integrar essa passagem e continuar F; não aprova automaticamente o restante, G–I ou publicação.

## Plano e invariantes

- KEEP: navbar, intro, geometria/ritmo aprovados de hero→RoboSense, imagens/dados reais, links, cases e fallbacks.
- IMPROVE: quatro ferramentas reais do RoboSense aparecem ao redor do frame após a aproximação, em escala/deslocamento curto e sequência; R2 7,1–8,1s. Etiquetas tipográficas, sem inventar marcas, certificações ou tecnologias.
- CONSOLIDATE: promover o estudo aprovado a um componente compartilhado por home e rota de revisão. Retirar a antiga animação hero/mídia do controlador do restante. Entrada e scroll mantêm wrappers separados, inclusive no fechamento do hero.
- IMPROVE: faixa de projetos mais horizontal, troca com aceleração/desaceleração e scrub0,35s; referências R3 22,8–25,2s. Conteúdo/links continuam fora da máscara.
- IMPROVE: Sobre como painel editorial que cresce e atravessa uma faixa tipográfica factual; Competências com título acompanhando a leitura e linhas por projeto; contato mantém suas duas faixas com scroll amortecido. Sem novo pin para essas seções.
- Não fabricar fotos/mosaico/3D. Falta de fontes pessoais permanece explícita; não impede ajustar os movimentos com conteúdo disponível.

Alcance: home, hero compartilhado, montagem de projetos, controladores, CSS, estudo local, regressões de movimento/navegação e documentos. Riscos: disputa intro/scroll, compensação de âncoras quando a faixa é reativada, foco em hero invisível, pop-ups sobre mídia, altura curta, reduced/no-JS/import falho e cleanup no retorno de case. Validar os caminhos reais e gravação contínua antes de novo gate visual.

## Entrega e revisão

Fonte `4acc9775a3c1205f96050da17015c9d80dd05386`; estabilização dos testes `7c518f41c9de3aa0a0a11eb6626701475d0d81e6`. Home disponível em http://127.0.0.1:3102/ com servidor de desenvolvimento. O estudo `/experimentos/hero-projeto` compartilha o mesmo componente e continua restrito ao desenvolvimento.

`HeroProject` reutiliza a passagem aprovada, lê a stack real e apresenta Python, NumPy, OpenCV e PySerial. As etiquetas usam abreviações tipográficas, não logotipos oficiais. Entrada a partir de p0,68, y28→0/scale0,55→1/opacity0→1, stagger0,025, power3.out; todas acomodadas em p0,875. A geometria/ritmo anteriores permanecem; sticky nativo de240svh, sem outro pin. Em mobile/baixo/reduced/no-JS, imagem e ferramentas ficam no fluxo.

`HeroProjectMotion` controla apenas a passagem; `HomeMotion/home-reveals` controla o restante. A intro continua dona dos filhos do hero, incluindo `.hero-end`; scroll usa o wrapper `.hero-outro`. Imports adiados, cancelamento, cleanup e foco foram revisados. Navbar, dados, rotas dos cases e dependências não mudaram.

Faixa de projetos: altura280–360px, dois projetos reais, troca vertical em35–65% com power2.inOut, fundo cruzado e scrub0,35s. Sobre: painel editorial scale0,84→1/y110→0, texto decorativo factual atravessa o painel. Competências: título acompanha a leitura em sticky, linhas sobem64px; nenhum novo pin. Contato preserva as faixas existentes com scrub amortecido. Foco/hash libera os efeitos editoriais; roda/toque retoma mantendo a posição de leitura.

## Comparação visual e limites

Inspeção própria em Chromium real:36 capturas em1440×900,1920×1080 e375×812; três gravações contínuas com roda, reversão, gesto rápido, CTA e menu. Pranchas derivadas de quadros reais, com timestamps; não inferência de movimento a partir de capturas estáticas.

| Trecho               | Referência observada                                                      | Resultado observado e diferença restante                                                                                                                                                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ferramentas          | R2 7,1–8,1s: imagem chega antes, ícones externos surgem por volta de7,9s  | Gravação1440 em6,4–7,9s: frame acomoda e etiquetas entram em sequência. [Sequência local](scroll-integration-review/tools-sequence.jpg), [referência](scroll-integration-review/reference-tools.jpg). Abreviações e nomes reais substituem marcas do exemplo; sem equivalência de easing alegada.                                            |
| Faixa                | R3 22,8–24,3s: faixa horizontal clara, troca vertical e fundo do trabalho | Gravação1440 em20–23,32s: Industry→Ateliê, com reversão depois. [Sequência](scroll-integration-review/band-sequence.jpg), [estado final](scroll-integration-review/atelie-band-1440.jpg), [referência](scroll-integration-review/reference-band.jpg). Dois projetos; faixa ainda mais alta que a referência para preservar nomes e legendas. |
| Sobre                | R3 11,5–13,7s: expansão editorial, tipografia atravessando e fotografia   | [Quadros locais32–35s](scroll-integration-review/editorial-sequence.jpg). Painel e texto factual; não replica a fotografia/mosaico ausentes. Texto decorativo pode ser recortado; biografia permanece integral e legível.                                                                                                                    |
| Competências/contato | Continuidade editorial e faixas de texto                                  | [Início](scroll-integration-review/skills-1440.jpg), [fim](scroll-integration-review/skills-last-1440.jpg), [contato](scroll-integration-review/contact-1920.jpg). Título acompanha a leitura, linhas progridem juntas, contato alcançável. Não substitui o objeto3D da referência.                                                          |
| Mobile               | Vídeos fornecidos não estabelecem coreografia mobile                      | [Ferramentas](scroll-integration-review/tools-375.jpg), [Sobre](scroll-integration-review/about-375.jpg). Fluxo estático legível; sem pin/sticky de storytelling nem texto decorativo em movimento.                                                                                                                                          |

Os segundos acima são dos vídeos, não durações fixas do scroll. As curvas e distâncias são decisões de implementação. Capturas não mostraram sobreposição das ferramentas com a mídia; testes geométricos confirmam900×800,1440×900 e1920×1080. A camada de navegação permanece independente. A marca do Next no canto das capturas pertence ao servidor de desenvolvimento.

Reprodução local: abrir `.audit/phase-f-integration/review.html`. WebMs de1440,1920 e375px têm56,84s,64,28s e29,88s, respectivamente, codificados a25fps. O último é codificado a374px por alinhamento do codec; viewport/capturas têm375px. [Metadados e hashes](scroll-integration-review/recordings.json). As marcas em `capture-results.json` começam após o carregamento; os timestamps das pranchas pertencem ao arquivo de vídeo.

## Validação

- Build/TypeScript strict, lint completo, formato dos arquivos alterados, diff-check e7/7 unitários aprovados.
- Home:172 casos E2E distintos aprovados em Chromium/Firefox/WebKit,5 skips preexistentes, sem falhas pendentes. Inclui intro, ferramentas, storytelling, navegação, responsividade, zoom200% real no Chromium, teclado, hash, preferência em execução, resize, import falho e retorno de case.
- Protótipo compartilhado:6/6 em Chromium, incluindo no-JS, import bloqueado, foco/CTA/menu e geometria.
- Capturas:36 estados sem overflow/pageerrors; axe zero no estado após menu/retomada de cada viewport, além das asserções E2E existentes. Não certifica WCAG.
- Revisão de responsabilidades React/GSAP, diff e evidências pelo próprio executor. Sem parecer independente nesta continuação.

Histórico preservado: primeiro build falhou por narrowing de `root` em função aninhada; callback após guarda resolveu. Primeira rodada Chromium:58pass/1falha, ferramentas posteriores ao primeiro stagger apareciam cedo; `gsap.set` inicial dentro do contexto corrigiu,6/6 nos três engines. Firefox/WebKit:106pass/3falhas/5skips; três falhas Firefox em `clock.pauseAt` antes da navegação, por relógio já avançado. Instalação10s antes do alvo de pausa eliminou a corrida sem alterar limites da animação; confirmação84/84 nos três engines. [Resultados completos](scroll-integration-review/verification.json), [manifesto](scroll-integration-review/manifest.json).

## Gate

A passagem anterior continua aprovada. Ferramentas e restante da home estão implementados e tecnicamente validados para revisão visual do usuário; isso não fecha F automaticamente. Próximo passo: avaliar esta home. Só após aceite global de F e autorização explícita iniciar G (conteúdo/cases e mídia factual disponível).

Sem novo Lighthouse/INP, dispositivo físico, Safari real ou leitor de tela; vídeo25fps não prova60fps. Eventos de BFCache foram sintéticos. Fotografias/mosaico/3D não fabricados. Nenhum push/deploy, alteração de produção ou início de G–I.
