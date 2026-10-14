# F — correção após rejeição do scroll

2026-10-14. Continuação autorizada por “Continue a fase F”. Baseline a745789; branch redesign/cinematic-portfolio. O relatório anterior e seu parecer ship não são aprovação do usuário. G–I, push e deploy continuam fora do escopo.

## O que mudou

O frame RoboSense agora antecede a abertura dos trabalhos e participa da saída do hero: a luz desce, o bloco de texto perde definição e a mídia cresce/abre a máscara. A faixa seguinte alterna **Industry Week e Ateliê**, incluindo títulos, imagens e fundos. Os detalhes e links de cada projeto ficam fora da máscara. O recorte superior do Ateliê está identificado; a captura integral permanece logo depois no fluxo.

Sobre ganhou um painel textual claro que se acomoda junto ao deslocamento do título. Competências entram em uma sequência coordenada de posições e índices. Duas faixas diagonais antecipam o contato, usando palavras já presentes no portfólio. Não foram adicionadas fotos, experiências ou conquistas.

Foco e hash liberam os destinos imediatamente; roda/toque subsequente reativam o scroll. A posição de leitura é preservada depois do refresh síncrono do pin. Reduced motion continua imediato, sem intro ao voltar a no-preference. Pagehide limpa; pageshow persistido permite reativação. Imports pendentes após desmontagem não inicializam efeitos.

## Comparação com os vídeos reais

| Fonte         | Correção                                                                                                                                         | Diferença que permanece                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| R2 6,3–8,7s   | Hero e mídia agora se movem simultaneamente em wrappers distintos; escala0,66→1, y−180→0, máscara8→0%; texto desloca130px/blur até6px e luz240px | Passagem em fluxo, sem pin adicional; conteúdo e proporções diferentes. Sem alegação de easing original ou pixel-perfect. |
| R3 21,6–25,2s | Abertura tipográfica desloca; faixa abre máscara, alterna verticalmente dois projetos reais e faz crossfade dos fundos                           | Dois trabalhos na faixa, com RoboSense apresentado antes; faixa mais alta para manter título, imagem e legenda legíveis.  |
| R3 11,5–13,7s | Título lateral e painel textual mudam de posição, escala e orientação                                                                            | Painel textual autêntico substitui a parte fotográfica indisponível; não reproduz a aparição de uma pessoa.               |
| R3 15,3–20,5s | Aplicações das competências têm progressão coordenada de deslocamentos e orientação dos índices                                                  | Não há objeto3D; a adaptação usa os textos factuais existentes. Não é reprodução integral dessa cena.                     |
| R3 37–38,5s   | Duas faixas diagonais cruzam o percurso antes dos links de contato                                                                               | Sem loop/autoplay; palavras e composição próprias.                                                                        |
| R3 33,8–35,9s | Sem mosaico de fotos                                                                                                                             | Originais/contexto/permissões não recebidos. Continua pendente; não substituído com stock/IA.                             |

Os quadros consecutivos das referências foram revistos em .audit/phase-f-correction/2.mp4-0.jpg e3.mp4-12.jpg/18.jpg, derivados dos MP4 reais na pasta somente leitura. Segundos das referências indicam ordem observada; o andamento da implementação depende do gesto de scroll. Mobile e viewport baixo usam composição sequencial, sem pin ou blur em movimento; não existe vídeo mobile de referência que permita alegar fidelidade equivalente.

## Validação e falhas preservadas

Primeiro build falhou no narrowing TypeScript da referência ao main dentro do callback assíncrono. Corrigido com referência local não nula. Build posterior/strict e7/7 unitários passaram. Primeira rodada Chromium:27 passes/3 falhas — duas detectaram salto1030px após âncora; uma navegação recebeu ERR_NO_BUFFER_SPACE. Primeira captura: sem overflow/pageerrors, mas axe acusou contraste do texto do hero esmaecido em1440/1920. A opacidade do texto foi removida; blur continua restrito ao wrapper do hero. O pin recebe refresh antes da restauração da âncora.

Confirmação após correções: **166 testes aprovados,5 exclusões preexistentes,0 falhas**, Chromium/Firefox/WebKit, dois workers, sem retries; storytelling/navigation/motion/hero/intro/responsive. Os testes CTA/menu/hash→wheel passaram nos três motores, incluindo a preservação do destino. Build/strict, lint dos arquivos alterados, formato e diff-check aprovados;7/7 unitários em cinco arquivos. Aviso metadataBase de preview permanece. Testes de pageshow/pagehide usam eventos sintéticos; ida ao case e back usam navegação real. Não afirmar restauração BFCache física em todos os browsers.

Fonte validada: `f1c78d96e02491e3649ff9745d1d0f35d323f88c`; plano `b46ae07f26faa33db79ae2aa6d912e07c1f815c8`. [Histórico de testes](story-correction-review/verification.json) preserva as falhas iniciais.

## Prova visual final

Chromium156.0.8078.4, produção local,36 capturas em320/375/768/1440/1920, mais cinco verificações axe:0 overflow,0 pageerrors e0 violações nos estados avaliados. Não certifica WCAG. [Resultados](story-correction-review/results.json) e [manifesto SHA-256](story-correction-review/manifest.json).

- [Passagem hero→RoboSense](story-correction-review/handoff-1440.jpg).
- Faixa: [Industry](story-correction-review/industry-1440.jpg), [troca](story-correction-review/swap-1440.jpg), [Ateliê](story-correction-review/atelie-1440.jpg).
- [Sobre](story-correction-review/about-1440.jpg), [competências](story-correction-review/skills-1920.jpg), [contato mobile](story-correction-review/contact-375.jpg).
- Gravações contínuas amostradas: [desktop](story-correction-review/recorded-scroll-1440.jpg) e [mobile](story-correction-review/recorded-scroll-375.jpg). WebMs locais .audit/phase-f-correction/scroll-v2-1440.webm e scroll-v2-375.webm,20,4s/20s,25fps; sem relógio simulado. [Metadados/hashes](story-correction-review/recordings.json).

Quadros desktop:1,02→2,65s mostra hero/mídia;6,53→9,18s faixa Industry→Ateliê;10,61s mostra a reversão;13,87→18,56s cobre painel, competências e faixas de contato. Tempos pertencem ao roteiro gravado, não à duração fixa de animações. O roteiro termina com retorno rápido ao topo. Mobile mantém todas as regiões em fluxo; faixas diagonais são estáticas. As duas pranchas foram inspecionadas junto às sequências R2/R3, além das capturas finais de geometrias pequenas/largas.

894 amostrasRAF desktop/987 mobile durante gravação: mediana16,7ms em ambos; p95 desktop33,3ms/máximo50ms; mobile16,7/16,8ms. Inclui custo do recorder; não prova60fps sustentados, INP ou hardware real. Os WebMs e dados brutos ficam ignorados; as pranchas e o resumo são duráveis.

Detector Impeccable executado uma vez sobre os arquivos modificados:12 achados, todos em regras CSS preexistentes (borda dos cases, tamanhos/raios e duas cores já usadas). Nenhum novo achado do diff; não houve mudança fora de F para zerar o relatório. Revisão React: composição servidor preservada, dados separados, import condicional, listeners passivos e cleanup. Nenhum pacote novo.

Revisão pelo próprio executor, sem parecer independente nesta continuação. Correções encontradas na primeira rodada foram confirmadas na segunda; não houve nova rodada de polimento após a confirmação. A interrupção por limite de uso da revisão automática impediu uma tentativa de edição; o trabalho só foi retomado após nova instrução do usuário, sem contorno de aprovação.

## Limites e próximo gate

Aceite visual pertence ao usuário. Testes/build não comprovam equivalência de coreografia. Fotografias pessoais/mosaico e objeto3D não foram entregues. Safari real, leitor de tela, dispositivos físicos, INP de campo e novo Lighthouse não fazem parte desta rodada. LCP2623ms é a medição anterior, potencialmente desatualizada após este diff; não tratar como performance atual.

Após a revisão F, a próxima fase proposta é G: narrativa/cases, mídias pessoais verificadas se fornecidas e avatar favicon. Exige confirmação explícita própria. Nada foi publicado.
