import { Button } from '@/primitives';
import { supabase } from '@/supabase';
import { type ContentType, urlTypeNames } from '@/types';
import { singularAssetType } from '@/utils';
import { ArrowLeft } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { useMeasure } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import titleize from 'titleize';
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
          <h1>
            {content.name} — {titleize(singularAssetType[contentType])}
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
          <div className="3xl:grid-cols-3 grid grid-cols-1 gap-6 xl:grid-cols-2">
            {Array.from({ length: content.image_ids.length }).map(
              (_, index) => {
                const imageUrl = `${import.meta.env.VITE_BUNNY_CDN_URL}/${contentType}/${contentId}/${content.image_ids?.[index] || index}.webp`;
                const alt = `${content.name} thumbnail ${index + 1}`;
                return (
                  <div
                    key={`${contentId}-shot-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: static per content and indexed sequentially
                      index
                    }`}
                    className="flex items-center justify-center overflow-hidden rounded-xl bg-white/10 transition hover:z-10 hover:shadow-2xl hover:outline-2 hover:outline-white/30"
                  >
                    <Zoom classDialog="custom-zoom" zoomMargin={16}>
                      <img
                        src={imageUrl}
                        loading="lazy"
                        alt={alt}
                        className="w-full object-cover"
                      />
                    </Zoom>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
      <footer>
        <div className="max-w-8xl mx-auto flex flex-col items-center justify-center bg-black/95 pt-6 pb-16">
          <p className="text-center text-white/30">
            CSMuseum is proudly ad-free and open-source. All contents belong to
            their creators only.
          </p>
        </div>
      </footer>
    </div>
  );
};
