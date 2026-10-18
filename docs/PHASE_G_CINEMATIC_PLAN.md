# G retomada — cases cinematográficos e Museu

Pedido18/10/2026: aplicar conceitos visuais/scroll/estética da home aos cases, adicionar Museu e melhorar/preencher sua janela. O usuário exige planejar animações antes de executar e permite subagentes. Este incremento reabre G, sem autorizar H/I/push/deploy. Baseline0eddebd, árvore limpa.

## Conteúdo confirmado

Museu de realidade virtual em Unity/C#, desenvolvido por Bruno com Rodrigo Andrade, Miguel Narvais, Rafael Domingues e Maria Vitorino para a semana dedicada à Semana de Arte Moderna de1922 no SESI de Sorocaba. Apresentação **prevista para2026**, ainda não realizada, conforme esclarecimento do usuário. Obras principais recebem descrições audiovisuais com leitura de elementos visuais/contexto; o projeto reserva espaço para obras dos estudantes relacionadas aos conceitos da época. Não atribuir papéis individuais, headset validado, público atendido, resultado pedagógico medido ou commits a Bruno. Relato do autor é fonte editorial; repositório/vídeo comprovam o artefato, sem substituir essa atribuição.

## Storyboard e valores propostos antes da implementação

1. **Reconhecimento:** navegação compacta para projetos/contato, título grande, síntese/estado/stack/ações e horizonte de luz violeta. Sem repetir a saudação da home.
2. **Entrada no trabalho:** somente desktop≥1100×800/no-preference, uma cena sticky de até200svh. O título recua/sai nos primeiros35% do percurso; janela real sobe de65vh e escala0,65 para1 entre15–65%; hold final para examinar a captura. Scrub0,4s, reversível, sem interceptar wheel/touch. Barra de janela reaproveita a estética de F e não contém controles fictícios focáveis.
3. **Contexto:** a leitura chega em uma superfície que cobre a cena e reduz seu raio de32px para0. Títulos acompanham o conteúdo no desktop; blocos entram de24–48px, em direções apropriadas, acomodados antes da leitura central. Texto disponível por padrão; sem fade persistente em conteúdo fora do intervalo ativo.
4. **Construção/evidência:** arquitetura, escolhas e limites em seções com respiro e fundos/luz coordenados. Diagrama conceitual continua distinto da mídia real. Imagens adicionais ficam entre capítulos, sem slider de texto escondido.
5. **Continuidade:** chamada ampla para outros cases e contato, com as faixas existentes da home quando compatíveis com leitura/cleanup. Nenhuma nova biblioteca.

Mobile/baixo/reduced/no-JS/falha de import: fluxo vertical, mídia visível, sem sticky/pin adicional. Reduced em execução reverte; resize reconcilia; hash/foco acomodam leitura; desmontagem cancela imports pendentes, eventos, RAFs e contextos. GSAP controla apenas wrappers/variáveis próprios; Motion não atua neles. Cenário real precisa ser confirmado em navegador, não deduzido de screenshot.

## Implementação delimitada

- Expandir registro de cases para quatro sem mudar a lista de projetos históricos da home; rota Museu, links internos e sitemap devem derivar do registro real. kord continua com repositório, sem novo case.
- Reusar dados/mídia, fonte, tokens, janela e linguagem de profundidade de F. Separar markup de motion; não aplicar owners de home a elementos do case por seletores globais.
- Recuperar o frame original de10s do vídeo do museu,2340×1080, substituindo a versão reduzida1440×665. Janela preenchida via cover, sem distorção; link para captura integral. Original somente leitura; registrar hash/proveniência. Não reconstruir as obras por IA.
- Delegar conteúdo/registro/fontes do museu em arquivos delimitados; implementação visual/motion fica no agente principal. Revisão final independente após provas.

## Validação e encerramento

### Retomada após interrupção — 18/10

Treze arquivos pendentes preservados byte a byte em `.audit/phase-g-cinematic-resume/baseline`, com diff binário e hashes. O pedido atual autoriza concluir e consolidar essa mesma implementação. Manter o storyboard acima e os esclarecimentos editoriais registrados no plano original; não acrescentar atribuições individuais ou métricas.

Antes da nova implementação: completar limpeza de pagehide/pageshow, tratar hash inválido, recuperar foco somente no caminho de teclado para não mover links durante cliques, e manter o skip-link no início da leitura. A cápsula dos cases reutilizará o avatar exato e a tipografia da home; arco e superfície continuam subordinados ao conteúdo. Categorias em texto normal, sem títulos duplicados por índices decorativos; tracking limitado a−0,04em. Todos os quatro cases serão cobertos pelos testes de rota/SEO e pela nova regressão de scroll/fallback. O Museu já recuperou2340×1080 do vídeo original; a validação medirá preenchimento por cover e manterá acesso ao arquivo integral.

Build/strict/lint/unitários; E2E dos quatro cases, SEO, rota desconhecida/erro e navegação home→Museu. Provar progresso/reversão/resize/hash/teclado/reduced em execução/import falho/no-JS. Capturas1440/1920/375 e vídeos sem full-page simultâneo; comparar sequência e geometria à home aprovada. Uma rodada de inspeção e no máximo uma confirmação após correções agrupadas. Verificar janela do museu preenchida e recuperação de resolução real. Preservar falhas/limites; atualizar docs e commits atômicos locais. Fechar para avaliação de G, aguardando aprovação explícita antes de H.
