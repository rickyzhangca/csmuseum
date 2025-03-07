import { cities } from '@/content/cities';
import { withBunnyShots } from '@/utils';
import { Dice3Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '../section';

export const TodaySection = async () => {
  const now = new Date();
  const utcDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );

  const today = utcDate.toISOString().split('T')[0]; // YYYY-MM-DD format
  const dateHash = Array.from(today).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  const randomIndex = dateHash % cities.length;

  const featuredCity = cities[randomIndex];

  if (!featuredCity) return null;

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
  });

  const formattedDate = formatter.format(utcDate);

  return (
    <Section>
      <Section.Header>
        <Section.Chip>
          <Dice3Icon
            className="size-4 min-w-4"
            strokeWidth={2}
            absoluteStrokeWidth
          />
          City of {formattedDate}
        </Section.Chip>
        <Section.Title>Today&apos;s City: {featuredCity.name}</Section.Title>
        <Section.Description>{featuredCity.headline}</Section.Description>
      </Section.Header>
      <Section.Content className="relative flex flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-4 transition lg:flex-row">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl lg:w-[70%]">
          <Image
            src={withBunnyShots(featuredCity.id, 1)}
            alt={featuredCity.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 lg:w-[30%]">
          <div className="relative hidden aspect-video w-full overflow-hidden rounded-xl lg:block">
            <Image
              src={withBunnyShots(featuredCity.id, 2)}
              alt={featuredCity.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative hidden aspect-video w-full overflow-hidden rounded-xl lg:block">
            <Image
              src={withBunnyShots(featuredCity.id, 3)}
              alt={featuredCity.name}
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
