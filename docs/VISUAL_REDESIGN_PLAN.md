# Plano do redesign — Fase A

Autorização vigente: **somente A**, pelo master prompt de 2026-10-11; “Continue” retoma esse escopo. Workspace existente `D:\projects\portifolio`; branch já existente `redesign/cinematic-portfolio`; baseline limpo `aa70f4c73008f85731e4f45e528ac2c7f8737d0f`. Origin correto e preservado. Nenhum push/deploy autorizado. Histórico da publicação anterior em LAUNCH não autoriza publicar este redesign.

## Problema e direção exigida

A fundação funciona, mas o contrato anterior retirou justamente os elementos centrais das referências: arco, transformação dimensional e cenas de scroll. A solução é reconstruir apresentação/coreografia onde elas pertencem, mantendo arquitetura, conteúdo, rotas, SEO e mecanismos de acessibilidade/falha. Justificativas por componente em [REDESIGN_AUDIT](REDESIGN_AUDIT.md).

O brief fixa dark-first, neutros/violeta, composição cinematográfica, navegação contínua e mídia real. A Fase A descreve comportamentos observados e critérios; **não escolhe ainda fontes finais, paleta hexadecimal, layout final ou protótipos de B**. BRAND/DESIGN_SYSTEM antigos são o registro da UI atual, não autoridade para rejeitar o novo brief. Em conflito, prevalecem AGENTS atualizado e o pedido do usuário.

## Plano por gate

| Fase               | Entrega delimitada                                                               | Arquivos/responsabilidades                                | Condição para encerrar                                                 |
| ------------------ | -------------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------- |
| A — autorizada     | Auditoria, vídeos, mídia candidata, especificações e continuidade                | Docs/AGENTS e evidências documentais                      | Evidência revisada, critérios mensuráveis, commits locais; solicitar B |
| B — não autorizada | Arte, tipografia/licenças, luz, grid, mobile, estados da ilha e layouts de cenas | BRAND, DESIGN_SYSTEM e protótipos locais apropriados      | Aprovação visual concreta desktop/mobile; nenhum conteúdo fictício     |
| C — não autorizada | Ilha compacta/expandida e transformação                                          | SiteNavigation, CSS, Motion, regressões nav               | C01–C04, vídeo/frames e teclado/reduced/no-JS; solicitar D             |
| D — não autorizada | Hero cinematográfico e entrada                                                   | page.tsx, CSS, wrapper de motion/GSAP                     | D01–D03, composição/CTA e observação de custo; solicitar E             |
| E — não autorizada | Saudação manuscrita e passagem ao hero                                           | HomeMotion, home-sequence, CSS/asset próprio              | E01–E02, watchdog/falhas e gravação; solicitar F                       |
| F — não autorizada | Scroll narrativo e showcases reais                                               | home-reveals, composição de projetos, imagens verificadas | F01–F03, mídia íntegra, reversão/mobile/foco/performance; solicitar G  |
| G — não autorizada | Conteúdo/cases, fotos confirmadas, avatar e favicon                              | src/data, cases, public/images, ícones/metadata           | G01–G03, fontes/limites e verificação de ícones; solicitar H           |
| H — não autorizada | QA e correção de defeitos                                                        | testes, CSS/componentes afetados, VERIFICATION            | H01–H04, comparação final, riscos explícitos; solicitar I              |
| I — não autorizada | SEO, segurança, proveniência e checklist                                         | site config/metadados/docs                                | I01, validar novamente favicon/OG; push/deploy separados               |

O favicon fica explicitamente alocado em G e verificado novamente em I; o master prompt o exige, embora a lista de fases só mencione sua verificação final. Pode-se reaproveitar avatar na ilha C após validação de proveniência; isso não autoriza implantar favicon na Fase A.

## Sequência de decisões e implementação futura

1. B aprova uma composição fundamentada nos quadros; evita repetir a transformação de referências em sugestões genéricas. Definir variações mobile e reduced junto com desktop.
2. C troca apenas apresentação/transição da ilha; manter handlers, âncoras, estado ativo e regressões. Adicionar Motion já instalado onde layout contínuo oferece benefício comprovável.
3. D/E reaproveitam ciclo de vida e watchdog; separar wrapper da entrada do wrapper de scroll. Garantir hero útil sem intro.
4. F começa com screenshots disponíveis, sem bloquear a cena técnica por fotos pessoais ausentes. Galeria de experiências só entra com mídia/contexto reais; nunca marcar essa parte concluída se ainda faltar.
5. G melhora cases existentes; não criar outra aplicação, CMS, página vazia ou serviço. Conferir fonte e data antes de atualizar afirmações.
6. H mede o sistema completo novamente. Resultados Lighthouse antigos não transferem para novas fontes, imagens e timelines. I prepara release e aguarda autorização externa.

## Dependências, limites e decisões pendentes

- Fotografias do LinkedIn: authwall/999; não foram encontrados URLs de posts acessíveis. Para a narrativa pessoal, solicitar arquivos originais e links/contexto de evento/data/pessoas. Não bloqueia B/C/D; bloqueia a aceitação da integração dessas fotos em F/G.
- Avatar GitHub atual é leão ilustrado, não foto humana. O requisito exato pode ser cumprido com ele; não há justificativa para inventar retrato. Se o usuário atualizar o perfil, reconferir fonte antes de gerar favicon.
- Industry Week: deployment acessível, main e SHA de Pages distintos. Captura representa deployment observado; não dizer que é build do main. Mobile observado tem limitações, registradas no inventário.
- Ateliê: screenshots autênticos já existem; sem deployment público confirmado. README mantém direitos sobre marca/fotos; revisar autorização de uso no portfólio antes de publicação proeminente.
- RoboSense: mídia de gravação M3, não comprova Raspberry Pi, bola infravermelha ou atuação de motores. Preservar esses limites nas legendas.
- Riscos de tooling antigos: ESLint 9 sem suporte e alertas de desenvolvimento documentados; não alterar lock/dependências em auditoria visual. Reavaliar antes da release.
- Qualquer nova fonte exige licença e prova de benefício; Three.js somente se B demonstrar necessidade real não atendida por CSS/SVG. Nenhuma biblioteca nova autorizada/instalada nesta fase.

## Commits e revisão

Separar referências/proveniência, auditoria/pesquisa e especificações/continuidade em unidades revisáveis. Antes de cada commit: Prettier nos documentos do grupo, links locais/JSON/imagens íntegros, diff sem erros, staging explícito e revisão contra baseline. Não incluir `.audit`, vídeos MP4/WebM, builds, dados privados, `.env` ou alterações preexistentes. Registrar SHAs em HANDOFF; o próprio commit de fechamento é identificado por `git log -1`, evitando autorreferência impossível.

Critérios completos em [VISUAL_ACCEPTANCE_CRITERIA](VISUAL_ACCEPTANCE_CRITERIA.md). Próximo passo permitido após fechar A: apresentar resultados e aguardar **aprovação explícita da Fase B**.
