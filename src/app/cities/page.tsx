import type { CityMeta } from '@/lib/types/city';
import { getAllCitiesMeta } from '@/lib/utils/cities';
import Image from 'next/image';
import Link from 'next/link';

function CityListItem({ city }: { city: CityMeta }) {
  return (
    <Link
      href={`/cities/${city.slug}`}
      className="group flex gap-6 rounded-lg border p-4 transition-all hover:border-blue-500 hover:shadow-lg"
    >
      {city.frontmatter.screenshots[0] && (
        <div className="relative aspect-[16/9] w-48 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={city.frontmatter.screenshots[0]}
            alt={city.frontmatter.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold group-hover:text-blue-600">
          {city.frontmatter.title}
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {city.frontmatter.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex gap-4 pt-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Region:</span>{' '}
            {city.frontmatter.region}
          </div>
          <div>
            <span className="font-medium">Season:</span>{' '}
            {city.frontmatter.season}
          </div>
          <div>
            <span className="font-medium">Population:</span>{' '}
            {city.frontmatter.stats.population}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function CitiesPage() {
  const cities = await getAllCitiesMeta();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">All Cities</h1>
        <p className="mt-2 text-gray-600">
          Browse through our collection of {cities.length} cities
        </p>
      </header>

      <div className="space-y-4">
        {cities.map(city => (
          <CityListItem key={city.slug} city={city} />
        ))}
      </div>
    </div>
  );
}
