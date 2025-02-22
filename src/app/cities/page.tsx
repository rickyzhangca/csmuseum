import { CityCard, LinkButton } from '@/components';
import { getAllCities, withBunny } from '@/utils';
import { ArrowRightIcon } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cities - CSMuseum',
  description: 'Explore all the cities in CSMuseum.',
};

export default function CitiesPage() {
  const cities = getAllCities();

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="flex flex-col items-center gap-16 py-16 text-center">
        <div className="flex flex-col gap-4">
          <h1>Explore our collection</h1>
          <p className="text-xl text-gray-500">
            CSMuseum is a hand-picked collection of the best cities from
            talented creators worldwide.
          </p>
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
