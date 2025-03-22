import type { Database } from '@/supabase';
import { urlTypeNames } from '@/utils';
import { User, YoutubeLogo } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { Embla } from './subcomponents/embla';
import { Tag } from './subcomponents/tag';

type CityPreviewProps = {
  city: Database['public']['Views']['cities_with_creators']['Row'];
};

export const CityPreview = ({ city }: CityPreviewProps) => {
  const Meta = () => (
    <div className="flex items-center justify-between gap-2 px-6">
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
    </div>
  );

  const Shots = () => {
    return <Embla city={city} />;
  };

  const Info = () => (
    <div className="flex flex-col px-2">
      <p className="text-lg font-medium">{city.city_name}</p>
      <p className="text-sm text-gray-500">{city.city_outline}</p>
    </div>
  );

  return (
    <Link to={`${city.city_id}`} className="flex flex-col gap-3">
      <div className="flex flex-col gap-6 rounded-2xl bg-gray-100 py-6">
        <Meta />
        <Shots />
      </div>
      <Info />
    </Link>
  );
};
