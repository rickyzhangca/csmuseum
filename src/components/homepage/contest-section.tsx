import { getAllCitiesMeta, withBunny } from '@/utils';
import { MedalIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '../section';

export const ContestSection = async () => {
  const cities = await getAllCitiesMeta();
  const contestWinners = cities
    .filter(city => city.frontmatter.contest?.placement === 'winner')
    .slice(0, 3);

  return (
    <Section>
      <Section.Header>
        <Section.Chip className="bg-orange-100 text-orange-600">
          <MedalIcon className="size-4" strokeWidth={2} absoluteStrokeWidth />
          Contest Champions
        </Section.Chip>
        <Section.Title>Hall of Mayors and Cities</Section.Title>
        <Section.Description>
          Celebrating cities that mastered the art of grids, greenery, and chaos
        </Section.Description>
      </Section.Header>
      <Section.Content className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contestWinners.map(city => (
          <Link
            key={city.slug}
            href={`/cities/${city.slug}`}
            className="group flex flex-col items-center rounded-2xl bg-orange-100 shadow-[inset_0_0_0_1px_theme(colors.orange.200)]"
          >
            <p className="pt-2.5 pb-2 text-center text-sm font-medium text-orange-600">
              {city.frontmatter.contest?.placement?.charAt(0).toUpperCase() +
                city.frontmatter.contest?.placement?.slice(1)}{' '}
              of {city.frontmatter.contest?.name} in{' '}
              {city.frontmatter.contest?.year}
            </p>
            <div className="group flex w-full flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3 transition hover:border-orange-200 hover:bg-orange-50">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={withBunny(city.frontmatter.screenshots[0])}
                  alt={city.frontmatter.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col items-center text-center transition group-hover:text-orange-600">
                <h4>{city.frontmatter.name}</h4>
                <p className="text-foreground/50 text-sm transition group-hover:text-orange-600/50">
                  {city.frontmatter.headline}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </Section.Content>
    </Section>
  );
};
