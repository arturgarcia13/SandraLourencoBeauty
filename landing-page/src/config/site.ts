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

  featured: [
    {
      slug: 'loiro-saudavel',
      category: 'Clareamento de alta precisão',
      title: 'Ritual Loiro Saudável e Mechas',
      description: 'Clareamento consciente com preservação da fibra capilar. Nuances platinadas, mel e champanhe desenvolvidas sob teste de mechas prévio.',
      highlights: ['Teste de mechas obrigatório', 'Matização sob medida', 'Nutrição pós-química'],
      priceDisplay: 'Sob avaliação técnica',
      durationDisplay: 'Conforme diagnóstico',
      waMessage: 'Gostaria de agendar uma avaliação para o Ritual Loiro Saudável e Mechas.',
    },
    {
      slug: 'morena-iluminada',
      category: 'Contraste e brilho natural',
      title: 'Ritual Morena Iluminada',
      description: 'Pontos de luz estratégicos com degradê aveludado nos tons caramelo, canela e avelã. Efeito de sol com transição suave e raiz esfumada.',
      highlights: ['Diagnóstico visagista de tom', 'Esfumado de raiz', 'Brilho espelhado'],
      priceDisplay: 'Sob avaliação técnica',
      durationDisplay: 'Conforme diagnóstico',
      waMessage: 'Gostaria de consultar disponibilidade para o Ritual Morena Iluminada.',
    },
    {
      slug: 'escova-organica',
      category: 'Alinhamento biocompatível',
      title: 'Ritual Escova Orgânica (sem formol)',
      description: 'Alisamento com movimento e caimento natural à base de ácidos orgânicos nobres. Fórmula pura, sem formol, fumaça ou cheiro forte.',
      highlights: ['100% livre de formol', 'Compatível com gestantes', 'Brilho tridimensional'],
      priceDisplay: 'A partir de R$ 240',
      durationDisplay: '3h a 4h',
      waMessage: 'Gostaria de agendar um horário para o Ritual Escova Orgânica sem formol.',
    },
    {
      slug: 'alisamento-light',
      category: 'Disciplina e redução de volume',
      title: 'Ritual Alisamento Light e Selagem',
      description: 'Disciplina da fibra capilar com caimento solto e controle de frizz. Preserva a estrutura com reposição lipídica profunda e selagem térmica.',
      highlights: ['Avaliação de elasticidade', 'Controle duradouro de frizz', 'Selagem térmica nutritiva'],
      priceDisplay: 'A partir de R$ 400',
      durationDisplay: '≈ 5h00',
      waMessage: 'Gostaria de consultar horário para o Ritual Alisamento Light.',
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

  faq: [
    {
      question: 'O teste de mechas é obrigatório?',
      answer: 'Para clareamento, mechas e alisamento químico, sim. O teste vem antes da química e mostra como a sua fibra responde ao processo, para que o tom, o tempo e o orçamento sejam definidos com critério.',
    },
    {
      question: 'Gestantes e lactantes podem alisar o cabelo?',
      answer: 'A Escova Orgânica é a opção indicada para lactantes, gestantes e alérgicas, pois é feita à base de ácido e livre de formol. Botox e Escova Inteligente contêm formol e não fazem parte dessa indicação.',
    },
    {
      question: 'A Escova Orgânica serve para cabelo descolorido?',
      answer: 'Não. Segundo a descrição do procedimento, a Escova Orgânica não é compatível com a descoloração. Na dúvida, descreva o histórico do seu cabelo no WhatsApp e a equipe orienta o melhor caminho.',
    },
    {
      question: 'Por que o atendimento é sem acompanhantes?',
      answer: 'Para manter o espaço silencioso, privativo e com atenção total à cliente que está sendo atendida. É uma escolha de exclusividade e conforto para todas.',
    },
    {
      question: 'Como funcionam os horários?',
      answer: 'Atendemos de segunda a sexta, das 09h às 16h30, com sessões iniciando a cada 30 minutos. O horário reservado é um bloco de agenda, e o início presencial acompanha o ritmo do atendimento da equipe.',
    },
    {
      question: 'Os valores são fixos?',
      answer: 'Os valores indicados são referências a partir de. O valor final de química e cor depende do comprimento, do volume, do histórico do fio e da quantidade de produto necessária.',
    },
    {
      question: 'Como faço para agendar?',
      answer: 'Toque em qualquer botão do WhatsApp nesta página. A conversa já abre com a mensagem pronta e a equipe confirma as datas disponíveis. Sem cadastro e sem senha.',
    },
  ],

  analytics: {
    ga4: '', // TODO: Inserir ID do Google Analytics 4 (ex: G-XXXXXXXXXX)
    metaPixel: '', // TODO: Inserir ID do Meta Pixel (ex: XXXXXXXXXXXXXXX)
  },
} as const;
