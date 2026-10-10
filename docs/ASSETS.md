# Assets dos cases — Fase 6

Os três cases reutilizam os SVGs autorais de src/components/projects/project-illustration.tsx, criados para este portfólio na Fase 4. Origem: commit c700cc6; descrições acessíveis e dimensões explícitas adicionadas na Fase 6. Não derivam das capturas de referência nem de fotografias dos projetos.

| Case                 | Representação                                | Dimensões intrínsecas | Uso acessível                                                                   |
| -------------------- | -------------------------------------------- | --------------------- | ------------------------------------------------------------------------------- |
| RoboSense Lab        | Campo de visão, alvo e marcações de detecção | 480 × 260             | SVG com role img e title; descrição diferencia diagrama de captura experimental |
| Industry Week SENAI  | Linha do tempo com quatro marcos             | 480 × 260             | SVG com role img e title, representando a organização por eras                  |
| Ateliê Ingrid Xavier | Catálogo conectado ao atendimento            | 480 × 260             | SVG com role img e title, representando o fluxo peça/informação/contato         |

CSS mantém proporção e largura responsiva, com área reservada; SVG inline não depende de download externo nem precisa de compressão raster/next/image. Na home são decorativos e aria-hidden, acompanhados de legenda conceitual; nos cases são informativos e têm nome acessível. IDs são específicos por slug. Cores seguem tokens do design system.

Evidência factual está nos links para código e registros de validação, fixados por SHA em src/data/case-studies.ts. Um diagrama não é prova de execução. Fotografias de produtos, vídeos gravados e mídia histórica não foram copiados: origem/autorização de republicação ainda precisam ser confirmadas. Não há imagem significativa cuja falha de rede possa esconder o conteúdo; falhas da navegação RSC são testadas na recuperação de erro.
