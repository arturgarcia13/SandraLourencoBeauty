# Sandra Lourenço Beauty · Landing Page Oficial

Landing Page mobile-first de alto padrão para **Sandra Lourenço Beauty** (Cosmetologia e Estética Capilar em Fortaleza, CE).

Desenvolvida com **Astro estático + GSAP (ScrollTrigger, SplitText) + Lenis** e CSS puro estruturado em tokens de design. Conceito **Escala de tons**: o progresso do scroll conduz a experiência através dos níveis de cor do cabelo (do espresso ao platinado), com troca de contraste milimétrica e qualificação direta para o WhatsApp oficial.

---

## 🎨 Conceito e Identidade Visual

- **Metáfora:** A tabela de níveis de cor capilar (níveis 1 a 10) utilizada por coloristas técnicos.
- **Assinatura:** O scroll move o tom da página, a tipografia serifada de títulos troca de tinta no ponto exato de contraste, e o seletor de agendamento é a própria escala de tons.
- **Tipografia:**
  - *Headings:* Cormorant Garamond Variable (`@fontsource-variable/cormorant-garamond`), sem itálico, proporções balanceadas.
  - *Corpo, UI e botões:* Montserrat Variable (`@fontsource-variable/montserrat`), legibilidade alta no mobile.
- **Ação única de conversão:** Seletor em 2 toques (tom desejado + período) que gera a mensagem contextualizada para o WhatsApp oficial (+55 85 98997-8555).

---

## 📂 Estrutura do Projeto

```
lp_sandralourenco/
├── astro.config.mjs            # Configuração Astro (Sitemap estático)
├── package.json                # Dependências e scripts npm
├── scripts/
│   ├── sync-avec.mjs           # Sincroniza serviços, avaliações reais e equipe da API Avec
│   ├── media.mjs               # Otimiza imagens (AVIF/WebP responsivo) de public/media
│   └── verify-links.mjs        # Validação automatizada de integridade da build
├── public/
│   ├── media/                  # Pasta para fotos originais do cliente
│   ├── m/                      # Versões responsivas geradas automaticamente
│   ├── favicon.svg             # Monograma SL em dourado champagne
│   ├── logo.jpg                # Logo oficial da marca
│   └── robots.txt              # Diretrizes para indexação
└── src/
    ├── config/
    │   └── site.ts             # Fonte única de dados de contato, horários e endereço
    ├── data/
    │   ├── avec-services.json  # Catálogo oficial sincronizado do Avec
    │   ├── avec-reviews.json   # 42 avaliações reais 5 estrelas do Avec
    │   ├── avec-team.json      # Equipe técnica oficial
    │   └── media.json          # Manifesto de mídia processada
    ├── engine/                 # Motor de lifecycle e scroll Lenis/GSAP
    ├── motion/                 # Drivers de movimento (escala de tons, seletor, tagline)
    ├── styles/
    │   └── global.css          # Tokens de cor, tipografia fluida e estilos estruturais
    ├── layouts/
    │   └── Base.astro          # Layout com SEO, Schema.org HairSalon e flags de acessibilidade
    ├── components/
    │   ├── Header.astro        # Cabeçalho com indicador em tempo real do nível de tom
    │   ├── Hero.astro          # Pôster de tom + seletor interativo
    │   ├── Tagline.astro       # Manifesto técnico revelado palavra por palavra no scroll
    │   ├── Results.astro       # Comparador antes e depois (renderizado com fotos reais)
    │   ├── Services.astro      # 4 destaques editoriais + tabela completa de serviços
    │   ├── Method.astro        # Protocolo técnico em 4 etapas
    │   ├── Space.astro         # Espaço, regras como benefício e equipe técnica
    │   ├── Reviews.astro       # Estatística de fidelidade (22 clientes, 10 voltaram) e citações
    │   ├── FaqLocation.astro   # FAQ em details/summary nativo + mapa interativo e Waze
    │   ├── FinalCta.astro      # Fechamento com seletor no tom carvão
    │   ├── Footer.astro        # Rodapé institucional com CNPJ e links legais
    │   └── WhatsAppFab.astro   # Botão flutuante acionado após o hero
    └── pages/
        ├── index.astro         # Página inicial
        ├── 404.astro           # Página de erro 404
        ├── privacidade.astro   # Política de privacidade
        └── termos.astro        # Termos de atendimento
```

---

## 📸 Como Adicionar as Fotos do Cliente

Para que o site utilize fotos reais do estúdio em vez dos pôsteres tipográficos:

1. Coloque as fotos na pasta `public/media/` com os seguintes nomes (extensão `.jpg`, `.jpeg` ou `.png`):
   - `hero.jpg`: Foto vertical de alta definição do topo.
   - `sandra.jpg`: Retrato da fundadora.
   - `antes-1.jpg` e `depois-1.jpg` (até `antes-4.jpg` e `depois-4.jpg`): Pares reais de transformação para o comparador interativo.
   - `espaco-01.jpg` a `espaco-06.jpg`: Fotos do ambiente e atendimento.
   - `foto-01.jpg` a `foto-20.jpg`: Galeria geral de resultados.
2. Execute o comando de otimização:
   ```bash
   npm run media
   ```
3. O script gera versões modernas em `.avif` e `.webp` em `public/m/` e atualiza `src/data/media.json`. Caso não haja pares de antes e depois, a seção de resultados não polui a página.

---

## 🛠️ Comandos Principais

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento local
npm run dev

# Processar novas imagens adicionadas em public/media
npm run media

# Sincronizar dados e avaliações da API Avec
npm run sync:avec

# Verificar tipos e sintaxe Astro
npx astro check

# Gerar build estático de produção
npm run build

# Validar integridade dos links de WhatsApp e Schema.org
npm run verify:links
```

---

## 🌐 Publicação e Hospedagem

A pasta `dist/` gerada pelo comando `npm run build` contém arquivos 100% estáticos prontos para publicação na Vercel, Netlify, Cloudflare Pages ou qualquer servidor Apache/Nginx.
