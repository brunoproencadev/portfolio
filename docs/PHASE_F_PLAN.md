# Fase F — cenas de projetos e scroll

Autorizada pelo “continue” em resposta ao gate E/F, 2026-10-13. Baseline limpo6881228. Apenas F; G–I e publicação exigem autorização separada.

## Preservar / reconstruir

KEEP: ilha C, hero D, intro E, dados factuais, cases/ilustrações dos cases, SEO, links e lifecycle HomeMotion.
REBUILD: grade repetitiva da home; esquemas conceituais cedem lugar às mídias reais auditadas. Justificativa: não reproduz a hierarquia, a escala e a continuidade das referências R2/R3.
IMPROVE: startReveals assume o scroll das cenas, no mesmo owner e cleanup existentes. Sem biblioteca adicional.
REMOVE: animação idêntica de entrada nas mídias antigas; CSS da grade sem uso, preservando estilos usados nos cases.

## Composição e movimento

- RoboSense: frame M3 amplo, título e contexto lateral. Aproximação da mídia de escala0,88/y64 até escala1/y0 durante entrada no viewport; máscara abre de6% a0. R2 6,3–8,7s informa a passagem, sem alterar wrappers de entrada D/E.
- Industry Week: faixa clara com título/links laterais e screenshot central. Um único pin desktop, largura≥900 e altura≥700; extensão120svh. Captura hero permanece no primeiro35%, troca vertical35–65%, captura das eras permanece até100%. Fundo ampliado escurecido deriva das mesmas capturas, com crossfade durante a troca. R3 22,8–25,2s. A referência troca projetos, a adaptação mostra dois estados verificados do mesmo projeto; diferença explícita.
- Ateliê: screenshot vertical integral em coluna, texto ao lado; sem segundo pin. Original do repositório, execução local documentada, não deployment público.
- Texto factual e todos os links ficam sempre no DOM/fluxo. Nenhum link dentro de slides mascarados. CSS SSR mostra ambas as capturas Industry sequencialmente; só o contexto GSAP ativo aplica palco compacto.
- Mobile, viewport baixo, reduced, hash direto, falha de import: fluxo sequencial. Foco/hash/pagehide/preferência em execução revertem tudo. Resize usa gsap.matchMedia com cleanup. Sem autoplay/loop/scroll hijack.

## Provas e limites

Testar assets carregados/proporções, duas imagens no fallback, pin único≤180svh, scroll normal/reverso/rápido, resize, teclado, hash, retorno de rota, reduced em execução, no-JS e falha de chunk. Capturas320/375/768/1440/1920 e gravações reais desktop/mobile. Axe, build/lint/strict e regressões relevantes. Medições locais com condições registradas, sem alegar INP de campo.

Fontes: docs/reference-video-audit/r2-scroll.jpg e r3-projects.jpg, derivados dos vídeos locais reais analisados em A; docs/media-audit/manifest.json. Segundos observados não revelam easing original. Fotografias pessoais aguardam originais/contexto: pergunta opcional enviada; não bloquear mídias já verificadas. Direitos de marca/fotos do Ateliê precisam de revisão antes de publicação proeminente; F é somente local.
