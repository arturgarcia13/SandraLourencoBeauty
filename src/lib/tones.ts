import { waLink } from './whatsapp';

/** Escala de níveis de cor: cada parada é uma cor chapada de fundo com sua tinta. */
export const levels = {
  1: { name: 'Carvão', bg: '#121010', ink: '#F6EFE6' },
  2: { name: 'Espresso', bg: '#17120F', ink: '#F6EFE6' },
  3: { name: 'Castanho escuro', bg: '#261C14', ink: '#F6EFE6' },
  4: { name: 'Moreno', bg: '#3A2A1F', ink: '#F6EFE6' },
  6: { name: 'Caramelo', bg: '#7A5636', ink: '#F6EFE6' },
  7: { name: 'Mel', bg: '#C79A62', ink: '#171310' },
  8: { name: 'Champanhe', bg: '#E3CBA6', ink: '#171310' },
  9: { name: 'Areia clara', bg: '#EDDFC7', ink: '#171310' },
  10: { name: 'Platinado', bg: '#F5F0E7', ink: '#171310' },
} as const;

export type Level = keyof typeof levels;

export interface TonePick {
  id: string;
  label: string;
  numeral: string;
  swatch: string;
  /** Trecho da mensagem do WhatsApp. */
  want: string;
}

export const tonePicks: TonePick[] = [
  { id: 'castanho', label: 'Morena', numeral: '4', swatch: levels[4].bg, want: 'morena iluminada em tom castanho' },
  { id: 'caramelo', label: 'Caramelo', numeral: '6', swatch: levels[6].bg, want: 'morena iluminada em tom caramelo' },
  { id: 'mel', label: 'Mel', numeral: '7', swatch: levels[7].bg, want: 'mechas em tom mel' },
  { id: 'champanhe', label: 'Champanhe', numeral: '8', swatch: levels[8].bg, want: 'loiro em tom champanhe' },
  { id: 'platinado', label: 'Platinado', numeral: '10', swatch: levels[10].bg, want: 'loiro platinado' },
  { id: 'alisamento', label: 'Alisamento', numeral: 'Liso', swatch: levels[9].bg, want: 'alisamento sem formol' },
];

export const periodPicks = [
  { id: 'manha', label: 'Manhã', phrase: 'no período da *manhã*' },
  { id: 'tarde', label: 'Tarde', phrase: 'no período da *tarde*' },
  { id: 'qualquer', label: 'Qualquer', phrase: '' },
];

export const defaultTone = 'mel';
export const defaultPeriod = 'qualquer';

export function selectionLink(toneId: string, periodId: string): string {
  const tone = tonePicks.find((t) => t.id === toneId) ?? tonePicks[0];
  const period = periodPicks.find((p) => p.id === periodId) ?? periodPicks[2];
  let msg = `Gostaria de consultar os dias disponíveis para *${tone.want}*`;
  if (period.phrase) msg += `, de preferência ${period.phrase}`;
  msg += '.';
  return waLink(msg);
}
