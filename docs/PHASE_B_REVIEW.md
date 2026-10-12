# Revisão visual — Fase B

Proposta estática revisada em 2026-10-12, pronta para aprovação visual do usuário. [Home documental](design-prototype/index.html), [prancha de estados](design-prototype/states.html), [direção](VISUAL_DIRECTION.md) e [componentes](COMPONENT_SPEC.md). Usuário autorizou B por “Pode começar a fase B”; C ainda não autorizada.

Não confundir B com implementação de C–F. Produção e arquivos src/test/config/lock preservados. Não há animação de ilha, intro, entrada ou scroll implementada no protótipo; ele permite inspecionar composição e estados.

## Entrega revisável

- BRAND/DESIGN_SYSTEM: identidade, paleta, fonte licenciada, escala, grid, profundidade, foco e tokens de movimento futuros.
- VISUAL_DIRECTION/COMPONENT_SPEC: composição de home, estados da ilha, hero, intro, projetos, uso de fotos e adaptação de cases/erro/404.
- HTML/CSS isolados em docs/design-prototype: home completa com mídia real e prancha de estados; zero mudança em src ou dependências.
- DESIGN.md e sidecar Impeccable: snapshot dos tokens do estudo, identificado como proposta, com ligação ao contrato detalhado.

## Evidência visual

| Cena                           | Captura                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Hero 1440×900                  | [desktop](design-review/home-1440.jpg)                                                                                          |
| Hero 1920×1080                 | [desktop amplo](design-review/home-1920.jpg)                                                                                    |
| Hero 375×812                   | [mobile](design-review/home-375.jpg)                                                                                            |
| Home mobile completa           | [fluxo vertical](design-review/home-375-full.jpg)                                                                               |
| Ilha aberta / foco visível     | [desktop](design-review/island-open-1440.jpg), [mobile](design-review/island-open-375.jpg)                                      |
| Industry Week                  | [faixa editorial](design-review/industry-1440.jpg)                                                                              |
| Ateliê                         | [composição assimétrica](design-review/atelier-1440.jpg)                                                                        |
| Sobre / competências / contato | [sobre](design-review/about-1440.jpg), [competências](design-review/skills-1440.jpg), [contato](design-review/contact-1440.jpg) |
| Storyboard                     | [desktop](design-review/states-1440.jpg), [mobile](design-review/states-375.jpg)                                                |

Screenshots após fonte e imagens carregadas. Recortes de seções começam nos limites do container; não representam ausência de gutter na página. Os screenshots de aplicativos continuam íntegros; não são mockups inventados. Capturas de B não são baseline visual aprovado até o usuário escolher a direção.

## Comparação com os vídeos

| Item       | Observação da referência                                   | Resultado B / decisão                                                                                                                                                                                  |
| ---------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ilha       | R1 3,7–4,3s: ~322×54→404×368, centro/topo constantes       | Protótipo desktop 322×60→404×365,39; mesma identidade/superfície. Compacta 6px mais alta para conteúdo/alvo; largura +25,5%. Geometria estática próxima; continuidade temporal ainda C.                |
| Hero       | R2 4,8s: grande arco, halo interior, texto/CTAs centrais   | Arco vetorial de três camadas; vértice y590 em1440×900, nome y≈180. Apoios/CTA acima da borda. A luz é mais fina que a banda da referência; é proposta de intensidade, não equivalência pixel-perfect. |
| Mobile     | Nenhum vídeo demonstra mobile                              | Arco mais largo que viewport, recorte somente decorativo; evita curva em U e borda passando pelos botões. Ordem vertical, sem pin. Adaptação autoral.                                                  |
| Intro      | R3 2,1–7,2s: traço progressivo, repouso, retração          | Storyboard “olá” original: forma parcial/completa/revelação; 1450ms propostos. Execução real/watchdog/escrita ainda E.                                                                                 |
| Projetos   | R3 22,8–25,2s: faixa clara, imagem central, troca vertical | Industry Week em faixa clara e imagem central, RoboSense escuro, Ateliê assimétrico. Escala/posição intermediária diferenciadas na prancha. Scrub, fundo derivado e troca vertical ainda F.            |
| Fotografia | R3 usa fotos pessoais reais                                | Não copiadas. Sobre textual completo enquanto originais/contexto do LinkedIn faltam.                                                                                                                   |

## Provas executadas

Chromium **156.0.8078.4**, Windows, Playwright instalado; servidor estático limitado a docs, localhost3102, encerrado em finally. [Resultados estruturados](design-review/results.json), capturados em 2026-10-12.

- Larguras320/375/768/1440/1920, alturas812/900/1080: sem overflow horizontal; quatro imagens decodificadas; Manrope pronta, com amostra “Proença competências visão”.
- Axe: **zero violações em dez estados** (home fechada/aberta em cinco larguras). Não certifica WCAG nem inclui leitor de tela.
- Disclosure nativo: Enter abre, Espaço fecha; dimensões medidas. Sem JS: disclosure e conteúdo operáveis. Não prova os handlers futuros de Escape, active section, foco de destino ou clique externo.
- Reduced motion: nenhuma animação ativa no estudo estático. Não prova cancelamento de futuras timelines em execução.
- Zero pageerrors. Não foram testadas falhas de rede/mídia neste estudo.
- Pares sRGB: foreground/background18,14:1; muted/background9,91:1; muted/surface8,08:1; accent/surface7,67:1; ink/paper15,26:1; paper-muted/paper6,52:1; control/surface4,24:1.
- Fonte24.836 bytes e OFL4.387 bytes: hashes conferidos contra source.json. OFL preservado byte a byte, inclusive espaço final upstream na linha21; exceção conhecida de git diff --check, sem editar a licença para esconder o aviso.
- `git diff 72d5877 -- src public tests package.json package-lock.json next.config.ts tsconfig.json`: vazio. Sem novo build/unit/E2E da aplicação ou Lighthouse; não necessários para alteração documental isolada. Resultados antigos permanecem históricos.

Método local reproduzível no workspace: `node .audit/phase-b/check-prototype.mjs`. Script de captura temporário permanece ignorado; resultados/capturas e manifesto são duráveis. Também é possível abrir index.html diretamente para inspeção manual sem servidor.

## Revisão e correções

Duas passagens próprias de composição: corrigidos arco mobile muito fechado, distância entre CTA e luz, legibilidade do “á” e quadros de scroll inicialmente iguais. Recaptura adicional corrigiu artefato de skip link fora da viewport em recorte longo, sem alterar o screenshot do projeto. Skip fica recortado até foco, acessível ao teclado.

Detector Impeccable executado uma vez: um warning de contraste em hover foi corrigido com `.skip:hover` em ink. Cinco warnings de cramped-padding não correspondem ao render: margem do container interno em Industry Week, padding-block de112px em Sobre e28px nas linhas de competências. Revisor conferiu capturas/CSS, sem pedir remoção desses espaçamentos. Detector não equivale a aprovação visual.

Revisor independente `impeccable_finish_reviewer`: **ship no escopo estático B**, sem bloqueios materiais. Inspecionou 13 capturas, quatro pranchas reais R1/R2/R3, HTML/CSS, contratos e resultados. Dois detalhes P3 corrigidos: legenda da ilha passou a indicar “Até404px; adaptada no mobile”; estado aberto da home agora usa X como a prancha. Correções recapturadas e verificadas pelo mesmo revisor: ambos resolvidos. Esse parecer não aprova C ou publicação.

Falhas preservadas: primeira aquisição de fonte retornou TTF com user-agent incompleto; repetição com identificação completa obteve WOFF2. Primeira execução axe exigiu browser.newContext; harness corrigido, sem relaxar asserções. Interrupção de ferramenta por limite da revisão automática impediu atualização documental; retomada conferiu arquivos antes de continuar.

## Limites e próximo gate

Não comprovados nesta fase: timings/easing/continuidade de animação, pin/scrub/reversão, zoom200%, leitor de tela, dispositivos físicos, fontes em Next/CLS, LCP/INP, ícones/favicon e integração de fotos pessoais. Ateliê ainda exige consideração dos direitos de publicação; captura local não demonstra loja online. Fonte e imagens do protótipo não foram integradas ao app.

Solicitar aprovação desta direção e **autorização da Fase C: implementar somente a ilha dinâmica**, preservando handlers/semântica e validando dimensões, animação real, teclado, responsive, reduced e no-JS. Não iniciar hero/intro/scroll automaticamente. Push e deploy continuam exigindo autorização separada.
