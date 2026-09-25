import type { TraditionId } from '../schemas/philosopher';

export interface TraditionMeta {
  id: TraditionId;
  name: string;
  color: string;
}

export const TRADITIONS: Record<TraditionId, TraditionMeta> = {
  chinese: { id: 'chinese', name: 'Kinesisk', color: '#f6c85f' },
  'japanese-korean': { id: 'japanese-korean', name: 'Japansk og koreansk', color: '#f97316' },
  indian: { id: 'indian', name: 'Indisk', color: '#ffd79e' },
  'greek-roman': { id: 'greek-roman', name: 'Gresk og romersk', color: '#67e8f9' },
  'islamic-jewish': { id: 'islamic-jewish', name: 'Islamsk og jødisk', color: '#34d399' },
  european: { id: 'european', name: 'Europeisk', color: '#60a5fa' },
  nordic: { id: 'nordic', name: 'Nordisk', color: '#4ade80' },
  americas: { id: 'americas', name: 'Amerikansk', color: '#f472b6' },
  african: { id: 'african', name: 'Afrikansk', color: '#fbbf24' },
};

export function getTraditionMeta(id: TraditionId): TraditionMeta {
  return TRADITIONS[id] || { id, name: id, color: '#e2e8f0' };
}
