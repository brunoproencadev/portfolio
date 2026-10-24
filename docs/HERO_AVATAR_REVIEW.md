# Easter egg no “o” de Bruno — 24/10/2026

Solicitação autorizada pelo usuário: ao passar o mouse pelo “o” de “Bruno”, substituí-lo pelo avatar de perfil e retornar após 1s, com transição. Fonte `6e9575a`; implementação local, sem autorização de push/deploy ou mudança de fase.

## Entrega e decisões

- Somente a última letra do primeiro nome recebe o efeito. O avatar é o leão exato já utilizado na navbar, reutilizado de `public/images/profile/github-avatar.png`; não foi criada uma fotografia nem alterado o asset. [Proveniência e hash](hero-avatar-review/asset.json).
- O ciclo completo dura1000ms: a letra sai com leve deslocamento/desfoque, o avatar entra com escala/rotação discretas, permanece visível no intervalo central e devolve a letra ao terminar. A sequência termina mesmo com o cursor parado e reinicia em uma nova entrada, inclusive antes de o ciclo anterior terminar.
- Animações nativas Web Animations API em um componente cliente restrito à letra. As cenas GSAP continuam controlando seus contêineres; não há disputa de propriedades no mesmo elemento, biblioteca nova, timer ou loop permanente.
- O nome conserva seu espaço durante a troca. `aria-label` usa o nome completo dos dados para evitar a leitura fragmentada “Brun o”; a imagem é decorativa e não cria parada de teclado. Reduced motion usa apenas opacidade; mudança de preferência cancela o efeito imediatamente. Cleanup cancela animações e remove os dois listeners. Toque não aciona este efeito de mouse; falha de imagem/API deixa a letra disponível.
- A imagem mantém proporção circular e recebe baixa prioridade de rede. Não foi medido ganho de performance ou novo LCP neste incremento.

## Provas e histórico

Build final e TypeScript strict, lint completo,9/9 unitários, formato dos quatro arquivos de fonte/testes e diff-check: PASS. A primeira tentativa de build encontrou o alerta de segurança do Next; a repetição passou. A dependência não foi atualizada.

E2E focados de produção: **75/75 PASS**, zero falhas/skips/retries, Chromium/Firefox/WebKit, em hero-avatar, hero, hero-tools e intro. Incluem9 novos cenários (três por motor) para duração/repetição sem deslocar o nome, opacidade sem movimento e mudança de preferência em execução, e fallback com imagem indisponível. A opacidade é amostrada por frames: avatar visível e letra ausente no meio do ciclo, estado original após1150ms. A intro sem JavaScript permanece coberta pela suíte selecionada. Não foi repetida a suíte completa dos cases neste incremento.

A primeira execução foi interrompida após detectar regressões no nome acessível, corrigidas com o rótulo completo. Uma execução intermediária completou73/75, com duas falhas de prontidão da intro congelada no WebKit. A confirmação final75/75 usa a mesma suíte, sem alterar os testes antigos ou acrescentar retries. [Resumo, contagens e erros anteriores](hero-avatar-review/verification.json). Brutos em `.audit/hero-avatar-e2e*.json` e contextos iniciais em `.audit/hero-avatar-first-failures`.

Inspeção visual em lote1440×900/375×900 e uma confirmação após ajustar o easing por segmento e retirar o limite de largura herdado do Tailwind. No estado central, opacidade1 e avatar quadrado62,23px/25,59px; ao terminar, opacidade0; zero pageerrors nas duas sequências. [Geometria](hero-avatar-review/browser.json), [desktop](hero-avatar-review/avatar-1440.png), [mobile](hero-avatar-review/avatar-375.png), retorno [desktop](hero-avatar-review/restored-1440.png)/[mobile](hero-avatar-review/restored-375.png). Gravações reais: [desktop](hero-avatar-review/hover-1440.webm) e [viewport estreito](hero-avatar-review/hover-375.webm). O hover em viewport estreito foi exercitado com mouse emulado, não em aparelho físico.

Quatro arquivos que já estavam modificados continuam preservados e fora destes commits. O preview está em <http://127.0.0.1:3116/>. Próximo passo: avaliação perceptual do usuário. H03 e a atualização de segurança do Next16.4.0 para16.4.3 continuam pendentes; não publicar nem iniciar I automaticamente. O SHA deste fechamento documental pode ser consultado com `git log -1 -- docs/HERO_AVATAR_REVIEW.md`.
