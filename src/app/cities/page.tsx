import { cities } from '@/content/cities';
import { withBunny } from '@/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cities - CSMuseum',
  description: 'Explore all the cities in CSMuseum.',
};

export default function CitiesPage() {
  return (
    <div className="container flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Cities</h1>
        <p className="text-muted-foreground">
          Explore all the cities in CSMuseum.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cities.map(city => (
          <Link
            key={city.id}
            href={`/cities/${city.slug}`}
            className="group hover:bg-muted/50 flex flex-col gap-4 rounded-lg border p-4 transition"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={withBunny(city.screenshots[0].url)}
                alt={city.screenshots[0].alt || city.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{city.name}</h2>
              <p className="text-muted-foreground">{city.headline}</p>
              <div className="flex flex-wrap gap-2">
                {city.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
