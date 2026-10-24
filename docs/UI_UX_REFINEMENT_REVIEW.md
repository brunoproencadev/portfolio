# Refinamento de UI/UX e movimento — entrega local, 24/10/2026

Incremento autorizado por “Pode fazer então, tem minha aprovação”, após o [plano](UI_UX_REFINEMENT_PLAN.md). Fonte `bac97a6`; plano `7fc1de6`. As provas cobrem a árvore completa com as quatro pendências de entrada identificadas pelos hashes, não somente HEAD limpo. A entrega corrige continuidade de leitura/foco e localização no carrossel. A Fase H continua aberta por desempenho; não houve publicação ou início de I.

## Comportamento corrigido

Ativar reduced motion enquanto Industry Week estava em leitura deslocava seu título de y=222,375 para y=4061,25 em 1100×800: perda de aproximadamente 3839px. A remoção do pin e a mudança imediata das regras CSS alteravam o documento antes de a posição ser preservada. Recriar o pin também podia remover o foco do elemento reparentado.

HomeMotion agora escolhe um ponto de leitura efetivamente visível, priorizando o foco e descartando projetos fora da tela ou cobertos por outra superfície. Compensa a alteração no próximo quadro, depois do reset de scroll do ScrollTrigger; restaura o foco perdido para o body. Navegação, gestos, saída da página e desmontagem cancelam o quadro pendente. O mesmo mecanismo cobre a reconstrução dos efeitos.

A classe `story-enhanced`, aplicada somente pelo enhancement elegível, controla o layout do carrossel até o teardown JavaScript. Retirar o teste CSS redundante de reduced motion permite medir a posição antes da remoção da classe. No modo reduced inicial e sem JavaScript, a classe não existe e a leitura continua linear. Não foi criada uma segunda animação ou um controle concorrente das mesmas propriedades.

Os links do carrossel agora indicam o projeto atual com sublinhado e `aria-current="location"`. O estado acompanha a timeline real, inclusive na reversão, atualiza o DOM somente quando muda o índice e é removido no cleanup. Dados, mídias, coreografia aprovada, bibliotecas e rotas foram preservados.

## Comparação no navegador

Chromium de produção, desktop 1440×900 e mobile 375×812: home, menu, Sobre, Projetos, Competências, Contato e abertura dos quatro cases. Foram capturados 23 estados finais e duas gravações. Nenhum overflow horizontal ou pageerror nos estados registrados em [browser.json](ui-ux-review/browser.json).

Na sequência final desktop, o título permaneceu em y=259,984 antes, y=259,531 com reduced motion e y=259,984 após reativar o movimento; foco preservado. A comparação comportamental de 1100×800 também passou nos três motores, com e sem foco. O limite do teste é deslocamento inferior a 24px, além de visibilidade, foco e um único pin.

| Evidência                                                                                                                  | Conteúdo                                                              |
| -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Falha anterior](ui-ux-review/before-reduced-1100.png) e [geometria](ui-ux-review/baseline.json)                           | Industry Week deixa a janela ao retirar o pin                         |
| [Projeto atual](ui-ux-review/current-project-1440.png)                                                                     | Sublinhado e barra acompanham Industry Week                           |
| [Reduced motion](ui-ux-review/reduced-project-1440.png)                                                                    | Mesmo projeto e título continuam em leitura                           |
| [Movimento restaurado](ui-ux-review/restored-project-1440.png)                                                             | Cena e foco recuperados                                               |
| [Home desktop](ui-ux-review/home-1440.png), [mobile](ui-ux-review/home-375.png) e [menu mobile](ui-ux-review/menu-375.png) | Composição existente reconferida                                      |
| [Gravação 1](ui-ux-review/interaction-1.webm), [gravação 2](ui-ux-review/interaction-2.webm)                               | Interações e navegação capturadas no navegador, não vídeos fabricados |

As capturas iniciais da home em `.audit/ui-refinement/before` foram feitas durante o assentamento do enhancement. Não são usadas para alegar melhora estética do hero. A prova antes/depois desta correção é a transição de preferência em leitura, não uma comparação entre quadros de carregamento diferentes. Gravação automatizada e geometria não comprovam conforto ou fluidez em dispositivo físico.

[Metadados das gravações](ui-ux-review/videos.json): VP9, desktop1440×900/10,56s e mobile374×812/8,68s, a partir de viewport375px. Os25fps do arquivo não medem FPS da interface. Foram inspecionados os metadados; não houve reprodução integral dos vídeos. A tentativa de decode para saída nula não era suportada pelo FFmpeg reduzido do Playwright e não conta como validação de playback.

## Validação e falhas preservadas

- Antes da implementação: três regressões Chromium falharam, confirmando o salto com/sem foco e a ausência de estado atual.
- Desenvolvimento final: 9/9 novos casos, Chromium/Firefox/WebKit. Tentativas intermediárias preservadas localmente: restauração síncrona era sobrescrita pelo reset de scroll; cache de posição não resolveu a diferença de layout do WebKit e foi retirado.
- Produção completa: **387 PASS, cinco SKIP e uma falha de worker Firefox**, em 393 casos, sem retries. O worker encerrou com código 3221226505 no teste da intro com importação atrasada. Confirmação isolada desse mesmo teste em Firefox: **1/1 PASS**. Assim, 388 casos distintos passaram entre as duas execuções; não foi uma rodada única sem falhas. [Resultado e skips](ui-ux-review/verification.json).
- A primeira tentativa de confirmação selecionou `intro.spec.ts` em vez de `motion.spec.ts`, não encontrou testes e foi descartada. Não entra nos totais.
- A exportação inicial de resultados falhou por JSON UTF-16 gerado pelo PowerShell. O leitor passou a detectar BOM; os artefatos documentais foram exportados em UTF-8/LF e reconferidos antes do commit.
- Build final/TypeScript strict: PASS na repetição; a primeira tentativa foi interrompida pelo alerta de segurança do Next depois de compilar e gerar as páginas. [Interrupção](ui-ux-review/build.log), [confirmação](ui-ux-review/build-confirmation.log). O aviso local de metadataBase permanece; preview não equivale a SEO de produção.
- Lint completo: PASS; unitários: 9/9 PASS; formato dos quatro arquivos de implementação/testes e do plano: PASS; diff-check: PASS.
- Formato global: FAIL nos 24 arquivos históricos. Uma execução anterior incluiu quatro JSONs gerados pelo Trail-Code, totalizando 28 avisos; o cache foi movido para `.audit`, e a reconfirmação voltou aos 24 históricos. Nenhuma reformatação geral foi aplicada. [Log final](ui-ux-review/format-global-confirmation.log).
- Os quatro arquivos preexistentes continuam byte a byte iguais aos hashes da entrada, fora dos commits desta entrega: [preserved-files.json](ui-ux-review/preserved-files.json).

## Desempenho: meta ainda não atendida

Três Lighthouse mobile da home de produção local, sem builds/testes concorrentes, com ambiente em [performance-environment.json](ui-ux-review/performance-environment.json):

| Execução | Performance |        LCP |       TBT |        CLS |
| -------- | ----------: | ---------: | --------: | ---------: |
| 1        |          84 |     3559ms |     285ms |     0,0389 |
| 2        |          85 |     3522ms |   277,5ms |     0,0389 |
| 3        |          84 |     3507ms |   292,5ms |     0,0389 |
| Mediana  |      **84** | **3522ms** | **285ms** | **0,0389** |

[Dados e amostras de CPU](ui-ux-review/performance.json). H03 segue fora das metas LCP ≤2500ms/performance ≥90. Esta rodada mediu novamente somente a home; não atualiza as métricas dos cases e não mede INP.

Foi coletado um perfil de CPU da inicialização em Chromium mobile com CPU 4×, separado do Lighthouse. Os maiores frames JavaScript próprios distribuíram-se entre runtime Turbopack e bundles minificados de renderização/movimento; não foi isolada uma função com correção segura comprovada. Tempo próprio amostrado não é custo total de uma função nem breakdown de LCP. Perfil completo em `.audit/ui-refinement/performance/initialization.cpuprofile`. Nenhuma otimização especulativa ou remoção da coreografia foi conservada.

Não houve série pareada de performance do baseline neste turno. Portanto, diferenças para as medições históricas não comprovam melhora, regressão ou causalidade destas alterações. A entrega não declara ganho de performance nem fechamento de H03.

## Segurança, ferramentas e próximo gate

O build sinalizou vulnerabilidade no Next 16.4.0. A [auditoria de runtime](ui-ux-review/security.json) confirmou uma dependência crítica e indicou 16.4.3 como correção; inclui os avisos [Image Optimization](https://github.com/advisories/GHSA-2464-fhr4-w9xw), [Server Actions](https://github.com/advisories/GHSA-p3m5-59mp-jv5r) e [use cache](https://github.com/advisories/GHSA-673q-mjm6-r5xr). A atualização altera dependências e foi apresentada ao usuário como decisão separada. Até este fechamento, não foi autorizada nem aplicada; não publicar esta entrega como pronta para produção.

Ponytail e Impeccable orientaram reaproveitamento, continuidade e inspeção em lote. Trail-Code 0.23.0 foi usado para mapa/consulta de dependências, com cache local em `.audit/ui-refinement/trail-map`. shadcn MCP foi conectado e consultado; 21st respondeu à autenticação e busca reais via CLI. Geração IA da 21st indisponível na conta; nenhum componente foi instalado. Figma não foi necessário para este refinamento da interface existente.

Preview local: <http://127.0.0.1:3116/>. Capturas e gravações não substituem avaliação perceptual do usuário. Safari/dispositivos físicos, leitor de tela e INP continuam sem prova. Fotos/contexto e direitos anteriores não foram resolvidos por este incremento.

Próximo gate: avaliar visualmente este refinamento e decidir sobre a atualização de segurança; H03 continua pendente. Fase I, push e deploy exigem autorização própria. Este commit documental registra evidências e continuidade; seu SHA é consultável por `git log -1 -- docs/UI_UX_REFINEMENT_REVIEW.md`, evitando autorreferência.
