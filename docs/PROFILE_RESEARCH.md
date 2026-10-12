# Pesquisa de perfil — revisão da auditoria 2026-10-09

## Atualização verificada — redesign Fase A, 2026-10-11

Pesquisa pública refeita: README dos três projetos/perfil, arquitetura e validação M3 do RoboSense, VERIFICATION do Ateliê, package.json/App.tsx do Industry Week. API pública confirmou os mesmos heads P2/P3/P4 da tabela histórica abaixo. Não foram executados os testes/hardware desses projetos. Fontes e cópias de mídia agora têm manifesto em [MEDIA_ASSETS](MEDIA_ASSETS.md).

- **Industry Week:** aplicação real acessada em Chromium 1440×900 e 390×844, HTTP 200, sem pageerrors. Fontes/imagens/vídeos carregados, tema claro e navegação “4 Eras” exercitados. Último deployment Pages consultado: `b22aa4b46d934fa9f164df3508c55d64cdb19156`, distinto do main `68ab01a95b770f28d66a8f76fb6f138e4c8edbd6`. Screenshots documentam deployment observado; não atribuir automaticamente a ele toda característica de main. Mobile capturado tem tipografia comprimida e controle cortado; não alegar QA integral ou responsividade perfeita. Sem envio de formulário.
- **RoboSense:** README/arquitetura/validation-m3 reconfirmam pipeline de percepção e associação em vídeos gravados; mídia M3 autêntica disponível no repositório. `has_pages=false`, homepage vazia e consulta de deployments sem entradas; nenhum site independente confirmado. Artefatos não comprovam execução física na Pi nem integração GIGA/motores. Resultados quantitativos M3 são da execução documentada, com 79 anotações aproximadas/sem holdout; não são novo benchmark desta auditoria.
- **Ateliê:** README e VERIFICATION mantêm frontend local validado, sem deploy/CMS confirmado. Capturas reais `docs/screenshots/home-desktop.png` e `home-mobile.png` acessíveis na revisão P4. Homepage vazia, Pages desativado, deployments consultados vazios; não declarar inexistência universal de hospedagem. Direitos sobre marca/fotos permanecem reservados no README.
- **Avatar:** fonte pública GitHub `https://avatars.githubusercontent.com/u/271389368?v=4`, PNG 460×460, atualmente leão ilustrado. É a identidade exata a usar no futuro favicon, não fotografia humana. Download local e hash registrados; nenhum ícone foi alterado em A.
- **LinkedIn:** tentativa pública redirecionou para authwall com HTTP 999. Não foram acessados posts nem confirmadas fotografias/experiências específicas. Manter URL do perfil; pedir originais/URLs/contexto para F/G. Nenhum login/antibot contornado.

Triagem adicional de repositórios **públicos**: `pov-journal` tem README de plataforma editorial Next/Prisma/NextAuth, mas execução/deploy/resultado não foram demonstrados; `workshop-springboot4-jpa` tem README apenas com título, insuficiente para elevar a projeto principal; `ingrid-virtualassistant` declara planejamento de hackathon e automação ainda não implementada/integrada/testada. Não ampliar a seleção principal para inflar quantidade; não transformar o planejamento do Ingrid em produto operacional. Conteúdo de repositórios privados não integra esta pesquisa publicável.

Os três projetos prioritários continuam sendo a seleção mais sustentada nesta auditoria. O conteúdo implementado foi preservado; revisão editorial/mídia ocorre nas fases aprovadas. As seções seguintes são histórico de pesquisa, complementado por esta atualização.

## Método e proveniência

Leitura pública via conector GitHub; conferência dos heads com git ls-remote. Fontes mutáveis foram lidas em main; SHAs abaixo identificam o estado consultado no mesmo período. Resultados dos outros projetos não foram reexecutados nesta auditoria.

| ID  | Repositório / head main                                                                                                   | Arquivos e fatos sustentados                                                                                                                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1  | [Perfil](https://github.com/brunoproencadev/brunoproencadev/tree/f72066beeddc0657c7ef7738da3f6bb19f555535)                | README: aspiring software engineer, interesses Java/Spring e Python/AI/ML/visão, robótica e e-mail público. Autodeclaração não comprova domínio ou prêmio específico.                  |
| P2  | [RoboSense](https://github.com/brunoproencadev/robosense-lab/tree/593768ee3d3f2f861f15beb83459131579e85104)               | README, pyproject.toml, docs/architecture.md: Python >=3.11, NumPy/OpenCV/PySerial; pipeline separado do controle GIGA; simulação M1/M2, gravações M3 e ensaios ao vivo experimentais. |
| P3  | [Industry Week](https://github.com/brunoproencadev/industry-week-senai-prj/tree/68ab01a95b770f28d66a8f76fb6f138e4c8edbd6) | README, package.json, index.html e src/App.tsx: React/TypeScript/Vite/Tailwind, GSAP/Motion/Lenis usados; capítulos históricos, tema, mídia e painéis.                                 |
| P4  | [Ateliê](https://github.com/brunoproencadev/atelie-ingridxavier/tree/66969cf8354c3063807a98069354d78303defdf7)            | README, package.json, docs/VERIFICATION.md: Next/React/TypeScript, catálogo local e WhatsApp; evidências de QA local, sem CMS/checkout/deploy confirmado.                              |

Identidade “Bruno Proença Silva”, objetivo de desenvolvedor em formação e URLs GitHub/LinkedIn foram fornecidos diretamente pelo usuário. E-mail brunoproencasilva@gmail.com consta no README público P1; a configuração privada do Git não foi usada como autorização de publicação de contato.

## Matriz de afirmações

| Afirmação                                   | Evidência                         | Uso editorial                                                             |
| ------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| Desenvolvedor em formação                   | Briefing + P1                     | Permitido na hero; sem senioridade inferida                               |
| Uso de Python/OpenCV e TypeScript/React     | P2/P3/P4                          | Competências utilizadas, sem porcentagem                                  |
| Java/Spring e IA/ML                         | Autodeclaração P1                 | Interesse/estudo declarado; não listar como domínio comprovado            |
| Experiência relacionada a evento SESI/SENAI | README P3                         | Contexto do projeto; não comprova matrícula, emprego ou certificação      |
| Tracking em vídeo real                      | P2                                | Descrever como vídeo gravado, distinto de hardware ao vivo                |
| Raspberry Pi validada / motores integrados  | P2 declara limites                | Não publicar como realizado                                               |
| Ateliê passou em testes                     | P4 VERIFICATION                   | Atribuir à execução documentada, não dizer “retestado por esta auditoria” |
| Agendamento funcional no Industry Week      | App.tsx P3 contradiz essa leitura | Não afirmar: handleRegister apenas atualiza estado local/feedback         |
| Premiações específicas/formação/emprego     | Sem evidência suficiente          | Omitir até confirmação                                                    |

## Contradições resolvidas e lacunas

Industry Week: README mistura instruções antigas para index.html com stack React. index.html importa /src/main.tsx e App.tsx confirma implementação React; prevalece o código. Dependência instalada não implica feature; nenhuma integração de IA foi inferida de @google/genai.
Formulário de visita no App.tsx mostra sucesso local e mensagem de contato futuro sem persistência comprovada. Os textos do portfólio descrevem a experiência histórica, não agendamento real.
RoboSense: evitar “IA treinada” ou “detecção validada de bola infravermelha”; detector HSV de bola laranja e pipeline experimental são as descrições sustentadas.
Ateliê: métricas registradas de testes e catálogo existem na fonte, mas cartões não as usam como prova de desempenho comercial.

LinkedIn retornou HTTP 999 na pesquisa inicial; sem contornar autenticação. Formação, datas acadêmicas, competições, empregos e conquistas permanecem sem confirmação. O perfil declara medalhista; faltam modalidade, evento, data e evidência específica. A omissão dessas informações permite continuar sem inventá-las.

## Links e recursos

Reconferência da Fase 6, 2026-10-10: git ls-remote confirmou os mesmos heads P2/P3/P4; README de RoboSense/Industry Week e VERIFICATION do Ateliê relidos nas revisões fixas acima. Nenhum resultado de outro projeto reexecutado. Cases usam links blob com SHA, não fontes mutáveis em main. Os diagramas são autorais do portfólio, com origem registrada em docs/ASSETS.md; fotografias e vídeos externos não foram incorporados.

- GitHub dos projetos: repositórios públicos consultados com sucesso; head main registrado acima.
- Demo Industry Week: https://brunoproencadev.github.io/industry-week-senai-prj/ respondeu HTTP 200 a HEAD nesta auditoria; isso verifica disponibilidade, não QA funcional.
- RoboSense: demonstrações em artifacts/m3 no próprio repositório; sem site público independente confirmado.
- Ateliê: URL pública não confirmada; linkar código.
- Fotografias/screenshots públicos não devem ser tratados como ativos livres sem verificar origem/autorização para publicação.

## Referências de design

Ver REFERENCES.md. Histórico: A indisponível na extração web e IAB sem navegador conectado; B/C inicialmente só texto. Nesta auditoria, Chromium de testes acessou A/B/C com HTTP 200 e capturas reais desktop/mobile. Não confundir essa observação com benchmark, análise de código interno ou certificação de acessibilidade.
