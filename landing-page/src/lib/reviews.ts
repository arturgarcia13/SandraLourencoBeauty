import data from '../data/avec-reviews.json';

interface Raw {
  stars: number;
  text: string;
  name: string;
  date: string;
}

const raw = data.reviews as Raw[];

function shortName(full: string): string {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

export function reviewStats() {
  const byClient = new Map<string, number>();
  for (const r of raw) byClient.set(r.name, (byClient.get(r.name) ?? 0) + 1);
  const returning = [...byClient.values()].filter((n) => n > 1).length;
  const dates = raw.map((r) => r.date).sort();
  return {
    ratings: raw.length,
    clients: byClient.size,
    returning,
    allFive: raw.every((r) => r.stars === 5),
    since: dates[0]?.slice(0, 4) ?? '',
  };
}

export function reviewQuotes() {
  return raw
    .filter((r) => r.text && /[A-Za-zÀ-ú]{4,}/.test(r.text) && !/\?\?|incluso/i.test(r.text))
    .map((r) => ({
      text: r.text.replace(/\s+/g, ' ').trim(),
      who: shortName(r.name),
      date: new Date(r.date + 'T12:00:00').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
    }));
}
