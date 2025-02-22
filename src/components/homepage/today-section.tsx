import { cities } from '@/content/cities';
import { withBunny } from '@/utils';
import { Dice3Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '../section';

export const TodaySection = async () => {
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
        <Section.Title>Today&apos;s City: {featuredCity.name}</Section.Title>
        <Section.Description>{featuredCity.headline}</Section.Description>
      </Section.Header>
      <Section.Content className="relative flex flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-4 transition lg:flex-row">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl lg:w-[70%]">
          <Image
            src={withBunny(featuredCity.screenshots[0].url)}
            alt={featuredCity.screenshots[0].alt || featuredCity.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 lg:w-[30%]">
          <div className="relative hidden aspect-video w-full overflow-hidden rounded-xl lg:block">
            <Image
              src={withBunny(
                featuredCity.screenshots[1]?.url ||
                  featuredCity.screenshots[0].url
              )}
              alt={featuredCity.screenshots[1]?.alt || featuredCity.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative hidden aspect-video w-full overflow-hidden rounded-xl lg:block">
            <Image
              src={withBunny(
                featuredCity.screenshots[2]?.url ||
                  featuredCity.screenshots[0].url
              )}
              alt={featuredCity.screenshots[2]?.alt || featuredCity.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <Link
            href={`/cities/${featuredCity.slug}`}
            className="text-foreground-inverted mx-1 flex w-full items-center justify-center rounded-full bg-blue-700 px-4 py-5 text-center font-medium transition hover:bg-blue-800 hover:shadow-lg"
          >
            Explore {featuredCity.name}
          </Link>
        </div>
      </Section.Content>
    </Section>
  );
};
