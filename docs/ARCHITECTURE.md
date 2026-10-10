# Arquitetura

Next.js App Router, React e TypeScript strict. Páginas e dados no servidor; ilhas client somente para nav e motion. Dados locais tipados: sem CMS/backend.
Tailwind com tokens CSS customizados. GSAP/ScrollTrigger possui hero e revelações; Motion possui expansão do menu; CSS possui hover/focus. Não disputar propriedades no mesmo elemento.
Sem Three/R3F/Drei: diagrama SVG entrega a narrativa sem WebGL ou loop contínuo. Sem Anime/React Spring: responsabilidade já atendida.
Testes: Vitest para integridade dos dados/URLs; Playwright + axe para fluxos e layout; Lighthouse de produção local. ESLint/Prettier.
SEO: metadata por rota, favicon e imagem OG próprios. SITE_URL somente domínio HTTPS confirmado; sem canonical/sitemap com URL inventada. Sem rastreadores ou credenciais.

## Fundação da Fase 3

Next 16.4.0 e React 19.3.0 consultados no npm oficial. GSAP 3.15.0/Motion 14.1.0 reservados às responsabilidades já definidas, ainda sem integração visual. Versões resolvidas no lockfile.
Cabeçalhos: nosniff, Referrer-Policy, DENY para frames e Permissions-Policy sem câmera/microfone/geolocalização. CSP precisa ser avaliada com a interface final; não simular proteção incompleta.
A home mínima valida infraestrutura; não representa o design final. Sem favicon/cases/SEO final nesta fase.
