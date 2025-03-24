import type { ContentType } from '@/types';

export const singularAssetType: Record<ContentType, 'city' | 'shot' | 'asset'> =
  {
    cities: 'city',
    shots: 'shot',
    assets: 'asset',
  } as const;
