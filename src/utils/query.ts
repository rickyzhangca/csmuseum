import type { ContentType } from '@/types';
import { QueryClient } from '@tanstack/react-query';
import { singularAssetType } from './asset_type_singular';

// singleton instance of QueryClient that can be imported anywhere
export const queryClient = new QueryClient();

export const invalidateContentTypeQueries = (contentType: ContentType) => {
  queryClient.invalidateQueries({ queryKey: [contentType] });
};

export const invalidateContentQueries = (
  contentType: ContentType,
  contentId: string
) => {
  queryClient.invalidateQueries({
    queryKey: [singularAssetType[contentType], contentId],
  });
};
