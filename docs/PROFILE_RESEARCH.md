# Pesquisa de perfil — revisão da auditoria 2026-10-09

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

- GitHub dos projetos: repositórios públicos consultados com sucesso; head main registrado acima.
- Demo Industry Week: https://brunoproencadev.github.io/industry-week-senai-prj/ respondeu HTTP 200 a HEAD nesta auditoria; isso verifica disponibilidade, não QA funcional.
- RoboSense: demonstrações em artifacts/m3 no próprio repositório; sem site público independente confirmado.
- Ateliê: URL pública não confirmada; linkar código.
- Fotografias/screenshots públicos não devem ser tratados como ativos livres sem verificar origem/autorização para publicação.

## Referências de design

Ver REFERENCES.md. Histórico: A indisponível na extração web e IAB sem navegador conectado; B/C inicialmente só texto. Nesta auditoria, Chromium de testes acessou A/B/C com HTTP 200 e capturas reais desktop/mobile. Não confundir essa observação com benchmark, análise de código interno ou certificação de acessibilidade.
