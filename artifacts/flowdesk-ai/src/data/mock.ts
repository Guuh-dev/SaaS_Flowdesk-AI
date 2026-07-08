export const conversations = [
  {
    id: '1',
    name: 'Ana Beatriz Santos',
    lastMessage: 'Gostaria de saber o prazo de entrega...',
    time: '2min',
    unread: 3,
    tag: 'Novo Lead',
    score: 87,
    source: 'WhatsApp',
    avatar: 'AB',
    messages: [
      { id: 'm1', sender: 'client', text: 'Olá, boa tarde!', time: '14:30' },
      { id: 'm2', sender: 'client', text: 'Gostaria de saber o prazo de entrega para o meu CEP 04538-132', time: '14:31' }
    ]
  },
  {
    id: '2',
    name: 'Ricardo Ferreira',
    lastMessage: 'Qual o valor para 50 unidades?',
    time: '15min',
    unread: 1,
    tag: 'Urgente',
    score: 92,
    source: 'Instagram',
    avatar: 'RF',
    messages: [
      { id: 'm1', sender: 'client', text: 'Vi o post no feed', time: '14:15' },
      { id: 'm2', sender: 'client', text: 'Qual o valor para 50 unidades?', time: '14:15' }
    ]
  },
  {
    id: '3',
    name: 'Carla Mendonça',
    lastMessage: 'Perfeito! Pode enviar o contrato',
    time: '1h',
    unread: 0,
    tag: null,
    score: 76,
    source: 'Site',
    avatar: 'CM',
    messages: [
      { id: 'm1', sender: 'me', text: 'Olá Carla, enviamos o orçamento no seu e-mail.', time: '13:00' },
      { id: 'm2', sender: 'client', text: 'Perfeito! Pode enviar o contrato', time: '13:30' }
    ]
  },
  {
    id: '4',
    name: 'Marcos Oliveira',
    lastMessage: 'Preciso de uma proposta urgente',
    time: '2h',
    unread: 2,
    tag: 'Urgente',
    score: 95,
    source: 'WhatsApp',
    avatar: 'MO',
    messages: [
      { id: 'm1', sender: 'client', text: 'Preciso de uma proposta urgente', time: '12:30' }
    ]
  },
  {
    id: '5',
    name: 'Juliana Costa',
    lastMessage: 'Vocês fazem parcelamento?',
    time: '3h',
    unread: 0,
    tag: 'Novo Lead',
    score: 61,
    source: 'WhatsApp',
    avatar: 'JC',
    messages: [
      { id: 'm1', sender: 'client', text: 'Vocês fazem parcelamento?', time: '11:30' }
    ]
  },
  {
    id: '6',
    name: 'Fernando Alves',
    lastMessage: 'Ok, vou pensar e te retorno',
    time: '5h',
    unread: 0,
    tag: null,
    score: 34,
    source: 'Site',
    avatar: 'FA',
    messages: [
      { id: 'm1', sender: 'me', text: 'Qualquer dúvida estamos à disposição.', time: '09:00' },
      { id: 'm2', sender: 'client', text: 'Ok, vou pensar e te retorno', time: '09:30' }
    ]
  }
];

export const leads = {
  novo: [
    { id: 'l1', name: 'Ana Beatriz Santos', value: 4800, source: 'Instagram', score: 87 },
    { id: 'l2', name: 'Juliana Costa', value: 1200, source: 'WhatsApp', score: 61 },
    { id: 'l3', name: 'Pedro Henrique Lima', value: 9500, source: 'Site', score: 79 },
  ],
  contatado: [
    { id: 'l4', name: 'Ricardo Ferreira', value: 22000, source: 'Instagram', score: 92 },
    { id: 'l5', name: 'Larissa Rocha', value: 3400, source: 'WhatsApp', score: 55 },
  ],
  qualificado: [
    { id: 'l6', name: 'Marcos Oliveira', value: 15000, source: 'WhatsApp', score: 95 },
    { id: 'l7', name: 'Camila Dias', value: 6700, source: 'Site', score: 83 },
  ],
  proposta: [
    { id: 'l8', name: 'Carla Mendonça', value: 8900, source: 'Site', score: 76 },
  ],
  fechado: [
    { id: 'l9', name: 'Bruno Takahashi', value: 31000, source: 'Instagram', score: 99 },
    { id: 'l10', name: 'Fernanda Gomes', value: 12400, source: 'WhatsApp', score: 88 },
  ],
};

export const automations = [
  { id: 'a1', name: 'Responder perguntas sobre preço automaticamente', description: 'Quando cliente menciona "valor", "preço" ou "quanto custa"', enabled: true, executions: 47, category: 'Resposta' },
  { id: 'a2', name: 'Agendar follow-up após 24h sem resposta', description: 'Envia lembrete personalizado ao cliente após 24h de silêncio', enabled: true, executions: 23, category: 'Follow-up' },
  { id: 'a3', name: 'Classificar urgência da mensagem', description: 'IA analisa contexto e marca como Urgente quando necessário', enabled: true, executions: 89, category: 'Classificação' },
  { id: 'a4', name: 'Detectar intenção de compra', description: 'Score de interesse calculado em tempo real com base na conversa', enabled: true, executions: 134, category: 'Score' },
  { id: 'a5', name: 'Notificar sobre lead de alto valor (> R$ 10.000)', description: 'Alerta imediato quando lead tem potencial acima de R$ 10.000', enabled: false, executions: 8, category: 'Alerta' },
  { id: 'a6', name: 'Resumo diário às 8h', description: 'Relatório com leads do dia, conversas pendentes e métricas', enabled: true, executions: 15, category: 'Relatório' },
];

export const weeklyData = [
  { day: 'Seg', conversations: 23, leads: 8 },
  { day: 'Ter', conversations: 31, leads: 12 },
  { day: 'Qua', conversations: 19, leads: 6 },
  { day: 'Qui', conversations: 42, leads: 17 },
  { day: 'Sex', conversations: 38, leads: 14 },
  { day: 'Sáb', conversations: 15, leads: 5 },
  { day: 'Dom', conversations: 9, leads: 3 },
];

export const leadStatusData = [
  { name: 'Novo', value: 34, color: '#3B82F6' },
  { name: 'Em Negociação', value: 28, color: '#8B5CF6' },
  { name: 'Convertido', value: 22, color: '#10B981' },
  { name: 'Perdido', value: 16, color: '#EF4444' },
];