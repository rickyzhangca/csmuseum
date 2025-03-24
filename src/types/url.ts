// have to align with supabase url type names
export const URL_TYPE = ['youtube', 'xiaohongshu', 'twitter'] as const;
export type URLType = (typeof URL_TYPE)[number];

export const urlTypeNames: Record<URLType, string> = {
  youtube: 'Youtube',
  xiaohongshu: 'Xiaohongshu',
  twitter: 'Twitter',
} as const;
