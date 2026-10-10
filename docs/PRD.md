# PRD — Bruno Proença Silva

## 1. Problema e valor

Visitantes precisam compreender rapidamente o perfil de um desenvolvedor em formação e avaliar projetos reais. Um portfólio editorial conecta interfaces, sistemas e percepção com evidências, decisões e limites explícitos.

## 2. Público

Recrutadores procuram clareza e contato; desenvolvedores procuram código e arquitetura; professores e pesquisadores procuram método, limitações e aprendizados.

## 3. Objetivos e métricas

Identidade e CTA na primeira dobra; três projetos verificáveis; acesso a contato em até duas interações. Metas de laboratório: LCP ≤2,5s, CLS ≤0,1, Lighthouse preferencialmente >90 em quatro categorias. INP ≤200ms é meta de campo, não conclusão de Lighthouse. Sem analytics no MVP.

## 4. Jornada

Hero → projetos → estudo de caso → evidência/repositório → contato. Sobre e competências complementam a avaliação.

## 5. MVP

Home em português; navbar cápsula contextual; intro breve pulável; três estudos de caso; sobre; competências por evidência; contato público; footer; 404; SEO condicional ao domínio confirmado; testes e documentação.

## 6. Futuro

Trajetória acadêmica confirmada, novas evidências e tradução humana. 3D somente com função narrativa demonstrada.

## 7. Requisitos

Next App Router, React, TypeScript strict; conteúdo estático no servidor; animação isolada; cleanup; teclado e WCAG AA; 320/375/768/1440px sem overflow; reduced motion; conteúdo disponível sem animações ou JavaScript; nenhum segredo/rastreador.

## 8. Aceitação

Lint, typecheck, unitários, E2E e build passam. Menu abre/fecha, Escape devolve foco, clique externo fecha, seção ativa indicada. Intro encerra em até 2,2s, pode ser pulada, não bloqueia scroll nem conteúdo. Testar links, cases, 404, reduced motion, console e acessibilidade. Screenshots e Lighthouse reais com condições documentadas.

## 9. Riscos, restrições e exclusões

LinkedIn bloqueado; formação e prêmios específicos não confirmados. Domínio público desconhecido: não inventar canonical. Referências visuais dependem de navegador disponível. Sem backend, formulário, CMS, banco, autenticação, analytics ou 3D pesado. Nenhum deploy/push autorizado.
