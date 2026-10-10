# Pesquisa de perfil — 2026-10-09

## Método e fontes

Consulta atual via conector GitHub aos README públicos:

- https://github.com/brunoproencadev/brunoproencadev/blob/main/README.md
- https://github.com/brunoproencadev/robosense-lab/blob/main/README.md
- https://github.com/brunoproencadev/industry-week-senai-prj/blob/main/README.md
- https://github.com/brunoproencadev/industry-week-senai-prj/blob/main/index.html
- https://github.com/brunoproencadev/atelie-ingridxavier/blob/main/README.md

## Fatos confirmados

Perfil declara aspiring software engineer; interesses em Java/Spring, Python/AI/ML/visão e robótica. E-mail público: brunoproencasilva@gmail.com. Nome e LinkedIn fornecidos pelo usuário.
RoboSense: Python/OpenCV; simulação M1/M2; tracking em vídeos reais M3; ensaio ao vivo experimental, falsos alvos e perdas; Raspberry Pi sem validação; controle GIGA separado.
Ateliê: frontend Next/React/TypeScript de catálogo com WhatsApp, sem checkout; Fase 2 local validada segundo documentação pública; CMS e deploy futuros.
Industry Week: experiência de evolução industrial para evento SESI/SENAI; index.html importa /src/main.tsx. README tem instruções estáticas conflitantes; stack precisa de package.json/código antes de texto final.

## Lacunas e cautelas

LinkedIn retornou HTTP 999; sem tentativa de contornar autenticação. Formação, datas, empregos e premiações específicas não confirmados. Perfil autodeclara medalhista, mas não há modalidade/data/evidência suficiente: omitir conquista específica.
README não equivale a execução independente. Não reproduzir resultados quantitativos sem inspeção da evidência. Nenhum nível de domínio atribuído.

## Referências

A: ferramenta web declarou URL inacessível. B e C: extração textual disponível, sem evidência visual. Navegador IAB indisponível e inventário de navegadores vazio. Não afirmar análise de scroll/transições/desktop/mobile. Reavaliar com navegador de testes, se disponível.

## Inspeção complementar de código

Industry Week: package.json confirma React 19, Vite 6, TypeScript e Tailwind 4; index.html importa src/main.tsx. Não inferir uso efetivo de toda dependência listada. README está parcialmente desatualizado.
Ateliê: package.json confirma Next 16.3.8/React 19.3.0/TypeScript 5.9.3 e scripts de QA.
RoboSense: pyproject.toml confirma Python >=3.11, NumPy, OpenCV headless e PySerial; docs/architecture.md descreve contrato Camera, validação temporal e separação de controle. Inspeção documental, sem executar esses projetos nesta sessão.
