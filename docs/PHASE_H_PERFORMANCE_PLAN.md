# Continuidade H — custo de inicialização

Autorização: “Continue”, em 18/10/2026, dentro de H. Base `350ea2f`; quatro pendências anteriores preservadas conforme `phase-h-review/source-fingerprints.json`. Sem push/deploy ou fase I.

As sondagens de carregamento completo/sem scripts/sem filtros/sem decode indicam custo de JavaScript; retirar filtros ou decode não trouxe ganho consistente. Não são alternativas de produto. A tentativa inicial falhou porque o preview 3115 estava encerrado; reiniciado antes das medições válidas. Traces e séries locais em `.audit/phase-h/render-probe*`.

Experimento delimitado: renderizar os SVG estáticos de ToolPopups e LinkIcon com o elemento nativo de imagem, preservando src, dimensões, alt decorativo, lazy loading e decoding. Esses componentes são server components; o SVG já passa sem transformação pelo otimizador Next. Isso elimina estado/efeitos de imagem no cliente sem remover interação. Chamadores: cinco projetos da home, links da home e dos quatro cases; animação pertence aos contêineres e permanece igual. Capturas raster, avatar e quatro arquivos pendentes não serão alterados.

Validar build/strict/lint, provas de imagens/links/movimento/reduced/no-JS, comparação de performance e capturas desktop/mobile. Conservar somente com ganho medido e sem regressão. Se insuficiente para H03, registrar a contribuição e continuar a isolar trabalho na camada responsável, sem mexer na coreografia ou nas métricas de aceitação. Sem dependências novas ou refatoração geral.
