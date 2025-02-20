import { getAllCitiesMeta, withBunny } from '@/utils';
import { Dice3Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '../section';

export const TodaySection = async () => {
  const cities = await getAllCitiesMeta();

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const dateHash = Array.from(today).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  const randomIndex = dateHash % cities.length;

  const featuredCity = cities[randomIndex];

  if (!featuredCity) return null;

  return (
    <Section>
      <Section.Header>
        <Section.Chip>
          <Dice3Icon className="size-4" strokeWidth={2} absoluteStrokeWidth />
          City of{' '}
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
          })}
        </Section.Chip>
        <Section.Title>
          Today&apos;s City: {featuredCity.frontmatter.name}
        </Section.Title>
        <Section.Description>
          {featuredCity.frontmatter.headline}
        </Section.Description>
      </Section.Header>
      <Section.Content className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-4 transition lg:flex-row">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl lg:w-[70%]">
          <Image
            src={withBunny(featuredCity.frontmatter.screenshots[0])}
            alt={featuredCity.frontmatter.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-between gap-4 lg:w-[30%]">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={withBunny(featuredCity.frontmatter.screenshots[0])}
              alt={featuredCity.frontmatter.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={withBunny(featuredCity.frontmatter.screenshots[0])}
              alt={featuredCity.frontmatter.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <Link
            href={`/cities/${featuredCity.slug}`}
            className="text-foreground-inverted mx-1 flex items-center justify-center rounded-full bg-blue-600 px-4 py-5 text-center font-medium transition hover:bg-blue-700 hover:shadow-lg"
          >
            Explore {featuredCity.frontmatter.name}
          </Link>
        </div>
      </Section.Content>
    </Section>
  );
};
