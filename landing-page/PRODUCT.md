# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Público principal:** Mulheres em Fortaleza (e região metropolitana) que buscam transformações capilares de alto padrão: loiros saudáveis de alta precisão (platinados, mel, champanhe), morena iluminada com contraste natural (caramelo, avelã) e alisamento orgânico biocompatível sem formol.
- **Situação:** Clientes exigentes, frequentemente receosas quanto a danos provocados por químicas agressivas ou incompatibilidades anteriores; buscam segurança, preservação da saúde da fibra capilar e atendimento com diagnóstico individualizado.
- **Job to be Done:** Conquistar a cor ou o alinhamento capilar desejado com garantia de saúde do fio, descobrindo o tom ideal e agendando com rapidez e previsibilidade via WhatsApp.

## Product Purpose
- A presença digital oficial de **Sandra Lourenço Beauty** (Cosmetologia e Estética Capilar de alto padrão em Fortaleza, CE).
- Apresentar a autoridade técnica da fundadora e equipe, evidenciar o rigor com a integridade capilar e qualificar o contato da cliente antes do agendamento presencial.
- Sucesso significa atrair e converter clientes qualificadas, com expectativas realistas de procedimento e tom, filtrando decisões impulsivas por meio do teste de mechas obrigatório e da consulta prévia.

## Positioning
- **Cosmetologia capilar orientada à saúde da fibra:** clareamento consciente e alinhamentos biocompatíveis guiados por teste prévio mandatório.
- **Diferenciais inegociáveis:**
  - Aplicação prática da escala técnica de tons (níveis 1 a 10) no diagnóstico e na condução visual do atendimento.
  - Atendimento individualizado sem acompanhantes, garantindo exclusividade, tranquilidade e foco técnico total na cliente.
  - Recusa expressa de químicas incompatíveis (ex.: escova orgânica sobre descoloração recente, clareamento sem teste de resistência da fibra).

## Operating Context
- **Espaço físico:** Estúdio privativo na Rua Francisco Sales, 102, Bonsucesso, Fortaleza/CE.
- **Rituais de atendimento:**
  1. Diagnóstico prévio e visagismo de tom.
  2. Teste de mechas obrigatório para todas as químicas (clareamento, mechas e alisamento).
  3. Sessões com blocos de agenda a cada 30 minutos (16h30 como último horário de início).
  4. Atendimento sem acompanhantes para manutenção do silêncio, conforto e privacidade.
- **Ferramentas operacionais:** WhatsApp oficial (+55 85 98997-8555) como canal único de triagem e agendamento; integração de catálogo, equipe e avaliações com o ecossistema Avec VIP.

## Capabilities and Constraints
- **Capacidades do produto:**
  - Seletor de agendamento em 2 toques (tom desejado + período do dia) que gera mensagem contextualizada e pronta para o WhatsApp.
  - Sincronização automatizada de dados da API Avec VIP (serviços, equipe técnica e 42 avaliações 5 estrelas).
  - Pipeline automatizado de otimização de imagens em formatos modernos (AVIF e WebP responsivos).
  - Experiência web fluida e ultraveloz baseada em Astro SSG, GSAP ScrollTrigger e Lenis.
- **Restrições operacionais duráveis:**
  - Horário fixo de atendimento: Segunda a sexta, das 09h às 16h30 (sem expediente aos finais de semana).
  - Teste de mechas mandatório antes de qualquer química capilar.
  - Política rigorosa de atendimento sem acompanhantes.
  - Clara distinção técnica entre procedimentos orgânicos (sem formol) e procedimentos que contêm formol (Botox, Escova Inteligente).
- **Fatos em aberto (a confirmar definitivamente com o cliente):**
  - Domínio definitivo de produção (atualmente `https://sandralourencobeauty.com.br`).
  - IDs de rastreamento do Google Analytics 4 e Meta Pixel.

## Brand Commitments
- **Nome:** Sandra Lourenço Beauty.
- **Voz da marca:** Técnica, sofisticada, acolhedora e transparente. Autoridade em cosmetologia sem afetação; respeito à verdade da fibra capilar.
- **Marcas de elite parceiras:** Wella Professionals, Kérastase, Braé, Truss, L'Oréal Professionnel.
- **Compromissos éticos e de comunicação:**
  - Proibição absoluta de depoimentos, notas ou casos de antes e depois forjados.
  - Proibição de promessas milagrosas como "zero ardência garantida" ou "clareamento sem limites".

## Evidence on Hand
- **Catálogo de serviços:** 20 procedimentos reais catalogados e sincronizados em `src/data/avec-services.json`.
- **Avaliações reais:** 42 notas 5 estrelas do Avec VIP de 22 clientes reais catalogadas em `src/data/avec-reviews.json`.
- **Equipe técnica:** Cadastro de profissionais em `src/data/avec-team.json`.
- **Identidade da marca:** Logotipo oficial em `public/logo.jpg`, monograma SL em `public/favicon.svg`.
- **Repositório de mídia:** Pipeline configurado em `public/media/` com exibição de resultados condicionada à existência de fotos reais.
- **Dados cadastrais:** CNPJ 30.577.322/0001-69.

## Product Principles
- **A saúde da fibra capilar rege todas as decisões:** A integridade do cabelo antecede a vontade estética; o teste de mechas é indispensável e intransigível.
- **Transparência química integral:** Diferenciação honesta entre produtos compatíveis e incompatíveis; nunca ocultar composições ou riscos.
- **Exclusividade e serenidade no estúdio:** Ambiente reservado e foco absoluto na cliente atendida, sem distrações ou sobrelotação.
- **Qualificação ágil com toque humano:** Conversão direta em 2 toques que encaminha a cliente qualificada para atendimento caloroso no WhatsApp.

## Accessibility & Inclusion
- Contraste tipográfico em conformidade com WCAG 2.1 AA em todos os estados da escala de tons.
- Suporte irrestrito a `prefers-reduced-motion` com desativação graciosa de animações e transições cromáticas.
- Estrutura semântica nativa e foco gerenciável para leitores de tela em seletores e links de contato.
