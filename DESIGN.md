# DESIGN.md · Sandra Lourenço Beauty

## Brief
- **Sujeito:** salão boutique de loiros, morena iluminada e alisamento sem formol, Bonsucesso, Fortaleza (CE).
- **Público:** mulheres 25 a 45 que já sabem o que querem (nível 3 a 4 de consciência) e buscam segurança técnica. Mais de 90% do tráfego vem do Instagram, em celular.
- **Trabalho do site:** levar a visitante a uma conversa no WhatsApp com o tom desejado e o período já escolhidos. Uma ação principal.
- **Stack:** Astro 7 estático + GSAP (ScrollTrigger, SplitText) + Lenis, CSS puro com tokens. Projeto já era Astro; o conteúdo é estático e o movimento é o produto.
- **Sem loader e sem WebGL** (decisão do cliente): o espetáculo é o scroll dirigido pela escala de tons, o tipo grande e as fotos reais.

## Concept Card
```
Idea:        O site percorre a escala de tons do cabelo, do castanho escuro ao platinado, enquanto você rola.
Metaphor:    A tabela de níveis de cor (1 a 10) que todo colorista usa para decidir o clareamento.
Signature:   Driver único: o progresso do scroll pinta o fundo da página pelos níveis de cor,
             e o texto troca de tinta no ponto de contraste. O seletor de agendamento é a própria escala.
Emotion:     Calma de estúdio e precisão técnica. "Aqui alguém mede antes de clarear."
Motion verb: Absorver. Tudo assenta devagar, como pigmento no fio: clip e opacidade com saída longa (expo.out).
Screenshot:  O hero: numeral gigante do nível escolhido ao lado do título, no castanho profundo, escala de amostras abaixo.
```
Concepts descartados: "A luz" (reflexo especular, depende de GL) e "A hora marcada" (agenda como estrutura, forte para conversão mas genérico visualmente).

## Palette (por papel, fundo animado entre estas paradas)
| Nível | Nome | bg | Tinta |
|---|---|---|---|
| 1 | Carvão | `#121010` | `#F6EFE6` |
| 2 | Espresso | `#17120F` | `#F6EFE6` |
| 4 | Castanho | `#3A2A1F` | `#F6EFE6` |
| 6 | Caramelo | `#7A5636` | `#F6EFE6` |
| 7 | Mel (só em transição) | `#C79A62` | troca no ponto de contraste |
| 8 | Champanhe | `#E3CBA6` | `#171310` |
| 9 | Areia clara | `#EDDFC7` | `#171310` |
| 10 | Platinado | `#F5F0E7` | `#171310` |

- `--c-accent`: `#C6A87D` (champanhe da marca) só em filetes e numerais sobre fundos escuros; sobre claros vira a própria tinta.
- Verde WhatsApp `#25D366` exclusivo dos botões de conversa, com texto escuro `#0E1A12` (AA).
- Troca de tinta calculada pela luminância relativa do fundo animado, no ponto de maior contraste (cerca de 0,19). Seções ficam em platôs; o texto corrido nunca fica na zona de troca (padding de 12svh nas bordas).
- Fundos são sempre uma cor chapada por frame, sem gradiente.

## Type
- **Display:** Cormorant Garamond Variable 500/600, só em títulos, numerais e citações. Sem itálico. Tracking −0.02em a −0.035em nos tamanhos grandes.
- **Texto, UI e botões:** Montserrat Variable 400/500/600, 16 a 17 px com entrelinha 1,55. UI pequena 12 a 14 px com contraste AA.
- Escala fluida: mega 52→152, xl 40→96, l 30→56, m 22→30, corpo 16→17, s 14, xs 12.
- `text-wrap: balance` em títulos, `pretty` em parágrafos. Sem hífen e sem travessão em texto visível, sentence case.

## Grid e ritmo
- 12 colunas, gutter fluido 16→40 px, margem lateral igual ao gutter. Máximo 1440 px.
- Raio único: 10 px (imagens, cartões, botões, amostras). Nada totalmente redondo, exceto o botão flutuante.
- Linhas de 1 px com a tinta a 14%. Sem sombras pesadas.
- Ritmo de seções alternando famílias: pôster (hero), frase gigante, comparadores, lista editorial, passos em colunas, split sticky, parede de frases, duas colunas, fechamento.

## Motion language
- Um relógio: `gsap.ticker` move o Lenis; ScrollTrigger lê o Lenis. Sem listeners de scroll próprios.
- Easing: `expo.out` (entrada), `power3.out` (UI pequena). Durações 0,9 a 1,3 s; grandes mais lentas que pequenas. Stagger 20 a 80 ms.
- Reveals: títulos por linha com máscara (SplitText), blocos por clip-path e opacidade.
- Reduced motion: scroll nativo, fundos por seção em cores chapadas (a escala continua visível, sem animar), tudo visível.

## Composition plan
```
HERO (nível 1)                 CHANCELA DE MARCAS (nível 1)  TAGLINE & RESULTADOS (nível 1)
┌────────────────────────┐     ┌────────────────────────┐    ┌────────────────────────┐
│ header: logo  N1 · CTA │     │ 6 marcas de elite      │    │ Manifesto: respeito à  │
│ H1 (cols 1-7)  │ poster│     │ Wella · Kérastase ·    │    │ fibra capilar.         │
│ sub            │ escala│     │ Braé · Truss · L'Oréal │    │ Resultados reais sob   │
│ seletor 1..10  │ 7 Mel │     │ Avec VIP 5.0           │    │ teste de mechas.       │
└────────────────────────┘     └────────────────────────┘    └────────────────────────┘
SERVIÇOS (nível 4 Moreno)      MÉTODO (nível 9 Areia)        ESPAÇO + SANDRA (nível 9)
┌────────────────────────┐     ┌────────┬────────┬───────┐   ┌───────────┬────────────────┐
│ Rituais de assinatura  │     │ 1 Diag │ 2 Teste│ 3 ... │   │ retrato   │ texto, regras  │
│ com etapas e categoria │     │ nóstico│ de mech│ 4 ... │   │ sticky    │ como benefício │
│ tabela dos 20 serviços │     └────────┴────────┴───────┘   │           │ equipe         │
└────────────────────────┘                                   └───────────┴────────────────┘
AVALIAÇÕES (nível 10 Plat.)    FAQ + LOCALIZAÇÃO (nível 10)  FECHAMENTO (nível 1 Carvão)
┌────────────────────────┐     ┌─────────────┬──────────┐    ┌────────────────────────┐
│ 22 clientes · 42 notas │     │ FAQ         │ endereço │    │ "Qual é o seu tom?"    │
│ tags de procedimento   │     │ details     │ mapa     │    │ seletor de novo        │
│ parede de frases reais │     │             │ Waze/Maps│    │ rodapé, CNPJ, legal    │
└────────────────────────┘     └─────────────┴──────────┘    └────────────────────────┘
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
