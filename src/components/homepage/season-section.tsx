import { getAllCitiesMeta, tw, withBunny } from '@/utils';
import { SunIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '../section';

export const SeasonSection = async () => {
  const cities = await getAllCitiesMeta();

  const seasonInfo = {
    spring: {
      title: 'Spring Renewal',
      titleGradient: 'from-green-500 to-emerald-600',
      imageGradient: 'from-green-900/90 to-transparent',
    },
    summer: {
      title: 'Summer Heat',
      titleGradient: 'from-yellow-500 to-orange-600',
      imageGradient: 'from-yellow-900/90 to-transparent',
    },
    autumn: {
      title: 'Autumn Colors',
      titleGradient: 'from-red-500 to-orange-600',
      imageGradient: 'from-red-900/90 to-transparent',
    },
    winter: {
      title: 'Winter Wonder',
      titleGradient: 'from-blue-500 to-indigo-600',
      imageGradient: 'from-blue-900/90 to-transparent',
    },
  } as const;

  const citiesBySeason = cities.reduce(
    (acc, city) => {
      const season = city.frontmatter.season;
      if (!acc[season]) {
        acc[season] = [];
      }
      acc[season].push(city);
      return acc;
    },
    {} as Record<string, typeof cities>
  );

  const getLatestCityForSeason = (season: keyof typeof seasonInfo) => {
    const seasonCities = citiesBySeason[season] || [];
    return seasonCities.sort((a, b) => {
      const dateA = a.frontmatter.date_added;
      const dateB = b.frontmatter.date_added;

      if (!dateA || !dateB) return 0;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    })[0];
  };

  return (
    <Section className="gap-16">
      <Section.Header>
        <Section.Chip className="bg-green-100 text-green-600">
          <SunIcon className="size-4" strokeWidth={2} absoluteStrokeWidth />
          Seasonal Cities
        </Section.Chip>
        <Section.Title>Weathering the Grid</Section.Title>
        <Section.Description>
          Winter wonderlands, monsoon metropolises, and autumn alleyways — see
          how seasons shape skylines.
        </Section.Description>
      </Section.Header>
      <Section.Content className="grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2">
        {(Object.keys(seasonInfo) as Array<keyof typeof seasonInfo>).map(
          season => {
            const city = getLatestCityForSeason(season);
            if (!city) return null;

            return (
              <Link
                key={season}
                href={`/cities/${city.slug}`}
                className={tw(
                  'group relative flex flex-col items-center gap-4 rounded-2xl border transition hover:z-10 hover:shadow-2xl'
                )}
              >
                <p
                  className={tw(
                    'text-foreground-inverted absolute -top-6 z-10 flex items-center justify-center rounded-full bg-gradient-to-br px-4 py-2 text-center text-xl font-semibold shadow transition',
                    seasonInfo[season].titleGradient
                  )}
                >
                  {seasonInfo[season].title}
                </p>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                  <Image
                    src={withBunny(city.frontmatter.screenshots[0])}
                    alt={city.frontmatter.name}
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
                <div className="absolute bottom-4 flex flex-col items-center text-center">
                  <h4 className="text-foreground-inverted">
                    {city.frontmatter.name}
                  </h4>
                  <p className="text-foreground-inverted/70 text-sm">
                    {city.frontmatter.headline}
                  </p>
                </div>
              </Link>
            );
          }
        )}
      </Section.Content>
    </Section>
  );
};
