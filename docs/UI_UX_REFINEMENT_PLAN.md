# Refinamento de UI/UX e movimento — 24/10/2026

Autorizado pelo usuário: “Pode fazer então, tem minha aprovação”, após o plano de diagnóstico, correção, refinamento, desempenho e validação. Incremento local da experiência existente; não autoriza publicação nem fase I.

## Escopo e evidência de entrada

- Preservar identidade, dados reais, coreografia aprovada e as quatro alterações preexistentes em PHASE_H_PLAN, CaseCapture, HeroProject e refinement.spec.
- Diagnóstico Chromium desktop 1440×900 e mobile 375×812: capturas de home/menu/seções e quatro cases, gravações e observações em `.audit/ui-refinement/before`. Não foram encontrados pageerrors ou overflow horizontal nesses estados.
- Falha reproduzida em 1100×800: focar o título Industry Week e ativar reduced motion desloca o título de y=222,375 para y=4061,25. A remoção do pin não conserva a posição de leitura.
- O carrossel tem barra móvel, mas seus quatro links não expõem o projeto atual a tecnologias assistivas. A indicação deve acompanhar o movimento e ser removida no modo de leitura linear.

## Implementação delimitada

1. HomeMotion conserva um ponto de leitura visível ao remover ou reconstruir os efeitos, respeitando foco e a visibilidade horizontal dos projetos. Reutilizar o mecanismo existente de compensação do layout.
2. startReveals, proprietário do carrossel, mantém `aria-current` no link correspondente à cena; estilo sublinhado explicita a seleção sem depender apenas de cor. Cleanup remove esse estado.
3. Investigar o custo de inicialização por perfil de CPU. Manter otimização somente com ganho e equivalência demonstrados; não reabrir experimentos já rejeitados nem alterar coreografia por pontuação.

Foco visual: continuidade do projeto em leitura e feedback de localização. Ritmo, passagem hero→RoboSense, bounce e faixas aprovados são a referência. Nenhuma nova dependência necessária.

## Ferramentas e validação

Ponytail e Impeccable aplicadas. Trail-Code 0.23.0 gerou mapa local de 62 arquivos/347 relações e consultou os proprietários de navegação/movimento. shadcn MCP consultado; 21st autenticada e busca real realizada, geração IA indisponível na conta. Figma não é necessário para corrigir estas falhas observadas.

Provas: regressões dos dois comportamentos, testes existentes de navegação/movimento/responsividade/cases, unitários, lint, strict e build; capturas e gravações comparativas desktop/mobile. Uma rodada de inspeção após implementar, correções em lote se necessárias e uma confirmação. Testes verdes não equivalem a aceite visual humano ou desempenho em dispositivo físico.

Commits locais pequenos com staging explícito; resultados, SHAs e limitações em HANDOFF/TASKS/VERIFICATION e relatório desta entrega. Performance H03 permanece aberta se as metas não forem comprovadas.
