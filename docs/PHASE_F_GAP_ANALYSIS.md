# Fase F — rejeição do usuário e diagnóstico de fidelidade

Continuação posterior autorizada e implementada em f1c78d9, com provas0592565: [correção e diferenças restantes](PHASE_F_CORRECTION_REVIEW.md). O diagnóstico abaixo registra o estado anterior; não é descrição da implementação corrigida nem aprovação visual do usuário.

2026-10-14. O usuário questionou o scroll fraco e a quantidade/qualidade de animações frente às referências. A entrega9921190 não está aprovada. F reaberta; G–I continuam sem autorização. Este turno responde ao motivo e registra evidências; não altera a UI nem declara correções implementadas.

## Causa do desvio

A implementação reduziu a narrativa a dois momentos: aproximação/máscara do frame RoboSense e troca vertical de duas telas do Industry Week. O restante segue em fluxo majoritariamente estático. A adaptação documentada no plano F diminuiu a coreografia definida no brief; chamar isso de adaptação não demonstra atendimento ao objetivo visual. O parecer final ship anterior cobria duas correções técnicas (enquadramento e persistência), não amplitude/fidelidade integral. Fechamento prematuro.

| Referência real reexaminada | Estado implementado9921190 | Lacuna |
| --- | --- | --- |
| R2 6,3–8,7s: arco sai, tipografia perde definição, mídia sobe sobre a região do hero e cresce, leitura estabiliza | Hero sai pelo fluxo normal; RoboSense aproxima quando já abaixo dele | Falta transição composta hero→mídia e isolamento de entrada/scroll |
| R3 11,5–13,7s: texto sai lateralmente, painel cresce, faixa tipográfica atravessa cena e foto aparece | Sobre permanece estático | Falta narrativa editorial. Foto depende de original/contexto; movimento de texto/painel não depende disso |
| R3 15,3–20,5s: objeto muda orientação/posição enquanto contextos de competências alternam | Lista de competências estática | Falta transformação coordenada de estados; objeto 3D original não deve ser copiado arbitrariamente |
| R3 21,6–25,2s: abertura tipográfica transforma e cede à faixa; projetos trocam verticalmente, fundo acompanha | Uma faixa mais alta troca duas telas do mesmo projeto | Troca de projetos e entrada da cena não foram entregues |
| R3 33,8–35,9s: mosaico amplia, imagem central ocupa tela | Sem fotos/mosaico | Originais pessoais ausentes; não fabricar substitutos. Lacuna de mídia não justifica remover os demais movimentos |
| R3 37–38,5s: faixas diagonais antecipam contato | Contato estático | Falta coreografia de encerramento |

Fontes: vídeos locais1/2/3.mp4 na pasta read-only do brief;2.mp4 e3.mp4 reabertos diretamente por OpenCV,60fps/18,13s e41,12s. Extraídos quadros consecutivos nos intervalos acima em .audit/phase-f-correction (ignorados), conferidos visualmente. Sem inferir bibliotecas/easing/distância original dos pixels.

## Bug confirmado de navegação

HomeMotion primeiro effect registra focusin em main e hashchange no window chamando finish. finish define stopped=true, reverte todas as timelines e remove seus listeners de reativação. O CTA Explorar projetos recebe foco dentro de main e muda hash: isso remove o enhancement pelo resto do documento. Não é apenas liberar a cena corrente para navegação segura. reduced/hash inicial e viewport abaixo900×700 também tornam a experiência estática por decisão do código.

Reprodução Chromium156,1440×900, build9921190:1 story-enhanced antes do CTA;0 depois;0 pin-spacer ao continuar até Industry, hash#projetos. [Dados](scroll-gap-review/navigation-bug.json) e [captura após CTA](scroll-gap-review/cta-after.jpg). Script local .audit/phase-f-correction/navigation-bug.mjs. Acesso por navegação normal não pode eliminar permanentemente o movimento para quem deseja vê-lo; teclado e âncoras ainda precisam liberar destinos sem trap.

## Por que a validação não detectou o problema de entrega

Os testes automatizados provavam leitura/fallbacks, geometria e comportamento das duas animações escolhidas. Inclusive esperavam o desligamento global no foco/hash. Nenhum teste ou screenshot isolado prova equivalência de coreografia com a referência. O relatório anterior reconhecia adaptações, mas isso não substitui os comportamentos centrais solicitados pelo usuário. A rejeição do usuário prevalece sobre o parecer anterior.

## Correção necessária dentro de F

1. Corrigir lifecycle: liberar o destino de teclado/hash sem desligar permanentemente a experiência na navegação normal; testar o caminho real CTA/menu→scroll.
2. Reespecificar cenas por movimentos observados, incluindo hero→mídia, entrada tipográfica e troca entre projetos na mesma faixa, com continuidade de fundos.
3. Desenvolver passagem editorial entre narrativa, competências e contato com o conteúdo autêntico disponível. Manter fotos dependentes de fontes reais.
4. Validar gravação contínua lado a lado com os vídeos, cobrindo início/meio/fim e retorno. Quantidade de efeitos não é uma métrica inventada de qualidade; o aceite precisa identificar comportamentos presentes e ausentes.
5. Preservar intro/ilha/conteúdo/SEO, separar wrappers de entrada e scroll, manter reduced/mobile/no-JS e cleanup. Sem iniciar G ou publicar.

A implementação permanece inalterada neste diagnóstico. A proposta acima não é uma entrega nem aprovação de um novo movimento. Próxima continuação de F deve implementar e validar as lacunas, sem reutilizar o antigo ship como aprovação.
