# DESIGN.md · Sandra Lourenço Beauty

## Brief
- **Sujeito:** salão boutique de loiros, morena iluminada e alisamento sem formol, Bonsucesso, Fortaleza (CE).
- **Público:** mulheres 25 a 45 que já sabem o que querem (nível 3 a 4 de consciência) e buscam segurança técnica. Mais de 90% do tráfego vem do Instagram, em celular.
- **Trabalho do site:** levar a visitante a uma conversa no WhatsApp. Uma ação principal, sem formulário.
- **Stack:** Astro 7 estático + GSAP (ScrollTrigger, SplitText) + Lenis, CSS puro com tokens. Projeto já era Astro; o conteúdo é estático e o movimento é o produto.
- **Sem loader e sem WebGL** (decisão do cliente): o espetáculo é o tipo grande, as fotos reais e o ritmo de superfícies claras com dois momentos de espresso.

## Concept Card
```
Idea:        Base creme luminosa com pausas de espresso; o site respira entre claro e escuro.
Metaphor:    A luz do estúdio: creme durante o trabalho, espresso nos momentos de decisão.
Signature:   Ritmo de superfícies (creme, areia, espresso) e serif editorial grande.
Emotion:     Calma de estúdio e precisão técnica. "Aqui alguém mede antes de clarear."
Motion verb: Assentar. Reveals bidirecionais (entram e saem) com máscara e expo.out.
Screenshot:  Hero creme: eyebrow, título serif, botão caramelo e carrossel de fotos à direita.
```
Concepts descartados: "A luz" (reflexo especular, depende de GL), "A hora marcada" (genérico visualmente) e o **driver de cor por scroll** (pesava a página em marrom escuro e contradizia a promessa de luminosidade — substituído pelo ritmo estático abaixo).

## Palette · "Champagne & Espresso"
| Token | Hex | Uso |
|---|---|---|
| `--bg-base` | `#F7F1E8` | Fundo principal (creme) |
| `--bg-alt` | `#EFE4D3` | Seções alternadas (areia) |
| `--bg-deep` | `#3A2A1F` | Seções de contraste (espresso) |
| `--bg-footer` | `#2B1F17` | Rodapé |
| `--surface` | `#FFFCF7` | Cartões (branco quente, nunca `#FFF`) |
| `--ink` | `#2B1F17` | Texto principal em fundo claro |
| `--ink-soft` | `#6B5A4C` | Texto secundário em fundo claro (5,9:1 sobre creme) |
| `--on-deep` | `#F7F1E8` | Texto em fundo escuro (12,2:1) |
| `--accent` | `#9A5B2E` | Botão primário em fundo claro e links de ação |
| `--accent-hover` | `#7F4822` | Hover/pressionado |
| `--champagne` | `#E9CFA6` | Botão primário **sobre fundo escuro** |
| `--gold` | `#D9B27C` | Detalhes e ícones sobre escuro |
| `--line` | `#E0D2BD` | Bordas e divisores |
| `--wa` | `#25D366` | **Só** o botão flutuante de conversa |

- Regras: fora da paleta saíram o laranja, os cinzas frios e o branco puro. `--champagne` e `--gold` só aparecem sobre escuro; sobre claro o detalhe é `--accent`.
- Contrastes validados (WCAG AA, texto ≥ 4,5:1): ink/base 14,3 · ink-soft/base 5,9 · on-deep/deep 12,2 · accent/base 4,8 · branco/accent 5,4 · champagne/ink 10,6 · wa-ink/wa 9,0.
- Atenção: `--accent` como **texto** sobre `--bg-alt` é 4,27 — sobre areia usar `--accent-hover` (5,9) ou `--ink-soft`.
- Fundos são cores chapadas por seção (sem gradiente, sem animação de cor).

### Ritmo de seções
| Seção | Fundo |
|---|---|
| Hero | `--bg-base` |
| Marcas | `--bg-alt` |
| Manifesto | `--bg-deep` |
| Resultados | `--bg-alt` |
| Serviços | `--bg-base` |
| Método | `--bg-alt` |
| O espaço | `--bg-base` |
| Avaliações | `--bg-alt` |
| FAQ | `--bg-base` |
| Agendar (CTA final) | `--bg-deep` |
| Rodapé | `--bg-footer` |

## Type
- **Display:** Cormorant Garamond Variable 500/600, só em títulos, numerais e citações. Sem itálico. Tracking −0.02em a −0.035em nos tamanhos grandes.
- **Texto, UI e botões:** Montserrat Variable 400/500/600, 16 a 17 px com entrelinha 1,55. UI pequena 12 a 14 px com contraste AA.
- Escala fluida: mega 52→152, xl 40→96, l 30→56, m 22→30, corpo 16→17, s 14, xs 12.
- `text-wrap: balance` em títulos, `pretty` em parágrafos. Sem hífen e sem travessão em texto visível, sentence case.
- Eyebrow: 12–13 px, caixa alta, tracking 0,16em, cor `--accent` (sobre escuro, `--gold`).

## Grid e ritmo
- 12 colunas, gutter fluido 16→40 px, margem lateral igual ao gutter. Máximo 1440 px.
- Raio único: 10 px (imagens, cartões, botões, amostras). Nada totalmente redondo, exceto o botão flutuante.
- Linhas de 1 px com `--line`. Sem sombras pesadas.
- Ritmo de seções: pôster (hero), faixa de marcas, frase gigante, comparadores, lista editorial, passos em colunas, split sticky, parede de frases, duas colunas, fechamento.

## Motion language
- Um relógio: `gsap.ticker` move o Lenis; ScrollTrigger lê o Lenis. Sem listeners de scroll próprios (exceto o FAB e o carrossel, que apenas leem o estado).
- Easing: `expo.out` (entrada), `power3.out` (UI pequena). Durações 0,9 a 1,3 s; grandes mais lentas que pequenas. Stagger 20 a 80 ms.
- **Reveals bidirecionais:** o elemento entra ao aparecer e volta ao estado inicial ao sair, em qualquer direção (`toggleActions: 'play reverse play reverse'`), então anima de novo na próxima passagem. Títulos por linha com máscara (SplitText); blocos por clip-path e opacidade.
- Reduced motion: sem deslocamento, tudo visível, scroll nativo; carrossel sem autoplay.

## Composition plan
```
HERO (base)                    CHANCELA DE MARCAS (alt)      MANIFESTO (deep)
┌────────────────────────┐     ┌────────────────────────┐    ┌────────────────────────┐
│ header: logo, Menu     │     │ 6 marcas de elite      │    │ Frase gigante:         │
│ eyebrow                │     │ Wella · Kérastase ·    │    │ respeito à fibra       │
│ H1 (cols 1-7)  │fotos  │     │ Braé · Truss · L'Oréal │    │ capilar.               │
│ sub + CTAs     │carross│     │ Avec VIP 5.0           │    │                        │
│ linha de confiança     │     └────────────────────────┘    └────────────────────────┘
└────────────────────────┘
RESULTADOS (alt)               SERVIÇOS (base)               MÉTODO (alt)
┌────────────────────────┐     ┌────────────────────────┐    ┌────────┬────────┬───────┐
│ comparadores antes/depois│    │ Rituais de assinatura  │    │ 1 Diag │ 2 Teste│ 3 ... │
│ galeria de resultados  │     │ tabela dos 20 serviços │    │ nóstico│ de mech│ 4 ... │
└────────────────────────┘     └────────────────────────┘    └────────┴────────┴───────┘
ESPAÇO + SANDRA (base)         AVALIAÇÕES (alt)              FAQ + LOCALIZAÇÃO (base)
┌───────────┬────────────┐     ┌────────────────────────┐    ┌─────────────┬──────────┐
│ retrato   │ texto,     │     │ 22 clientes · 42 notas │    │ FAQ         │ endereço │
│ sticky    │ benefícios │     │ parede de frases reais │    │ details     │ mapa     │
└───────────┴────────────┘     └────────────────────────┘    └─────────────┴──────────┘
FECHAMENTO (deep) + RODAPÉ (footer)
┌────────────────────────┐
│ "Vamos descobrir o seu │
│  tom?" + CTA WhatsApp  │
└────────────────────────┘
```

## Genericness test & Benchmark (Faces by Clara)
Um modelo genérico, com "salão de beleza de luxo", entregaria hero escuro com foto, ouro e serifa, três cartões de benefícios e carrossel de depoimentos.
Extraímos do benchmark Faces by Clara (editorial de luxo em NY):
1. **Chancela de marcas de elite (Brand Bar):** em vez de auto-elogio, autoridade internacional imediata (Wella, Kérastase, Braé, Truss, L'Oréal, Avec VIP).
2. **Rituais de experiência:** serviços apresentados como transformações completas com etapas explícitas (diagnóstico visagista, teste de mechas, selagem).
3. **Prova social contextualizada:** cada avaliação exibe o procedimento e tom realizado, gerando identificação direta com o desejo da visitante.
4. **Performance preservada:** rejeitamos templates lentos; o site mantém SSG Astro 7 (<300ms) e conversão em 2 toques no WhatsApp oficial.

## Conteúdo real e premissas
- Serviços, preços, tempos, equipe e avaliações vêm da API pública do Avec (`npm run sync:avec`).
- Fotos reais: `public/media` + `npm run media`. Sem pares de antes e depois, a seção Resultados não é renderizada.
- Removido o que era inventado: depoimentos escritos por IA, legendas de casos, "passo certificado", afirmações de esterilização e "zero ardência".
- **Premissas para confirmar com a Sandra:** horário (segunda a sexta, 9h às 16h30), WhatsApp (+55 85 98997-8555), nomes da equipe, domínio, IDs de GA4 e Pixel.
