# QA do portfólio completo — Fase 7

Autorizada em 2026-10-10: “Dê início a fase 7”. Baseline c8878a6; home, três cases, erro/404, navegação e movimento. Execução de produção local, sem publicação. Este relatório complementa o histórico em VERIFICATION.

## Ambiente e instalação

Windows 11 Pro 10.0.26300; AMD Ryzen 7 5700G, 8 núcleos/16 threads, aproximadamente 27,9 GiB de RAM visível. Node 24.15.0, npm 11.12.1, Next 16.4.0, React 19.3.0. Playwright 1.64.0: Chromium 156.0.8078.4, Firefox 157.0 e WebKit 27.2. Lighthouse 13.5.0.

`npm ci --no-audit` concluiu a instalação pelo lockfile sem alteração de versões. `npm ls eslint --all` passou com todos os peers; o teste unitário de tooling executa regras React/Next/acessibilidade. `npm ls --all --json` retornou zero, sem peers inválidos, mas registrou seis pacotes WASM como extraneous após o ci: @emnapi/core, @emnapi/runtime, @emnapi/wasi-threads, @img/sharp-wasm32, @napi-rs/wasm-runtime e @tybys/wasm-util. Não são novos requisitos do produto; lockfile preservado.

## Segurança e decisões de dependências

Auditoria em 2026-10-10: `npm audit --omit=dev` sem vulnerabilidades; auditoria completa com cinco high na cadeia eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces. Advisory GHSA-vfj7-8cjw-p6xm: exaustão de pilha por padrões profundamente aninhados. Na consulta, o registro oferecia braces 3.0.3, afetado; a correção automática proposta era downgrade major de eslint-config-next para 14.2.35. Não aplicada por incompatibilidade com a stack atual.

ESLint 9.39.5 permanece fora de suporte. Peers publicados dos plugins react/import/jsx-a11y ainda não aceitam ESLint 10; atualizar só o pacote principal recriaria A01. Não executar lint sobre padrões arbitrários enviados por terceiros. Reavaliar advisory e plugins antes da publicação; auditoria de dependências não certifica segurança. Nenhum segredo conhecido encontrado na busca de padrões em src/tests/docs/AGENTS/README. Sem rastreadores, serviços ou credenciais novos.

Motion continua sem import; CSS já atende à cápsula e a dependência não participa do JavaScript entregue. Nenhuma biblioteca nova ou troca de stack foi necessária.

## Multibrowser, foco e limites

Projetos explícitos em playwright.config.ts tornam o QA repetível nos três motores. Instalar com `npx playwright install chromium firefox webkit`, construir com `npm run build` e executar `npm run test:e2e -- --workers=2`. O zoom nativo 200% utiliza extensão Chromium e fica não aplicável nos outros dois projetos.

Primeira rodada: 143 passaram, cinco falharam em WebKit e dois não aplicáveis (zoom). Traces preservados localmente em .audit/phase7-failures. A investigação separou dois mecanismos:

1. WebKit não foca o botão ao clicar. O Escape era tratado na navegação e não recebia o evento quando o foco permanecia no body. SiteNavigation agora ouve Escape no documento apenas enquanto o disclosure está aberto, fechando e devolvendo o foco ao botão; o listener é removido no fechamento/unmount. Nova regressão verifica clique → Escape → fechado/foco no botão nos três motores.
2. O runner WebKit 27.2 no Windows pula links nativos com Tab, mesmo no HTML isolado `<a href="#a">one</a><button>button</button><a href="#b">two</a>`. Tab e Alt+Tab focaram o botão. A falha independe de React/CSS/portfólio. Três testes dependentes da ordem Tab entre links são explicitamente não executados somente em WebKit/Windows; continuam integrais em Chromium/Firefox. Nenhum tabindex artificial ou foco simulado substitui essa prova. Safari real com navegação completa por teclado permanece pendente.

Capturas revisadas: menu Firefox 320px, intro Firefox em 400ms, case RoboSense WebKit desktop, primeira dobra da home Chromium em 375/1440px e case mobile. Sem cortes ou sobreposições inesperadas observados; diagramas e estados/limites mantêm leitura. A revisão é amostral, não um estudo com usuários.

Tentativa intermediária: focar o botão no clique resolveu Escape, mas causou fechamento por blur antes da seleção dos links no WebKit (146 passaram, dois falharam, cinco não executados). Descartada. Com o listener de Escape limitado ao estado aberto, lint/build/TypeScript passaram e o gate focado de navegação/responsividade terminou em 34 aprovados e cinco não executados. A suíte anterior já havia validado os demais fluxos; revisão completa final será registrada abaixo. Unitários: 5/5 na instalação limpa.

Gates finais em 2026-10-11: formatação, lint sem avisos, next typegen/TypeScript strict, 5/5 unitários e build estático passaram. Suíte completa: **148 aprovados, cinco não executados, zero falhas** (153 entradas, dois workers, sem retries). Chromium 51; Firefox 50 e um zoom não aplicável; WebKit 47 e quatro exclusões acima. Inclui axe com a regra experimental ativada nos cases, quatro larguras, sem JS, foco/âncoras, zoom 200%, reduced motion, falhas/cancelamento/desmontagem e recuperação de erro. Nenhuma asserção foi retirada para acomodar falhas da aplicação.

## Medições de produção local

A rodada inicial de 12 medições concluiu em 2026-10-10. Apesar de acessibilidade 100, a regra experimental label-content-name-mismatch encontrou o texto visível BP fora do nome acessível do link de retorno nos cases. Corrigido nos dois usos do monograma (cases e home sem JS): nome “BP/ — Bruno Proença — início”. A regra passou a ser ativada explicitamente no axe dos cases; o fallback sem JS verifica o nome completo. O ajuste aguardou a retomada em 2026-10-11 após interrupção por limite da revisão automática de aprovação, sem alterações parciais daquela tentativa.

Método: `next build`, servidor `next start --hostname 127.0.0.1 --port 3101`; Chromium headless dedicado com porta de depuração 9222. API Lighthouse com `port: 9222`, `output: "json"` e categorias performance/accessibility/best-practices/seo; demais opções padrão da versão 13.5.0. Quatro rotas, três navegações sequenciais por rota, limpeza de storage padrão, sem suíte/build concorrentes. Mediana calculada separadamente por métrica. Artefatos iniciais em .audit/phase7-lighthouse; finais em .audit/phase7-lighthouse-final, ignorados pelo Git.

Perfil mobile 412×823, DPR 1,75; throttling simulado: RTT 150ms, throughput 1638,4 Kbps e CPU 4×. Não é dispositivo físico nem medição da hospedagem. TBT não equivale a INP; a meta de campo ≤200ms continua sem comprovação. Reprodução via CLI: apontar CHROME_PATH para o Chromium do Playwright, iniciar o servidor acima e executar o comando abaixo três vezes para cada rota, salvando cada saída em arquivo distinto.

```sh
npx lighthouse http://127.0.0.1:3101/ --chrome-flags="--headless" --form-factor=mobile --throttling-method=simulate --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=.audit/home-1.json
```

## Links e rede

Varredura dos links renderizados nas quatro rotas: 13 destinos internos/âncoras com HTTP 200 e IDs existentes; perfil GitHub e três repositórios com HTTP 200. LinkedIn retornou 999 (bloqueio à consulta automatizada). As páginas blob de dez fontes GitHub retornaram 429/503, sem conclusão sobre sua disponibilidade em navegação humana. Os dez arquivos correspondentes nas revisões fixas responderam 200 no endpoint público raw em 2026-10-11. E-mail validado apenas como mailto; nenhuma mensagem enviada. Fontes não são prova de reexecução dos projetos externos.

Medições Lighthouse e revisão final em andamento. Noindex/nofollow serão preservados; SEO de publicação depende da Fase 8 e de domínio confirmado. INP é meta de campo: não será inferido de TBT.
