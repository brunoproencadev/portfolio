# Arquitetura
Next.js App Router, React e TypeScript strict. Páginas e dados no servidor; ilhas client somente para nav e motion. Dados locais tipados: sem CMS/backend.
Tailwind com tokens CSS customizados. GSAP/ScrollTrigger possui hero e revelações; Motion possui expansão do menu; CSS possui hover/focus. Não disputar propriedades no mesmo elemento.
Sem Three/R3F/Drei: diagrama SVG entrega a narrativa sem WebGL ou loop contínuo. Sem Anime/React Spring: responsabilidade já atendida.
Testes: Vitest para integridade dos dados/URLs; Playwright + axe para fluxos e layout; Lighthouse de produção local. ESLint/Prettier.
SEO: metadata por rota, favicon e imagem OG próprios. SITE_URL somente domínio HTTPS confirmado; sem canonical/sitemap com URL inventada. Sem rastreadores ou credenciais.
