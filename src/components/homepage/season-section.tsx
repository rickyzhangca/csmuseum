import { cities } from '@/content/cities';
import { City, Feature } from '@/types';
import { tw, withBunny } from '@/utils';
import { SunIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { HorizontalScrollable } from '../horizontal-scrollable';
import { Section } from '../section';

const seasonInfo = {
  spring: {
    title: 'Spring Renewal',
    titleGradient: 'from-green-500 to-emerald-600',
    imageGradient: 'from-green-900/90 to-transparent',
    feature: 'spring' as Feature,
  },
  summer: {
    title: 'Summer Heat',
    titleGradient: 'from-yellow-500 to-orange-600',
    imageGradient: 'from-yellow-900/90 to-transparent',
    feature: 'summer' as Feature,
  },
  fall: {
    title: 'Autumn Colors',
    titleGradient: 'from-red-500 to-orange-600',
    imageGradient: 'from-red-900/90 to-transparent',
    feature: 'autumn-colors' as Feature,
  },
  winter: {
    title: 'Winter Wonder',
    titleGradient: 'from-blue-500 to-indigo-600',
    imageGradient: 'from-blue-900/90 to-transparent',
    feature: 'winter' as Feature,
  },
} as const;

const citiesBySeason = cities.reduce(
  (
    acc: Record<string, { cities: City[]; screenshotCount: number }>,
    city: City
  ) => {
    city.screenshots.forEach(screenshot => {
      Object.entries(seasonInfo).forEach(([season, info]) => {
        if (screenshot.features?.includes(info.feature)) {
          if (!acc[season]) {
            acc[season] = { cities: [], screenshotCount: 0 };
          }
          if (!acc[season].cities.includes(city)) {
            acc[season].cities.push(city);
          }
          acc[season].screenshotCount++;
        }
      });
    });
    return acc;
  },
  {}
);

const Card = ({
  cities,
  season,
  screenshotCount,
}: {
  cities: City[];
  season: keyof typeof seasonInfo;
  screenshotCount: number;
}) => (
  <Link
    key={season}
    href={{
      pathname: '/cities',
      query: { tab: 'features', features: seasonInfo[season].feature },
    }}
    className={tw(
      'group relative flex flex-col items-center gap-4 rounded-2xl border transition hover:z-10 hover:shadow-2xl',
      'w-96 shrink-0 md:w-auto'
    )}
  >
    <p
      className={tw(
        'text-foreground-inverted absolute -top-6 z-10 flex items-center justify-center rounded-full bg-gradient-to-br px-4 py-2 text-center text-lg font-semibold shadow transition sm:text-xl',
        seasonInfo[season].titleGradient
      )}
    >
      {seasonInfo[season].title}
    </p>
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
      <Image
        src={withBunny(cities[0].screenshots[0].url)}
        alt={`${season} cities`}
        fill
        className="object-cover transition duration-300 group-hover:scale-105"
      />
      <div
        className={tw(
          'absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t',
          seasonInfo[season].imageGradient
        )}
      />
    </div>
    <div className="absolute bottom-4 flex w-full flex-col items-center px-4 text-center">
      <h4 className="text-foreground-inverted line-clamp-1 w-full">
        {cities.length <= 3
          ? cities.map(city => city.name).join(', ')
          : `${cities
              .slice(0, 3)
              .map(city => city.name)
              .join(', ')} +${cities.length - 3} more`}
      </h4>
      <p className="text-foreground-inverted/70 line-clamp-1 w-full text-sm">
        {screenshotCount} {screenshotCount === 1 ? 'shot' : 'shots'} from{' '}
        {cities.length} {cities.length === 1 ? 'city' : 'cities'}
      </p>
    </div>
  </Link>
);

export const SeasonSection = () => {
  return (
    <Section className="gap-6 sm:gap-16">
      <Section.Header>
        <Section.Chip className="bg-green-100 text-green-600">
          <SunIcon
            className="size-4 min-w-4"
            strokeWidth={2}
            absoluteStrokeWidth
          />
          Seasonal Cities
        </Section.Chip>
        <Section.Title>Weathering the Grid</Section.Title>
        <Section.Description>
          Winter wonderlands, monsoon metropolises, and autumn alleyways — see
          how seasons shape skylines.
        </Section.Description>
      </Section.Header>
      <Section.Content>
        <div className="hidden grid-cols-2 gap-x-4 gap-y-12 md:grid">
          {(Object.keys(seasonInfo) as Array<keyof typeof seasonInfo>).map(
            season => {
              const data = citiesBySeason[season];
              if (!data) return null;

              return (
                <Card
                  key={season}
                  cities={data.cities}
                  season={season}
                  screenshotCount={data.screenshotCount}
                />
              );
            }
          )}
        </div>
        <HorizontalScrollable className="w-full md:hidden">
          <div className="flex gap-4 pt-6">
            {(Object.keys(seasonInfo) as Array<keyof typeof seasonInfo>).map(
              season => {
                const data = citiesBySeason[season];
                if (!data) return null;

                return (
                  <Card
                    key={season}
                    cities={data.cities}
                    season={season}
                    screenshotCount={data.screenshotCount}
                  />
                );
              }
            )}
          </div>
        </HorizontalScrollable>
      </Section.Content>
    </Section>
  );
};
