import { Button } from '@/primitives';
import { supabase } from '@/supabase';
import { type ContentType, urlTypeNames } from '@/types';
import {
  canShowConsole,
  invalidateContentQueries,
  invalidateContentTypeQueries,
  singularAssetType,
  tw,
} from '@/utils';
import { ArrowLeft } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { useMeasure } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { toast } from 'sonner';
import titleize from 'titleize';
import { Editor } from './subcomponents/editor';
import './zoom-styles.css';

interface ContentDetailsProps {
  contentId: string;
  contentType: ContentType;
  goBack?: () => void;
}

export const ContentDetails = ({
  contentId,
  contentType,
  goBack,
}: ContentDetailsProps) => {
  const [headerRef, { height: headerHeight }] = useMeasure();

  const getContentDetail = useQuery({
    queryKey: [singularAssetType[contentType], contentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(`${contentType}_details`)
        .select('*')
        .eq('id', contentId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  //TODO - extract this into reusable hook
  useEffect(() => {
    if (getContentDetail.data?.name) {
      // https://stackoverflow.com/a/72982893
      document.title = '';
      document.title = getContentDetail.data.name;
    }
  }, [getContentDetail.data]);

  if (getContentDetail.isLoading) {
    return (
      <div className="max-w-8xl mx-auto px-16 py-8">
        Loading {singularAssetType[contentType]} details...
      </div>
    );
  }

  if (getContentDetail.isError) {
    return (
      <div className="max-w-8xl mx-auto px-16 py-8">
        Error loading {singularAssetType[contentType]} details
      </div>
    );
  }

  const content = getContentDetail.data;

  if (!content) {
    return (
      <div className="max-w-8xl mx-auto px-16 py-8">
        {singularAssetType[contentType]} not found
      </div>
    );
  }

  const handleDelete = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    if (!token) {
      toast.error('Authentication required. Please sign in.');
      return;
    }

    try {
      // Delete each image from Bunny CDN
      if (content.image_ids && content.image_ids.length > 0) {
        const deletePromises = content.image_ids.map(async imageId => {
          const imagePath = `${contentType}/${contentId}/${imageId}.webp`;

          try {
            const response = await fetch(
              `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/bunny-delete`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ imagePath }),
              }
            );

            const result = await response.json();

            if (!result.success) {
              console.error(
                `Failed to delete image ${imageId} from CDN:`,
                result.error
              );
            }
          } catch (error) {
            console.error(`Error deleting image ${imageId} from CDN:`, error);
          }
        });

        // Wait for all image deletion requests to complete
        await Promise.all(deletePromises);
      }

      // Delete all images from the database
      const { error: imageDeleteError } = await supabase
        .from(`${contentType}_images`)
        .delete()
        .eq('content_id', contentId);

      if (imageDeleteError) {
        console.error(
          'Failed to delete images from database:',
          imageDeleteError
        );
      }

      // Finally delete the content itself
      const { error } = await supabase
        .from(contentType)
        .delete()
        .eq('id', contentId);

      if (error) {
        toast.error(
          `Failed to delete ${singularAssetType[contentType]}: ${error.message}`
        );
        return;
      }

      toast.success(
        `Deleted ${singularAssetType[contentType]} and all associated images`
      );
      invalidateContentTypeQueries(contentType);
      invalidateContentQueries(contentType, contentId);

      if (goBack) {
        goBack();
      } else {
        window.history.back();
      }
    } catch (error) {
      toast.error(
        `An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      console.error('Error in handleDelete:', error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-86px)] flex-col">
      {/* match nav height */}
      <div className="fixed top-[86px] right-0 left-0 z-0" ref={headerRef}>
        <div className="max-w-8xl mx-auto flex flex-col items-start gap-10 px-16 pt-8 pb-16">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => (goBack ? goBack() : window.history.back())}
            iconOnly
          >
            <ArrowLeft size={20} weight="bold" />
          </Button>
          <h1 className="flex items-center gap-4">
            {content.name} — {titleize(singularAssetType[contentType])}
            {canShowConsole() && (
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </h1>
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <p className="text-gray-400">Creator</p>
              {content.creator_profile_url ? (
                <a
                  href={content.creator_profile_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-medium hover:underline"
                >
                  {content.creator_name}
                </a>
              ) : (
                <p className="text-lg font-medium">{content.creator_name}</p>
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-gray-400">Source</p>
              {content.source_url && content.source_url_type ? (
                <a
                  href={content.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-medium hover:underline"
                >
                  {urlTypeNames[content.source_url_type]}
                </a>
              ) : (
                <p className="text-lg font-medium">Unknown</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: `${headerHeight}px` }} />

      {content.image_ids && (
        <div className="max-w-8xl relative z-10 mx-auto w-full flex-1 rounded-t-4xl bg-black/95 px-16 py-16 shadow-[0_-24px_24px_-8px_rgba(0,0,0,0.08)]">
          <div className="4xl:grid-cols-3 grid grid-cols-1 gap-6 xl:grid-cols-2">
            {content.image_ids.map((imageId, index) => {
              const imageUrl = `${import.meta.env.VITE_BUNNY_CDN_URL}/${contentType}/${contentId}/${imageId}.webp`;
              const alt = `${content.name} thumbnail ${index + 1}`;
              return (
                <div
                  key={`${contentId}-shot-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: static per content and indexed sequentially
                    index
                  }`}
                  className="group relative flex items-center justify-center overflow-hidden rounded-xl bg-white/10 transition hover:z-10 hover:shadow-2xl hover:outline-2 hover:outline-white/30"
                >
                  <Zoom classDialog="custom-zoom" zoomMargin={16}>
                    <img
                      src={imageUrl}
                      loading="lazy"
                      alt={alt}
                      className="w-full object-cover"
                    />
                  </Zoom>
                  <div
                    className={tw(
                      'absolute right-4 bottom-4 flex items-center justify-center gap-2',
                      (!content.thumbnail_image_id ||
                        imageId !== content.thumbnail_image_id) &&
                        'opacity-0 transition group-hover:opacity-100'
                    )}
                  >
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        try {
                          const imagePath = `${contentType}/${contentId}/${imageId}.webp`;
                          const { data: sessionData } =
                            await supabase.auth.getSession();
                          const response = await fetch(
                            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/bunny-delete`,
                            {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${sessionData.session?.access_token}`,
                              },
                              body: JSON.stringify({ imagePath }),
                            }
                          );

                          const result = await response.json();

                          if (!result.success) {
                            throw new Error(
                              result.error || 'Failed to delete image from CDN'
                            );
                          }

                          const { error } = await supabase
                            .from(`${contentType}_images`)
                            .delete()
                            .eq('id', imageId);

                          if (error) {
                            throw new Error(error.message);
                          }

                          toast.success('Image deleted successfully');
                          invalidateContentQueries(contentType, contentId);
                        } catch (error) {
                          toast.error(
                            `Failed to delete image: ${(error as Error).message}`
                          );
                        }
                      }}
                      className="opacity-0 transition group-hover:opacity-100"
                    >
                      Delete
                    </Button>
                    <Button
                      variant={
                        imageId === content.thumbnail_image_id
                          ? 'destructive'
                          : 'admin'
                      }
                      onClick={async () => {
                        if (imageId === content.thumbnail_image_id) {
                          const { error } = await supabase
                            .from(contentType)
                            .update({
                              thumbnail_image_id: null,
                            })
                            .eq('id', contentId);

                          if (error) {
                            toast.error('Failed to unset thumbnail');
                          } else {
                            toast.success('Thumbnail unset successfully');
                            invalidateContentQueries(contentType, contentId);
                          }
                        } else {
                          const { error } = await supabase
                            .from(contentType)
                            .update({
                              thumbnail_image_id: imageId,
                            })
                            .eq('id', contentId);

                          if (error) {
                            toast.error('Failed to set thumbnail');
                          } else {
                            toast.success('Thumbnail updated successfully');
                            invalidateContentQueries(contentType, contentId);
                          }
                        }
                      }}
                    >
                      {imageId === content.thumbnail_image_id
                        ? 'Unset thumbnail'
                        : 'Set as thumbnail'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Editor content={content} contentType={contentType} />

      <footer>
        <div className="max-w-8xl flex flex-col items-center justify-center bg-black/95 px-16 pt-6 pb-16">
          <p className="text-center text-white/30">
            CSMuseum is proudly ad-free and open-source. All contents belong to
            their creators only.
          </p>
        </div>
      </footer>
    </div>
  );
};
