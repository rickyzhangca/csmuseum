import { City } from '@/types/city';
import { getContestWinners, withBunnyThumbnail } from '@/utils';
import { MedalIcon } from 'lucide-react';
import Link from 'next/link';
import { CityCard } from '../city-card';
import { Diamond } from '../diamond';
import { HorizontalScrollable } from '../horizontal-scrollable';
import { LinkButton } from '../link-button';
import { Section } from '../section';

const ContestCityCard = ({ city }: { city: City }) => (
  <div
    key={city.slug}
    className="flex snap-center flex-col items-center rounded-2xl bg-orange-100 shadow-[inset_0_0_0_1px_theme(colors.orange.200)] lg:flex-1"
  >
    <Link
      href={`/cities/${city.slug}`}
      className="pt-2.5 pb-2 text-center text-sm font-medium text-orange-600 transition hover:text-orange-700"
    >
      {city.contest && (
        <>
          {city.contest.placement.charAt(0).toUpperCase() +
            city.contest.placement.slice(1)}{' '}
          of {city.contest.name} in {city.contest.year}
        </>
      )}
    </Link>
    <CityCard
      href={`/cities/${city.slug}`}
      className="hover:border-orange-200 hover:bg-orange-50"
    >
      <CityCard.Image
        src={withBunnyThumbnail(city.slug)}
        alt={city.name}
        className="h-48 w-full object-cover"
      />
      <CityCard.Title className="group-hover:text-orange-600">
        {city.name}
      </CityCard.Title>
      <CityCard.Subtitle className="group-hover:text-orange-600/50">
        {city.headline}
      </CityCard.Subtitle>
    </CityCard>
  </div>
);

export const ContestSection = async () => {
  const contestWinners = getContestWinners();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-px w-full">
        <Diamond position="top-left" className="border-orange-300" />
        <Diamond position="top-right" className="border-orange-300" />
        <div className="absolute -top-px left-1/2 h-px w-screen -translate-x-1/2 bg-orange-300" />
        <div className="absolute top-0 -z-10 h-36 w-full bg-gradient-to-b from-orange-50 to-transparent" />
        <div className="absolute top-0 -left-px h-48 w-px bg-gradient-to-b from-orange-300 to-transparent" />
        <div className="absolute top-0 -right-px h-48 w-px bg-gradient-to-b from-orange-300 to-transparent" />
      </div>
      <Section className="w-full">
        <Section.Header>
          <Section.Chip className="bg-orange-100 text-orange-600">
            <MedalIcon
              className="size-4 min-w-4"
              strokeWidth={2}
              absoluteStrokeWidth
            />
            Contest-winning cities
          </Section.Chip>
          <Section.Title>Hall of Mayors and Cities</Section.Title>
          <Section.Description>
            Celebrating cities that mastered the art of grids, greenery, and
            chaos
          </Section.Description>
        </Section.Header>
        <Section.Content className="flex flex-col items-center gap-8">
          <div className="hidden w-full flex-row flex-wrap gap-4 lg:flex">
            {contestWinners.map(city => (
              <ContestCityCard key={city.slug} city={city} />
            ))}
          </div>
          <HorizontalScrollable className="w-full lg:hidden">
            <div className="flex gap-4">
              {contestWinners.map(city => (
                <ContestCityCard key={city.slug} city={city} />
              ))}
            </div>
          </HorizontalScrollable>
          <LinkButton href="/cities?filter=winning" target="_self">
            View all winning cities
          </LinkButton>
        </Section.Content>
      </Section>
      <div className="relative h-px w-full">
        <Diamond position="top-left" className="border-orange-300" />
        <Diamond position="top-right" className="border-orange-300" />
        <div className="absolute bottom-px left-1/2 h-px w-screen -translate-x-1/2 bg-orange-300" />
        <div className="absolute bottom-0 -z-10 h-24 w-full bg-gradient-to-t from-orange-50 to-transparent" />
        <div className="absolute bottom-0 -left-px h-32 w-px bg-gradient-to-t from-orange-300 to-transparent" />
        <div className="absolute -right-px bottom-0 h-32 w-px bg-gradient-to-t from-orange-300 to-transparent" />
      </div>
    </div>
  );
};
