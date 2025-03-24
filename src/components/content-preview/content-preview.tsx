import { Button } from '@/primitives';
import type { Database } from '@/supabase';
import { type ContentType, urlTypeNames } from '@/types';
import { tw } from '@/utils';
import { GlobeSimple, User, XLogo, YoutubeLogo } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Embla } from './subcomponents/embla';
import { Tag } from './subcomponents/tag';

const MAX_SHOTS_TO_SHOW = 4;

const routeConfig = {
  cities: {
    path: '/city/$cityId' as const,
    getParams: (id: string) => ({ cityId: id }),
  },
  shots: {
    path: '/shot/$shotId' as const,
    getParams: (id: string) => ({ shotId: id }),
  },
  assets: {
    path: '/asset/$assetId' as const,
    getParams: (id: string) => ({ assetId: id }),
  },
};

type ContentPreviewProps = {
  content:
    | Database['public']['Views']['cities_details']['Row']
    | Database['public']['Views']['shots_details']['Row']
    | Database['public']['Views']['assets_details']['Row'];
  contentType: ContentType;
};

export const ContentPreview = ({
  content,
  contentType,
}: ContentPreviewProps) => {
  const [selectedShotIndex, setSelectedShotIndex] = useState(0);
  const routeInfo = routeConfig[contentType];

  if (!content.image_ids || content.image_ids.length === 0) return null;

  const shotsToShow = Math.min(content.image_ids.length, MAX_SHOTS_TO_SHOW);

  const Meta = () => (
    <div className="flex items-center justify-between gap-2 px-5">
      <div className="flex items-center gap-1.5">
        {content.creator_profile_url && (
          <Tag to={content.creator_profile_url} target="_blank">
            <User size={16} weight="bold" />
            {content.creator_name}
          </Tag>
        )}
        {content.source_url && content.source_url_type && (
          <Tag to={content.source_url} target="_blank">
            {content.source_url_type === 'youtube' ? (
              <YoutubeLogo size={16} weight="fill" />
            ) : content.source_url_type === 'twitter' ? (
              <XLogo size={16} />
            ) : (
              <GlobeSimple size={16} />
            )}
            {urlTypeNames[content.source_url_type]}
          </Tag>
        )}
      </div>
      <div className="flex items-center gap-3 opacity-0 transition group-hover:opacity-100">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: shotsToShow }).map((_, index) => (
            <div
              key={`${content.id}-${index}`}
              className={tw(
                'h-2 w-2 rounded-full',
                index === selectedShotIndex ? 'bg-gray-900' : 'bg-gray-300'
              )}
            />
          ))}
        </div>
        {content.image_ids &&
          content.image_ids.length > MAX_SHOTS_TO_SHOW &&
          content.id && (
            <Tag to={`/${contentType}/${content.id}`}>
              +{content.image_ids.length - MAX_SHOTS_TO_SHOW}
            </Tag>
          )}
      </div>
    </div>
  );

  const Shots = () => {
    return (
      <Embla
        content={content}
        contentType={contentType}
        shotsToShow={shotsToShow}
        selectedShotIndexChange={setSelectedShotIndex}
      />
    );
  };

  const Info = () => (
    <>
      {content.id && (
        <div className="mx-5 mb-5 flex items-center justify-between rounded-xl px-5 py-3 transition group-hover:bg-white hover:shadow-2xs">
          <div>
            <p className="text-lg font-medium">{content.name}</p>
            <p className="text-sm text-gray-500">{content.outline}</p>
          </div>
          <Link to={routeInfo.path} params={routeInfo.getParams(content.id)}>
            <Button
              variant="outline"
              className="opacity-0 transition group-hover:opacity-100"
            >
              Explore
            </Button>
          </Link>
        </div>
      )}
    </>
  );

  return (
    <>
      {content.id && (
        <Link
          to={routeInfo.path}
          params={routeInfo.getParams(content.id)}
          className="flex flex-col gap-3"
        >
          <div className="group flex flex-col gap-5 overflow-hidden rounded-3xl bg-gray-900/4 pt-5 transition hover:bg-gray-900/6">
            <Meta />
            <Shots />
            <Info />
          </div>
        </Link>
      )}
    </>
  );
};
