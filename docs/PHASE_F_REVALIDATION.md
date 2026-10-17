# F — revisão do scroll inferior em 16/10/2026

O usuário pediu continuar o projeto e confirmou **“Continuar revisão e ajustes da Fase F”**. Esta retomada revisa o trabalho já implementado; não aprova F nem inicia G–I. Home local: http://127.0.0.1:3102/.

Fechamento documental retomado em 17/10 após “Continue”. A tentativa anterior de staging não foi executada por indisponibilidade da revisão automática (limite de uso). As provas de 16/10 foram conferidas contra a fonte inalterada; não houve repetição da suíte apenas para concluir a documentação.

## Estado e alcance

- `e0dec50d9c7a408fb78450944e9c18bac8511c67`: ícones autênticos das ferramentas, já presentes ao iniciar.
- `77d2506a2e0d846c4091f7496d14e189054b21a0`: janelas horizontais e correção do scroll inferior, já presentes ao iniciar.
- `417fca9cd885426713edf54a21bdc5ae6c240cfa`: novas evidências desta revisão, testes e limites.

O código existente atende aos caminhos funcionais examinados. Não houve alteração de `src`, testes, dependências, dados, navbar ou passagem hero→RoboSense nesta retomada. Foram rastreados os owners `HomeMotion`/`startReveals`, a composição `SelectedWork`, CSS e regressões correspondentes antes da validação.

Os 47 arquivos preexistentes foram preservados byte a byte e ficaram fora dos commits desta retomada: `AGENTS.md`, documentação de mídia/movimento/referências, o rascunho local `PHASE_F_LOWER_REVIEW.md` e sua pasta de evidências. Este relatório autônomo atualiza a continuidade sem incorporar esse trabalho pendente. O antigo relatório de integração descreve a versão anterior à cena horizontal.

## Comportamento verificado

Industry Week e Ateliê compartilham um trilho de duas colunas: texto, estado e janela se deslocam juntos; o único pin termina e devolve a página ao fluxo vertical. O movimento é reversível, com os links reais fora da máscara. O preview do Ateliê tem altura limitada e mantém acesso à captura integral. Competências conserva a mesma geometria após foco/roda ou retomada de âncora. Reduced motion, viewport baixo/mobile e ausência de JavaScript mantêm conteúdo acessível.

Na captura nova, o Ateliê mede 829px em 1440×900, 864px em 1920×1080 e 1464px no fluxo mobile de 375×812. A altura de Competências fica em 1131px nos dois desktops; o teste de foco verifica que a roda não reconstrói o layout.

## Comparação visual

A referência `4.mp4` foi reconferida por SHA-256 `58ed14b63e7d8753569c26750023c34d7abe740deb7f7e0bb965eb983e753460`. [Novos quadros consecutivos](scroll-revalidation-review/reference4-sequence.jpg), a cada 0,5s: entrada vertical 18,5–20s, trocas laterais 20,5–21,5s e 22,5–23,5s, saída vertical 24,5–26s.

Na [gravação local](scroll-revalidation-review/horizontal-sequence.jpg), 7–13s mostram a troca Industry→Ateliê; 15s registra a reversão e 17s a saída vertical. [Trecho inferior](scroll-revalidation-review/lower-sequence.jpg): Ateliê em 21s, painel Sobre em 25–27s, Competências em 29–31s e Contato em 33–35s. Tempos pertencem ao arquivo de vídeo, não são durações fixas da animação. O ritmo depende da roda.

Diferenças mantidas: dois projetos na faixa, em vez dos três de R4; conteúdo detalhado e links seguem no fluxo; sem fotografias pessoais, mosaico ou objeto 3D inventados. O painel Sobre conserva uma adaptação tipográfica. Não foi demonstrada equivalência integral de composição ou easing com as referências.

**Limite de captura ainda aberto:** alguns quadros intermediários dos WebMs mesclam partes das duas imagens. Isso ocorreu tanto no headless shell quanto na [comparação com Chromium completo](scroll-revalidation-review/full-browser-sequence.jpg), sem mudança de CSS. Não apareceu nas capturas estáticas nem nos estados inspecionados no Chrome aberto, inclusive em 1440×900. A causa não foi estabelecida; não tratar o WebM como prova de renderização impecável nem afirmar que um defeito visual foi corrigido. Os arquivos foram mantidos para revisão, sem ocultar os quadros afetados.

## Provas e falhas

| Verificação                          | Resultado desta retomada                                                               |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| Build de produção local e TypeScript | Passam; aviso conhecido de `metadataBase` usando localhost no perfil local             |
| ESLint completo                      | Passa, zero warnings                                                                   |
| Vitest                               | 7/7, cinco arquivos                                                                    |
| Playwright focado                    | 63/63, Chromium/Firefox/WebKit, dois workers, sem retries, skips ou falhas             |
| Capturas                             | 33 estados em 1440×900, 1920×1080 e 375×812; sem overflow ou pageerrors                |
| Axe                                  | Zero violações nos estados finais de Contato dos três viewports; não certifica WCAG    |
| Evidências                           | JSON/formato/hashes verificados; [manifesto](scroll-revalidation-review/manifest.json) |

Comando E2E: `node node_modules/@playwright/test/cli.js test tests/e2e/lower-scroll.spec.ts tests/e2e/storytelling.spec.ts tests/e2e/hero-tools.spec.ts --workers=2`. [Resumo durável](scroll-revalidation-review/verification.json). Não é execução integral da suíte do repositório. Eventos de BFCache são sintéticos.

A primeira tentativa dentro do sandbox apresentou `browserContext.newPage: Target crashed` no Firefox e foi interrompida; não se atribui total de passes a essa rodada. Um diagnóstico separado também caiu ao criar uma página vazia, antes de qualquer navegação. O mesmo diagnóstico fora do sandbox abriu a home; a confirmação completa acima passou fora do sandbox. Nenhuma proteção do navegador ou limite de teste foi desativado.

Gravações locais de 35,84s, 35,84s e 23,04s a 25fps, mais a comparação de 7,84s em Chromium completo. Vídeo mobile codificado em 374px; viewport e screenshots em 375px. [Metadados/hashes](scroll-revalidation-review/recordings.json). Player local: `.audit/phase-f-resume-20261016/review.html`; logs, traces e vídeos brutos permanecem ignorados.

## Decisões e próximo passo

Preservar a implementação funcional existente, sem alterações especulativas para o artefato observado apenas nas gravações. A home e as novas evidências ficam disponíveis para avaliação visual das ferramentas e do trecho inferior; F permanece aberta. Se o defeito de composição também aparecer no navegador do usuário, reproduzir essa condição antes de editar o owner responsável.

Sem novo Lighthouse/INP, dispositivo físico, Safari real, leitor de tela ou parecer independente. Nenhum push/deploy. Após aceite global de F e autorização específica, G tratará conteúdo/cases e mídia factual disponível; não foi iniciada.
