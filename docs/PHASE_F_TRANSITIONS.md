# F — continuidade e faixas, 17/10/2026

Autorizado pelo pedido de continuar F, concluir pendências, adicionar transições em todas as seções exceto contato final e restaurar faixas cruzadas, contínuas e sensíveis ao scroll, sem botão de pausa. G–I, push e deploy continuam fora do escopo.

## Plano e contrato

- Preservar a passagem hero→RoboSense aprovada e a troca horizontal Industry→Ateliê. Completar entradas/saídas de detalhes RoboSense, Sobre, abertura dos projetos, Competências e passagem das faixas. Mobile recebe movimentos menores, sem pin; contato e footer ficam em fluxo convencional.
- A continuidade usa deslocamento, escala contida e opacidade nas bordas, com intervalo central de leitura nítida. Sem blur em parágrafos. O progresso é reversível; não interceptar wheel/touch nem instalar motor de scroll.
- Faixas com inclinações opostas e sobreposição central. Grupos repetidos idênticos garantem emenda contínua; velocidade/direção respondem ao gesto e voltam ao loop-base. Sem botão, conforme pedido; reduced motion interrompe imediatamente, inclusive em execução. Pausar trabalho fora da tela/aba e liberar callbacks ao desmontar.
- Reutilizar GSAP/ScrollTrigger para as seções, sem disputar propriedades com Motion/navbar ou intro. Faixas têm owner independente. Sem novas dependências, mídia ou afirmações factuais.
- Validar movimento progressivo/reverso, hash, teclado, viewport baixo/mobile, reduced, no-JS, falhas e cleanup. Capturas e gravações reais em desktop/mobile; comparar sequência com R2/R3/R4, sem alegar equivalência de easing.

## Baseline e pendências

HEAD inicial `1f494fa`; 70 arquivos preexistentes preservados em `.audit/phase-f-transitions/baseline`, com hashes. Usuário autorizou explicitamente **“Sim, consolidar os refinamentos de src e testes”**. A base foi reposta temporariamente a partir desse snapshot, validada e commitada separadamente em `2571228` (22 arquivos). As novas transições foram então restauradas; documentos preexistentes não foram incorporados.

WebMs anteriores têm artefatos intermediários cuja causa permanece aberta. Novas provas devem distinguir renderização do navegador de codificação do vídeo. Fotos pessoais, mosaico e 3D não serão inventados. Aprovação visual global de F permanece pendente.

## Implementação e decisões

- `section-transitions` coordena detalhes RoboSense, Sobre, abertura dos projetos, linhas de competências e seu fechamento. Entrada de 24–96px (mobile 24–40px), deslocamento lateral de 64px no título Sobre, escala 0,97 apenas na abertura editorial; saída menor, leitura central estável. Scrub de 0,45s no desktop e 0,25s no compacto. Fade 0,18→1 aplicado por variável CSS **somente enquanto o trecho está ativo**, preservando contraste fora da tela e após refresh. Não há blur de texto.
- A faixa horizontal aprovada conserva um pin, duração de scroll 160svh e leitura nas extremidades. Sua entrada desloca 56px, preservando o tamanho dos links. Mobile/viewport baixo têm entradas em fluxo; o hero compacto se desloca 36px e o frame aparece em sequência. Desktop mantém o owner da passagem hero→RoboSense.
- Contato e footer não entram no controlador de transições. Scroll nativo é a fonte de progresso em toda a página; nenhum evento de roda/toque é cancelado. “Sem rolagem padrão” é atendido pela coreografia das seções, com uma alternativa estática em reduced/no-JS/falha.
- Faixas inclinadas −6°/+6°, sobrepostas no centro. Duas cópias iguais por trilho, fase modular e sentidos opostos; velocidade-base 34px/s. Delta do scroll acrescenta impulso limitado a ±600px/s, com amortecimento exponencial. Medidas são atualizadas por ResizeObserver; o frame não mede layout. Sem botão conforme pedido; RAF só roda quando a passagem está visível, a aba está ativa e reduced motion está desligado.
- Foco acomoda scrubs antes de medir a posição do alvo: a roda seguinte não provoca o salto de 64px encontrado inicialmente. A intro conserva seus tempos/desenho, mas agora inicializa os estados explicitamente antes dos tweens, evitando que refresh do scroll afete o estado anterior ao primeiro frame.
- Custo assumido: GSAP/ScrollTrigger passa a carregar também em mobile com no-preference, pois as novas transições foram solicitadas para todas as seções. Reduced inicial continua evitando os chunks de animação. Sem nova biblioteca, conteúdo ou mídia.

## Histórico de validação

Base `2571228`: build/strict, lint completo, formato e 7 unitários passam; 10/10 E2E no build local Chromium. Tentativa em dev falhou no loop após a troca temporária de arquivos; build limpo confirmou o comportamento. Um runner no sandbox passou os 10 casos, mas não encerrou o servidor; interrompido, com confirmação fora do sandbox 10/10 e exit 0.

Nova implementação: primeira checagem falhou numa posição de amostragem do teste; ajustada para medir a geometria após acomodação. Regressão encontrou salto de foco de 64px, contraste estacionado fora da tela, escala que reduzia alvos de links abaixo de 44px e estados iniciais implícitos da intro alterados pelo refresh. Corrigidos no owner responsável, sem remover as asserções. A rodada ampla inicial foi interrompida após os achados; não é apresentada como execução concluída. Confirmação direcionada dos dez casos afetados em Chromium: 10/10.

Confirmação final: build, TypeScript strict, lint completo, Prettier dos arquivos alterados e Vitest 7/7 aprovados. Rodada E2E ampla: 216 aprovados, 5 skips por engine e 1 falha de asserção no teste de seção de desktop. A inspeção mostrou que a expectativa antiga procurava fade-out ao colocar o elemento perto do topo, enquanto o comportamento definido mantém opacidade legível e move o conteúdo 32px no trecho de saída. O teste foi corrigido para medir esse deslocamento e a reversão. Teste corrigido passou 6/6 (desktop/mobile em Chromium, Firefox e WebKit); storytelling Firefox passou 14/14 após tolerância de 1,1px para a diferença de rolagem arredondada em 1px pelo browser. A rodada ampla com essas duas correções ainda não foi repetida integralmente; os resultados distintos permanecem explícitos.

Capturas finais: 16 estados em 1440×900 e 14 em 375×812; zero erros de página/transbordamento e axe sem violações. Vídeos25fps de 26,84s e24,60s; hashes registrados em `scroll-transitions-review/recordings.json`, originais brutos somente no `.audit` ignorado. Fotografias/JPEGs, resultados JSON e hashes duráveis no manifesto `scroll-transitions-review/manifest.json`. Revisão própria, sem Safari real, hardware físico, leitor de tela ou aceite visual do usuário.
