# Sandra Lourenço Beauty — Landing Page Oficial

Landing Page mobile-first de alto padrão para **Sandra Lourenço Beauty** (Cosmetologia & Estética Capilar em Fortaleza/CE).

Desenvolvida com **Astro 7 + Tailwind CSS 4**, arquitetura estática ultrarrápida, design system boutique (Charcoal, Off-White, Champagne e Areia) e conversão direta via WhatsApp contextualizado.

---

## 🚀 Tecnologias

- **Framework:** [Astro](https://astro.build/) (Output 100% estático `dist/`)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) com design tokens personalizados em `@theme`
- **Tipografia Self-Hosted:**
  - *Headings (H1, H2, H3):* Cormorant Garamond Variable (`@fontsource-variable/cormorant-garamond`)
  - *Corpo, Menus e Botões:* Montserrat Variable (`@fontsource-variable/montserrat`)
- **Ícones:** Lucide (`@lucide/astro`) com espessura fina (stroke 1.25)
- **Integração:** Script de sincronização automática com a API pública do sistema **Avec** (`scripts/sync-avec.mjs`)
- **SEO & Structured Data:** Schema.org `HairSalon` JSON-LD, Open Graph, Sitemap e robots.txt automáticos

---

## 📂 Estrutura do Projeto

```
lp_sandralourenco/
├── astro.config.mjs               # Configuração do Astro (Tailwind v4 + Sitemap)
├── package.json                   # Dependências e scripts npm
├── tsconfig.json                  # Configuração de TypeScript
├── scripts/
│   ├── sync-avec.mjs              # Busca e sincroniza serviços da API Avec
│   └── verify-links.mjs           # Validação automatizada de integridade da build
├── public/
│   ├── favicon.svg                # Monograma 'SL' em dourado champagne
│   ├── logo.jpg                   # Logo oficial da marca
│   └── robots.txt                 # Diretrizes para indexação
└── src/
    ├── config/
    │   └── site.ts                # ⭐️ FONTE ÚNICA DE DADOS (contatos, horários, textos, TODOs)
    ├── data/
    │   └── avec-services.json     # Snapshot sincronizado com os 20 serviços do Avec
    ├── lib/
    │   ├── format.ts              # Formatadores de preço e tempo
    │   ├── services.ts            # Agregador de serviços e catálogo
    │   └── whatsapp.ts            # Construtor inteligente de links wa.me
    ├── styles/
    │   └── global.css             # Design tokens e variáveis de tema Tailwind v4
    ├── layouts/
    │   └── Base.astro             # Layout base com meta tags, OG e JSON-LD
    ├── components/
    │   ├── ui/                    # Botões, badges, cabeçalhos de seção e placeholders
    │   ├── Header.astro           # Cabeçalho fixo com logo e chamada rápida
    │   ├── Hero.astro             # Dobra principal dark com autoridade e seletor
    │   ├── ProcedureSelector.astro# Pré-qualificação em 2 toques (serviço + período)
    │   ├── Pillars.astro          # Os 3 pilares de garantia técnica
    │   ├── FeaturedProcedures.astro # 4 carros-chefes em destaque (cards 4:5)
    │   ├── ServiceMenu.astro      # Tabela completa dos 20 procedimentos com preços e tempos
    │   ├── Founder.astro          # Seção sobre a fundadora Sandra Lourenço
    │   ├── Transformations.astro  # Casos antes/depois com divisor interativo
    │   ├── Protocol.astro         # O método de biossegurança em 4 etapas
    │   ├── Policies.astro         # Ambiente privativo sem acompanhantes como benefício
    │   ├── Testimonials.astro     # Prova social e nota 5.0 estrelas
    │   ├── Faq.astro              # Perguntas frequentes em accordion nativo
    │   ├── Location.astro         # Endereço em Fortaleza, Google Maps e botões Waze
    │   ├── FinalCta.astro         # Chamada final de agendamento dark
    │   ├── Footer.astro           # Rodapé com CNPJ e navegação
    │   └── WhatsAppFab.astro      # Botão de ação flutuante WhatsApp
    └── pages/
        └── index.astro            # Montagem estrutural da landing page
```

---

## 🛠️ Comandos Disponíveis

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento local
npm run dev

# Sincronizar catálogo atualizado da API Avec
npm run sync:avec

# Validar tipos e sintaxe Astro
npx astro check

# Gerar build estático para produção
npm run build

# Validar integridade dos links gerados no HTML
npm run verify:links

# Visualizar a build estática localmente
npm run preview
```

---

## ⚙️ Como Personalizar os Dados

Todas as informações centrais do espaço estão centralizadas no arquivo [`src/config/site.ts`](src/config/site.ts):
- **Telefone WhatsApp oficial:** altere a propriedade `whatsapp.number`.
- **Endereço e horários:** configurados em `address` e `hours`.
- **Procedimentos em destaque e catálogo:** ajustáveis nas seções `featured` e `menuGroups`.
- **Google Analytics / Meta Pixel:** preencha os IDs em `analytics.ga4` ou `analytics.metaPixel`.

---

## 🌐 Publicação / Hospedagem

A pasta gerada pelo comando `npm run build` é a pasta `dist/`. Ela contém arquivos 100% estáticos (HTML, CSS, JS e imagens), o que permite hospedar em:
- **Vercel, Netlify ou Cloudflare Pages** (apontando o repositório git com comando `npm run build` e pasta de saída `dist`).
- **Hospedagem compartilhada / cPanel (Hostinger, Locaweb, etc.):** basta fazer upload dos arquivos da pasta `dist/` para a raiz do seu domínio (`public_html/`).
