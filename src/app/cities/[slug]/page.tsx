import { CityCard, HorizontalScrollable, Shot } from '@/components';
import { cities } from '@/content';
import { getCityBySlug, withBunnyShots, withBunnyThumbnail } from '@/utils';
import { MedalIcon, UserIcon, YoutubeIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const city = await getCityBySlug(slug);

  if (!city) {
    return {
      title: 'City Not Found - CSMuseum',
      description: 'The requested city could not be found.',
    };
  }

  return {
    title: `${city.name} - CSMuseum`,
    description: city.description,
  };
}

export default async function CityPage({ params }: Props) {
  const slug = (await params).slug;
  const city = await getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const otherCities = cities.filter(c => c.slug !== city.slug);
  const randomCities = [...otherCities]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <div>
      <div className="flex flex-col items-center gap-12 py-20 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {city.contest && (
            <div className="flex w-fit items-center justify-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-orange-600 select-none">
              <MedalIcon className="size-4 min-w-4" />
              <>
                {city.contest.placement.charAt(0).toUpperCase() +
                  city.contest.placement.slice(1)}{' '}
                of {city.contest.name} in {city.contest.year}
              </>
            </div>
          )}
          {city.youtubePlaylistUrl && (
            <Link
              href={city.youtubePlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-red-600 transition duration-300 ease-in-out hover:bg-red-100"
            >
              <YoutubeIcon
                className="size-5 min-w-5"
                strokeWidth={1.5}
                absoluteStrokeWidth
              />
              <p className="text-sm">Watch on YouTube</p>
            </Link>
          )}
          <div className="flex w-fit items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-gray-600 select-none">
            <UserIcon className="size-4 min-w-4" />
            By {city.creator}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <h1>{city.name}</h1>
          <p className="text-xl text-gray-500">{city.headline}</p>
        </div>
      </div>
      <div className="bg-background-inverted flex flex-col gap-4 p-4">
        {Array.from({ length: city.screenshotCount }).map((_, i) => (
          <Shot key={i} src={withBunnyShots(city.id, i + 1)} />
        ))}
      </div>
      <div className="max-w-8xl relative mx-auto pt-12 pb-10 lg:pt-20 lg:pb-16">
        <div className="absolute top-0 left-1/2 h-px w-screen -translate-x-1/2 bg-gray-200" />
        <div className="absolute top-0 left-1/2 -z-10 h-24 w-screen -translate-x-1/2 bg-gradient-to-b from-gray-50 to-transparent" />
        <h2 className="mb-8 text-center text-2xl font-semibold">
          Explore More Cities
        </h2>
        <HorizontalScrollable className="lg:hidden">
          <div className="flex w-full gap-4">
            {randomCities.map(city => {
              return (
                <CityCard key={city.slug} href={`/cities/${city.slug}`}>
                  <CityCard.Image
                    src={withBunnyThumbnail(city.slug)}
                    alt={city.name}
                    className="h-48 w-full object-cover"
                  />
                  <CityCard.Title>{city.name}</CityCard.Title>
                  <CityCard.Subtitle>{city.headline}</CityCard.Subtitle>
                </CityCard>
              );
            })}
          </div>
        </HorizontalScrollable>
        <div className="hidden w-full gap-4 lg:flex">
          {randomCities.map(city => {
            return (
              <CityCard key={city.slug} href={`/cities/${city.slug}`}>
                <CityCard.Image
                  src={withBunnyThumbnail(city.slug)}
                  alt={city.name}
                  className="h-48 w-full object-cover"
                />
                <CityCard.Title>{city.name}</CityCard.Title>
                <CityCard.Subtitle>{city.headline}</CityCard.Subtitle>
              </CityCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
