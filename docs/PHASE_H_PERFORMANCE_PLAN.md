# Continuidade H — custo de inicialização

Autorização: “Continue”, em 18/10/2026, dentro de H. Base `350ea2f`; quatro pendências anteriores preservadas conforme `phase-h-review/source-fingerprints.json`. Sem push/deploy ou fase I.

As sondagens de carregamento completo/sem scripts/sem filtros/sem decode motivaram investigar JavaScript; elas não isolam a hidratação como causa. Retirar filtros ou decode não trouxe ganho consistente. Não são alternativas de produto. A tentativa inicial falhou porque o preview 3115 estava encerrado; reiniciado antes das medições válidas. Traces e séries locais em `.audit/phase-h/render-probe*`.

Experimento delimitado: renderizar os SVG estáticos de ToolPopups e LinkIcon com o elemento nativo de imagem, preservando src, dimensões, alt decorativo, lazy loading e decoding. Esses componentes são server components; o SVG já passa sem transformação pelo otimizador Next. Isso elimina estado/efeitos de imagem no cliente sem remover interação. Chamadores: cinco projetos da home, links da home e dos quatro cases; animação pertence aos contêineres e permanece igual. Capturas raster, avatar e quatro arquivos pendentes não serão alterados.

Validar build/strict/lint, provas de imagens/links/movimento/reduced/no-JS, comparação de performance e capturas desktop/mobile. Conservar somente com ganho medido e sem regressão. Se insuficiente para H03, registrar a contribuição e continuar a isolar trabalho na camada responsável, sem mexer na coreografia ou nas métricas de aceitação. Sem dependências novas ou refatoração geral.

## Resultado da investigação

Plano registrado em `81641c0`. A substituição de SVGs não reduziu o JavaScript transferido e piorou as medianas locais; revertida. O teste seguinte usou `getImageProps` em CaseCapture, mantendo otimizador, dimensões, sizes, loading e a prioridade de imagem preexistente. Também não melhorou: mediana LCP 2901ms contra 2817ms na base anterior. CaseCapture foi restaurado pelo snapshot, incluindo a linha de prioridade não commitada; os quatro hashes de entrada voltaram a coincidir.

Os três builds (SVGs, captura no servidor e restauração) passaram. Como nenhum experimento foi conservado, os gates E2E/visuais planejados para uma nova implementação não foram executados sobre esses candidatos; não houve commit de produto. A suíte completa anterior continua identificada por sua própria fonte e execução. Nova medição da home e do Ateliê após restaurar o build, resultados e limites em [PHASE_H_REVIEW](PHASE_H_REVIEW.md#continuidade--custo-de-inicialização). H03 continua pendente; bloquear JavaScript, adiar a experiência aprovada ou alterar o perfil de medição não é critério de fechamento.
