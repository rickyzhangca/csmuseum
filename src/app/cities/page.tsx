import { CityCard, LinkButton } from '@/components';
import { getAllCities, getContestWinners, tw, withBunny } from '@/utils';
import { ArrowRightIcon, MedalIcon, XIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cities - CSMuseum',
  description: 'Explore all the cities in CSMuseum.',
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CitiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const isWinningFilter = params?.filter === 'winning';
  const cities = isWinningFilter ? getContestWinners() : getAllCities();

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="flex flex-col items-center gap-16 py-16 text-center">
        <div className="flex flex-col items-center justify-center gap-16">
          <div className="flex flex-col items-center gap-4">
            <h1>Explore our collection</h1>
            <p className="text-xl text-gray-500">
              CSMuseum is a hand-picked collection of the best cities from
              talented creators worldwide
            </p>
          </div>
          <Link
            href={isWinningFilter ? '/cities' : '/cities?filter=winning'}
            className={tw(
              'flex w-fit items-center justify-center gap-2 rounded-full border px-4 py-1.5 transition',
              isWinningFilter
                ? 'border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100'
                : 'text-foreground bg-background border-gray-200 pr-5 hover:bg-gray-50'
            )}
          >
            <MedalIcon className="size-4" />
            Contest-winning cities
            {isWinningFilter && <XIcon className="size-4" />}
          </Link>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {cities.map(city => {
            const firstScreenshot = city.screenshots?.[0];
            if (!firstScreenshot) return null;

            return (
              <CityCard key={city.slug} href={`/cities/${city.slug}`}>
                <CityCard.Image
                  src={withBunny(firstScreenshot.url)}
                  alt={firstScreenshot.alt || city.name}
                  className="h-48 w-full object-cover"
                />
                <CityCard.Title>{city.name}</CityCard.Title>
                <CityCard.Subtitle>{city.headline}</CityCard.Subtitle>
              </CityCard>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-2">
          <LinkButton href="/cities">Add your own city</LinkButton>
          <LinkButton href="/cities" variant="primary">
            Nominate a great city
            <LinkButton.Icon>
              <ArrowRightIcon className="size-4" />
            </LinkButton.Icon>
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
