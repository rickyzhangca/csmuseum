import type { Database } from '@/supabase';

export const urlTypeNames: Record<
  Database['public']['Enums']['URL_TYPE'],
  string
> = {
  youtube: 'Youtube',
  xiaohongshu: 'Xiaohongshu',
  twitter: 'Twitter',
} as const;
