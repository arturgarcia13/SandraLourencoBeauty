# Sandra Lourenço Beauty · Link-in-bio

Página de links (link-in-bio) da Sandra Lourenço Beauty — **produto independente
do site**. É uma pasta estática, mobile-first, sem build, sem dependência de JS e
sem nada emprestado de `../landing-page/`.

Publicada por enquanto em `https://sandralourencobeauty.com.br/links/`.

## Estrutura

```
link-in-bio/
├── index.html                  # página inteira: marcação, CSS e ícones SVG inline
└── assets/
    ├── depois-1-*.avif|webp    # foto do card "Ritual Escova Orgânica" (480/960)
    ├── foto4-*.avif|webp       # foto do card "Ritual Alisamento Light" (480/960)
    ├── logo-transparent.png    # monograma (máscara CSS do rodapé e do OG)
    ├── logo-original.jpg       # arquivo original do logo, 150×150
    ├── monograma.png           # logo recortado em PNG transparente (avatar)
    ├── icon.png                # ícone do navegador, 180×180
    ├── icon-32.png             # ícone do navegador, 32×32
    └── og-image.jpg            # cartão de compartilhamento, 1200×630
```

## Como editar

Tudo vive em `index.html`:

1. **Cores e fontes** — variáveis CSS no topo (`:root`): `--bg`, `--surface`,
   `--deep`, `--ink`, `--accent`, `--champagne`. A paleta é a mesma "Champagne &
   Espresso" documentada em [`../landing-page/DESIGN.md`](../landing-page/DESIGN.md).
2. **Identidade** — o `<header class="id">`: nome, função, bio e as pílulas de
   prova (nota no Avec e horário).
3. **Lista de links** — o `<nav class="links">`: cada `<a class="link">` tem
   ícone, rótulo, descrição e seta. O primeiro é a ação principal em caramelo
   (`.link--primary`).
4. **Cards de destaque** — a `<section class="picks">`: foto, selo, nome do
   ritual, descrição, preço e botão de agendamento.
5. **Rodapé** — `<footer class="foot">`: endereço, telefone, horário, site, CNPJ
   e os três ícones sociais.
6. **Botão flutuante** — `<a class="fab">` no fim do documento. É o único ponto
   da página em verde WhatsApp; o resto do sistema é creme, espresso e champanhe.

Os links de WhatsApp já saem com mensagem pronta (`?text=`). Para mudar o número,
busque por `5585989978555` — ele aparece no botão principal, nos cards, no rodapé,
no botão flutuante e no JSON-LD.

## Movimento

Duas camadas, todas em CSS e sem biblioteca:

- **Rolagem (nos dois sentidos)** — cada bloco entra quando chega à tela e
  desfaz a entrada quando sai, tanto descendo quanto subindo. A classe `is-out`
  é marcada pelo `IntersectionObserver`; o fio do título "Destaques da casa"
  cresce da esquerda junto com o bloco.
- **Ponteiro** — elevação no hover apenas em `(hover: hover)`, para o estado não
  ficar grudado depois do toque; `:active` dá o retorno de pressão.

**Nada anima na recarga:** no carregamento só o que está fora da tela recebe
`is-out`, e as transições só são ligadas depois do primeiro quadro — o que já
está visível aparece seco. Sem JS nada fica escondido, e
`prefers-reduced-motion` mantém tudo visível e sem movimento.

## Assets

- `monograma.png` foi gerado de `logo-original.jpg` (fundo branco removido,
  traço na cor da tinta). Se o logo mudar, regenere com:

  ```bash
  magick logo-original.jpg -colorspace Gray -negate -level 10%,96% \
    -alpha copy -trim +repage -fill '#2b1f17' -colorize 100 -depth 8 monograma.png
  ```

- `icon.png` e `icon-32.png` são o mesmo monograma em champanhe sobre espresso,
  com cantos arredondados.
- `og-image.jpg` é o cartão 1200×630 de compartilhamento (WhatsApp, Instagram,
  LinkedIn).

## Publicar

Não há build: publique a pasta como está.

- **Servidor local:** `cd link-in-bio && python3 -m http.server 8000`
- **Netlify / Vercel / Cloudflare Pages:** diretório raiz `link-in-bio/`, sem
  comando de build e sem diretório de saída.
- **Hospedagem tradicional:** copie o conteúdo da pasta para o destino.

## Se o endereço mudar

O arquivo tem três URLs absolutas que apontam para `/links/`. Se a página for
publicada em outro caminho ou domínio, atualize:

- `<link rel="canonical">`
- `<meta property="og:url">` e `<meta property="og:image">`
- `"image"` no JSON-LD (`HairSalon`)

Os links para o site (`https://sandralourencobeauty.com.br`) são intencionais:
são o outro produto da marca.
