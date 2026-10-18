# Fase G — cases e identidade verificável

Autorizada em 18/10/2026 pelo pedido “dê sequência com a fase G”. F aprovada conforme HANDOFF; baseline `a56426d`, árvore limpa, branch `redesign/cinematic-portfolio`. Sem push/deploy ou início de H/I.

## Entrega e encerramento

- G01: reconferir as fontes fixadas dos três cases e o avatar atual. Fotos pessoais dependem de originais/contexto; sem material, manter pendência explícita e Sobre textual, sem placeholders.
- G02: melhorar leitura dos três cases existentes com capturas reais já inventariadas, legendas, acesso ao original e diagramas distintos de evidência. Preservar slugs, limites, contato, erro/404 e navegação sem JS. Nenhuma nova rota de case para Museu/kord.
- G03: substituir ícones BP/ pelo avatar exato confirmado no GitHub; ICO 16/32/48, PNG e Apple 180. Apenas redimensionamento proporcional, sem recorte, recriação ou mudança do avatar da ilha.
- Validar build/strict/lint/formato/unitários e E2E de cases/SEO/recuperação. Inspecionar desktop/mobile e sequência real de leitura, recursos bloqueados, teclado, reduced motion e no-JS. QA integral/performance ficam em H.
- Commits atômicos locais, revisão do diff, relatório, decisões e HANDOFF/TASKS/VERIFICATION. Encerrar para avaliação do usuário, com fotos e qualquer prova ausente explicitadas; não iniciar H.

## Direção dos cases

Superfície de leitura: hierarquia editorial sobre os neutros/violeta e Manrope aprovados, sem intro/pins na leitura longa. Título, síntese factual, estado e ações antes da evidência real. Imagens preservam proporção e cores; no catálogo longo, prévia contida com acesso ao arquivo integral. Diagramas permanecem junto da arquitetura com legenda explícita. Texto e links funcionam mesmo se a imagem falhar. A home/coreografia aprovada fica preservada.

## Pesquisa e decisões

Em 18/10, os dez arquivos fixados dos cases retornaram HTTP 200. Avatar atual confirmado pela API pública e download, idêntico byte a byte ao local: SHA256 `a31a9eb6f741a092ac97494565cc6b720f503cdbaa01d815b0aaf72a2ebf9672`, 101.669 bytes, 460×460. Provas brutas em `.audit/phase-g/sources.json`; relatório durável acompanhará a entrega. Reconferir fontes não reexecuta ensaios nem certifica o deployment externo.

O usuário perguntou a finalidade das fotos; esclarecido que eram uma galeria pessoal opcional em Sobre. Seguir com cases/ícones sem depender dela. Direitos de marca/fotografias do Ateliê continuam pendentes antes de publicação proeminente.
