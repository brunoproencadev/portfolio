# F — competências e entrada dos ícones, 18/10/2026

Pedido: concluir as pendências, completar Competências e aplicar ao carrossel o surgimento do primeiro pop-up com atraso em relação à imagem, mantendo RoboSense. Pendências anteriores fechadas em `41eec81` e `6d5e46b`; esta adição parte dessa árvore limpa e preserva Museu/Industry Week/Ateliê/kord.

Fonte: `f2cb592db74430f344eeb082120c4a764584d32a`. Confirmação final30/30 E2E (carousel-arrival/section-transitions/robo-handoff), Chromium/Firefox/WebKit, dois workers, sem retries/skips. O commit documental deste relatório fecha evidências e gate.

## Entrega e decisões

- Competências passa de três para cinco grupos. **Ambientes virtuais** reúne Unity/C#, com participação declarada em projeto compartilhado; **Identidade visual na web** reúne HTML/CSS/JavaScript/GSAP, com contexto acadêmico da marca fictícia kord. As tecnologias vêm dos dados existentes dos projetos e os links apontam para seus repositórios. Fontes já auditadas em [PHASE_F_PROJECTS](PHASE_F_PROJECTS.md); nenhuma experiência, contribuição Git ou resultado adicional foi inventado.
- Os quatro grupos do carrossel passam de opacity0/scale0,55/y28 a opacity1/scale1/y0, com `back.out(2.6)`, a mesma curva e geometria inicial do RoboSense. A imagem entra antes: atraso240ms, duração650ms, stagger45ms. O IntersectionObserver mantém o limiar existente de50% da área visual. Ao sair, o grupo retorna ao início; reentrar repete a chegada, sem loop em repouso.
- Timeline, posição e comportamento do RoboSense permanecem intactos, inclusive o bounce compacto existente. A nova ramificação do owner atinge somente `.story-visual`. Reduced/no-JS deixam todos os ícones visíveis; aba oculta encerra a entrada; cleanup desconecta observer/listener e elimina referências, ignorando callbacks tardios.
- A nota final de estudos conserva o deslocamento, com opacidade integral durante toda a passagem: a primeira inspeção mobile encontrou contraste insuficiente quando a nota aparecia parcialmente na borda inferior.

## Verificação e comparação

Build Next/TypeScript strict, lint completo e7/7 unitários aprovados. O teste editorial antes aceitava somente os três cases como evidência; agora reconhece também os dois projetos adicionais já documentados. Nenhuma mudança nas rotas ou número de cases.

Primeira rodada E2E:45/48, com três falhas do novo teste de reentrada desktop: ele tentava focar novamente o mesmo elemento que ainda detinha foco, sem gerar evento nem voltar à seção. Corrigido para retornar à posição de leitura por scroll. Rodada seguinte:15/18; a verificação genérica de saída ainda tratava o texto sticky RoboSense como seção em fluxo (dois casos) e a amostra fixa do Firefox terminava durante o overshoot (um caso). RoboSense mantém sua prova específica em robo-handoff; o teste agora aguarda a escala final por polling. Uma tentativa posterior do processo encerrou antes de produzir resultados (`-1073740791`); repetida sem redirecionamento. Resultado final registrado em VERIFICATION/HANDOFF, sem retries automáticos nem omissão das tentativas.

Duas rodadas visuais agrupadas em1440×900 e375×812, com capturas e gravações reais. Confirmação:22 estados, zero overflow/pageerrors, axe sem violações nos estados examinados, incluindo a nota mobile corrigida. [Estados](skills-arrival-review/browser.json), [sequência desktop](skills-arrival-review/1440-sequence.jpg), [sequência mobile](skills-arrival-review/374-sequence.jpg), [competências mobile](skills-arrival-review/375-kord-skill.jpg), [gravações e hashes](skills-arrival-review/recordings.json). WebMs de11,8s/9,88s a25fps em `.audit/phase-f-arrival/confirmed`; pranchas amostram a chegada a cada0,2s. São evidências de sequência, não medição de60fps. O WebM desktop conserva artefatos de composição em certos quadros de troca, limite já registrado em PHASE_F_REVALIDATION; capturas e testes funcionais não indicaram overflow ou falha de carregamento.

Revisão própria do diff, fontes, proporções, texto, foco e cleanup. Sem dependências ou novos assets de produto. Sem Lighthouse/INP, Safari ou dispositivos físicos, leitor de tela e aceite perceptual novos. Snapshot auxiliar do Impeccable permanece anterior a DESIGN.md; sincronização separada, fora desta adição. F continua para avaliação do usuário; G–I e push/deploy exigem autorização específica.
