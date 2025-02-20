import { getAllCitiesMeta, withBunny } from '@/utils';
import { ArrowRightIcon, HardHatIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '../section';

export const UpcomingSection = async () => {
  const cities = await getAllCitiesMeta();
  const draftCities = cities.filter(city => city.frontmatter.draft);

  if (draftCities.length === 0) return null;

  return (
    <Section className="rounded-3xl border border-gray-200 bg-[repeating-linear-gradient(45deg,#f9fafb,#f9fafb_4px,transparent_4px,transparent_8px)] p-6">
      <Section.Header>
        <Section.Chip className="border border-gray-300 bg-gray-100 text-gray-600">
          <HardHatIcon className="size-4" strokeWidth={2} absoluteStrokeWidth />
          Coming Soon
        </Section.Chip>
        <Section.Title>Cities under Construction</Section.Title>
        <Section.Description>
          Sneak peeks at upcoming cities — stay tuned for what CSMuseum will
          feature next!
        </Section.Description>
      </Section.Header>
      <Section.Content className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {draftCities.map(city => (
          <div
            key={city.slug}
            className="group flex flex-col gap-3 rounded-2xl border border-gray-300 bg-white p-4 transition"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={withBunny(city.frontmatter.screenshots[0])}
                alt={city.frontmatter.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <div className="flex items-center justify-center gap-2 text-center text-sm font-medium text-white">
                  <HardHatIcon
                    className="size-4"
                    strokeWidth={2}
                    absoluteStrokeWidth
                  />
                  Being added to CSMuseum...
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h4>{city.frontmatter.name}</h4>
              <p className="text-foreground/50 text-sm">
                {city.frontmatter.headline}
              </p>
            </div>
          </div>
        ))}
        <Link
          href="/cities"
          target="_blank"
          className="text-foreground/50 hover:text-foreground bg-background flex items-center justify-center gap-2 rounded-2xl border border-gray-300 p-2 font-medium transition hover:bg-gray-50"
        >
          Add your city to CSMuseum
          <ArrowRightIcon
            className="size-4"
            strokeWidth={2}
            absoluteStrokeWidth
          />
        </Link>
      </Section.Content>
    </Section>
  );
};
