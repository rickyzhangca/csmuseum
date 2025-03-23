import type { ContentType } from '@/types';

export const singularAssetType: Record<ContentType, string> = {
  cities: 'city',
  shots: 'shot',
  assets: 'asset',
} as const;
