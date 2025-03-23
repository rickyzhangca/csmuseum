import { Button } from '@/primitives';
import type { Database } from '@/supabase';
import { tw, urlTypeNames } from '@/utils';
import { User, YoutubeLogo } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Embla } from './subcomponents/embla';
import { Tag } from './subcomponents/tag';

const MAX_SHOTS_TO_SHOW = 4;

type CityPreviewProps = {
  city: Database['public']['Views']['cities_with_creators']['Row'];
};

export const CityPreview = ({ city }: CityPreviewProps) => {
  const [selectedShotIndex, setSelectedShotIndex] = useState(0);
  const shotsToShow = Math.min(city.shots_count ?? 0, MAX_SHOTS_TO_SHOW);

  const Meta = () => (
    <div className="flex items-center justify-between gap-2 px-5">
      <div className="flex items-center gap-1.5">
        <Tag>
          <User size={16} weight="bold" />
          {city.creator_name}
        </Tag>
        {city.city_source_url && city.city_source_url_type && (
          <Tag to={city.city_source_url} target="_blank">
            <YoutubeLogo size={16} weight="fill" />
            {urlTypeNames[city.city_source_url_type]}
          </Tag>
        )}
      </div>
      <div className="flex items-center gap-3 opacity-0 transition group-hover:opacity-100">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: shotsToShow }).map((_, index) => (
            <div
              key={`${city.city_id}-${index}`}
              className={tw(
                'h-2 w-2 rounded-full',
                index === selectedShotIndex ? 'bg-gray-900' : 'bg-gray-300'
              )}
            />
          ))}
        </div>
        {city.shots_count && city.shots_count > MAX_SHOTS_TO_SHOW && (
          <Tag>+{city.shots_count - MAX_SHOTS_TO_SHOW}</Tag>
        )}
      </div>
    </div>
  );

  const Shots = () => {
    return (
      <Embla
        city={city}
        shotsToShow={shotsToShow}
        selectedShotIndexChange={setSelectedShotIndex}
      />
    );
  };

  const Info = () => (
    <div className="mx-5 mb-5 flex items-center justify-between rounded-xl px-5 py-3 transition group-hover:bg-white hover:shadow-2xs">
      <div>
        <p className="text-lg font-medium">{city.city_name}</p>
        <p className="text-sm text-gray-500">{city.city_outline}</p>
      </div>
      <Link to={`${city.city_id}`}>
        <Button
          variant="outline"
          className="opacity-0 transition group-hover:opacity-100"
        >
          Explore
        </Button>
      </Link>
    </div>
  );

  return (
    <Link to={`${city.city_id}`} className="flex flex-col gap-3">
      <div className="group flex flex-col gap-5 overflow-hidden rounded-3xl bg-gray-900/4 pt-5 transition hover:bg-gray-900/6">
        <Meta />
        <Shots />
        <Info />
      </div>
    </Link>
  );
};
