# Sandra Lourenço Beauty · dois produtos

Repositório guarda-chuva da marca. Dentro dele vivem **dois produtos
independentes**, cada um com README, build e deploy próprios:

| Pasta | Produto | Stack | Publicação |
| --- | --- | --- | --- |
| [`landing-page/`](./landing-page/) | Site oficial (landing page completa) | Astro + GSAP + Lenis | `npm run build` → `dist/` |
| [`link-in-bio/`](./link-in-bio/) | Página de links para bio | HTML + CSS, sem build | a pasta como está |

Nenhuma das pastas depende da outra: imagens, logo e ícones do link-in-bio são
locais, e o site não publica mais `/links/`.

## Rodando cada produto

### Landing page

```bash
cd landing-page
npm install
npm run dev      # http://localhost:4321
npm run build    # gera landing-page/dist/
```

### Link-in-bio

```bash
cd link-in-bio
python3 -m http.server 8000
# http://localhost:8000
```

Não há `npm install`, build ou dependência de JS: abrir `index.html` também
funciona.

## Deploy

Os dois produtos saem do mesmo repositório, mas com configurações separadas:

- **Landing page** — diretório raiz do projeto: `landing-page/`. Comando de
  build: `npm run build`. Diretório de saída: `dist`.
- **Link-in-bio** — diretório raiz do projeto: `link-in-bio/`. Sem comando de
  build, sem diretório de saída (publica a pasta como está).

## Documentação

- [`landing-page/README.md`](./landing-page/README.md) — conceito, estrutura do
  site, processamento de fotos e scripts.
- [`landing-page/DESIGN.md`](./landing-page/DESIGN.md) — sistema visual
  (paleta Champagne & Espresso, tipografia, ritmo de seções e movimento).
- [`landing-page/PRODUCT.md`](./landing-page/PRODUCT.md) — verdade da marca,
  posicionamento e restrições de conteúdo.
- [`link-in-bio/README.md`](./link-in-bio/README.md) — como editar e publicar a
  página de links.
