import type { Database } from '@/supabase';

type CityPreviewProps = {
  city: Database['public']['Tables']['cities']['Row'];
};

export const CityPreview = ({ city }: CityPreviewProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {Array.from({ length: city.shots_count }).map((_, index) => (
          <img
            key={`${city.id}-${index}`}
            src={`${import.meta.env.VITE_BUNNY_CDN_URL}/cities/${city.id}/${index}.webp`}
            alt={city.name}
            className="aspect-video h-[480px] rounded-xl object-cover"
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">{city.name}</p>
        <p className="text-gray-500">{city.outline}</p>
      </div>
    </div>
  );
};
