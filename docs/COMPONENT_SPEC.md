# Componentes — especificação B

Direção B aprovada. Ilha C e hero/entrada D implementados e validados em [PHASE_C_REVIEW](PHASE_C_REVIEW.md) e [PHASE_D_REVIEW](PHASE_D_REVIEW.md). Demais componentes aguardam seus gates. Hero usa h1 único em duas máscaras, arco SVG decorativo, posição18px/16px mobile, descrição16px/14px mobile, botões48px e tipografia64–96px/36–58px mobile. Ações quebram em320px; conteúdo tem altura natural. [Tokens](DESIGN_SYSTEM.md), [movimento](MOTION_SPEC.md), [direção](VISUAL_DIRECTION.md).

## Ilha / C

Resultado medido:322×60→404×365 desktop;320px:288×385 aberta;375px:343×385. Altura intrínseca. Subtítulo mostra seção atual; papel profissional fica na nota12px/20px. Foco3px interno (offset−3px) preserva visibilidade dentro do clipping. Demais alvos da tabela foram mantidos.

| Estado    | Desktop≥900 px                                          | Mobile320–599 px                                               |
| --------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| Compacta  | 322×60 px, topo32 px, raio30 px                         | min(322 px,viewport−32 px)×60 px, topo16 px+safe-area          |
| Expandida | largura404 px, altura intrínseca~368 px, raio28 px      | viewport−32 px; altura intrínseca limitada à altura disponível |
| Cabeçalho | avatar40 px/gap10 px/nome14 px/contexto12 px/botão44 px | Identidade “Bruno Proença”; nome completo no h1                |
| Conteúdo  | 5 destinos48 px, padding12 px, ícones18 px              | Mesma ordem/alvos; scroll interno se necessário                |

Mesma superfície e cabeçalho, centro/topo invariantes. Não esticar letras/avatar no FLIP. Medir após fonte/resize; alturas são alvos visuais, nunca constantes para esconder conteúdo. Sem painel separado.

Início/Projetos/Sobre/Competências/Contato correspondem aos IDs existentes. Ativo tem fundo, texto “Atual” e aria-current=location. SVGs geométricos traço1,5 px, sem nova biblioteca. Botão com nome/aria-expanded/controls, não role menu.

Clique/toque/Enter/Espaço alternam. Escape fecha e retorna foco; link fecha/foca destino; saída de foco/clique externo não roubam foco. Resolver foco antes de inert. Comando reverte animação sem fila. Sem trap/body lock. Reduced imediato; no-JS mantém destinos. Reusar handlers/observer existentes. B usa details/summary instantâneo para geometria; C implementa os contratos de interação com medição dimensional/Motion, sem FLIP com scale.

## Hero / D

Nome real h1, “Desenvolvedor em formação”, software/visão/robótica, CTA Explorar projetos/GitHub. Texto único semântico; máscaras futuras preservam palavras. Arco decorativo. Texto nunca sobre a faixa branca. Primeira imagem na transição inferior, mobile no fluxo. Wrappers de entrada e scroll separados.

## Intro / E

“olá” branco manuscrito, original, não assinatura atribuída a Bruno. 850 ms desenho+150 ms pausa+450 ms retração; watchdog2200 ms. B mostra forma/estados, tracing real em E. Sem porcentagem ou bloqueio SSR. Pular sempre operável; interação/hash/foco/reduced/falha cancelam. Não repetir na navegação da sessão.

## Projetos / F

Artigo com h3, descrição/stack/estado/links. Imagens com dimensões/alt/contain, cores/proporção originais. Duplicata desfocada decorativa aria-hidden. RoboSense: “Frame de vídeo gravado · validação M3”;19,31 ms de um frame não vira benchmark. Industry: captura de deployment. Ateliê: screenshot do repositório/execução local.

Faixa R3 desktop: imagem grande, texto curto lateral, detalhes fora da troca; mobile sequência vertical. Nada de link focável em slide invisível. Case/repositório não dependem do índice animado. Fotos/galeria exigem originais/contexto.

## Sobre, competências, contato / F/G

Texto real e escala editorial. Skills por uso nos três projetos, sem porcentagens; interesses IA/ML não viram tecnologias de projetos sem fonte. Contato GitHub/LinkedIn/mailto, sem disponibilidade fictícia ou formulário. Footer ano dinâmico no produto; licença da fonte distribuída sempre.

## Cases, erro e404 / G–I

Preservar slugs/conteúdo/metadata. Mídia íntegra, leitura até65 ch; problema/abordagem/decisões/evidência/limites permanecem. Erro foca h1 e mantém recuperação;404 retorna a início/projetos. Sem repetir intro/arco/pins na leitura longa. Favicon/SEO só nos gates correspondentes.
