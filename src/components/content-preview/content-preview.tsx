import { Button } from '@/primitives';
import type { Database } from '@/supabase';
import { tw, urlTypeNames } from '@/utils';
import { User, YoutubeLogo } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Embla } from './subcomponents/embla';
import { Tag } from './subcomponents/tag';

const MAX_SHOTS_TO_SHOW = 4;

type ContentPreviewProps = {
  content:
    | Database['public']['Views']['cities_with_creators']['Row']
    | Database['public']['Views']['shots_with_creators']['Row']
    | Database['public']['Views']['assets_with_creators']['Row'];
};

export const ContentPreview = ({ content }: ContentPreviewProps) => {
  const [selectedShotIndex, setSelectedShotIndex] = useState(0);

  if (!content.shots_count || content.shots_count === 0) return null;

  const shotsToShow = Math.min(content.shots_count, MAX_SHOTS_TO_SHOW);

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
            <YoutubeLogo size={16} weight="fill" />
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
        {content.shots_count && content.shots_count > MAX_SHOTS_TO_SHOW && (
          <Tag to={`/city/${content.id}`}>
            +{content.shots_count - MAX_SHOTS_TO_SHOW}
          </Tag>
        )}
      </div>
    </div>
  );

  const Shots = () => {
    return (
      <Embla
        city={content}
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
          <Link to="/city/$cityId" params={{ cityId: content.id }}>
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
          to="/city/$cityId"
          params={{ cityId: content.id }}
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
