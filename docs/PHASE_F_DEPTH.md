# F — transições RoboSense/Sobre e profundidade, 17/10/2026

O usuário aprovou a versão do scroll e pediu este último refinamento. Baseline limpo `b966e4b`, previamente enviado ao GitHub por autorização específica. Esta revisão continua em F; G–I, novo push e deploy não foram autorizados.

Fechamento em18/10: fonte consolidada em `41eec8176152d3de06dc99e74a16c5ea3311c234`. Na retomada, o histórico já continha `875da83`, `c3a801d` e `8effc54`: Museu/kord, carrossel com quatro projetos e Clawd acima do RoboSense. Essas mudanças foram preservadas. As capturas deste relatório são da composição anterior de dois projetos no carrossel e ícone PNG; as evidências mais recentes de composição/Clawd estão em [PHASE_F_PROJECTS](PHASE_F_PROJECTS.md). O PNG oficial foi preservado como asset histórico, mas o componente vigente usa `clawd.svg`. Os números abaixo descrevem cada rodada na respectiva versão, sem atribuir capturas antigas à integração final.

## Entrega e decisões

- O frame e as ferramentas RoboSense recuam juntos, reduzindo escala e opacidade antes da leitura. No desktop, a compensação vertical mantém o centro durante os 60vh finais da passagem; a entrada aprovada e a cena de 240svh permanecem. No compacto, recuo menor sem pin. O wrapper externo possui a saída; o frame e os ícones conservam seus próprios efeitos de entrada.
- Sobre sobe como superfície opaca sobre o texto RoboSense, com somente os cantos superiores arredondados e sombra voltada para cima. Raio 48→0px e intensidade da sombra 1→0 conforme o topo percorre o viewport; ao ocupar a tela não há cantos expostos. A seção anterior usa sticky nativo, com altura medida para permitir a leitura completa em telas baixas.
- Foco nos links RoboSense recupera sua posição de leitura. O assentamento global tolera scrubs diretos sem tween. Navegação verifica a chegada antes de focar o destino, mesmo se o navegador cancelar ou atrasar seu scroll suave; um gesto do usuário cancela essa recuperação.
- Blur superior ampliado de 116 para 164px; blur lateral esquerdo de 10px limitado à janela do carrossel horizontal, sem captura de cliques. Halo violeta ampliado de 55 para 76px, desfoque de 24 para 38px.
- Pop-ups recebem sombra mais profunda e glow discreto derivado da cor de cada ferramenta. Claude Code aparece nos três projetos, com ícone oficial e atribuição solicitada pelo autor, separada da stack factual. RoboSense reutiliza a moldura macOS dos outros projetos.
- Sem dependências novas, alteração de cases, dados profissionais ou screenshots. Reduced motion em execução remove transforms/sticky e mantém conteúdo no fluxo; sem JavaScript o HTML permanece legível. Contato e faixas preservam o comportamento aprovado.

## Comparação e evidência

Duas rodadas visuais agrupadas em Chromium: inspeção desktop/mobile e confirmação em build de produção local. Na primeira foram identificados o corte superior durante o recuo e uma exceção no assentamento de scrub direto; ambos corrigidos antes da confirmação. A confirmação registra 22 estados em 1440×900 e 375×812, sem overflow, sem pageerrors, axe sem violações nos estados finais dos projetos.

[Sequência desktop](scroll-depth-review/1440-sequence.jpg), [sequência mobile](scroll-depth-review/374-sequence.jpg), [estados](scroll-depth-review/browser.json) e [gravações/hashes](scroll-depth-review/recordings.json). WebMs brutos permanecem em `.audit/phase-f-depth/confirmed`, fora do Git. As pranchas usam quadros consecutivos a cada 0,5s: recuo, cobertura, tela cheia e reversão. Vídeo mobile é codificado com largura par 374px para viewport de 375px. A referência R4 permanece a fonte da moldura já aplicada; a nova passagem segue o pedido textual do usuário, sem alegação de timings medidos da referência.

Confirmação visual: frame inteiro durante o recuo, superfície cobrindo texto, cantos desaparecendo em tela cheia, recuperação do link no mobile, Claude nos três projetos e blur apenas na margem esquerda do carrossel. A última correção de navegação não muda composição; validada funcionalmente após as capturas. Não houve terceira rodada de polimento.

## Validação e limites

A ampliação da regressão para foundation/navigation/storytelling/refinement/handoff resultou em105 aprovados,2 skips e4 falhas: CTA interceptado pelo wrapper decorativo nos três engines e um teste tentando clicar num link intencionalmente encoberto pelo Sobre após resize. O wrapper passou a ignorar ponteiros; o teste restaura a leitura pelo foco antes de clicar, verificando o caminho acessível. Confirmação final específica em storytelling/handoff consta em VERIFICATION. Os dois skips são os casos conhecidos de Tab nativo no WebKit/Windows; a rodada anterior tinha também os skips de zoom exclusivo do Chromium. Nenhuma falha foi ocultada por retry.

Build/TypeScript strict, lint e 7/7 unitários aprovados. Formatação e regressões finais registradas em VERIFICATION/HANDOFF. O primeiro build detectou uma tipagem inadequada em teste existente (`HTMLElement | SVGElement`); corrigida explicitamente. A primeira rodada E2E foi interrompida após reproduzir a exceção do scrub direto. A rodada seguinte teve 84 aprovados, 3 skips e 3 falhas: duas expectativas de raio exatamente zero no WebKit (resíduo de 0,0533px por arredondamento de scroll) e uma chegada de navegação no Firefox. O teste de raio admite menos de 0,1px; a navegação foi corrigida com uma regressão que simula o cancelamento do scroll nativo. Confirmação posterior indicada nos registros vigentes, sem apagar esse histórico.

Revisão própria com navegador real automatizado; não comprova aceite perceptual do usuário, Safari/dispositivos físicos, leitor de tela ou performance/INP. Detector Impeccable executado uma vez: avisos de estilos legados fora do diff, mais o raio deliberado desta superfície; cores/raio documentados. O snapshot auxiliar `.impeccable/design.json` continua anterior a DESIGN.md e não foi regenerado fora do escopo.

Próximo gate: avaliação destes refinamentos. Fase G trata conteúdo/cases, fotografias verificadas, avatar e favicon, somente após confirmação explícita.
