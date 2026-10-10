# Auditoria técnica e de design — Fases 0–3

Data: 2026-10-09; fechamento retomado em 2026-10-10 (America/Sao_Paulo). Baseline: 3f6566c. Escopo autorizado: auditar e corrigir fundação/documentação; Fase 4 continua bloqueada por gate do usuário. Workspace inicialmente limpo na auditoria; retomada com AGENTS, CODEX, README, TASKS e este relatório pendentes do mesmo trabalho interrompido. Nenhum arquivo alheio à auditoria incluído em commits.

## Conclusão

Este relatório descreve a auditoria anterior à Fase 4. Autorização posterior, entrega e estado atual estão em HANDOFF/TASKS; a Fase 4 foi autorizada e concluída em 2026-10-10, sem alterar os achados históricos abaixo.

A arquitetura é proporcional e deve ser preservada. O maior defeito técnico era a árvore inválida de lint; o maior risco de retrabalho era uma especificação visual ainda sem evidência e estados suficientes. A fundação não representa a interface final. Não há achado crítico identificado neste escopo pequeno.

## Achados classificados

| ID  | Severidade                       | Evidência/impacto                                                                                                                                           | Correção ou decisão                                                                                                                                            |
| --- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01 | Alta                             | npm ls eslint --all retornou ELSPROBLEMS: ESLint 10 fora dos peers de import 2.32.0, jsx-a11y 6.10.2 e react 7.37.5. Lint mínimo não garantia a próxima UI. | Fixado 9.39.5; árvore completa válida e teste que exercita regras de JSX/acessibilidade. Risco de suporte separado em A09.                                     |
| A02 | Alta para continuidade de design | Fase 2 marcada concluída apesar de referências só extraídas como texto e contrato visual de poucas linhas. Poderia orientar implementação sem evidência.    | A/B/C capturadas/revisadas; REFERENCES, BRAND e DESIGN_SYSTEM especificam o que adotar, evitar e medir. Scroll B permanece não comprovado.                     |
| A03 | Média                            | CONTENT dizia existir src/data/projects.ts, inexistente; pesquisa não diferenciava detalhadamente uso/estudo, fonte documental e execução própria.          | Texto corrigido, matriz de fontes/SHAs, cartões e cases-base. Identificado formulário apenas local do Industry Week; não alegar agendamento real.              |
| A04 | Média                            | Cores hardcoded no CSS, tokens só em documento; divider tinha contraste 1,56:1 no painel, inadequado como limite essencial de controle.                     | Tokens semânticos em CSS/Tailwind, borda própria 4,37:1, foco visível e preferência reduzida.                                                                  |
| A05 | Média                            | tsc dependia da disponibilidade dos tipos gerados; next-env com imports de .next estava versionado. Não havia etapa explícita de geração no typecheck.      | next typegen antes de tsc; next-env ignorado e não rastreado. Typecheck passou; limites da rodada em VERIFICATION.                                             |
| A06 | Média                            | Aceitação/planos não mapeavam requisitos a fases/provas; intro e menu não definiam claramente sem JS, foco, timeout e falha.                                | PRD R01–R12, plano por gate, contratos de disclosure e motion. Sem implementar a Fase 4.                                                                       |
| A07 | Média                            | Um único E2E de heading/axe poderia sugerir cobertura maior do que a existente.                                                                             | Acrescentados fallback sem JS, noindex/headers, quatro larguras e reduced motion de tokens. Ainda é prova da fundação.                                         |
| A08 | Baixa                            | Preview podia ser indexado se exposto; UTF-8/LF dependiam do editor/PowerShell, e já houve corrupção de teste na sessão anterior.                           | Metadata noindex/nofollow; .editorconfig/.gitattributes; orientação explícita de leitura UTF-8. Nenhum deploy foi feito.                                       |
| A09 | Média, residual                  | Cinco alertas npm high na cadeia de desenvolvimento de braces; ESLint compatível 9 fora de suporte. Sem patch compatível atual confirmado.                  | Não aplicado downgrade de Next ou force. Produção sem vulnerabilidades reportadas. Reavaliar plugins/ESLint/braces no gate 7/8 e antes de qualquer publicação. |
| A10 | Baixa                            | HANDOFF trazia caminhos escapados e datas/estado históricos misturados; primeiro commit reuniu setup e documentos.                                          | Estado e registro corrigidos; commits antigos preservados. Separar incrementos futuros, sem reescrever histórico.                                              |

## Decisões preservadas e justificativas

- Git existente, main e origin corretos; remoto sem refs. Não há histórico remoto a reconciliar nem branch remota publicada para inferir. Nenhum push.
- Next/App Router/strict, Server Components e dados locais: suficientes para home e três cases. Escalar por responsabilidade quando existir consumidor, sem serviços/CMS/interfaces vazias.
- Dependências de movimento já selecionadas têm funções distintas e ainda não são importadas pela aplicação; não há justificativa para substituir bibliotecas ou adicionar 3D.
- Dark-first, acento verde, composição editorial e diagramas com rótulo: coerentes com engenharia experimental. Tipografia/estados agora têm contrato concreto; excelência visual só poderá ser julgada na interface renderizada.
- Contato por links, sem formulário ou coleta adicional; fontes públicas e limites de hardware preservados.

## Verificação e limites

Resultados executados, falhas intermediárias e comandos ficam em VERIFICATION. Capturas de referências não são imagens do portfólio. A revisão da página mínima não comprova a futura navbar, cases, leitor de tela, Lighthouse ou experiência final.
Revisão de segredos é limitada aos arquivos rastreados e padrões conhecidos; não é certificação. Nenhum serviço externo, credencial, analytics ou backend adicionado.

## Pendências que não exigem inventar conteúdo

Confirmação de formação/conquistas e domínio final; revisão de assets antes de publicação; suporte futuro dos plugins/lint; experiência final e Lighthouse nas fases autorizadas. Para iniciar a Fase 4 é necessária confirmação explícita do usuário após revisar este relatório.
