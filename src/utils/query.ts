import { QueryClient } from '@tanstack/react-query';
import type { ContentType } from '@/types';

// singleton instance of QueryClient that can be imported anywhere
export const queryClient = new QueryClient();

/**
 * invalidate queries based on content type
 */
export const invalidateContentQueries = (contentType: ContentType) => {
  queryClient.invalidateQueries({ queryKey: [contentType] });
};
