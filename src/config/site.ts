export const site = {
  name: 'Sandra Lourenço Beauty',
  tagline: 'Cosmetologia e estética capilar de alto padrão',
  shortBio: 'Especialista em loiros saudáveis, morena iluminada e alisamento orgânico em Fortaleza.',
  url: 'https://sandralourencobeauty.com.br', // TODO: confirmar domínio definitivo
  instagram: 'https://www.instagram.com/sandralourencobeauty_',
  instagramHandle: '@sandralourencobeauty_',
  cnpj: '30.577.322/0001-69',

  rating: {
    value: '5.0',
    count: 42,
    source: 'Avec VIP',
    label: '42 avaliações 5 estrelas',
  },

  whatsapp: {
    number: '5585989978555',
    formatted: '(85) 98997-8555',
    greeting: 'Olá, equipe Sandra Lourenço! ✨',
  },

  address: {
    street: 'Rua Francisco Sales, 102',
    district: 'Bonsucesso',
    city: 'Fortaleza',
    state: 'CE',
    zip: '60520-500',
    lat: -3.7749811,
    lng: -38.5835572,
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-3.7749811,-38.5835572',
    wazeUrl: 'https://waze.com/ul?ll=-3.7749811,-38.5835572&navigate=yes',
  },

  hours: {
    display: 'Segunda a sexta · 09h às 16h30',
    frequency: 'Atendimentos com hora marcada a cada 30 minutos',
    note: '16h30 é o último horário de início de sessão. Não atendemos aos finais de semana.',
    schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '16:30',
    periods: [
      { id: 'manha', label: 'Manhã', range: '09h às 11h30' },
      { id: 'tarde', label: 'Tarde', range: '12h às 16h30' },
    ],
  },

  pillars: [
    {
      title: 'Teste de mechas rigoroso',
      description: 'Critério técnico intransigente. Avaliamos a saúde da fibra antes de qualquer descoloração ou química.',
      icon: 'microscope',
    },
    {
      title: 'Opção de alisamento sem formol',
      description: 'Escova Orgânica à base de ácidos biocompatíveis. Zero fumaça, zero ardência, compatível com lactantes e gestantes.',
      icon: 'sparkles',
    },
    {
      title: 'Atendimento com hora marcada',
      description: 'Sessões organizadas a cada 30 minutos, ambiente privativo sem acompanhantes e foco exclusivo em você.',
      icon: 'clock',
    },
  ],

  featured: [
    {
      slug: 'loiro-saudavel',
      title: 'Loiro saudável e mechas',
      headline: 'Clareamento de alta precisão com preservação da fibra',
      description: 'Tons platinados, mel, avelã ou champagne construídos sob rigoroso teste de mechas. Clareamento seguro, sem corte químico e com balanço natural.',
      priceDisplay: 'Sob avaliação técnica',
      durationDisplay: 'Conforme diagnóstico',
      badges: ['Teste de mechas obrigatório', 'Tons personalizados'],
      waMessage: 'Gostaria de agendar uma avaliação para *Loiro saudável e mechas*.',
      accent: 'champagne',
    },
    {
      slug: 'morena-iluminada',
      title: 'Morena iluminada',
      headline: 'Contraste suave e brilho espelhado',
      description: 'Pontos de luz desenhados para valorizar os traços e iluminar a pele com elegância. Tons caramelo, canela e avelã com alta durabilidade e saúde capilar.',
      priceDisplay: 'Sob avaliação técnica',
      durationDisplay: 'Conforme diagnóstico',
      badges: ['Contraste sofisticado', 'Baixa manutenção'],
      waMessage: 'Gostaria de consultar disponibilidade para *Morena iluminada*.',
      accent: 'bronze',
    },
    {
      slug: 'escova-organica',
      title: 'Escova Orgânica (sem formol)',
      headline: 'Alinhamento seguro à base de ácidos biocompatíveis',
      description: 'Alisamento indicado para gestantes, lactantes e pessoas alérgicas. Brilho espelhado, zero odor, zero fumaça. (Nota: não compatível com descoloração).',
      priceDisplay: 'A partir de R$ 240',
      durationDisplay: '3h a 4h',
      badges: ['100% Livre de formol', 'Lactantes e gestantes 🤍'],
      waMessage: 'Gostaria de agendar um horário para *Escova Orgânica sem formol*.',
      accent: 'champagne',
    },
    {
      slug: 'alisamento-light',
      title: 'Alisamento Light',
      headline: 'Redução de volume e controle disciplinador',
      description: 'Alinhamento da fibra capilar com caimento natural e redução expressiva de frizz, mantendo o movimento dos fios.',
      priceDisplay: 'A partir de R$ 400',
      durationDisplay: '≈ 5h00',
      badges: ['Teste de mechas', 'Alta durabilidade'],
      waMessage: 'Gostaria de consultar horário para *Alisamento Light*.',
      accent: 'olive',
    },
  ],

  menuGroups: [
    {
      title: 'Cor e clareamento',
      description: 'Procedimentos para iluminação, tonalização e renovação de nuances.',
      items: [
        'Abertura de Fundo',
        'Retoque Abertura de Fundo',
        'Tonalização',
        'Retoque de Tonalização',
        'Coloração',
        'Retoque Coloração',
        'Limpeza de Cor',
        'Matização',
      ],
    },
    {
      title: 'Alisamento e alinhamento',
      description: 'Opções orgânicas e realinhamentos tradicionais.',
      items: [
        'Escova Orgânica',
        'Alisamento Light',
        'Escova Inteligente',
        'Botox',
      ],
    },
    {
      title: 'Corte e tratamentos profissionais',
      description: 'Saúde da fibra, nutrição profunda e corte com finalização refinada.',
      items: [
        'Corte e Finalização',
        'Tratamento Capilar',
        'Escova',
        'Lavagem Especial',
      ],
    },
    {
      title: 'Depilação (serviços complementares)',
      description: 'Procedimentos corporais rápidos com cera profissional.',
      isCompact: true,
      items: [
        'Axilas',
        'Braços',
        'Meia Perna',
        'Perna Completa',
      ],
    },
  ],

  durationOverrides: {
    'Alisamento Light': '≈ 5h00',
    'Botox': '≈ 3h00',
    'Escova Inteligente': '3h a 4h',
    'Escova Orgânica': '3h a 4h',
  } as Record<string, string>,

  formolServices: ['Botox', 'Escova Inteligente'],

  policies: [
    {
      title: 'Espaço 100% privativo',
      description: 'Não permitimos acompanhantes no espaço. Esta política foi desenhada para preservar o silêncio, o conforto e a dedicação total da equipe à sua transformação.',
      icon: 'shield-check',
    },
    {
      title: 'Atendimento com hora marcada',
      description: 'Organizamos a agenda com intervalos de 30 minutos para garantir que seu início seja pontual e seu procedimento flua sem interrupções.',
      icon: 'calendar-check',
    },
    {
      title: 'Teste de mechas obrigatório',
      description: 'Para procedimentos de clareamento ou químicas transformadoras, a realização prévia do teste de mechas é indispensável para resguardar a integridade dos seus fios.',
      icon: 'sparkles',
    },
    {
      title: 'Biossegurança e higienização',
      description: 'Materiais esterilizados, bancadas desinfetadas a cada cliente e uso de toalhas descartáveis/esterilizadas em ambiente limpo e acolhedor.',
      icon: 'heart-handshake',
    },
  ],

  faq: [
    {
      question: 'O teste de mechas é realmente obrigatório?',
      answer: 'Sim! Para Loiros, Mechas e procedimentos químicos como o Alisamento Light, o teste de mechas prévio é nosso protocolo inegociável de segurança. Ele nos dá a certeza de que a estrutura do seu cabelo resistirá ao clareamento com brilho e sem corte químico.',
    },
    {
      question: 'Gestantes e lactantes podem fazer alisamento?',
      answer: 'Sim, através da nossa Escova Orgânica, desenvolvida à base de ácidos e 100% livre de formol. Já os procedimentos que contêm formol (como Botox e Escova Inteligente) não são indicados para gestantes ou lactantes.',
    },
    {
      question: 'Por que o salão não permite acompanhantes?',
      answer: 'Para garantir uma experiência de boutique verdadeiramente privativa e relaxante. Nosso ambiente foi pensado para oferecer tranquilidade, conforto e atenção 100% focada na cliente atendida.',
    },
    {
      question: 'Qual é o horário de funcionamento e como funciona o intervalo de agendamento?',
      answer: 'Atendemos em dias úteis de segunda a sexta, das 09h às 16h30. As sessões iniciam a cada 30 minutos (sendo 16h30 o último horário de início disponível). Não atendemos aos sábados e domingos.',
    },
    {
      question: 'Os valores do site são fixos?',
      answer: 'Os valores indicados são referências "a partir de". O valor final de qualquer procedimento químico ou de cor depende do comprimento, volume, histórico do fio e quantidade de produto necessária, tudo alinhado com transparência no seu diagnóstico.',
    },
    {
      question: 'Como faço para agendar?',
      answer: 'É simples e sem burocracia: basta clicar em qualquer botão do site para abrir diretamente uma conversa com nossa equipe no WhatsApp, com a sua solicitação já contextualizada.',
    },
  ],

  analytics: {
    ga4: '', // TODO: Inserir ID do Google Analytics 4 (ex: G-XXXXXXXXXX)
    metaPixel: '', // TODO: Inserir ID do Meta Pixel (ex: XXXXXXXXXXXXXXX)
  },
} as const;
