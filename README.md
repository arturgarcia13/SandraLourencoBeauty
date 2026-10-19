# Sandra Lourenço Beauty · Landing Page Oficial

Landing Page mobile-first de alto padrão para **Sandra Lourenço Beauty** (Cosmetologia e Estética Capilar em Fortaleza, CE).

Desenvolvida com **Astro estático + GSAP (ScrollTrigger, SplitText) + Lenis** e CSS puro estruturado em tokens de design. Paleta **Champagne & Espresso**: base creme luminosa com pausas de espresso, ritmo de superfícies por seção e conversão direta para o WhatsApp oficial.

---

## 🎨 Conceito e Identidade Visual

- **Metáfora:** A luz do estúdio — creme durante o trabalho, espresso nos momentos de decisão.
- **Assinatura:** Ritmo de superfícies (creme `--bg-base`, areia `--bg-alt`, espresso `--bg-deep`), tipografia serifada grande e reveals bidirecionais que entram e saem com a rolagem.
- **Tipografia:**
  - *Headings:* Cormorant Garamond Variable (`@fontsource-variable/cormorant-garamond`), sem itálico, proporções balanceadas.
  - *Corpo, UI e botões:* Montserrat Variable (`@fontsource-variable/montserrat`), legibilidade alta no mobile.
- **Ação única de conversão:** Botões de WhatsApp contextuais por serviço (com mensagem pronta) e a pílula flutuante de conversa, única superfície em verde WhatsApp. O cabeçalho mantém apenas o botão **Menu** (mesmo no desktop).

A referência completa do sistema (paleta, contraste, ritmo de seções e linguagem de movimento) está em [`DESIGN.md`](./DESIGN.md).

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
│   ├── links/                  # Produto separado: página de links (link-in-bio) em HTML único
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
    ├── engine/                 # Motor de lifecycle, scroll (Lenis/GSAP) e reveals
    ├── motion/                 # Drivers de movimento (reveals, carrossel, FAB, menu, analytics)
    ├── styles/
    │   └── global.css          # Tokens de cor, tipografia fluida e estilos estruturais
    ├── layouts/
    │   └── Base.astro          # Layout com SEO, Schema.org HairSalon e flags de acessibilidade
    ├── components/
    │   ├── Header.astro        # Cabeçalho fixo: logo + botão Menu que abre o overlay full-screen
    │   ├── Hero.astro          # H1 de benefício, CTAs e carrossel de fotos
    │   ├── Tagline.astro       # Manifesto técnico revelado palavra por palavra no scroll
    │   ├── Results.astro       # Comparador antes e depois (renderizado com fotos reais)
    │   ├── Services.astro      # 4 destaques editoriais + tabela completa de serviços
    │   ├── Method.astro        # Protocolo técnico em 4 etapas
    │   ├── Space.astro         # Espaço, regras como benefício e equipe técnica
    │   ├── Reviews.astro       # Estatística de fidelidade (22 clientes, 10 voltaram) e citações
    │   ├── FaqLocation.astro   # FAQ em details/summary nativo + mapa interativo e Waze
    │   ├── FinalCta.astro      # Fechamento em espresso com CTA de agendamento
    │   ├── Footer.astro        # Rodapé institucional com CNPJ e links legais
    │   └── WhatsAppFab.astro   # Ícone flutuante de conversa (mobile), oculto no CTA final
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
