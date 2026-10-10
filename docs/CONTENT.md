# Conteúdo editorial verificado

Fonte factual: PROFILE_RESEARCH.md. Estes são os textos-base para a interface; a implementação em src/data ainda não existe. Quando criada na Fase 4/6, deve manter correspondência editorial com este documento. Não são dados vindos de CMS.

## Home

Nome: Bruno Proença Silva.
Posicionamento: Desenvolvedor em formação · Software, visão computacional e robótica.
Título editorial: Construir. Observar. Evoluir.
Mensagem: Exploro interfaces e sistemas de percepção por meio de projetos reais, experimentação e engenharia.
CTA principal: Explorar projetos. Secundário: GitHub.
Sobre: Aprendo construindo: da experiência de uma interface aos sinais que um sistema de visão precisa interpretar. Meu trabalho reúne desenvolvimento web e experimentos em robótica, com decisões documentadas e limites claros.
Contato: Vamos conversar sobre o próximo desafio.
Links: https://github.com/brunoproencadev · https://www.linkedin.com/in/brunoproencasilva · mailto:brunoproencasilva@gmail.com.
O nome/posicionamento deve acompanhar o título editorial; o slogan sozinho não identifica o perfil.

## Projetos selecionados — textos para cartões

| Projeto              | Categoria/stack comprovada                                        | Síntese                                                                                                              | Estado público                                                                             |
| -------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| RoboSense Lab        | Visão computacional · Python, NumPy, OpenCV, PySerial             | Um laboratório de percepção para investigar detecção de bola, validade dos frames e limites de tracking em robótica. | Experimental: simulação, vídeos gravados e ensaio ao vivo; hardware ainda exige validação. |
| Industry Week SENAI  | Experiência web · React, TypeScript, Vite, Tailwind, GSAP, Motion | Uma narrativa interativa sobre a evolução industrial, desenvolvida para o evento Engrenagens do Tempo.               | Interface implementada; demonstração indicada pelo repositório.                            |
| Ateliê Ingrid Xavier | Aplicação web · Next.js, React, TypeScript                        | Catálogo de peças artesanais com informações confirmadas e acesso contextual ao atendimento pelo WhatsApp.           | Frontend local validado conforme documentação; publicação e CMS pendentes.                 |

Repositórios:

- https://github.com/brunoproencadev/robosense-lab
- https://github.com/brunoproencadev/industry-week-senai-prj
- https://github.com/brunoproencadev/atelie-ingridxavier

Demonstração candidata: https://brunoproencadev.github.io/industry-week-senai-prj/ — respondeu HTTP 200 nesta auditoria; disponibilidade confirmada, sem QA funcional completo. RoboSense tem artefatos no repositório, não um produto online confirmado. Ateliê sem URL pública confirmada.

## Case — RoboSense Lab

Problema/objetivo: investigar como um sistema de percepção identifica a bola e distingue ausência de detecção, dados antigos e falha de aquisição, antes de integrar controle do robô.
Abordagem: experimentos sintéticos controlados, depois processamento de gravações reais e preparação de ensaios ao vivo.
Arquitetura: Camera entrega Frame; pipeline verifica validade temporal; detector HSV/contornos produz observação; avaliação e JSONL registram evidências. Tracking em gravações associa candidatos atuais sem inventar coordenadas quando a medida se perde.
Desafio e decisão: um objeto laranja semelhante pode ser falso alvo. Manter dados, falhas e condições do ensaio explícitos evita confundir métricas de processamento com latência física.
Evidência: README, arquitetura e artefatos/validação M3 publicados. Resultados descritos nas fontes, não reexecutados nesta auditoria.
Limitações: ensaio ao vivo tem falsos alvos/perdas; calibração e execução em Raspberry Pi ainda não demonstradas; controle GIGA permanece separado. Não afirmar validação de bola infravermelha a partir de vídeos de bola laranja.
Aprendizado técnico: separar aquisição, validade e detecção torna experimentos comparáveis sem acoplar observação a motores.
Próximos passos: calibração e validação no hardware sob condições documentadas; não apresentar isso como entregue.

## Case — Industry Week SENAI

Problema/objetivo: apresentar a evolução industrial para o evento Engrenagens do Tempo, relacionado a SESI/SENAI, com uma leitura organizada por eras.
Abordagem/arquitetura: aplicação React/Vite com dados de navegação e capítulos, mídia por seção, alternância visual e animações via GSAP/Motion. O arquivo App.tsx inspecionado concentra essas responsabilidades.
Desafio e decisão: combinar texto histórico, mídia e movimento sem perder sequência. A organização por capítulos orienta a leitura.
Evidência: código de App.tsx, package.json e link de demonstração no README. Há alternância de tema, detalhes por era e navegação implementados.
Limitações: README contém instruções antigas de HTML estático. O formulário de visita em App.tsx apenas atualiza estado local e exibe confirmação; não comprova agendamento, persistência nem atendimento. Não divulgar integração funcional. A existência de GSAP/Lenis não comprova performance ou reduced motion completos.
Aprendizado técnico: a experiência visual deve ser avaliada junto com comportamento real, sem transformar feedback simulado em resultado de negócio.
Próximos passos sugeridos pela auditoria, não roadmap confirmado do autor: atualizar documentação e revisar semântica/acessibilidade e o feedback do formulário.

## Case — Ateliê Ingrid Xavier

Problema/objetivo: apresentar produtos artesanais reais e facilitar atendimento sem exigir checkout ou conta.
Abordagem: catálogo local em Next/React/TypeScript, conteúdo e preços confirmados, links WhatsApp contextualizados.
Arquitetura: dados do catálogo separados da apresentação e validação no servidor; páginas e contatos usam informações do item.
Desafio e decisão: não inferir preços a partir de fotos, preservar imagens reais e tratar identificadores inválidos sem produzir contatos enganosos.
Evidência: README, package.json e docs/VERIFICATION.md registram validação local, testes de catálogo/WhatsApp, responsividade e acessibilidade automatizada. Resultados pertencem à execução relatada por esse projeto.
Limitações: sem checkout, carrinho, CMS ou site publicado confirmado. Os documentos legais mencionados são rascunhos; não alegar revisão jurídica ou resultado comercial.
Aprendizado técnico: integridade do conteúdo e dos destinos de contato é parte da experiência, não apenas um detalhe de implementação.
Próximos passos: publicação e próximos serviços dependem dos gates do próprio projeto.

## Competências e trajetória

- Utilizadas com evidência: Python/NumPy/OpenCV/PySerial no RoboSense; TypeScript/React/Tailwind/Vite no Industry Week; Next.js no Ateliê; Git nos repositórios.
- Interesses declarados no perfil: Java/Spring, IA/ML e robótica. Não converter menção no perfil em domínio comprovado ou experiência profissional.
- Computer Science aparece como interesse em sistemas, contratos, validade temporal e testes; não afirmar graduação.
- Não publicar empregos, formação, medalhas, eventos competitivos, cargos de liderança ou datas sem confirmação específica. A autodeclaração “medalista” no perfil é insuficiente para inventar modalidade/ano.

## Assets e revisão

Usar screenshots próprios das aplicações/evidências ou diagramas autorais claramente rotulados. Confirmar origem e autorização de imagens de produto antes de incorporá-las ao portfólio público. Não reutilizar imagens das referências como trabalho de Bruno.
Cada nova afirmação precisa de fonte/estado; nenhum percentual de proficiência ou métrica quantitativa foi adotado nestes textos.
