// have to align with supabase table names
export const CONTENT_TYPES = ['cities', 'shots', 'assets'] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];
