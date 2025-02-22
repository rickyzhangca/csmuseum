import { cities } from '@/content/cities';
import { City } from '@/types/city';
import { withBunny } from '@/utils';
import { ArrowRightIcon, HardHatIcon } from 'lucide-react';
import Image from 'next/image';
import { HorizontalScrollable } from '../horizontal-scrollable';
import { LinkButton } from '../link-button';
import { Section } from '../section';

const Card = ({ city }: { city: City }) => (
  <div
    key={city.slug}
    className="group flex flex-col gap-3 rounded-2xl border border-gray-300 bg-white p-4 transition"
  >
    <div className="relative aspect-video h-48 w-full overflow-hidden rounded-lg">
      <Image
        src={withBunny(city.screenshots[0].url)}
        alt={city.name}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
        <div className="flex items-center justify-center gap-2 text-center text-sm font-medium text-white">
          <HardHatIcon
            className="size-4 min-w-4"
            strokeWidth={2}
            absoluteStrokeWidth
          />
          Being added to CSMuseum...
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <h4>{city.name}</h4>
      <p className="text-foreground/50 text-sm">{city.headline}</p>
    </div>
  </div>
);

export const UpcomingSection = async () => {
  const draftCities = cities.filter((city: City) => city.draft === true);

  if (draftCities.length === 0) return null;

  return (
    <Section className="rounded-3xl border border-gray-200 bg-[repeating-linear-gradient(45deg,#f9fafb,#f9fafb_4px,transparent_4px,transparent_8px)] px-5 py-10">
      <Section.Header>
        <Section.Chip className="border border-gray-300 bg-gray-100 text-gray-600">
          <HardHatIcon
            className="size-4 min-w-4"
            strokeWidth={2}
            absoluteStrokeWidth
          />
          Coming Soon
        </Section.Chip>
        <Section.Title>Cities under Construction</Section.Title>
        <Section.Description>
          Sneak peeks at upcoming cities — stay tuned for what CSMuseum will
          feature next!
        </Section.Description>
      </Section.Header>
      <Section.Content className="flex flex-col items-center gap-10">
        <HorizontalScrollable className="max-w-full">
          <div className="flex gap-4">
            {draftCities.map((city: City) => (
              <Card key={city.slug} city={city} />
            ))}
          </div>
        </HorizontalScrollable>
        <div className="flex items-center justify-center gap-2">
          <LinkButton href="/cities">Add your own city</LinkButton>
          <LinkButton href="/cities" variant="primary">
            Nominate a great city
            <LinkButton.Icon>
              <ArrowRightIcon className="size-4 min-w-4" />
            </LinkButton.Icon>
          </LinkButton>
        </div>
      </Section.Content>
    </Section>
  );
};
