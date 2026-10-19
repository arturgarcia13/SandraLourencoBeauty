import avecData from '../data/avec-services.json';
import { site } from '../config/site';
import { formatPrice, formatDuration } from './format';

export interface EnrichedService {
  id: number;
  name: string;
  category: string;
  description: string;
  priceFormatted: string;
  durationFormatted: string;
  rawPrice: number | null;
  rawDuration: number;
  hasFormol: boolean;
  isOrganica: boolean;
}

export interface MenuGroupData {
  title: string;
  description: string;
  isCompact?: boolean;
  services: EnrichedService[];
}

export function getAllEnrichedServices(): EnrichedService[] {
  const list = avecData.services || [];

  return list.map((item) => {
    const overrideDuration = site.durationOverrides[item.servico];
    const hasFormol = (site.formolServices as readonly string[]).includes(item.servico);
    const isOrganica = item.servico.toLowerCase().includes('orgânica') || item.servico.toLowerCase().includes('organica');

    return {
      id: item.id,
      name: item.servico,
      category: item.categoria,
      description: item.descricao || '',
      priceFormatted: formatPrice(item.valor, item.tipo_valor),
      durationFormatted: formatDuration(item.tempo, overrideDuration),
      rawPrice: item.valor,
      rawDuration: item.tempo,
      hasFormol,
      isOrganica,
    };
  });
}

export function getMenuGroups(): MenuGroupData[] {
  const all = getAllEnrichedServices();
  const mapByName = new Map<string, EnrichedService>();

  for (const s of all) {
    mapByName.set(s.name.trim().toLowerCase(), s);
  }

  return site.menuGroups.map((group) => {
    const services: EnrichedService[] = [];

    for (const itemName of group.items) {
      const match = mapByName.get(itemName.trim().toLowerCase());
      if (match) {
        services.push(match);
      } else {
        console.warn(`[getMenuGroups] Serviço "${itemName}" listado na curadoria não foi encontrado na base Avec.`);
      }
    }

    return {
      title: group.title,
      description: group.description,
      isCompact: (group as { isCompact?: boolean }).isCompact || false,
      services,
    };
  });
}

export function getFetchedDate(): string {
  if (!avecData.fetchedAt) return 'recentemente';
  try {
    const d = new Date(avecData.fetchedAt);
    return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  } catch {
    return 'recentemente';
  }
}
