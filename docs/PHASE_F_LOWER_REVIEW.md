# F — correção do trecho inferior e referência 4

O usuário rejeitou o scroll do Ateliê para baixo e autorizou continuar, incorporar efeitos do vídeo `4.mp4` (especialmente a mudança para rolagem horizontal dos projetos e janelas com estilo macOS), além de substituir as iniciais dos pop-ups por ícones reais. Hero e navbar aprovados permanecem. Escopo dentro de F; nenhum push/deploy ou avanço para G–I.

## Diagnóstico e plano

Baseline `18d0884`. Em Chromium 1440×900, Ateliê mede 2402px: screenshot de2290px contra texto de785px. A imagem completa prolonga a seção muito além da leitura. Em Competências, foco remove `editorial-enhanced`, mudando a altura de1131px para799px; retomada por roda reconstrói o layout. Link focado passa de y0,44 para−121,47 após wheel50, inclusive sob a navegação. Evidência local `.audit/phase-f-lower/diagnosis.json`.

- KEEP: hero→RoboSense, navbar, dados/mídias, cases, links e fallbacks.
- IMPROVE: trocar somente o eixo da cena de projetos para horizontal, usando o ScrollTrigger existente, sem capturar wheel ou adicionar motor de scroll. Misturar janelas R4 com fundos derivados da mídia de R3.
- IMPROVE: enquadrar a captura longa do Ateliê em uma prévia limitada, com link para a captura integral; retirar a altura desproporcional sem alterar o asset.
- FIX: manter a composição de Competências independente do estado da animação; foco abaixo da cena não deve desmontar o pin nem mudar a geometria. A cena horizontal não contém controles focáveis; o hero conserva seu tratamento próprio.
- FIX: alinhar a expansão do painel Sobre ao intervalo em que ele está visível; texto decorativo percorre a largura real. Reduzir movimentos desconexos das linhas de competências.
- IMPROVE: Python/NumPy/OpenCV de Devicon e PySerial da documentação oficial, com fontes/licenças locais.

R4: 1920×1080, 60fps, 1764frames, 29,4s; SHA-256 `58ed14b63e7d8753569c26750023c34d7abe740deb7f7e0bb965eb983e753460`. 16 estados consecutivos a cada0,5s entre18,5–26s confirmam entrada vertical18,5–20s, trocas laterais20,5–21,5s/22,5–23,5s e saída vertical24,5–26s. [Comparação temporal](scroll-lower-review/reference4-horizontal.jpg). Conteúdo, assinatura e métricas do autor não são reutilizados.

Validação prevista: avançar/reverter e sair da cena horizontal; foco/roda no Ateliê, Competências e Contato; hashes/menu; reduced/no-JS/mobile/baixo; preview/abertura da captura integral; ícones carregados; gravação contínua e comparação temporal. Build/strict/lint e regressões pertinentes antes dos commits.

## Resultado histórico

Implementação concluída nos commits `e0dec50d9c7a408fb78450944e9c18bac8511c67` (ícones autênticos) e `77d2506a2e0d846c4091f7496d14e189054b21a0` (janelas horizontais e correção inferior). Este relatório registra a versão de15/10; o refinamento posterior está em [PHASE_F_REVALIDATION](PHASE_F_REVALIDATION.md) e o estado vigente em [PHASE_F_TRANSITIONS](PHASE_F_TRANSITIONS.md).

Na captura desta versão, Ateliê caiu de2402px para829px em1440×900; Competências manteve1131px ao focar/retomar; as três viewports registradas não apresentaram overflow, erros de página ou violações axe nos estados avaliados. A cena avançou, reverteu e saiu horizontalmente; o link da captura integral e os ícones reais permaneceram disponíveis. `capture.json` preserva as geometrias/estados, `diagnosis-before.json` o defeito anterior e `videos.json` os hashes das gravações brutas locais.

As evidências duráveis desta rodada estão em `scroll-lower-review/`; `manifest.json` registra bytes e SHA-256 dos 42 arquivos originais. São uma fotografia histórica, não a prova final do código atual: o refinamento de17/10 mudou elegibilidade, duração do pin, transições de seção e comportamento das faixas. Vídeos25fps não comprovam60fps/INP; não houve Safari real, dispositivo físico, leitor de tela ou aceite visual global de F nesta rodada.
