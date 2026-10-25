# G — cases cinematográficos e Museu, 18/10/2026

Continuidade do pedido explícito de aplicar a estética/scroll da home aos cases e adicionar o Museu. As13 alterações pendentes do mesmo trabalho foram preservadas em snapshot local antes da retomada e consolidadas após validação. O [plano](PHASE_G_CINEMATIC_PLAN.md), originalmente commitado em `e06b414`, antecede a implementação; seu adendo registra a retomada. Não houve push/deploy ou início de H/I.

## Entrega

Quatro cases: RoboSense, Museu, Industry Week e Ateliê. Cápsula com avatar exato, Manrope/neutros/violeta, horizonte de luz, janela de captura real, superfície de leitura com sombra, títulos acompanhantes e faixas cruzadas contínuas/reativas ao scroll. Registry compartilhado orienta navegação e sitemap; kord continua somente com repositório.

Desktop≥1100×800/no-preference: cena nativa sticky de200svh, título recua48px e desaparece até34% do percurso; captura sobe65vh, escala0,65→1 entre15–65%, com hold e scrub0,4s. A leitura cobre a cena e raio superior32→0; textos sobem48px, sem esconder parágrafos por opacity. Wheel/touch não são interceptados. Compacto/reduced/no-JS/import falho mantêm fluxo legível. Teclado/hash dão prioridade permanente à leitura até sair do case; resize, reduced em execução, pagehide/pageshow e desmontagem revertem os contextos e listeners. GSAP é proprietário exclusivo desses transforms.

Museu relata o contexto SESI Sorocaba/Semana de Arte Moderna de1922, Unity/C#, storytelling audiovisual das obras e exposição estudantil. Créditos coletivos: Bruno Proença Silva, Rodrigo Andrade, Miguel Narvais, Rafael Domingues e Maria Vitorino. Sobrenome de Rodrigo e apresentação prevista para2026 preservam esclarecimentos anteriores registrados no plano; não afirmar apresentação já realizada. Fontes editoriais do autor distinguem-se do código/vídeo. Sem atribuir papéis individuais ou validação em headset.

Captura recuperada do vídeo em2340×1080, sem geração de detalhes. Cover preenche janela e mantém acesso integral. [Proveniência](MEDIA_ASSETS.md). Cinco fontes técnicas do Museu retornaram HTTP200, fixadas na revisão `8fc221f7836b594edb53350197a2c49f621fad97`; [manifesto](case-cinematic-review/sources.json). O projeto Unity não foi executado nesta revisão.

## Validação e histórico de falhas

- Build Next16.4/TypeScript strict, lint completo,9/9 unitários, formato dos alterados e diff-check aprovados.
- Primeiro lote cases/motion/SEO:82/87 passaram; cinco falhas mediam controles da captura durante sua escala. Corrigido o teste para entrar em leitura por foco antes da medição, preservando a exigência44px; teste adicional confirma44px no estado final animado. A captura só recebe pointer events quando termina sua entrada.
- Confirmação integrada nos três engines:99/102 passaram. Três falhas eram contagem desatualizada dos links do carrossel (13 esperados/14 reais, após acesso ao case e original do Museu). Expectativa corrigida; reconfirmação3/3 aprovada. Cobertura final dos102 testes selecionados passou entre os dois comandos, sem skips/retries; não declarar uma execução única102/102 ou suíte global completa. SEO6/6 passou no primeiro lote.
- Testes cobrem quatro cases em320/375/768/1440px, reversão, geometria da captura, foco antes/depois da hidratação, import falho, reduced dinâmico, fragmentos inclusive malformados, resize, lifecycle, no-JS,404, navegação e cleanup entre home/cases.
- Duas rodadas visuais delimitadas: inspeção e confirmação após correções agrupadas. Confirmação72 estados em1440×900,375×812 e1920×1080; zero overflow/pageerrors e zero violações axe nos nove estados de arquitetura examinados. Não generalizar axe para todas as interações.
- Três vídeos contínuos de48,32s/23,40s/13,04s a25fps, sem screenshot full-page simultâneo. [Pranchas e hashes](case-cinematic-review/recordings.json); mobile375 codificado em374px. Amostras consecutivas examinadas mostram entrada, hold, reversão e cobertura. Não certificam fluidez em hardware físico ou percepção do usuário.
- Detector Impeccable executado uma vez:11 avisos consultivos (3 cores,7 escalas tipográficas,1 raio), extensões intencionais documentadas em DESIGN. Snapshot auxiliar não regenerado. Check global Prettier continua com24 arquivos históricos fora do padrão; não alegar aprovação global nem reformatá-los neste incremento.

## Comparação e limites

A cápsula, luz violeta, moldura, profundidade, sombra e faixas retomam componentes/valores da home F aprovada. Capturas reais permanecem distinguíveis dos diagramas conceituais; o Museu não recebe diagrama inventado. O corpo tem leitura mais calma que a cena de abertura. Mobile preserva a mesma identidade sem alongar a leitura com uma cena sticky.

Evidências selecionadas: [abertura](case-cinematic-review/1440-museu-arte-moderna-intro.jpg), [captura preenchida](case-cinematic-review/1440-museu-arte-moderna-capture.jpg), [cobertura](case-cinematic-review/1440-museu-arte-moderna-cover.jpg), [créditos mobile](case-cinematic-review/375-museu-arte-moderna-context.jpg), [sequência desktop](case-cinematic-review/1440-sequence-2.jpg), [estados/geometria](case-cinematic-review/browser.json), [integridade](case-cinematic-review/manifest.json). WebMs brutos permanecem ignorados em `.audit/phase-g-cinematic-resume/confirmed`.

Revisão de conteúdo/testes por subagente, autorizada no pedido; ajustes de cleanup e foco revisados na retomada. Não houve teste novo de leitor de tela, Safari real, dispositivo físico, Lighthouse/INP ou validação de campo. Fotografias pessoais/contexto, inspeção humana do favicon e direitos de destaque Ateliê seguem pendentes conforme revisão G anterior. Preview local: http://127.0.0.1:3112/projetos/museu-arte-moderna. Aguardar avaliação G; próxima fase H trata QA completo/performance e exige autorização explícita.
